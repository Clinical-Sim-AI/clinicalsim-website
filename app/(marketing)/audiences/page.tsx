import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudienceCard } from "@/components/audience-card"
import { SectionDivider } from "@/components/section-divider"
import { getAllAudiences } from "@/lib/audiences"
import { JsonLd } from "@/components/json-ld"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Who we serve: GME leaders, simulation directors, risk, quality, and CCCs",
  description: "ClinicalSim serves the roles that own clinical communication: program directors and DIOs, simulation center directors, clinical competency committees, medical school leadership, faculty and clinician educators, risk and patient safety offices, and quality and patient experience leaders.",
  openGraph: {
    title: "Who ClinicalSim.ai serves",
    description: "Clinical communication practice and measurement for GME leadership, simulation centers, CCCs, faculty developers, risk offices, and quality and patient experience teams.",
    url: "https://clinicalsim.ai/audiences",
  },
  twitter: {
    title: "Who ClinicalSim.ai serves",
    description: "Clinical communication practice and measurement for GME leadership, simulation centers, CCCs, risk offices, and quality teams.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/audiences",
  },
}

export default function AudiencesPage() {
  const audiences = getAllAudiences()

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Who We Serve: GME Leaders, Sim Directors, Risk, Quality & CCCs",
            description:
              "ClinicalSim serves the roles that own clinical communication: program directors and DIOs, simulation center directors, clinical competency committees, medical school leadership, faculty and clinician educators, risk and patient safety offices, and quality and patient experience leaders.",
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
      <section className="relative px-6 py-16 md:py-24 text-center bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            Clinical communication for every team responsible for it
          </h1>
          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed mb-4 max-w-3xl mx-auto">
            Program directors need a repeatable remediation plan. CCCs need evidence they can inspect. Simulation centers need more practice volume. Risk and quality teams need proof that clinicians practiced. ClinicalSim gives each team a view of the same sessions, framed for the decision it owns.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Audience Cards */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {audiences.map((audience) => (
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
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* Solutions Bridge */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
            Communication <span className="text-cs-dark-blue font-medium">remediation</span>
          </h2>
          <p className="text-lg text-cs-dark-blue/70 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            See how ClinicalSim supports structured communication remediation across your program.
          </p>
          <Link href="/solutions/remediation">
            <Button variant="secondary" size="lg">
              Learn about communication remediation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            Ready to see ClinicalSim in action?
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Join academic medical centers piloting ClinicalSim
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Request a pilot
              </Button>
            </Link>
            <Link href="/solutions/remediation">
              <Button variant="outline" size="lg" className="border-white/30 text-white bg-transparent hover:bg-white/10">
                Communication remediation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
