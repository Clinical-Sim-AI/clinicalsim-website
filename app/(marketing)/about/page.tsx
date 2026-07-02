import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StatHighlight } from "@/components/stat-highlight"
import { SectionDivider } from "@/components/section-divider"
import { AudienceCard } from "@/components/audience-card"
import { getAllAudiences } from "@/lib/audiences"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About ClinicalSim.ai: AI Clinical Simulation for Medical Communication",
  description: "ClinicalSim is a voice-based AI clinical simulation platform to practice and measure clinical communication across the medical-education continuum — UME, residency, fellowship, remediation, and faculty development. ACGME milestone-aligned with real-time feedback.",
  openGraph: {
    title: "About ClinicalSim.ai",
    description: "Voice-based AI clinical simulation to practice the conversations that matter most, across every stage of a medical career. ACGME milestone-aligned.",
    url: "https://clinicalsim.ai/about",
  },
  twitter: {
    title: "About ClinicalSim.ai",
    description: "Voice-based AI clinical simulation to practice the conversations that matter most, across every stage of a medical career.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/about",
  },
}

export default function AboutPage() {
  const audiences = getAllAudiences()

  return (
    <>
      {/* Hero Section */}
      <section className="relative text-center px-6 py-16 md:py-24 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-light mb-6 text-white">
            Practice the conversations that matter most.
          </h1>
          <p className="text-xl text-cs-cloud font-light leading-relaxed max-w-3xl mx-auto">
            ClinicalSim is a voice-based AI clinical simulation platform to practice and measure <span className="text-cs-electric font-medium">clinical communication</span> — structured practice with real-time feedback, mapped to ACGME Milestones 2.0, across undergraduate medical education, residency and fellowship, remediation, and faculty development.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Problem Statement Section */}
      <section className="px-6 pt-10 md:pt-12 pb-4 md:pb-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4 text-center">
            Communication is the hardest competency to teach, train, and measure.
          </h2>
          <p className="text-lg text-cs-dark-blue/70 font-light leading-relaxed text-center max-w-3xl mx-auto mb-8">
            It&apos;s a clinical procedure — the one clinicians perform most often and practice least. Yet unlike every other procedure, there&apos;s no scalable way to rehearse it, score it, or document improvement.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <StatHighlight
              value="93%"
              label="of programs have faced remediation in the past 3 years"
              source="CERA Survey"
              variant="accent"
            />
            <StatHighlight
              value="50%"
              label="of program directors want an accessible remediation toolkit"
              source="CERA Survey"
              variant="navy"
            />
            <StatHighlight
              value="16"
              label="published studies exist on communication-specific remediation"
              source="Literature review"
              variant="accent"
            />
          </div>

          <div className="bg-white/70 border border-cs-gray/50 rounded-2xl p-8 shadow-lg">
            <p className="text-lg text-cs-dark-blue/85 font-light leading-relaxed">
              When Step 2 CS was discontinued in 2021, programs lost the only national standardized assessment of clinical communication skills. ACGME Milestones 2.0 created universal ICS requirements — but most programs have no scalable way to assess or remediate communication competency. The result: <span className="font-bold tracking-tight text-cs-dark-blue font-medium">29-45 faculty hours</span> consumed per remediation case, with no standardized tools, inconsistent documentation, and learners who need the most practice getting the fewest repetitions.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* Our Approach Section */}
      <section className="px-6 pt-10 md:pt-12 pb-4 md:pb-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 text-center">
            Structured practice that changes clinical communication.
          </h2>

          <div className="bg-white/90 rounded-2xl p-8 md:p-10 shadow-xl border border-cs-gray/50">
            <p className="text-lg md:text-xl text-cs-dark-blue/85 font-light leading-relaxed mb-8">
              You wouldn&apos;t teach a procedure without a sim lab. Communication deserves the same rigor. ClinicalSim provides structured, repeatable practice for the conversations that matter most — breaking bad news, navigating angry patients, conducting informed consent, leading goals-of-care discussions — for learners and the faculty who teach them.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-cs-electric flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-cs-navy">On-demand AI patient encounters</h3>
                  <p className="text-cs-dark-blue/70 font-light">Practice specific scenarios 24/7 from any device</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-cs-electric flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-cs-navy">Real-time feedback mapped to ACGME Milestones 2.0</h3>
                  <p className="text-cs-dark-blue/70 font-light">ICS-1, ICS-2, ICS-3 assessment from every session</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-cs-light-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-cs-navy">CCC-ready documentation</h3>
                  <p className="text-cs-dark-blue/70 font-light">Timestamped, milestone-aligned records for committee review</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-cs-light-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-cs-navy">Longitudinal progress tracking</h3>
                  <p className="text-cs-dark-blue/70 font-light">Demonstrate improvement across the remediation period</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-cs-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-cs-navy">Faculty dashboard</h3>
                  <p className="text-cs-dark-blue/70 font-light">Monitor learner progress without being present for every session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" />

      {/* Who We Serve Section */}
      <section className="px-6 py-10 md:py-12 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4 text-center">
            Built for every stakeholder across the training continuum
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-10">
            {audiences.map((audience) => (
              <AudienceCard
                key={audience.slug}
                brandIcon={audience.icon}
                title={audience.shortTitle}
                subtitle={audience.subtitle}
                bullets={audience.cardBullets}
                href={`/audiences/${audience.slug}`}
                variant={audience.colorVariant}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/solutions"
              className="inline-flex items-center text-cs-dark-blue font-medium hover:text-cs-dark-blue transition-colors group"
            >
              Explore all use cases
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Final CTA Section */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Communication is teachable, measurable, and improvable.
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90 max-w-3xl mx-auto">
            Training programs across the country are already practicing on a system mapped to their milestones — instead of rebuilding the infrastructure from scratch every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button
                variant="accent"
                size="xl"
              >
                Request a Pilot
              </Button>
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center text-white/70 font-medium hover:text-cs-dark-blue transition-colors group"
            >
              Are you a researcher? Apply to collaborate
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
