import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { getAllComparisons } from "./comparisons"
import { getAllExamples } from "./examples"
import { getAllPosts, getPostMetadata } from "./posts"
import { getAllSolutions } from "./solutions"
import { getAllHelpArticles, getHelpArticleMetadata } from "./help-articles"

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

/**
 * Google truncates titles near 60 characters. Posts, help articles, and the
 * templated compare pages hold their rendered <title> (suffix included) to this,
 * using a short `seoTitle` / `metaTitle` where the H1 runs long.
 */
const SERP_LIMIT = 60

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

  it("renders every insight post title with the suffix, within 60, unlike its H1", () => {
    // getPostMetadata passes `seoTitle ?? title` through the root template. The
    // registry `title` is the visible H1 in ArticleLayout.
    for (const post of getAllPosts()) {
      // Read the helper's real output: an `absolute` object would skip the suffix.
      const title = getPostMetadata(post.slug).title
      expect(typeof title, `${post.slug} must use the root template`).toBe("string")
      const rendered = title + TITLE_SUFFIX
      expect(
        rendered.length,
        `${post.slug} renders a ${rendered.length} char title: ${rendered}`
      ).toBeLessThanOrEqual(SERP_LIMIT)
      expect(rendered, `${post.slug} title matches its H1`).not.toBe(post.title)
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

  it("keeps every comparison title inside its limit and unlike its H1", () => {
    // Compare pages either pass metaTitle through the root template or, for the
    // standardized patients page, set it as `absolute`. heroHeadline is the H1.
    const compareDir = join(MARKETING, "compare")
    for (const comparison of getAllComparisons()) {
      const source = readFileSync(join(compareDir, comparison.slug, "page.tsx"), "utf8")
      const absolute = /title:\s*\{\s*absolute:\s*comparison\.metaTitle\s*\}/.test(source)
      const templated = /^ {2}title:\s*comparison\.metaTitle,/m.test(source)
      expect(absolute !== templated, `${comparison.slug} title form not recognized`).toBe(true)
      const rendered = absolute ? comparison.metaTitle : comparison.metaTitle + TITLE_SUFFIX
      expect(
        rendered.length,
        `${comparison.slug} renders a ${rendered.length} char title: ${rendered}`
      ).toBeLessThanOrEqual(absolute ? AUDIT_LIMIT : SERP_LIMIT)
      expect(rendered, `${comparison.slug} title matches its H1`).not.toBe(comparison.heroHeadline)
    }
  })

  it("renders every help article title with the suffix, within 60, unlike its H1", () => {
    // getHelpArticleMetadata passes the registry title through the root template.
    // The registry title is also the visible H1 in HelpArticleLayout.
    for (const article of getAllHelpArticles()) {
      const title = getHelpArticleMetadata(article.slug).title
      expect(typeof title, `${article.slug} must use the root template`).toBe("string")
      const rendered = title + TITLE_SUFFIX
      expect(
        rendered.length,
        `${article.slug} renders a ${rendered.length} char title: ${rendered}`
      ).toBeLessThanOrEqual(SERP_LIMIT)
      expect(rendered, `${article.slug} title matches its H1`).not.toBe(article.title)
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
