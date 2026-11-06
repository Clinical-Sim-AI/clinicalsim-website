import type { HowTo, WithContext } from "schema-dts"
import type { Post } from "@/lib/posts"
import { ORGANIZATION_PUBLISHER } from "@/lib/positioning"
import { slugify } from "@/lib/utils"

const SITE_URL = "https://clinicalsim.ai"

/**
 * The anchor an MDX H2 renders with (see mdx-components.tsx), and the id a
 * solution page's HowTo list item renders with. HowTo step URLs point at it,
 * so both sides go through this one function.
 */
export function headingId(text: string): string {
  return slugify(text)
}

export interface HowToStepInput {
  name: string
  text: string
}

export interface HowToInput {
  name: string
  /** Absolute page URL. Each step's URL is this plus `#headingId(step.name)`. */
  url: string
  steps: HowToStepInput[]
  description?: string
}

/**
 * HowTo node for any page that shows a visible sequence of steps. The page must
 * render each step's name and text verbatim and give each step the anchor
 * `headingId(step.name)`. Returns undefined when there are no steps.
 *
 * The post signature `(post, author)` is kept for insight posts: it adds the
 * post's headline, dates, author, and publisher. totalTime, estimatedCost,
 * supply, and tool are left out because no page states them.
 */
export function buildHowToSchema(input: HowToInput): WithContext<HowTo> | undefined
export function buildHowToSchema(post: Post, author: HowTo["author"]): WithContext<HowTo> | undefined
export function buildHowToSchema(
  input: HowToInput | Post,
  author?: HowTo["author"]
): WithContext<HowTo> | undefined {
  if (!("steps" in input)) return buildPostHowToSchema(input, author)

  const { name, url, steps, description } = input
  if (steps.length === 0) return undefined

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    ...(description ? { description } : {}),
    url,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      url: `${url}#${headingId(step.name)}`,
    })),
  }
}

/** HowTo node for a post with `howToSteps`, carrying the same headline, dates, author, and publisher as its Article node. */
function buildPostHowToSchema(
  post: Post,
  author: HowTo["author"]
): WithContext<HowTo> | undefined {
  const base = buildHowToSchema({
    name: post.title,
    url: `${SITE_URL}/insights/${post.slug}`,
    steps: post.howToSteps ?? [],
    description: post.description,
  })
  if (!base) return undefined

  return {
    ...base,
    headline: post.title,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author,
    publisher: ORGANIZATION_PUBLISHER,
  }
}
