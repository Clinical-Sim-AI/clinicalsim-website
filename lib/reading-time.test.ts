import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import {
  countMdxWords,
  parseReadingTime,
  readingTimeMinutes,
  WORDS_PER_MINUTE,
} from "./reading-time"
import { getAllPosts } from "./posts"

const REPO_ROOT = join(import.meta.dirname, "..")
const INSIGHTS_DIR = join(REPO_ROOT, "app/(marketing)/insights")

/**
 * A minute of slack either way, because the reading rate itself is a range
 * (200 to 250 wpm) and a word count is not the whole of how long a page takes
 * to read. What the bound catches is the defect that was actually shipping: a
 * 313-word post claiming 5 minutes and a 595-word post claiming 10.
 */
const TOLERANCE_MINUTES = 1

function readPostSource(slug: string): string {
  return readFileSync(join(INSIGHTS_DIR, slug, "page.mdx"), "utf8")
}

describe("countMdxWords", () => {
  // Both of these silently returned zero from an earlier regex implementation,
  // which made the whole check pass while measuring nothing.
  it("counts prose and drops imports, tags, and nested braced props", () => {
    const source = [
      'import { ArticleLayout } from "@/components/article-layout"',
      'export const metadata = getPostMetadata("x")',
      "",
      '<ArticleLayout post={getPostBySlug("x")}>',
      "",
      "## A heading with five words",
      "",
      "One two three four five six.",
      "",
      "<ReferencesSection references={[",
      '  { title: "Ignore every word in here", source: "Journal", year: "2024" },',
      "]} />",
      "",
      "</ArticleLayout>",
    ].join("\n")

    expect(countMdxWords(source)).toBe(11)
  })

  it("keeps link text and drops link targets", () => {
    expect(countMdxWords("[read the methodology](/methodology)")).toBe(3)
  })

  it("drops fenced code blocks", () => {
    expect(countMdxWords("Real words here.\n\n```\nconst ignored = 1\n```")).toBe(3)
  })
})

describe("Post.readingTime", () => {
  const posts = getAllPosts()

  it("is well formed on every post", () => {
    for (const post of posts) {
      expect(
        parseReadingTime(post.readingTime),
        `${post.slug} has readingTime "${post.readingTime}", expected "N min read"`
      ).not.toBeNull()
    }
  })

  it("matches the words actually in the MDX", () => {
    for (const post of posts) {
      const words = countMdxWords(readPostSource(post.slug))
      const derived = readingTimeMinutes(words)
      const claimed = parseReadingTime(post.readingTime)!

      expect(
        Math.abs(claimed - derived),
        `${post.slug} claims ${claimed} min but has ${words} prose words ` +
          `(${derived} min at ${WORDS_PER_MINUTE} wpm)`
      ).toBeLessThanOrEqual(TOLERANCE_MINUTES)
    }
  })
})
