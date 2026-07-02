import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { getAllComparisons } from "@/lib/comparisons"

export const metadata: Metadata = {
  title: "Compare Clinical Communication Training Approaches",
  description:
    "Neutral, side-by-side comparisons of clinical communication training approaches — AI clinical simulation vs. standardized patients, and voice-based vs. text-based virtual patient simulation.",
  openGraph: {
    title: "Compare Communication Training Approaches | ClinicalSim.ai",
    description:
      "Side-by-side comparisons of clinical communication training approaches across cost, scalability, realism, and assessment.",
    url: "https://clinicalsim.ai/compare",
  },
  twitter: {
    title: "Compare Communication Training Approaches | ClinicalSim.ai",
    description:
      "Side-by-side comparisons of clinical communication training approaches.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/compare",
  },
}

export default function CompareIndexPage() {
  const comparisons = getAllComparisons()

  const jsonLd = [
    {
      "@context": "https://schema.org" as const,
      "@type": "CollectionPage" as const,
      name: "Compare Clinical Communication Training Approaches",
      description:
        "Neutral, side-by-side comparisons of clinical communication training approaches.",
      url: "https://clinicalsim.ai/compare",
      mainEntity: {
        "@type": "ItemList" as const,
        itemListElement: comparisons.map((c, index) => ({
          "@type": "ListItem" as const,
          position: index + 1,
          url: `https://clinicalsim.ai/compare/${c.slug}`,
          name: c.title,
        })),
      },
      publisher: {
        "@type": "Organization" as const,
        name: "ClinicalSim",
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
          name: "Compare",
          item: "https://clinicalsim.ai/compare",
        },
      ],
    },
  ]

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="relative text-center px-6 pt-20 pb-16 md:pt-28 md:pb-24 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight pb-3 text-white">
            Compare
          </h1>
          <p className="text-xl text-cs-cloud font-light leading-relaxed">
            Neutral, side-by-side comparisons of approaches to{" "}
            <span className="text-cs-electric font-medium">
              clinical communication training
            </span>{" "}
            — so you can see where each one fits.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Comparison cards */}
      <section className="px-6 py-10 md:py-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comparisons.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`}>
                <div className="group h-full bg-white/90 border border-cs-gray/50 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <h2 className="text-xl md:text-2xl font-medium text-cs-dark-blue mb-3 group-hover:text-cs-navy transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                    {c.intro}
                  </p>
                  <div className="flex items-center text-cs-dark-blue text-sm font-medium">
                    Read comparison
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Find the right fit for your program
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Request a pilot and see how ClinicalSim complements the assessment
            tools you already rely on.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-bold transition-all duration-300 bg-cs-electric text-cs-dark-blue hover:bg-cs-electric/90 hover:shadow-lg h-14 px-10">
              Request a Pilot
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
