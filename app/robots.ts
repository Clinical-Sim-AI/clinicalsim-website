import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/pricing",
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: [
      "https://clinicalsim.ai/sitemap.xml",
      "https://clinicalsim.ai/llms.txt",
    ],
    host: "https://clinicalsim.ai",
  }
}
