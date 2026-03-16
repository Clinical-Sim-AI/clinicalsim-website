import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SolutionCard } from "@/components/solution-card"
import { StatHighlight } from "@/components/stat-highlight"
import { FeatureCard } from "@/components/feature-card"
import { SectionDivider } from "@/components/section-divider"
import { getAllSolutions, type Solution } from "@/lib/solutions"
import { BookOpen, TrendingUp, BarChart3, Shield, ArrowRight } from "lucide-react"

// Group solutions into categories for display
function groupSolutions(solutions: Solution[]) {
  const chronicPreventive = ["chronic-care-management", "advance-care-planning", "cognitive-assessments"]
  const acuteBehavioral = ["goals-of-care"]
  const specialtyEmerging = ["menopause-care"]

  return {
    "Chronic Care & Preventive Medicine": solutions.filter((s) => chronicPreventive.includes(s.slug)),
    "Acute & Serious Illness": solutions.filter((s) => acuteBehavioral.includes(s.slug)),
    "Specialty & Emerging Markets": solutions.filter((s) => specialtyEmerging.includes(s.slug)),
  }
}

export const metadata: Metadata = {
  title: "Clinical Communication Training Solutions",
  description: "Clinical communication training solutions including communication remediation mapped to ACGME ICS Milestones 2.0, chronic care management, advance care planning, goals of care, cognitive assessments, and menopause care. 93% of programs face remediation — ClinicalSim provides structured practice with CCC-ready documentation.",
  openGraph: {
    title: "Clinical Communication Training Solutions from ClinicalSim.ai",
    description: "Communication remediation, chronic care management, ACP, goals of care, cognitive assessments, and menopause care training with milestone-aligned feedback.",
    url: "https://clinicalsim.ai/solutions",
  },
  twitter: {
    title: "Clinical Communication Training Solutions from ClinicalSim.ai",
    description: "Communication remediation and clinical conversation training with milestone-aligned feedback and CCC-ready documentation.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/solutions",
  },
}

export default function SolutionsPage() {
  const solutions = getAllSolutions()

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 -z-10" />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light shimmer leading-loose pb-3 mb-6 md:mb-8">
            Communication scenarios that build competence across your program.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed mb-4 max-w-3xl mx-auto">
            From communication remediation to chronic care enrollment, ClinicalSim provides <span className="text-warm font-medium">structured, repeatable practice</span> for the conversations that matter most.
          </p>
          <p className="text-base md:text-lg text-gray-500 font-light mb-8 max-w-2xl mx-auto">
            Milestone-aligned feedback. CCC-ready documentation. Unlimited practice volume.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* The Argument */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-navy mb-6">
            The <span className="text-warm font-medium">communication competency gap</span>
          </h2>
          <div className="space-y-4 text-lg text-gray-600 font-light leading-relaxed mb-12">
            <p>
              93% of residency programs face communication remediation, and half of program directors want an accessible toolkit. At the same time, clinical conversations that patients need — conversations that improve outcomes and help people manage chronic illness — aren&apos;t happening at scale.
            </p>
            <p>
              Whether the need is <span className="text-warm font-medium">remediation for a struggling resident</span> or building communication confidence across the program, the solution is the same: structured, repeatable practice with milestone-aligned feedback.
            </p>
            <p>
              The scenarios below represent the highest-impact areas where better preparation drives better patient outcomes and stronger ICS milestone performance.
            </p>
          </div>

          {/* Aggregate care gap */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-warm/20 p-8 text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-3">
              The scope of the problem
            </p>
            <div className="font-mono font-bold text-4xl md:text-5xl lg:text-6xl text-warm mb-3">
              $5.5M+
            </div>
            <p className="text-lg text-gray-700 font-light max-w-lg mx-auto">
              in patient care, including chronic care coordination, preventive services, and avoided hospitalizations, that a 100-provider health system leaves on the table each year when these conversations don&apos;t happen
            </p>
            <p className="text-sm text-gray-500 font-light mt-3 max-w-md mx-auto">
              Source: Agarwal et al., Annals of Internal Medicine, 2022; CMS utilization data
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <StatHighlight
              value="40%"
              label="of malpractice claims driven by communication failures"
              source="CRICO/Candello"
              variant="warm"
            />
            <StatHighlight
              value="$1.7B"
              label="in malpractice costs from communication breakdowns (over five years)"
              source="CRICO, 2009-2013"
              variant="navy"
            />
            <StatHighlight
              value="<2hrs"
              label="of formal communication training in most residency programs"
              source="Medical education surveys"
              variant="warm"
            />
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="slate" />

      {/* Solution Cards — Grouped by Category */}
      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Conversations patients <span className="text-warm font-medium">need most</span>.
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Each area below represents a conversation where better provider preparation directly improves patient outcomes, and where Medicare has created dedicated codes to support it.
            </p>
          </div>

          {/* Featured: Communication Remediation */}
          <div className="mb-12">
            <Link href="/solutions/remediation" className="block">
              <div className="bg-white/70 rounded-2xl border-2 border-warm/30 p-8 hover:border-warm transition-colors border-glow-hover">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-warm/10">
                    <Shield className="h-6 w-6 text-warm" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-medium text-gray-900">Communication Remediation</h3>
                      <span className="text-xs font-medium text-warm bg-warm/10 px-2 py-0.5 rounded-full">Featured</span>
                    </div>
                    <p className="text-base text-gray-600 font-light leading-relaxed">
                      The first AI clinical simulation purpose-built for communication remediation. Structured practice mapped to ACGME ICS Milestones 2.0 with CCC-ready documentation. 93% of programs face remediation — 50% of program directors want a toolkit.
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-warm font-medium text-sm">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>

          {Object.entries(groupSolutions(solutions)).map(([category, categorySolutions]) => (
            categorySolutions.length > 0 && (
              <div key={category} className="mb-12 last:mb-0">
                <h3 className="text-xl md:text-2xl font-light text-navy mb-6 border-b border-navy/10 pb-3">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {categorySolutions.map((solution) => (
                    <SolutionCard
                      key={solution.slug}
                      icon={solution.icon}
                      title={solution.shortTitle}
                      description={solution.description}
                      keyStat={solution.revenueStats[0].value}
                      keyStatLabel={solution.revenueStats[0].label}
                      href={`/solutions/${solution.slug}`}
                      variant={solution.colorVariant}
                    />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* Cross-cutting Value */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Why ClinicalSim
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={BookOpen}
              title="Evidence-Based"
              description="Built on research with medical practitioners, with blinded evaluation using validated assessment tools."
              variant="warm"
              expandOnHover
            />
            <FeatureCard
              icon={TrendingUp}
              title="Scalable"
              description="No scheduling, no actors, no sim center booking. Deploy training across every department from a single platform without scaling costs."
              variant="default"
              expandOnHover
            />
            <FeatureCard
              icon={BarChart3}
              title="Measurable"
              description="Structured feedback using validated frameworks. Track provider progress, identify gaps, and demonstrate ROI to hospital leadership."
              variant="navy"
              expandOnHover
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-gradient-to-br from-navy via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            Ready to close the training gap?
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-blue-100">
            See how ClinicalSim helps providers master the conversations that improve patient outcomes and your bottom line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="warm-filled" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="/solutions/remediation">
              <Button variant="outline" size="lg" className="border-white/30 text-white bg-transparent hover:bg-white/10">
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
