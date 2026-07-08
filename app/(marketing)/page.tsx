import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/feature-card"
import { StatHighlight } from "@/components/stat-highlight"
import { EvidenceShowcase } from "@/components/evidence-showcase"
import { AsymmetricGrid } from "@/components/asymmetric-grid"
import { AudienceCard } from "@/components/audience-card"
import { RotatingText } from "@/components/rotating-text"
import { getAllAudiences } from "@/lib/audiences"
import { getAllSolutions } from "@/lib/solutions"
import { JsonLd } from "@/components/json-ld"
import { ArrowRight } from "lucide-react"

const DemoVideoSection = dynamic(
  () => import("@/components/demo-video-section").then((m) => ({ default: m.DemoVideoSection }))
)

export const metadata: Metadata = {
  title: {
    absolute: "AI Clinical Simulation for Medical Communication | ClinicalSim",
  },
  description:
    "Voice-based AI simulation to practice and measure clinical communication at every stage of a medical career — from undergraduate medical education through residency, fellowship, and faculty development. Rubric-scored feedback mapped to ACGME Milestones 2.0 for residents and fellows.",
  openGraph: {
    title: "AI Clinical Simulation for Medical Communication",
    description:
      "Practice the conversations that matter most. Voice-based AI simulation for clinical communication across medical school, residency, fellowship, and faculty development.",
    url: "https://clinicalsim.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClinicalSim — AI Clinical Simulation for Medical Communication",
      },
    ],
  },
  twitter: {
    title: "AI Clinical Simulation for Medical Communication",
    description:
      "Voice-based AI simulation to practice the conversations that matter most, across every stage of a medical career.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://clinicalsim.ai",
  },
}

export default function HomePage() {
  const audiences = getAllAudiences()
  const solutions = getAllSolutions()

  // Representative scenario types practiced on the platform (drawn from the
  // scenario library — breaking bad news through error disclosure).
  const conversationTypes = [
    "Breaking bad news",
    "Goals-of-care discussions",
    "Informed consent",
    "Error disclosure",
    "Difficult family meetings",
    "Delivering a new diagnosis",
    "Communicating uncertainty",
    "Giving difficult feedback",
    "Professionalism conversations",
    "History-taking",
  ]

  // Stages of the medical-education continuum the platform serves.
  const trainingLevels = [
    "Undergraduate Medical Education",
    "Graduate Medical Education",
    "Faculty Development",
  ]

  const features = [
    {
      brandIcon: "badge-check" as const,
      title: "Built for the Full Training Continuum",
      description: "The same engine, rubric, and dashboard serve medical students, residents, fellows, and practicing faculty — from a first patient history to leading a goals-of-care meeting. Longitudinal curriculum, faculty development, and remediation all run on one platform.",
      variant: "accent" as const,
    },
    {
      brandIcon: "book-opened" as const,
      title: "Measured Improvement, Not Marketing Claims",
      description: "In a feasibility pilot with residents and advanced practice providers, comfort with difficult conversations improved significantly, and objective communication scores improved with repeated practice. Findings presented at IPSSW 2026, with a manuscript in preparation.",
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
      title: "Psychologically-Safe Practice",
      description: "Remediation carries stigma. ClinicalSim lets learners practice difficult conversations privately — no observers, no scheduling, no performance anxiety. Repeat as many times as needed in a low-stakes environment designed for growth.",
      variant: "navy" as const,
    }
  ]

  const stats = [
    {
      value: "93%",
      label: "of residency programs have faced remediation in the past 3 years",
      source: "CERA Survey, 267 Family Medicine PDs",
      variant: "blue" as const,
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
      variant: "blue" as const,
    },
    {
      value: "16",
      label: "published studies exist on communication-specific remediation",
      source: "Literature review",
      variant: "navy" as const,
    }
  ]

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "ClinicalSim",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            description:
              "Voice-based AI clinical simulation platform to practice and measure clinical communication across the medical-education continuum — undergraduate medical education, residency and fellowship, communication remediation, and faculty development. Rubric-scored practice for breaking bad news, goals-of-care, informed consent, error disclosure, and family meetings, mapped to ACGME Milestones 2.0 for residents and fellows.",
            url: "https://clinicalsim.ai",
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/PreOrder",
              description: "In use at academic medical centers, children's hospitals, and residency and fellowship programs nationwide",
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
            ],
          },
        ]}
      />
      {/* Hero Section - Dark Blue per brand */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28 lg:py-32 bg-cs-dark-blue text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left column — message + CTAs */}
          <div className="relative z-10 max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-cs-electric mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-cs-electric" aria-hidden="true" />
              AI Clinical Simulation
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
              Communication is a <span className="text-cs-electric font-medium">clinical procedure</span> — the one physicians perform most and practice least.
            </h1>

            <p className="text-lg md:text-xl text-cs-cloud font-light mb-8">
              Voice-based AI simulation for{" "}
              <RotatingText
                phrases={["breaking bad news", "goals-of-care discussions", "informed consent", "giving difficult feedback", "disclosing a medical error"]}
                className="text-cs-electric font-medium"
              />
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/contact">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  Request a Pilot
                  <ArrowRight />
                </Button>
              </Link>
              <Link href="/research">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-transparent border border-white/25 text-white hover:bg-white/10 font-medium"
                >
                  See the evidence
                </Button>
              </Link>
            </div>
          </div>

          {/* Right column — evidence panel */}
          <div className="relative z-10 lg:justify-self-end w-full max-w-md">
            <div className="rounded-2xl border border-white/10 bg-cs-navy/40 p-6 md:p-8 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-cs-electric mb-6">
                From our feasibility pilot
              </p>
              <dl className="space-y-6">
                <div>
                  <dt className="text-sm text-cs-cloud font-light mb-1">Comfort with difficult conversations</dt>
                  <dd className="text-2xl md:text-3xl font-light text-white">Improved significantly</dd>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <dt className="text-sm text-cs-cloud font-light mb-1">Objective communication scores</dt>
                  <dd className="text-2xl md:text-3xl font-light text-white">Increased with repeated practice</dd>
                </div>
              </dl>
              <p className="mt-6 pt-6 border-t border-white/10 text-sm text-cs-cloud font-light leading-relaxed">
                Rubric scoring tied to ACGME Milestones 2.0, across residents and advanced practice providers.
                <span className="block mt-2 text-cs-cloud/70">Presented at IPSSW 2026.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Definition + scenarios — editorial two-column */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16">
          {/* Left — definition */}
          <div className="max-w-xl">
            <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray mb-4">
              What is ClinicalSim?
            </h2>
            <p className="text-2xl md:text-3xl font-light tracking-tight leading-snug text-cs-navy text-balance">
              ClinicalSim is a voice-based AI clinical simulation platform for practicing and measuring clinical communication, the hardest competency to teach, train, and measure.
            </p>
            <p className="mt-6 text-base md:text-lg text-cs-dark-blue font-light leading-relaxed">
              The same engine and dashboard serve medical students, residents, fellows, and faculty, with rubric-scored practice mapped to the framework that fits each stage: the AAMC Foundational Competencies in undergraduate medical education, ACGME Milestones 2.0 in graduate medical education, and structured feedback frameworks like Pendleton and SBI for faculty development, plus documented feedback from every session.
            </p>
          </div>

          {/* Right — scenarios */}
          <div className="lg:border-l lg:border-cs-gray lg:pl-12 xl:pl-16">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray mb-5">
              Conversations you can practice
            </p>
            <ul className="flex flex-wrap gap-2.5 md:gap-3">
              {conversationTypes.map((type) => (
                <li
                  key={type}
                  className="rounded-full border border-cs-navy/25 bg-cs-cloud/50 px-4 py-2 text-sm font-medium text-cs-dark-blue"
                >
                  {type}
                </li>
              ))}
            </ul>

            <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray mt-10 mb-5">
              Across the training continuum
            </p>
            <ul className="flex flex-wrap gap-2.5 md:gap-3">
              {trainingLevels.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-cs-navy/25 bg-cs-cloud/50 px-4 py-2 text-sm font-medium text-cs-dark-blue"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The cost of communication — the stakes */}
      <section className="px-6 py-16 md:py-24 bg-cs-navy text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-balance mb-4">
            Communication isn&apos;t a soft skill. When it fails, the cost is <span className="text-cs-electric font-medium">measurable</span>.
          </h2>
          <p className="text-base md:text-lg text-cs-cloud font-light max-w-2xl mx-auto mb-10">
            The conversations clinicians have the least time to practice are the ones with the highest stakes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto">
            <div>
              <div className="text-5xl md:text-6xl font-medium text-cs-electric mb-3">60%</div>
              <p className="text-base text-white/90 font-light leading-relaxed">
                of hospital adverse events are linked to communication failures
              </p>
              <p className="text-xs text-white/50 mt-2">The Joint Commission, Sentinel Event Data</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-medium text-cs-electric mb-3">40%</div>
              <p className="text-base text-white/90 font-light leading-relaxed">
                of malpractice cases now involve a communication failure &mdash; up from 30%
              </p>
              <p className="text-xs text-white/50 mt-2">Candello 2025 Benchmarking Report</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section - Full-width with stats */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-balance text-cs-navy mb-4">
              Communication is the hardest competency to teach, train, and measure.
            </h2>
            <p className="text-lg text-cs-dark-blue font-light max-w-2xl mx-auto">
              Since Step 2 CS retired in 2021, there&apos;s no scalable way to measure communication against ICS milestones, EPAs, or competency frameworks. The gap is sharpest in remediation, where it&apos;s impossible to ignore:
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

      {/* Why Now Section — editorial two-column */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-24 lg:self-start max-w-sm">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray mb-4">
              The inflection point
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-cs-navy mb-4">
              Why now
            </h2>
            <p className="text-base text-cs-dark-blue font-light leading-relaxed">
              Three shifts have converged to make communication assessment both measurable and mandatory, with no tool built for it until now.
            </p>
          </div>

          {/* Right — numbered reasons */}
          <ol className="space-y-10">
            {[
              {
                title: "Step 2 CS is gone.",
                body: "In 2021, USMLE permanently discontinued Step 2 CS — the only national standardized assessment of clinical communication skills. Programs now bear sole responsibility for communication assessment with inconsistent tools and no external benchmark.",
              },
              {
                title: "Milestones 2.0 raised the bar.",
                body: "ACGME Harmonized Milestones 2.0 created a universal ICS framework across all specialties. For the first time, there's a standardized rubric — and a product can serve all programs with a common assessment standard.",
              },
              {
                title: "No scalable remediation tool exists.",
                body: "93% of programs face remediation, but only 16 published studies address communication-specific remediation. The CERA survey confirmed: half of program directors said a remediation toolkit is the single thing that would help most. We built it.",
              },
            ].map((reason, index) => (
              <li key={reason.title} className="flex gap-5 md:gap-6">
                <span
                  className="flex-shrink-0 text-lg font-medium text-cs-navy tabular-nums pt-1"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="border-l border-cs-navy/15 pl-5 md:pl-6">
                  <h3 className="text-lg md:text-xl font-medium text-cs-dark-blue mb-2">{reason.title}</h3>
                  <p className="text-base text-cs-dark-blue font-light leading-relaxed">{reason.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* One Platform, Many Conversations - use cases as peers */}
      <section className="px-6 pt-16 md:pt-24 pb-8 md:pb-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-cs-navy mb-4">
              One platform. <span className="text-cs-dark-blue font-medium">Many conversations.</span>
            </h2>
            <p className="text-lg text-cs-dark-blue font-light max-w-2xl mx-auto">
              The same engine, rubric, and dashboard across every stage of a medical career.
            </p>
          </div>

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

          {/* Looking ahead — practicing clinicians (vision, links to the latest essay) */}
          <div className="mt-8 bg-cs-dark-blue rounded-2xl p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-wider text-cs-electric mb-2">
                  Looking ahead
                </p>
                <h3 className="text-2xl md:text-3xl font-light mb-2">
                  The confidence–competence gap doesn&apos;t end at training.
                </h3>
                <p className="text-base text-white/85 font-light leading-relaxed">
                  In one survey, the attendings furthest out from training reported the highest confidence in leading end-of-life conversations — and the least formal preparation for them. Confidence isn&apos;t evidence of skill; it&apos;s often the absence of feedback. The same practice that develops trainees can keep practicing clinicians sharp.
                </p>
              </div>
              <Link
                href="/insights/eol-communication-training-measurement-gap"
                className="inline-flex items-center text-cs-electric font-medium hover:text-white transition-colors whitespace-nowrap"
              >
                Read the essay
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-5xl mx-auto">
          <DemoVideoSection
            title="See ClinicalSim in Action"
            description="Watch how learners practice difficult conversations with AI-powered simulation"
            loomUrl="https://www.loom.com/embed/3eacd20486a74b5c80a4ab7ba60b0308?t=0"
          />
        </div>
      </section>

      {/* Features Section - Asymmetric Grid */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-cs-dark-blue mb-4">
              Why ClinicalSim
            </h2>
            <p className="text-lg text-cs-dark-blue font-light max-w-2xl mx-auto">
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

      {/* Evidence Section - Hidden until study is PUBLISHED (peer-reviewed).
           NOTE: the study is NOT yet published — findings were presented at IPSSW 2026
           and a manuscript is in preparation. Before uncommenting, fill in the real
           journal + year + paper link. Do NOT reintroduce a placeholder citation.
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
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
            journal="TODO: real journal once published"
            year="TODO"
            summary="Feasibility pilot with residents and advanced practice providers showing significantly improved comfort with difficult conversations and improved objective communication scores with repeated practice, using AI voice simulation with structured rubric-based scoring."
            link="TODO: real paper link once published"
          />
        </div>
      </section>
      */}

      {/* Testimonials Section - Pull-quote style (not cards) */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-cs-dark-blue mb-4">
              What learners are saying
            </h2>
            <p className="text-base text-cs-dark-gray font-light">From clinicians in our pilot study</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-xl md:text-2xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  It was helpful to have time to think and reflect without feeling the pressure of a person across from you expecting a response.
                </p>
                <cite className="text-base text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-electric pl-4">
                  Clinician, Pilot Study Participant
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
                  Clinician, Pilot Study Participant
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Feedback */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-cs-navy mb-4">
              What faculty are saying
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-xl md:text-2xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  I just tried it out and it was like talking to a real patient.
                </p>
                <cite className="text-base text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-electric pl-4">
                  Faculty, Johns Hopkins University School of Medicine
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Selector */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-balance text-cs-navy mb-4">
              Built for every stakeholder across the <span className="text-cs-dark-blue font-medium">training continuum</span>
            </h2>
            <p className="text-lg text-cs-dark-blue font-light max-w-2xl mx-auto">
              See how ClinicalSim works for your role.
            </p>
          </div>

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

          <div className="text-center mt-8">
            <Link href="/solutions" className="inline-flex items-center text-cs-dark-blue font-medium hover:text-cs-dark-blue transition-colors">
              Explore all use cases
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 md:py-28 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-balance mb-6">
            Ready to close the communication gap?
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            See how ClinicalSim helps your learners and faculty practice the conversations that matter most.
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
            Have questions first?{" "}
            <Link href="/faq" className="text-cs-electric hover:text-white font-medium transition-colors inline-flex items-center">
              Read the FAQ
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </p>
          <p className="mt-4 text-sm text-white/70 font-light">
            Are you a researcher?{" "}
            <Link href="/research" className="text-cs-electric hover:text-white font-medium transition-colors inline-flex items-center">
              Apply to collaborate
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
