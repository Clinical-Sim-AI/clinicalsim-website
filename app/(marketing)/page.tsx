import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudienceCard } from "@/components/audience-card"
import { Reveal } from "@/components/reveal"
import { getHomepageSolutions } from "@/lib/solutions"
import { JsonLd } from "@/components/json-ld"
import { VideoObjectSchema } from "@/components/video-object-schema"
import { ArrowRight } from "lucide-react"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import {
  CATEGORY_DEFINITION,
  CATEGORY_LINE,
  POSITIONING_LONG,
  POSITIONING_ONE_LINER,
  POSITIONING_SUPPORT,
} from "@/lib/positioning"

const DemoVideoSection = dynamic(
  () => import("@/components/demo-video-section").then((m) => ({ default: m.DemoVideoSection }))
)

const HOME_DESCRIPTION = POSITIONING_LONG

export const metadata: Metadata = {
  title: {
    absolute: "Communication intelligence for health systems | ClinicalSim",
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    title: "Communication intelligence for health systems",
    description:
      "Healthcare teams practice with AI patients. ClinicalSim scores each encounter against the institution's standards and cites transcript evidence behind every score.",
    url: "https://clinicalsim.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClinicalSim, communication intelligence for health systems",
      },
    ],
  },
  twitter: {
    title: "Communication intelligence for health systems",
    description:
      "Healthcare teams practice with AI patients and leaders review the transcript evidence behind each score.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://clinicalsim.ai",
  },
}

/**
 * The one demo recording the homepage shows. Keeping the Loom id and metadata
 * in a single object keeps the visible player and the VideoObject JSON-LD in
 * lockstep when the video is swapped. uploadDate and duration come from Loom's
 * share-page metadata for this recording.
 *
 * uploadDate MUST be a full ISO 8601 datetime with a UTC offset. Search Console
 * flagged the earlier date-only "2026-06-28" twice under Videos, as "missing a
 * timezone" and as an invalid datetime value. Central time is the company
 * default, so the offset is -05:00 in CDT and -06:00 in CST.
 */
const DEMO_VIDEO = {
  embedUrl: "https://www.loom.com/embed/3eacd20486a74b5c80a4ab7ba60b0308",
  thumbnailUrl:
    "https://cdn.loom.com/sessions/thumbnails/3eacd20486a74b5c80a4ab7ba60b0308-1df353d4e4c664a3.gif",
  uploadDate: "2026-06-28T00:00:00-05:00",
  duration: "PT9M22S",
}

export default function HomePage() {
  const solutions = [...getHomepageSolutions()].sort((a, b) => {
    if (a.market === b.market) return 0
    return a.market === "health-system" ? -1 : 1
  })

  // Representative scenario types practiced on the platform (drawn from the
  // scenario library, breaking bad news through error disclosure).
  const conversationTypes = [
    "Patient service conversations",
    "Clinical and educational debriefing",
    "Breaking bad news",
    "Goals of care",
    "Informed consent",
    "Error disclosure",
    "High-stakes family meetings",
    "Delivering a new diagnosis",
    "Communicating uncertainty",
    "Giving corrective feedback",
    "Professionalism conversations",
    "History taking",
  ]

  // Four institutional uses, each paired with the standard it can score.
  const frameworkMap = [
    { stage: "Patient experience", framework: "Your service standards and scripts" },
    { stage: "Risk and patient safety", framework: "Your policies and communication elements" },
    { stage: "Graduate medical education", framework: "ACGME Milestones 2.0 and case frameworks" },
    { stage: "Simulation and debriefing", framework: "The debriefing framework your institution teaches" },
  ]

  // The three capabilities that define the platform.
  const differentiators = [
    {
      claim: "Your standard becomes the rubric",
      detail:
        "Institutions can add the service standards, policies, and rubrics they already use. Clinical cases name the physicians responsible for clinical review.",
    },
    {
      claim: "Every score cites the transcript",
      detail:
        "Leaders can read the speaker's words behind each rating instead of treating the score as a black box.",
    },
    {
      claim: "Reporting can follow the institution",
      detail:
        "Review an individual, a named cohort, or an anonymous unit view based on the access rules set before launch.",
    },
  ]

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Communication intelligence for health systems",
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
          {
            // The product itself, which nothing on the site declared. Every
            // field below restates published copy: featureList from /faq and
            // /methodology, audience from lib/audiences.ts, browserRequirements
            // from the /faq "devices-and-install" answer.
            //
            // Deliberately NO `offers` node. ClinicalSim publishes no list
            // price, and a priceless Offer is worse than no Offer: Google reads
            // it as an incomplete product listing rather than as restraint.
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": "https://clinicalsim.ai/#software",
            name: "ClinicalSim",
            url: "https://clinicalsim.ai",
            description: HOME_DESCRIPTION,
            applicationCategory: "EducationalApplication",
            applicationSubCategory: "Clinical simulation",
            operatingSystem: "Web browser",
            // `browserRequirements` is a WebApplication field, not a
            // SoftwareApplication one, and schema-dts rejects it here.
            softwareRequirements:
              "A modern web browser with microphone access. No download or installation.",
            inLanguage: "en",
            isPartOf: { "@id": "https://clinicalsim.ai/#website" },
            publisher: {
              "@type": "Organization",
              name: "ClinicalSim",
              url: "https://clinicalsim.ai",
            },
            featureList: [
              "Voice-based practice with AI patients",
              "Rubric-scored feedback citing verbatim transcript evidence",
              "Cases written and reviewed by named physicians",
              "Institution-specific service standards and policy rubrics",
              "Named cohort and anonymous unit reporting",
              "Feedback mapped to ACGME Milestones 2.0 and published communication frameworks",
              "Longitudinal progress tracking across repeated attempts",
              "Cohort progress views, progress reports, and exports for faculty",
            ],
            audience: {
              "@type": "Audience",
              audienceType: [
                "Patient experience leaders",
                "Risk and patient safety leaders",
                "Nursing education leaders",
                "Program directors",
                "DIOs and GME leadership",
                "Simulation center directors",
                "Clinical competency committees",
                "Medical school and UME leadership",
                "Faculty and clinician educators",
              ],
            },
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
              Communication intelligence for health systems
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
              Practice the conversation and see the evidence behind every score
            </h1>

            <p className="text-lg md:text-xl text-cs-cloud font-light mb-8">
              Clinicians and patient facing staff speak with AI patients on any
              device. ClinicalSim scores each encounter against the standards
              your institution already uses and cites the transcript behind
              every score.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/contact">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  Request a pilot
                  <ArrowRight />
                </Button>
              </Link>
              <Link href="/examples">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-transparent border border-white/25 text-white hover:bg-white/10 font-medium"
                >
                  See example feedback
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-cs-cloud/80 font-light">
              In pilot at 25 or more academic medical centers and children&apos;s hospitals.
            </p>
          </div>

          {/* Right column, evidence panel */}
          <div className="relative z-10 lg:justify-self-end w-full max-w-md">
            <div className="rounded-2xl border border-white/10 bg-cs-navy/40 p-6 md:p-8 backdrop-blur-sm">
              <p className="text-xl font-medium text-cs-electric mb-6">
                Leaders can inspect every score
              </p>
              <dl className="space-y-6">
                <div>
                  <dt className="text-sm text-cs-cloud font-light mb-1">Scoring evidence</dt>
                  <dd className="text-2xl md:text-3xl font-light text-white">Traceable to the transcript</dd>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <dt className="text-sm text-cs-cloud font-light mb-1">Institution standard</dt>
                  <dd className="text-2xl md:text-3xl font-light text-white">Scored as defined</dd>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <dt className="text-sm text-cs-cloud font-light mb-1">Reporting</dt>
                  <dd className="text-2xl md:text-3xl font-light text-white">Person, cohort, or unit</dd>
                </div>
              </dl>
              <p className="mt-6 pt-6 border-t border-white/10 text-sm text-cs-cloud font-light leading-relaxed">
                Institutions set access and reporting rules before launch. Formative scores are not intended for employment decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Demo video, sits directly under the hero so a program director can
           see the product inside the first three screenfuls. */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-5xl mx-auto">
          {/* Fields read off Loom's oEmbed and share metadata for this video
              (DEMO_VIDEO above). transcript is omitted until a real one exists. */}
          <VideoObjectSchema
            name="ClinicalSim demo: counseling vaccine hesitancy for a two-month-old"
            description="A learner works through a vaccine hesitancy conversation with a ClinicalSim AI patient, then reviews the rubric-scored feedback and the transcript evidence behind each score."
            thumbnailUrl={DEMO_VIDEO.thumbnailUrl}
            uploadDate={DEMO_VIDEO.uploadDate}
            embedUrl={DEMO_VIDEO.embedUrl}
            duration={DEMO_VIDEO.duration}
          />
          <DemoVideoSection
            title="See ClinicalSim in action"
            description="Hear a learner work through a vaccine hesitancy conversation with an AI patient, and see the rubric-scored feedback that follows."
            loomUrl={`${DEMO_VIDEO.embedUrl}?t=0`}
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
                ClinicalSim, defined
              </p>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight leading-snug text-cs-navy text-balance">
                {CATEGORY_LINE}
              </h2>
              <p className="mt-6 text-base md:text-lg text-cs-dark-blue font-light leading-relaxed text-pretty">
                {CATEGORY_DEFINITION} {POSITIONING_SUPPORT}
              </p>
            </div>

            {/* Framework mapping, the dense paragraph, made scannable. Stage
                above framework so the full stage names never collide. */}
            <div className="w-full lg:pt-1">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray mb-4">
                Across the health system
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
                {POSITIONING_ONE_LINER}
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

      {/* 4. Use cases */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-cs-navy mb-4">
              Start where communication already has an owner
            </h2>
            <p className="text-lg text-cs-dark-blue font-light max-w-2xl mx-auto">
              Patient experience, risk, safety, simulation, and medical education teams can begin with one use case and use the same platform as the work expands.
            </p>
          </div>

          {/* Flex rather than a fixed column count. The registry keeps growing, and a
              wrapped trailing row centers itself instead of hanging off the left edge. */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {solutions.map((solution, index) => (
              <Reveal
                key={solution.slug}
                delay={index * 80}
                className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] [&>a]:h-full"
              >
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

          {/* Two details for system and program reviewers. */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-cs-navy/15 pt-10">
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-cs-dark-blue mb-3">
                Unit patterns without employee rankings
              </h3>
              <p className="text-base text-cs-dark-blue font-light leading-relaxed">
                Institutions can use anonymous participant IDs and aggregate unit reports. Named access should follow the training policy and labor agreements set before staff participate.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-cs-dark-blue mb-3">
                Research exports without outcome claims
              </h3>
              <p className="text-base text-cs-dark-blue font-light leading-relaxed">
                Structured aggregate exports can support an approved comparison with institution held patient experience data. ClinicalSim does not predict HCAHPS, Qualtrics, readmissions, claims, or safety events.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-cs-navy/15 pt-8">
            <p className="text-base text-cs-dark-blue font-light">
              Built for patient experience, risk, safety, nursing education, simulation, and GME teams.
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

      {/* 5. Proof band, faculty first, then learners. Faculty skepticism is
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
                Request a pilot
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Final CTA section */}
      <section className="px-6 py-20 md:py-28 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-balance mb-6">
            Bring one team, one standard, and one reporting question
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            We will map what a spoken encounter can score, what it cannot, and how the results should be reported before the pilot begins.
          </p>
          <Link href="/contact">
            <Button
              variant="accent"
              size="xl"
            >
              Request a pilot
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
