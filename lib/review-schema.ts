import { getAuthorById, TEAM_AUTHOR_ID } from "@/lib/authors"
import type { Citation } from "@/lib/types"

/** A clinical review of a page by a named person in lib/authors.ts. */
export interface PageReview {
  /** An id from lib/authors.ts. An unknown id renders no byline and no schema. */
  authorId: string
  /** ISO date of the review, e.g. "2026-11-01". */
  date: string
}

export interface ResolvedReviewer {
  name: string
  credentials: string
  title: string
}

/**
 * The reviewer as the byline and schema show them, or undefined when the id is unknown, is the
 * team fallback, or names someone with no clinical credentials. "Medically reviewed by" is a
 * claim about a clinician, so a non-clinician id renders nothing rather than that claim.
 */
export function resolveReviewer(authorId: string): ResolvedReviewer | undefined {
  if (authorId === TEAM_AUTHOR_ID) return undefined
  const author = getAuthorById(authorId)
  if (!author?.credentials) return undefined
  return { name: author.name, credentials: author.credentials, title: author.title }
}

/** Absolute URL for a citation: its DOI when it has one, else its url. */
export function citationUrl(citation: Citation): string | undefined {
  return citation.doi ? `https://doi.org/${citation.doi}` : citation.url
}

/**
 * Fields to spread into a WebPage JSON-LD node: `reviewedBy` and `lastReviewed` when a known
 * clinician reviewed the page, and `citation` when it cites sources. The Person carries name
 * and jobTitle only. While TEAM_SECTION_PUBLISHED is false no person has a URL on the site, so
 * there is no `@id` or `url` to give (see lib/authors.ts).
 */
export function buildWebPageReviewFields(
  reviewedBy: PageReview | undefined,
  citations: Citation[] | undefined
) {
  const reviewer = reviewedBy ? resolveReviewer(reviewedBy.authorId) : undefined
  return {
    ...(reviewer && reviewedBy
      ? {
          reviewedBy: {
            "@type": "Person" as const,
            name: reviewer.name,
            jobTitle: reviewer.title,
          },
          lastReviewed: reviewedBy.date,
        }
      : {}),
    ...(citations && citations.length > 0
      ? {
          citation: citations.map((citation) => {
            const url = citationUrl(citation)
            return {
              "@type": citation.doi ? ("ScholarlyArticle" as const) : ("CreativeWork" as const),
              name: citation.title,
              ...(url ? { url } : {}),
            }
          }),
        }
      : {}),
  }
}
