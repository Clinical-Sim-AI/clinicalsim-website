import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import NursingPage from "@/app/(marketing)/nursing/page"
import UmePage from "@/app/(marketing)/solutions/undergraduate-medical-education/page"
import { NURSING_HEADLINE, NURSING_HOWTO_HEADING, nursingFaqs, nursingHowToSteps, nursingSections } from "@/lib/nursing"
import { getExampleBySlug } from "@/lib/examples"
import { headingId } from "@/lib/howto-schema"
import type { ReportExcerptSection } from "@/lib/content-sections"
import { getAudienceBySlug } from "@/lib/audiences"
import { AudiencePageLayout } from "@/components/audience-page-layout"

/** Text as renderToStaticMarkup escapes it. */
const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")

const schemas = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]))

describe("nursing and OSCE practice pages", () => {
  it("keeps nursing FAQs, HowTo, and service schema tied to visible content", () => {
    const html = renderToStaticMarkup(createElement(NursingPage))
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(html).toContain(`>${NURSING_HEADLINE}</h1>`)
    const data = schemas(html)
    expect(data.map((node) => node["@type"])).toEqual(["WebPage", "BreadcrumbList", "Service", "HowTo", "FAQPage"])
    const faqs = data.find((node) => node["@type"] === "FAQPage").mainEntity
    expect(faqs.map((question: { name: string }) => question.name)).toEqual(nursingFaqs.map((faq) => faq.question))
    for (const faq of nursingFaqs) {
      expect(html).toContain(escapeHtml(faq.question))
      expect(html).toContain(escapeHtml(faq.answer))
    }
    // Each HowTo step renders verbatim as a numbered list item at the anchor its schema URL names.
    const howTo = data.find((node) => node["@type"] === "HowTo")
    expect(howTo.step.map((step: { name: string }) => step.name)).toEqual(nursingHowToSteps.map((step) => step.name))
    expect(html).toContain(`<h2 class="text-3xl md:text-4xl font-light text-cs-navy mb-6">${NURSING_HOWTO_HEADING}</h2><ol`)
    for (const step of howTo.step) {
      expect(step.url).toBe(`https://clinicalsim.ai/nursing#${headingId(step.name)}`)
      expect(html).toContain(`id="${headingId(step.name)}"`)
      expect(html).toContain(escapeHtml(step.name))
      expect(html).toContain(escapeHtml(step.text))
    }
    expect(html).toContain('href="/examples/48-hours-in-the-hallway"')
    expect(html).toContain('href="https://platform.clinicalsim.ai/catalog"')
    expect(html).toContain('id="conversations"')
    expect(html).toContain('id="where-it-fits"')
    expect(html).toContain("does not predict HCAHPS")
    expect(html).toContain("What this page does not claim")
    expect(html).not.toMatch(/Reviewed by|Medically reviewed/)
    expect(html).not.toMatch(/[\u2013\u2014\u2018\u2019\u201c\u201d]/)
  })

  it("quotes the nursing example report verbatim", () => {
    const example = getExampleBySlug("48-hours-in-the-hallway")!
    const source = JSON.stringify(example)
    const excerpts = nursingSections.filter(
      (section): section is ReportExcerptSection => section.type === "report-excerpt"
    )
    expect(excerpts).toHaveLength(2)
    for (const excerpt of excerpts) {
      expect(excerpt.source.exampleSlug).toBe("48-hours-in-the-hallway")
      expect(source).toContain(JSON.stringify(excerpt.quote).slice(1, -1))
    }
  })

  it("renders an OSCE section anchor, one H1, and the new FAQ schema", () => {
    const html = renderToStaticMarkup(createElement(UmePage))
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(html).toMatch(/<section id="osce-practice"[^>]*>[\s\S]*?<h2[^>]*>OSCE/)
    const data = schemas(html)
    const product = data.find((node) => node["@type"] === "Product")
    expect(product.url).toBe("https://clinicalsim.ai/solutions/undergraduate-medical-education#osce-practice")
    expect(product.description).toContain("OSCE")
    // The OSCE questions moved to /solutions/osce-preparation, which now owns them.
    const questions = data.find((node) => node["@type"] === "FAQPage").mainEntity.map((question: { name: string }) => question.name)
    expect(questions).toContain("How does this fit a four-year UME curriculum?")
    expect(questions.some((name: string) => name.includes("OSCE"))).toBe(false)
    expect(html).toContain('href="/solutions/osce-preparation"')
    expect(html).toContain("Standardized patients and faculty keep the graded OSCE")
  })

  it.each(["medical-school-leadership", "simulation-center-directors"])("links %s to the OSCE preparation page", (slug) => {
    const html = renderToStaticMarkup(createElement(AudiencePageLayout, { audience: getAudienceBySlug(slug)! }))
    expect(html).toContain('href="/solutions/osce-preparation"')
    expect(html).toContain("Learn more about ")
    expect(html).not.toContain("Learn more about extend")
  })
})
