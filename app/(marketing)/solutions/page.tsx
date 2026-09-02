import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudienceCard } from "@/components/audience-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { getSolutionsByMarket } from "@/lib/solutions"
import type { Market } from "@/lib/positioning"

/**
 * The public library follows the two buying contexts that use the platform.
 */
const GROUPS: {
  market: Market
  heading: string
  intro: string
}[] = [
  {
    market: "health-system",
    heading: "Health systems",
    intro:
      "Patient experience, debriefing, informed consent, and error disclosure, scored against the standards and policies the institution already uses.",
  },
  {
    market: "medical-education",
    heading: "Medical education",
    intro:
      "Longitudinal curricula, undergraduate medical education, faculty development, and targeted remediation on the same platform.",
  },
]

export const metadata: Metadata = {
  title: "Communication intelligence use cases",
  description:
    "ClinicalSim measures and fixes communication for health systems and medical education: patient experience, debriefing, informed consent, error disclosure, curricula, and remediation.",
  openGraph: {
    title: "Use cases | ClinicalSim.ai",
    description:
      "One platform for patient experience, debriefing, safety conversations, medical education, and communication remediation.",
    url: "https://clinicalsim.ai/solutions",
  },
  twitter: {
    title: "Use cases | ClinicalSim.ai",
    description:
      "Communication use cases for health systems and medical education.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/solutions",
  },
}

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "ClinicalSim Use Cases",
            description:
              "Clinical communication use cases for health systems and medical education, including patient experience, debriefing, informed consent, error disclosure, curricula, and remediation.",
            url: "https://clinicalsim.ai/solutions",
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
                name: "Use Cases",
                item: "https://clinicalsim.ai/solutions",
              },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24 text-center bg-cs-dark-blue text-white">
        <Waveform seed="solutions" align="edges" opacity={0.17} />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            One platform for the conversations your institution needs to measure
          </h1>
          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed max-w-3xl mx-auto">
            Each conversation is scored against the standard that fits the task, every score quotes the speaker&apos;s own words, and the same cases give people the practice to fix what the score found.
          </p>
          <p className="mt-6 text-base md:text-lg text-cs-cloud/85 font-light max-w-3xl mx-auto">
            <Link
              href="/frameworks"
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              How scoring against your own framework works
            </Link>
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Use case grid, split by market */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-6xl mx-auto space-y-14">
          {GROUPS.map((group) => {
            const groupSolutions = getSolutionsByMarket(group.market)
            if (groupSolutions.length === 0) return null

            return (
              <div key={group.market}>
                <div className="mb-8 max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-3">
                    {group.heading}
                  </h2>
                  <p className="text-lg text-cs-dark-blue/70 font-light leading-relaxed">
                    {group.intro}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {groupSolutions.map((solution) => (
                    <AudienceCard
                      key={solution.slug}
                      brandIcon={solution.icon}
                      title={solution.title}
                      subtitle={solution.subtitle}
                      bullets={solution.cardBullets}
                      href={`/solutions/${solution.slug}`}
                      variant={solution.colorVariant}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Final CTA */}
      <SectionDivider variant="diagonal-down" color="navy" />
      <section className="px-6 py-8 md:py-10 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Find the use case that fits your institution
          </h2>
          <p className="text-lg font-light mb-8 text-white/90">
            Start with the team, the conversation they need to practice, and the evidence your leaders need to review.
          </p>
          <Link href="/contact">
            <Button variant="accent" size="xl">
              Start with an assessment
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
