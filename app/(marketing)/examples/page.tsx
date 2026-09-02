import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AsymmetricGrid } from "@/components/asymmetric-grid"
import { ExampleCard } from "@/components/feedback/example-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { getAllExamples } from "@/lib/examples"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "See it in action: example simulation feedback",
  description:
    "Browse unedited ClinicalSim encounters and open the feedback a learner receives, including the assessment report, recording, and full transcript. No sign-in required.",
  openGraph: {
    title: "See ClinicalSim feedback in action",
    description:
      "Unedited example encounters with the learner feedback report, audio recording, and transcript. No sign-in required.",
    url: "https://clinicalsim.ai/examples",
  },
  twitter: {
    title: "See ClinicalSim feedback in action",
    description:
      "Unedited example encounters with the learner feedback report, recording, and transcript.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/examples",
  },
}

export default function ExamplesPage() {
  const examples = getAllExamples()

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Example simulation feedback",
            description:
              "Unedited ClinicalSim encounters with the learner feedback report, recording, and transcript.",
            url: "https://clinicalsim.ai/examples",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: examples.map((example, index) => ({
                "@type": "ListItem" as const,
                position: index + 1,
                url: `https://clinicalsim.ai/examples/${example.slug}`,
                name: example.title,
              })),
            },
            publisher: {
              "@type": "Organization",
              name: "ClinicalSim",
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
                name: "Examples",
                item: "https://clinicalsim.ai/examples",
              },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24 text-center bg-cs-dark-blue text-white">
        <Waveform seed="examples" align="edges" opacity={0.17} />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            See the feedback for yourself
          </h1>
          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed mb-4 max-w-3xl mx-auto">
            These are unedited encounters from the platform. Open a case to review the assessment report, recording, and full transcript without signing in or booking a demo.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Example cards */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-6xl mx-auto">
          {examples.length > 0 ? (
            <AsymmetricGrid layout="staggered">
              {examples.map((example) => (
                <ExampleCard key={example.slug} example={example} />
              ))}
            </AsymmetricGrid>
          ) : (
            <p className="text-center text-cs-dark-gray">
              Example encounters are coming soon.
            </p>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <WaveformBand seed="examples">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            This is what a learner receives
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Every completed practice session produces a report tied to the frameworks named on the case and the evidence in the transcript.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Start with an assessment
              </Button>
            </Link>
            <Link href="/solutions/remediation">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white bg-transparent hover:bg-white/10"
              >
                Communication remediation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
