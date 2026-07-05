import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"
import { getAllAudiences } from "@/lib/audiences"
import { getAllSolutions } from "@/lib/solutions"
import { getAllComparisons } from "@/lib/comparisons"
import { getAllExamples } from "@/lib/examples"

const BASE_URL = "https://clinicalsim.ai"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const audiences = getAllAudiences()
  const solutions = getAllSolutions()
  const comparisons = getAllComparisons()
  const examples = getAllExamples()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date("2026-02-14"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/solutions`,
      lastModified: new Date("2026-06-09"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/audiences`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/research`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date("2026-06-09"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: new Date("2026-07-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date("2026-07-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/program-director-faq`,
      lastModified: new Date("2026-07-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date("2026-06-09"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/examples`,
      lastModified: new Date("2026-06-09"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
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

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...solutionPages,
    ...audiencePages,
    ...comparisonPages,
    ...examplePages,
    ...blogPages,
  ]
}
