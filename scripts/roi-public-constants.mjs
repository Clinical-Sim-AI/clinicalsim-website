/**
 * Builds lib/roi/constants.public.json from lib/roi/constants.json.
 *
 * Why this exists. The calculator is interactive, so `calculate()` has to run
 * in the browser, so whatever the model imports ends up in the client bundle.
 * constants.json is the full research file: it carries unverified figures,
 * "do not publish" instructions, competitor pricing, per-source caveats written
 * for us rather than for a customer, and a Band B section that ships nothing.
 * `readConstant` stopped that from being *rendered*, but it never stopped it
 * from being *downloaded and read in devtools*.
 *
 * So the browser gets a generated subset containing only the paths in
 * referenced-paths.json, with research-only keys pruned. The research file is
 * imported by this script and by the test suite, and by nothing the app builds.
 *
 * Run: pnpm roi:constants
 */

import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
export const RESEARCH_PATH = join(ROOT, "lib/roi/constants.json")
export const PUBLIC_PATH = join(ROOT, "lib/roi/constants.public.json")
export const MANIFEST_PATH = join(ROOT, "lib/roi/referenced-paths.json")

/**
 * Prefixes the research uses to mark a value as not publishable. A string
 * starting with one of these never reaches the public file.
 */
export const BLOCKED_PREFIXES = [
  "UNSOURCED",
  "UNVERIFIED",
  "BLOCKED",
  "NOT PUBLISHED",
  "NEVER PUBLISHED",
  "DO NOT PUBLISH",
]

/**
 * Keys that exist for whoever maintains the research, not for the reader of a
 * landing page: derivations, provenance, "confirm this before publication",
 * "pick one and say why". They get pruned out of any object the manifest pulls
 * in wholesale.
 *
 * A key here is still kept when the manifest names it explicitly, which is how
 * `band_c_documented_properly.rationale` (rendered) and
 * `lever_a2_remediation_time.cases_per_program_floor.rationale` (a research
 * note) can share a key name without sharing a fate.
 */
export const RESEARCH_ONLY_KEYS = new Set([
  "action",
  "also_unsourced",
  "arithmetic",
  "band_note",
  "basis",
  "blocked_on",
  "caveat",
  "certainty",
  "cite",
  "citation_note",
  "citation_style",
  "counter_evidence",
  "denominator",
  "do_not_use",
  "framing_internal",
  "full_outcome_breakdown",
  "guidance",
  "internal_conflict",
  "internal_rates",
  "label",
  "location_note",
  "low_bound_basis",
  "note",
  "primary_source",
  "provenance_note",
  "rationale",
  "render",
  "supersedes",
  "supporting",
  "supporting_citation_note",
  "usage_note",
  "why_included",
  "why_it_matters",
  "worked_example",
])

export function isBlockedValue(value) {
  if (typeof value !== "string") return false
  const v = value.trim().toUpperCase()
  return BLOCKED_PREFIXES.some((p) => v.startsWith(p))
}

function resolve(source, path) {
  let node = source
  for (const segment of path.split(".")) {
    if (node === null || typeof node !== "object") return undefined
    node = node[segment]
  }
  return node
}

/**
 * Copy `value`, dropping research-only keys and anything tagged unpublishable.
 * `path` is where we are, so an explicitly manifested child survives the
 * key denylist.
 */
function prune(value, path, manifested) {
  if (isBlockedValue(value)) return undefined
  if (Array.isArray(value)) {
    return value
      .map((child, i) => prune(child, `${path}[${i}]`, manifested))
      .filter((child) => child !== undefined)
  }
  if (value && typeof value === "object") {
    const out = {}
    for (const [key, child] of Object.entries(value)) {
      const childPath = `${path}.${key}`
      if (RESEARCH_ONLY_KEYS.has(key) && !manifested.has(childPath)) continue
      const pruned = prune(child, childPath, manifested)
      if (pruned !== undefined) out[key] = pruned
    }
    return out
  }
  return value
}

const isPlainObject = (v) =>
  v !== null && typeof v === "object" && !Array.isArray(v)

/**
 * Merge rather than assign, and never clobber.
 *
 * The manifest names overlapping paths on purpose: the depth-of-substitution
 * band is read whole by `readBand`, and `.basis` and `.supporting` under it are
 * read individually because they survive the research-key pruning the parent
 * gets. Assigning would mean whichever of those landed last won, which silently
 * dropped `low`/`default`/`high` and only showed up as "constant does not exist"
 * at the first `defaultInputs()` call.
 */
function mergeInto(target, key, value) {
  const existing = target[key]
  if (isPlainObject(existing) && isPlainObject(value)) {
    for (const [k, v] of Object.entries(value)) mergeInto(existing, k, v)
    return
  }
  if (existing === undefined) target[key] = value
}

function setPath(target, path, value) {
  const segments = path.split(".")
  let node = target
  for (const segment of segments.slice(0, -1)) {
    if (!isPlainObject(node[segment])) node[segment] = {}
    node = node[segment]
  }
  mergeInto(node, segments[segments.length - 1], value)
}

export function buildPublicConstants(research, paths) {
  const manifested = new Set(paths)
  // Shallowest first, so a parent object lands before the leaves the manifest
  // names inside it, and `mergeInto` folds those leaves in on top. Parent
  // pruning already keeps any explicitly manifested child, so this ordering is
  // belt and braces rather than the only thing holding it together.
  const ordered = [...paths].sort(
    (a, b) => a.split(".").length - b.split(".").length || a.localeCompare(b)
  )

  const out = {
    _meta: {
      version: research._meta.version,
      generated_from: "lib/roi/constants.json",
      generated_by: "scripts/roi-public-constants.mjs",
      note: "Generated subset. Do not edit by hand: run pnpm roi:constants.",
    },
  }

  const missing = []
  for (const path of ordered) {
    const value = resolve(research, path)
    if (value === undefined) {
      missing.push(path)
      continue
    }
    const pruned = prune(value, path, manifested)
    if (pruned === undefined) {
      missing.push(path)
      continue
    }
    setPath(out, path, pruned)
  }

  if (missing.length > 0) {
    throw new Error(
      `referenced-paths.json names paths that do not resolve in the research file, or that resolve to an unpublishable value:\n  ${missing.join("\n  ")}`
    )
  }

  return out
}

export function readResearch() {
  return JSON.parse(readFileSync(RESEARCH_PATH, "utf8"))
}

export function readManifest() {
  return JSON.parse(readFileSync(MANIFEST_PATH, "utf8")).paths
}

export function serialize(value) {
  return `${JSON.stringify(value, null, 2)}\n`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const built = buildPublicConstants(readResearch(), readManifest())
  writeFileSync(PUBLIC_PATH, serialize(built))
  const before = readFileSync(RESEARCH_PATH, "utf8").length
  const after = serialize(built).length
  console.log(
    `lib/roi/constants.public.json written: ${(after / 1024).toFixed(1)} KB, down from ${(before / 1024).toFixed(1)} KB of research (${Math.round((1 - after / before) * 100)}% smaller).`
  )
}
