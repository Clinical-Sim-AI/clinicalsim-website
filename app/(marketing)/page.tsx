import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StatHighlight } from "@/components/stat-highlight"
import { AudienceCard } from "@/components/audience-card"
import { RotatingText } from "@/components/rotating-text"
import { Reveal } from "@/components/reveal"
import { CountUp } from "@/components/count-up"
import { getAllSolutions } from "@/lib/solutions"
import { JsonLd } from "@/components/json-ld"
import { ArrowRight } from "lucide-react"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"

const DemoVideoSection = dynamic(
  () => import("@/components/demo-video-section").then((m) => ({ default: m.DemoVideoSection }))
)

const HOME_DESCRIPTION =
  "Communication is medicine's most performed procedure and its least measured. Voice-based AI simulation to practice and score it at every stage of a medical career, from undergraduate medical education through residency, fellowship, and faculty development, with rubric-scored feedback mapped to ACGME Milestones 2.0 for residents and fellows."

export const metadata: Metadata = {
  title: {
    absolute: "AI Clinical Simulation for Medical Communication | ClinicalSim",
  },
  description: HOME_DESCRIPTION,
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
  const solutions = getAllSolutions()

  // Representative scenario types practiced on the platform (drawn from the
  // scenario library, breaking bad news through error disclosure).
  const conversationTypes = [
    "Breaking bad news",
    "Goals-of-care discussions",
    "Informed consent",
    "Error disclosure",
    "High-stakes family meetings",
    "Delivering a new diagnosis",
    "Communicating uncertainty",
    "Giving difficult feedback",
    "Professionalism conversations",
    "History-taking",
  ]

  // The stages of the medical-education continuum the platform serves, each
  // paired with the published framework it is scored against. Split out of the
  // definition paragraph so the mapping is scannable. Stage names are spelled
  // out in full because AI search extracts these rows on their own.
  const frameworkMap = [
    { stage: "Undergraduate medical education", framework: "AAMC Foundational Competencies" },
    { stage: "Graduate medical education, residency and fellowship", framework: "ACGME Milestones 2.0" },
    { stage: "Faculty development", framework: "Pendleton and SBI feedback frameworks" },
  ]

  // The three claims that differentiate the platform. Each is documented case
  // by case on the methodology page.
  const differentiators = [
    {
      claim: "Authored by named physicians",
      detail:
        "Fellowship program directors and simulation directors write the cases, and they put their names on them.",
    },
    {
      claim: "Anchored to a published framework",
      detail:
        "Every case maps to a specific published competency set or communication framework, not to a rubric we invented.",
    },
    {
      claim: "Traceable to the transcript",
      detail:
        "Every score cites a verbatim line from what the learner actually said, so a faculty member can check the rating against the evidence.",
    },
  ]

  const stats = [
    {
      value: "81%",
      label: "of program leaders have no objective way to track whether a flagged trainee improves",
      source: "ClinicalSim national needs assessment*",
      variant: "blue" as const,
    },
    {
      value: "96%",
      label: "want to pilot an AI-driven remediation tool",
      source: "ClinicalSim national needs assessment*",
      variant: "navy" as const,
    },
    {
      value: "29.6",
      label: "mean specialist contact hours in one clinical reasoning remediation program",
      source: "Guerrasio and Aagaard, J Gen Intern Med, 2014",
      variant: "blue" as const,
    },
    {
      value: "93%",
      label: "of programs handled a communication remediation case in the past three years",
      source: "CERA survey of family medicine program directors",
      variant: "navy" as const,
    }
  ]

  // Institution-level exposure. Only publicly sourced, individually citable
  // figures live here. The composite national-cost estimate is deliberately
  // not on this page.
  const exposureLines = [
    {
      value: "40%",
      label: "of malpractice cases now involve a communication failure, up from 30% a decade ago",
      source: "Candello 2025 Benchmarking Report",
    },
    {
      value: "$320-563M",
      label: "a year in readmission penalties, hitting roughly three quarters of evaluated hospitals",
      source: "KFF and Definitive Healthcare analyses of CMS data",
    },
  ]

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "AI Clinical Simulation for Medical Communication",
            description: HOME_DESCRIPTION,
            url: "https://clinicalsim.ai",
            dateModified: PAGE_DATE_MODIFIED.home,
            isPartOf: {
              "@type": "WebSite",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
          },
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
      {/* 1. Hero Section - Dark Blue per brand */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28 lg:py-32 bg-cs-dark-blue text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left column, message + CTAs */}
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
              <Link href="/methodology">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-transparent border border-white/25 text-white hover:bg-white/10 font-medium"
                >
                  See how scoring works
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-cs-cloud/80 font-light">
              In pilot at 20+ academic medical centers and children&apos;s hospitals.
            </p>
          </div>

          {/* Right column, evidence panel */}
          <div className="relative z-10 lg:justify-self-end w-full max-w-md">
            <div className="rounded-2xl border border-white/10 bg-cs-navy/40 p-6 md:p-8 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-cs-electric mb-6">
                What programs can inspect
              </p>
              <dl className="space-y-6">
                <div>
                  <dt className="text-sm text-cs-cloud font-light mb-1">Scoring evidence</dt>
                  <dd className="text-2xl md:text-3xl font-light text-white">Traceable to the transcript</dd>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <dt className="text-sm text-cs-cloud font-light mb-1">Framework alignment</dt>
                  <dd className="text-2xl md:text-3xl font-light text-white">Named on every case</dd>
                </div>
              </dl>
              <p className="mt-6 pt-6 border-t border-white/10 text-sm text-cs-cloud font-light leading-relaxed">
                Faculty can review the cited transcript evidence behind each score and see which published framework the case uses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Demo video, sits directly under the hero so a program director can
           see the product inside the first three screenfuls. */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-5xl mx-auto">
          <DemoVideoSection
            title="See ClinicalSim in action"
            description="Hear a learner work through a vaccine hesitancy conversation with an AI patient, and see the rubric-scored feedback that follows."
            loomUrl="https://www.loom.com/embed/3eacd20486a74b5c80a4ab7ba60b0308?t=0"
          />
        </div>
      </section>

      {/* 3. Definition + proof + scenarios, stacked bands. Definition beside
           the framework mapping, then the three differentiators as a 3-up row,
           then the scenario list. */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Band 1, definition and framework mapping */}
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray mb-4">
                What is ClinicalSim?
              </p>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight leading-snug text-cs-navy text-balance">
                ClinicalSim is a voice-based AI clinical simulation platform for practicing and measuring clinical communication, the hardest competency to teach, train, and measure.
              </h2>
              <p className="mt-6 text-base md:text-lg text-cs-dark-blue font-light leading-relaxed text-pretty">
                The same engine and dashboard serve medical students, residents, fellows, and faculty, with rubric-scored practice mapped to the framework that fits each stage.
              </p>
            </div>

            {/* Framework mapping, the dense paragraph, made scannable. Stage
                above framework so the full stage names never collide. */}
            <div className="w-full lg:pt-1">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray mb-4">
                Across the training continuum
              </p>
              <dl className="border-t border-cs-gray">
                {frameworkMap.map((item) => (
                  <div key={item.stage} className="border-b border-cs-gray py-3.5">
                    <dt className="text-sm font-medium text-cs-navy text-pretty">{item.stage}</dt>
                    <dd className="mt-1 text-sm text-cs-dark-blue font-light text-pretty">
                      Scored against {item.framework}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-cs-dark-gray font-light leading-relaxed">
                Every session produces documented feedback.
              </p>
            </div>
          </div>

          {/* Band 2, the three differentiators */}
          <div className="mt-14 md:mt-16 border-t border-cs-gray pt-10 md:pt-12">
            <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
              {differentiators.map((item) => (
                <li key={item.claim}>
                  <p className="text-base font-medium text-cs-navy leading-snug text-balance">
                    {item.claim}
                  </p>
                  <p className="mt-2.5 text-sm md:text-base text-cs-dark-blue font-light leading-relaxed text-pretty">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-cs-dark-gray font-light">
              All three are documented case by case on our{" "}
              <Link href="/methodology" className="text-cs-dark-blue font-medium hover:text-cs-navy transition-colors">
                methodology page
              </Link>
              .
            </p>
          </div>

          {/* Band 3, scenarios. The training continuum lives in the framework
              mapping above, so it is not repeated here. */}
          <div className="mt-14 md:mt-16 border-t border-cs-gray pt-10 md:pt-12">
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
          </div>
        </div>
      </section>

      {/* 4. The gap, the problem, the four program-level stats, and the two
           institution-level exposure figures that used to sit in the cost section. */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-balance text-cs-navy mb-4">
              Communication is the competency everyone remediates and no one has tools for.
            </h2>
            <p className="text-lg text-cs-dark-blue font-light max-w-3xl mx-auto">
              A resident learns to place a central line by watching one, doing one, and repeating it until a supervisor signs off. The same resident finishes training with 3 to 4 live practice conversations, even though health systems worldwide already spend around $3 billion a year on simulation. Since Step 2 CS retired in 2021, no program has a scalable way to score the conversation against ICS milestones or EPAs.
            </p>
            <p className="mt-5 text-sm text-cs-dark-gray font-light max-w-3xl mx-auto">
              Practice volume from the ClinicalSim national needs assessment.* Simulation spend from healthcare simulation market reports, 2024.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <Reveal key={index} delay={index * 100}>
                <StatHighlight
                  value={stat.value}
                  label={stat.label}
                  source={stat.source}
                  variant={stat.variant}
                />
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-sm text-cs-dark-gray font-light text-center max-w-3xl mx-auto">
            * Based on the ClinicalSim national needs assessment of GME program leaders. Publication in progress.
          </p>

          {/* Institution-level exposure, a plain two-up strip rather than two
               more stat cards, so the four numbers above stay dominant. */}
          <div className="mt-12 md:mt-16 border-t border-cs-navy/15 pt-10">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray mb-8">
              What the same failure already costs an institution
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              {exposureLines.map((line, index) => (
                <Reveal key={line.value} delay={index * 120}>
                  <div className="text-3xl md:text-4xl font-medium text-cs-dark-blue tabular-nums leading-tight">
                    <CountUp value={line.value} />
                  </div>
                  <p className="mt-2.5 text-base text-cs-dark-blue font-light leading-snug">
                    {line.label}
                  </p>
                  <p className="mt-2 text-sm text-cs-dark-gray font-light">
                    {line.source}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. 1:1 to 1:many, capturing expert judgment instead of rationing it.
           Navy, sitting between the gap (cloud) and why now (white). */}
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
              Communication is still taught the way it was fifty years ago, by an expert who watches, corrects, and makes you do it again. That method still dominates: in our national needs assessment, 78% of program leaders rely on direct observation by faculty, which is the most expert-hour-intensive approach there is, and the learner who needs the most repetitions is the one who gets the fewest.
            </p>
            <p className="mt-5 text-base md:text-lg text-cs-cloud font-light leading-relaxed">
              Physicians who direct simulation and residency programs author the cases and the rubrics, so a program can give every learner unlimited scored practice against that judgment instead of rationing it. Faculty hours go to coaching the learners who need coaching rather than facilitating every encounter, which extends a standardized patient program rather than replacing it.
            </p>
            <p className="mt-8 text-2xl md:text-3xl font-light text-cs-electric">
              The expert stays in the room.
            </p>
            <p className="mt-6 text-xs text-white/60 font-light">
              Method prevalence from the ClinicalSim national needs assessment of GME program leaders. Publication in progress.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Why Now Section, editorial two-column */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          {/* Left, sticky heading */}
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

          {/* Right, numbered reasons */}
          <ol className="space-y-10">
            {[
              {
                title: "Step 2 CS is gone.",
                body: "In 2021, USMLE permanently discontinued Step 2 CS, the only national standardized assessment of clinical communication skills.",
              },
              {
                title: "Milestones 2.0 raised the bar.",
                body: "Since 2022, Milestones 2.0 has required every program to grade each resident and fellow on interpersonal and communication skills twice a year.",
              },
              {
                title: "Voice AI can hold the conversation now.",
                body: "No technology could hold a real clinical conversation with hesitations and emotion in it until recently, and it shows in the scores: doctor communication rose 0.8 points on HCAHPS between 2007 and 2019, the smallest gain of any domain (Beckett et al., Medical Care, 2024).",
              },
              {
                title: "Programs asked for this.",
                body: "In our national needs assessment, 81% of program leaders said they have no objective way to tell whether a flagged trainee is improving, and 96% said they would pilot an AI-driven remediation tool.",
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

        <p className="max-w-6xl mx-auto mt-10 text-sm text-cs-dark-gray font-light">
          Survey figures from the ClinicalSim national needs assessment of GME program leaders. Publication in progress.
        </p>
      </section>

      {/* 7. One Platform, Many Conversations - use cases as peers */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
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
            {solutions.map((solution, index) => (
              <Reveal key={solution.slug} delay={index * 80} className="h-full [&>a]:h-full">
                <AudienceCard
                  brandIcon={solution.icon}
                  title={solution.title}
                  subtitle={solution.subtitle}
                  bullets={solution.cardBullets}
                  href={`/solutions/${solution.slug}`}
                  variant={solution.colorVariant}
                />
              </Reveal>
            ))}
          </div>

          {/* The two product points that aren't already covered by the hero,
               the definition section, or the expert section. */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-cs-navy/15 pt-10">
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-cs-dark-blue mb-3">
                CCC-ready documentation
              </h3>
              <p className="text-base text-cs-dark-blue font-light leading-relaxed">
                The ACGME milestone set is a 32-page PDF that faculty score by hand, line by line, for every trainee, twice a year. Every ClinicalSim session returns those same milestones scored from the trainee&apos;s own words, with each rating citing a verbatim line from the transcript.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-cs-dark-blue mb-3">
                Psychologically safe practice
              </h3>
              <p className="text-base text-cs-dark-blue font-light leading-relaxed">
                Remediation carries stigma. Learners practice high-stakes conversations privately, with no observers, no scheduling, and no performance anxiety, repeating a case as many times as they need in an environment designed for growth.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-cs-navy/15 pt-8">
            <p className="text-base text-cs-dark-blue font-light">
              Built for program directors, DIOs, simulation centers, and clinical competency committees.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <Link
                href="/insights/eol-communication-training-measurement-gap"
                className="inline-flex items-center text-cs-dark-blue font-medium hover:text-cs-navy transition-colors whitespace-nowrap"
              >
                Read the essay
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center text-cs-dark-blue font-medium hover:text-cs-navy transition-colors whitespace-nowrap"
              >
                Explore all use cases
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Proof band, faculty first, then learners. Faculty skepticism is
           the obstacle, so that quote leads. */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-cs-navy">
              What clinicians are saying
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-2xl md:text-3xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  I just tried it out and it was like talking to a real patient.
                </p>
                <cite className="text-base text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-dark-blue pl-4">
                  Faculty, Johns Hopkins University School of Medicine
                </cite>
              </blockquote>
            </div>

            <div className="relative mt-12 md:mt-16">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-xl md:text-2xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  It was helpful to have time to think and reflect without feeling the pressure of a person across from you expecting a response.
                </p>
                <cite className="text-base text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-dark-blue pl-4">
                  Clinician, Pilot Study Participant
                </cite>
              </blockquote>
            </div>

            <div className="relative mt-12 md:mt-16">
              <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">&ldquo;</div>
              <blockquote className="relative pl-8 pt-4">
                <p className="text-xl md:text-2xl text-cs-dark-blue font-light leading-relaxed mb-4">
                  I had to tell a patient&apos;s father that his daughter would need long-term oxygen support through a tracheostomy. Before speaking with him, I practiced the conversation on ClinicalSim. It gave me confidence and feedback on my tone and delivery. Having difficult conversations can be extremely stressful, but having the practice beforehand allowed me to give appropriate time for silence and empathy.
                </p>
                <cite className="text-base text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-dark-blue pl-4">
                  Nurse practitioner, Advocate Health
                </cite>
              </blockquote>
            </div>
          </div>

          <div className="text-center mt-12 md:mt-14">
            <Link href="/contact">
              <Button size="xl">
                Request a Pilot
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Final CTA Section */}
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
        </div>
      </section>
    </>
  )
}
