import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/feature-card"
import type { BrandIconName } from "@/components/brand-icon"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { AuthorByline } from "@/components/author-byline"
import { getAuthorById, getAuthorUrl } from "@/lib/authors"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import type { FaqItem } from "@/lib/types"

export const metadata: Metadata = {
  title: { absolute: "Methodology: Case Development, Standards Alignment & Feedback" },
  description:
    "How ClinicalSim.ai builds cases, anchors them to the ACGME Milestones 2.0, the Foundational Competencies, or the ACGME Clinician Educator Milestones, applies validated communication frameworks like SPIKES and Calgary-Cambridge, and generates transcript-grounded, competency-based feedback.",
  openGraph: {
    title: "Methodology | ClinicalSim.ai",
    description:
      "Case development, standards alignment, and feedback generation behind ClinicalSim's voice-based clinical simulation platform: quality, consistency, and alignment to published frameworks.",
    url: "https://clinicalsim.ai/methodology",
  },
  twitter: {
    title: "Methodology | ClinicalSim.ai",
    description:
      "How ClinicalSim builds cases, aligns standards, and generates competency-based feedback.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/methodology",
  },
}

/**
 * Answers here are drawn from sections 2.1 through 2.5 below and claim nothing
 * the page does not already say. The block exists because the scoring
 * transparency question is the one this page answers best and the one an answer
 * engine could not previously lift: rendered open rather than in a `details`
 * accordion, and emitted as FAQPage, the same treatment `/glossary/osce` uses.
 */
const methodologyFaqs: FaqItem[] = [
  {
    question: "How does ClinicalSim's AI scoring work?",
    answer:
      "Each ClinicalSim encounter is a voice conversation between the learner and an AI patient built for that case, captured as a timestamped transcript. For every scored competency and framework step, the platform pulls one or two verbatim excerpts from that transcript showing the behavior, or documents that it was absent. Scoring follows the competency framework the case is anchored to, and the unit of assessment is the individual competency the case exercises. Any communication framework or program rubric applied alongside it is scored separately, so the two are never collapsed into one number.",
  },
  {
    question: "Which competency frameworks does a ClinicalSim score map to?",
    answer:
      "ClinicalSim anchors each case to a published competency framework and quotes that framework's level descriptors verbatim from the primary source. Residency and fellowship cases use the specialty-specific ACGME Milestones 2.0, scored on the Dreyfus scale from 1 to 5. Medical school cases use the Foundational Competencies for Undergraduate Medical Education (AAMC, AACOM, and ACGME) and the AAMC Core Entrustable Professional Activities, recorded on three points as demonstrated, partially demonstrated, or not demonstrated. Faculty cases use the ACGME Clinician Educator Milestones. Published communication frameworks are then applied on top of the competency score, each scored independently, and a program can add its own internal or externally validated rubrics.",
  },
  {
    question: "Can faculty see the evidence behind a ClinicalSim score?",
    answer:
      "Every score in a ClinicalSim report carries the verbatim transcript excerpt that produced it, so a reviewer reads the moment in the conversation rather than taking the rating on trust. The report presents all scores together with their evidence, adds an overall impression covering strengths, priority gaps, and top action items, and gives faculty transcript-grounded evidence for decisions about progression, remediation, or readiness.",
  },
  {
    question: "What does a ClinicalSim score claim, and what does it not claim?",
    answer:
      "The communication frameworks ClinicalSim applies were built for trained human raters observing real encounters, and that is the context in which their published reliability was established. Scoring those frameworks with AI in a simulated encounter goes beyond that context, so a framework's published reliability does not transfer to a ClinicalSim score. Each score is a formative signal backed by verbatim transcript evidence, which is why this methodology asks a reader to treat every result as evidence rather than a verdict.",
  },
  {
    question:
      "Should AI-generated scores be used for promotion or remediation decisions?",
    answer:
      "ClinicalSim scores are formative and are not built to stand alone behind a decision about promotion or remediation. The ACGME milestones themselves were designed as formative tools rather than instruments for high-stakes external decisions, and ClinicalSim treats milestone-aligned output the same way, as evidence that informs program judgment. A competency committee weighs it alongside direct observation and faculty judgment, and the final judgment stays with people. ClinicalSim is testing that alignment rather than asserting it: in the current pilot, program directors assess the same encounters themselves and compare their own read against the platform's output.",
  },
  {
    question: "Who writes and reviews ClinicalSim cases?",
    answer:
      "Every ClinicalSim case starts from a defined purpose, meaning the communication and clinical skills it should exercise and the competencies it should assess, and it is written to that purpose with explicit learning objectives and a clinical evidence base drawn from the literature. Practicing physicians then review it for accuracy, content, alignment, and fit to its objectives, among them program directors, simulation facilitators, and educators from both undergraduate and graduate medical education. Faculty development cases carry an additional review by someone with faculty development or clinical teaching expertise, and every case is run repeatedly before release.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "FAQPage" as const,
  mainEntity: methodologyFaqs.map((faq) => ({
    "@type": "Question" as const,
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faq.answer,
    },
  })),
}

const AUTHOR_ID = "jacqueline-ponczek"

const commitments: {
  title: string
  description: string
  variant: "default" | "accent" | "navy" | "light-blue"
  brandIcon: BrandIconName
}[] = [
  {
    title: "Quality",
    description:
      "Every case is built from primary sources, written to a defined purpose, and reviewed by practicing physicians with strong academic backgrounds before release.",
    variant: "accent",
    brandIcon: "badge-check",
  },
  {
    title: "Consistency",
    description:
      "The same scoring logic applies to every case, regardless of specialty, learner level, or which communication frameworks are applied alongside it.",
    variant: "navy",
    brandIcon: "stack",
  },
  {
    title: "Alignment",
    description:
      "Every score traces to a published competency or a validated communication framework, never to an unexplained rating.",
    variant: "default",
    brandIcon: "align-bottom",
  },
]

const frameworkTerms: {
  title: string
  description: string
  variant: "default" | "accent" | "navy" | "light-blue"
  brandIcon: BrandIconName
}[] = [
  {
    title: "Competency framework",
    description:
      "The governing-body standard a case is assessed against: the ACGME Milestones 2.0 in graduate medical education, the Foundational Competencies in undergraduate medical education, and the ACGME Clinician Educator Milestones in faculty development.",
    variant: "default",
    brandIcon: "hat-graduation",
  },
  {
    title: "Communication framework",
    description:
      "A validated, published model of communication behavior, such as SPIKES or Calgary-Cambridge, applied to characterize how the learner communicated.",
    variant: "accent",
    brandIcon: "chat-alt-checkmark",
  },
  {
    title: "Rubric",
    description:
      "The scored instrument that turns a framework into rated items, including a program's own internal or externally validated tools.",
    variant: "light-blue",
    brandIcon: "list-unordered",
  },
]

const dreyfusLevels = [
  "Level 1, Novice",
  "Level 2, Advanced Beginner",
  "Level 3, Competent",
  "Level 4, Proficient (readiness for unsupervised practice)",
  "Level 5, Expert (aspirational)",
]

const facultyCaseTypes = [
  "A student, resident, or fellow",
  "Another faculty member",
  "A patient or caregiver",
  "Other healthcare staff",
]

export default function MethodologyPage() {
  const author = getAuthorById(AUTHOR_ID)

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ClinicalSim.ai Methodology",
            description:
              "How ClinicalSim.ai builds cases, aligns them to governing-body competency frameworks and validated communication frameworks, and generates evidence-based feedback.",
            url: "https://clinicalsim.ai/methodology",
            dateModified: PAGE_DATE_MODIFIED.methodology,
            author: author
              ? {
                  "@type": "Person",
                  // Same @id as the /about card and article bylines, so this
                  // Person resolves to the one entity.
                  "@id": getAuthorUrl(author.id),
                  url: getAuthorUrl(author.id),
                  name: author.name,
                  honorificSuffix: author.credentials,
                  jobTitle: author.title,
                  worksFor: {
                    "@type": "Organization",
                    // "ClinicalSim" to match the site-wide Organization node,
                    // since the shared @id merges this Person with the /about
                    // card and article bylines.
                    name: "ClinicalSim",
                    url: "https://clinicalsim.ai",
                  },
                  ...(author.sameAs && author.sameAs.length > 0
                    ? { sameAs: author.sameAs }
                    : {}),
                }
              : {
                  "@type": "Organization",
                  name: "ClinicalSim.ai",
                  url: "https://clinicalsim.ai",
                },
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
                name: "Methodology",
                item: "https://clinicalsim.ai/methodology",
              },
            ],
          },
          faqJsonLd,
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 pt-4 md:pt-6 pb-4 md:pb-6">
        <div className="absolute inset-0 bg-cs-cloud -z-10" />

        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-cs-dark-gray mb-8">
            <Link href="/" className="hover:text-cs-dark-blue/85 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-dark-blue/85">Methodology</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-4 text-cs-dark-blue">
            Methodology: case creation,{" "}
            <span className="font-medium">standards alignment</span>, and
            feedback generation
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <AuthorByline authorId={AUTHOR_ID} />
            <span className="text-sm text-cs-dark-gray font-light">
              Last updated: August 2026
            </span>
          </div>

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed mb-4 max-w-3xl">
            This page outlines ClinicalSim case development, communication
            and governing-body framework alignment, scoring, and how each
            encounter generates high-quality, actionable feedback. A single
            engine, rubric, and dashboard serve learners across the
            medical-education continuum, and every session produces
            timestamped, competency-based documentation for learners,
            faculty, and program leadership.
          </p>

          <div className="rounded-xl border-l-4 border-cs-electric bg-cs-dark-blue px-6 py-5 max-w-3xl">
            <p className="text-base md:text-lg text-white font-light leading-relaxed">
              <span className="font-medium">Key takeaway:</span> every
              ClinicalSim case is anchored to a specific, published
              competency or communication standard, and every score traces
              to a verbatim excerpt from the encounter transcript, never to
              an unexplained rating.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Purpose and scope */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            1. Purpose and{" "}
            <span className="text-cs-dark-blue font-medium">scope</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Every case is anchored to the relevant governing body&rsquo;s
            framework for the learner&rsquo;s level. This anchoring holds
            regardless of a program&rsquo;s chosen primary measure. A program
            may adopt an internal or externally validated tool as its
            primary focus, or incorporate ClinicalSim cases into a broader
            curriculum. Each case&rsquo;s scoring and feedback are always
            grounded in a specific, published standard.
          </p>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            Sharing our methodology keeps our work transparent, so those who
            rely on it can trust it. Three commitments anchor it: quality,
            because every case is built from primary sources; consistency,
            because the same scoring logic applies to every case; and
            alignment, because every score traces to a published competency
            or a validated communication framework.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitments.map((c) => (
              <FeatureCard
                key={c.title}
                title={c.title}
                description={c.description}
                variant={c.variant}
                brandIcon={c.brandIcon}
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" />

      {/* How the methodology works */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            2. How the methodology{" "}
            <span className="text-cs-dark-blue font-medium">works</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            The method below applies to every case, regardless of learner
            level. Within Evidence and scoring, the level subsections
            describe what varies by learner level.
          </p>

          <h3 className="text-2xl font-medium text-cs-dark-blue mb-4">
            2.1 Building a case
          </h3>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Every case begins with a defined purpose: the communication and
            clinical skills it should exercise and the competencies it
            should assess. Content is written to that purpose, with explicit
            learning objectives and a clinical evidence base drawn from
            foundational and other applicable literature.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Physicians then review each case for accuracy, content, alignment,
            and fit to its objectives; reviewers are practicing physicians with
            strong academic backgrounds and decades of collective experience,
            including program directors, simulation facilitators, and UME
            and GME educators. Faculty development cases are also reviewed
            by someone with faculty development or clinical teaching
            expertise.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            Before release, each case is run repeatedly to confirm three
            things: that the AI character convincingly plays the role the case
            requires; that scoring and feedback perform as intended; and that
            what the case asks can be assessed within the limits of
            voice-based simulation. Refinements are made in coordination with
            ClinicalSim&rsquo;s clinical and technical leadership.
          </p>

          <h3 className="text-2xl font-medium text-cs-dark-blue mb-4">
            2.2 Competency alignment and communication frameworks
          </h3>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Three terms recur here. The competency framework is the anchor
            for the competency assessment; where it defines level
            descriptors, as the ACGME milestones do, those are quoted
            verbatim from the primary source. The communication frameworks
            are then applied to characterize how the learner communicated.
            The two are distinct: the competency score reflects the
            learner&rsquo;s developmental level, while the communication
            frameworks capture the specific skills underlying communication
            technique.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {frameworkTerms.map((t) => (
              <FeatureCard
                key={t.title}
                title={t.title}
                description={t.description}
                variant={t.variant}
                brandIcon={t.brandIcon}
              />
            ))}
          </div>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            Each communication framework comes from a cited, published source
            and is a floor, not a ceiling:
            one or more may be applied to a case, each scored independently,
            and programs may add their own internal or externally validated
            rubrics. Because these frameworks and rubrics operate at
            different scopes, from whole-encounter structures to
            task-specific routines to discrete micro-skills, ClinicalSim
            selects those best suited to each case&rsquo;s communication
            task.
          </p>

          <h3 className="text-2xl font-medium text-cs-dark-blue mb-4">
            2.3 Evidence and scoring
          </h3>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Each encounter is a voice conversation between the learner and
            an AI role designed for the case, captured as a timestamped
            transcript. For every scored competency and framework step, the
            platform draws one or two verbatim excerpts that demonstrate the
            behavior, or documents its absence. Because each score is
            traceable to the moment that supports it, the output withstands
            review rather than serving as an unexplained rating.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            Scoring follows the competency framework on which a case is
            built, and the unit of assessment is the individual competency
            the case exercises. Each applied communication framework or
            program rubric is scored independently of the competency.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Where an instrument publishes its own rating scale, we use it.
            Most communication frameworks do not, and there we apply a
            ClinicalSim scale to the framework&rsquo;s own steps and say so
            in the case, so a score is never read as though the
            framework&rsquo;s validation stood behind it.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            Because these frameworks are developmental, a given result carries
            different meaning at different stages of training and is always
            interpreted accordingly. All scores are presented together, with
            their verbatim evidence, so the learner or reviewer sees a
            complete picture. What varies is the competency framework a case
            is anchored to and how the competency itself is scored, described
            by learner level below.
          </p>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-cs-gray/50 border-l-4 border-l-cs-dark-blue p-6 md:p-7">
              <h4 className="text-lg font-medium text-cs-dark-blue mb-3">
                Graduate medical education
              </h4>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                Cases align to the specialty-specific ACGME Milestones 2.0,
                with milestone text quoted verbatim from each
                specialty&rsquo;s own document, and target the high-stakes
                conversations a specialty most needs to rehearse. The
                Milestones 2.0 describe six core competencies across five
                developmental levels; several were harmonized across
                specialties in 2017 and then adapted by each specialty,
                which is why text is drawn from the specialty&rsquo;s own
                version.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                Scoring reflects whichever subcompetencies the scenario
                exercises, most often interpersonal and communication skills
                and professionalism, and systems-based practice or other
                domains where the encounter warrants. Each is scored on the
                Dreyfus scale (1 to 5), read against the milestone&rsquo;s
                verbatim level descriptors:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mb-4 list-disc list-inside">
                {dreyfusLevels.map((level) => (
                  <li
                    key={level}
                    className="text-sm text-cs-dark-blue/85 font-light"
                  >
                    {level}
                  </li>
                ))}
              </ul>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                The result is milestone-placed and ready for Clinical
                Competency Committee review. Because the milestones are
                formative and were not designed for high-stakes external
                decisions, ClinicalSim treats milestone-aligned output
                accordingly, as evidence that informs program judgment. With
                that in mind, we do not provide a milestone score if the case
                cannot achieve the level of complexity required to evaluate
                through level 4.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-cs-gray/50 border-l-4 border-l-cs-electric p-6 md:p-7">
              <h4 className="text-lg font-medium text-cs-dark-blue mb-3">
                Undergraduate medical education
              </h4>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                Cases align to the Foundational Competencies for
                Undergraduate Medical Education (AAMC, AACOM, and ACGME) and
                the AAMC Core Entrustable Professional Activities (EPAs) for
                Entering Residency. The Core EPAs were originally mapped to
                the Physician Competency Reference Set (PCRS, 2013), which
                the 2024 Foundational Competencies now supersede; an updated
                set of EPAs aligned to the Foundational Competencies is
                anticipated but not yet published. Until it is, ClinicalSim
                maps UME cases to the EPAs and to the Foundational
                Competencies independently, without asserting a fixed
                crosswalk between them.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                For UME, ClinicalSim records each competency on three
                points, demonstrated, partially demonstrated, or not
                demonstrated, and scores performance through the applied
                communication or skill rubric. Entrustment, the
                pre-entrustable to entrustable judgment, remains a program
                decision that this evidence informs.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                Development emphasizes foundational encounters that mature
                alongside clinical knowledge, from history-taking to
                delivering a diagnosis, preparing students for the
                transition to residency.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-cs-gray/50 border-l-4 border-l-cs-light-blue p-6 md:p-7">
              <h4 className="text-lg font-medium text-cs-dark-blue mb-3">
                Faculty development
              </h4>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                Faculty cases assess a faculty member or other teaching
                clinician, and the assessment is formative.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                Cases align to the ACGME Clinician Educator Milestones, a
                2022 joint initiative of the ACGME, the ACCME, the AAMC, and
                the AACOM. Its 19 subcompetencies carry the same five
                developmental levels as the ACGME Milestones used in graduate
                medical education, and level descriptors are quoted verbatim
                from the source.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                The Clinician Educator Milestones are guidance rather than an
                accreditation requirement, in the ACGME&rsquo;s own words.
                ClinicalSim treats faculty output the way it treats
                milestone-aligned output in residency: evidence that informs
                judgment, not a grade.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                A case scores only the subcompetencies a voice conversation
                can actually show, usually one or two. That keeps a case from
                taking on more than it can assess, and keeps every score to
                something the platform can evidence.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                Cases are built in four types, according to who the faculty
                member is talking to:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 list-disc list-inside">
                {facultyCaseTypes.map((type) => (
                  <li
                    key={type}
                    className="text-sm text-cs-dark-blue/85 font-light"
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-medium text-cs-dark-blue mt-10 mb-4">
            2.4 Feedback
          </h3>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-2">
            Each encounter produces a single feedback report.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            Verbatim evidence is incorporated into the grading rubrics,
            justifying the level a learner reached or the specific step
            assessed. The report then offers an overall impression
            (strengths, priority gaps, and top action items) and targeted
            recommendations. Depending on the case, it indicates where a
            learner sits developmentally and provides reviewers with
            transcript-grounded evidence for decisions about progression,
            remediation, readiness for practice, readiness to perform a
            particular task, or familiarity with a given subject area.
          </p>

          <h3 className="text-2xl font-medium text-cs-dark-blue mt-10 mb-4">
            2.5 What a score claims, and what it does not
          </h3>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            The frameworks ClinicalSim applies were built for trained human
            raters observing real encounters, and that is how their published
            reliability was established. Scoring them with AI in a simulated
            encounter is an extension beyond that context, so a
            framework&rsquo;s reliability does not carry over to a ClinicalSim
            score. Each score is a formative signal backed by verbatim
            transcript evidence.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            We are testing that rather than asserting it. In our current
            pilot, program directors review ClinicalSim output alongside their
            own assessment of the same encounters, which is how we find out
            where the platform holds up against the standard and where it
            complements faculty judgment rather than substituting for it.
          </p>
        </div>
      </section>

      <SectionDivider variant="curve" color="white" />

      {/* Commitment to accuracy */}
      <section className="px-6 pt-8 md:pt-10 pb-4 md:pb-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            3. Commitment to{" "}
            <span className="text-cs-dark-blue font-medium">accuracy</span>
          </h2>
          <div className="rounded-xl bg-cs-navy px-6 py-6">
            <p className="text-base md:text-lg text-white font-light leading-relaxed">
              <span className="font-medium">
                Read every result as evidence, not a verdict.
              </span>{" "}
              We are committed to accuracy and to fidelity to the source
              documents behind every case. Each result is a transparent
              statement of the evidence in the encounter: it informs the
              learner and the reviewer, and it never replaces final human
              judgment.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="cloud" />

      {/* Common questions */}
      <section className="px-6 pt-8 md:pt-10 pb-4 md:pb-6 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            4. Common{" "}
            <span className="text-cs-dark-blue font-medium">questions</span>
          </h2>

          <div className="space-y-7">
            {methodologyFaqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg md:text-xl font-medium text-cs-dark-blue mb-2">
                  {faq.question}
                </h3>
                <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="white" />

      {/* References */}
      <section className="px-6 pt-8 md:pt-10 pb-4 md:pb-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            5. References
          </h2>

          <div className="bg-white rounded-xl border border-cs-gray/50 p-6 md:p-8 space-y-8">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-cs-dark-gray mb-3">
                Graduate medical education
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  Edgar L, Roberts S, Holmboe E. Milestones 2.0: A Step
                  Forward. <em>J Grad Med Educ.</em> 2018;10(3):367-369.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  Morrison LJ, Joyce BL, Meyer LE, et al. Strengthening
                  Interpersonal and Communication Skills Assessment Through
                  Harmonized Milestones. <em>J Grad Med Educ.</em>
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  ACGME. Use of Individual Milestones Data by External
                  Entities for High-Stakes Decisions: A Function for Which
                  They Are Not Designed or Intended. October 2022.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  Specialty-specific ACGME Milestones and Supplemental
                  Guides, sourced per specialty.
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-cs-dark-gray mb-3">
                Undergraduate medical education
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  AAMC, AACOM, and ACGME. Foundational Competencies for
                  Undergraduate Medical Education. 2024.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  AAMC. The Core Entrustable Professional Activities (EPAs)
                  for Entering Residency. 2014.{" "}
                  <a
                    href="https://www.aamc.org/about-us/mission-areas/medical-education/cbme/core-epas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cs-dark-blue hover:underline"
                  >
                    aamc.org
                  </a>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-cs-dark-gray mb-3">
                Faculty development
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  The Clinician Educator Milestone Project. Version 1.1,
                  August 2022. A joint initiative of the Accreditation Council
                  for Graduate Medical Education, the Accreditation Council
                  for Continuing Medical Education, the Association of
                  American Medical Colleges, and the American Association of
                  Colleges of Osteopathic Medicine.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  The Clinician Educator Supplemental Guide. Version 1.1,
                  October 2025.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  ACGME. Use of Individual Milestones Data by External
                  Entities for High-Stakes Decisions. October 2022.
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-cs-dark-gray mb-3">
                Communication frameworks (representative; full citations in
                the ClinicalSim Frameworks Bibliography)
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  SPIKES. Baile WF, et al. <em>The Oncologist.</em>{" "}
                  2000;5(4):302-311.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  KEECC-A (Kalamazoo). Makoul G. <em>Acad Med.</em>{" "}
                  2001;76(4):390-393.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  SEGUE. Makoul G. <em>Patient Educ Couns.</em>{" "}
                  2001;45(1):23-34.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  NURSE. Back AL, et al. <em>CA Cancer J Clin.</em>{" "}
                  2005;55(3):164-177.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  REMAP. Childers JW, et al. <em>J Oncol Pract.</em>{" "}
                  2017;13(10):e844-e850.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  SBAR. Haig KM, et al.{" "}
                  <em>Jt Comm J Qual Patient Saf.</em> 2006;32(3):167-175.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  I-PASS. Starmer AJ, et al. <em>Pediatrics.</em>{" "}
                  2012;129(2):201-204.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  TeamSTEPPS. King HB, et al. AHRQ; 2008. CANDOR. AHRQ;
                  updated 2023.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  Calgary-Cambridge. Silverman J, Kurtz S, Draper J.{" "}
                  <em>Skills for Communicating with Patients.</em> 3rd ed.
                  Radcliffe Publishing; 2013. Companion volume: Kurtz S,
                  Silverman J, Draper J.{" "}
                  <em>
                    Teaching and Learning Communication Skills in Medicine.
                  </em>{" "}
                  2nd ed. Radcliffe; 2005.
                </li>
                <li className="text-sm text-cs-dark-blue/70 leading-relaxed">
                  R2C2. Sargeant J, Lockyer J, Mann K, et al.{" "}
                  <em>Acad Med.</em> 2015;90(12):1698-1706.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" />

      {/* CTA */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-cs-navy mb-4">
            Questions about how this{" "}
            <span className="text-cs-dark-blue font-medium">works?</span>
          </h2>
          <p className="text-base text-cs-dark-blue/70 font-light leading-relaxed mb-8">
            Read the wider FAQ for questions about pricing, rollout, and
            program fit, or talk to us about piloting ClinicalSim at your
            program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/faq">
              <Button variant="secondary" size="lg">
                Read the FAQ
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="default" size="lg">
                Request a Pilot
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
