import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudienceCard } from "@/components/audience-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { getAllSolutions } from "@/lib/solutions"

export const metadata: Metadata = {
  title: "Use cases: communication practice across medicine",
  description:
    "One platform for communication remediation, residency and fellowship curricula, undergraduate medical education, and faculty development, with frameworks that fit each learner and task.",
  openGraph: {
    title: "Use cases | ClinicalSim.ai",
    description:
      "One platform, many conversations: remediation and residency curriculum mapped to ACGME Milestones 2.0, plus UME and faculty development with feedback mapped to the framework that fits each.",
    url: "https://clinicalsim.ai/solutions",
  },
  twitter: {
    title: "Use cases | ClinicalSim.ai",
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            One platform. <span className="text-cs-electric font-medium">Many conversations.</span>
          </h1>
          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed max-w-3xl mx-auto">
            ClinicalSim supports communication remediation, longitudinal residency and fellowship curricula, undergraduate medical education, and faculty development. The platform stays the same while the cases and competency frameworks change with the learner.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Use-case grid */}
      <section className="px-6 py-8 md:py-10 bg-white">
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
      <section className="px-6 py-8 md:py-10 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Find the use case that fits your program
          </h2>
          <p className="text-lg font-light mb-8 text-white/90">
            Start with the learner group, the conversations they need to practice, and the evidence your faculty need to review.
          </p>
          <Link href="/contact">
            <Button variant="accent" size="xl">
              Request a pilot
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
