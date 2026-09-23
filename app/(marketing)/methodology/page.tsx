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
import { chunkParagraph } from "@/lib/feedback/paragraphs"
import type { FaqItem } from "@/lib/types"

export const metadata: Metadata = {
  title: { absolute: "Methodology: Case Development, Standards Alignment & Feedback" },
  description:
    "How ClinicalSim.ai builds cases, applies program-approved competency standards and published communication frameworks, and generates transcript-grounded feedback.",
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
      "Each ClinicalSim encounter is a voice conversation between the learner and an AI patient built for that case, captured as a timestamped transcript. For every scored competency and framework step, the platform pulls one or two verbatim excerpts from the transcript that show the behavior, or notes that it was absent. Scoring follows the competency framework the case is anchored to, and the unit of assessment is the individual competency the case exercises. Any communication framework or program rubric applied alongside it is scored separately, so the two never collapse into one number.",
  },
  {
    question: "Which competency frameworks does a ClinicalSim score map to?",
    answer:
      "ClinicalSim can map a case to the competency framework a program supplies or approves. The case uses only the behaviors the conversation can show, and the report names the standard behind each score. Communication frameworks and program rubrics are scored separately.",
  },
  {
    question: "Can faculty see the evidence behind a ClinicalSim score?",
    answer:
      "Every score in a ClinicalSim report carries the verbatim transcript excerpt that produced it. A reviewer reads the moment in the conversation instead of taking the rating on trust. The report shows all scores together with their evidence and adds an overall impression covering strengths, priority gaps, and top action items. That gives faculty transcript-grounded evidence for decisions about progression, remediation, or readiness.",
  },
  {
    question: "What does a ClinicalSim score claim, and what does it not claim?",
    answer:
      "The communication frameworks ClinicalSim applies were built for trained human raters observing real encounters. Their published reliability was established in that context. Scoring those frameworks with AI in a simulated encounter goes beyond it, so a framework's published reliability does not transfer to a ClinicalSim score. Each score is a formative signal backed by verbatim transcript evidence, which is why this methodology asks readers to treat every result as evidence, not a verdict.",
  },
  {
    question:
      "Should AI-generated scores be used for promotion or remediation decisions?",
    answer:
      "ClinicalSim scores are formative and do not stand alone behind a decision about promotion or remediation. A competency committee weighs the report alongside direct observation and faculty judgment, and people make the final decision. In the current pilot, program directors assess the same encounters and compare their own read with the platform's output.",
  },
  {
    question: "Who writes and reviews ClinicalSim cases?",
    answer:
      "Every ClinicalSim case starts from a defined purpose: the communication and clinical skills it should exercise and the competencies it should assess. It is written to that purpose, with explicit learning objectives and a clinical evidence base drawn from the literature. Practicing physicians, including program directors, simulation facilitators, and educators from undergraduate and graduate medical education, then review it for accuracy, content, alignment, and fit to its objectives. Faculty development cases get an extra review from someone with faculty development or clinical teaching expertise, and every case is run repeatedly before release.",
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
      "Every score traces to a program-approved competency standard or a published communication framework, never to an unexplained rating.",
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
      "The standard a program approves for the case, including any rating scale and the behaviors the conversation can assess.",
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
              "How ClinicalSim.ai builds cases, applies program-approved competency standards and published communication frameworks, and generates evidence-based feedback.",
            url: "https://clinicalsim.ai/methodology",
            dateModified: PAGE_DATE_MODIFIED.methodology,
            author: author
              ? {
                  "@type": "Person",
                  // Same @id as the /about card and article bylines, so this
                  // Person resolves to the one entity.
                  // Omitted while the /about team section is unpublished:
                  // there is then no page for this person to resolve to.
                  ...(getAuthorUrl(author.id)
                    ? {
                        "@id": getAuthorUrl(author.id),
                        url: getAuthorUrl(author.id),
                      }
                    : {}),
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
            This page explains how ClinicalSim builds cases, aligns them to
            communication and governing-body frameworks, scores them, and
            turns each encounter into high-quality, actionable feedback. One
            engine, rubric, and dashboard serve learners across the medical
            education continuum. Every session produces timestamped,
            competency-based documentation for learners, faculty, and program
            leadership.
          </p>

          <div className="rounded-xl border-l-4 border-cs-electric bg-cs-dark-blue px-6 py-5 max-w-3xl">
            <p className="text-base md:text-lg text-white font-light leading-relaxed">
              <span className="font-medium">Key takeaway:</span> every
              ClinicalSim case is anchored to a specific, published
              competency or communication standard. Every score traces to a
              verbatim excerpt from the encounter transcript, never to an
              unexplained rating.
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
            framework for the learner&rsquo;s level. That holds whatever
            primary measure a program chooses. A program may make an internal
            or externally validated tool its primary focus, or fold
            ClinicalSim cases into a broader curriculum. Either way, each
            case&rsquo;s scoring and feedback rest on a specific, published
            standard.
          </p>

          <h3 className="text-2xl font-medium text-cs-dark-blue mb-4">
            Three commitments
          </h3>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            We share this methodology to keep our work transparent, so the
            people who rely on it can trust it. Three commitments anchor it:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            <li>Quality, because every case is built from primary sources.</li>
            <li>
              Consistency, because the same scoring logic applies to every
              case.
            </li>
            <li>
              Alignment, because every score traces to a published competency
              or a validated communication framework.
            </li>
          </ul>

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
            The method below applies to every case at every learner level.
            Where something does vary by level, the subsections under
            Evidence and scoring describe it.
          </p>

          <h3 className="text-2xl font-medium text-cs-dark-blue mb-4">
            2.1 Building a case
          </h3>
          <h4 className="text-lg font-medium text-cs-dark-blue mb-2">
            A defined purpose
          </h4>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Every case begins with a defined purpose. The purpose names the
            communication and clinical skills the case should exercise and
            the competencies it should assess. The content is written to that
            purpose, with explicit learning objectives and a clinical evidence
            base drawn from foundational and other applicable literature.
          </p>
          <h4 className="text-lg font-medium text-cs-dark-blue mb-2">
            Physician review
          </h4>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Physicians then review each case for accuracy, content, alignment,
            and fit to its objectives. The reviewers are practicing physicians
            with strong academic backgrounds and decades of collective
            experience. They include program directors, simulation
            facilitators, and UME and GME educators. Faculty development cases
            are also reviewed by someone with faculty development or clinical
            teaching expertise.
          </p>
          <h4 className="text-lg font-medium text-cs-dark-blue mb-2">
            Testing before release
          </h4>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-3">
            Before release, each case is run repeatedly to confirm three
            things:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            <li>The AI character convincingly plays the role the case requires.</li>
            <li>Scoring and feedback perform as intended.</li>
            <li>
              What the case asks can be assessed within the limits of
              voice-based simulation.
            </li>
          </ul>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            Refinements are made in coordination with ClinicalSim&rsquo;s
            clinical and technical leadership.
          </p>

          <h3 className="text-2xl font-medium text-cs-dark-blue mb-4">
            2.2 Competency alignment and communication frameworks
          </h3>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Three terms recur here. The competency framework anchors the
            competency assessment, and the program must supply or approve it.
            Communication frameworks are then applied to characterize how the
            learner communicated.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            The two are distinct. The competency score reflects the
            learner&rsquo;s developmental level. The communication frameworks
            capture the specific skills behind communication technique.
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

          <h4 className="text-lg font-medium text-cs-dark-blue mb-2">
            How frameworks are chosen
          </h4>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Each communication framework comes from a cited, published source,
            and the frameworks are a floor, not a ceiling. One or more may be
            applied to a case, each is scored independently, and programs may
            add their own internal or externally validated rubrics.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            These frameworks and rubrics work at different scopes, from
            whole-encounter structures to task-specific routines to discrete
            micro-skills. So ClinicalSim selects the ones best suited to each
            case&rsquo;s communication task.
          </p>

          <h3 className="text-2xl font-medium text-cs-dark-blue mb-4">
            2.3 Evidence and scoring
          </h3>
          <h4 className="text-lg font-medium text-cs-dark-blue mb-2">
            Evidence from the transcript
          </h4>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Each encounter is a voice conversation between the learner and
            an AI role designed for the case, captured as a timestamped
            transcript. For every scored competency and framework step, the
            platform pulls one or two verbatim excerpts that show the
            behavior, or notes that it was absent. Each score traces to the
            moment that supports it, so the output holds up to review instead
            of standing as an unexplained rating.
          </p>
          <h4 className="text-lg font-medium text-cs-dark-blue mb-2">
            What gets scored
          </h4>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Scoring follows the competency framework the case is built on.
            The unit of assessment is the individual competency the case
            exercises. Each communication framework or program rubric applied
            to the case is scored independently of the competency.
          </p>
          <h4 className="text-lg font-medium text-cs-dark-blue mb-2">
            Rating scales
          </h4>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            When an instrument publishes its own rating scale, we use it. Most
            communication frameworks do not. For those, we apply a ClinicalSim
            scale to the framework&rsquo;s own steps and say so in the case,
            so a score is never read as though the framework&rsquo;s
            validation stood behind it.
          </p>
          <h4 className="text-lg font-medium text-cs-dark-blue mb-2">
            Reading scores by stage of training
          </h4>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            These frameworks are developmental. The same result means
            different things at different stages of training, and it is always
            read that way. All scores are shown together with their verbatim
            evidence, so the learner or reviewer sees the complete picture.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            What varies by learner level is the competency framework a case is
            anchored to and how the competency itself is scored. The sections
            below describe each level.
          </p>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-cs-gray/50 border-l-4 border-l-cs-dark-blue p-6 md:p-7">
              <h4 className="text-lg font-medium text-cs-dark-blue mb-3">
                Graduate medical education
              </h4>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                Residency and fellowship cases use the competency framework
                and rating scale that the program approves for that case.
                Each case targets a high-stakes conversation the specialty
                needs to rehearse. It scores only the behaviors the
                conversation can show.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                The report names the standard behind each score and cites the
                learner&rsquo;s words. Faculty and the Clinical Competency
                Committee can review it alongside direct observation and the
                program&rsquo;s other evidence. ClinicalSim does not replace
                their judgment.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-cs-gray/50 border-l-4 border-l-cs-electric p-6 md:p-7">
              <h4 className="text-lg font-medium text-cs-dark-blue mb-3">
                Undergraduate medical education
              </h4>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-3">
                Cases align to two standards:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                <li>
                  The Foundational Competencies for Undergraduate Medical
                  Education (AAMC, AACOM, and ACGME)
                </li>
                <li>
                  The AAMC Core Entrustable Professional Activities (EPAs) for
                  Entering Residency
                </li>
              </ul>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                The Core EPAs were originally mapped to the Physician
                Competency Reference Set (PCRS, 2013). The 2024 Foundational
                Competencies now supersede the PCRS. An updated set of EPAs
                aligned to the Foundational Competencies is anticipated but not
                yet published.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                Until it is, ClinicalSim maps UME cases to the EPAs and to the
                Foundational Competencies independently. It does not assert a
                fixed crosswalk between them.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-3">
                For UME, ClinicalSim records each competency on three points:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                <li>Demonstrated</li>
                <li>Partially demonstrated</li>
                <li>Not demonstrated</li>
              </ul>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                Performance is scored through the applied communication or
                skill rubric. Entrustment, the pre-entrustable to entrustable
                judgment, remains a program decision that this evidence
                informs.
              </p>
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                Development focuses on foundational encounters that mature
                alongside clinical knowledge, from history-taking to
                delivering a diagnosis. The aim is to prepare students for the
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
                Faculty cases use the framework or rubric that the program
                approves for the teaching task. The report is formative
                evidence that informs judgment, not a grade.
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
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-3">
            Each encounter produces a single feedback report. It includes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            <li>
              Verbatim evidence inside the grading rubrics, which justifies
              the level a learner reached or the specific step assessed
            </li>
            <li>
              An overall impression covering strengths, priority gaps, and
              top action items
            </li>
            <li>Targeted recommendations</li>
          </ul>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-3">
            Depending on the case, the report shows where a learner sits
            developmentally. It also gives reviewers transcript-grounded
            evidence for decisions about:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-base text-cs-dark-blue/85 font-light leading-relaxed">
            <li>Progression</li>
            <li>Remediation</li>
            <li>Readiness for practice</li>
            <li>Readiness to perform a particular task</li>
            <li>Familiarity with a given subject area</li>
          </ul>

          <h3 className="text-2xl font-medium text-cs-dark-blue mt-10 mb-4">
            2.5 What a score claims, and what it does not
          </h3>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            The frameworks ClinicalSim applies were built for trained human
            raters observing real encounters. That is how their published
            reliability was established. Scoring them with AI in a simulated
            encounter goes beyond that context, so a framework&rsquo;s
            reliability does not carry over to a ClinicalSim score. Each score
            is a formative signal backed by verbatim transcript evidence.
          </p>
          <h4 className="text-lg font-medium text-cs-dark-blue mb-2">
            How we are testing it
          </h4>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            We are testing that rather than asserting it. In our current
            pilot, program directors review ClinicalSim output alongside their
            own assessment of the same encounters. That comparison is how we
            find out where the platform holds up against the standard, and
            where it complements faculty judgment rather than substituting for
            it.
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
              statement of the evidence in the encounter. It informs the
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
                {/* Same string as the FAQPage JSON-LD; only the visible copy
                    is broken into shorter paragraphs. */}
                <div className="space-y-3">
                  {chunkParagraph(faq.answer, 2).map((chunk, i) => (
                    <p
                      key={i}
                      className="text-base text-cs-dark-blue/85 font-light leading-relaxed"
                    >
                      {chunk}
                    </p>
                  ))}
                </div>
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
            Read the wider FAQ for questions about cost, rollout, and program
            fit. Or work through evaluating ClinicalSim to see what the
            evidence supports, what a procurement review will find, and how it
            is licensed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/faq">
              <Button variant="secondary" size="lg">
                Read the FAQ
              </Button>
            </Link>
            <Link href="/evaluation">
              <Button variant="secondary" size="lg">
                Evaluating ClinicalSim
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
