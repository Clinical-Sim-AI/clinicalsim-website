import { describe, expect, it } from "vitest"
import { getAllSolutions, type SolutionSlug } from "./solutions"

const solutions = getAllSolutions()

/**
 * The union in lib/solutions.ts, restated as runtime values. TypeScript checks
 * that every registry entry's slug is in the union; this array plus the tests
 * below check the reverse, so a slug removed from the registry cannot linger in
 * the union and keep type-checking a dead cross-registry reference.
 */
const UNION_MEMBERS: SolutionSlug[] = [
  "longitudinal-curriculum",
  "undergraduate-medical-education",
  "faculty-development",
  "patient-experience",
  "debriefing",
  "informed-consent",
  "error-disclosure",
  "remediation",
]

describe("Solution registry", () => {
  it("has a registry entry for every SolutionSlug", () => {
    const registrySlugs = new Set<string>(solutions.map((s) => s.slug))

    for (const slug of UNION_MEMBERS) {
      expect(
        registrySlugs.has(slug),
        `SolutionSlug includes "${slug}" but no solution has that slug`
      ).toBe(true)
    }
  })

  it("has a SolutionSlug for every registry entry", () => {
    const union = new Set<string>(UNION_MEMBERS)

    for (const solution of solutions) {
      expect(
        union.has(solution.slug),
        `solution "${solution.slug}" is missing from the SolutionSlug union`
      ).toBe(true)
    }
  })

  it("has no duplicate slugs", () => {
    const slugs = solutions.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
