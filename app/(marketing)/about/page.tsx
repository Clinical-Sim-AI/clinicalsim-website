import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StatHighlight } from "@/components/stat-highlight"
import { SectionDivider } from "@/components/section-divider"
import { AudienceCard } from "@/components/audience-card"
import { getAllAudiences } from "@/lib/audiences"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About ClinicalSim.ai: Built by Simulation Directors & Communication Researchers",
  description: "ClinicalSim.ai is the first AI clinical simulation purpose-built for communication remediation. Built by a Director of Simulation at Advocate Health, Director of Simulation at University of Chicago, and published communication researchers. ACGME milestone-aligned.",
  openGraph: {
    title: "About ClinicalSim.ai",
    description: "Built by leaders in simulation and clinical communication. Purpose-built for communication remediation in medical education.",
    url: "https://clinicalsim.ai/about",
  },
  twitter: {
    title: "About ClinicalSim.ai",
    description: "Built by simulation directors and communication researchers. Purpose-built for communication remediation.",
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
      <section className="relative text-center px-6 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 -z-10" />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light shimmer mb-6">
            Built by the people who run simulation and publish the research.
          </h1>
          <p className="text-xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
            ClinicalSim.ai is the first AI clinical simulation purpose-built for <span className="text-warm font-medium">communication remediation</span> — structured practice with real-time feedback, mapped to ACGME ICS Milestones 2.0, generating documentation your CCC can use.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Problem Statement Section */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-navy mb-8 text-center">
            Communication is the competency everyone remediates — and no one has tools for.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <StatHighlight
              value="93%"
              label="of programs have faced remediation in the past 3 years"
              source="CERA Survey"
              variant="warm"
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
              variant="warm"
            />
          </div>

          <div className="bg-white/70 border border-gray-200 rounded-2xl p-8 shadow-lg">
            <p className="text-lg text-gray-700 font-light leading-relaxed">
              When Step 2 CS was discontinued in 2021, programs lost the only national standardized assessment of clinical communication skills. ACGME Milestones 2.0 created universal ICS requirements — but most programs have no scalable way to assess or remediate communication competency. The result: <span className="font-mono text-warm font-medium">29-45 faculty hours</span> consumed per remediation case, with no standardized tools, inconsistent documentation, and learners who need the most practice getting the fewest repetitions.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="blue" />

      {/* Team Section */}
      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-navy mb-4 text-center">
            Built by leaders in simulation and clinical communication
          </h2>
          <p className="text-lg text-gray-600 font-light text-center mb-12 max-w-3xl mx-auto">
            Not a generic AI company entering healthcare. A team from the institutions and research programs that define medical simulation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Vinod Havalad */}
            <div className="bg-white/70 rounded-xl p-6 md:p-8 border border-gray-200 border-l-4 border-l-navy shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-1">Vinod Havalad, MD</h3>
              <p className="text-sm text-navy font-medium mb-4">Former Director of Simulation, Advocate Health System</p>
              <p className="text-gray-600 font-light leading-relaxed">
                Vinod designed simulation programs at one of the largest health systems in the Midwest. He brings direct experience building and running simulation centers that serve residency programs across multiple specialties.
              </p>
            </div>

            {/* Lauren Rissman */}
            <div className="bg-white/70 rounded-xl p-6 md:p-8 border border-gray-200 border-l-4 border-l-warm shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-1">Lauren Rissman, PhD</h3>
              <p className="text-sm text-warm font-medium mb-4">Communication Skills Researcher</p>
              <p className="text-gray-600 font-light leading-relaxed">
                Lauren is a published researcher in clinical communication with multiple peer-reviewed papers. Her research background means the platform&apos;s assessment frameworks are grounded in validated communication science, not ad hoc rubrics.
              </p>
            </div>

            {/* Gillian Brennan */}
            <div className="bg-white/70 rounded-xl p-6 md:p-8 border border-gray-200 border-l-4 border-l-navy shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-1">Gillian Brennan, MD</h3>
              <p className="text-sm text-navy font-medium mb-4">Director of Simulation, University of Chicago</p>
              <p className="text-gray-600 font-light leading-relaxed">
                Gillian currently runs simulation at one of the country&apos;s top academic medical centers. Her role means ClinicalSim was designed by someone who lives the challenges program directors face daily — not by engineers guessing at what educators need.
              </p>
            </div>

            {/* Ben Conway */}
            <div className="bg-white/70 rounded-xl p-6 md:p-8 border border-gray-200 border-l-4 border-l-blue-600 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-1">Ben Conway</h3>
              <p className="text-sm text-blue-600 font-medium mb-4">Co-Founder &amp; CEO</p>
              <p className="text-gray-600 font-light leading-relaxed">
                Ben leads ClinicalSim&apos;s business operations and market strategy. His focus is translating the team&apos;s clinical and educational expertise into a product that serves the institutions that need it.
              </p>
            </div>

            {/* Will Meyer */}
            <div className="bg-white/70 rounded-xl p-6 md:p-8 border border-gray-200 border-l-4 border-l-blue-600 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-1">Will Meyer</h3>
              <p className="text-sm text-blue-600 font-medium mb-4">Co-Founder &amp; CTO</p>
              <p className="text-gray-600 font-light leading-relaxed">
                Will leads ClinicalSim&apos;s technical development, building the AI simulation platform that delivers voice-based clinical encounters at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* Our Approach Section */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-navy mb-8 text-center">
            Structured practice that changes clinical communication.
          </h2>

          <div className="bg-white/90 rounded-2xl p-8 md:p-10 shadow-xl border border-gray-200 mb-8">
            <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed mb-8">
              You wouldn&apos;t remediate a surgical skill without a sim lab. Communication deserves the same rigor. ClinicalSim provides structured, repeatable practice for the specific communication scenarios learners struggle with most — breaking bad news, navigating angry patients, conducting informed consent, leading goals-of-care discussions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-warm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-navy">On-demand AI patient encounters</h3>
                  <p className="text-gray-600 font-light">Practice specific scenarios 24/7 from any device</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-warm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-navy">Real-time feedback mapped to ICS Milestones 2.0</h3>
                  <p className="text-gray-600 font-light">ICS-1, ICS-2, ICS-3 assessment from every session</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-navy">CCC-ready documentation</h3>
                  <p className="text-gray-600 font-light">Timestamped, milestone-aligned records for committee review</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-navy">Longitudinal progress tracking</h3>
                  <p className="text-gray-600 font-light">Demonstrate improvement across the remediation period</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-navy">Faculty dashboard</h3>
                  <p className="text-gray-600 font-light">Monitor learner progress without being present for every session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="blue" />

      {/* Who We Serve Section */}
      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-navy mb-4 text-center">
            Built for every stakeholder in the remediation process
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-10">
            {audiences.map((audience) => (
              <AudienceCard
                key={audience.slug}
                icon={audience.icon}
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
              href="/solutions/remediation"
              className="inline-flex items-center text-blue-600 font-medium hover:text-warm transition-colors group"
            >
              Learn about communication remediation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="slate" />

      {/* Final CTA Section */}
      <section className="px-6 py-16 md:py-20 bg-gradient-to-br from-navy via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            The institutions that move first will set the standard.
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-blue-100 max-w-3xl mx-auto">
            Communication remediation is inevitable. The only question is whether you build the infrastructure from scratch every time, or use a system already mapped to your milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button
                variant="warm-filled"
                size="xl"
              >
                Request a Pilot
              </Button>
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center text-blue-200 font-medium hover:text-warm transition-colors group"
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
