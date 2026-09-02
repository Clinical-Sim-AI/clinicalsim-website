import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AudienceCard } from "@/components/audience-card"
import { JsonLd } from "@/components/json-ld"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { VideoObjectSchema } from "@/components/video-object-schema"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { getFeaturedFrameworks } from "@/lib/frameworks"
import { HOMEPAGE_PUBLIC_COPY } from "@/lib/homepage-content"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { POSITIONING_LONG } from "@/lib/positioning"
import { getHomepageSolutionGroups } from "@/lib/solutions"

const DemoVideoSection = dynamic(
  () => import("@/components/demo-video-section").then((module) => ({
    default: module.DemoVideoSection,
  })),
)

const HOME_DESCRIPTION = POSITIONING_LONG

export const metadata: Metadata = {
  title: {
    absolute: "Communication intelligence for health systems | ClinicalSim",
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    title: "Communication intelligence for health systems",
    description: HOME_DESCRIPTION,
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
    description: HOME_DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://clinicalsim.ai",
  },
}

/**
 * The homepage demo recording. The visible player and VideoObject data share
 * this object so a future video swap cannot leave stale schema behind.
 */
const DEMO_VIDEO = {
  embedUrl: "https://www.loom.com/embed/3eacd20486a74b5c80a4ab7ba60b0308",
  thumbnailUrl:
    "https://cdn.loom.com/sessions/thumbnails/3eacd20486a74b5c80a4ab7ba60b0308-1df353d4e4c664a3.gif",
  uploadDate: "2026-06-28T00:00:00-05:00",
  duration: "PT9M22S",
}

const CONVERSATION_TYPES = [
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

export default function HomePage() {
  const featuredFrameworks = getFeaturedFrameworks()
  const [healthSystemGroup, medicalEducationGroup] =
    getHomepageSolutionGroups()

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
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": "https://clinicalsim.ai/#software",
            name: "ClinicalSim",
            url: "https://clinicalsim.ai",
            description: HOME_DESCRIPTION,
            applicationCategory: "EducationalApplication",
            applicationSubCategory: "Clinical simulation",
            operatingSystem: "Web browser",
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
              "Spoken conversations with AI patients, scored against a published framework or the institution's own standard",
              "Ready to use cases based on published clinical frameworks",
              "Institution supplied policies, service standards, scripts, and rubrics",
              "Rubric scores with transcript evidence",
              "Assessment report by person, cohort, or anonymous unit",
              "Individual, cohort, and anonymous unit reporting",
              "Cases written and reviewed by named physicians",
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

      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-20 text-white md:py-28 lg:py-32">
        <Waveform seed="home-hero" variant="bars" align="right" opacity={0.2} animate />
        <Waveform
          seed="home-hero-flow"
          variant="flow"
          align="right"
          opacity={0.3}
          className="h-1/4"
          animate
        />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cs-electric md:text-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-cs-electric"
                aria-hidden="true"
              />
              {HOMEPAGE_PUBLIC_COPY.hero.eyebrow}
            </p>

            <h1 className="mb-6 text-balance text-4xl font-light leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
              {HOMEPAGE_PUBLIC_COPY.hero.headline}
            </h1>

            <p className="mb-8 text-lg font-light text-cs-cloud md:text-xl">
              {HOMEPAGE_PUBLIC_COPY.hero.body}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href="#how-an-assessment-works">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  {HOMEPAGE_PUBLIC_COPY.hero.primaryCta}
                  <ArrowRight />
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="inverse" size="xl" className="w-full sm:w-auto">
                  {HOMEPAGE_PUBLIC_COPY.hero.secondaryCta}
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm font-light text-cs-cloud/80">
              {HOMEPAGE_PUBLIC_COPY.hero.pilot}
            </p>
          </div>

          <div className="relative z-10 w-full max-w-md lg:justify-self-end">
            <dl className="rounded-2xl border border-white/10 bg-cs-navy/40 p-6 backdrop-blur-sm md:p-8">
              {HOMEPAGE_PUBLIC_COPY.evidencePanel.map((item, index) => (
                <div
                  key={item.label}
                  className={index === 0 ? "" : "mt-6 border-t border-white/10 pt-6"}
                >
                  <dt className="mb-1 text-sm font-light text-cs-cloud">
                    {item.label}
                  </dt>
                  <dd className="text-2xl font-light text-white md:text-3xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cs-cloud px-6 py-16 md:py-24">
        <Waveform tone="light" align="edges" opacity={0.3} seed="home-seam-video" className="h-16" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <VideoObjectSchema
            name="ClinicalSim demo: counseling vaccine hesitancy for a two-month-old"
            description="A learner works through a vaccine hesitancy conversation with a ClinicalSim AI patient, then reviews the rubric scores and cited transcript excerpts."
            thumbnailUrl={DEMO_VIDEO.thumbnailUrl}
            uploadDate={DEMO_VIDEO.uploadDate}
            embedUrl={DEMO_VIDEO.embedUrl}
            duration={DEMO_VIDEO.duration}
          />
          <DemoVideoSection
            title={HOMEPAGE_PUBLIC_COPY.demo.heading}
            description={HOMEPAGE_PUBLIC_COPY.demo.body}
            loomUrl={`${DEMO_VIDEO.embedUrl}?t=0`}
          />
        </div>
      </section>

      <section
        id="how-an-assessment-works"
        className="scroll-mt-20 bg-white px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 max-w-3xl md:mb-12">
            <h2 className="mb-4 text-balance text-3xl font-light tracking-tight text-cs-navy md:text-4xl">
              {HOMEPAGE_PUBLIC_COPY.howItStarts.heading}
            </h2>
            <p className="text-lg font-light text-cs-dark-blue/70">
              {HOMEPAGE_PUBLIC_COPY.howItStarts.intro}
            </p>
          </div>

          <div className="space-y-5">
            {HOMEPAGE_PUBLIC_COPY.howItStarts.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <div className="rounded-xl border border-cs-gray/50 border-l-4 border-l-cs-navy bg-white px-6 py-5">
                  <h3 className="mb-2 text-lg font-medium text-cs-dark-blue">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-base font-light leading-relaxed text-cs-dark-blue/85">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-cs-navy p-6 text-white md:p-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-cs-electric">
              {HOMEPAGE_PUBLIC_COPY.howItStarts.exampleLabel}
            </p>
            <p className="text-lg font-light leading-relaxed text-cs-cloud">
              {HOMEPAGE_PUBLIC_COPY.howItStarts.example}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-cs-gray/60 bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h2 className="text-balance text-3xl font-light tracking-tight text-cs-navy md:text-4xl">
              {HOMEPAGE_PUBLIC_COPY.scoring.heading}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <article className="rounded-2xl bg-cs-navy p-6 text-white md:p-8">
              <h3 className="mb-3 text-2xl font-medium text-white">
                {HOMEPAGE_PUBLIC_COPY.scoring.institutionTitle}
              </h3>
              <p className="font-light leading-relaxed text-cs-cloud">
                {HOMEPAGE_PUBLIC_COPY.scoring.institutionBody}
              </p>
              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-lg font-medium text-cs-electric">
                  Policy, service model, script, or rubric
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-cs-cloud">
                  We review which elements a spoken conversation can show before the assessment begins.
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-cs-gray bg-white p-6 md:p-8">
              <h3 className="mb-3 text-2xl font-medium text-cs-dark-blue">
                {HOMEPAGE_PUBLIC_COPY.scoring.readyTitle}
              </h3>
              <p className="mb-6 font-light leading-relaxed text-cs-dark-blue">
                {HOMEPAGE_PUBLIC_COPY.scoring.readyBody}
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {featuredFrameworks.map((framework) => (
                  <li
                    key={framework.name}
                    className="rounded-lg bg-cs-cloud px-4 py-3 text-sm font-medium text-cs-dark-blue"
                  >
                    {framework.homepageName ?? framework.name}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8 rounded-xl bg-cs-dark-blue px-6 py-5 text-center text-white md:px-8">
            <p className="text-lg font-light">
              {HOMEPAGE_PUBLIC_COPY.scoring.sharedLine}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start justify-center gap-3 text-sm sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/frameworks#ready-to-use-frameworks"
              className="font-medium text-cs-dark-blue underline decoration-cs-gray underline-offset-4 transition-colors hover:text-cs-navy"
            >
              View the ready to use scoring catalog
            </Link>
            <Link
              href="/frameworks#scoring-limits"
              className="font-medium text-cs-dark-blue underline decoration-cs-gray underline-offset-4 transition-colors hover:text-cs-navy"
            >
              Read the scoring limits
            </Link>
          </div>

          <div className="mt-14 border-t border-cs-gray pt-10 md:mt-16 md:pt-12">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray">
              {HOMEPAGE_PUBLIC_COPY.scoring.conversationsHeading}
            </p>
            <ul className="flex flex-wrap gap-2.5 md:gap-3">
              {CONVERSATION_TYPES.map((type) => (
                <li
                  key={type}
                  className="rounded-md border border-cs-navy/25 border-l-4 border-l-cs-dark-blue bg-cs-cloud/50 px-4 py-2 text-sm font-medium text-cs-dark-blue"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cs-cloud px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 md:mb-14">
            <h2 className="mb-4 text-3xl font-light tracking-tight text-cs-navy md:text-4xl">
              {HOMEPAGE_PUBLIC_COPY.buyers.healthSystemHeading}
            </h2>
            <p className="max-w-3xl text-lg font-light text-cs-dark-blue">
              {HOMEPAGE_PUBLIC_COPY.buyers.healthSystemBody}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {healthSystemGroup.solutions.map((solution, index) => (
              <Reveal key={solution.slug} delay={index * 80} className="[&>a]:h-full">
                <AudienceCard
                  brandIcon={solution.icon}
                  title={solution.title}
                  subtitle={solution.subtitle}
                  bullets={solution.cardBullets}
                  href={`/solutions/${solution.slug}`}
                  ctaLabel="View use case"
                  variant={solution.colorVariant}
                />
              </Reveal>
            ))}
          </div>

          <div className="mb-12 mt-16 border-t border-cs-navy/15 pt-14 md:mb-14 md:mt-20 md:pt-16">
            <h2 className="mb-4 text-3xl font-light tracking-tight text-cs-navy md:text-4xl">
              {HOMEPAGE_PUBLIC_COPY.buyers.medicalEducationHeading}
            </h2>
            <p className="max-w-3xl text-lg font-light text-cs-dark-blue">
              {HOMEPAGE_PUBLIC_COPY.buyers.medicalEducationBody}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {medicalEducationGroup.solutions.map((solution, index) => (
              <Reveal key={solution.slug} delay={index * 80} className="[&>a]:h-full">
                <AudienceCard
                  brandIcon={solution.icon}
                  title={solution.title}
                  subtitle={solution.subtitle}
                  bullets={solution.cardBullets}
                  href={`/solutions/${solution.slug}`}
                  ctaLabel="View use case"
                  variant={solution.colorVariant}
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center md:mt-12">
            <Link
              href="/solutions"
              className="inline-flex items-center font-medium text-cs-dark-blue transition-colors hover:text-cs-navy"
            >
              Explore all use cases
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-6 py-16 md:py-24">
        <Waveform
          tone="light"
          align="edges"
          opacity={0.3}
          seed="home-seam-proof"
          className="bottom-0 top-auto h-16"
        />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-12 text-center md:mb-14">
            <h2 className="text-3xl font-light tracking-tight text-cs-navy md:text-4xl">
              {HOMEPAGE_PUBLIC_COPY.proofHeading}
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <div className="absolute -left-2 -top-2 text-6xl font-serif text-cs-dark-blue/20 md:-left-4">
                &ldquo;
              </div>
              <blockquote className="relative pl-8 pt-4">
                <p className="mb-4 text-2xl font-light leading-relaxed text-cs-dark-blue md:text-3xl">
                  I just tried it out and it was like talking to a real patient.
                </p>
                <cite className="border-l-4 border-cs-dark-blue pl-4 text-base font-normal not-italic text-cs-dark-blue/70">
                  Faculty, Johns Hopkins University School of Medicine
                </cite>
              </blockquote>
            </div>

            <div className="relative mt-12 md:mt-16">
              <div className="absolute -left-2 -top-2 text-6xl font-serif text-cs-dark-blue/20 md:-left-4">
                &ldquo;
              </div>
              <blockquote className="relative pl-8 pt-4">
                <p className="mb-4 text-xl font-light leading-relaxed text-cs-dark-blue md:text-2xl">
                  It was helpful to have time to think and reflect without feeling the pressure of a person across from you expecting a response.
                </p>
                <cite className="border-l-4 border-cs-dark-blue pl-4 text-base font-normal not-italic text-cs-dark-blue/70">
                  Clinician, Pilot Study Participant
                </cite>
              </blockquote>
            </div>

            <div className="relative mt-12 md:mt-16">
              <div className="absolute -left-2 -top-2 text-6xl font-serif text-cs-dark-blue/20 md:-left-4">
                &ldquo;
              </div>
              <blockquote className="relative pl-8 pt-4">
                <p className="mb-4 text-xl font-light leading-relaxed text-cs-dark-blue md:text-2xl">
                  I had to tell a patient&apos;s father that his daughter would need long-term oxygen support through a tracheostomy. Before speaking with him, I practiced the conversation on ClinicalSim. It gave me confidence and feedback on my tone and delivery. Having difficult conversations can be extremely stressful, but having the practice beforehand allowed me to give appropriate time for silence and empathy.
                </p>
                <cite className="border-l-4 border-cs-dark-blue pl-4 text-base font-normal not-italic text-cs-dark-blue/70">
                  Nurse practitioner, Advocate Health
                </cite>
              </blockquote>
            </div>
          </div>

          <div className="mt-12 text-center md:mt-14">
            <Link href="/contact">
              <Button size="xl">
                {HOMEPAGE_PUBLIC_COPY.closing.cta}
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <WaveformBand seed="home-closing" className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-balance text-3xl font-light tracking-tight md:text-4xl lg:text-5xl">
            {HOMEPAGE_PUBLIC_COPY.closing.heading}
          </h2>
          <p className="mb-8 text-lg font-light text-white/90 md:text-xl">
            {HOMEPAGE_PUBLIC_COPY.closing.body}
          </p>
          <Link href="/contact">
            <Button variant="accent" size="xl">
              {HOMEPAGE_PUBLIC_COPY.closing.cta}
            </Button>
          </Link>
        </div>
      </WaveformBand>
    </>
  )
}
