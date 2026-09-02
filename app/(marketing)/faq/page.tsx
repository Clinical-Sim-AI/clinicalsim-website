import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { FaqAnchorHandler } from "@/components/faq-anchor-handler"
import { CopyLinkButton } from "@/components/copy-link-button"
import { slugify } from "@/lib/utils"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import {
  CATEGORY_DEFINITION,
  CATEGORY_LINE,
  POSITIONING_LONG,
  POSITIONING_ONE_LINER,
} from "@/lib/positioning"
import {
  NO_EMPLOYMENT_USE_LIMITATION,
  NO_OUTCOME_PREDICTION_LIMITATION,
} from "@/lib/claim-discipline"

export const metadata: Metadata = {
  title: { absolute: "FAQ: communication intelligence, scoring, privacy, and programs" },
  description: POSITIONING_LONG,
  openGraph: {
    title: "FAQ | ClinicalSim.ai",
    description: POSITIONING_LONG,
    url: "https://clinicalsim.ai/faq",
  },
  twitter: {
    title: "FAQ | ClinicalSim.ai",
    description: POSITIONING_LONG,
  },
  alternates: {
    canonical: "https://clinicalsim.ai/faq",
  },
}

// Visible + schema recency. Update whenever answers change.
const LAST_UPDATED_ISO = PAGE_DATE_MODIFIED.faq
const LAST_UPDATED_LABEL = "September 1, 2026"

interface FaqEntry {
  id: string
  question: string
  // Plain-text answer. Used for FAQPage JSON-LD and as the display fallback.
  // Must match the visible answer text.
  answer: string
  // Optional rich display (adds inline links). Its text content must match `answer`.
  answerNode?: ReactNode
}

interface FaqSection {
  category: string
  items: FaqEntry[]
}

const faqSections: FaqSection[] = [
  {
    category: "About ClinicalSim",
    items: [
      {
        id: "what-is-clinicalsim",
        question: "What is ClinicalSim?",
        // Leads with the canonical sentences from lib/positioning.ts. This
        // answer used to be a fourth competing description of the company.
        // POSITIONING_SUPPORT is left out here because CATEGORY_DEFINITION
        // already names both scoring paths and the quoted words.
        answer: `${CATEGORY_LINE} ${CATEGORY_DEFINITION} ${POSITIONING_ONE_LINER}`,
      },
      {
        id: "replaces-step-2-cs",
        question: "Is ClinicalSim a replacement for Step 2 CS?",
        answer:
          "No. USMLE discontinued Step 2 CS in 2021, and no national successor now assesses spoken clinical communication. ClinicalSim adds repeatable practice and formative evidence within a program. It is not a national exam or a replacement for human judgment.",
      },
      {
        id: "vs-standardized-patients",
        question: "How is ClinicalSim different from a standardized patient program?",
        answer:
          "ClinicalSim extends standardized patient (SP) programs and does not replace them. SP encounters remain important for live coaching and high-stakes assessment. ClinicalSim adds repeatable practice between those encounters, without requiring another actor or room for each attempt.",
      },
      {
        id: "vs-chatgpt",
        question:
          "How is ClinicalSim different from using ChatGPT to practice high-stakes conversations?",
        answer:
          "A general AI assistant can improvise a conversation. ClinicalSim uses physician-authored cases with fixed objectives, named frameworks, repeatable scoring logic, and transcript evidence a faculty member can review across learners.",
      },
      {
        id: "communication-remediation",
        question: "What is communication remediation, and how does ClinicalSim support it?",
        answer:
          "Communication remediation is the structured practice and feedback a program uses to help a learner improve interpersonal and communication skills. In a CERA survey of 267 family medicine program directors, 93% reported at least one resident in remediation during the prior three years, and 50% selected an accessible remediation toolkit as the most important tool for improving the process (Frazier et al., Family Medicine, 2021). ClinicalSim adds repeatable practice and transcript evidence for faculty and CCC review.",
      },
    ],
  },
  {
    category: "Health system use",
    items: [
      {
        id: "patient-experience-training",
        question: "How can a patient experience team use ClinicalSim?",
        answer:
          "A patient experience team can start with one unit and one behavior the institution already teaches, such as listening, explanation, teach back, or a service script. Staff practice with AI patients, and leaders can review named cohort or anonymous unit results with transcript evidence behind each score.",
      },
      {
        id: "nonclinical-staff",
        question: "Can nonclinical patient facing staff use ClinicalSim?",
        answer:
          "Yes. Environmental services, food service, transport, and other patient facing teams can use browser based cases designed for their role. Clinical content should stay limited to what that role would handle in practice.",
      },
      {
        id: "anonymous-unit-reporting",
        question: "Can leaders receive anonymous unit results?",
        answer:
          "Yes. An institution can use anonymous participant IDs and receive aggregate unit or cohort reports. Named completion records and named coaching access are separate choices that should follow the training policy and labor agreements set before launch.",
      },
      {
        id: "patient-outcome-prediction",
        question: "Does ClinicalSim predict HCAHPS, Qualtrics, or other patient outcomes?",
        answer: NO_OUTCOME_PREDICTION_LIMITATION,
      },
      {
        id: "employment-decisions",
        question: "Can staff scores be used for employment decisions?",
        answer: NO_EMPLOYMENT_USE_LIMITATION,
      },
    ],
  },
  {
    category: "Using the platform",
    items: [
      {
        id: "psychologically-safe",
        question: "Can learners practice privately?",
        answer:
          "Learners practice privately, without a faculty observer in the encounter. They can repeat a case before sharing the report with a coach or program.",
      },
      {
        id: "audio-only",
        question: "Why is ClinicalSim audio-only instead of video or avatars?",
        answer:
          "Voice practice can surface pacing, silence, word choice, and real-time responses to emotion. It cannot assess eye contact, body language, or physical presence, so those skills remain part of live encounters and human review.",
      },
      {
        id: "devices-and-install",
        question: "What device do learners need, and is there anything to install?",
        answer:
          "Learners can practice on any device, a phone, a tablet, or a desktop, wherever they are. ClinicalSim runs entirely in the browser, so there is nothing to download and no app to install.",
      },
      {
        id: "encounter-length",
        question: "How long does a typical encounter take?",
        answer:
          "A typical ClinicalSim encounter takes between 3 and 10 minutes, short enough to fit into a clinical day and repeat as often as a learner needs.",
      },
      {
        id: "languages",
        question: "What languages does ClinicalSim support?",
        answer:
          "ClinicalSim currently supports English.",
      },
    ],
  },
  {
    category: "Cases and scenarios",
    items: [
      {
        id: "how-cases-created",
        question: "How are ClinicalSim cases created?",
        answer:
          "Named physicians write and review each case for clinical accuracy, standards alignment, and fit with its learning objectives. The full process is documented on the methodology page.",
        answerNode: (
          <p>
            Named physicians write and review each case for clinical accuracy,
            standards alignment, and fit with its learning objectives. The full
            process is documented on the{" "}
            <Link
              href="/methodology"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              methodology page
            </Link>
            .
          </p>
        ),
      },
      {
        id: "build-own-scenarios",
        question: "Can learners and faculty build their own scenarios?",
        answer:
          "Faculty can work with ClinicalSim staff to develop a case for a specific learner group and communication objective. Case development support depends on the pilot or study scope.",
        answerNode: (
          <p>
            <Link
              href="/contact"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              Faculty can work with ClinicalSim staff
            </Link>
            {" "}to develop a case for a specific learner group and communication
            objective. Case development support depends on the pilot or study
            scope.
          </p>
        ),
      },
      {
        id: "case-ready",
        question: "How does ClinicalSim confirm a case is ready to release?",
        answer:
          "Before release, each case is run repeatedly to check the AI patient's role, the scoring and feedback, and whether the case gives learners a fair chance to show each assessed behavior. Clinical and technical reviewers revise the case before publication.",
      },
    ],
  },
  {
    category: "Scoring and My Progress",
    items: [
      {
        id: "my-progress",
        question: "What scores feed into My Progress?",
        answer:
          "Each completed simulation produces scored fields from the case rubric and a narrative report. My Progress uses those scores to show assignment completion and competency trends, based on the program's configuration. A case that cannot assess performance above a certain level is excluded from the overall rollup when that ceiling would make strong performance look low. Learners do not see peer comparisons.",
      },
      {
        id: "evidence-capture",
        question: "How is evidence captured during a simulated encounter?",
        answer:
          "Each encounter is a voice conversation between the learner and an AI patient designed for the case, captured as a timestamped transcript. For every scored competency and framework step, the platform draws one or two verbatim excerpts that demonstrate the behavior, or documents its absence, so each score is traceable to the moment that supports it, rather than serving as an unexplained rating.",
      },
      {
        id: "gme-scoring",
        question: "How are graduate medical education (GME) cases scored?",
        answer:
          "GME cases use the specialty-specific ACGME Milestones 2.0 and quote the relevant descriptors from each specialty's document. The report scores only the subcompetencies the case gives the learner a fair chance to show. Faculty can use the report as one source of evidence in CCC review.",
      },
      {
        id: "ume-scoring",
        question:
          "How are undergraduate medical education (UME) cases scored, since there's no five-level milestone scale?",
        answer:
          "UME cases align to the Foundational Competencies for Undergraduate Medical Education (AAMC, AACOM, and ACGME) and the AAMC Core Entrustable Professional Activities (EPAs) for Entering Residency. Because the Foundational Competencies are not published with the milestones' five-level scale, ClinicalSim does not assign a numeric level for UME; it records whether each competency was demonstrated and scores performance through the applied communication or skill rubric. Entrustment remains a program decision that this evidence informs.",
      },
      {
        id: "high-stakes",
        question: "Can ClinicalSim's milestone-aligned scores be used for high-stakes decisions?",
        answer:
          "No. The ACGME Milestones are formative and were not designed for high-stakes external decisions, and ClinicalSim treats milestone-aligned output accordingly, as evidence that informs program judgment, not as a stand-alone basis for high-stakes decisions.",
      },
    ],
  },
  {
    category: "Standards and frameworks",
    items: [
      {
        id: "framework-vs-rubric",
        question:
          "What is the difference between a competency framework, a communication framework, and a rubric?",
        answer:
          "A competency framework is the governing-body standard a case uses, such as the ACGME Milestones 2.0 in graduate medical education or the Foundational Competencies in undergraduate medical education. A communication framework is a published model of communication behavior, such as SPIKES or Calgary-Cambridge. A rubric turns the relevant framework into scored items for that case.",
      },
      {
        id: "multiple-frameworks",
        question: "Can more than one communication framework apply to a single case?",
        answer:
          "Yes. A case may use more than one communication framework when each one measures a different part of the task. Every framework names its published source, and programs may add their own rubrics. The report scores each framework separately.",
      },
      {
        id: "which-frameworks",
        question: "Which communication frameworks does ClinicalSim use?",
        answer:
          "ClinicalSim uses representative frameworks including SPIKES, the Kalamazoo Essential Elements Communication Checklist (KEECC-A), SEGUE, NURSE, REMAP, SBAR, I-PASS, TeamSTEPPS, CANDOR, and Calgary-Cambridge. Full citations are maintained in the ClinicalSim Frameworks Bibliography; see the full methodology page for representative sources.",
        answerNode: (
          <p>
            ClinicalSim uses representative frameworks including SPIKES, the
            Kalamazoo Essential Elements Communication Checklist (KEECC-A),
            SEGUE, NURSE, REMAP, SBAR, I-PASS, TeamSTEPPS, CANDOR, and
            Calgary-Cambridge. Full citations are maintained in the ClinicalSim
            Frameworks Bibliography; see the full{" "}
            <Link
              href="/methodology"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              methodology page
            </Link>{" "}
            for representative sources.
          </p>
        ),
      },
    ],
  },
  {
    category: "Feedback",
    items: [
      {
        id: "feedback-report",
        question: "What does a ClinicalSim feedback report include?",
        answer:
          "Each encounter produces a report with rubric scores, strengths, priority gaps, and suggested next steps. Every scored item cites evidence from the transcript. The report is formative evidence for the learner and faculty reviewer, not a verdict or a substitute for human judgment.",
      },
      {
        id: "faculty-methodology",
        question: "Does ClinicalSim's methodology extend beyond trainees to faculty?",
        answer:
          "Yes. Faculty can rehearse corrective feedback, professionalism concerns, bedside teaching, and peer conversations. They receive the same framework-based report and transcript evidence used in learner cases.",
      },
    ],
  },
  {
    category: "For programs and leadership",
    items: [
      {
        id: "who-is-it-for",
        question: "Who is ClinicalSim for, and which specialties does it cover?",
        answer:
          "ClinicalSim currently supports graduate medical education, undergraduate medical education, communication remediation, and faculty development. Cases and frameworks change with the learner, specialty, and conversation.",
      },
      {
        id: "faculty-monitoring",
        question: "How can faculty monitor learner progress without attending sessions?",
        answer:
          "Faculty with program access can review assigned learners' progress, recordings, transcripts, and feedback without attending the practice session. Program permissions determine which learner records each faculty member can see.",
      },
      {
        id: "ccc-review",
        question:
          "Can ClinicalSim output be used in Clinical Competency Committee (CCC) review?",
        answer:
          "Yes. Each practice report maps observed behavior to the relevant milestone and cites the learner's words. A CCC can review it alongside faculty observation and the other evidence it already uses. The report does not replace faculty judgment or the committee's decision.",
      },
    ],
  },
  {
    // Added 2026-08-31. The methodology page's CTA has been sending readers
    // here for "pricing, rollout, and program fit" while this page answered
    // none of the three. Sources per answer: licensing is the structure of
    // lib/roi/constants.public.json with no figure (Ben's decision, budget
    // framing only); the rest restate /faq "devices-and-install",
    // "encounter-length", "languages", /help/roles-and-permissions,
    // lib/release-notes.ts 2026-08-03, lib/examples/*.ts, and /research.
    category: "Cost, rollout, and program fit",
    items: [
      {
        id: "how-licensed",
        question: "How is ClinicalSim licensed, and how should a program budget for it?",
        answer:
          "ClinicalSim is an annual per-learner subscription, so it lands as operating expense rather than a capital purchase. In most academic medical centers that distinction matters more to how the decision gets routed than the size of the number does. What a program pays depends on how many learners it covers, which cases it needs, and the term, so there is no list price published here.",
      },
      {
        id: "what-to-start",
        question: "What does a program need in place to start?",
        answer:
          "A browser and a list of learners. ClinicalSim runs on any phone, tablet, or desktop with nothing to download and no app to install, and a typical encounter takes 3 to 10 minutes. Someone has to hold the Project Manager or Admin role to build a cohort, choose the cases, and invite learners, which can be done in bulk. There is no simulation center booking, no actor to recruit, and no room to reserve.",
      },
      {
        id: "it-requirements",
        question: "What does IT need to allow?",
        answer:
          "The voice service is the one thing a hospital network sometimes blocks. Firewalls, VPNs, and web filters can cut the voice connection before a session starts, which to a learner looks like a slow network rather than a block. The briefing page runs a connection test that checks whether the network can actually reach the voice service and, when it cannot, says so plainly and names what to ask IT to allow. The check is advisory and never stops a learner from starting.",
      },
      {
        id: "who-owns-decision",
        question: "Who inside an institution usually owns this decision?",
        answer:
          "Communication training rarely has one owner, which is why these purchases stall. The office that feels the problem, the office that holds the budget, and the office that has to defend the decision are often three different offices: program directors, DIOs and GME leadership, simulation center directors, clinical competency committees, medical school and UME leadership, faculty and clinician educators, risk and patient safety, and quality and patient experience. The evaluation page states the case for each of those roles and links to a page written in that role's own terms.",
      },
      {
        id: "see-before-deciding",
        question: "Can we see real ClinicalSim encounters before deciding?",
        answer:
          "Yes. Four complete encounters are published with the audio, the full transcript, and the entire scored report, with no sign-in and no form. They are deliberately unflattering: the informed consent encounter scored 22 out of 30 and the vaccine hesitancy encounter scored 17 out of 25, with the weak domains named and the learner's own words quoted as the reason. Reading one of those reports tells a program more than a demo does.",
      },
      {
        id: "research-response-time",
        question: "How quickly does ClinicalSim respond to a research proposal?",
        answer:
          "Research applications are reviewed on a rolling basis and ClinicalSim typically responds within 1 to 2 weeks. The deciding question is whether the platform genuinely fits the study rather than whether the study flatters the platform, so a proposal needing a capability ClinicalSim does not have is better turned down than stretched.",
      },
    ],
  },
  {
    category: "Data, privacy, and research",
    items: [
      {
        id: "voice-data",
        question: "What happens to a learner's voice recordings and data?",
        answer:
          "ClinicalSim stores recordings, transcripts, account data, and program data to provide practice history and faculty review. Access depends on the learner's institutional arrangement. The trust and data handling page describes current collection, access, retention, and deletion practices.",
        answerNode: (
          <p>
            ClinicalSim stores recordings, transcripts, account data, and program
            data to provide practice history and faculty review. Access depends
            on the learner&apos;s institutional arrangement. The{" "}
            <Link
              href="/trust"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              trust and data handling page
            </Link>
            {" "}describes current collection, access, retention, and deletion
            practices.
          </p>
        ),
      },
      {
        id: "research",
        question: "Can ClinicalSim be used for research?",
        answer:
          "Yes. Depending on the study, ClinicalSim can provide platform access, case development support, participant onboarding, structured exports of study data, and technical documentation for an IRB submission. The research page explains how to propose a study.",
        answerNode: (
          <p>
            Yes. Depending on the study, ClinicalSim can provide platform access,
            case development support, participant onboarding, structured exports
            of study data, and technical documentation for an IRB submission. The{" "}
            <Link
              href="/research"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              research page
            </Link>{" "}
            explains how to propose a study.
          </p>
        ),
      },
      {
        id: "accuracy",
        question: "How does ClinicalSim ensure accuracy?",
        answer:
          "Every score cites one or two excerpts from the transcript, so a reviewer can check the rating against what the learner said. ClinicalSim is testing score performance in pilots and does not claim that its ratings are more accurate or fairer than faculty judgment. The report is formative evidence that a faculty member or committee can accept, question, or override.",
      },
    ],
  },
]

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: faqSections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question" as const,
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: item.answer,
        },
      }))
    ),
  }

  return (
    <>
      <FaqAnchorHandler />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ClinicalSim.ai FAQ",
            description:
              "Common questions about ClinicalSim's AI clinical simulation: the product, how it compares to Step 2 CS and standardized patients, communication remediation, ACGME Milestone scoring and My Progress, evidence for CCC review, privacy, and research.",
            url: "https://clinicalsim.ai/faq",
            dateModified: LAST_UPDATED_ISO,
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
                name: "FAQ",
                item: "https://clinicalsim.ai/faq",
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
            <span className="text-cs-dark-blue/85">FAQ</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-6 text-cs-dark-blue">
            Frequently asked{" "}
            <span className="font-medium">questions</span>
          </h1>

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed max-w-3xl">
            What ClinicalSim is, how cases and scoring work, what programs can
            do with the results, and how learner data is handled. For the full
            picture of how cases are built and scored, see our{" "}
            <Link
              href="/methodology"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              methodology page
            </Link>
            . For the questions behind a purchase, including evidence limits,
            procurement, and licensing, see{" "}
            <Link
              href="/evaluation"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              evaluating ClinicalSim
            </Link>
            .
          </p>

          <p className="mt-6 text-sm text-cs-dark-gray">
            Last updated {LAST_UPDATED_LABEL}
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* FAQ sections */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqSections.map((section) => (
            <div
              key={section.category}
              id={slugify(section.category)}
              className="scroll-mt-24"
            >
              <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-light text-cs-navy mb-6">
                {section.category}
                <CopyLinkButton
                  id={slugify(section.category)}
                  label={`Copy link to ${section.category} section`}
                />
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    id={item.id}
                    className="border border-cs-gray/50 rounded-xl overflow-hidden scroll-mt-24"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-medium text-cs-dark-blue pr-4">
                          {item.question}
                        </h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <CopyLinkButton
                            id={item.id}
                            label={`Copy link to "${item.question}"`}
                          />
                          <ChevronRight className="w-5 h-5 text-cs-gray transition-transform group-open:rotate-90" />
                        </div>
                      </summary>
                      <div className="px-6 pb-5 pt-2 text-base text-cs-dark-blue font-light leading-relaxed space-y-4">
                        {item.answerNode ?? <p>{item.answer}</p>}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" />

      {/* CTA */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-cs-navy mb-4">
            Still have{" "}
            <span className="text-cs-dark-blue font-medium">questions?</span>
          </h2>
          <p className="text-base text-cs-dark-blue/70 font-light leading-relaxed mb-8">
            Read the full methodology, or talk to us about piloting
            ClinicalSim at your program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/methodology">
              <Button variant="secondary" size="lg">
                Read the full methodology
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="default" size="lg">
                Start with an assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
