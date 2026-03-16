import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"
import { getAllSolutions } from "@/lib/solutions"
import { getAllAudiences } from "@/lib/audiences"

const BASE_URL = "https://clinicalsim.ai"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const solutions = getAllSolutions()
  const audiences = getAllAudiences()

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
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/solutions/remediation`,
      lastModified: new Date("2026-03-16"),
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
  ]

  const solutionPages: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: `${BASE_URL}/solutions/${solution.slug}`,
    lastModified: new Date("2026-02-14"),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  const audiencePages: MetadataRoute.Sitemap = audiences.map((audience) => ({
    url: `${BASE_URL}/audiences/${audience.slug}`,
    lastModified: new Date("2026-02-14"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...solutionPages, ...audiencePages, ...blogPages]
}
