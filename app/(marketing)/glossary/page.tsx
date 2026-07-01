import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { getAllGlossaryTerms } from "@/lib/glossary"

export const metadata: Metadata = {
  title: "Medical Education Glossary: CBME, EPAs, Milestones & More",
  description:
    "Clear, sourced definitions of the medical-education and simulation terms that shape clinical communication training — competency-based medical education, EPAs, ACGME Milestones, OSCEs, standardized patients, and remediation.",
  openGraph: {
    title: "Medical Education Glossary | ClinicalSim.ai",
    description:
      "Definitions of key medical-education and clinical-simulation terms: CBME, EPAs, Clinical Competency Committees, ACGME Milestones, OSCEs, standardized patients, and more.",
    url: "https://clinicalsim.ai/glossary",
  },
  twitter: {
    title: "Medical Education Glossary | ClinicalSim.ai",
    description:
      "Definitions of key medical-education and clinical-simulation terms — CBME, EPAs, Milestones, OSCEs, standardized patients, remediation.",
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
      hasDefinedTerm: terms.map((term) => ({
        "@type": "DefinedTerm" as const,
        name: term.term,
        description: term.definition,
        ...(term.abbreviation ? { termCode: term.abbreviation } : {}),
        url: `https://clinicalsim.ai/glossary#${term.slug}`,
      })),
    },
  ]

  return (
    <>
      <JsonLd data={glossaryJsonLd} />

      {/* Hero */}
      <section className="relative px-6 py-16 md:py-24 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-cs-cloud/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-cloud">Glossary</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-light leading-tight pb-3 mb-6 text-white">
            Medical Education{" "}
            <span className="text-cs-electric font-medium">Glossary</span>
          </h1>
          <p className="text-xl text-cs-cloud font-light leading-relaxed max-w-3xl">
            Clear, self-contained definitions of the terms that shape
            competency-based medical education, clinical simulation, and
            communication training — from EPAs and ACGME Milestones to
            standardized patients and remediation.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Jump links */}
      <section className="px-6 pt-12 md:pt-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {terms.map((term) => (
              <a
                key={term.slug}
                href={`#${term.slug}`}
                className="text-sm px-3 py-1.5 rounded-full font-medium border border-cs-gray/50 text-cs-dark-blue/80 hover:border-cs-electric/40 hover:text-cs-dark-blue transition-colors"
              >
                {term.abbreviation ?? term.term}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Definition list */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <dl className="space-y-10">
            {terms.map((term) => (
              <div
                key={term.slug}
                id={term.slug}
                className="scroll-mt-24 border-l-4 border-l-cs-electric/40 pl-6"
              >
                <dt className="text-2xl font-medium text-cs-dark-blue mb-3">
                  {term.term}
                </dt>
                <dd className="text-base md:text-lg text-cs-dark-blue/85 font-light leading-relaxed">
                  {term.definition}
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
                  {term.relatedSlugs && term.relatedSlugs.length > 0 && (
                    <span className="block mt-3 text-sm text-cs-dark-blue/70 font-light">
                      Related:{" "}
                      {term.relatedSlugs.map((relSlug, i) => {
                        const rel = terms.find((t) => t.slug === relSlug)
                        if (!rel) return null
                        return (
                          <span key={relSlug}>
                            {i > 0 && ", "}
                            <a
                              href={`#${relSlug}`}
                              className="text-cs-dark-blue hover:underline underline-offset-2"
                            >
                              {rel.abbreviation ?? rel.term}
                            </a>
                          </span>
                        )
                      })}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Put these concepts into practice
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            ClinicalSim turns competency frameworks into on-demand, rubric-scored
            communication practice mapped to ACGME Milestones 2.0.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-medium transition-all duration-300 bg-cs-electric text-cs-dark-blue hover:bg-cs-electric/90 hover:shadow-lg h-14 px-10 font-bold">
              Request a Pilot
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
