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
    "Communication is medicine's most performed procedure and its least measured. Voice-based AI simulation to practice and score it at every stage of a medical career, from undergraduate medical education through residency, fellowship, and faculty development, with rubric-scored feedback mapped to ACGME Milestones 2.0 for residents and fellows.",
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
        alt: "ClinicalSim, AI clinical simulation for medical communication",
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
      description: "The same engine, rubric, and dashboard serve medical students, residents, fellows, and practicing faculty, from a first patient history to leading a goals-of-care meeting. Longitudinal curriculum, faculty development, and remediation all run on one platform.",
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
      brandIcon: "medal-star" as const,
      title: "Built by the Physicians Who Write the Standards",
      description: "Our cases and rubrics are authored by fellowship program directors, simulation directors, and a named author on the Society of Critical Care Medicine's 2026 End-of-Life Care Guidelines, so a learner is scored against the same judgment a program director would apply. ClinicalSim extends your standardized patient program rather than replacing it.",
      variant: "default" as const,
    },
    {
      brandIcon: "ribbon-check" as const,
      title: "CCC-Ready Documentation",
      description: "The ACGME milestone set is a 32-page PDF that faculty score by hand, line by line, for every trainee, twice a year. Every ClinicalSim session returns those same milestones scored from the trainee's own words, with each rating citing a verbatim line from the transcript.",
      variant: "navy" as const,
    },
    {
      brandIcon: "chat-square-heart" as const,
      title: "Psychologically-Safe Practice",
      description: "Remediation carries stigma. Learners practice high-stakes conversations privately, with no observers, no scheduling, and no performance anxiety, repeating a case as many times as they need in an environment designed for growth.",
      variant: "navy" as const,
    }
  ]

  const stats = [
    {
      value: "22 of 27",
      label: "program leaders have no objective way to track whether a flagged trainee improves",
      source: "ClinicalSim national needs assessment, n=27, publication in progress",
      variant: "blue" as const,
    },
    {
      value: "26 of 27",
      label: "want to pilot an AI-driven remediation tool",
      source: "ClinicalSim national needs assessment, n=27, publication in progress",
      variant: "navy" as const,
    },
    {
      value: "29-45",
      label: "faculty hours consumed per remediation case",
      source: "Guerrasio and Aagaard 2014, mean 29.6",
      variant: "blue" as const,
    },
    {
      value: "93%",
      label: "of programs handled a communication remediation case in the past three years",
      source: "CERA survey of family medicine program directors",
      variant: "navy" as const,
    }
  ]

  // The publicly sourced figures behind the $35B to $55B composite. Only
  // figures cleared as public-safe appear here: the deck's per-pool estimates
  // for safety events, readmissions, burnout, and unbilled conversations are
  // components of an overlap-adjusted composite and are not published
  // individually. Those four lines are named in prose instead.
  const costLines = [
    {
      value: "40%",
      label: "of malpractice cases now involve a communication failure, up from 30% a decade ago",
      source: "Candello 2025 Benchmarking Report",
      asterisk: false,
    },
    {
      value: "$19.5B",
      label: "a year in US nurse turnover, from 324,090 departures at $60,090 each",
      source: "NSI 2026",
      asterisk: true,
    },
    {
      value: "$1.7B",
      label: "redistributed annually through Medicare value-based purchasing, where patient experience is 25% of the score",
      source: "CMS FY2026 IPPS final rule",
      asterisk: false,
    },
    {
      value: "$320-563M",
      label: "a year in readmission penalties, hitting roughly three quarters of evaluated hospitals",
      source: "KFF and Definitive Healthcare analyses of CMS data",
      asterisk: false,
    },
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
              "Voice-based AI clinical simulation platform to practice and measure clinical communication across the medical-education continuum, covering undergraduate medical education, residency and fellowship, communication remediation, and faculty development. Rubric-scored practice for breaking bad news, goals-of-care, informed consent, error disclosure, and family meetings, mapped to ACGME Milestones 2.0 for residents and fellows.",
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
              Medicine&apos;s most performed procedure is also its <span className="text-cs-electric font-medium">least measured</span>.
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

            <p className="mt-8 text-sm text-cs-cloud/80 font-light">
              In pilot at 20+ academic medical centers and children&apos;s hospitals.
            </p>
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

            <ul className="mt-7 space-y-3.5 border-t border-cs-gray pt-6">
              <li className="text-base text-cs-dark-blue font-light leading-relaxed">
                <span className="font-medium">Authored by named physicians.</span>{" "}
                Fellowship program directors and simulation directors write the cases, and they put their names on them.
              </li>
              <li className="text-base text-cs-dark-blue font-light leading-relaxed">
                <span className="font-medium">Anchored to a published framework.</span>{" "}
                Every case maps to a specific published competency set or communication framework, not to a rubric we invented.
              </li>
              <li className="text-base text-cs-dark-blue font-light leading-relaxed">
                <span className="font-medium">Traceable to the transcript.</span>{" "}
                Every score cites a verbatim line from what the learner actually said, so a faculty member can check the rating against the evidence.
              </li>
            </ul>
            <p className="mt-5 text-sm text-cs-dark-gray font-light">
              All three are documented case by case on our{" "}
              <Link href="/methodology" className="text-cs-dark-blue font-medium hover:text-cs-navy transition-colors">
                methodology page
              </Link>
              .
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

      {/* What communication failure already costs — the whole problem, not one line of it */}
      <section className="px-6 py-16 md:py-24 bg-cs-navy text-white">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-balance mb-10">
              Every line of the hospital budget already pays for communication failure.
            </h2>
            <div className="text-5xl md:text-7xl font-medium text-cs-electric tabular-nums leading-none">
              $35B to $55B
            </div>
            <p className="mt-4 text-base md:text-lg text-cs-cloud font-light">
              a year across US healthcare, on eight lines a CFO already answers for: malpractice, safety events, readmissions, patient-survey pay, nurse turnover, physician burnout, unbilled conversations, and the faculty hours spent remediating trainees.
            </p>
            <p className="mt-5 text-sm text-white/70 font-light max-w-xl mx-auto leading-relaxed">
              That range is a composite of the communication-attributable share of each pool, adjusted for the overlap between them. It is not the sum of the figures below. Drawn from Candello 2025, AHRQ, CMS, NSI 2026, and Han et al., Annals of Internal Medicine 2019.
            </p>
          </div>

          <p className="mt-14 mb-8 text-sm font-medium uppercase tracking-[0.16em] text-cs-electric text-center">
            Four of those lines, already priced in public data
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {costLines.map((line) => (
              <div key={line.label}>
                <div className="text-2xl md:text-3xl font-medium text-white tabular-nums leading-tight">
                  {line.value}
                  {line.asterisk && (
                    <span className="text-cs-electric" aria-hidden="true">
                      *
                    </span>
                  )}
                </div>
                <p className="mt-2.5 text-sm text-white/90 font-light leading-snug">
                  {line.label}
                </p>
                <p className="mt-2 text-xs text-white/60 font-light leading-snug">
                  {line.source}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-white/60 font-light">
            * Communication is a leading driver of nurse turnover, not the sole cause.
          </p>

          <p className="mt-12 max-w-3xl text-lg md:text-xl text-cs-cloud font-light leading-relaxed">
            Every one of those numbers prices the failure after it happens. The skill that causes it has never been measured, so it has never been priced.
          </p>
        </div>
      </section>

      {/* Problem Statement Section - Full-width with stats */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-balance text-cs-navy mb-4">
              Communication is the hardest competency to teach, train, and measure.
            </h2>
            <p className="text-lg text-cs-dark-blue font-light max-w-3xl mx-auto">
              A resident learns to place a central line by watching one, doing one, and repeating it until a supervisor signs off. The same resident finishes training with 3 to 4 live practice conversations, even though health systems worldwide already spend around $3 billion a year on simulation. Since Step 2 CS retired in 2021, no program has a scalable way to score the conversation against ICS milestones or EPAs.
            </p>
            <p className="mt-5 text-sm text-cs-dark-gray font-light max-w-3xl mx-auto">
              Practice volume from the ClinicalSim national needs assessment of GME program leaders, n=27, publication in progress. Simulation spend from healthcare simulation market reports, 2024.
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
              Four things changed at once, and together they made communication assessment both measurable and mandatory.
            </p>
          </div>

          {/* Right — numbered reasons */}
          <ol className="space-y-10">
            {[
              {
                title: "Step 2 CS is gone.",
                body: "In 2021, USMLE permanently discontinued Step 2 CS, the only national standardized assessment of clinical communication skills. Programs now bear sole responsibility for communication assessment with inconsistent tools and no external benchmark.",
              },
              {
                title: "Milestones 2.0 raised the bar.",
                body: "Since 2022, Milestones 2.0 has required every program to grade each resident and fellow on interpersonal and communication skills twice a year, against a framework shared across specialties. The requirement is universal. The objective benchmark to meet it is not.",
              },
              {
                title: "Voice AI can hold the conversation now.",
                body: "EHRs, secure messaging, and telehealth all scaled over the last decade while communication training stayed hand made, because no technology could hold a real clinical conversation with hesitations and emotion in it. It shows in the scores: doctor communication rose 0.8 points on HCAHPS between 2007 and 2019, the smallest gain of any domain (Beckett et al., Medical Care, 2024).",
              },
              {
                title: "Programs asked for this.",
                body: "In our national needs assessment of GME program leaders, 22 of 27 said they have no objective way to tell whether a flagged trainee is improving, 26 of 27 said they would pilot an AI-driven remediation tool, and none rated their current approach better than moderately effective (ClinicalSim, n=27, publication in progress).",
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

      {/* 1:1 to 1:many — capturing expert judgment instead of rationing it.
           Navy, not white or cloud: the body sections strictly alternate white
           and cloud, so a single insertion between why-now (cloud) and the
           platform section (white) has to be a dark surface or every
           background below it has to flip. */}
      <section className="px-6 py-16 md:py-24 bg-cs-navy text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24 lg:self-start max-w-md">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-electric mb-4">
              What changes
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-balance">
              One expert used to train one learner.
            </h2>
          </div>

          <div className="lg:border-l lg:border-white/15 lg:pl-12 xl:pl-16">
            <p className="text-base md:text-lg text-cs-cloud font-light leading-relaxed">
              Communication is still taught the way it was fifty years ago, by an expert who watches, corrects, and makes you do it again. That method still dominates: in our national needs assessment of GME program leaders, 78% rely on direct observation by faculty, which is the most expert-hour-intensive approach there is, and the learner who needs the most repetitions is the one who gets the fewest.
            </p>
            <p className="mt-5 text-base md:text-lg text-cs-cloud font-light leading-relaxed">
              Physicians who direct simulation and residency programs author the cases and the rubrics, so a program can give every learner unlimited scored practice against that judgment instead of rationing it. Faculty hours go to coaching the learners who need coaching rather than facilitating every encounter, which extends a standardized patient program rather than replacing it.
            </p>
            <p className="mt-8 text-2xl md:text-3xl font-light text-cs-electric">
              The expert stays in the room.
            </p>
            <p className="mt-6 text-xs text-white/60 font-light">
              Method prevalence from the ClinicalSim national needs assessment of GME program leaders, n=27, publication in progress.
            </p>
          </div>
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
                  The gap between confidence and competence doesn&apos;t close at graduation.
                </h3>
                <p className="text-base text-white/85 font-light leading-relaxed">
                  Confidence isn&apos;t evidence of skill. It is often just the absence of feedback, which is why the clinicians furthest from their last observed encounter are the least likely to know where they stand. The same structured practice that develops trainees can keep practicing clinicians sharp.
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
          <p className="text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-cs-electric mb-6">
            Billions have gone into clinical AI. Almost none of it trains the human side of the conversation.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-balance mb-6">
            Every clinician should get to practice the hardest conversations before they happen.
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Programs at 20 or more institutions are running scored practice on the conversations their trainees report the least confidence having. Tell us about your program and we&apos;ll show you what a cohort looks like after one cycle.
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
