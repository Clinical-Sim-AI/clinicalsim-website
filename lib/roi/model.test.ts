/**
 * Acceptance tests, build spec v2 section 11.
 *
 * These were written before the UI. Tests 1 through 14 come from v1, tests 15
 * through 24 from the v2 changeset. Several of them exist to stop the
 * calculator turning into a brochure, which is a failure mode no amount of
 * visual polish recovers from.
 */

import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import {
  CONSTANTS,
  ConstantAccessError,
  SPECIALTIES,
  SPECIALTY_CITATION_MAP,
  UNSOURCED_PATHS,
  readConstant,
  readNumber,
} from "./constants"
import { defaultInputs, listPrice } from "./defaults"
import { buildCitationRank, calculate, envelope } from "./model"
import type { Inputs, Range, Result, SpecialtyId } from "./types"
import {
  buildPublicConstants,
  isBlockedValue,
  readManifest,
  readResearch,
  serialize,
} from "../../scripts/roi-public-constants.mjs"

const SOURCE_DIR = __dirname
const REPO_ROOT = join(SOURCE_DIR, "..", "..")

function readSource(file: string): string {
  return readFileSync(join(SOURCE_DIR, file), "utf8")
}

const MODEL_SOURCE = readSource("model.ts")
const CONSTANTS_SOURCE = readSource("constants.ts")
const TYPES_SOURCE = readSource("types.ts")

/** Every constants path the model and its renderers read. */
const REFERENCED_CONSTANT_PATHS: readonly string[] = readManifest()

/**
 * The full research file, read off disk rather than imported.
 *
 * Importing it is the thing this whole arrangement exists to prevent: anything
 * a module under lib/ or components/ imports ends up in the client bundle. Tests
 * run in node, so they can read it freely.
 */
const RESEARCH = readResearch()

/**
 * Every renderer, concatenated. Tests 17 and 22 assert that no code path turns
 * a base rate or a modeled extension rate into a dollar claim, and they do it by
 * reading source text. Reading only model.ts left the components free to derive
 * whatever they liked, and three of them were doing their own division.
 */
const RENDERER_SOURCE = (() => {
  const dir = join(REPO_ROOT, "components/roi")
  return readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => readFileSync(join(dir, f), "utf8"))
    .join("\n")
})()

/**
 * Comments stripped, for the checks that look for arithmetic operators.
 *
 * Without this, `result.extendedYear` on one line followed by a `//` comment on
 * the next reads as a division: the `/` of the comment marker is a `/`. These
 * files carry long explanatory comments that name the very fields being
 * searched for, so scanning raw source produces false positives that would get
 * "fixed" by deleting the explanations.
 */
function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1")
}

const RENDERER_CODE = stripComments(RENDERER_SOURCE)
const CALCULATION_SOURCE = stripComments(`${MODEL_SOURCE}\n${RENDERER_SOURCE}`)

/** The default worked case: PD lens, pediatrics, 50 trainees, $30,000. */
function pdDefault(overrides: Partial<Inputs> = {}): Inputs {
  return { ...defaultInputs("pd"), ...overrides }
}

function collectNumbers(node: unknown, out: number[] = []): number[] {
  if (typeof node === "number") {
    out.push(node)
  } else if (Array.isArray(node)) {
    node.forEach((child) => collectNumbers(child, out))
  } else if (node && typeof node === "object") {
    Object.values(node as Record<string, unknown>).forEach((child) =>
      collectNumbers(child, out)
    )
  }
  return out
}

function collectKeys(node: unknown, out: string[] = []): string[] {
  if (Array.isArray(node)) {
    node.forEach((child) => collectKeys(child, out))
  } else if (node && typeof node === "object") {
    for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
      out.push(key)
      collectKeys(child, out)
    }
  }
  return out
}

/**
 * Every path in `node` holding a value the research tagged unpublishable.
 *
 * This is the audit that used to live in constants.ts against the imported
 * research file. It moved here when the browser stopped getting that file:
 * auditing the research is a build-time job, and doing it at module load meant
 * shipping the thing being audited.
 */
function collectBlockedPaths(node: unknown, path = "", out = new Set<string>()) {
  if (isBlockedValue(node)) {
    out.add(path)
    return out
  }
  if (Array.isArray(node)) {
    node.forEach((child, i) => collectBlockedPaths(child, `${path}[${i}]`, out))
    return out
  }
  if (node && typeof node === "object") {
    for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
      const childPath = path ? `${path}.${key}` : key
      collectBlockedPaths(child, childPath, out)
      // A sibling `<name>_status` of "UNSOURCED" poisons `<name>` too, which is
      // how v1 marked the 1:1 review duration.
      if (key.endsWith("_status") && isBlockedValue(child)) {
        const sibling = key.slice(0, -"_status".length)
        out.add(path ? `${path}.${sibling}` : sibling)
      }
      if (
        (key === "confidence" || key === "status") &&
        isBlockedValue(child) &&
        path
      ) {
        out.add(path)
      }
    }
  }
  return out
}

/** Mirrors readConstant's rejection rule: the path itself, or any ancestor. */
function pathIsGuarded(path: string, blocked: Set<string>): boolean {
  if (blocked.has(path)) return true
  for (const b of blocked) {
    if (b.startsWith(`${path}.`) || b.startsWith(`${path}[`)) return true
  }
  return false
}

function everyRange(result: Result): Range[] {
  const found: Range[] = []
  const visit = (node: unknown) => {
    if (Array.isArray(node)) {
      node.forEach(visit)
      return
    }
    if (node && typeof node === "object") {
      const obj = node as Record<string, unknown>
      if (
        typeof obj.low === "number" &&
        typeof obj.point === "number" &&
        typeof obj.high === "number"
      ) {
        found.push(obj as Range)
      }
      Object.values(obj).forEach(visit)
    }
  }
  visit(result)
  return found
}

// ---------------------------------------------------------------------------
// Correctness
// ---------------------------------------------------------------------------

describe("correctness", () => {
  it("1. zero trainees returns zeros, not NaN and not a division error", () => {
    const result = calculate(pdDefault({ trainees: 0, contractPrice: 0 }))

    for (const value of collectNumbers(result)) {
      expect(Number.isFinite(value)).toBe(true)
    }

    expect(result.bandA[0].hoursCurrent.point).toBe(0)
    expect(result.bandA[0].hoursAddressable.point).toBe(0)
    expect(result.bandA[0].dollars.point).toBe(0)
    expect(result.perResidentPerYear.point).toBe(0)
    expect(result.breakEven.marginRatio.point).toBe(0)
  })

  it("2. a 12-resident program with zero remediation is not covered by Band A", () => {
    // If this ever fails, the calculator has become a brochure.
    const result = calculate(
      pdDefault({
        trainees: 12,
        remediationCases: "0",
        remediationExpected: "0",
        contractPrice: listPrice(12),
      })
    )

    expect(result.bandA[1].dollars.point).toBe(0)
    expect(result.breakEven.coveredByBandA).toBe(false)
    expect(result.warnings.join(" ")).toContain(
      "does not cover the contract"
    )
  })

  it("3. a 400-resident DIO rollup lands inside the plausible per-resident band", () => {
    const result = calculate(
      defaultInputs("dio", "internal_medicine_general", 400)
    )

    expect(result.perResidentPerYear.point).toBe(600)
    expect(result.perResidentPerYear.point).toBeGreaterThan(0)
    expect(result.perResidentPerYear.point).toBeLessThan(5000)
  })

  it("4. 'not sure' takes the specialty prefill and the floor holds at any size", () => {
    const peds = calculate(pdDefault({ remediationExpected: "not_sure" }))
    // 50 trainees x 1.6 per 100 = 0.8, so the floor of 1.0 is what binds.
    expect(peds.remediationCasesUsed.point).toBeCloseTo(1.0, 6)

    for (const trainees of [1, 5, 12, 25, 50, 120, 400, 2000]) {
      const result = calculate(pdDefault({ trainees }))
      expect(result.remediationCasesUsed.point).toBeGreaterThanOrEqual(1.0)
    }

    // Family medicine scales above the floor at 50 trainees: 50 x 4.5 / 100.
    const fm = calculate(pdDefault({ specialty: "family_medicine" }))
    expect(fm.remediationCasesUsed.point).toBeCloseTo(2.25, 6)
  })

  it("5. every returned range satisfies low <= point <= high", () => {
    const cases: Inputs[] = [
      pdDefault(),
      pdDefault({ trainees: 12, remediationExpected: "0" }),
      pdDefault({ hourlyBasis: "clinical" }),
      defaultInputs("dio", "surgery_general", 400),
      defaultInputs("dio", "pediatrics_general", 250),
      pdDefault({ remediationExpected: "more_than_10" }),
      pdDefault({ trainees: 0 }),
    ]

    for (const input of cases) {
      for (const range of everyRange(calculate(input))) {
        expect(range.low).toBeLessThanOrEqual(range.point + 1e-9)
        expect(range.point).toBeLessThanOrEqual(range.high + 1e-9)
      }
    }
  })

  it("6. the Band A low bound is not the product of all component lows", () => {
    const result = calculate(pdDefault())

    // Compounded conservatism, the thing spec 5.2 exists to prevent.
    const compounded =
      50 * 4.5 * 0.3 * 0.3 * (121 * (115 / 145)) + // A1 all-lows
      0.8 * 0.25 * 20 * 0.25 * (121 * (115 / 145)) // A2 all-lows

    expect(result.bandATotal.low).toBeGreaterThan(compounded)
    expect(result.bandATotal.low).toBeCloseTo(3630.0, 4)

    // And the envelope helper itself varies one dimension at a time.
    const env = envelope(
      [
        { low: 1, point: 2, high: 3 },
        { low: 1, point: 2, high: 3 },
      ],
      ([a, b]) => a * b
    )
    expect(env.low).toBe(2) // 1 x 2, not 1 x 1
    expect(env.high).toBe(6) // 3 x 2, not 3 x 3
  })

  it("14b. the faculty hourly figure is fringe-scaled, so nobody may re-read the table", () => {
    // The specialty table is built at the default 22% fringe. RefinePanel used to
    // read that table directly to show "Default is $X an hour", which meant the
    // panel said $121 while every dollar on the page came off $129 as soon as
    // the reader moved the fringe slider, and the methodology drawer agreed with
    // the model rather than the panel. The fix was to pass
    // `result.facultyHourly.point` in, so the only correct source is the model.
    const tableFigure = readNumber(
      "faculty_hourly_value.by_specialty_assoc_prof_2080_basis.pediatrics_general"
    )
    const defaultFringe = readNumber("faculty_hourly_value.fringe_rate.default")

    expect(calculate(pdDefault()).facultyHourly.point).toBeCloseTo(tableFigure, 6)

    const raised = calculate(pdDefault({ fringeRate: 0.3 }))
    expect(raised.facultyHourly.point).toBeCloseTo(
      (tableFigure * 1.3) / (1 + defaultFringe),
      6
    )
    // The whole point: at a non-default fringe the model and the table disagree.
    expect(raised.facultyHourly.point).not.toBeCloseTo(tableFigure, 1)

    // So no renderer may reach for the table itself. The basis tables are read in
    // exactly one place, resolveFacultyHourly.
    expect(RENDERER_CODE).not.toContain("by_specialty_assoc_prof")
    const modelReads = (
      MODEL_SOURCE.match(/by_specialty_assoc_prof/g) ?? []
    ).length
    expect(modelReads).toBeLessThanOrEqual(2) // the two basis key literals
  })

  it("15. Lever A1 uses 6.7 hours and the two-discount chain", () => {
    const result = calculate(pdDefault())
    const a1 = result.bandA[0]

    expect(a1.hoursCurrent.point).toBeCloseTo(50 * 6.7, 6)
    expect(a1.hoursAddressable.point).toBeCloseTo(50 * 6.7 * 0.3 * 0.4, 6)

    // Nobody can quietly widen the discounts at default inputs.
    expect(a1.hoursAddressable.point).toBeLessThan(a1.hoursCurrent.point * 0.15)

    // The real guard against widening them anywhere: the published ceiling on
    // depth of substitution. At 0.50 the ratio is exactly 0.15, so the strict
    // bound above holds only at defaults and this is what protects the band.
    const depthHigh = readConstant<number>(
      "lever_a1_assessment_documentation.in_scope_slice.discount_2_depth_of_substitution.high"
    )
    expect(depthHigh).toBeLessThanOrEqual(0.5)
  })

  it("16. Lever A1 carries both the burden and the claim", () => {
    const a1 = calculate(pdDefault()).bandA[0]

    expect(a1.hoursCurrent).toBeDefined()
    expect(a1.hoursAddressable).toBeDefined()
    expect(a1.hoursCurrent.point).toBeGreaterThan(a1.hoursAddressable.point)

    // Both discounts are on the line so the UI cannot render one alone.
    expect(a1.discounts.map((d) => d.id)).toEqual([
      "subcompetency_share",
      "depth_of_substitution",
    ])

    // The burden is never priced: dollars come from the addressable hours.
    const hourly = calculate(pdDefault()).facultyHourly.point
    expect(a1.dollars.point).toBeCloseTo(a1.hoursAddressable.point * hourly, 6)
    expect(a1.dollars.point).not.toBeCloseTo(a1.hoursCurrent.point * hourly, 2)
  })

  it("17. the extended-year lever returns a threshold and no projected saving", () => {
    const result = calculate(defaultInputs("dio", "internal_medicine_general", 400))
    const lever = result.extendedYear

    expect(lever.presentation).toBe("BREAK-EVEN ONLY")
    expect(lever.projectedSaving).toBeNull()
    expect(lever.yearsToBreakEven.point).toBeGreaterThan(0)

    // The modeled extension rate is context. It must never appear in a ratio
    // against the threshold, which is the implied-arrow claim the break-even
    // presentation exists to refuse.
    const forbidden = [
      lever.modeledExtensionsAtThisSize.point / lever.yearsToBreakEven.point,
      lever.yearsToBreakEven.point / lever.modeledExtensionsAtThisSize.point,
      lever.modeledExtensionRatePer100.point / lever.yearsToBreakEven.point,
    ]
    const emitted = collectNumbers(result)
    for (const value of forbidden) {
      expect(
        emitted.some((n) => Math.abs(n - value) < 1e-9)
      ).toBe(false)
    }

    // And no code path multiplies the rate by a prevention rate to make dollars.
    // Renderers included: a component is a code path too, and BreakEven and
    // Headline were both doing their own arithmetic when this only read the model.
    expect(CALCULATION_SOURCE).not.toMatch(/prevention[_A-Za-z]*\s*\*/)
    expect(CALCULATION_SOURCE).not.toMatch(/preventedExtensions/)
    expect(CALCULATION_SOURCE).not.toMatch(/modeledExtension[_A-Za-z]*\s*[*/]/)
  })

  it("17b. the renderers format and branch, they do not derive", () => {
    // Every ratio the page shows is a field on Result. This is a blunt check:
    // no arithmetic operator applied to a Result field inside a component.
    //
    // It exists because tests 17 and 22 police the no-implied-arrow rules by
    // reading source, so arithmetic that migrates into a renderer migrates out
    // of their reach. Three ratios had already migrated.
    const derivations = [
      /result\.[A-Za-z.]+\s*[*/]/,
      /\bbandATotal\.point\s*[*/]/,
      /\bcontractPrice\s*[*/]/,
      /1\s*\/\s*[A-Za-z]*[Ee]xtendedYears/,
      /\blever\.[A-Za-z.]+\s*[*/]/,
    ]
    for (const pattern of derivations) {
      const hit = RENDERER_CODE.match(pattern)
      expect(hit?.[0] ?? null, `renderer derives a figure: ${hit?.[0]}`).toBeNull()
    }

    // And the fields that replaced those derivations are the ones being read.
    expect(RENDERER_CODE).toContain("result.bandAPerTrainee")
    expect(RENDERER_CODE).toContain("result.monthsToPayBackOnFacultyTime")
  })
})

// ---------------------------------------------------------------------------
// Guardrails as tests
// ---------------------------------------------------------------------------

describe("guardrails", () => {
  it("7. no rendered figure resolves to an unsourced constant", () => {
    // The research file still has plenty tagged unpublishable. If this ever hits
    // zero, either the research got sanitised or the audit stopped working, and
    // both make the rest of this test vacuous.
    const researchBlocked = collectBlockedPaths(RESEARCH)
    expect(researchBlocked.size).toBeGreaterThan(0)

    // None of them is something we read.
    for (const path of REFERENCED_CONSTANT_PATHS) {
      expect(researchBlocked.has(path)).toBe(false)
      expect(() => readConstant(path)).not.toThrow()
    }

    // Nothing blocked survived into what ships, so the shipped file has nothing
    // for the runtime guard to catch.
    expect([...UNSOURCED_PATHS]).toEqual([])

    // The guard still bites, on the exact path and on any ancestor of it. The
    // ancestor case is the one that mattered: the five Band C hard fees used to
    // be read as one parent object and cast per field, so a blocked child would
    // have arrived as undefined and rendered as "$0".
    const probe = {
      published: 1,
      nested: { fine: 2, bad: "UNSOURCED, needs a real source" },
    }
    const probeBlocked = collectBlockedPaths(probe)
    expect([...probeBlocked]).toContain("nested.bad")
    expect(pathIsGuarded("nested.bad", probeBlocked)).toBe(true)
    expect(pathIsGuarded("nested", probeBlocked)).toBe(true)
    expect(pathIsGuarded("published", probeBlocked)).toBe(false)

    // The deprecated v1 reduction fraction is unreadable, by design.
    expect(() =>
      readConstant("lever_a1_assessment_documentation.reduction_fraction.default")
    ).toThrow(ConstantAccessError)
  })

  it("7b. the research file does not reach the browser", () => {
    // Nothing the app builds may import the research file. constants.ts imports
    // constants.public.json; if that ever flips back, everything below is moot
    // because the whole 75 KB ships regardless of what renders.
    expect(CONSTANTS_SOURCE).toContain('from "./constants.public.json"')
    expect(CONSTANTS_SOURCE).not.toMatch(/from "\.\/constants\.json"/)

    for (const source of [MODEL_SOURCE, RENDERER_SOURCE, TYPES_SOURCE]) {
      expect(source).not.toContain("constants.json")
    }

    // The generated file is what the manifest says it should be. Adding a path
    // without running `pnpm roi:constants` fails here rather than at runtime.
    const regenerated = serialize(
      buildPublicConstants(RESEARCH, REFERENCED_CONSTANT_PATHS)
    )
    const onDisk = readFileSync(
      join(SOURCE_DIR, "constants.public.json"),
      "utf8"
    )
    expect(onDisk).toBe(regenerated)

    // And nothing in it reads as an instruction to us rather than a fact for a
    // program director. These are the phrasings the research actually uses.
    const shipped = onDisk
    const leaks = [
      "DO NOT",
      "Do not publish",
      "Do not use",
      "Do not overclaim",
      "Do not imply",
      "Do not synthesize",
      "UNSOURCED",
      "UNVERIFIED",
      "NOT PUBLISHED",
      "NEVER PUBLISHED",
      "under NDA",
      "Confirm with ACGME",
      "Confirm before publication",
      "Highest-priority gap",
      "Pick one and say why",
      "needs verification",
      "Ship only",
      "Ship the field blank",
    ]
    for (const marker of leaks) {
      expect(shipped, `research instruction leaked: ${marker}`).not.toContain(
        marker
      )
    }

    // Whole research sections that have no business in a browser at all.
    const publicKeys = Object.keys(JSON.parse(shipped))
    for (const section of [
      "band_b_institutional",
      "claims_history_field",
      "accreditation_risk",
      "sp_comparison_context_only",
      "skills_decay",
      "internal_inconsistencies_to_resolve",
    ]) {
      expect(publicKeys).not.toContain(section)
      // ...and they are still in the research file, so this is a real exclusion
      // rather than a section that quietly stopped existing.
      expect(Object.keys(RESEARCH)).toContain(section)
    }

    // Worth keeping honest about the size, since that was the point.
    expect(shipped.length).toBeLessThan(JSON.stringify(RESEARCH).length / 2)
  })

  it("8. bandBTotal does not exist as a type, a function, or a variable", () => {
    for (const source of [MODEL_SOURCE, CONSTANTS_SOURCE, TYPES_SOURCE]) {
      expect(source).not.toMatch(/bandBTotal/)
    }
    const result = calculate(pdDefault()) as unknown as Record<string, unknown>
    expect(result.bandBTotal).toBeUndefined()
    expect(result.bandB).toEqual([])

    // No grand total across bands either.
    expect(collectKeys(result)).not.toContain("grandTotal")
  })

  it("9. CHGME returns no dollar figure for the funding lever", () => {
    const result = calculate({
      ...defaultInputs("dio", "pediatrics_general", 250),
      fundingSource: "chgme",
    })

    expect(result.funding).not.toBeNull()
    expect(result.funding!.showsDollarFigure).toBe(false)
    expect(result.funding!.dgmeForgone).toBeNull()
    expect(result.extendedYear.dgmeForgonePerYear).toBeNull()
    expect(result.funding!.copy).toContain("fixed appropriation")
    // And the copy that renders is customer-facing, not the research note.
    expect(result.funding!.copy).not.toContain("DO NOT")
    expect(result.funding!.copy).not.toMatch(/\$/)
  })

  it("10. an over-cap Medicare hospital forgoes zero DGME", () => {
    const result = calculate({
      ...defaultInputs("dio", "internal_medicine_general", 400),
      fundingSource: "medicare_over_cap",
    })

    expect(result.funding!.dgmeForgone).toEqual({ low: 0, point: 0, high: 0 })
    expect(result.funding!.imeForgone).toBe(0)
    // The threshold falls back to marginal cost alone.
    expect(result.extendedYear.totalCostPerExtendedYear.point).toBe(
      result.extendedYear.marginalCostPerYear.point
    )
  })

  it("11. malpractice defaults to zero dollars at attribution zero", () => {
    // The card itself is phase 3, so this is asserted against the research that
    // will drive it. Read off RESEARCH rather than through readConstant: Band B
    // is not in the manifest, so it is not in what ships, which is the stronger
    // version of this guarantee. A phase 3 that starts rendering it has to add
    // the paths to the manifest first, and this test comes with it.
    const malpractice = RESEARCH.band_b_institutional.malpractice
    expect(malpractice.default_booked_benefit).toBe(0)
    expect(malpractice.default_attribution).toBe(0)
    expect(() =>
      readConstant("band_b_institutional.malpractice.default_booked_benefit")
    ).toThrow(ConstantAccessError)
    expect(calculate(pdDefault()).bandB).toEqual([])
  })

  it("12. no submission path exists, so no payload can carry Band B inputs", () => {
    const forbidden = [
      "baseOperatingDrg",
      "base_operating_drg",
      "readmissionCount",
      "rnHeadcount",
    ]
    for (const field of forbidden) {
      expect(MODEL_SOURCE).not.toContain(field)
      expect(TYPES_SOURCE).not.toContain(field)
      expect(RENDERER_SOURCE).not.toContain(field)
    }
    // Nothing in the model or any renderer can transmit anything. The privacy
    // line on the page is a factual claim, so it gets a test.
    expect(CALCULATION_SOURCE).not.toMatch(
      /\bfetch\(|XMLHttpRequest|navigator\.send|new WebSocket|EventSource/
    )

    const result = calculate(pdDefault())
    const keys = collectKeys(result)
    for (const field of forbidden) {
      expect(keys).not.toContain(field)
    }
  })

  it("18. Band C returns no numeric total and no total, sum, or value field", () => {
    const bandC = calculate(pdDefault()).bandC

    expect(bandC.isPriced).toBe(false)
    expect(bandC.hasTotal).toBe(false)

    const keys = collectKeys(bandC)
    for (const banned of ["total", "sum", "value"]) {
      expect(keys).not.toContain(banned)
    }
    expect(keys.some((k) => /^(total|sum|value)$/i.test(k))).toBe(false)
  })

  it("19. pediatrics renders an empty citation-rank block", () => {
    const bandC = calculate(pdDefault({ specialty: "pediatrics_general" })).bandC
    const rank = bandC.citationRank

    expect(rank.kind).toBe("silent")
    expect(rank.rank).toBeNull()
    expect(rank.detail).toBeNull()
    expect(rank.statement).toBeNull()

    // Specifically not someone else's rank.
    const serialised = JSON.stringify(rank)
    expect(serialised).not.toContain("otolaryngology")
    expect(serialised).not.toContain("48 core citations")
    expect(serialised).not.toContain("inadequate evaluation")
    expect(rank.rank).not.toBe(1)
    expect(rank.rank).not.toBe(2)
  })

  it("20. a specialty absent from the map gets the general statement and no rank", () => {
    const unmapped: SpecialtyId[] = [
      "family_medicine",
      "emergency_medicine",
      "pediatric_critical_care",
      "neonatology",
      "surgery_general",
    ]

    for (const specialty of unmapped) {
      expect(SPECIALTY_CITATION_MAP[specialty]).toBeNull()
      const rank = buildCitationRank(specialty)
      expect(rank.kind).toBe("general")
      expect(rank.rank).toBeNull()
      expect(rank.statement).toContain("among the top citation categories")
    }

    // The two mapped-and-published specialties still show their own rank.
    expect(buildCitationRank("internal_medicine_general").rank).toBe(2)
    expect(buildCitationRank("obgyn").kind).toBe("specialty")
    expect(buildCitationRank("obgyn").rank).toBeNull()

    // Every selectable specialty resolves to exactly one of the three kinds.
    for (const { id } of SPECIALTIES) {
      expect(["specialty", "general", "silent"]).toContain(
        buildCitationRank(id).kind
      )
    }
  })

  it("21. the tail scenario always returns the base rate beside the dollars", () => {
    const tail = calculate(pdDefault()).bandC.tail

    expect(tail.medicareGmePerResidentYear).toBe(171000)
    expect(tail.twelveResidentExample).toBe(2050000)
    expect(tail.baseRateToShowAdjacent).toBe(0.004)
    expect(tail.baseRateToShowAdjacent).toBeDefined()

    // A tail object carrying the dollar figure without the base rate is a fail.
    const withoutRate = { ...tail } as Partial<typeof tail>
    delete withoutRate.baseRateToShowAdjacent
    expect(withoutRate.baseRateToShowAdjacent).toBeUndefined()
    expect(tail.baseRateToShowAdjacent).not.toBeUndefined()
  })

  it("22. no code path multiplies the GME per-resident figure by the base rate", () => {
    const tail = calculate(pdDefault()).bandC.tail
    const forbidden = [
      tail.medicareGmePerResidentYear * tail.baseRateToShowAdjacent,
      tail.twelveResidentExample * tail.baseRateToShowAdjacent,
    ]

    const emitted = collectNumbers(calculate(pdDefault()))
    for (const value of forbidden) {
      expect(emitted.some((n) => Math.abs(n - value) < 1e-9)).toBe(false)
    }

    expect(CALCULATION_SOURCE).not.toMatch(
      /medicareGmePerResidentYear\s*\*|baseRateToShowAdjacent\s*\*/
    )
    expect(CALCULATION_SOURCE).not.toMatch(
      /\*\s*(tail\.)?baseRateToShowAdjacent|\*\s*(tail\.)?medicareGmePerResidentYear/
    )
  })

  it("23. no renderer references CLER, Self-Study, or the 10-Year Site Visit as current", () => {
    const rendered = JSON.stringify(calculate(pdDefault()))
    for (const dead of [
      "CLER",
      "Self-Study",
      "Self Study",
      "10-Year Site Visit",
      "10-Year Accreditation Site Visit",
    ]) {
      expect(rendered).not.toContain(dead)
    }

    // Each one is on the do-not-use list rather than merely absent, and the
    // Annual Program Evaluation is the requirement that did survive. The list
    // itself is research: it tells us what not to say, so it is not in the
    // manifest and does not ship.
    const doNotUse = (RESEARCH.accreditation_risk.do_not_use as string[]).join(
      " "
    )
    expect(doNotUse).toContain("CLER")
    expect(doNotUse).toContain("Self-Study")
    expect(doNotUse).toContain("10-Year Accreditation Site Visits")
    expect(doNotUse).toContain("Annual Program Evaluation (5.5.g) is still required")
  })
})

// ---------------------------------------------------------------------------
// Regression against the research
// ---------------------------------------------------------------------------

describe("regression", () => {
  it("13 and 24. the default pediatrics 50-resident PD case matches v2", () => {
    // Tests 13 and 24 collapse to one assertion set. Test 13 pins Band A to
    // what the assumptions doc says; test 24 is the v1-to-v2 drift marker,
    // since Lever A1's basis changed from an inferred 4.5 to a measured 6.7.
    const result = calculate(pdDefault())
    const [a1, a2] = result.bandA

    expect(result.facultyHourly.point).toBeCloseTo(121, 6)

    expect(a1.hoursCurrent.point).toBeCloseTo(335, 6)
    expect(a1.hoursAddressable.point).toBeCloseTo(40.2, 6)
    expect(a1.dollars.point).toBeCloseTo(4864.2, 4)
    expect(a1.dollars.low).toBeCloseTo(3267, 4)
    expect(a1.dollars.high).toBeCloseTo(7044.7034, 3)

    expect(a2.hoursAddressable.point).toBeCloseTo(5.4, 6)
    expect(a2.dollars.point).toBeCloseTo(653.4, 4)
    expect(a2.dollars.low).toBeCloseTo(363, 4)
    expect(a2.dollars.high).toBeCloseTo(1089, 4)

    expect(result.bandATotal.point).toBeCloseTo(5517.6, 4)
    expect(result.bandATotal.low).toBeCloseTo(3630, 4)
    expect(result.bandATotal.high).toBeCloseTo(8133.7034, 3)

    expect(result.facultyHoursReturned.point).toBeCloseTo(45.6, 6)
    expect(result.breakEven.facultyHoursNeeded).toBeCloseTo(247.93, 2)
    expect(Math.round(result.breakEven.facultyHoursNeeded)).toBe(248)
    expect(result.breakEven.extendedYearsNeeded).toBeCloseTo(0.3226, 4)
    expect(result.breakEven.marginRatio.point).toBeCloseTo(0.1839, 4)
    expect(result.breakEven.coveredByBandA).toBe(false)
    expect(result.perResidentPerYear.point).toBe(600)

    // v1 produced $12,451 here off a 4.5-hour basis and a flat 0.30 reduction.
    // v2 is lower on purpose. If this drifts back up, a constant moved.
    expect(result.bandATotal.point).toBeLessThan(12451)
  })

  it("14. every constants key anything reads exists in the shipped subset", () => {
    for (const path of REFERENCED_CONSTANT_PATHS) {
      expect(() => readConstant(path)).not.toThrow()
    }

    // Every constants path spelled anywhere that reads them is in the manifest,
    // so the manifest cannot silently fall behind the code.
    //
    // This used to scan model.ts alone, which is why a build broke rather than a
    // test: ExtendedYear.tsx reads the fully-loaded average directly, and
    // defaults.ts reads six band defaults, and none of them were listed. Under
    // the old arrangement an unlisted path still resolved, because the whole
    // research file was present, so the omission was invisible. Now an unlisted
    // path is an absent path.
    const readers = [
      ...readdirSync(SOURCE_DIR)
        .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
        .map((f) => join(SOURCE_DIR, f)),
      ...readdirSync(join(REPO_ROOT, "components/roi"))
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => join(REPO_ROOT, "components/roi", f)),
    ]

    const spelled = new Set<string>()
    for (const file of readers) {
      for (const match of readFileSync(file, "utf8").matchAll(
        /read(?:Constant|Number|String|Band)(?:<[^>]*>)?\(\s*(?:`([^`$]+)`|"([^"]+)")/g
      )) {
        const path = match[1] ?? match[2]
        if (path) spelled.add(path)
      }
    }

    expect(spelled.size).toBeGreaterThan(20)
    const unlisted = [...spelled].filter(
      (p) => !REFERENCED_CONSTANT_PATHS.includes(p)
    )
    expect(
      unlisted,
      `add these to referenced-paths.json and run pnpm roi:constants: ${unlisted.join(", ")}`
    ).toEqual([])
    for (const path of spelled) {
      expect(() => readConstant(path)).not.toThrow()
    }

    // And the constants file is the v2 one.
    expect(CONSTANTS._meta.version).toBe("2.0.0")
    expect(RESEARCH._meta.version).toBe("2.0.0")
  })
})
