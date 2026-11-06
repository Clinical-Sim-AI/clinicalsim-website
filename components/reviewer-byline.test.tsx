import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { ReviewerByline } from "@/components/reviewer-byline"
import { TEAM_AUTHOR_ID } from "@/lib/authors"

describe("ReviewerByline", () => {
  it("keeps the article wording for a reviewer given by name", () => {
    const html = renderToStaticMarkup(
      createElement(ReviewerByline, { name: "Vinod Havalad, MD", date: "2026-10-02" })
    )
    expect(html).toBe(
      '<p class="mt-3 text-sm text-cs-dark-gray font-light">Medically reviewed by <span class="text-cs-dark-blue/85 font-medium">Vinod Havalad, MD</span> · <time dateTime="2026-10-02">October 2, 2026</time></p>'
    )
  })

  it("omits the date when none is given", () => {
    const html = renderToStaticMarkup(createElement(ReviewerByline, { name: "Vinod Havalad, MD" }))
    expect(html).not.toContain("<time")
  })

  it("resolves a registry author to name, credentials, and title, with no link", () => {
    const html = renderToStaticMarkup(
      createElement(ReviewerByline, { authorId: "lauren-rissman", date: "2026-11-01" })
    )
    expect(html).toContain("Medically reviewed by")
    expect(html).toContain("Lauren Rissman, MD")
    expect(html).toContain("Chief Medical Officer, ClinicalSim")
    expect(html).toContain('dateTime="2026-11-01"')
    // TEAM_SECTION_PUBLISHED is false, so the reviewer has no page to link to.
    expect(html).not.toContain("<a")
    expect(html).not.toContain("/about")
  })

  it("renders nothing for an unknown author id", () => {
    expect(
      renderToStaticMarkup(createElement(ReviewerByline, { authorId: "no-such-person", date: "2026-11-01" }))
    ).toBe("")
  })

  it("renders nothing for the team fallback, which is not a person", () => {
    expect(
      renderToStaticMarkup(createElement(ReviewerByline, { authorId: TEAM_AUTHOR_ID, date: "2026-11-01" }))
    ).toBe("")
  })

  it("renders nothing for a registry author with no clinical credentials", () => {
    // "Medically reviewed" is a claim about a clinician.
    expect(
      renderToStaticMarkup(createElement(ReviewerByline, { authorId: "ben-conway", date: "2026-11-01" }))
    ).toBe("")
  })

  it("has a dark tone for the hero band", () => {
    const html = renderToStaticMarkup(
      createElement(ReviewerByline, { authorId: "lauren-rissman", date: "2026-11-01", tone: "dark" })
    )
    expect(html).toContain("text-cs-cloud")
    expect(html).not.toContain("text-cs-dark-gray")
  })
})
