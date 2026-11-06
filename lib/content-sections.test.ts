import { describe, expect, it } from "vitest"
import { getExampleBySlug } from "./examples"
import { getAllSolutions } from "./solutions"
import { healthSystemsSections } from "./health-systems"
import { nursingSections } from "./nursing"
import type { ContentSection } from "./content-sections"

/** Every string value inside a snapshot, however deeply nested. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === "object") return Object.values(value).flatMap(strings)
  return []
}

/**
 * A report excerpt is presented as a line from a real feedback report. These checks fail when
 * the example it cites does not exist or does not contain the quote word for word, so a
 * paraphrase or an invented line cannot ship under a real example's name.
 */
function reportExcerptProblems(owner: string, sections: ContentSection[] | undefined): string[] {
  const problems: string[] = []
  for (const section of sections ?? []) {
    if (section.type !== "report-excerpt") continue
    const example = getExampleBySlug(section.source.exampleSlug)
    if (!example) {
      problems.push(`${owner}: example "${section.source.exampleSlug}" does not exist`)
      continue
    }
    if (!strings(example).some((text) => text.includes(section.quote))) {
      problems.push(`${owner}: quote not found verbatim in ${section.source.exampleSlug}: "${section.quote}"`)
    }
  }
  return problems
}

describe("report excerpts", () => {
  it("quote a real example verbatim on every solution page", () => {
    const problems = getAllSolutions().flatMap((s) => reportExcerptProblems(s.slug, s.sections))
    expect(problems).toEqual([])
  })

  it("quote a real example verbatim on /health-systems and /nursing", () => {
    expect([
      ...reportExcerptProblems("/health-systems", healthSystemsSections),
      ...reportExcerptProblems("/nursing", nursingSections),
    ]).toEqual([])
  })

  it("flags a missing example and an invented quote", () => {
    expect(
      reportExcerptProblems("fixture", [
        { type: "report-excerpt", heading: "H", quote: "x", source: { exampleSlug: "no-such-example", label: "L" } },
        {
          type: "report-excerpt",
          heading: "H",
          quote: "A line nobody ever wrote in any report 7f3a.",
          source: { exampleSlug: "48-hours-in-the-hallway", label: "L" },
        },
      ])
    ).toHaveLength(2)
  })
})
