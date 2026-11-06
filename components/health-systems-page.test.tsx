import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import HealthSystemsPage, { metadata } from "@/app/(marketing)/health-systems/page"
import { BANNED_CLAIM_PATTERNS, BRITISH_SPELLING_PATTERN, FORMATIVE_USE_LIMITATION } from "@/lib/claim-discipline"
import { COHORT_REPORT_SUMMARY } from "@/lib/cohort-report"
import {
  HEALTH_SYSTEMS_URL,
  healthSystemsConversationGroups,
  healthSystemsFaqs,
  healthSystemsPage,
  healthSystemsRolloutSteps,
  healthSystemsSections,
} from "@/lib/health-systems"
import * as healthSystems from "@/lib/health-systems"
import { headingId } from "@/lib/howto-schema"

const html = renderToStaticMarkup(createElement(HealthSystemsPage))

const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(
  (match) => JSON.parse(match[1])
)
const byType = (type: string) => schemas.find((node) => node["@type"] === type)

const escaped = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")

const visibleText = html
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#x27;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, "&")
  .replace(/\s+/g, " ")

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === "object") return Object.values(value).flatMap(strings)
  return []
}

describe("/health-systems", () => {
  it("renders one H1, the brief's, and a <title> that differs from it", () => {
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(html).toContain(`>${healthSystemsPage.h1}</h1>`)
    expect(metadata.title).toBe(healthSystemsPage.title)
    expect(String(metadata.title).toLowerCase()).not.toBe(healthSystemsPage.h1.toLowerCase())
    expect(`${metadata.title} | ClinicalSim.ai`.length).toBeLessThanOrEqual(75)
  })

  it("sets canonical, Open Graph, and Twitter metadata on the apex host", () => {
    expect(metadata.alternates?.canonical).toBe(HEALTH_SYSTEMS_URL)
    expect(metadata.openGraph?.url).toBe(HEALTH_SYSTEMS_URL)
    expect(metadata.twitter?.description).toBe(metadata.description)
  })

  it("emits WebPage with the CRICO citation, BreadcrumbList, HowTo, and FAQPage", () => {
    const page = byType("WebPage")
    expect(page.url).toBe(HEALTH_SYSTEMS_URL)
    expect(page.citation).toHaveLength(1)
    expect(page.citation[0].url).toContain("rmf.harvard.edu")
    expect(page.reviewedBy).toBeUndefined()
    expect(byType("BreadcrumbList").itemListElement).toHaveLength(2)

    const howTo = byType("HowTo")
    expect(howTo.step).toHaveLength(healthSystemsRolloutSteps.length)
    for (const step of howTo.step) {
      expect(html).toContain(`id="${headingId(step.name)}"`)
      expect(html).toContain(escaped(step.name))
      expect(html).toContain(escaped(step.text))
    }

    const faq = byType("FAQPage")
    expect(faq.mainEntity).toHaveLength(9)
    faq.mainEntity.forEach((entry: { name: string; acceptedAnswer: { text: string } }, i: number) => {
      expect(entry.name).toBe(healthSystemsFaqs[i].question)
      expect(entry.acceptedAnswer.text).toBe(healthSystemsFaqs[i].answer)
      expect(html).toContain(escaped(entry.name))
      expect(html).toContain(escaped(entry.acceptedAnswer.text))
    })
  })

  it("keeps FAQ answers between 40 and 80 words", () => {
    for (const faq of healthSystemsFaqs) {
      const words = faq.answer.split(/\s+/).length
      expect(words, faq.question).toBeGreaterThanOrEqual(40)
      expect(words, faq.question).toBeLessThanOrEqual(80)
    }
  })

  it("renders every ContentSection heading as an H2 and keeps the homepage anchors", () => {
    for (const section of healthSystemsSections) {
      expect(html).toContain(escaped(section.heading))
    }
    for (const group of healthSystemsConversationGroups) {
      expect(html).toContain(`id="${group.id}"`)
    }
    expect(html).toContain('id="consent-and-disclosure"')
    expect(html).toContain('id="team-communication"')
  })

  it("quotes the cohort proof verbatim from lib/cohort-report.ts", () => {
    expect(visibleText).toContain(COHORT_REPORT_SUMMARY)
    expect(visibleText).toContain("retrospective analysis")
  })

  it("carries the formative limit and no dashes, banned claims, or British spellings", () => {
    expect(visibleText).toContain(FORMATIVE_USE_LIMITATION)
    expect(visibleText).not.toMatch(/[–—]/)
    for (const text of strings(healthSystems)) {
      expect(text).not.toMatch(/[–—]/)
      expect(BRITISH_SPELLING_PATTERN.test(text), text).toBe(false)
      for (const { pattern } of BANNED_CLAIM_PATTERNS) {
        expect(pattern.test(text), `${pattern} in: ${text}`).toBe(false)
      }
    }
  })

  it("prints catalog cases as plain text with one catalog link", () => {
    expect(html.match(/href="https:\/\/platform\.clinicalsim\.ai\/catalog"/g)).toHaveLength(1)
    expect(html).not.toContain("/solutions/de-escalation")
  })
})
