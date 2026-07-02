import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AsymmetricGrid } from "@/components/asymmetric-grid"
import { ExampleCard } from "@/components/feedback/example-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { getAllExamples } from "@/lib/examples"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "See It In Action: Example Simulation Feedback",
  description:
    "Browse real ClinicalSim encounters and open the exact feedback a learner receives — the milestone-aligned assessment report, the recording, and the full transcript. No sign-in required.",
  openGraph: {
    title: "See ClinicalSim Feedback In Action",
    description:
      "Real example encounters with the exact learner feedback report, audio recording, and transcript — no sign-in required.",
    url: "https://clinicalsim.ai/examples",
  },
  twitter: {
    title: "See ClinicalSim Feedback In Action",
    description:
      "Real example encounters with the exact learner feedback report, recording, and transcript.",
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
            name: "Example Simulation Feedback",
            description:
              "Real ClinicalSim encounters with the exact learner feedback report, recording, and transcript.",
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
      <section className="relative px-6 py-16 md:py-24 text-center bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-loose pb-3 mb-6 md:mb-8 text-white">
            See the feedback for yourself
          </h1>
          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed mb-4 max-w-3xl mx-auto">
            These are real encounters from the platform.{" "}
            <span className="text-cs-electric font-medium">
              Open one and see exactly what a learner sees
            </span>{" "}
            — the assessment report, the recording, and the full transcript.
          </p>
          <p className="text-base md:text-lg text-cs-cloud/80 font-light max-w-2xl mx-auto">
            No sign-in, no demo call. Just the same feedback page, mapped to
            communication frameworks and ACGME milestones.
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
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            This is what your learners would get
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Every practice session generates feedback like this — on demand,
            mapped to the milestones your CCC already uses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="/solutions/remediation">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white bg-transparent hover:bg-white/10"
              >
                Communication Remediation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
