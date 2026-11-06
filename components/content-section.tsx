import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ArticleTable } from "@/components/article-table"
import { cn } from "@/lib/utils"
import type {
  ContentListItem,
  ContentSection as ContentSectionData,
} from "@/lib/content-sections"

const linkClass = "text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy transition-colors"

function ListItem({ item }: { item: ContentListItem }) {
  if (typeof item === "string") return <li>{item}</li>
  return (
    <li id={item.id} className="scroll-mt-24">
      <span className="font-medium text-cs-dark-blue">{item.title}</span>{" "}
      <span>{item.text}</span>
    </li>
  )
}

function SectionBody({ section }: { section: ContentSectionData }) {
  switch (section.type) {
    case "prose":
      return (
        <div className="space-y-5">
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg text-cs-dark-blue/85 font-light leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )

    case "list": {
      const List = section.ordered ? "ol" : "ul"
      return (
        <List
          className={cn(
            "space-y-3 pl-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed marker:text-cs-navy",
            section.ordered ? "list-decimal" : "list-disc"
          )}
        >
          {section.items.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </List>
      )
    }

    case "table":
      return (
        <ArticleTable
          caption={section.caption ?? section.heading}
          headers={section.columns}
          rows={section.rows}
        />
      )

    case "cards":
      return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.cards.map((card, index) => {
            const body = (
              <>
                <span className="text-lg font-medium text-cs-dark-blue">{card.title}</span>
                <span className="mt-2 text-base font-light leading-relaxed text-cs-dark-blue/80">
                  {card.description}
                </span>
                {card.linkLabel && (
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cs-dark-blue underline underline-offset-4">
                    {card.linkLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </>
            )
            const cardClass = "flex h-full flex-col rounded-xl border border-cs-gray/50 bg-white p-6"
            return (
              <li key={index}>
                {card.href ? (
                  <Link
                    href={card.href}
                    className={cn("group transition-colors hover:border-cs-navy", cardClass)}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={cardClass}>{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      )

    case "report-excerpt":
      return (
        <figure className="my-2">
          <blockquote className="rounded-r-xl border-l-4 border-cs-navy bg-cs-cloud px-6 py-5 text-xl font-light leading-relaxed text-cs-dark-blue">
            <p>&quot;{section.quote}&quot;</p>
          </blockquote>
          <figcaption className="mt-3 text-sm font-light text-cs-dark-blue/75">
            From the example report{" "}
            <Link href={`/examples/${section.source.exampleSlug}`} className={linkClass}>
              {section.source.label}
            </Link>
          </figcaption>
          {section.note && (
            <p className="mt-3 text-base font-light leading-relaxed text-cs-dark-blue/85">
              {section.note}
            </p>
          )}
        </figure>
      )

    case "cases":
      return (
        <>
          <ArticleTable caption={section.heading} headers={section.columns} rows={section.rows} />
          <p className="-mt-2 text-base font-medium">
            <Link href={section.catalogHref} className={cn("inline-flex items-center gap-2", linkClass)}>
              {section.catalogLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </>
      )
  }
}

/**
 * One structured content block on a light surface: anchor, H2, optional intro, the variant's
 * body, then any links. Self-contained (its own section, padding, and width) so standalone
 * pages can drop it in; pass `className` to change the background or spacing.
 */
export function ContentSection({
  section,
  className,
}: {
  section: ContentSectionData
  className?: string
}) {
  return (
    <section id={section.id} className={cn("scroll-mt-24 px-6 py-8 md:py-10 bg-white", className)}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">{section.heading}</h2>
        {section.intro && (
          <p className="text-lg text-cs-dark-blue/70 font-light leading-relaxed mb-6 max-w-3xl">
            {section.intro}
          </p>
        )}
        <SectionBody section={section} />
        {section.links && section.links.length > 0 && (
          <ul className="mt-6 space-y-3">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

/** Renders each section in order; renders nothing for an empty list. */
export function ContentSections({
  sections,
  className,
}: {
  sections: ContentSectionData[] | undefined
  className?: string
}) {
  if (!sections || sections.length === 0) return null
  return (
    <>
      {sections.map((section, index) => (
        <ContentSection key={section.id ?? index} section={section} className={className} />
      ))}
    </>
  )
}
