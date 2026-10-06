import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import Page, { metadata } from "../app/(marketing)/clinical-communication-intelligence/page"
import { CATEGORY_EXAMPLE_SLUG } from "./category-example"
import {
  BRITISH_SPELLING_PATTERN,
  FORMATIVE_USE_LIMITATION,
  NO_OUTCOME_PREDICTION_LIMITATION,
  SP_SUPPLEMENT_LINE,
} from "./claim-discipline"
import { getExampleBySlug } from "./examples"
import { CATEGORY_MEANING, PRIMARY_CTA } from "./positioning"

const html = renderToStaticMarkup(createElement(Page))

/** Visible text only: no JSON-LD, tags stripped, entities decoded. */
const text = html
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&quot;/g, '"')
  .replace(/&#x27;/g, "'")
  .replace(/&amp;/g, "&")
  .replace(/\s+/g, " ")

describe("/clinical-communication-intelligence", () => {
  it("renders one h1 and a title that differs from it", () => {
    const h1s = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g) ?? []
    expect(h1s).toHaveLength(1)
    const h1 = h1s[0]!.replace(/<[^>]+>/g, "").trim()
    const title = (metadata.title as { absolute: string }).absolute
    expect(title).not.toBe(h1)
    expect(title.length).toBeLessThanOrEqual(75)
    expect(metadata.alternates?.canonical).toBe(
      "https://clinicalsim.ai/clinical-communication-intelligence"
    )
  })

  it("emits WebPage and BreadcrumbList schema", () => {
    expect(html).toContain('"@type":"WebPage"')
    expect(html).toContain('"@type":"BreadcrumbList"')
  })

  it("states the definition and the three limits verbatim", () => {
    for (const sentence of [
      CATEGORY_MEANING,
      FORMATIVE_USE_LIMITATION,
      NO_OUTCOME_PREDICTION_LIMITATION,
      SP_SUPPLEMENT_LINE,
    ]) {
      expect(text).toContain(sentence)
    }
  })

  it("uses the acronym once and the shared call to action", () => {
    expect(text.match(/\bCCI\b/g)).toHaveLength(1)
    expect(text).toContain(PRIMARY_CTA)
  })

  it("keeps dashes and British spellings out of visible copy", () => {
    expect(text).not.toMatch(/[–—]/)
    expect(text).not.toMatch(BRITISH_SPELLING_PATTERN)
  })

  // Re-derived from the raw snapshot rather than through lib/category-example,
  // so a bug in that helper cannot make the page and the test agree on a wrong
  // number.
  it("matches the example's figures and quotes to the lib/examples source", () => {
    const example = getExampleBySlug(CATEGORY_EXAMPLE_SLUG)!
    const grade = example.report.rubricGrades.find((g) => !g.isAcgmeMilestone)!
    const fields = (grade.evaluationFields ?? []).filter((f) => f.type === "ordinal")
    const scored = fields.map((f) => {
      const entry = grade.extractedData?.[f.key] as { value: number; reasoning: string }
      return { label: f.label, max: f.scale.max, ...entry }
    })
    const total = scored.reduce((sum, f) => sum + f.value, 0)
    const max = scored.reduce((sum, f) => sum + f.max, 0)
    const high = scored.reduce((a, b) => (b.value > a.value ? b : a))
    const low = scored.reduce((a, b) => (b.value < a.value ? b : a))
    const quoteOf = (reasoning: string) => reasoning.match(/You said "([^"]+)"/)![1]

    expect(html).toContain(`data-example="total">${total} of ${max}<`)
    expect(html).toContain(`data-example="strongest">${high.value} of ${high.max}<`)
    expect(html).toContain(`data-example="next-focus">${low.value} of ${low.max}<`)
    expect(html).toContain(
      `data-example="minutes">${Math.round(example.durationSeconds! / 60)} minute<`
    )
    expect(text).toContain(high.label.split(" — ")[1])
    expect(text).toContain(low.label.split(" — ")[1])
    expect(text).toContain(`"${quoteOf(high.reasoning)}"`)
    expect(text).toContain(`"${quoteOf(low.reasoning)}"`)
  })
})
