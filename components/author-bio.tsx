import Link from "next/link"
import { getAuthorById, TEAM_AUTHOR_ID } from "@/lib/authors"
import { variantClasses, getInitials } from "@/components/author-byline"

/**
 * Renders the author's credentials and bio below an article, matching the
 * `description` and `url` carried by the post's Person JSON-LD. Returns null for
 * the team fallback: a generic block under a team-bylined post adds no E-E-A-T
 * signal and reads as filler.
 */
export function AuthorBio({ authorId }: { authorId?: string }) {
  const author = authorId ? getAuthorById(authorId) : undefined

  if (!author || author.id === TEAM_AUTHOR_ID) return null

  return (
    <aside className="mt-14 pt-8 border-t border-cs-gray/50">
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-base font-medium ${variantClasses[author.colorVariant]}`}
          aria-hidden="true"
        >
          {getInitials(author.name)}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-cs-dark-gray mb-2">
            About the author
          </p>
          <p className="text-base font-medium text-cs-dark-blue">
            {author.name}
            {author.credentials ? `, ${author.credentials}` : ""}
          </p>
          <p className="text-sm text-cs-dark-gray font-light">{author.title}</p>
          <p className="mt-3 text-sm text-cs-dark-blue/75 font-light leading-relaxed">
            {author.bio}
          </p>
          <Link
            href={`/about#${author.id}`}
            className="mt-4 inline-block text-sm font-medium text-cs-dark-blue underline underline-offset-4 decoration-cs-gray hover:decoration-cs-dark-blue transition-colors"
          >
            More about the team
          </Link>
        </div>
      </div>
    </aside>
  )
}
