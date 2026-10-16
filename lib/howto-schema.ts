import type { HowTo, WithContext } from "schema-dts"
import type { Post } from "@/lib/posts"
import { ORGANIZATION_PUBLISHER } from "@/lib/positioning"
import { slugify } from "@/lib/utils"

const SITE_URL = "https://clinicalsim.ai"

/**
 * The anchor an MDX H2 renders with (see mdx-components.tsx). HowTo step URLs
 * point at it, so both sides go through this one function.
 */
export function headingId(text: string): string {
  return slugify(text)
}

/**
 * HowTo node for a post with `howToSteps`, carrying the same headline, dates,
 * author, and publisher as the post's Article node. totalTime, estimatedCost,
 * supply, and tool are left out because no post states them.
 */
export function buildHowToSchema(
  post: Post,
  author: HowTo["author"]
): WithContext<HowTo> | undefined {
  if (!post.howToSteps || post.howToSteps.length === 0) return undefined

  const url = `${SITE_URL}/insights/${post.slug}`
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.title,
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author,
    publisher: ORGANIZATION_PUBLISHER,
    step: post.howToSteps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      url: `${url}#${headingId(step.name)}`,
    })),
  }
}
