import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { getHelpArticleBySlug } from "@/lib/help-articles"
import { formatIsoDay } from "@/lib/utils"

const SITE_URL = "https://clinicalsim.ai"

export function HelpArticleLayout({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const article = getHelpArticleBySlug(slug)
  // An MDX page names its slug twice, here and in getHelpArticleMetadata, with
  // nothing keeping the two in sync. Rendering nothing would ship a live 200
  // with no title, canonical, or schema; 404 makes the typo visible instead.
  if (!article) notFound()

  const url = `${SITE_URL}/help/${article.slug}`

  return (
    <section className="px-6 py-12 md:py-20">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: article.title,
            description: article.description,
            url,
            dateModified: article.lastUpdated,
            // Bare reference to the WebSite node defined once in the marketing
            // layout; embedding its props here would just be a second copy to
            // keep in sync.
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Help",
                item: `${SITE_URL}/help`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: url,
              },
            ],
          },
        ]}
      />

      <article className="max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-cs-dark-gray mb-8">
          <Link href="/" className="hover:text-cs-dark-blue/85 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href="/help"
            className="hover:text-cs-dark-blue/85 transition-colors"
          >
            Help
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-cs-dark-blue/85">{article.title}</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-light text-cs-dark-blue mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-cs-dark-blue/70 font-light leading-relaxed mb-4">
            {article.description}
          </p>
          <p className="text-sm text-cs-dark-gray font-light">
            Last updated{" "}
            <time dateTime={article.lastUpdated}>
              {formatIsoDay(article.lastUpdated)}
            </time>
          </p>
        </div>

        <div className="border-t border-cs-gray/50 pt-8">{children}</div>

        <div className="mt-12 border-t border-cs-gray/50 pt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href="/help"
            className="inline-flex items-center gap-2 text-sm text-cs-dark-gray hover:text-cs-dark-blue font-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to the help center
          </Link>
          <div className="sm:ml-auto">
            <Link href="/contact">
              <Button variant="secondary">Ask us a question</Button>
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}
