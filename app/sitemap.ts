import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"
import { getAllAudiences } from "@/lib/audiences"
import { getAllSolutions } from "@/lib/solutions"
import { getAllComparisons } from "@/lib/comparisons"
import { getAllExamples } from "@/lib/examples"
import { getIndexableGlossaryTerms } from "@/lib/glossary"
import { getAllHelpArticles, getHelpHubLastUpdated } from "@/lib/help-articles"
import { RELEASE_NOTES_UPDATED_ISO } from "@/lib/release-notes"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"

const BASE_URL = "https://clinicalsim.ai"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const audiences = getAllAudiences()
  const solutions = getAllSolutions()
  const comparisons = getAllComparisons()
  const examples = getAllExamples()
  const glossary = getIndexableGlossaryTerms()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(PAGE_DATE_MODIFIED.home),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-08-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-08-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(PAGE_DATE_MODIFIED.insights),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/solutions`,
      lastModified: new Date("2026-08-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/audiences`,
      lastModified: new Date("2026-08-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/research`,
      lastModified: new Date(PAGE_DATE_MODIFIED.research),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(PAGE_DATE_MODIFIED.glossary),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: new Date(PAGE_DATE_MODIFIED.methodology),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/trust`,
      lastModified: new Date("2026-08-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(PAGE_DATE_MODIFIED.faq),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/medical-educator-faq`,
      lastModified: new Date("2026-08-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date("2026-08-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/examples`,
      lastModified: new Date("2026-08-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/help`,
      // Derived, because the hub's guide list is registry-driven: a new guide
      // changes the page whether or not anyone remembers to touch this file.
      lastModified: new Date(getHelpHubLastUpdated()),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/help/release-notes`,
      lastModified: new Date(RELEASE_NOTES_UPDATED_ISO),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    // /roi-calculator is withheld from the sitemap while the page is unpublished.
    // The route still builds; restore this entry when it goes public.
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Fallback dates keep the sitemap stable for entries without an explicit
  // lastUpdated. When set, lastUpdated is the single source of truth that keeps
  // the sitemap, WebPage schema, and the visible "Last updated" line in sync.
  const SOLUTION_FALLBACK = new Date("2026-06-09")
  const AUDIENCE_FALLBACK = new Date("2026-02-14")

  const solutionPages: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: `${BASE_URL}/solutions/${solution.slug}`,
    lastModified: solution.lastUpdated
      ? new Date(solution.lastUpdated)
      : SOLUTION_FALLBACK,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  const audiencePages: MetadataRoute.Sitemap = audiences.map((audience) => ({
    url: `${BASE_URL}/audiences/${audience.slug}`,
    lastModified: audience.lastUpdated
      ? new Date(audience.lastUpdated)
      : AUDIENCE_FALLBACK,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${BASE_URL}/compare/${c.slug}`,
    lastModified: c.lastUpdated ? new Date(c.lastUpdated) : SOLUTION_FALLBACK,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const examplePages: MetadataRoute.Sitemap = examples.map((example) => ({
    url: `${BASE_URL}/examples/${example.slug}`,
    lastModified: new Date(example.recordedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Definitions change rarely and the hub stays the entry point, so term pages
  // sit below it. Driven by getIndexableGlossaryTerms() so the sitemap and
  // /llms.txt cannot disagree (lib/llms-coverage.test.ts enforces that).
  const glossaryPages: MetadataRoute.Sitemap = glossary.map((term) => ({
    url: `${BASE_URL}/glossary/${term.slug}`,
    lastModified: new Date(term.lastUpdated),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }))

  // Driven by the help-article registry so the sitemap and /llms.txt cannot
  // disagree (lib/llms-coverage.test.ts enforces that). Same priority as the
  // rest of /help.
  const helpArticlePages: MetadataRoute.Sitemap = getAllHelpArticles().map(
    (article) => ({
      url: `${BASE_URL}/help/${article.slug}`,
      lastModified: new Date(article.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  )

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...solutionPages,
    ...audiencePages,
    ...comparisonPages,
    ...examplePages,
    ...glossaryPages,
    ...helpArticlePages,
    ...blogPages,
  ]
}
