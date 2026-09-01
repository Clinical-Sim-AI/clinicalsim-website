import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import {
  getAllGlossaryTerms,
  getGlossaryTeaser,
  isIndexableGlossaryTerm,
} from "@/lib/glossary"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"

export const metadata: Metadata = {
  title: { absolute: "Medical education glossary: CBME, EPAs, milestones, and more" },
  description:
    "Clear, sourced definitions of the medical education and simulation terms that shape clinical communication training: competency-based medical education, EPAs, ACGME Milestones, OSCEs, standardized patients, and remediation.",
  openGraph: {
    title: "Medical education glossary | ClinicalSim.ai",
    description:
      "Definitions of key medical-education and clinical-simulation terms: CBME, EPAs, Clinical Competency Committees, ACGME Milestones, OSCEs, standardized patients, and more.",
    url: "https://clinicalsim.ai/glossary",
  },
  twitter: {
    title: "Medical education glossary | ClinicalSim.ai",
    description:
      "Definitions of key medical education and clinical simulation terms: CBME, EPAs, Milestones, OSCEs, standardized patients, and remediation.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/glossary",
  },
}

export default function GlossaryPage() {
  const terms = getAllGlossaryTerms()

  const glossaryJsonLd = [
    {
      "@context": "https://schema.org" as const,
      "@type": "WebPage" as const,
      name: "Medical Education Glossary",
      description:
        "Clear, sourced definitions of the medical-education and simulation terms that shape clinical communication training.",
      url: "https://clinicalsim.ai/glossary",
      dateModified: PAGE_DATE_MODIFIED.glossary,
      isPartOf: {
        "@type": "WebSite" as const,
        name: "ClinicalSim.ai",
        url: "https://clinicalsim.ai",
      },
    },
    {
      "@context": "https://schema.org" as const,
      "@type": "BreadcrumbList" as const,
      itemListElement: [
        {
          "@type": "ListItem" as const,
          position: 1,
          name: "Home",
          item: "https://clinicalsim.ai",
        },
        {
          "@type": "ListItem" as const,
          position: 2,
          name: "Glossary",
          item: "https://clinicalsim.ai/glossary",
        },
      ],
    },
    {
      "@context": "https://schema.org" as const,
      "@type": "DefinedTermSet" as const,
      name: "Medical Education Glossary",
      description:
        "Definitions of medical-education and clinical-simulation terms relevant to clinical communication training.",
      url: "https://clinicalsim.ai/glossary",
      // The description has to match what this page shows. Emitting the full
      // definition here would put the term page's most quotable passage back on
      // the hub, which is the duplication the teaser refactor exists to avoid,
      // and Google treats markup richer than the visible page as a violation.
      hasDefinedTerm: terms.map((term) => ({
        "@type": "DefinedTerm" as const,
        name: term.term,
        description: isIndexableGlossaryTerm(term)
          ? getGlossaryTeaser(term)
          : term.definition,
        ...(term.abbreviation ? { termCode: term.abbreviation } : {}),
        url: isIndexableGlossaryTerm(term)
          ? `https://clinicalsim.ai/glossary/${term.slug}`
          : `https://clinicalsim.ai/glossary#${term.slug}`,
      })),
    },
  ]

  return (
    <>
      <JsonLd data={glossaryJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24 bg-cs-dark-blue text-white">
        <Waveform seed="glossary" align="right" opacity={0.17} />
        <div className="max-w-4xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-cs-cloud/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-cloud">Glossary</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            Medical education <span className="text-cs-electric font-medium">glossary</span>
          </h1>
          <p className="text-xl text-cs-cloud font-light leading-relaxed max-w-3xl">
            Plain language definitions of the frameworks, roles, and assessment methods used in clinical communication training. Each sourced term includes related concepts so readers can follow the system around it.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Jump links */}
      <section className="px-6 pt-8 md:pt-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {terms.map((term) =>
              isIndexableGlossaryTerm(term) ? (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="text-sm px-3 py-1.5 rounded-full font-medium border border-cs-gray/50 text-cs-dark-blue/80 hover:border-cs-electric/40 hover:text-cs-dark-blue transition-colors"
                >
                  {term.abbreviation ?? term.term}
                </Link>
              ) : (
                <a
                  key={term.slug}
                  href={`#${term.slug}`}
                  className="text-sm px-3 py-1.5 rounded-full font-medium border border-cs-gray/50 text-cs-dark-blue/80 hover:border-cs-electric/40 hover:text-cs-dark-blue transition-colors"
                >
                  {term.abbreviation ?? term.term}
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* Definition list */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <dl className="space-y-10">
            {terms.map((term) => {
              // Terms with written body copy live at their own URL; the hub shows
              // a teaser so the two pages are not competing duplicates. Terms
              // without body copy stay fully readable here.
              const hasPage = isIndexableGlossaryTerm(term)
              return (
                <div
                  key={term.slug}
                  id={term.slug}
                  className="scroll-mt-24 border-l-4 border-l-cs-electric/40 pl-6"
                >
                  <dt className="text-2xl font-medium text-cs-dark-blue mb-3">
                    {hasPage ? (
                      <Link
                        href={`/glossary/${term.slug}`}
                        className="hover:underline underline-offset-4"
                      >
                        {term.term}
                      </Link>
                    ) : (
                      term.term
                    )}
                  </dt>
                  <dd className="text-base md:text-lg text-cs-dark-blue/85 font-light leading-relaxed">
                    {hasPage ? getGlossaryTeaser(term) : term.definition}
                    {term.source && (
                      <span className="block mt-3 text-sm text-cs-dark-gray font-light">
                        Source:{" "}
                        {term.sourceUrl ? (
                          <a
                            href={term.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cs-dark-blue hover:underline underline-offset-2"
                          >
                            {term.source}
                          </a>
                        ) : (
                          term.source
                        )}
                      </span>
                    )}
                    {hasPage && (
                      <span className="block mt-3 text-sm">
                        <Link
                          href={`/glossary/${term.slug}`}
                          className="font-medium text-cs-dark-blue hover:underline underline-offset-2"
                        >
                          Read the full definition
                        </Link>
                      </span>
                    )}
                    {term.relatedSlugs && term.relatedSlugs.length > 0 && (
                      <span className="block mt-3 text-sm text-cs-dark-blue/70 font-light">
                        Related:{" "}
                        {term.relatedSlugs.map((relSlug, i) => {
                          const rel = terms.find((t) => t.slug === relSlug)
                          if (!rel) return null
                          const label = rel.abbreviation ?? rel.term
                          return (
                            <span key={relSlug}>
                              {i > 0 && ", "}
                              {isIndexableGlossaryTerm(rel) ? (
                                <Link
                                  href={`/glossary/${relSlug}`}
                                  className="text-cs-dark-blue hover:underline underline-offset-2"
                                >
                                  {label}
                                </Link>
                              ) : (
                                <a
                                  href={`#${relSlug}`}
                                  className="text-cs-dark-blue hover:underline underline-offset-2"
                                >
                                  {label}
                                </a>
                              )}
                            </span>
                          )
                        })}
                      </span>
                    )}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <WaveformBand seed="glossary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Put the frameworks into practice
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            ClinicalSim maps voice-based practice to the competency framework that fits the learner&apos;s stage.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-medium transition-all duration-300 bg-cs-electric text-cs-dark-blue hover:bg-cs-electric/90 hover:shadow-lg h-14 px-10 font-bold">
              Request a pilot
            </button>
          </Link>
        </div>
      </WaveformBand>
    </>
  )
}
