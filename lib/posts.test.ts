import { describe, expect, it } from "vitest"
import { getAllAudiences } from "./audiences"
import { getAllComparisons } from "./comparisons"
import { getAllPosts, getPostBySlug, type PostSlug } from "./posts"
import { getAllSolutions } from "./solutions"

/**
 * The union in lib/posts.ts, restated as runtime values. TypeScript checks that
 * every registry entry's slug is in the union; this array plus the tests below
 * check the reverse, so a slug removed from the registry cannot linger in the
 * union and keep type-checking a dead cross-registry reference.
 */
const UNION_MEMBERS: PostSlug[] = [
  "why-standardized-patient-programs-run-out-of-capacity",
  "building-rapport-clinical-encounter",
  "eol-communication-training-measurement-gap",
  "breaking-bad-news-practice-not-knowledge",
  "what-programs-lost-when-step-2-cs-disappeared",
  "faculty-hour-problem-communication-remediation",
  "ai-affirming-care-communication-training",
  "osce-case-design-guide",
  "hospital-communication-training-roi",
  "healthcare-simulation-technology-trends",
  "breaking-bad-news-medical-training",
  "what-learners-want-from-ai-sps",
  "end-of-life-care-communication",
  "why-communication-training-matters",
  "scalability-problem-sp-programs",
]

describe("Post registry", () => {
  it("has a registry entry for every PostSlug", () => {
    for (const slug of UNION_MEMBERS) {
      expect(
        getPostBySlug(slug),
        `PostSlug includes "${slug}" but no post has that slug`
      ).toBeDefined()
    }
  })

  it("has a PostSlug for every registry entry", () => {
    const union = new Set<string>(UNION_MEMBERS)

    // getAllPosts() hides redirected entries, and those are exactly the ones a
    // stale cross-registry reference points at, so walk the union's own
    // resolutions plus the live list rather than the live list alone.
    for (const post of getAllPosts()) {
      expect(
        union.has(post.slug),
        `post "${post.slug}" is missing from the PostSlug union`
      ).toBe(true)
    }
  })

  it("has no duplicate slugs", () => {
    const slugs = getAllPosts().map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("points every redirectTo at a live internal page", () => {
    const livePaths = new Set<string>([
      ...getAllPosts().map((p) => `/insights/${p.slug}`),
      ...getAllComparisons().map((c) => `/compare/${c.slug}`),
      ...getAllSolutions().map((s) => `/solutions/${s.slug}`),
      ...getAllAudiences().map((a) => `/audiences/${a.slug}`),
    ])

    for (const slug of UNION_MEMBERS) {
      const target = getPostBySlug(slug)?.redirectTo
      if (!target) continue

      expect(
        livePaths.has(target),
        `${slug} redirects to ${target}, which is not a live page`
      ).toBe(true)
    }
  })
})

describe("related post references", () => {
  it("never points a related-posts list at a redirected post", () => {
    // PostSlug catches a slug that no longer exists. It cannot catch one that
    // still exists but redirects: getAllPosts() filters `redirectTo` while
    // getPostBySlug() does not, so a stale slug in one of these arrays
    // type-checks and renders a card that 308s on click.
    const sources = [
      ...getAllAudiences().map((a) => ({ kind: "audience", slug: a.slug, related: a.relatedPostSlugs })),
      ...getAllSolutions().map((s) => ({ kind: "solution", slug: s.slug, related: s.relatedPostSlugs })),
      ...getAllComparisons().map((c) => ({ kind: "comparison", slug: c.slug, related: c.relatedPostSlugs })),
    ]

    for (const source of sources) {
      for (const slug of source.related ?? []) {
        const post = getPostBySlug(slug)
        expect(post, `${source.kind} ${source.slug} references unknown post ${slug}`).toBeDefined()
        expect(
          post!.redirectTo,
          `${source.kind} ${source.slug} links redirected post ${slug}`
        ).toBeUndefined()
      }
    }
  })

  it("still has a redirected post in the registry to guard against", () => {
    // If this ever goes away the check above becomes vacuous. getAllPosts()
    // hides redirected posts, so reach for the unfiltered lookup.
    const redirected = getPostBySlug("breaking-bad-news-medical-training")
    expect(redirected?.redirectTo).toBe("/insights/breaking-bad-news-practice-not-knowledge")
    expect(getAllPosts().some((p) => p.slug === redirected!.slug)).toBe(false)
  })
})
