import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/feature-card"
import type { BrandIconName } from "@/components/brand-icon"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { AuthorByline } from "@/components/author-byline"
import { getAuthorById } from "@/lib/authors"

export const metadata: Metadata = {
  title: "Methodology: Case Development, Standards Alignment & Feedback",
  description:
    "How ClinicalSim.ai builds cases, anchors them to ACGME Milestones 2.0 or the Foundational Competencies, applies validated communication frameworks like SPIKES and Calgary-Cambridge, and generates transcript-grounded, competency-based feedback.",
  openGraph: {
    title: "Methodology | ClinicalSim.ai",
    description:
      "Case development, standards alignment, and feedback generation behind ClinicalSim's voice-based clinical simulation platform — quality, consistency, and alignment to published frameworks.",
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

const LAST_UPDATED = "2026-07-02"
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
      "Every score traces to a published competency or a validated communication framework — never to an unexplained rating.",
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
      "The governing-body standard a case is assessed against — the ACGME Milestones 2.0 in graduate medical education, or the Foundational Competencies in undergraduate medical education.",
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
      "The scored instrument that turns a framework into rated items — including a program's own internal or externally validated tools.",
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
            dateModified: LAST_UPDATED,
            author: author
              ? {
                  "@type": "Person",
                  name: author.name,
                  honorificSuffix: author.credentials,
                  jobTitle: author.title,
                  worksFor: {
                    "@type": "Organization",
                    name: "ClinicalSim.ai",
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
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 pt-12 md:pt-20 pb-4 md:pb-6">
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
              Last updated: July 2026
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
              to a verbatim excerpt from the encounter transcript — never to
              an unexplained rating.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Purpose and scope */}
      <section className="px-6 py-12 md:py-16 bg-white">
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
      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
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
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-10">
            Every case begins with a defined purpose: the communication and
            clinical skills it should exercise and the competencies it
            should assess. Content is written to that purpose, with explicit
            learning objectives and a clinical evidence base drawn from
            foundational and other applicable literature. Physicians then
            review each case for accuracy, content, alignment, and fit to
            its objectives; reviewers are practicing physicians with strong
            academic backgrounds and decades of collective experience,
            including program directors, simulation facilitators, and UME
            and GME educators. Before release, each case is run repeatedly
            to confirm three things: that the AI character convincingly
            plays the role the case requires; that scoring and feedback
            perform as intended; and that what the case asks can be assessed
            within the limits of voice-based simulation. Refinements are
            made in coordination with ClinicalSim&rsquo;s clinical and
            technical leadership.
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
            Each communication framework is drawn from a validated library
            with an approved citation and serves as a floor, not a ceiling:
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
            program rubric is scored independently of the competency, and
            may follow the framework&rsquo;s discrete steps, with a Likert
            scale where finer resolution is useful. Because these
            frameworks are developmental, a given result carries different
            meaning at different stages of training and is always
            interpreted accordingly. All scores are presented together, with
            their verbatim evidence, so the learner or reviewer sees a
            complete picture. What varies is the competency framework a case
            is anchored to and how the competency itself is scored,
            described by learner level below.
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
                accordingly, as evidence that informs program judgment.
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
                The Foundational Competencies are not published with the
                milestones&rsquo; five-level scale, so for UME ClinicalSim
                does not assign a numeric level; it records whether each
                competency was demonstrated and scores performance through
                the applied communication or skill rubric. Entrustment, the
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
              <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                The same case-building and assessment methods extend to the
                conversations faculty are expected to model, including
                delivering difficult feedback, navigating professionalism
                concerns, and bedside or small-group teaching.
              </p>
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
        </div>
      </section>

      <SectionDivider variant="curve" color="white" />

      {/* Commitment to accuracy */}
      <section className="px-6 pt-12 md:pt-16 pb-4 md:pb-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            3. Commitment to{" "}
            <span className="text-cs-dark-blue font-medium">accuracy</span>
          </h2>
          <div className="rounded-xl bg-cs-navy px-6 py-6">
            <p className="text-base md:text-lg text-white font-light leading-relaxed">
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

      {/* References */}
      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            4. References
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
                  Calgary-Cambridge. Kurtz S, Silverman J, Draper J. 2nd ed.
                  Radcliffe; 2005.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* CTA */}
      <section className="px-6 py-12 md:py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-cs-navy mb-4">
            Questions about how this{" "}
            <span className="text-cs-dark-blue font-medium">works?</span>
          </h2>
          <p className="text-base text-cs-dark-blue/70 font-light leading-relaxed mb-8">
            See common questions about case development, scoring, and
            feedback, or talk to us about piloting ClinicalSim at your
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
