import { describe, expect, it } from "vitest"
import { BRITISH_SPELLING_PATTERN } from "./claim-discipline"
import { getAllSolutions, getSolutionBySlug, type SolutionSlug } from "./solutions"

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
  "workforce-retention",
  "patient-understanding",
  "handoffs-and-escalation",
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

  it("asks every lane's sponsor one question, in American English", () => {
    for (const solution of solutions) {
      const question = solution.leadershipQuestion
      expect(question, `${solution.slug} has no leadershipQuestion`).toBeTruthy()
      expect(question!.trim().endsWith("?"), `${solution.slug} question must end in "?"`).toBe(true)
      expect(question).not.toMatch(BRITISH_SPELLING_PATTERN)
    }
  })

  it("links each related use case that exists", () => {
    for (const solution of solutions) {
      for (const slug of solution.relatedSolutionSlugs ?? []) {
        expect(getSolutionBySlug(slug), `${solution.slug} links to missing ${slug}`).toBeTruthy()
        expect(slug, `${solution.slug} links to itself`).not.toBe(solution.slug)
      }
    }
  })

  it("gives each new application page two inbound links besides /solutions", () => {
    for (const target of ["patient-understanding", "handoffs-and-escalation"] as const) {
      const inbound = solutions.filter((s) => s.relatedSolutionSlugs?.includes(target))
      expect(inbound.length, `${target} inbound links`).toBeGreaterThanOrEqual(2)
    }
  })
})
