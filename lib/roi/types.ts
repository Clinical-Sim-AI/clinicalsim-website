/**
 * ROI calculator types.
 *
 * The result contract from build spec v2 section 2, with the v2 changes:
 * Lever A1 carries both `hoursCurrent` (the burden, never priced) and
 * `hoursAddressable` (the claim), and Band C is a structured panel rather
 * than a string array.
 *
 * There is deliberately no Band B total here, as a type or anything else, and
 * there never will be. Band B lines are other people's budgets with fractional
 * attribution and undocumented overlap, so they are non-additive by design.
 * Acceptance test 8 scans these files for the identifier and fails on a hit.
 */

export type Range = { low: number; point: number; high: number }

export type Lens = "pd" | "dio"

export type FundingSource =
  | "medicare_under_cap"
  | "medicare_over_cap"
  | "chgme"
  | "other"

export type HourlyBasis = "total" | "clinical"

export type Confidence = "Confirmed" | "Estimated" | "Inferred"

/**
 * Banded select rather than a number input. This is the one field that asks
 * someone to report a shortcoming about their own program, and `not_sure` is
 * expected to be the most-used answer.
 */
export type RemediationBand =
  | "0"
  | "1-2"
  | "3-5"
  | "6-10"
  | "more_than_10"
  | "not_sure"

export type SpecialtyId =
  | "pediatrics_general"
  | "family_medicine"
  | "pediatric_critical_care"
  | "internal_medicine_general"
  | "emergency_medicine"
  | "obgyn"
  | "neonatology"
  | "surgery_general"

export type Inputs = {
  lens: Lens
  specialty: SpecialtyId
  trainees: number
  /** DIO lens only. */
  programs: number
  /** When set, overrides the specialty table. Renders as a flat point. */
  facultyHourlyOverride: number | null
  fringeRate: number
  hourlyBasis: HourlyBasis
  assessmentHoursPerTrainee: number
  subcompetencyShare: number
  depthOfSubstitution: number
  remediationCases: RemediationBand
  remediationExpected: RemediationBand
  commShare: number
  hoursPerCase: number
  displacementFraction: number
  contractPrice: number
  /** DIO lens only. Null means "unset, prompt the user". */
  fundingSource: FundingSource | null
  /** DIO lens only. Null means "blank, use the placeholder in copy only". */
  dgmePerFte: number | null
}

export type Discount = {
  id: string
  label: string
  value: number
  basis: string
  confidence: Confidence
}

export type BandALine = {
  id: string
  label: string
  /** The burden. Rendered, never priced. */
  hoursCurrent: Range
  /** The claim. This is what the dollars are computed from. */
  hoursAddressable: Range
  /** Shown explicitly on the results panel, per in_scope_slice.ui_requirement. */
  discounts: Discount[]
  dollars: Range
  /** Constants paths, for the methodology drawer. */
  assumptions: string[]
  confidence: Confidence
  note: string
}

/** Phase 3. `Result.bandB` is always an empty array in this build. */
export type BandBCard = {
  id: string
  label: string
  dollars: Range
  attributionFactor: number
  attributionDefault: number
  defaultsToZero: boolean
  citations: string[]
  disclaimer: string
}

export type BandCRequirement = {
  requirement: string
  demands: string
  artifact: string
}

export type BandCCitationRank = {
  /** Empty when the specialty is published as absent from top themes. */
  kind: "specialty" | "general" | "silent"
  specialtyKey: string | null
  rank: number | null
  of: number | null
  /** How ACGME classified it when there is no numeric rank. */
  theme: string | null
  detail: string | null
  statement: string | null
}

export type BandCPanel = {
  isPriced: false
  hasTotal: false
  header: string
  subhead: string
  rationale: string
  requirements: BandCRequirement[]
  requirementsSource: string
  requirementsUrl: string
  reviewersExamine: { quote: string; cite: string; url: string }
  citationRank: BandCCitationRank
  baseRates: {
    totalPrograms: number
    warning: { count: number; share: number }
    probation: { count: number; share: number }
    withdrawal: { count: number; share: number }
    fourYearSeries: {
      warning: number[]
      probation: number[]
      withdrawal: number[]
    }
    randomSiteVisitsThisYear: number
    adverseRateGivenVisit: number
    year: string
    source: string
  }
  machinery: { requirement: string; text: string }[]
  machinerySource: string
  machineryUrl: string
  renumberingWarning: string
  asymmetry: {
    statusPublic: boolean
    pastStatusesPublic: boolean
    citationsPublic: boolean
    citationsQuote: string
    knownGap: string
  }
  shortcutFinding: {
    fullMinutes: number
    adHocMinutes: number
    agreement: string
    cite: string
  }
  hardFees: {
    items: { label: string; amount: number }[]
    scaling: string
    framing: string
    year: number
    url: string
  }
  tail: {
    medicareGmePerResidentYear: number
    range: [number, number]
    dollarYear: number
    twelveResidentExample: number
    /** Always travels with the dollar figures. Never multiplied by them. */
    baseRateToShowAdjacent: number
    capTransferRule: string
    hahnemann: {
      year: number
      displaced: number
      programsClosed: number
      gmeSlotSale: number
      perSlot: number
      stalkingHorseBid: number
      absorbedByConsortium: number
      placementCostNote: string
    }
    crozer: { year: number; residentsPlaced: number; costNote: string }
    uiRule: string
  }
}

export type ExtendedYearResult = {
  presentation: "BREAK-EVEN ONLY"
  marginalCostPerYear: Range
  /** Null unless the DIO lens resolves a Medicare under-cap funding source. */
  dgmeForgonePerYear: Range | null
  totalCostPerExtendedYear: Range
  /** The threshold. The only number this lever is allowed to headline. */
  yearsToBreakEven: Range
  /** Separately labeled context. Never placed in a ratio against the threshold. */
  modeledExtensionRatePer100: Range
  modeledExtensionsAtThisSize: Range
  perCaseAdditionalTrainingTime: number
  perCaseFullRepeatYear: number
  labeling: string
  /** Explicitly null. This lever does not project a dollar saving. */
  projectedSaving: null
}

export type FundingResult = {
  source: FundingSource | null
  showsDollarFigure: boolean
  dgmeForgone: Range | null
  imeForgone: number
  copy: string
  sharpFacts: string[]
  dgmePerFteUsed: number | null
  dgmePerFtePlaceholder: number
  perResidentSpread: [number, number]
}

export type Result = {
  lens: Lens
  inputs: Inputs
  facultyHourly: Range
  bandA: BandALine[]
  /** The only total in the product. */
  bandATotal: Range
  bandB: BandBCard[]
  bandC: BandCPanel
  breakEven: {
    contractPrice: number
    facultyHoursNeeded: number
    extendedYearsNeeded: number
    coveredByBandA: boolean
    marginRatio: Range
  }
  extendedYear: ExtendedYearResult
  funding: FundingResult | null
  perResidentPerYear: Range
  facultyHoursReturned: Range
  /** Reps the program cannot currently schedule, at the 20-minute unit. */
  practiceRepsDelivered: Range
  remediationCasesUsed: Range
  warnings: string[]
}
