import { describe, expect, it } from "vitest"
import { getAllAudiences } from "./audiences"
import { getSolutionBySlug } from "./solutions"

const audiences = getAllAudiences()

describe("Audience registry", () => {
  // components/audience-page-layout.tsx renders the audience's primary use-case
  // block from relevantSolutionSlugs[0]. Four audiences shipped pointing at
  // "goals-of-care", "advance-care-planning", and "cognitive-assessments",
  // none of which is a solution, and the layout's `?? getSolutionBySlug(
  // "remediation")!` fallback quietly rendered the same remediation heading,
  // paragraph, and CTA on three different indexable pages. That is duplicate
  // content and wrong routing, and it produced no build error. This is the
  // check that makes it a test failure instead of a rendered page.
  it("gives every audience at least one solution slug", () => {
    for (const audience of audiences) {
      expect(
        audience.relevantSolutionSlugs.length,
        `${audience.slug} has no relevantSolutionSlugs`
      ).toBeGreaterThan(0)
    }
  })

  it("resolves every relevantSolutionSlugs entry to a real solution", () => {
    for (const audience of audiences) {
      for (const slug of audience.relevantSolutionSlugs) {
        expect(
          getSolutionBySlug(slug),
          `${audience.slug} references solution "${slug}", which does not exist`
        ).toBeDefined()
      }
    }
  })

  // The routing half of the same defect: even with valid slugs, every audience
  // pointing at the same primary solution would serve the same block again.
  it("does not point most audiences at one solution", () => {
    const primaries = audiences.map((a) => a.relevantSolutionSlugs[0])
    const distinct = new Set(primaries)

    expect(
      distinct.size,
      `audience primary solutions are too concentrated: ${primaries.join(", ")}`
    ).toBeGreaterThanOrEqual(4)
  })
})
