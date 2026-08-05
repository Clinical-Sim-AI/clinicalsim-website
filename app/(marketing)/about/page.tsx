import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StatHighlight } from "@/components/stat-highlight"
import { SectionDivider } from "@/components/section-divider"
import { AudienceCard } from "@/components/audience-card"
import { AuthorByline } from "@/components/author-byline"
import { JsonLd } from "@/components/json-ld"
import { getAllAudiences } from "@/lib/audiences"
import { getAllAuthors } from "@/lib/authors"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About ClinicalSim.ai: AI Clinical Simulation for Medical Communication",
  description:
    "ClinicalSim is a voice-based AI clinical simulation platform to practice and measure clinical communication across the training continuum: undergraduate medical education, residency and fellowship, remediation, and faculty development. Aligned to ACGME Milestones 2.0.",
  openGraph: {
    title: "About ClinicalSim.ai",
    description:
      "Voice-based AI clinical simulation to practice the conversations that matter most, at every stage of a clinical career. Aligned to ACGME Milestones 2.0.",
    url: "https://clinicalsim.ai/about",
  },
  twitter: {
    title: "About ClinicalSim.ai",
    description:
      "Voice-based AI clinical simulation to practice the conversations that matter most, at every stage of a clinical career.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/about",
  },
}

const LAST_UPDATED = "2026-08-04"

export default function AboutPage() {
  const audiences = getAllAudiences()
  const team = getAllAuthors()

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "About ClinicalSim.ai",
            description:
              "ClinicalSim is a voice-based AI clinical simulation platform to practice and measure clinical communication across the medical-education continuum, built by practicing physicians who run fellowship programs and simulation centers.",
            url: "https://clinicalsim.ai/about",
            dateModified: LAST_UPDATED,
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
                name: "About",
                item: "https://clinicalsim.ai/about",
              },
            ],
          },
          ...team.map((author) => ({
            "@context": "https://schema.org" as const,
            "@type": "Person" as const,
            name: author.name,
            ...(author.credentials
              ? { honorificSuffix: author.credentials }
              : {}),
            jobTitle: author.title,
            description: author.bio,
            worksFor: {
              "@type": "Organization" as const,
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
            ...(author.sameAs && author.sameAs.length > 0
              ? { sameAs: author.sameAs }
              : {}),
          })),
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 py-20 md:py-28 bg-cs-dark-blue text-white">
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="inline-flex items-center gap-2 text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-cs-electric mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-cs-electric" aria-hidden="true" />
            About ClinicalSim
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            Practice the conversations that matter most.
          </h1>
          <p className="text-xl text-cs-cloud font-light leading-relaxed max-w-2xl">
            ClinicalSim is a voice-based AI clinical simulation platform to practice and measure{" "}
            <span className="text-cs-electric font-medium">clinical communication</span>. Learners hold real spoken encounters with AI patients, then get objective, competency-aligned feedback in minutes, at every stage of training and from any device.
          </p>
        </div>
      </section>

      {/* Why we exist */}
      <section className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight">
            Why we exist
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            <p>
              Communication is the hardest competency to teach, train, and measure. It&apos;s a clinical procedure, the one clinicians perform more than any other, and the one they get to rehearse the least. Telling a family news they feared, aligning on goals of care, earning the trust of a frightened patient: these moments happen once, in real time, with real people, and there has rarely been a way to practice them or an objective way to measure how they went. Faculty know a strong encounter when they see one, but seeing one means being in the room, and there are never enough hours or enough rooms.
            </p>
            <p>
              We built ClinicalSim to close that gap, and to make communication something every learner can practice on demand and every program can measure with the same rigor it brings to a written exam.
            </p>
            <p>
              The conversations that matter most aren&apos;t only with patients and families. Clinicians face the same high-stakes moments with colleagues across professions and with peers, and ClinicalSim works for those too.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" />

      {/* What ClinicalSim is */}
      <section className="px-6 py-16 md:py-20 bg-cs-cloud">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight">
            What ClinicalSim is
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            <p>
              Learners talk through high-stakes encounters by voice with AI patients, practicing the range of conversations their training demands. They practice from any device, on their own time, as many times as they need. There&apos;s no sim center to book, no standardized patient to schedule, and no app to install. The specific scenarios, by specialty and setting, live on our{" "}
              <Link href="/solutions" className="text-cs-dark-blue font-medium underline decoration-cs-dark-blue/30 hover:decoration-cs-dark-blue underline-offset-4 transition-colors">
                use cases page
              </Link>
              .
            </p>
            <p>
              Every session produces rubric-scored feedback within minutes, mapped to the competency frameworks programs already use. Directors and faculty assign scenarios, review results, and follow a learner&apos;s progress over months without attending a single encounter.
            </p>
            <p className="text-cs-dark-blue font-normal">
              ClinicalSim extends a program&apos;s standardized patient and simulation work rather than replacing it, adding the practice volume that scheduling alone can never reach.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* The gap we close */}
      <section className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight max-w-3xl">
            The gap we close
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed max-w-3xl">
            <p>
              The gap shows up at every level of training. In undergraduate medical education, the discontinuation of Step 2 CS in 2021 left no standardized, scalable way to assess whether students can communicate before they reach residency. In graduate medical education, programs assemble practice and remediation one encounter at a time, spending scarce faculty hours with no guarantee that two learners are held to the same standard. And the faculty expected to teach and assess these skills rarely get structured practice or a shared standard to calibrate against themselves.
            </p>
            <p>
              ClinicalSim gives each of them a repeatable way to practice, and gives programs objective, comparable evidence of where every learner stands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <StatHighlight
              value="93%"
              label="of family medicine residency programs had a resident in remediation over three years"
              source="Frazier et al., Family Medicine, 2021 (CERA survey, 267 program directors)"
              variant="navy"
            />
            <StatHighlight
              value="Half"
              label="of those program directors want an accessible communication remediation toolkit and don't have one"
              source="Frazier et al., Family Medicine, 2021 (CERA survey, 267 program directors)"
              variant="blue"
            />
            <StatHighlight
              value="29-45"
              label="faculty hours consumed per remediation case"
              source="Guerrasio and Aagaard 2014, mean 29.6"
              variant="navy"
            />
          </div>
        </div>
      </section>

      {/* Across the training continuum */}
      <section className="px-6 py-16 md:py-20 bg-cs-navy text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-6 leading-tight text-white">
            Across the training continuum
          </h2>
          <p className="text-lg text-cs-cloud font-light leading-relaxed mb-12 max-w-3xl">
            ClinicalSim is built to work from the first year of medical school through faculty development.
          </p>

          <div className="space-y-10">
            <div className="border-l-2 border-cs-electric pl-6">
              <h3 className="text-xl font-medium text-cs-electric mb-3">Medical students</h3>
              <p className="text-lg text-cs-cloud/90 font-light leading-relaxed">
                Students build foundational skills and prepare for the clerkship and residency expectations waiting for them, with practice tied to core competencies and the entrustable professional activities (EPAs) that define readiness.
              </p>
            </div>

            <div className="border-l-2 border-cs-electric pl-6">
              <h3 className="text-xl font-medium text-cs-electric mb-3">Residents and fellows</h3>
              <p className="text-lg text-cs-cloud/90 font-light leading-relaxed">
                Residents and fellows rehearse the high-stakes conversations their specialties demand, with feedback aligned to their ACGME milestones and the documentation their clinical competency committees expect.
              </p>
            </div>

            <div className="border-l-2 border-cs-electric pl-6">
              <h3 className="text-xl font-medium text-cs-electric mb-3">Learners in remediation</h3>
              <p className="text-lg text-cs-cloud/90 font-light leading-relaxed">
                Programs give struggling or returning learners focused, well-documented practice, including remediation, without rebuilding a plan from scratch each time.
              </p>
            </div>

            <div className="border-l-2 border-cs-electric pl-6">
              <h3 className="text-xl font-medium text-cs-electric mb-3">Faculty and clinician educators</h3>
              <p className="text-lg text-cs-cloud/90 font-light leading-relaxed">
                Faculty sharpen how they teach, precept, and give feedback, using the same platform their learners train on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grounded in the standards */}
      <section className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight">
            Grounded in the standards programs answer to
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            <p>
              Every scenario and rubric is aligned to the frameworks programs are already accountable to: ACGME Milestones 2.0 for graduate training, and core competencies and EPAs for undergraduate medical education. For faculty development, the same approach maps to the Clinician Educator Milestones, so the growth faculty make as teachers and assessors is documented as rigorously as their learners&apos; is.
            </p>
            <p>
              The feedback a learner receives and the record a program keeps speak the same language as their competency committees, clerkship directors, and accreditation reviews.
            </p>
          </div>
          <Link
            href="/methodology"
            className="inline-flex items-center text-cs-dark-blue font-medium hover:text-cs-navy transition-colors group mt-8"
          >
            Our scoring approach and the evidence behind it
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="cloud" />

      {/* Built for how programs actually run */}
      <section className="px-6 py-16 md:py-20 bg-cs-cloud">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight">
            Built for how programs actually run
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            <p>
              ClinicalSim runs in the browser, so there&apos;s nothing to install and no integration with an EHR or student information system to negotiate. Every session generates documentation that&apos;s timestamped, competency-aligned, and longitudinal, ready for a competency committee or an accreditation file. Directors and faculty work from a dashboard to assign scenarios, monitor progress, and export reports.
            </p>
            <p>
              Every patient in every case is synthetic, authored from the clinical literature rather than from patient records, so no protected health information enters the platform and there is nothing to de-identify.
            </p>
          </div>
          <Link
            href="/trust"
            className="inline-flex items-center text-cs-dark-blue font-medium hover:text-cs-navy transition-colors group mt-8"
          >
            How we handle data, and what we haven&apos;t certified yet
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* Who we work with */}
      <section className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6 leading-tight text-center">
            Who we work with
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed max-w-3xl mx-auto text-center">
            <p>
              We work with the people who run training: program directors, DIOs, and GME leadership; medical school and clerkship leaders; simulation center directors; and the faculty who teach and assess these skills every day.
            </p>
            <p>
              The clinicians who train on ClinicalSim aren&apos;t only physicians. We work with clinicians across the health professions, wherever they build the communication skills their patients and teams depend on.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-10">
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
              className="inline-flex items-center text-cs-dark-blue font-medium hover:text-cs-navy transition-colors group"
            >
              Explore all use cases
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="cloud" />

      {/* Team */}
      <section className="px-6 py-16 md:py-20 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4 text-center leading-tight">
            The people who built it
          </h2>
          <p className="text-lg text-cs-dark-blue/70 font-light leading-relaxed text-center max-w-3xl mx-auto mb-12">
            Practicing physicians who run fellowship programs and simulation centers, alongside founders who have shipped enterprise software before. The cases and rubrics are theirs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((author) => (
              <div
                key={author.id}
                className="bg-white rounded-xl p-6 border border-cs-gray/50"
              >
                <AuthorByline authorId={author.id} />
                <p className="text-sm text-cs-dark-blue/70 font-light leading-relaxed mt-4">
                  {author.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get started */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">
            Communication is teachable, measurable, and improvable.
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90 max-w-3xl mx-auto">
            Request a pilot and we&apos;ll set your program up with full access, onboarding, and support, so your learners can start practicing the conversations that matter most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center text-white/70 font-medium hover:text-cs-electric transition-colors group"
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
