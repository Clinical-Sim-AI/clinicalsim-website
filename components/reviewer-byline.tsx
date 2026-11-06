import { resolveReviewer } from "@/lib/review-schema"
import { cn, formatIsoDay } from "@/lib/utils"

type ReviewerBylineProps = {
  /** ISO date of the review. */
  date?: string
  /** "dark" for Dark Blue or Navy surfaces such as a page hero. */
  tone?: "light" | "dark"
  className?: string
} & (
  /** A registry author from lib/authors.ts. Unknown, team, or uncredentialed ids render nothing. */
  | { authorId: string; name?: never }
  /** A reviewer given as display text, as insight posts do with `Post.reviewedBy`. */
  | { name: string; authorId?: never }
)

const tones = {
  light: { line: "text-cs-dark-gray", name: "text-cs-dark-blue/85", title: "text-cs-dark-gray" },
  dark: { line: "text-cs-cloud/60", name: "text-white", title: "text-cs-cloud/60" },
}

/**
 * "Medically reviewed by <name> · <date>". The person is never linked: the /about team section
 * is unpublished (TEAM_SECTION_PUBLISHED in lib/authors.ts), so there is no page to link to.
 */
export function ReviewerByline(props: ReviewerBylineProps) {
  const { date, tone = "light", className } = props
  let displayName: string
  let title: string | undefined

  if (props.authorId !== undefined) {
    const reviewer = resolveReviewer(props.authorId)
    if (!reviewer) return null
    displayName = `${reviewer.name}, ${reviewer.credentials}`
    title = reviewer.title
  } else {
    displayName = props.name
  }

  const colors = tones[tone]

  return (
    <p className={cn("mt-3 text-sm", colors.line, "font-light", className)}>
      Medically reviewed by{" "}
      <span className={cn(colors.name, "font-medium")}>{displayName}</span>
      {title && <span className={colors.title}>, {title}</span>}
      {date && (
        <>
          {" · "}
          <time dateTime={date}>{formatIsoDay(date)}</time>
        </>
      )}
    </p>
  )
}
