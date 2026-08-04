/**
 * ROI calculator model.
 *
 * Pure. No React, no DOM, no fetch, no clock. Every function takes inputs and
 * reads its figures out of the constants through `readConstant`, so a constant
 * that does not exist, or that the research tagged unpublishable, throws at the
 * read rather than rendering a number nobody can defend.
 *
 * Two rules shape almost every decision below:
 *
 *   1. Ranges, never invented point estimates. The range is computed by
 *      varying one dimension at a time from the point estimate and taking the
 *      envelope (build spec 5.2). Multiplying all the component lows together
 *      compounds conservatism into a number that means nothing.
 *   2. Never sum across bands. `bandATotal` is the only total in the product.
 *      Band B has no total at all, and Band C carries no dollar figure.
 */

import {
  PEDIATRIC_SPECIALTIES,
  REMEDIATION_BANDS,
  SPECIALTY_CITATION_MAP,
  SPECIALTY_REMEDIATION_MAP,
  readBand,
  readConstant,
  readNumber,
  readString,
} from "./constants"
import type {
  BandALine,
  BandCCitationRank,
  BandCPanel,
  ExtendedYearResult,
  FundingResult,
  Inputs,
  Range,
  Result,
  SpecialtyId,
} from "./types"

// ---------------------------------------------------------------------------
// Range helpers
// ---------------------------------------------------------------------------

export const flat = (n: number): Range => ({ low: n, point: n, high: n })

export const addRanges = (a: Range, b: Range): Range => ({
  low: a.low + b.low,
  point: a.point + b.point,
  high: a.high + b.high,
})

export const scaleRange = (r: Range, k: number): Range => ({
  low: r.low * k,
  point: r.point * k,
  high: r.high * k,
})

/** Guards every division in the model. Returns 0 rather than NaN or Infinity. */
export const safeDivide = (numerator: number, denominator: number): number =>
  denominator === 0 || !Number.isFinite(denominator)
    ? 0
    : numerator / denominator

/**
 * The build spec 5.2 envelope: vary one dimension at a time from the point
 * estimate, then take the min of the lows and the max of the highs.
 *
 * This is deliberately NOT `f(allLows)` to `f(allHighs)`. Five conservative
 * assumptions multiplied together produce a floor no reader believes, which
 * costs more credibility than the wide band saves.
 */
export function envelope(
  dimensions: Range[],
  compute: (values: number[]) => number
): Range {
  const points = dimensions.map((d) => d.point)
  const point = compute(points)
  let low = point
  let high = point

  dimensions.forEach((dimension, index) => {
    for (const edge of [dimension.low, dimension.high]) {
      const values = points.slice()
      values[index] = edge
      const result = compute(values)
      if (result < low) low = result
      if (result > high) high = result
    }
  })

  return { low, point, high }
}

// ---------------------------------------------------------------------------
// 5.1 Faculty hourly value
// ---------------------------------------------------------------------------

export function resolveFacultyHourly(inputs: Inputs): Range {
  if (inputs.facultyHourlyOverride !== null) {
    return flat(Math.max(0, inputs.facultyHourlyOverride))
  }

  const basisKey =
    inputs.hourlyBasis === "clinical"
      ? "by_specialty_assoc_prof_1456_basis"
      : "by_specialty_assoc_prof_2080_basis"

  const base = readNumber(`faculty_hourly_value.${basisKey}.${inputs.specialty}`)
  const defaultFringe = readNumber("faculty_hourly_value.fringe_rate.default")

  // Rescale the table figure onto the user's own fringe rate. The table is
  // built at the default rate, so this is a ratio rather than a re-derivation.
  const scaled = (base * (1 + inputs.fringeRate)) / (1 + defaultFringe)

  // Band multipliers come from the published $115 / $145 / $210 spread rather
  // than from hardcoded 0.79 and 1.45 constants.
  const spreadDefault = readNumber("faculty_hourly_value.default")
  const spreadLow = readNumber("faculty_hourly_value.low")
  const spreadHigh = readNumber("faculty_hourly_value.high")

  return {
    low: scaled * (spreadLow / spreadDefault),
    point: scaled,
    high: scaled * (spreadHigh / spreadDefault),
  }
}

// ---------------------------------------------------------------------------
// 5.2 Lever A1, assessment and documentation
// ---------------------------------------------------------------------------

export function leverA1(inputs: Inputs, facultyHourly: Range): BandALine {
  const trainees = Math.max(0, inputs.trainees)

  const hoursBand = readBand(
    "lever_a1_assessment_documentation.hours_per_trainee_year"
  )
  // The user's own figure moves the point; the published band still sets the
  // spread around it.
  const hoursPerTrainee: Range = {
    low: Math.min(hoursBand.low, inputs.assessmentHoursPerTrainee),
    point: inputs.assessmentHoursPerTrainee,
    high: Math.max(hoursBand.high, inputs.assessmentHoursPerTrainee),
  }

  const share = inputs.subcompetencyShare
  const shareBasis = readString(
    "lever_a1_assessment_documentation.in_scope_slice.discount_1_subcompetency_share.basis"
  )

  const depthBand = readBand(
    "lever_a1_assessment_documentation.in_scope_slice.discount_2_depth_of_substitution"
  )
  const depth: Range = {
    low: Math.min(depthBand.low, inputs.depthOfSubstitution),
    point: inputs.depthOfSubstitution,
    high: Math.max(depthBand.high, inputs.depthOfSubstitution),
  }
  const depthBasis = readString(
    "lever_a1_assessment_documentation.in_scope_slice.discount_2_depth_of_substitution.basis"
  )

  // The burden. Rendered so the reader can see what we are NOT claiming, and
  // never multiplied by an hourly rate.
  const hoursCurrent = envelope([hoursPerTrainee], ([h]) => trainees * h)

  // The claim, after both discounts.
  const hoursAddressable = envelope(
    [hoursPerTrainee, depth],
    ([h, d]) => trainees * h * share * d
  )

  // `subcompetency_share` has no published band, so it is held fixed here.
  const dollars = envelope(
    [hoursPerTrainee, depth, facultyHourly],
    ([h, d, rate]) => trainees * h * share * d * rate
  )

  return {
    id: "a1_assessment",
    label: "Competency assessment and documentation",
    hoursCurrent,
    hoursAddressable,
    discounts: [
      {
        id: "subcompetency_share",
        label: "ICS and professionalism share of the Milestones",
        value: share,
        basis: shareBasis,
        confidence: "Estimated",
      },
      {
        id: "depth_of_substitution",
        label: "Depth of substitution",
        value: inputs.depthOfSubstitution,
        basis: depthBasis,
        confidence: "Inferred",
      },
    ],
    dollars,
    assumptions: [
      "lever_a1_assessment_documentation.hours_per_trainee_year",
      "lever_a1_assessment_documentation.in_scope_slice.discount_1_subcompetency_share",
      "lever_a1_assessment_documentation.in_scope_slice.discount_2_depth_of_substitution",
      "faculty_hourly_value",
    ],
    confidence: "Estimated",
    note: "Every program does this twice a year for every trainee. This is the line most ROI models miss, because remediation touches three to five trainees a year and assessment touches all of them.",
  }
}

// ---------------------------------------------------------------------------
// 5.3 Lever A2, remediation
// ---------------------------------------------------------------------------

export function specialtyRemediationRate(specialty: SpecialtyId): number {
  const key = SPECIALTY_REMEDIATION_MAP[specialty]
  return readNumber(
    `lever_a2_remediation_time.specialty_rates_per_100_trainees_year.${key}`
  )
}

/**
 * The floor is load bearing. Cases per program per year sit at 0.93 to 1.04
 * across a 2.7x range of program size, so linear scaling badly misestimates
 * both small and large programs.
 *
 * When the user has not given a count, the band around the resolved figure is
 * the plus-or-minus implied by the published floor band, applied to whichever
 * term is binding.
 */
export function resolveCases(inputs: Inputs): Range {
  const band =
    REMEDIATION_BANDS[inputs.remediationExpected] ??
    REMEDIATION_BANDS[inputs.remediationCases]

  if (band) return { ...band }

  const floor = readBand("lever_a2_remediation_time.cases_per_program_floor")
  const rate = specialtyRemediationRate(inputs.specialty)
  const scaled = (Math.max(0, inputs.trainees) * rate) / 100
  const point = Math.max(floor.point, scaled)

  return {
    low: point * safeDivide(floor.low, floor.point),
    point,
    high: point * safeDivide(floor.high, floor.point),
  }
}

export function leverA2(
  inputs: Inputs,
  facultyHourly: Range,
  cases: Range
): BandALine {
  const commBand = readBand("lever_a2_remediation_time.comm_share")
  const comm: Range = {
    low: Math.min(commBand.low, inputs.commShare),
    point: inputs.commShare,
    high: Math.max(commBand.high, inputs.commShare),
  }

  const hoursBand = readBand("lever_a2_remediation_time.hours_per_case")
  const hoursPerCase: Range = {
    low: Math.min(hoursBand.low, inputs.hoursPerCase),
    point: inputs.hoursPerCase,
    high: Math.max(hoursBand.high, inputs.hoursPerCase),
  }

  const displacementBand = readBand(
    "lever_a2_remediation_time.displacement_fraction"
  )
  const displacement: Range = {
    low: Math.min(displacementBand.low, inputs.displacementFraction),
    point: inputs.displacementFraction,
    high: Math.max(displacementBand.high, inputs.displacementFraction),
  }

  const hoursCurrent = envelope(
    [cases, hoursPerCase],
    ([c, hpc]) => c * hpc
  )

  const hoursAddressable = envelope(
    [cases, comm, hoursPerCase, displacement],
    ([c, cs, hpc, d]) => c * cs * hpc * d
  )

  const dollars = envelope(
    [cases, comm, hoursPerCase, displacement, facultyHourly],
    ([c, cs, hpc, d, rate]) => c * cs * hpc * d * rate
  )

  return {
    id: "a2_remediation",
    label: "Remediation faculty time",
    hoursCurrent,
    hoursAddressable,
    discounts: [
      {
        id: "comm_share",
        label: "Share of cases where a communication tool is relevant",
        value: inputs.commShare,
        basis: readString("lever_a2_remediation_time.comm_share.label"),
        confidence: "Inferred",
      },
      {
        id: "displacement_fraction",
        label: "Share of those hours the platform absorbs",
        value: inputs.displacementFraction,
        basis:
          "Faculty hours redirected from facilitation to judgment, not deleted.",
        confidence: "Inferred",
      },
    ],
    dollars,
    assumptions: [
      "lever_a2_remediation_time.cases_per_program_floor",
      "lever_a2_remediation_time.specialty_rates_per_100_trainees_year",
      "lever_a2_remediation_time.comm_share",
      "lever_a2_remediation_time.hours_per_case",
      "lever_a2_remediation_time.displacement_fraction",
      "faculty_hourly_value",
    ],
    confidence: "Estimated",
    note: readString("lever_a2_remediation_time.mechanism"),
  }
}

// ---------------------------------------------------------------------------
// 5.4 / 5.5 Extended year and funding
// ---------------------------------------------------------------------------

export function resolveFunding(inputs: Inputs): FundingResult | null {
  if (inputs.lens !== "dio") return null

  const sharpFacts = readConstant<string[]>("lever_a4_gme_funding.sharp_facts")
  const placeholder = readNumber("lever_a4_gme_funding.dgme_per_fte.placeholder")
  const spread: [number, number] = [
    readNumber(
      "lever_a4_gme_funding.per_resident_payment_distribution_2018.p5"
    ),
    readNumber(
      "lever_a4_gme_funding.per_resident_payment_distribution_2018.p95"
    ),
  ]

  const base: Omit<
    FundingResult,
    "showsDollarFigure" | "dgmeForgone" | "copy"
  > = {
    source: inputs.fundingSource,
    imeForgone: readNumber("lever_a4_gme_funding.ime_forgone_per_extended_year"),
    sharpFacts,
    dgmePerFteUsed: inputs.dgmePerFte,
    dgmePerFtePlaceholder: placeholder,
    perResidentSpread: spread,
  }

  if (inputs.fundingSource === null) {
    return {
      ...base,
      showsDollarFigure: false,
      dgmeForgone: null,
      copy: "Tell us how this program is funded. Children's hospitals are mostly CHGME, and running Medicare arithmetic on one is wrong.",
    }
  }

  if (inputs.fundingSource === "chgme") {
    // A fixed appropriation. A weighted-count change shifts this hospital's
    // share of a fixed pot rather than creating or destroying federal dollars,
    // so no dollar figure renders here at all.
    return {
      ...base,
      showsDollarFigure: false,
      dgmeForgone: null,
      copy: readString("lever_a4_gme_funding.chgme_copy"),
    }
  }

  if (inputs.fundingSource === "medicare_over_cap") {
    return {
      ...base,
      showsDollarFigure: true,
      dgmeForgone: flat(0),
      copy: readString("lever_a4_gme_funding.over_cap_copy"),
    }
  }

  if (inputs.fundingSource === "other") {
    return {
      ...base,
      showsDollarFigure: true,
      dgmeForgone: flat(0),
      copy: readString("lever_a4_gme_funding.other_copy"),
    }
  }

  // medicare_under_cap
  const weightDelta = readNumber("lever_a4_gme_funding.dgme_forgone_weight_delta")
  const perFteLow = readNumber("lever_a4_gme_funding.dgme_per_fte.low")
  const perFteHigh = readNumber("lever_a4_gme_funding.dgme_per_fte.high")
  const perFte: Range =
    inputs.dgmePerFte !== null
      ? flat(inputs.dgmePerFte)
      : { low: perFteLow, point: perFteLow, high: perFteHigh }

  return {
    ...base,
    showsDollarFigure: true,
    dgmeForgone: scaleRange(perFte, weightDelta),
    copy: readString("lever_a4_gme_funding.under_cap_copy"),
  }
}

export function extendedYear(
  inputs: Inputs,
  funding: FundingResult | null,
  contractPrice: number
): ExtendedYearResult {
  const marginal = readBand(
    "lever_a3_extended_year.marginal_cost_per_extended_year"
  )

  const dgmeForgone =
    funding && funding.source === "medicare_under_cap" ? funding.dgmeForgone : null

  const total: Range = dgmeForgone
    ? addRanges(marginal, dgmeForgone)
    : { ...marginal }

  // The threshold. Inverted, so the low end of the cost band gives the high
  // end of the years needed.
  const yearsToBreakEven: Range = {
    low: safeDivide(contractPrice, total.high),
    point: safeDivide(contractPrice, total.point),
    high: safeDivide(contractPrice, total.low),
  }

  const ratePer100 = readBand(
    "lever_a3_extended_year.extension_evidence.per_100_trainees_per_year.any_extension"
  )
  const trainees = Math.max(0, inputs.trainees)

  return {
    presentation: "BREAK-EVEN ONLY",
    marginalCostPerYear: marginal,
    dgmeForgonePerYear: dgmeForgone,
    totalCostPerExtendedYear: total,
    yearsToBreakEven,
    modeledExtensionRatePer100: ratePer100,
    modeledExtensionsAtThisSize: scaleRange(ratePer100, trainees / 100),
    perCaseAdditionalTrainingTime: readNumber(
      "lever_a3_extended_year.extension_evidence.per_remediation_case.any_additional_training_time.value"
    ),
    perCaseFullRepeatYear: readNumber(
      "lever_a3_extended_year.extension_evidence.per_remediation_case.repeats_a_full_clinical_year.value"
    ),
    // `extension_evidence.labeling_requirement` is deliberately not read. It is
    // an instruction to whoever builds this ("call this a MODELED rate, never
    // an ACGME statistic"), the code and ExtendedYear.tsx already obey it, and
    // nothing rendered it, so all it did was ship a build note to the browser.
    //
    // We show this as a threshold, not a saving. The published literature does
    // not support projecting prevented extensions, and this field stays null
    // so no renderer can reach for one.
    projectedSaving: null,
  }
}

// ---------------------------------------------------------------------------
// Band C, "Documented properly"
// ---------------------------------------------------------------------------

type CitationEntry = {
  rank: number | null
  of?: number
  theme?: string | null
  detail: string
}

export function buildCitationRank(specialty: SpecialtyId): BandCCitationRank {
  const key = SPECIALTY_CITATION_MAP[specialty]

  if (key === null) {
    return {
      kind: "general",
      specialtyKey: null,
      rank: null,
      of: null,
      theme: null,
      detail: null,
      statement: readString(
        "band_c_documented_properly.citation_rank_by_specialty.general_statement"
      ),
    }
  }

  const entry = readConstant<CitationEntry>(
    `band_c_documented_properly.citation_rank_by_specialty.${key}`
  )

  // Pediatrics is in the table specifically to record that it does not appear
  // in top citation themes. Showing otolaryngology's rank to a pediatrics
  // program director would be showing them someone else's problem.
  if (entry.rank === null && key === "pediatrics") {
    return {
      kind: "silent",
      specialtyKey: key,
      rank: null,
      of: null,
      theme: null,
      detail: null,
      statement: null,
    }
  }

  return {
    kind: "specialty",
    specialtyKey: key,
    rank: entry.rank,
    of: entry.of ?? null,
    theme: entry.theme ?? null,
    detail: entry.detail,
    statement: null,
  }
}

export function buildBandC(specialty: SpecialtyId): BandCPanel {
  const c = "band_c_documented_properly"

  return {
    isPriced: false,
    hasTotal: false,
    header: readString(`${c}.header`),
    subhead: readString(`${c}.subhead`),
    rationale: readString(`${c}.rationale`),
    requirements: readConstant(`${c}.surviving_requirements_detail`),
    requirementsSource: readString(`${c}.requirements_source`),
    requirementsUrl: readString(`${c}.requirements_url`),
    reviewersExamine: {
      quote: readString(`${c}.what_reviewers_examine.quote`),
      cite: readString(`${c}.what_reviewers_examine.cite`),
      url: readString(`${c}.what_reviewers_examine.url`),
    },
    citationRank: buildCitationRank(specialty),
    baseRates: {
      totalPrograms: readNumber(`${c}.base_rates.total_programs`),
      warning: {
        count: readNumber(`${c}.base_rates.warning.count`),
        share: readNumber(`${c}.base_rates.warning.share`),
      },
      probation: {
        count: readNumber(`${c}.base_rates.probation.count`),
        share: readNumber(`${c}.base_rates.probation.share`),
      },
      withdrawal: {
        count: readNumber(`${c}.base_rates.withdrawal.count`),
        share: readNumber(`${c}.base_rates.withdrawal.share`),
      },
      fourYearSeries: readConstant(`${c}.base_rates.four_year_series`),
      randomSiteVisitsThisYear: readNumber(
        `${c}.base_rates.random_site_visits.fy2026`
      ),
      adverseRateGivenVisit: readNumber(
        `${c}.base_rates.random_site_visits.adverse_rate_given_visit`
      ),
      year: readString(`${c}.base_rates.year`),
      source: readString(`${c}.base_rates.source`),
    },
    machinery: readConstant(`${c}.institutional_machinery`),
    machinerySource: readString(`${c}.institutional_machinery_source`),
    machineryUrl: readString(`${c}.institutional_machinery_url`),
    renumberingWarning: readString(`${c}.renumbering_warning`),
    asymmetry: {
      statusPublic: readConstant(`${c}.asymmetry.status_public`),
      pastStatusesPublic: readConstant(`${c}.asymmetry.past_statuses_public`),
      citationsPublic: readConstant(`${c}.asymmetry.citations_public`),
      citationsQuote: readString(`${c}.asymmetry.citations_quote`),
      knownGap: readString(`${c}.asymmetry.known_gap`),
      // `asymmetry.applicant_disclosure` is deliberately absent. It is tagged
      // Inferred and carries "Confirm with ACGME before using in marketing."
      // A public landing page is marketing.
    },
    shortcutFinding: {
      fullMinutes: readNumber(
        "lever_a1_assessment_documentation.shortcut_finding.full_assessment_minutes"
      ),
      adHocMinutes: readNumber(
        "lever_a1_assessment_documentation.shortcut_finding.ad_hoc_assessment_minutes"
      ),
      agreement: readString(
        "lever_a1_assessment_documentation.shortcut_finding.agreement"
      ),
      cite: readString("lever_a1_assessment_documentation.shortcut_finding.cite"),
    },
    hardFees: {
      // Each fee goes through readNumber rather than a cast off the parent
      // object. A cast skips the guard entirely: a renamed or newly blocked key
      // would arrive as undefined, and formatCurrency turns that into "$0"
      // rather than throwing, so a missing figure would render as a real one.
      items: [
        {
          label: "Annual program fee, more than 5 residents",
          amount: readNumber(`${c}.hard_fees.annual_program_over_5_residents`),
        },
        {
          label: "Annual program fee, 5 or fewer",
          amount: readNumber(`${c}.hard_fees.annual_program_5_or_fewer`),
        },
        {
          label: "Appeal of an adverse action",
          amount: readNumber(`${c}.hard_fees.appeal`),
        },
        {
          label: "Cancelled site visit, waivable",
          amount: readNumber(`${c}.hard_fees.cancelled_site_visit`),
        },
        {
          label: "Re-application after withdrawal",
          amount: readNumber(`${c}.hard_fees.reapplication_after_withdrawal`),
        },
      ],
      scaling: readString(`${c}.hard_fees.scaling`),
      framing: readString(`${c}.hard_fees.framing`),
      year: readNumber(`${c}.hard_fees.year`),
      url: readString(`${c}.hard_fees.url`),
    },
    tail: {
      medicareGmePerResidentYear: readNumber(
        `${c}.tail_scenario.medicare_gme_per_resident_year`
      ),
      range: readConstant(`${c}.tail_scenario.range`),
      dollarYear: readNumber(`${c}.tail_scenario.dollar_year`),
      twelveResidentExample: readNumber(
        `${c}.tail_scenario.twelve_resident_example`
      ),
      // Always returned. A dollar figure without the base rate beside it is a
      // scare number, which is the opposite of what this panel is for.
      baseRateToShowAdjacent: readNumber(
        `${c}.tail_scenario.base_rate_to_show_adjacent`
      ),
      capTransferRule: readString(`${c}.tail_scenario.cap_transfer_rule`),
      hahnemann: {
        year: readNumber(`${c}.tail_scenario.hahnemann.year`),
        displaced: readNumber(`${c}.tail_scenario.hahnemann.displaced`),
        programsClosed: readNumber(
          `${c}.tail_scenario.hahnemann.programs_closed`
        ),
        gmeSlotSale: readNumber(`${c}.tail_scenario.hahnemann.gme_slot_sale`),
        perSlot: readNumber(`${c}.tail_scenario.hahnemann.per_slot`),
        stalkingHorseBid: readNumber(
          `${c}.tail_scenario.hahnemann.stalking_horse_bid`
        ),
        absorbedByConsortium: readNumber(
          `${c}.tail_scenario.hahnemann.absorbed_by_consortium`
        ),
        placementCostNote: readString(
          `${c}.tail_scenario.hahnemann.placement_cost_note`
        ),
      },
      crozer: {
        year: readNumber(`${c}.tail_scenario.crozer.year`),
        residentsPlaced: readNumber(
          `${c}.tail_scenario.crozer.residents_placed`
        ),
        costNote: readString(`${c}.tail_scenario.crozer.cost_note`),
      },
      // `tail_scenario.ui_rule` is deliberately not read, for the same reason as
      // labeling_requirement above: it tells the implementer to keep the base
      // rate in the same visual unit as the dollar figure and never multiply
      // them. BandCPanel does exactly that and tests 21 and 22 hold the line.
    },
  }
}

// ---------------------------------------------------------------------------
// 5.7 Break-even, headlines, and the whole result
// ---------------------------------------------------------------------------

export function calculate(inputs: Inputs): Result {
  const warnings: string[] = []

  const facultyHourly = resolveFacultyHourly(inputs)
  const cases = resolveCases(inputs)

  const a1 = leverA1(inputs, facultyHourly)
  const a2 = leverA2(inputs, facultyHourly, cases)
  const bandA = [a1, a2]

  // The only total in the product.
  const bandATotal = addRanges(a1.dollars, a2.dollars)

  const facultyHoursReturned = addRanges(a1.hoursAddressable, a2.hoursAddressable)

  const practiceUnitMinutes = readNumber(
    "lever_a2_remediation_time.practice_unit_minutes.value"
  )
  const practiceRepsDelivered = scaleRange(
    facultyHoursReturned,
    60 / practiceUnitMinutes
  )

  const contractPrice = Math.max(0, inputs.contractPrice)
  const funding = resolveFunding(inputs)
  const extended = extendedYear(inputs, funding, contractPrice)

  const facultyHoursNeeded = safeDivide(contractPrice, facultyHourly.point)
  const extendedYearsNeeded = extended.yearsToBreakEven.point

  const marginRatio: Range = {
    low: safeDivide(bandATotal.low, contractPrice),
    point: safeDivide(bandATotal.point, contractPrice),
    high: safeDivide(bandATotal.high, contractPrice),
  }

  // Every ratio the page renders is computed here, not in a component.
  //
  // Tests 17 and 22 enforce the no-implied-arrow rules by reading source text,
  // and they read the model plus components/roi. Arithmetic that lives in a
  // renderer is arithmetic nobody is checking, so the renderers do formatting
  // and branching only. These two are what the UI used to derive itself.
  //
  // There is deliberately no `1 / extendedYearsNeeded` here. BreakEven used to
  // render one ("one avoided case covers this 3.10 times over") and it is a
  // defensible figure, but the published extension rate is exactly 1.0 per 100
  // trainees per year, which makes it numerically identical to
  // `modeledExtensionRatePer100 / yearsToBreakEven`: the implied-arrow ratio
  // test 17 exists to forbid. No value-based guard can tell the two apart, so
  // the choice was to weaken the guard or drop the number. The copy already
  // stated the same fact the other way up ("the threshold is 0.32 of one"), so
  // dropping it cost a sentence we were saying twice.
  const bandAPerTrainee = safeDivide(bandATotal.point, inputs.trainees)
  const monthsToPayBackOnFacultyTime = safeDivide(
    contractPrice * 12,
    bandATotal.point
  )

  // Faculty time alone either covers the contract at the low end of the band
  // or it does not. Padding Band A to make this true would make the whole page
  // a brochure, so the losing branch is a first-class output.
  const coveredByBandA = bandATotal.low >= contractPrice

  if (!coveredByBandA) {
    warnings.push(
      "Faculty time alone does not cover the contract at this program size."
    )
  }
  if (inputs.trainees <= 0) {
    warnings.push("Enter at least one trainee to see a result.")
  }
  if (inputs.lens === "dio" && inputs.fundingSource === null) {
    warnings.push(
      "Funding source not set, so the extended-year threshold uses marginal cost only."
    )
  }
  if (inputs.hourlyBasis === "clinical") {
    warnings.push(readString("faculty_hourly_value.clinical_basis_warning"))
  }

  const perResidentPerYear = flat(safeDivide(contractPrice, inputs.trainees))

  return {
    lens: inputs.lens,
    inputs,
    facultyHourly,
    bandA,
    bandATotal,
    // Phase 3. Never totalled: Band B lines are other people's budgets with
    // fractional attribution, and no source quantifies how much they overlap.
    bandB: [],
    bandC: buildBandC(inputs.specialty),
    breakEven: {
      contractPrice,
      facultyHoursNeeded,
      extendedYearsNeeded,
      coveredByBandA,
      marginRatio,
    },
    extendedYear: extended,
    funding,
    perResidentPerYear,
    bandAPerTrainee,
    monthsToPayBackOnFacultyTime,
    facultyHoursReturned,
    practiceRepsDelivered,
    remediationCasesUsed: cases,
    warnings,
  }
}

/**
 * The manifest of constants paths this model reads used to be a literal here.
 * It now lives in `referenced-paths.json`, because two things outside the app
 * need to read it: `scripts/roi-public-constants.mjs`, which generates the
 * browser-facing subset from it, and the acceptance tests, which check that the
 * manifest and the paths actually spelled in this file have not drifted apart.
 * Keeping it as TypeScript meant the generator had to regex it out of source.
 */
