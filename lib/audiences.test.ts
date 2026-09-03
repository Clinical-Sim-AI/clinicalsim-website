import { describe, expect, it } from "vitest"
import {
  BESPOKE_PRIMARY_CTA_AUDIENCE_SLUGS,
  getAllAudiences,
  rendersGeneratedPrimaryCta,
} from "./audiences"
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

  // The routing half of the same defect: two audiences sharing a primary
  // solution render a byte-identical use-case block, because
  // components/audience-page-layout.tsx builds that block entirely from
  // primarySolution.title, .heroDescription, and .shortTitle. Distinctness only
  // has to hold across the audiences that actually render it, so the exception
  // list is imported rather than restated.
  it("gives every generated primary CTA a distinct solution", () => {
    const generated = audiences.filter(rendersGeneratedPrimaryCta)
    const primaries = generated.map((a) => a.relevantSolutionSlugs[0])
    const distinct = new Set(primaries)

    expect(
      distinct.size,
      `two audiences would render the same primary use-case block: ${primaries.join(", ")}`
    ).toBe(generated.length)
  })

  // Without this the check above weakens silently: moving every audience onto
  // the bespoke list would leave it comparing an empty set to zero.
  it("keeps the bespoke CTA list to audiences that exist", () => {
    const slugs = new Set(audiences.map((a) => a.slug))

    for (const slug of BESPOKE_PRIMARY_CTA_AUDIENCE_SLUGS) {
      expect(
        slugs.has(slug),
        `BESPOKE_PRIMARY_CTA_AUDIENCE_SLUGS names "${slug}", which is not an audience`
      ).toBe(true)
    }

    expect(audiences.filter(rendersGeneratedPrimaryCta).length).toBeGreaterThan(0)
  })
})
