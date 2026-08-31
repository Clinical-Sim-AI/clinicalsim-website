import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { getAllHelpArticles, getHelpArticleBySlug } from "./help-articles"

const HELP_DIR = join(__dirname, "..", "app", "(marketing)", "help")

/**
 * Routes under /help that are deliberately not registry-backed. Each one is
 * hand-listed in app/sitemap.ts and app/llms.txt/route.ts, which is what the
 * registry buys everybody else. Add to this only alongside those two entries.
 */
const UNREGISTERED_HELP_ROUTES = new Set(["release-notes"])

/** Directory names under /help that render a page, in either file format. */
function helpRouteDirs(): string[] {
  return readdirSync(HELP_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        (existsSync(join(HELP_DIR, entry.name, "page.mdx")) ||
          existsSync(join(HELP_DIR, entry.name, "page.tsx")))
    )
    .map((entry) => entry.name)
}

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

  // The mirror failure: a page lands under /help without a registry row, so it
  // deploys and is crawlable while missing from the sitemap and /llms.txt.
  // lib/llms-coverage.test.ts walks sitemap -> llms.txt, so a page absent from
  // the sitemap is invisible to it and only this check catches it. Both file
  // formats count: page.tsx is as crawlable as page.mdx.
  it("backs every page under /help with a registry entry", () => {
    for (const slug of helpRouteDirs()) {
      if (UNREGISTERED_HELP_ROUTES.has(slug)) continue
      expect(
        getHelpArticleBySlug(slug),
        `help page ${slug} is missing from the help-article registry`
      ).toBeDefined()
    }
  })

  // An MDX page names its slug twice, in HelpArticleLayout and in
  // getHelpArticleMetadata, and neither check above reads the string inside the
  // file. A typo there survives both: HelpArticleLayout calls notFound(), so
  // the route 404s while the sitemap and /llms.txt keep advertising it, and a
  // slug that lands on a *different* real article silently serves that
  // article's title, description, and canonical.
  it("names its own slug in every page.mdx", () => {
    for (const slug of helpRouteDirs()) {
      const path = join(HELP_DIR, slug, "page.mdx")
      if (!existsSync(path)) continue

      const source = readFileSync(path, "utf8")
      const named = [
        ...source.matchAll(/HelpArticleLayout\s+slug="([^"]*)"/g),
        ...source.matchAll(/getHelpArticleMetadata\("([^"]*)"\)/g),
      ].map((match) => match[1])

      expect(
        named.length,
        `${path} calls neither HelpArticleLayout nor getHelpArticleMetadata with a literal slug`
      ).toBeGreaterThan(0)

      for (const declared of named) {
        expect(
          declared,
          `${path} declares slug "${declared}" but lives in the ${slug} directory`
        ).toBe(slug)
      }
    }
  })
})
