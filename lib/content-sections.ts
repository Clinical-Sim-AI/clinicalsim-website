/**
 * Structured page content: typed blocks that render through components/content-section.tsx.
 *
 * Used by registry solutions (`Solution.sections`) and by standalone pages such as
 * /health-systems and /nursing. Strings are plain text. There is no inline link syntax
 * anywhere on the site, so a section that needs links lists them in `links`, which render
 * below the section's content (the same pattern as `Solution.context.links`).
 */

export interface ContentSectionLink {
  label: string
  href: string
}

interface ContentSectionBase {
  /** Anchor id for the section, so other pages can link to `#id`. */
  id?: string
  /** Rendered as the section's H2. */
  heading: string
  /** One short paragraph under the heading. */
  intro?: string
  /** Descriptive links rendered after the section's content. */
  links?: ContentSectionLink[]
}

/**
 * A list item is either plain text, or a titled item whose title renders in medium weight
 * ahead of its text. Titled items carry an optional anchor id; HowTo steps use it so each
 * step's schema URL resolves to its own list item.
 */
export type ContentListItem = string | { title: string; text: string; id?: string }

export interface ProseSection extends ContentSectionBase {
  type: "prose"
  paragraphs: string[]
}

export interface ListSection extends ContentSectionBase {
  type: "list"
  /** True renders a visible numbered list. HowTo steps render through this variant. */
  ordered: boolean
  items: ContentListItem[]
}

export interface TableSection extends ContentSectionBase {
  type: "table"
  columns: string[]
  /** First cell of each row renders as the row header. */
  rows: string[][]
  /** Defaults to the heading. Also the table's accessible name. */
  caption?: string
}

export interface CardsSection extends ContentSectionBase {
  type: "cards"
  cards: { title: string; description: string; href?: string; linkLabel?: string }[]
}

/**
 * A line quoted from a real feedback report on /examples. lib/content-sections.test.ts fails
 * when the example does not exist or does not contain the quote word for word.
 */
export interface ReportExcerptSection extends ContentSectionBase {
  type: "report-excerpt"
  quote: string
  /** Links to `/examples/<exampleSlug>`, labelled with `label`. */
  source: { exampleSlug: string; label: string }
  note?: string
}

/** Simulation case titles printed as plain text in a table, with one link to the catalog below it. */
export interface CasesSection extends ContentSectionBase {
  type: "cases"
  columns: string[]
  rows: string[][]
  catalogHref: string
  catalogLabel: string
}

export type ContentSection =
  | ProseSection
  | ListSection
  | TableSection
  | CardsSection
  | ReportExcerptSection
  | CasesSection
