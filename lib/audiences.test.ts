import { describe, expect, it } from "vitest"
import {
  BESPOKE_PRIMARY_CTA_AUDIENCE_SLUGS,
  getAllAudiences,
  rendersGeneratedPrimaryCta,
} from "./audiences"
import { BRITISH_SPELLING_PATTERN } from "./claim-discipline"
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

  it("routes faculty and safety leaders to relevant primary programs", () => {
    expect(audiences.find((a) => a.slug === "faculty-clinician-educators")?.relevantSolutionSlugs[0]).toBe("faculty-development")
    expect(audiences.find((a) => a.slug === "risk-and-patient-safety")?.relevantSolutionSlugs).toEqual(["error-disclosure", "informed-consent", "debriefing"])
  })

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

  // The opener is the buyer's own question (Walia & Miller, Doc 3 p11). It is
  // adapted, not copied: the deck writes British English and frames some
  // questions around what is wrong with people.
  it("opens every audience page with the buyer's question", () => {
    for (const audience of audiences) {
      const question = audience.buyerQuestion
      expect(question, `${audience.slug} has no buyerQuestion`).toBeTruthy()
      expect(question!.trim().endsWith("?"), `${audience.slug}: ${question}`).toBe(true)
      expect(question, `${audience.slug}: ${question}`).not.toMatch(BRITISH_SPELLING_PATTERN)
      expect(question, `${audience.slug}: ${question}`).not.toMatch(
        /fix what|fell short|falls short|going wrong|breaks down|complaints are coming|struggling|weak|poor performers|at-risk clinicians|behaviou?rs? deserve/i
      )
      expect(question, `${audience.slug}: ${question}`).not.toMatch(/[–—]/)
    }
  })
})
