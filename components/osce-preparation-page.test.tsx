import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import OscePreparationPage from "@/app/(marketing)/solutions/osce-preparation/page"
import UmePage from "@/app/(marketing)/solutions/undergraduate-medical-education/page"
import { getSolutionBySlug } from "@/lib/solutions"

const schemas = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]))

describe("/solutions/osce-preparation", () => {
  const solution = getSolutionBySlug("osce-preparation")!
  const html = renderToStaticMarkup(createElement(OscePreparationPage))
  const data = schemas(html)

  it("renders one H1 naming OSCE", () => {
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(html).toMatch(/<h1[^>]*>[^<]*OSCE[^<]*<\/h1>/)
  })

  it("emits FAQPage schema matching the visible FAQs", () => {
    const faq = data.find((node) => node["@type"] === "FAQPage")
    expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual(solution.faqs!.map((f) => f.question))
    for (const entry of solution.faqs!) expect(html).toContain(entry.question.replace(/'/g, "&#x27;"))
  })

  it("emits HowTo schema for the visible steps", () => {
    const howTo = data.find((node) => node["@type"] === "HowTo")
    expect(howTo.name).toBe("How OSCE practice works in ClinicalSim")
    expect(howTo.step.map((s: { name: string }) => s.name)).toEqual(solution.howToSteps!.map((s) => s.name))
  })

  it("keeps the formative boundary explicit", () => {
    expect(html).toContain("do not establish OSCE readiness or predict a passing result")
  })
})

describe("/solutions/undergraduate-medical-education hands OSCE to the new page", () => {
  it("keeps the #osce-practice anchor with a link to /solutions/osce-preparation", () => {
    const html = renderToStaticMarkup(createElement(UmePage))
    expect(html).toMatch(/<section id="osce-practice"[^>]*>[\s\S]*?href="\/solutions\/osce-preparation"/)
  })
})
