import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { getAllComparisons, type Comparison } from "@/lib/comparisons"
import { getPostBySlug } from "@/lib/posts"
import { formatIsoMonth } from "@/lib/utils"

interface ComparisonPageLayoutProps {
  comparison: Comparison
}

export function ComparisonPageLayout({ comparison }: ComparisonPageLayoutProps) {
  const relatedPosts = (comparison.relatedPostSlugs ?? [])
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)

  // Comparisons only ever linked back to the /compare hub, so each one carried a
  // single incoming internal link. Linking the siblings fixes that.
  const otherComparisons = getAllComparisons().filter((c) => c.slug !== comparison.slug)

  const faqJsonLd =
    comparison.faqs && comparison.faqs.length > 0
      ? {
          "@context": "https://schema.org" as const,
          "@type": "FAQPage" as const,
          mainEntity: comparison.faqs.map((faq) => ({
            "@type": "Question" as const,
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer" as const,
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: comparison.metaTitle,
            description: comparison.metaDescription,
            url: `https://clinicalsim.ai/compare/${comparison.slug}`,
            ...(comparison.lastUpdated
              ? { dateModified: comparison.lastUpdated }
              : {}),
            isPartOf: {
              "@type": "WebSite",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://clinicalsim.ai",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Compare",
                item: "https://clinicalsim.ai/compare",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: comparison.title,
                item: `https://clinicalsim.ai/compare/${comparison.slug}`,
              },
            ],
          },
          ...(faqJsonLd ? [faqJsonLd] : []),
        ]}
      />

      {/* Hero + answer-first intro */}
      <section className="relative overflow-hidden px-6 py-12 md:py-16 bg-cs-dark-blue text-white">
        <Waveform seed={comparison.slug} align="right" opacity={0.15} />
        <div className="max-w-4xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-cs-cloud/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/compare"
              className="hover:text-white transition-colors"
            >
              Compare
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{comparison.title}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-balance mb-6 text-white">
            {comparison.heroHeadline}
          </h1>

          {comparison.lastUpdated && (
            <p className="text-sm text-cs-cloud/60 font-light mb-4">
              Last updated:{" "}
              {formatIsoMonth(comparison.lastUpdated)}
            </p>
          )}

          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed max-w-3xl">
            {comparison.intro}
          </p>
        </div>
      </section>

      <SectionDivider
        variant="diagonal-down"
        color="white"
        className="bg-cs-dark-blue"
      />

      {/* Comparison table with real <table> markup for AI Overviews / Perplexity */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-cs-navy mb-8">
            Side-by-side <span className="text-cs-dark-blue font-medium">comparison</span>
          </h2>

          <div className="overflow-x-auto rounded-xl border border-cs-gray/50">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                {comparison.optionALabel} compared with {comparison.optionBLabel}
              </caption>
              <thead>
                <tr className="bg-cs-navy text-white">
                  <th scope="col" className="px-4 py-4 text-sm font-medium align-bottom">
                    Dimension
                  </th>
                  <th scope="col" className="px-4 py-4 text-sm font-medium align-bottom">
                    {comparison.optionALabel}
                  </th>
                  <th scope="col" className="px-4 py-4 text-sm font-medium align-bottom">
                    {comparison.optionBLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, index) => (
                  <tr
                    key={row.dimension}
                    className={index % 2 === 0 ? "bg-white" : "bg-cs-cloud/40"}
                  >
                    <th
                      scope="row"
                      className="px-4 py-4 text-sm font-medium text-cs-dark-blue align-top border-t border-cs-gray/40 whitespace-nowrap"
                    >
                      {row.dimension}
                    </th>
                    <td className="px-4 py-4 text-sm text-cs-dark-blue/85 font-light align-top border-t border-cs-gray/40">
                      {row.optionA}
                    </td>
                    <td className="px-4 py-4 text-sm text-cs-dark-blue/85 font-light align-top border-t border-cs-gray/40">
                      {row.optionB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {comparison.faqs && comparison.faqs.length > 0 && (
        <>
          <SectionDivider variant="wave" color="white" />
          <section className="px-6 py-8 md:py-10 bg-cs-cloud">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {comparison.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-cs-gray/50 rounded-xl overflow-hidden bg-white"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-medium text-cs-dark-blue pr-4">
                          {faq.question}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-cs-gray flex-shrink-0 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-6 pb-5 pt-2">
                        <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Related insights */}
      {relatedPosts.length > 0 && (
        <>
          <SectionDivider variant="diagonal-up" color="white" />
          <section className="px-6 py-8 md:py-10 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light text-cs-dark-blue mb-8">
                Related insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post!.slug}
                    href={`/insights/${post!.slug}`}
                    className="group block bg-white/70 rounded-xl p-6 border border-cs-gray/50 hover:border-cs-electric/30 transition-all duration-300"
                  >
                    <h3 className="text-lg font-medium text-cs-dark-blue group-hover:text-cs-navy transition-colors mb-2">
                      {post!.title}
                    </h3>
                    <p className="text-sm text-cs-dark-blue/70 font-light line-clamp-2">
                      {post!.description}
                    </p>
                    <div className="mt-3 flex items-center text-cs-dark-blue text-sm font-medium">
                      Read more
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Other comparisons */}
      {otherComparisons.length > 0 && (
        <section className="px-6 py-8 md:py-10 bg-cs-cloud/40 border-t border-cs-gray">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-cs-dark-blue mb-8">
              Other comparisons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherComparisons.map((other) => (
                <Link
                  key={other.slug}
                  href={`/compare/${other.slug}`}
                  className="group block bg-white rounded-xl p-6 border border-cs-gray/50 hover:border-cs-electric/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-medium text-cs-dark-blue group-hover:text-cs-navy transition-colors mb-2">
                    {other.metaTitle}
                  </h3>
                  <div className="mt-3 flex items-center text-cs-dark-blue text-sm font-medium">
                    Read the comparison
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <WaveformBand seed={comparison.slug}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            See ClinicalSim in your program
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Start with an assessment and see how on-demand, rubric-scored practice fits
            alongside the assessment tools you already use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Start with an assessment
              </Button>
            </Link>
            <Link href="/compare">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All comparisons
              </Button>
            </Link>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
