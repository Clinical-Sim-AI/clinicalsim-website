import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { SolutionPageLayout } from "@/components/solution-page-layout"
import { getAllSolutions, getSolutionBySlug, type Solution } from "@/lib/solutions"

const render = (solution: Solution) =>
  renderToStaticMarkup(createElement(SolutionPageLayout, { solution }))

const schemas = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) =>
    JSON.parse(match[1])
  )

/** Text as React's server renderer escapes it, so a verbatim check survives quotes and ampersands. */
const escaped = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")

// The OSCE page now fills these fields, so strip them to keep a bare base for the fixtures.
const base: Solution = {
  ...getSolutionBySlug("osce-preparation")!,
  howToSteps: undefined,
  howToHeading: undefined,
  sections: undefined,
  citations: undefined,
  reviewedBy: undefined,
}

const fixture: Solution = {
  ...base,
  howToSteps: [
    { name: "Pick the station", text: "Choose the case the student will sit." },
    { name: "Run it out loud", text: "The student talks it through with an AI patient's reply." },
  ],
  sections: [
    { type: "prose", id: "why", heading: "Why rehearse", paragraphs: ["Fixture paragraph."] },
  ],
  faqs: [{ question: "Fixture question?", answer: "Fixture answer." }],
  reviewedBy: { authorId: "jacqueline-ponczek", date: "2026-11-01" },
  citations: [
    { title: "Fixture study", source: "Fixture Journal", year: "2024", doi: "10.1000/fixture" },
  ],
}

describe("SolutionPageLayout structured content", () => {
  it("renders HowTo steps verbatim for every registry solution that has them", () => {
    for (const solution of getAllSolutions().filter((s) => s.howToSteps?.length)) {
      const html = render(solution)
      const howTo = schemas(html).find((node) => node["@type"] === "HowTo")
      expect(howTo, `${solution.slug} HowTo node`).toBeTruthy()
      for (const step of solution.howToSteps!) {
        expect(html, `${solution.slug} step name`).toContain(escaped(step.name))
        expect(html, `${solution.slug} step text`).toContain(escaped(step.text))
      }
      expect(howTo.step.map((s: { name: string }) => s.name)).toEqual(
        solution.howToSteps!.map((s) => s.name)
      )
    }
  })

  it("renders the steps as a numbered list under a default H2 and emits HowTo JSON-LD", () => {
    const html = render(fixture)
    expect(html).toMatch(/<h2[^>]*>How to practice OSCE preparation<\/h2>/)
    expect(html).toMatch(/<ol[^>]*list-decimal/)
    for (const step of fixture.howToSteps!) {
      expect(html).toContain(escaped(step.name))
      expect(html).toContain(escaped(step.text))
    }
    const howTo = schemas(html).find((node) => node["@type"] === "HowTo")
    expect(howTo.name).toBe("How to practice OSCE preparation")
    expect(howTo.url).toBe("https://clinicalsim.ai/solutions/osce-preparation")
    expect(howTo.step[1].url).toBe("https://clinicalsim.ai/solutions/osce-preparation#run-it-out-loud")
    expect(html).toContain('id="run-it-out-loud"')
  })

  it("uses howToHeading when set", () => {
    const html = render({ ...fixture, howToHeading: "Rehearse a station in four steps" })
    expect(html).toMatch(/<h2[^>]*>Rehearse a station in four steps<\/h2>/)
    expect(schemas(html).find((node) => node["@type"] === "HowTo").name).toBe(
      "Rehearse a station in four steps"
    )
  })

  it("orders the steps, sections, FAQs, and references", () => {
    // Search the visible page, not the JSON-LD scripts that precede it.
    const full = render(fixture)
    const html = full.slice(full.lastIndexOf("</script>"))
    const at = (needle: string) => {
      const index = html.indexOf(needle)
      expect(index, needle).toBeGreaterThan(-1)
      return index
    }
    expect(at("How to practice OSCE preparation")).toBeLessThan(at("Why rehearse"))
    expect(at("Why rehearse")).toBeLessThan(at("Fixture question?"))
    expect(at("Fixture question?")).toBeLessThan(at(">References</h2>"))
    expect(html).toContain('href="https://doi.org/10.1000/fixture"')
  })

  it("shows the reviewer in the hero only when reviewedBy is set", () => {
    const html = render(fixture)
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    const byline = html.indexOf("Medically reviewed by")
    expect(byline).toBeGreaterThan(html.indexOf("<h1"))
    expect(byline).toBeLessThan(html.indexOf("<h2"))
    expect(html).toContain("Jacqueline Ponczek, MD, MS, FAAP")
    expect(render(base)).not.toContain("Medically reviewed by")
  })

  it("adds reviewer, review date, and citations to the WebPage node", () => {
    const webPage = schemas(render(fixture)).find((node) => node["@type"] === "WebPage")
    expect(webPage.reviewedBy).toEqual({
      "@type": "Person",
      name: "Jacqueline Ponczek",
      jobTitle: "VP of MedEd: Quality & Standards, ClinicalSim",
    })
    expect(webPage.lastReviewed).toBe("2026-11-01")
    expect(webPage.citation).toEqual([
      { "@type": "ScholarlyArticle", name: "Fixture study", url: "https://doi.org/10.1000/fixture" },
    ])
  })

  it("adds none of the new fields to a page that sets none of them", () => {
    const html = render(base)
    const data = schemas(html)
    expect(data.some((node) => node["@type"] === "HowTo")).toBe(false)
    const webPage = data.find((node) => node["@type"] === "WebPage")
    expect(webPage).not.toHaveProperty("reviewedBy")
    expect(webPage).not.toHaveProperty("lastReviewed")
    expect(webPage).not.toHaveProperty("citation")
    expect(html).not.toContain(">References</h2>")
  })
})
