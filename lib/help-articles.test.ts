import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { getAllHelpArticles, getHelpArticleBySlug } from "./help-articles"

const HELP_DIR = join(__dirname, "..", "app", "(marketing)", "help")

describe("help articles", () => {
  it("has at least one article to check", () => {
    expect(getAllHelpArticles().length).toBeGreaterThan(0)
  })

  // The failure mode of a metadata-only registry: an entry reaches the sitemap
  // and /llms.txt while the route it names 404s.
  it("backs every registry entry with a page.mdx on disk", () => {
    for (const article of getAllHelpArticles()) {
      const path = join(HELP_DIR, article.slug, "page.mdx")
      expect(
        existsSync(path),
        `help article ${article.slug} has no page at ${path}`
      ).toBe(true)
    }
  })

  // The mirror failure: an MDX page lands under /help without a registry row,
  // so it deploys and is crawlable while missing from the sitemap and
  // /llms.txt. Directories without a page.mdx (release-notes is a page.tsx)
  // fall out of the check on their own.
  it("backs every page.mdx on disk with a registry entry", () => {
    const slugs = readdirSync(HELP_DIR, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          existsSync(join(HELP_DIR, entry.name, "page.mdx"))
      )
      .map((entry) => entry.name)

    for (const slug of slugs) {
      expect(
        getHelpArticleBySlug(slug),
        `help page ${slug} is missing from the help-article registry`
      ).toBeDefined()
    }
  })
})
