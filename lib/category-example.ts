import { buildFeedbackReport } from "@/components/feedback/build-report"
import { getExampleBySlug } from "@/lib/examples"

/**
 * The one real encounter the /clinical-communication-intelligence page quotes.
 *
 * Every figure and quoted line on that page is derived here from the published
 * snapshot in lib/examples, never retyped, so the page cannot drift from the
 * report a reader can open at /examples/<slug>. lib/category-page.test.ts
 * re-derives the same values from the raw rubric grade and compares.
 */
export const CATEGORY_EXAMPLE_SLUG = "pediatric-vaccine-hesitancy-counseling"

export interface CategoryExampleDomain {
  label: string
  value: number
  max: number
  quote: string
}

export interface CategoryExample {
  slug: string
  title: string
  framework: string
  /** Encounter length, rounded to whole minutes. */
  minutes: number
  total: number
  max: number
  strongest: CategoryExampleDomain
  nextFocus: CategoryExampleDomain
}

/** "U — Understand the patient's perspective" → "Understand the patient's perspective". */
function stripCode(label: string): string {
  return label.replace(/^\S+\s+[—–-]\s+/, "")
}

/** "SEGUE Framework — Communication Skills" → "SEGUE Framework". */
function stripSubtitle(title: string): string {
  return title.split(/\s+[—–-]\s+/)[0]
}

/** The first line the report quotes as the participant's own words. */
function firstQuote(reasoning: string | null): string {
  const match = reasoning?.match(/You said "([^"]+)"/)
  if (!match) throw new Error("Example competency has no quoted participant line")
  return match[1]
}

export function getCategoryExample(): CategoryExample {
  const example = getExampleBySlug(CATEGORY_EXAMPLE_SLUG)
  if (!example) throw new Error(`Missing example ${CATEGORY_EXAMPLE_SLUG}`)

  const report = buildFeedbackReport(example.report)
  const section = report.sections.find(
    (s) => s.kind === "communication" && s.score && s.competencies?.length
  )
  if (!section?.score || !section.competencies) {
    throw new Error(`${CATEGORY_EXAMPLE_SLUG} has no scored communication section`)
  }

  // Ranked by share of the domain's maximum, so a rubric with mixed scales
  // still compares like with like. Ties keep the first domain in report order,
  // matching lib/category-page.test.ts.
  const scored = section.competencies.filter((c) => !c.notAssessable)
  const share = (c: (typeof scored)[number]) => (c.value ?? 0) / c.max
  const strongest = scored.reduce((a, b) => (share(b) > share(a) ? b : a))
  const nextFocus = scored.reduce((a, b) => (share(b) < share(a) ? b : a))
  const toDomain = (c: (typeof scored)[number]): CategoryExampleDomain => ({
    label: stripCode(c.label),
    value: c.value ?? 0,
    max: c.max,
    quote: firstQuote(c.reasoning),
  })

  return {
    slug: example.slug,
    title: example.title,
    framework: stripSubtitle(section.title),
    minutes: Math.round((example.durationSeconds ?? 0) / 60),
    total: section.score.total,
    max: section.score.max,
    strongest: toDomain(strongest),
    nextFocus: toDomain(nextFocus),
  }
}
