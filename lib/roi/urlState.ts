/**
 * Share link encoding.
 *
 * Readable pairs, never a base64 blob. The land is the program director's call
 * and the expansion is the DIO's, so the PD handing a DIO a pre-filled link
 * with their own program's numbers already in it is the motion this exists to
 * serve. A DIO who cannot read what is in the link will not click it.
 */

import { REMEDIATION_BANDS, SPECIALTY_IDS } from "./constants"
import { defaultInputs } from "./defaults"
import type {
  FundingSource,
  HourlyBasis,
  Inputs,
  Lens,
  RemediationBand,
  SpecialtyId,
} from "./types"

const FUNDING_SOURCES: FundingSource[] = [
  "medicare_under_cap",
  "medicare_over_cap",
  "chgme",
  "other",
]

/** Short but still legible. `?lens=pd&spec=pediatrics_general&n=50&price=30000` */
export function encodeInputs(inputs: Inputs): string {
  const base = defaultInputs(inputs.lens, inputs.specialty, inputs.trainees)
  const params = new URLSearchParams()

  params.set("lens", inputs.lens)
  params.set("spec", inputs.specialty)
  params.set("n", String(inputs.trainees))
  if (inputs.lens === "dio") params.set("programs", String(inputs.programs))
  params.set("price", String(Math.round(inputs.contractPrice)))

  // Only non-default refinements travel, so a link from someone who touched
  // nothing but the four quick fields stays short.
  if (inputs.facultyHourlyOverride !== null) {
    params.set("hourly", String(inputs.facultyHourlyOverride))
  }
  if (inputs.fringeRate !== base.fringeRate) {
    params.set("fringe", inputs.fringeRate.toFixed(3))
  }
  if (inputs.hourlyBasis !== base.hourlyBasis) {
    params.set("basis", inputs.hourlyBasis)
  }
  if (inputs.assessmentHoursPerTrainee !== base.assessmentHoursPerTrainee) {
    params.set("hrs", String(inputs.assessmentHoursPerTrainee))
  }
  if (inputs.subcompetencyShare !== base.subcompetencyShare) {
    params.set("share", inputs.subcompetencyShare.toFixed(3))
  }
  if (inputs.depthOfSubstitution !== base.depthOfSubstitution) {
    params.set("depth", inputs.depthOfSubstitution.toFixed(3))
  }
  if (inputs.remediationCases !== base.remediationCases) {
    params.set("cases", inputs.remediationCases)
  }
  if (inputs.remediationExpected !== base.remediationExpected) {
    params.set("expected", inputs.remediationExpected)
  }
  if (inputs.commShare !== base.commShare) {
    params.set("comm", inputs.commShare.toFixed(3))
  }
  if (inputs.hoursPerCase !== base.hoursPerCase) {
    params.set("hpc", String(inputs.hoursPerCase))
  }
  if (inputs.displacementFraction !== base.displacementFraction) {
    params.set("disp", inputs.displacementFraction.toFixed(3))
  }
  if (inputs.lens === "dio") {
    if (inputs.fundingSource !== null) params.set("fund", inputs.fundingSource)
    if (inputs.dgmePerFte !== null) params.set("dgme", String(inputs.dgmePerFte))
  }

  return params.toString()
}

function num(
  params: URLSearchParams,
  key: string,
  fallback: number,
  { min = 0, max = Number.MAX_SAFE_INTEGER } = {}
): number {
  const raw = params.get(key)
  if (raw === null) return fallback
  const parsed = Number(raw)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}

function isRemediationBand(value: string | null): value is RemediationBand {
  return value !== null && value in REMEDIATION_BANDS
}

export function decodeInputs(search: string): Inputs {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search
  )

  const lens: Lens = params.get("lens") === "dio" ? "dio" : "pd"

  const specRaw = params.get("spec")
  const specialty: SpecialtyId = SPECIALTY_IDS.includes(specRaw as SpecialtyId)
    ? (specRaw as SpecialtyId)
    : defaultInputs(lens).specialty

  const traineesDefault = defaultInputs(lens, specialty).trainees
  const trainees = Math.round(
    num(params, "n", traineesDefault, { min: 0, max: 5000 })
  )

  const base = defaultInputs(lens, specialty, trainees)

  const hourlyRaw = params.get("hourly")
  const dgmeRaw = params.get("dgme")
  const fundRaw = params.get("fund")

  return {
    lens,
    specialty,
    trainees,
    programs: Math.round(
      num(params, "programs", base.programs, { min: 1, max: 500 })
    ),
    facultyHourlyOverride:
      hourlyRaw !== null && Number.isFinite(Number(hourlyRaw))
        ? Math.max(0, Number(hourlyRaw))
        : null,
    fringeRate: num(params, "fringe", base.fringeRate, { min: 0, max: 1 }),
    hourlyBasis:
      params.get("basis") === "clinical"
        ? ("clinical" as HourlyBasis)
        : base.hourlyBasis,
    assessmentHoursPerTrainee: num(
      params,
      "hrs",
      base.assessmentHoursPerTrainee,
      { min: 0, max: 60 }
    ),
    subcompetencyShare: num(params, "share", base.subcompetencyShare, {
      min: 0,
      max: 1,
    }),
    depthOfSubstitution: num(params, "depth", base.depthOfSubstitution, {
      min: 0,
      max: 1,
    }),
    remediationCases: isRemediationBand(params.get("cases"))
      ? (params.get("cases") as RemediationBand)
      : base.remediationCases,
    remediationExpected: isRemediationBand(params.get("expected"))
      ? (params.get("expected") as RemediationBand)
      : base.remediationExpected,
    commShare: num(params, "comm", base.commShare, { min: 0, max: 1 }),
    hoursPerCase: num(params, "hpc", base.hoursPerCase, { min: 0, max: 200 }),
    displacementFraction: num(params, "disp", base.displacementFraction, {
      min: 0,
      max: 1,
    }),
    contractPrice: num(params, "price", base.contractPrice, {
      min: 0,
      max: 100_000_000,
    }),
    fundingSource:
      lens === "dio" && FUNDING_SOURCES.includes(fundRaw as FundingSource)
        ? (fundRaw as FundingSource)
        : lens === "dio"
          ? base.fundingSource
          : null,
    dgmePerFte:
      lens === "dio" && dgmeRaw !== null && Number.isFinite(Number(dgmeRaw))
        ? Math.max(0, Number(dgmeRaw))
        : null,
  }
}
