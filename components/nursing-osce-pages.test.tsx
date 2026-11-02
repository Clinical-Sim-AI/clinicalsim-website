import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import NursingPage from "@/app/(marketing)/nursing/page"
import UmePage from "@/app/(marketing)/solutions/undergraduate-medical-education/page"
import { nursingFaqs } from "@/lib/nursing"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

const schemas = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]))

describe("nursing and OSCE practice pages", () => {
  it("keeps nursing FAQs and service schema tied to visible content", () => {
    const html = renderToStaticMarkup(createElement(NursingPage))
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    const data = schemas(html)
    expect(data.map((node) => node["@type"])).toEqual(["WebPage", "BreadcrumbList", "Service", "FAQPage"])
    expect(data.find((node) => node["@type"] === "FAQPage").mainEntity.map((question: { name: string }) => question.name)).toEqual(nursingFaqs.map((faq) => faq.question))
    expect(html).toContain('href="/examples/48-hours-in-the-hallway"')
    expect(html).toContain('id="hcahps"')
    expect(html).toContain('id="magnet"')
    expect(html).toContain('id="nurse-residency"')
    expect(html).toContain("does not predict HCAHPS")
    expect(html).not.toMatch(/[\u2013\u2014\u2018\u2019\u201c\u201d]/)
  })

  it("renders an OSCE section anchor, one H1, and the new FAQ schema", () => {
    const html = renderToStaticMarkup(createElement(UmePage))
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(html).toMatch(/<section id="osce-practice"[^>]*>[\s\S]*?<h2[^>]*>OSCE/)
    const data = schemas(html)
    expect(data.some((node) => node["@type"] === "Product")).toBe(true)
    expect(data.find((node) => node["@type"] === "FAQPage").mainEntity.some((question: { name: string }) => question.name === "Can we use our own OSCE checklist?")).toBe(true)
    expect(html).toContain("Standardized patients and faculty keep the graded OSCE")
  })

  it.each(["medical-school-leadership", "simulation-center-directors"])("links %s to the rendered OSCE anchor", (slug) => {
    const html = renderToStaticMarkup(createElement(AudiencePageLayout, { audience: getAudienceBySlug(slug)! }))
    expect(html).toContain('href="/solutions/undergraduate-medical-education#osce-practice"')
    expect(html).toContain("Learn more about ")
    expect(html).not.toContain("Learn more about extend")
  })
})
