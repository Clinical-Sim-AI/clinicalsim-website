import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudienceCard } from "@/components/audience-card"
import { SectionDivider } from "@/components/section-divider"
import { getAllAudiences, getAudiencesByMarket } from "@/lib/audiences"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: { absolute: "Who we serve: health systems and medical education" },
  description: "ClinicalSim serves patient experience, risk, safety, nursing education, simulation, GME, UME, faculty development, and competency review teams.",
  openGraph: {
    title: "Who ClinicalSim.ai serves",
    description: "Communication practice and measurement for patient experience, safety, nursing education, simulation, GME, UME, and competency review teams.",
    url: "https://clinicalsim.ai/audiences",
  },
  twitter: {
    title: "Who ClinicalSim.ai serves",
    description: "Communication practice and measurement for health systems and medical education.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences",
  },
}

export default function AudiencesPage() {
  const audiences = getAllAudiences()
  const audienceGroups = [
    {
      label: "Health systems",
      intro:
        "The teams responsible for patient experience, safety, risk, and communication standards across the institution.",
      items: getAudiencesByMarket("health-system"),
    },
    {
      label: "Medical education",
      intro:
        "The leaders responsible for curricula, simulation, faculty development, competency review, and remediation.",
      items: getAudiencesByMarket("medical-education"),
    },
  ]

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Who ClinicalSim serves",
            description:
              "ClinicalSim serves health system and medical education teams responsible for patient experience, safety, nursing education, simulation, curricula, and competency review.",
            url: "https://clinicalsim.ai/audiences",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: audiences.map((audience, index) => ({
                "@type": "ListItem" as const,
                position: index + 1,
                url: `https://clinicalsim.ai/audiences/${audience.slug}`,
                name: audience.title,
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
                name: "Who We Serve",
                item: "https://clinicalsim.ai/audiences",
              },
            ],
          },
        ]}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24 text-center bg-cs-dark-blue text-white">
        <Waveform seed="audiences" align="edges" opacity={0.17} />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            One communication platform, built for the teams responsible for the standard
          </h1>
          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed mb-4 max-w-3xl mx-auto">
            Patient experience, risk, safety, simulation, and medical education teams can use the same voice practice and transcript evidence while each keeps the reporting view its work requires.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Audience Cards */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-14">
            {audienceGroups.map((group) => (
              <div key={group.label}>
                <div className="mb-8 max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-3">
                    {group.label}
                  </h2>
                  <p className="text-lg text-cs-dark-blue/70 font-light leading-relaxed">
                    {group.intro}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {group.items.map((audience) => (
                    <AudienceCard
                      key={audience.slug}
                      brandIcon={audience.icon}
                      title={audience.title}
                      subtitle={audience.subtitle}
                      bullets={audience.cardBullets}
                      href={`/audiences/${audience.slug}`}
                      variant={audience.colorVariant}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* Solutions bridge */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
            Start with the conversation that matters now
          </h2>
          <p className="text-lg text-cs-dark-blue/70 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Review the use cases for patient experience, debriefing, safety conversations, curricula, and remediation.
          </p>
          <Link href="/solutions">
            <Button variant="secondary" size="lg">
              See all use cases
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <WaveformBand seed="audiences">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            See how ClinicalSim fits your institution
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Bring one team, one standard, and one reporting question.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Request a pilot
              </Button>
            </Link>
            <Link href="/solutions/patient-experience">
              <Button variant="outline" size="lg" className="border-white/30 text-white bg-transparent hover:bg-white/10">
                Patient experience
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
