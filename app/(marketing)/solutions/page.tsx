import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudienceCard } from "@/components/audience-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { getAllSolutions } from "@/lib/solutions"

export const metadata: Metadata = {
  title: "Use Cases: Communication Practice Across Medicine",
  description:
    "One platform for clinical communication — remediation, a longitudinal residency and fellowship curriculum, undergraduate medical education, and faculty development. The same voice-based AI simulation and rubric across every stage of a medical career.",
  openGraph: {
    title: "Use Cases | ClinicalSim.ai",
    description:
      "One platform, many conversations: remediation, longitudinal curriculum, UME, and faculty development — all mapped to ACGME Milestones 2.0.",
    url: "https://clinicalsim.ai/solutions",
  },
  twitter: {
    title: "Use Cases | ClinicalSim.ai",
    description:
      "One platform for clinical communication across the medical-education continuum.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/solutions",
  },
}

export default function SolutionsPage() {
  const solutions = getAllSolutions()

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "ClinicalSim Use Cases",
            description:
              "Clinical communication practice across remediation, residency and fellowship, undergraduate medical education, and faculty development.",
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
      <section className="relative px-6 py-16 md:py-24 text-center bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-light leading-tight pb-3 mb-6 text-white">
            One platform. <span className="text-cs-electric font-medium">Many conversations.</span>
          </h1>
          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed max-w-3xl mx-auto">
            ClinicalSim runs validated voice scenarios with rubric-scored feedback in minutes. The same engine and dashboard support communication at every stage of a medical career — from a first patient history to leading a family meeting.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Use-case grid */}
      <section className="px-6 py-10 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {solutions.map((solution) => (
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
      </section>

      {/* Final CTA */}
      <SectionDivider variant="diagonal-down" color="navy" />
      <section className="px-6 py-10 md:py-12 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            See which use case fits your program
          </h2>
          <p className="text-lg font-light mb-8 text-white/90">
            One platform serves trainees, residents, students, and faculty.
          </p>
          <Link href="/contact">
            <Button variant="accent" size="xl">
              Request a Pilot
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
