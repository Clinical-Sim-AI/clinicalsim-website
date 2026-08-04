/**
 * Prefill resolution.
 *
 * Nobody fills fifteen fields on a cold landing page. Four fields, all
 * prefilled, produce a real number with zero keystrokes; everything else lives
 * behind "Refine these numbers". Every default below is read from the
 * constants so the methodology drawer can show where it came from.
 */

import {
  PEDIATRIC_SPECIALTIES,
  readNumber,
  readString,
} from "./constants"
import { specialtyRemediationRate } from "./model"
import type { FundingSource, Inputs, Lens, SpecialtyId } from "./types"

/**
 * $50 per user per month, billed annually. User-editable, because the price a
 * program is actually quoted is the number every ratio on the page depends on.
 */
export const LIST_PRICE_PER_LEARNER_YEAR = 600

export const DEFAULT_TRAINEES: Record<Lens, number> = { pd: 50, dio: 400 }
export const DEFAULT_PROGRAMS = 12
export const DEFAULT_SPECIALTY: SpecialtyId = "pediatrics_general"

export function listPrice(trainees: number): number {
  return Math.max(0, Math.round(trainees)) * LIST_PRICE_PER_LEARNER_YEAR
}

export function defaultFundingSource(
  specialty: SpecialtyId
): FundingSource | null {
  // Children's hospitals are mostly CHGME-funded. Defaulting them to Medicare
  // under-cap would produce arithmetic that does not apply to them, so the
  // field starts unset and prompts.
  return PEDIATRIC_SPECIALTIES.has(specialty) ? null : "medicare_under_cap"
}

export function defaultInputs(
  lens: Lens = "pd",
  specialty: SpecialtyId = DEFAULT_SPECIALTY,
  trainees: number = DEFAULT_TRAINEES[lens]
): Inputs {
  return {
    lens,
    specialty,
    trainees,
    programs: DEFAULT_PROGRAMS,
    facultyHourlyOverride: null,
    fringeRate: readNumber("faculty_hourly_value.fringe_rate.default"),
    hourlyBasis: "total",
    assessmentHoursPerTrainee: readNumber(
      "lever_a1_assessment_documentation.hours_per_trainee_year.default"
    ),
    subcompetencyShare: readNumber(
      "lever_a1_assessment_documentation.in_scope_slice.discount_1_subcompetency_share.value"
    ),
    depthOfSubstitution: readNumber(
      "lever_a1_assessment_documentation.in_scope_slice.discount_2_depth_of_substitution.default"
    ),
    remediationCases: "not_sure",
    remediationExpected: "not_sure",
    commShare: readNumber("lever_a2_remediation_time.comm_share.default"),
    hoursPerCase: readNumber("lever_a2_remediation_time.hours_per_case.default"),
    displacementFraction: readNumber(
      "lever_a2_remediation_time.displacement_fraction.default"
    ),
    contractPrice: listPrice(trainees),
    fundingSource: lens === "dio" ? defaultFundingSource(specialty) : null,
    dgmePerFte: null,
  }
}

/** Source strings for the "where did this default come from" affordance. */
export const DEFAULT_SOURCES: Record<string, string> = {
  facultyHourly:
    "MGMA 2025 Academic Compensation, associate professor, Eastern region, plus a 22% fringe load over 2,080 annual hours.",
  fringeRate:
    "Emory publishes 15.20% for physicians, Iowa 24.2% for clinical faculty. Your sponsored programs office has your institution's exact rate.",
  assessmentHoursPerTrainee:
    "Goyal et al., Med Educ Online 2018: 23.5 faculty-hours a month across 42 trainees, which is 6.7 hours per trainee per year.",
  subcompetencyShare:
    "Roughly 6 to 7 of about 23 subcompetencies are interpersonal and communication skills or professionalism.",
  depthOfSubstitution:
    "The platform shortens evidence gathering and defense. It does not remove the CCC meeting, the deliberation, or the ADS entry.",
  remediationCases:
    "Nelsen 2025 for pediatrics, Frazier 2021 for family medicine, Silverberg 2015 for emergency medicine, with a floor of one case per program per year.",
  commShare:
    "Professionalism is the leading primary trigger in family medicine, and professionalism plus ICS account for roughly 57% of emergency medicine cases.",
  hoursPerCase:
    "Guerrasio & Aagaard 2014 report a mean of 29.6 specialist contact hours, which excludes program director, CCC, coordinator, and legal time.",
  displacementFraction:
    "An assumption, labeled as one. The value is faculty hours redirected from facilitation to judgment, not deleted.",
  contractPrice:
    "$50 per user per month billed annually. Enter the figure you were quoted.",
  dgmePerFte:
    "Per-resident Medicare GME payments run $68,000 to $279,000 (GAO-21-391). A national average applied to a specific hospital will be wrong by a wide margin, so this field ships blank.",
}

export function remediationPrefillLabel(
  specialty: SpecialtyId,
  trainees: number
): string {
  const rate = specialtyRemediationRate(specialty)
  const floor = readNumber(
    "lever_a2_remediation_time.cases_per_program_floor.default"
  )
  const scaled = (Math.max(0, trainees) * rate) / 100
  const resolved = Math.max(floor, scaled)
  return `${resolved.toFixed(1)} cases a year at ${rate} per 100 trainees, floored at ${floor} per program`
}

export const PEER_COMPARISON_LINE = readString(
  "lever_a2_remediation_time.peer_comparison_line"
)

export const PRIVACY_LINE = `${readString("privacy_copy")} If you want to share these numbers, use the link button. We do not ask for an email and there is nothing to submit.`
