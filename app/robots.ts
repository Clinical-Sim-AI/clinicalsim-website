import type { MetadataRoute } from "next"

// AI search/answer crawlers we explicitly allow. A named userAgent rule
// overrides the "*" wildcard entirely, so each rule must repeat the /pricing
// disallow or pricing would leak to these bots.
const AI_SEARCH_BOTS = [
  "OAI-SearchBot", // OpenAI search index (ChatGPT search)
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "PerplexityBot", // Perplexity search index
  "Claude-User", // Claude browsing on a user's behalf
  "Claude-SearchBot", // Anthropic search index
  "ClaudeBot", // Anthropic crawler
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/pricing",
      },
      // Explicitly allow AI search/answer crawlers so a future wildcard change
      // can't silently cut off AI-search visibility.
      ...AI_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/pricing",
      })),
      // GPTBot is OpenAI's training crawler (not search) — kept disallowed as a
      // deliberate IP stance.
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    // Only declare the XML sitemap here. llms.txt is a plain-text index for LLM
    // crawlers, not a sitemap, so listing it caused a sitemap parse error in
    // Search Console.
    sitemap: "https://clinicalsim.ai/sitemap.xml",
    host: "https://clinicalsim.ai",
  }
}
