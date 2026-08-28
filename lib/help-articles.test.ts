import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { getAllHelpArticles } from "./help-articles"

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
})
