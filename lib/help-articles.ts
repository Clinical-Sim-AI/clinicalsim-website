export interface HelpArticle {
  /** URL path segment: "roles-and-permissions" -> /help/roles-and-permissions */
  slug: string
  /**
   * Bare title with no " | ClinicalSim.ai" suffix. getHelpArticleMetadata emits
   * it as `title: { absolute }`, so this string is the whole rendered <title>.
   * It is also the visible H1 in HelpArticleLayout, which makes shortening one
   * an editorial change rather than a metadata change.
   */
  title: string
  /** Meta description. */
  description: string
  /** One or two sentences of hub list copy on /help. */
  teaser: string
  /**
   * ISO day of the last material content change. Drives the sitemap entry, the
   * WebPage dateModified, and the visible "Last updated" line, so move it only
   * when the article itself changes.
   */
  lastUpdated: string
}

const helpArticles: HelpArticle[] = [
  {
    slug: "roles-and-permissions",
    title: "Roles and permissions in ClinicalSim",
    description:
      "What Member, Project Manager, Admin, and Owner can each do in ClinicalSim, whose results they can see, and how to pick the right role for someone in your program.",
    teaser:
      "Every person in your organization holds one role, and the role decides what they can change and whose results they can see. Covers Member, Project Manager, Admin, and Owner, with a table of what each one can do.",
    lastUpdated: "2026-08-29",
  },
]

export function getAllHelpArticles(): HelpArticle[] {
  return helpArticles
}

export function getHelpArticleBySlug(slug: string): HelpArticle | undefined {
  return helpArticles.find((article) => article.slug === slug)
}

const SITE_URL = "https://clinicalsim.ai"

/**
 * Build the full Metadata object for a help article from its slug, so MDX pages
 * don't hand-maintain (and drift on) their own metadata. Mirrors getPostMetadata
 * in lib/posts.ts, including the `title: { absolute }` that stops the root layout
 * template ("%s | ClinicalSim.ai") appending a second brand suffix.
 */
export function getHelpArticleMetadata(slug: string) {
  const article = getHelpArticleBySlug(slug)
  if (!article) return {}

  const url = `${SITE_URL}/help/${article.slug}`
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article" as const,
      title: article.title,
      description: article.description,
      url,
    },
    twitter: {
      title: article.title,
      description: article.description,
    },
  }
}

/**
 * Baseline date for the /help hub itself, moved when the hub page changes for
 * reasons other than its guide list.
 */
const HELP_HUB_BASE_DATE = "2026-08-28"

/**
 * The /help hub lists every guide, so publishing or revising one changes the
 * hub. Taking the newest article date keeps the sitemap honest without a manual
 * bump each time a guide lands.
 */
export function getHelpHubLastUpdated(): string {
  return helpArticles.reduce(
    (newest, article) =>
      article.lastUpdated > newest ? article.lastUpdated : newest,
    HELP_HUB_BASE_DATE
  )
}
