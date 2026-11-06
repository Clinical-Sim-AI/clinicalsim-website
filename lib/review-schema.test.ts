import { describe, expect, it } from "vitest"
import { buildWebPageReviewFields, resolveReviewer } from "./review-schema"
import { TEAM_AUTHOR_ID } from "./authors"

describe("resolveReviewer", () => {
  it("resolves a credentialed registry author", () => {
    expect(resolveReviewer("lauren-rissman")).toEqual({
      name: "Lauren Rissman",
      credentials: "MD",
      title: "Chief Medical Officer, ClinicalSim",
    })
  })

  it("returns undefined for an unknown id, the team fallback, or an uncredentialed author", () => {
    expect(resolveReviewer("no-such-person")).toBeUndefined()
    expect(resolveReviewer(TEAM_AUTHOR_ID)).toBeUndefined()
    expect(resolveReviewer("ben-conway")).toBeUndefined()
  })
})

describe("buildWebPageReviewFields", () => {
  it("returns nothing when neither field is set", () => {
    expect(buildWebPageReviewFields(undefined, undefined)).toEqual({})
    expect(buildWebPageReviewFields(undefined, [])).toEqual({})
  })

  it("adds a Person reviewer with name and jobTitle only, plus lastReviewed", () => {
    const fields = buildWebPageReviewFields({ authorId: "vinod-havalad", date: "2026-11-01" }, undefined)
    expect(fields).toEqual({
      reviewedBy: {
        "@type": "Person",
        name: "Vinod Havalad",
        jobTitle: "Chief Clinical Partnerships Officer, ClinicalSim",
      },
      lastReviewed: "2026-11-01",
    })
  })

  it("drops the reviewer and the date for an unknown author id", () => {
    expect(buildWebPageReviewFields({ authorId: "no-such-person", date: "2026-11-01" }, undefined)).toEqual({})
  })

  it("emits citations with a DOI url when there is a DOI and the url otherwise", () => {
    const fields = buildWebPageReviewFields(undefined, [
      { authors: "Baile WF", title: "SPIKES", source: "The Oncologist", year: "2000", doi: "10.1634/theoncologist.5-4-302" },
      { title: "A web page", source: "Publisher", year: "2024", url: "https://example.org/page" },
      { title: "No locator", source: "Book", year: "1999" },
    ])
    expect(fields.citation).toEqual([
      { "@type": "ScholarlyArticle", name: "SPIKES", url: "https://doi.org/10.1634/theoncologist.5-4-302" },
      { "@type": "CreativeWork", name: "A web page", url: "https://example.org/page" },
      { "@type": "CreativeWork", name: "No locator" },
    ])
  })
})
