import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import HomePage from "../app/(marketing)/page"
import HealthSystemsPage, { metadata as healthMetadata } from "../app/(marketing)/health-systems/page"
import MedicalEducationPage, { metadata as educationMetadata } from "../app/(marketing)/medical-education/page"
import EvidencePage, { metadata as evidenceMetadata } from "../app/(marketing)/evidence/page"
import EvaluationPage from "../app/(marketing)/evaluation/page"
import sitemap from "../app/sitemap"
import { GET } from "../app/llms.txt/route"
import { FORMATIVE_USE_LIMITATION } from "./claim-discipline"
import { getAllExamples } from "./examples"

const buyerPages = [
  { path: "/health-systems", Page: HealthSystemsPage, metadata: healthMetadata },
  { path: "/medical-education", Page: MedicalEducationPage, metadata: educationMetadata },
  { path: "/evidence", Page: EvidencePage, metadata: evidenceMetadata },
]
const text = (html: string) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ")

describe("the first buyer journey", () => {
  it.each(buyerPages)("keeps $path discoverable with one title and matching canonical/schema URLs", async ({ path, Page, metadata }) => {
    const html = renderToStaticMarkup(createElement(Page))
    const url = `https://clinicalsim.ai${path}`
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(metadata.alternates?.canonical).toBe(url)
    expect(metadata.openGraph?.url).toBe(url)
    expect(metadata.twitter?.description).toBe(metadata.description)
    expect(html).toContain('"@type":"WebPage"')
    expect(html).toContain('"@type":"BreadcrumbList"')
    expect(html).toContain(`"url":"${url}"`)
    const entry = sitemap().find((item) => item.url === url)
    expect(entry).toBeDefined()
    expect(html).toContain(`"dateModified":"${(entry!.lastModified as Date).toISOString().slice(0, 10)}"`)
    expect(await (await GET()).text()).toContain(url)
    expect(text(html)).toContain(FORMATIVE_USE_LIMITATION)
    expect(text(html)).not.toMatch(/[\u2013\u2014]/)
  })

  it("shows both buyer paths before assessment details", () => {
    const html = renderToStaticMarkup(createElement(HomePage))
    const assessment = html.indexOf('id="how-an-assessment-works"')
    expect(html.indexOf('href="/health-systems"')).toBeLessThan(assessment)
    expect(html.indexOf('href="/medical-education"')).toBeLessThan(assessment)
    expect(html).toContain(`href="/examples/${getAllExamples().find((item) => item.slug === "pediatric-vaccine-hesitancy-counseling")!.slug}"`)
  })

  it("resolves homepage priority and launch anchors to real sections", () => {
    const home = renderToStaticMarkup(createElement(HomePage))
    const targets: Record<string, string> = {
      "/health-systems": renderToStaticMarkup(createElement(HealthSystemsPage)),
      "/evaluation": renderToStaticMarkup(createElement(EvaluationPage)),
    }
    for (const match of home.matchAll(/href="(\/health-systems|\/evaluation)#([^"]+)"/g)) {
      expect(targets[match[1]], `${match[1]}#${match[2]}`).toContain(`id="${match[2]}"`)
    }
  })
})
