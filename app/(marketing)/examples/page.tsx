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
import { ClinicianTestimonials } from "@/components/clinician-testimonials"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { DemoVideoSection } from "@/components/demo-video-section"
import { VideoObjectSchema } from "@/components/video-object-schema"
import { ORGANIZATION } from "@/lib/positioning"

const DEMO_VIDEO = {
  embedUrl: "https://www.youtube.com/embed/ZkA0slljnwI",
  thumbnailUrl: "https://i.ytimg.com/vi/ZkA0slljnwI/maxresdefault.jpg",
  uploadDate: "2026-09-10T10:00:26-07:00",
  duration: "PT9M21S",
}

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
            dateModified: PAGE_DATE_MODIFIED.examples,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: examples.map((example, index) => ({
                "@type": "ListItem" as const,
                position: index + 1,
                url: `https://clinicalsim.ai/examples/${example.slug}`,
                name: example.title,
              })),
            },
            publisher: ORGANIZATION,
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

      <section className="bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-cs-dark-blue">Watch the conversation and feedback</h2>
          <p className="mt-4 mb-7 leading-relaxed text-cs-dark-blue/80">A learner talks a hesitant parent through a two-month vaccine visit, then reviews the scored feedback.</p>
          <DemoVideoSection youtubeUrl={DEMO_VIDEO.embedUrl} title="Vaccine hesitancy counseling and feedback" />
          <VideoObjectSchema name="Vaccine hesitancy counseling and feedback" description="A ClinicalSim practice conversation and the feedback report that follows." {...DEMO_VIDEO} />
        </div>
      </section>
      <ClinicianTestimonials />

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
                Talk with us
              </Button>
            </Link>
            <Link href="/health-systems">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white bg-transparent hover:bg-white/10"
              >
                For health systems
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/medical-education" className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-medium text-white underline underline-offset-4">
              For medical education
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
