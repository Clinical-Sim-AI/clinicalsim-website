import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { getAllComparisons } from "./comparisons"
import { getAllExamples } from "./examples"
import { getAllPosts } from "./posts"
import { getAllSolutions } from "./solutions"
import { getAllHelpArticles } from "./help-articles"

/** Root layout template: `%s | ClinicalSim.ai` (app/layout.tsx). */
const TITLE_SUFFIX = " | ClinicalSim.ai"

/**
 * Semrush Site Audit raises "too much text within the title tags" above this
 * length. Measured empirically against the Aug 2026 crawl: every page it flagged
 * rendered at 76+ characters and every page it passed rendered at 74 or fewer.
 * Google truncates nearer 60, so passing this limit is not the same as fitting in
 * the SERP; it only means the audit stays clean.
 */
const AUDIT_LIMIT = 75

const MARKETING = join(__dirname, "..", "app", "(marketing)")

/** Every `page.tsx` under app/(marketing), recursively. */
function pageFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...pageFiles(path))
    else if (entry.name === "page.tsx") out.push(path)
  }
  return out
}

/**
 * Pull the rendered <title> out of a page's `export const metadata` block when it
 * is a string literal. Returns null for pages whose title comes from a registry
 * (those are covered by the registry tests below) or from generateMetadata.
 */
function literalTitle(source: string): { rendered: string } | null {
  const block = source.match(/export const metadata: Metadata = \{([\s\S]*?)\n\}/)
  if (!block) return null

  const absolute = block[1].match(/^ {2}title: \{ absolute: "((?:[^"\\]|\\.)*)" \},/m)
  if (absolute) return { rendered: absolute[1] }

  const templated = block[1].match(/^ {2}title: "((?:[^"\\]|\\.)*)",/m)
  if (templated) return { rendered: templated[1] + TITLE_SUFFIX }

  return null
}

describe("page titles", () => {
  const files = pageFiles(MARKETING)

  it("finds the marketing page files it means to check", () => {
    expect(files.length).toBeGreaterThan(20)
  })

  it("keeps every hand-written page title inside the audit limit", () => {
    const checked: string[] = []
    for (const file of files) {
      const title = literalTitle(readFileSync(file, "utf8"))
      if (!title) continue
      const route = file.slice(MARKETING.length).replace(/\/page\.tsx$/, "") || "/"
      checked.push(route)
      expect(
        title.rendered.length,
        `${route} renders a ${title.rendered.length} char title: ${title.rendered}`
      ).toBeLessThanOrEqual(AUDIT_LIMIT)
    }
    expect(checked.length).toBeGreaterThan(15)
  })

  it("keeps every insight post title inside the audit limit", () => {
    // getPostMetadata sets `title: { absolute }`, so the registry title is the
    // whole rendered title. It is also the visible H1 in ArticleLayout.
    for (const post of getAllPosts()) {
      expect(
        post.title.length,
        `${post.slug} renders a ${post.title.length} char title: ${post.title}`
      ).toBeLessThanOrEqual(AUDIT_LIMIT)
    }
  })

  it("keeps every example case title inside the audit limit", () => {
    for (const example of getAllExamples()) {
      const rendered = example.metaTitle ?? `${example.title}: Example Feedback`
      expect(
        rendered.length,
        `${example.slug} renders a ${rendered.length} char title: ${rendered}`
      ).toBeLessThanOrEqual(AUDIT_LIMIT)
    }
  })

  it("keeps every comparison title inside the audit limit", () => {
    // Compare pages set `title: { absolute: comparison.metaTitle }`.
    for (const comparison of getAllComparisons()) {
      expect(
        comparison.metaTitle.length,
        `${comparison.slug} renders a ${comparison.metaTitle.length} char title: ${comparison.metaTitle}`
      ).toBeLessThanOrEqual(AUDIT_LIMIT)
    }
  })

  it("keeps every help article title inside the audit limit", () => {
    // getHelpArticleMetadata sets `title: { absolute }`, so the registry title is
    // the whole rendered title. It is also the visible H1 in HelpArticleLayout.
    for (const article of getAllHelpArticles()) {
      expect(
        article.title.length,
        `${article.slug} renders a ${article.title.length} char title: ${article.title}`
      ).toBeLessThanOrEqual(AUDIT_LIMIT)
    }
  })

  it("keeps every solution metaTitle inside the audit limit", () => {
    // Solution pages still use the root template, so the suffix counts.
    for (const solution of getAllSolutions()) {
      const rendered = solution.metaTitle + TITLE_SUFFIX
      expect(
        rendered.length,
        `${solution.slug} renders a ${rendered.length} char title: ${rendered}`
      ).toBeLessThanOrEqual(AUDIT_LIMIT)
    }
  })
})
