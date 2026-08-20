import Link from "next/link"
import {
  getGlossaryTermBySlug,
  isIndexableGlossaryTerm,
} from "@/lib/glossary"

interface GlossaryTermLinksProps {
  /** Registry slugs from a solution or audience entry. */
  slugs?: string[]
  /** Cloud sections need a white card; white sections do not. */
  surface?: "white" | "cloud"
}

/**
 * Contextual links from a commercial page into the glossary.
 *
 * Every term page carries at least one link back out to a solution or audience
 * page, but nothing pointed the other way, so the only inbound path to the 46
 * term pages was the /glossary hub. Authority that reaches a solution page
 * stopped there. These links give each term a second inbound route from a page
 * that has some.
 *
 * Hub-only terms are dropped rather than linked to their anchor, because an
 * anchor link is the hub link again.
 */
export function GlossaryTermLinks({
  slugs,
  surface = "white",
}: GlossaryTermLinksProps) {
  const terms = (slugs ?? [])
    .map((slug) => getGlossaryTermBySlug(slug))
    .filter((term) => term && isIndexableGlossaryTerm(term))

  if (terms.length === 0) return null

  return (
    <section
      className={
        surface === "cloud" ? "px-6 py-8 bg-cs-cloud" : "px-6 py-8 bg-white"
      }
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-cs-dark-gray mb-4">
          Key terms
        </h2>
        <div className="flex flex-wrap gap-2">
          {terms.map((term) => (
            <Link
              key={term!.slug}
              href={`/glossary/${term!.slug}`}
              className="text-sm px-3 py-1.5 rounded-full font-medium border border-cs-gray/50 text-cs-dark-blue/80 hover:border-cs-navy/50 hover:text-cs-dark-blue transition-colors"
            >
              {term!.abbreviation ?? term!.term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
