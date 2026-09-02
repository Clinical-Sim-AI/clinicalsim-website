import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { getAllComparisons } from "@/lib/comparisons"

export const metadata: Metadata = {
  title: "Compare clinical communication training approaches",
  description:
    "Practical comparisons of clinical communication training approaches, including AI clinical simulation vs. standardized patients and voice-based vs. text-based AI patient simulation.",
  openGraph: {
    title: "Compare communication training approaches | ClinicalSim.ai",
    description:
      "Side-by-side comparisons of clinical communication training approaches across cost, scalability, realism, and assessment.",
    url: "https://clinicalsim.ai/compare",
  },
  twitter: {
    title: "Compare communication training approaches | ClinicalSim.ai",
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
        "Practical comparisons of clinical communication training approaches.",
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
      <section className="relative overflow-hidden text-center px-6 pt-20 pb-16 md:pt-28 md:pb-24 bg-cs-dark-blue text-white">
        <Waveform seed="compare" align="edges" opacity={0.17} />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight leading-[1.08] text-balance text-white">
            Compare communication training methods
          </h1>
          <p className="text-xl text-cs-cloud font-light leading-relaxed">
            Practical comparisons of what each method can assess, what it requires to run, and where it fits in a communication curriculum.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Comparison cards */}
      <section className="px-6 py-8 md:py-10 bg-white">
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
      <WaveformBand seed="compare">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Choose the method by the job
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Tell us whether you need practice, coaching, or a high-stakes assessment. We will show you where ClinicalSim fits and where it does not.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-bold transition-all duration-300 bg-cs-electric text-cs-dark-blue hover:bg-cs-electric/90 hover:shadow-lg h-14 px-10">
              Start with an assessment
            </button>
          </Link>
        </div>
      </WaveformBand>
    </>
  )
}
