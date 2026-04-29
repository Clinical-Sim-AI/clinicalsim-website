import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/feature-card"
import { StatHighlight } from "@/components/stat-highlight"
import { EvidenceShowcase } from "@/components/evidence-showcase"
import { AsymmetricGrid } from "@/components/asymmetric-grid"
import { SectionDivider } from "@/components/section-divider"
import { AudienceCard } from "@/components/audience-card"
import { RotatingText } from "@/components/rotating-text"
import { getAllAudiences } from "@/lib/audiences"
import { JsonLd } from "@/components/json-ld"
import { ArrowRight } from "lucide-react"

const DemoVideoSection = dynamic(
  () => import("@/components/demo-video-section").then((m) => ({ default: m.DemoVideoSection }))
)

export const metadata: Metadata = {
  title: {
    absolute: "AI Clinical Simulation for Medical Training | ClinicalSim",
  },
  description:
    "AI clinical simulation for communication remediation in GME. ACGME Milestones 2.0 mapped practice. 93% of programs face remediation—we solve it.",
  openGraph: {
    title: "AI Clinical Simulation for Medical Training",
    description:
      "Voice-based AI simulation for communication remediation in graduate medical education. ACGME Milestones 2.0 compliant.",
    url: "https://clinicalsim.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClinicalSim.ai — AI Clinical Simulation for Communication Remediation",
      },
    ],
  },
  twitter: {
    title: "AI Clinical Simulation for Medical Training",
    description:
      "Voice-based AI simulation for communication remediation. ACGME compliant.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://clinicalsim.ai",
  },
}

export default function HomePage() {
  const audiences = getAllAudiences()

  const features = [
    {
      brandIcon: "badge-check" as const,
      title: "Purpose-Built for Communication Remediation",
      description: "When a learner struggles with communication, give them structured practice — not a single extra SP session. Unlimited on-demand repetitions with documented improvement mapped to ICS milestones.",
      variant: "accent" as const,
    },
    {
      brandIcon: "book-opened" as const,
      title: "Evidence-Based",
      description: "Built on research with medical practitioners, with blinded evaluation using validated assessment tools (ACGME milestones, Calgary-Cambridge). Published in Academic Pediatrics.",
      variant: "accent" as const,
    },
    {
      brandIcon: "sound-wave" as const,
      title: "Voice-Based Practice",
      description: "Real-time spoken conversations with AI patients across goals of care, diagnosis disclosure, and family meetings. Clinical communication happens out loud, and training should too.",
      variant: "default" as const,
    },
    {
      brandIcon: "people-connected" as const,
      title: "Scale Across Your System",
      description: "Deploy training across every program and training level — medical school through fellowship — without scheduling, logistics, or linear cost scaling. Works for a single program or an entire institution.",
      variant: "default" as const,
    },
    {
      brandIcon: "ribbon-check" as const,
      title: "CCC-Ready Documentation",
      description: "Every practice session generates timestamped, milestone-aligned assessment data. Track learner progress longitudinally and generate documentation your Clinical Competency Committee can use at the next review.",
      variant: "navy" as const,
    },
    {
      brandIcon: "chat-square-heart" as const,
      title: "Private, Judgment-Free Practice",
      description: "Remediation carries stigma. ClinicalSim lets learners practice difficult conversations privately — no observers, no scheduling, no performance anxiety. Repeat as many times as needed in a low-stakes environment designed for growth.",
      variant: "navy" as const,
    }
  ]

  const stats = [
    {
      value: "93%",
      label: "of residency programs have faced remediation in the past 3 years",
      source: "CERA Survey, 267 Family Medicine PDs",
      variant: "accent" as const,
    },
    {
      value: "29-45",
      label: "faculty hours consumed per remediation case",
      source: "University of Colorado; Penn EIRC",
      variant: "navy" as const,
    },
    {
      value: "50%",
      label: "of program directors want an accessible remediation toolkit",
      source: "CERA Survey",
      variant: "accent" as const,
    },
    {
      value: "16",
      label: "published studies exist on communication-specific remediation",
      source: "Literature review",
      variant: "light-blue" as const,
    }
  ]

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "ClinicalSim.ai",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            description:
              "AI clinical simulation platform purpose-built for communication remediation in graduate medical education. ACGME ICS Milestones 2.0 mapped practice for breaking bad news, goals-of-care, informed consent, and family meetings.",
            url: "https://clinicalsim.ai",
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/PreOrder",
              description: "Piloting with medical schools, residency programs, and fellowships nationwide",
            },
            publisher: {
              "@type": "Organization",
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
            ],
          },
        ]}
      />
      {/* Hero Section - Dark Blue per brand */}
      <section className="relative flex flex-col items-center justify-center px-6 py-16 md:py-28 text-center bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight pb-3 mb-6 md:mb-8 text-white">
            AI Clinical Simulation — Practice the <span className="text-cs-electric font-medium">Conversations That Matter Most</span>
          </h1>

          <p className="text-lg md:text-xl text-cs-cloud font-light mb-4">
            AI clinical simulation for{" "}
            <RotatingText
              phrases={["communication remediation", "breaking bad news", "goals-of-care discussions", "informed consent"]}
              className="text-cs-electric font-medium"
            />
          </p>

          <p className="text-lg md:text-xl text-white/85 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
            Structured practice for the communication scenarios learners struggle with most — breaking bad news, navigating difficult family meetings, informed consent, and goals-of-care discussions. On-demand, from any device.
          </p>

          <div className="space-y-3">
            <Link href="/contact">
              <Button
                variant="accent"
                size="xl"
              >
                Request a Pilot
              </Button>
            </Link>
            <p className="text-sm text-cs-cloud/70 font-light">
              Piloting with medical schools, residency programs, and fellowships nationwide.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Definition Block - GEO citation magnet */}
      <section className="px-6 py-10 md:py-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="border-l-4 border-cs-electric pl-6 md:pl-8">
            <h2 className="text-xl md:text-2xl font-light text-cs-navy mb-3">What is ClinicalSim.ai?</h2>
            <p className="text-base md:text-lg text-cs-dark-blue/85 font-light leading-relaxed mb-3">
              ClinicalSim.ai is an AI clinical simulation platform purpose-built for communication remediation in graduate medical education. When Step 2 CS was discontinued in 2021, programs lost the only national standardized assessment of clinical communication skills. 93% of programs now face remediation with no scalable toolkit (CERA Survey, 267 Family Medicine PDs).
            </p>
            <p className="text-base md:text-lg text-cs-dark-blue/85 font-light leading-relaxed">
              ClinicalSim provides structured, on-demand practice mapped to ACGME ICS Milestones 2.0 — breaking bad news, goals-of-care discussions, informed consent, and navigating difficult family meetings. Every session generates milestone-aligned, CCC-ready documentation. Built on research with medical practitioners using blinded evaluation and validated assessment tools.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement Section - Full-width with stats */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              Communication is the competency everyone remediates — and no one has <span className="text-cs-dark-blue font-medium">tools for</span>.
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
              93% of programs face remediation. Only 16 published studies address communication-specific remediation. Half of PDs want a toolkit. We built it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <StatHighlight
                key={index}
                value={stat.value}
                label={stat.label}
                source={stat.source}
                variant={stat.variant}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <SectionDivider variant="diagonal-up" color="white" />

      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            Why <span className="text-cs-dark-blue font-medium">now</span>
          </h2>
          <div className="space-y-6">
            {/* Card 1: Step 2 CS */}
            <div className="border-l-4 border-cs-electric pl-6">
              <h3 className="text-lg font-medium text-cs-dark-blue mb-2">Step 2 CS is gone.</h3>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                In 2021, USMLE permanently discontinued Step 2 CS — the only national standardized assessment of clinical communication skills. Programs now bear sole responsibility for communication assessment with inconsistent tools and no external benchmark.
              </p>
            </div>
            {/* Card 2: Milestones 2.0 */}
            <div className="border-l-4 border-cs-navy pl-6">
              <h3 className="text-lg font-medium text-cs-dark-blue mb-2">Milestones 2.0 raised the bar.</h3>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                ACGME Harmonized Milestones 2.0 created a universal ICS framework across all specialties. For the first time, there&apos;s a standardized rubric — and a product can serve all programs with a common assessment standard.
              </p>
            </div>
            {/* Card 3: No toolkit */}
            <div className="border-l-4 border-cs-electric pl-6">
              <h3 className="text-lg font-medium text-cs-dark-blue mb-2">No scalable remediation tool exists.</h3>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                93% of programs face remediation, but only 16 published studies address communication-specific remediation. The CERA survey confirmed: half of program directors said a remediation toolkit is the single thing that would help most. We built it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="slate" />

      {/* Demo Video Section */}
      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
        <div className="max-w-5xl mx-auto">
          <DemoVideoSection
            title="See ClinicalSim.ai in Action"
            description="Watch how learners practice difficult conversations with AI-powered simulation"
            youtubeUrl="https://www.youtube.com/embed/HRFtR44QlQk?si=dwv7JdCHPUtWSQIL&amp;start=97"
          />
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* Features Section - Asymmetric Grid */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-dark-blue mb-4">
              Why ClinicalSim.ai
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
              Built for the conversations clinicians face but rarely get to practice.
            </p>
          </div>

          <AsymmetricGrid layout="staggered" gap="large">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                brandIcon={feature.brandIcon}
                title={feature.title}
                description={feature.description}
                variant={feature.variant}
                asymmetric
                expandOnHover
              />
            ))}
          </AsymmetricGrid>
        </div>
      </section>

      <SectionDivider variant="curve" color="blue" />

      {/* Evidence Section - Hidden until study is published
      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              Backed by <span className="text-cs-dark-blue font-medium">rigorous evidence</span>
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
              Among the first AI communication platforms with published, peer-reviewed research demonstrating effectiveness.
            </p>
          </div>

          <EvidenceShowcase
            studyTitle="AI-Powered Simulation for Pediatric Critical Care Communication Training"
            journal="Academic Pediatrics"
            year="2024"
            summary="Pilot study with PICU fellows demonstrating significant improvements in communication skills through AI voice simulation, with blinded evaluation using validated assessment tools (ACGME milestones, Calgary-Cambridge framework)."
            link="/insights/pilot-study-results"
          />
        </div>
      </section>
      */}

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Testimonials Section - Pull-quote style (not cards) */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-dark-blue mb-4">
              What learners are saying
            </h2>
            <p className="text-base text-cs-dark-gray font-light">From our pilot study with PICU fellows</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-xl md:text-2xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  It was helpful to have time to think and reflect without feeling the pressure of a person across from you expecting a response.
                </p>
                <cite className="text-base text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-electric pl-4">
                  PICU Fellow, Pilot Study Participant
                </cite>
              </blockquote>
            </div>

            <div className="relative">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-xl md:text-2xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  Helpful to practice responses... and choose phrasing of the responses.
                </p>
                <cite className="text-base text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-electric pl-4">
                  PICU Fellow, Pilot Study Participant
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Feedback */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              What faculty are saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="relative">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-lg md:text-xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  I just tried it out and it was like talking to a real patient.
                </p>
                <cite className="text-sm text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-electric pl-4">
                  Faculty, Johns Hopkins University School of Medicine
                </cite>
              </blockquote>
            </div>

            <div className="relative">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-lg md:text-xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  The AI feedback is very pinpoint and detailed. I did perform a demo to my faculty group and they were BLOWN AWAY!
                </p>
                <cite className="text-sm text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-electric pl-4">
                  Faculty, Georgetown University
                </cite>
              </blockquote>
            </div>

            <div className="relative">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-lg md:text-xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  The AI tool is really cool! It seems very transferable to the work we are doing around transport.
                </p>
                <cite className="text-sm text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-electric pl-4">
                  Faculty, University of Colorado
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Selector */}
      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              Built for every stakeholder in the <span className="text-cs-dark-blue font-medium">remediation process</span>
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
              See how ClinicalSim.ai works for your role.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {audiences.map((audience) => (
              <AudienceCard
                key={audience.slug}
                icon={audience.icon}
                title={audience.title}
                subtitle={audience.subtitle}
                bullets={audience.cardBullets}
                href={`/audiences/${audience.slug}`}
                variant={audience.colorVariant}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/solutions/remediation" className="inline-flex items-center text-cs-dark-blue font-medium hover:text-cs-dark-blue transition-colors">
              Learn about communication remediation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="navy" />

      {/* Final CTA Section */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            Ready to close the communication gap?
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            See how ClinicalSim.ai works for communication remediation.
          </p>
          <Link href="/contact">
            <Button
              variant="accent"
              size="xl"
            >
              Request a Pilot
            </Button>
          </Link>
          <p className="mt-4 text-sm text-white/70 font-light">
            Are you a researcher?{" "}
            <Link href="/research" className="text-cs-dark-blue hover:text-white font-medium transition-colors inline-flex items-center">
              Apply to collaborate
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
