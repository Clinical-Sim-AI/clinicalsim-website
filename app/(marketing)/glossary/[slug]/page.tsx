import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import {
  getGlossaryPageTitle,
  getGlossaryTermBySlug,
  getIndexableGlossaryTerms,
  getRelatedGlossaryTerms,
  isIndexableGlossaryTerm,
} from "@/lib/glossary"

type Props = { params: Promise<{ slug: string }> }

const BASE_URL = "https://clinicalsim.ai"

export function generateStaticParams() {
  return getIndexableGlossaryTerms().map((term) => ({ slug: term.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const term = getGlossaryTermBySlug(slug)
  if (!term || !isIndexableGlossaryTerm(term)) return {}

  const title = getGlossaryPageTitle(term)
  const description = term.metaDescription
  const url = `${BASE_URL}/glossary/${term.slug}`

  return {
    title,
    description,
    openGraph: {
      title: `${term.term} | ClinicalSim.ai glossary`,
      description,
      url,
    },
    twitter: { title: `${term.term} | ClinicalSim.ai glossary`, description },
    alternates: { canonical: url },
  }
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params
  const term = getGlossaryTermBySlug(slug)
  if (!term) notFound()

  // In the registry but without written body copy: send the reader to the hub
  // entry, which still carries the full definition, rather than publishing a
  // thin page. dynamicParams stays at its default so this path is reachable.
  if (!isIndexableGlossaryTerm(term)) redirect(`/glossary#${term.slug}`)

  const related = getRelatedGlossaryTerms(term.slug)
  const url = `${BASE_URL}/glossary/${term.slug}`

  // FAQPage is what earns the People Also Ask placements, so it only goes on
  // pages that actually carry a Q/A block. Answer text is the visible answer
  // verbatim, matching the solution, comparison, and audience layouts.
  const faqJsonLd =
    term.faqs && term.faqs.length > 0
      ? {
          "@context": "https://schema.org" as const,
          "@type": "FAQPage" as const,
          mainEntity: term.faqs.map((faq) => ({
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
            name: getGlossaryPageTitle(term),
            description: term.metaDescription,
            url,
            dateModified: term.lastUpdated,
            isPartOf: {
              "@type": "WebSite",
              name: "ClinicalSim.ai",
              url: BASE_URL,
            },
            mainEntity: {
              "@type": "DefinedTerm",
              name: term.term,
              description: term.definition,
              ...(term.abbreviation ? { termCode: term.abbreviation } : {}),
              url,
              inDefinedTermSet: `${BASE_URL}/glossary`,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
              {
                "@type": "ListItem",
                position: 2,
                name: "Glossary",
                item: `${BASE_URL}/glossary`,
              },
              {
                "@type": "ListItem",
                position: 3,
                // Matches the visible trail below, which shows the abbreviation.
                name: term.abbreviation ?? term.term,
                item: url,
              },
            ],
          },
          ...(faqJsonLd ? [faqJsonLd] : []),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-14 md:py-20 bg-cs-dark-blue text-white">
        <Waveform seed={term.slug} align="right" opacity={0.17} />
        <div className="max-w-3xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-cs-cloud/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/glossary" className="hover:text-white transition-colors">
              Glossary
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-cloud">
              {term.abbreviation ?? term.term}
            </span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-balance mb-6 text-white">
            {term.term}
          </h1>
          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed">
            {term.definition}
          </p>
          {term.source && (
            <p className="mt-5 text-sm text-cs-cloud/70 font-light">
              Source:{" "}
              {term.sourceUrl ? (
                <a
                  href={term.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cs-electric hover:underline underline-offset-2"
                >
                  {term.source}
                </a>
              ) : (
                term.source
              )}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5">
            {term.explainer.map((paragraph, i) => (
              <p
                key={i}
                className="text-base md:text-lg text-cs-dark-blue/85 font-light leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {term.inPractice && term.inPractice.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl md:text-2xl font-medium text-cs-dark-blue mb-5">
                What this looks like in a program
              </h2>
              <ul className="space-y-3">
                {term.inPractice.map((item, i) => (
                  <li
                    key={i}
                    className="pl-5 border-l-2 border-l-cs-navy/30 text-base text-cs-dark-blue/85 font-light leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {term.faqs && term.faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl md:text-2xl font-medium text-cs-dark-blue mb-6">
                Common questions
              </h2>
              <div className="space-y-7">
                {term.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-base md:text-lg font-medium text-cs-navy mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-cs-gray/60">
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-cs-dark-gray mb-4">
                Related terms
              </h2>
              <div className="flex flex-wrap gap-2">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={
                      isIndexableGlossaryTerm(rel)
                        ? `/glossary/${rel.slug}`
                        : `/glossary#${rel.slug}`
                    }
                    className="text-sm px-3 py-1.5 rounded-full font-medium border border-cs-gray/50 text-cs-dark-blue/80 hover:border-cs-navy/50 hover:text-cs-dark-blue transition-colors"
                  >
                    {rel.abbreviation ?? rel.term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {term.relatedLinks && term.relatedLinks.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-cs-dark-gray mb-4">
                Read next
              </h2>
              <ul className="space-y-2">
                {term.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-cs-dark-blue font-light hover:underline underline-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-12 text-sm text-cs-dark-gray font-light">
            Last updated{" "}
            {new Date(term.lastUpdated).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </p>
        </div>
      </section>

      {/* CTA */}
      <WaveformBand seed={term.slug}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-6">
            Put the frameworks into practice
          </h2>
          <p className="text-lg font-light mb-8 text-white/90">
            ClinicalSim maps voice-based practice to the competency framework that
            fits the learner&apos;s stage.
          </p>
          <Link href="/contact">
            <Button variant="accent" size="xl">
              Request a pilot
            </Button>
          </Link>
        </div>
      </WaveformBand>
    </>
  )
}
