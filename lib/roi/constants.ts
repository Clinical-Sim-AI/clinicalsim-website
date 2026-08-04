/**
 * Typed, frozen access to the ROI constants.
 *
 * Rule 1 of the build spec: no number is hardcoded in application code. Every
 * figure loads from the constants, and every read goes through `readConstant`,
 * which throws on a missing path, on anything the research tagged
 * unpublishable, and on the deprecated v1 reduction fraction.
 *
 * That is what makes acceptance tests 7 and 14 real rather than decorative:
 * a renderer that reaches for an unsourced figure fails loudly at the read.
 *
 * ## Why this imports the .public file
 *
 * The calculator is interactive, so `calculate()` runs in the browser, so
 * whatever this module imports is downloadable by anyone who opens devtools.
 * `constants.json` is the research file: unverified figures, "do not publish"
 * instructions, competitor pricing, a Band B section that ships nothing, notes
 * written for us rather than for a program director. Blocking those from
 * rendering was never the same as keeping them private.
 *
 * So the browser gets `constants.public.json`, a generated subset holding only
 * the paths in `referenced-paths.json` with research-only keys pruned. Roughly
 * 18 KB instead of 75 KB, and nothing in it we would mind a customer reading.
 * Regenerate with `pnpm roi:constants`; the tests fail if it drifts.
 */

import raw from "./constants.public.json"
import type { SpecialtyId } from "./types"

export type Constants = typeof raw

/**
 * Deep-frozen, not shallow. `Object.freeze` on the root still leaves every
 * nested object writable, and this module hands callers direct references to
 * nested arrays and objects (`sharp_facts`, `institutional_machinery`,
 * `surviving_requirements_detail`), so a caller could mutate the constants for
 * every later reader in the same page session.
 */
function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value)) deepFreeze(child)
  }
  return value
}

export const CONSTANTS: Constants = deepFreeze(raw) as Constants

export const CONSTANTS_VERSION = raw._meta.version

/**
 * String prefixes the research uses to mark a figure as not publishable.
 * "UNSOURCED" is the tag the confidence scale defines; the rest are the
 * phrasings the same authors used for the same meaning in v1.
 */
const BLOCKED_PREFIXES = [
  "UNSOURCED",
  "UNVERIFIED",
  "BLOCKED",
  "NOT PUBLISHED",
  "NEVER PUBLISHED",
  "DO NOT PUBLISH",
] as const

function isBlockedValue(value: unknown): boolean {
  if (typeof value !== "string") return false
  const v = value.trim().toUpperCase()
  return BLOCKED_PREFIXES.some((p) => v.startsWith(p))
}

function collectUnsourced(
  node: unknown,
  path: string,
  out: Set<string>
): void {
  if (isBlockedValue(node)) {
    out.add(path)
    return
  }
  if (Array.isArray(node)) {
    node.forEach((child, i) => collectUnsourced(child, `${path}[${i}]`, out))
    return
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>
    for (const [key, child] of Object.entries(obj)) {
      const childPath = path ? `${path}.${key}` : key
      collectUnsourced(child, childPath, out)
      // A sibling `<name>_status` of "UNSOURCED" poisons `<name>` too, which is
      // how v1 marked the 1:1 review duration.
      if (key.endsWith("_status") && isBlockedValue(child)) {
        const sibling = key.slice(0, -"_status".length)
        out.add(path ? `${path}.${sibling}` : sibling)
      }
      // Same for an explicit confidence tag of UNSOURCED on a block.
      if (
        (key === "confidence" || key === "status") &&
        isBlockedValue(child) &&
        path
      ) {
        out.add(path)
      }
    }
  }
}

const unsourced = new Set<string>()
collectUnsourced(raw, "", unsourced)

/**
 * Every path in the shipped constants that is tagged unpublishable.
 *
 * Expected to be empty, because the generator refuses to copy a blocked value
 * into the public file in the first place, and `model.test.ts` asserts that it
 * is. It is still computed here rather than deleted: this is the check that
 * would catch a hand-edited public file, and the research-side audit (which
 * does find blocked paths, and must keep finding them) lives in the tests where
 * it can read `constants.json` off disk without shipping it.
 */
export const UNSOURCED_PATHS: ReadonlySet<string> = Object.freeze(unsourced)

/**
 * Superseded by `lever_a1_assessment_documentation.in_scope_slice`. It stays in
 * the JSON only so v1 results remain reproducible; reading it is a bug.
 */
const DEPRECATED_PREFIXES = [
  "lever_a1_assessment_documentation.reduction_fraction",
] as const

export class ConstantAccessError extends Error {}

function resolve(path: string): unknown {
  let node: unknown = raw
  for (const segment of path.split(".")) {
    if (node === null || typeof node !== "object") return undefined
    node = (node as Record<string, unknown>)[segment]
  }
  return node
}

/**
 * Read a dotted path out of the constants. Throws rather than returning
 * undefined so a typo surfaces at the first call instead of rendering NaN.
 */
export function readConstant<T = unknown>(path: string): T {
  for (const prefix of DEPRECATED_PREFIXES) {
    if (path === prefix || path.startsWith(`${prefix}.`)) {
      throw new ConstantAccessError(
        `Constant "${path}" is deprecated and superseded by lever_a1_assessment_documentation.in_scope_slice. It exists only to reproduce v1 results.`
      )
    }
  }
  if (UNSOURCED_PATHS.has(path)) {
    throw new ConstantAccessError(
      `Constant "${path}" is tagged unsourced or unverified and must not be rendered.`
    )
  }
  // Reading an ancestor of a blocked path hands the caller the blocked value
  // inside the returned object, which is how the five Band C hard fees used to
  // get read: one `readConstant` on the parent, then a cast per field. An exact
  // path match alone would not have caught a blocked child, and the value would
  // have reached `formatCurrency`, which renders a missing number as "$0".
  for (const blocked of UNSOURCED_PATHS) {
    if (blocked.startsWith(`${path}.`) || blocked.startsWith(`${path}[`)) {
      throw new ConstantAccessError(
        `Constant "${path}" contains "${blocked}", which is tagged unsourced or unverified. Read the publishable fields individually instead of the parent.`
      )
    }
  }
  const value = resolve(path)
  if (value === undefined) {
    throw new ConstantAccessError(`Constant "${path}" does not exist.`)
  }
  if (isBlockedValue(value)) {
    throw new ConstantAccessError(
      `Constant "${path}" holds an unpublishable marker: ${String(value)}`
    )
  }
  return value as T
}

export function readNumber(path: string): number {
  const value = readConstant(path)
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ConstantAccessError(`Constant "${path}" is not a finite number.`)
  }
  return value
}

export function readString(path: string): string {
  const value = readConstant(path)
  if (typeof value !== "string") {
    throw new ConstantAccessError(`Constant "${path}" is not a string.`)
  }
  return value
}

/** A `{default, low, high}` block read as a Range. */
export function readBand(path: string): {
  low: number
  point: number
  high: number
} {
  return {
    low: readNumber(`${path}.low`),
    point: readNumber(`${path}.default`),
    high: readNumber(`${path}.high`),
  }
}

// ---------------------------------------------------------------------------
// Specialty registry
// ---------------------------------------------------------------------------

/**
 * `label` is for the select. `prose` is the same specialty written the way it
 * reads mid-sentence, because "In internal medicine, general, evaluation
 * ranks..." is not a sentence anyone would write.
 */
export const SPECIALTIES: ReadonlyArray<{
  id: SpecialtyId
  label: string
  prose: string
}> = [
  {
    id: "pediatrics_general",
    label: "Pediatrics, general",
    prose: "general pediatrics",
  },
  {
    id: "family_medicine",
    label: "Family medicine",
    prose: "family medicine",
  },
  {
    id: "internal_medicine_general",
    label: "Internal medicine, general",
    prose: "general internal medicine",
  },
  {
    id: "emergency_medicine",
    label: "Emergency medicine",
    prose: "emergency medicine",
  },
  { id: "obgyn", label: "OB/GYN", prose: "OB/GYN" },
  {
    id: "pediatric_critical_care",
    label: "Pediatric critical care",
    prose: "pediatric critical care",
  },
  { id: "neonatology", label: "Neonatology", prose: "neonatology" },
  {
    id: "surgery_general",
    label: "Surgery, general",
    prose: "general surgery",
  },
]

export const SPECIALTY_IDS = SPECIALTIES.map((s) => s.id)

/**
 * `band_c_documented_properly.citation_rank_by_specialty` is keyed by ACGME
 * review-committee naming, which does not match the selector's specialty ids.
 *
 * Five of the eight selectable specialties have no published citation rank, so
 * they map to null and take the general statement. `pediatrics` is present in
 * the table precisely to record that it does NOT appear in top themes, so it
 * renders nothing at all. Otolaryngology, diagnostic radiology, and PM&R are
 * in the table but are not selectable here, so they are unreachable.
 */
export const SPECIALTY_CITATION_MAP: Readonly<
  Record<SpecialtyId, string | null>
> = Object.freeze({
  pediatrics_general: "pediatrics",
  internal_medicine_general: "internal_medicine",
  obgyn: "obgyn",
  family_medicine: null,
  emergency_medicine: null,
  pediatric_critical_care: null,
  neonatology: null,
  surgery_general: null,
})

/**
 * Remediation base rates exist for three specialties only. Everything else
 * takes `default_other`. The pediatric fellowships are deliberately NOT mapped
 * to the pediatrics rate: Nelsen 2025 measured general pediatrics residents.
 */
export const SPECIALTY_REMEDIATION_MAP: Readonly<Record<SpecialtyId, string>> =
  Object.freeze({
    pediatrics_general: "pediatrics",
    family_medicine: "family_medicine",
    emergency_medicine: "emergency_medicine",
    internal_medicine_general: "default_other",
    obgyn: "default_other",
    pediatric_critical_care: "default_other",
    neonatology: "default_other",
    surgery_general: "default_other",
  })

/**
 * Children's hospitals are mostly CHGME-funded, so the funding selector starts
 * unset for these and prompts instead of defaulting to Medicare math.
 */
export const PEDIATRIC_SPECIALTIES: ReadonlySet<SpecialtyId> = new Set([
  "pediatrics_general",
  "pediatric_critical_care",
  "neonatology",
])

/** Band midpoints for the remediation select. */
export const REMEDIATION_BANDS: Readonly<
  Record<string, { low: number; point: number; high: number } | null>
> = Object.freeze({
  "0": { low: 0, point: 0, high: 0 },
  "1-2": { low: 1, point: 1.5, high: 2 },
  "3-5": { low: 3, point: 4, high: 5 },
  "6-10": { low: 6, point: 8, high: 10 },
  // Open-ended, so there is no midpoint. The lower edge is the conservative
  // reading and inventing a ceiling would be unsourced.
  more_than_10: { low: 11, point: 11, high: 11 },
  not_sure: null,
})
