import { describe, expect, it } from "vitest"
import {
  getAllGlossaryTerms,
  getGlossaryPageTitle,
  getGlossaryTeaser,
  getGlossaryTermBySlug,
  getIndexableGlossaryTerms,
  getRelatedGlossaryTerms,
  type GlossaryTerm,
} from "./glossary"
import { getAllAudiences } from "./audiences"
import { getAllComparisons } from "./comparisons"
import { getAllPosts } from "./posts"
import { getAllSolutions } from "./solutions"
import { generateStaticParams } from "../app/(marketing)/glossary/[slug]/page"

const terms = getAllGlossaryTerms()
const indexable = getIndexableGlossaryTerms()

/** Root layout template: `%s | ClinicalSim.ai`. */
const TITLE_SUFFIX = " | ClinicalSim.ai"

/**
 * Every internal path a relatedLinks entry is allowed to point at. Built from the
 * same registries the routes are, so a renamed slug fails here rather than
 * shipping a 404 from an indexable page.
 */
const VALID_INTERNAL_PATHS = new Set<string>([
  "/",
  "/about",
  "/audiences",
  "/compare",
  "/contact",
  "/examples",
  "/faq",
  "/glossary",
  "/help",
  "/insights",
  "/medical-educator-faq",
  "/methodology",
  "/research",
  "/roi-calculator",
  "/solutions",
  "/trust",
  ...getAllAudiences().map((a) => `/audiences/${a.slug}`),
  ...getAllComparisons().map((c) => `/compare/${c.slug}`),
  ...getAllSolutions().map((s) => `/solutions/${s.slug}`),
  ...getAllPosts().map((p) => `/insights/${p.slug}`),
  ...terms.map((t) => `/glossary/${t.slug}`),
])

/** Every string in a term that a reader can see. Code comments are exempt. */
function visibleStrings(term: GlossaryTerm): string[] {
  return [
    term.term,
    term.definition,
    term.abbreviation,
    term.teaser,
    term.metaDescription,
    term.metaTitle,
    term.source,
    ...(term.explainer ?? []),
    ...(term.inPractice ?? []),
    ...(term.relatedLinks ?? []).map((link) => link.label),
  ].filter((value): value is string => typeof value === "string")
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

describe("glossary registry", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = terms.map((term) => term.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) {
      expect(slug, `${slug} is not a clean slug`).toMatch(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/
      )
    }
  })

  it("resolves every relatedSlugs reference", () => {
    for (const term of terms) {
      for (const related of term.relatedSlugs ?? []) {
        expect(
          getGlossaryTermBySlug(related),
          `${term.slug} points at missing term ${related}`
        ).toBeDefined()
        expect(related, `${term.slug} lists itself as related`).not.toBe(
          term.slug
        )
      }
    }
  })

  it("produces a usable hub teaser for every term", () => {
    for (const term of terms) {
      const teaser = getGlossaryTeaser(term)
      expect(teaser.length, `${term.slug} teaser is too short`).toBeGreaterThanOrEqual(60)
      expect(teaser, `${term.slug} teaser is unpunctuated`).toMatch(/[.!?]$/)
    }
  })

  it("keeps an abbreviation intact when cutting the teaser", () => {
    // No registry term opens with an abbreviation today, and the offset-based
    // sentence split exists precisely so that the first one to do so does not
    // lose the letter in front of the period.
    const teaser = getGlossaryTeaser({
      slug: "fixture",
      term: "Fixture",
      definition:
        "U.S. residency programs report milestone ratings to the ACGME twice a year. A second sentence follows it. And a third.",
    })

    expect(teaser).toBe(
      "U.S. residency programs report milestone ratings to the ACGME twice a year."
    )
  })

  it("never returns a term as its own relation", () => {
    for (const term of terms) {
      const related = getRelatedGlossaryTerms(term.slug)
      expect(related.map((r) => r.slug)).not.toContain(term.slug)
      expect(new Set(related.map((r) => r.slug)).size).toBe(related.length)
    }
  })

  // Published prose must not carry en or em dashes (CLAUDE.md, non-negotiable).
  // Asserted against the data, not the source file, because the file's code
  // comments legitimately use them.
  it("uses no en or em dashes in reader-visible copy", () => {
    for (const term of terms) {
      for (const value of visibleStrings(term)) {
        expect(value, `${term.slug} contains an en or em dash`).not.toMatch(
          /[–—]/
        )
      }
    }
  })
})

describe("indexable glossary terms", () => {
  it("only publishes term pages that clear the substance bar", () => {
    for (const term of indexable) {
      const label = term.slug

      expect(
        term.metaDescription.length,
        `${label} metaDescription is ${term.metaDescription.length} chars, want 110-155`
      ).toBeGreaterThanOrEqual(110)
      expect(
        term.metaDescription.length,
        `${label} metaDescription is ${term.metaDescription.length} chars, want 110-155`
      ).toBeLessThanOrEqual(155)

      // A meta description lifted from the definition gives the term page
      // nothing of its own to be cited for.
      expect(
        term.definition.includes(term.metaDescription),
        `${label} metaDescription is a substring of its definition`
      ).toBe(false)

      const body = wordCount(term.definition) + wordCount(term.explainer.join(" "))
      expect(
        body,
        `${label} has ${body} words of body copy, want at least 300`
      ).toBeGreaterThanOrEqual(300)

      expect(
        term.relatedSlugs?.length ?? 0,
        `${label} needs at least 2 related terms`
      ).toBeGreaterThanOrEqual(2)

      // At least one link off the glossary, so a term page is never a dead end
      // and link equity reaches the commercial pages.
      const offGlossary = (term.relatedLinks ?? []).filter(
        (link) => link.href.startsWith("/") && !link.href.startsWith("/glossary")
      )
      expect(
        offGlossary.length,
        `${label} needs at least 1 relatedLinks entry pointing off /glossary`
      ).toBeGreaterThanOrEqual(1)

      const updated = new Date(term.lastUpdated)
      expect(Number.isNaN(updated.getTime()), `${label} lastUpdated is invalid`).toBe(
        false
      )
      expect(
        updated.getTime(),
        `${label} lastUpdated is in the future`
      ).toBeLessThanOrEqual(Date.now())

      // Would corrupt the generated /llms.txt line.
      expect(term.metaDescription, `${label} metaDescription breaks llms.txt`).not.toMatch(
        /[\n\r]|\]\(/
      )
    }
  })

  it("keeps every term page title inside Google's display budget", () => {
    // The root layout appends " | ClinicalSim.ai", so a long `term` pushes the
    // acronym people actually search for past the truncation point. metaTitle is
    // the escape hatch; this is what forces it to be used.
    for (const term of indexable) {
      const rendered = getGlossaryPageTitle(term) + TITLE_SUFFIX
      expect(
        rendered.length,
        `${term.slug} renders a ${rendered.length} char title: ${rendered}`
      ).toBeLessThanOrEqual(60)
    }
  })

  it("points every relatedLinks entry at a route that exists", () => {
    for (const term of indexable) {
      for (const link of term.relatedLinks ?? []) {
        const [path] = link.href.split("#")
        expect(
          VALID_INTERNAL_PATHS.has(path),
          `${term.slug} links to ${link.href}, which is not a route on this site`
        ).toBe(true)
        expect(link.label.trim().length, `${term.slug} has an unlabelled link`).toBeGreaterThan(0)
      }
    }
  })

  it("keeps the hub teaser shorter than the full definition", () => {
    // A teaser that equals the definition puts the term page's most quotable
    // passage back on the hub, which is what this split exists to prevent.
    for (const term of indexable) {
      expect(
        getGlossaryTeaser(term).length,
        `${term.slug} teaser republishes its whole definition on the hub`
      ).toBeLessThan(term.definition.length)
    }
  })

  it("builds a static page for exactly the indexable terms", () => {
    // A forgotten filter in generateStaticParams would silently publish thin
    // pages without failing anything else.
    expect(generateStaticParams().map((p) => p.slug).sort()).toEqual(
      indexable.map((term) => term.slug).sort()
    )
  })
})
