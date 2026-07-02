import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "FAQ: AI Clinical Simulation, Scoring, Privacy & Programs",
  description:
    "Answers to common questions about ClinicalSim: what it is, how it compares to Step 2 CS and standardized patients, communication remediation, ACGME Milestone scoring, My Progress, CCC-ready documentation, privacy, and research.",
  openGraph: {
    title: "FAQ | ClinicalSim.ai",
    description:
      "Common questions about ClinicalSim's AI clinical simulation: the product, scoring and My Progress, standards alignment, privacy, and research.",
    url: "https://clinicalsim.ai/faq",
  },
  twitter: {
    title: "FAQ | ClinicalSim.ai",
    description:
      "Common questions about ClinicalSim's AI clinical simulation: the product, scoring and My Progress, standards alignment, privacy, and research.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/faq",
  },
}

// Visible + schema recency. Update whenever answers change.
const LAST_UPDATED_ISO = "2026-07-02"
const LAST_UPDATED_LABEL = "July 2, 2026"

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
        answer:
          "ClinicalSim is a voice-based AI clinical simulation built for communication practice in medical education. Learners talk through high-stakes conversations, breaking bad news, goals-of-care discussions, informed consent, difficult family meetings, with an AI patient built for that case, and they get structured feedback grounded in validated communication rubrics and mapped to ACGME Milestones. Every case is written and reviewed by practicing clinicians, and learners can practice on demand from any device.",
      },
      {
        id: "replaces-step-2-cs",
        question: "Is ClinicalSim a replacement for Step 2 CS?",
        answer:
          "No. ClinicalSim is not an assessment that replaces Step 2 CS. It is a place to practice, which is the piece most missing from communication training today. When Step 2 CS was discontinued in 2021, programs lost a shared way to practice and check communication skills, and ClinicalSim fills the practice gap rather than acting as a high-stakes exam.",
      },
      {
        id: "vs-standardized-patients",
        question: "How is ClinicalSim different from a standardized patient program?",
        answer:
          "ClinicalSim supplements standardized patient (SP) programs, it does not replace them. SP encounters are the gold standard for high-stakes assessment, but they cost roughly $150 to $300 each, take scheduling and coordination, and give a learner only a handful of reps. ClinicalSim adds unlimited, on-demand practice in between those encounters, so SPs and faculty are freed for the high-stakes moments where physical presence matters.",
      },
      {
        id: "vs-chatgpt",
        question:
          "How is ClinicalSim different from using ChatGPT to practice difficult conversations?",
        answer:
          "Unlike a general chatbot, every ClinicalSim case is created and reviewed by expert clinicians, including palliative care physicians, with decades of combined practice. The encounters are structured and the feedback is grounded in validated communication rubrics, not improvised, and ClinicalSim runs robust checks so that scoring and feedback stay accurate and consistent from one learner to the next.",
      },
      {
        id: "communication-remediation",
        question: "What is communication remediation, and how does ClinicalSim support it?",
        answer:
          "Communication remediation is the structured practice and feedback a program uses to help a learner improve interpersonal and communication skills, often the hardest competencies to fix. Programs spend roughly 29 to 45 faculty hours per remediation case (University of Colorado, 29.6 mean, and Penn's EIRC, 45 average; Guerrasio et al., 2014), and 93% of residency programs have faced remediation in the past three years (CERA Survey). ClinicalSim supports remediation by giving learners repeated, on-demand practice with expert-built cases and by generating milestone-aligned feedback and CCC-ready documentation that program directors can act on, without consuming that faculty time.",
      },
    ],
  },
  {
    category: "Using the platform",
    items: [
      {
        id: "psychologically-safe",
        question: "Is ClinicalSim a private, psychologically safe place to practice?",
        answer:
          "Yes, and it is one of the things learners tell us they value most. Practicing with ClinicalSim removes the fear of being judged by supervisors, seniors, or peers, which makes learners far more willing to practice and to make the mistakes that learning requires. That reflects a well-established idea in simulation: learning depends on a psychologically safe container where trainees can engage without threat to their standing (Rudolph, Raemer & Simon, Simulation in Healthcare, 2014).",
      },
      {
        id: "audio-only",
        question: "Why is ClinicalSim audio-only instead of video or avatars?",
        answer:
          "ClinicalSim is audio-only on purpose, to avoid the uncanny valley. Programs that have tried AI avatars tell us learners are turned off by them, and the artificial faces get in the way of the conversation. We believe the first step in communication is knowing what to say, which frameworks to use and which words land, and once that foundation is solid a learner can build the layers on top of it, body language, eye contact, and presence.",
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
          "ClinicalSim currently supports English. Support for additional languages is on the roadmap, so learners can eventually practice across the range of languages their patients speak.",
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
          "Every ClinicalSim case is built by expert clinicians to a defined purpose, then reviewed for accuracy, alignment, and fit before release. The full process, from clinical evidence base through validation, is documented on the methodology page.",
        answerNode: (
          <p>
            Every ClinicalSim case is built by expert clinicians to a defined
            purpose, then reviewed for accuracy, alignment, and fit before
            release. The full process, from clinical evidence base through
            validation, is documented on the{" "}
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
          "Yes. Learners and faculty can build their own scenarios today in partnership with ClinicalSim staff, for the specific conversations they need to practice, such as discussing a new cancer diagnosis with a family that has limited English proficiency. Fully self-serve scenario creation is on the roadmap.",
        answerNode: (
          <p>
            Yes. Learners and faculty can build their own scenarios today in{" "}
            <Link
              href="/contact"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              partnership with ClinicalSim staff
            </Link>
            , for the specific conversations they need to practice, such as
            discussing a new cancer diagnosis with a family that has limited
            English proficiency. Fully self-serve scenario creation is on the
            roadmap.
          </p>
        ),
      },
      {
        id: "case-ready",
        question: "How does ClinicalSim confirm a case is ready to release?",
        answer:
          "Before release, each case is run repeatedly to confirm three things: that the AI character convincingly plays the role the case requires; that scoring and feedback perform as intended; and that what the case asks can be assessed within the limits of voice-based simulation. Refinements are made in coordination with ClinicalSim's clinical and technical leadership.",
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
          "Every simulation you complete is graded against a rubric, either a custom rubric built for that case or a standardized framework like the ACGME Milestones. Grading produces a narrative writeup plus scored fields: for milestone-based rubrics, that's a single level (1 to 5) representing the highest level you demonstrated on that competency during the encounter. Those per-attempt scores roll up into your progress in two places. Assignment progress tracks whether you've completed what's been assigned: if your program uses target scores, a simulation counts as complete once one of your attempts meets the target for every scored competency it covers, otherwise any graded attempt marks it complete. Competency and milestone progress aggregates your scores on each competency across every simulation that touches it (using your best, most recent, or average score, depending on configuration) and compares that to the level expected for your training stage, showing you as on track, approaching, or below. One nuance: not every case can surface every level of skill, since a single encounter often can't call for the most advanced, longitudinal, or systems-level behaviors a competency describes. When a competency's scenarios genuinely couldn't have let you show a higher level than what's expected of you, that competency is still shown to you so you get the feedback, but it's excluded from your overall rolled-up score, so a strong performance on a capped case never reads as underperformance. Your progress is personal to you. We don't show you how you compare to other learners.",
        answerNode: (
          <>
            <p>
              Every simulation you complete is graded against a rubric, either a
              custom rubric built for that case or a standardized framework like
              the ACGME Milestones. Grading produces a narrative writeup plus
              scored fields: for milestone-based rubrics, that's a single level
              (1 to 5) representing the highest level you demonstrated on that
              competency during the encounter.
            </p>
            <p>Those per-attempt scores roll up into your progress in two places:</p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                Assignment progress tracks whether you've completed what's been
                assigned. If your program uses target scores, a simulation counts
                as complete once one of your attempts meets the target for every
                scored competency it covers; otherwise, any graded attempt marks
                it complete.
              </li>
              <li>
                Competency and milestone progress aggregates your scores on each
                competency across every simulation that touches it (using your
                best, most recent, or average score, depending on configuration)
                and compares that to the level expected for your training stage,
                showing you as on track, approaching, or below.
              </li>
            </ul>
            <p>
              One nuance: not every case can surface every level of skill, since a
              single encounter often can't call for the most advanced,
              longitudinal, or systems-level behaviors a competency describes.
              When a competency's scenarios genuinely couldn't have let you show a
              higher level than what's expected of you, that competency is still
              shown to you so you get the feedback, but it's excluded from your
              overall rolled-up score, so a strong performance on a capped case
              never reads as underperformance.
            </p>
            <p>
              Your progress is personal to you. We don't show you how you compare
              to other learners.
            </p>
          </>
        ),
      },
      {
        id: "evidence-capture",
        question: "How is evidence captured during a simulated encounter?",
        answer:
          "Each encounter is a voice conversation between the learner and an AI role designed for the case, captured as a timestamped transcript. For every scored competency and framework step, the platform draws one or two verbatim excerpts that demonstrate the behavior, or documents its absence, so each score is traceable to the moment that supports it, rather than serving as an unexplained rating.",
      },
      {
        id: "gme-scoring",
        question: "How are graduate medical education (GME) cases scored?",
        answer:
          "GME cases align to the specialty-specific ACGME Milestones 2.0, with milestone text quoted verbatim from each specialty's own document. Scoring reflects whichever subcompetencies the scenario exercises, most often interpersonal and communication skills and professionalism, plus systems-based practice or other domains where the encounter warrants, each scored on the Dreyfus scale (1 to 5), read against the milestone's verbatim level descriptors. The result is milestone-placed and ready for Clinical Competency Committee review.",
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
          "A competency framework is the governing-body standard a case is assessed against, the ACGME Milestones 2.0 in graduate medical education, or the Foundational Competencies in undergraduate medical education. A communication framework is a validated, published model of communication behavior, such as SPIKES or Calgary-Cambridge. A rubric is the scored instrument that turns a framework into rated items, including a program's own internal or external tools. The competency score reflects the learner's developmental level, while communication frameworks capture the specific skills underlying communication technique.",
      },
      {
        id: "multiple-frameworks",
        question: "Can more than one communication framework apply to a single case?",
        answer:
          "Yes. Each communication framework is drawn from a validated library with an approved citation and serves as a floor, not a ceiling. One or more may be applied to a case, each scored independently, and programs may add their own internal or externally validated rubrics. Because these frameworks and rubrics operate at different scopes, from whole-encounter structures to task-specific routines to discrete micro-skills, ClinicalSim selects those best suited to each case's communication task.",
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
          "Each encounter produces a single feedback report. Verbatim evidence is incorporated into the grading rubrics, justifying the level a learner reached or the specific step assessed. The report offers an overall impression (strengths, priority gaps, and top action items) and targeted recommendations. Depending on the case, it indicates where a learner sits developmentally and gives reviewers transcript-grounded evidence for decisions about progression, remediation, readiness for practice, readiness to perform a particular task, or familiarity with a given subject area.",
      },
      {
        id: "faculty-methodology",
        question: "Does ClinicalSim's methodology extend beyond trainees to faculty?",
        answer:
          "Yes. The same case-building and assessment methods extend to the conversations faculty are expected to model, including delivering difficult feedback, navigating professionalism concerns, and bedside or small-group teaching.",
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
          "ClinicalSim is for all clinicians. The current focus is graduate and undergraduate medical education, with scenarios for faculty now expanding, and nursing and physician assistant training on the path ahead. The goal is to improve communication at every level of a medical institution.",
      },
      {
        id: "faculty-monitoring",
        question: "How can faculty monitor learner progress without attending sessions?",
        answer:
          "Faculty have full transparency into every learner's practice without needing to be in the room. They can see each learner's progress, listen to the simulations, read the transcripts, and review the feedback, so oversight does not depend on attendance.",
      },
      {
        id: "ccc-review",
        question:
          "Can ClinicalSim output be used in Clinical Competency Committee (CCC) review?",
        answer:
          "Yes. ClinicalSim automatically generates CCC-ready reports for remediation, scored against the milestones, that give program directors informative data points from a learner's encounters. This output is meant to inform the committee's judgment, with exact quotes, strengths, and areas for improvement, not to replace the in-person evaluations that faculty perform every day.",
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
          "ClinicalSim stores a learner's voice recordings and encounter data so that practice history and progress are available to the learner and their faculty. Learners can request deletion of their data at any time. Full detail is in the privacy policy.",
        answerNode: (
          <p>
            ClinicalSim stores a learner's voice recordings and encounter data so
            that practice history and progress are available to the learner and
            their faculty. Learners can request deletion of their data at any
            time. Full detail is in the{" "}
            <Link
              href="/privacy"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              privacy policy
            </Link>
            .
          </p>
        ),
      },
      {
        id: "model-training",
        question: "Does ClinicalSim use learner conversations to train AI models?",
        answer:
          "No. ClinicalSim does not use learner conversations to train AI models. What we are building, using real-world examples from practicing physicians, is a standard for what good, objective communication looks like.",
      },
      {
        id: "research",
        question: "Can ClinicalSim be used for research?",
        answer:
          "Yes. ClinicalSim actively supports research and provides the platform to researchers at no cost; for grant-funded studies we typically ask for a portion to cover our time. ClinicalSim has been used in research with the University of Chicago, Georgetown University, Johns Hopkins University, Advocate Health System, and Norton Children's Hospital in Louisville, Kentucky, with findings presented at IPSSW 2026 and peer-reviewed publications planned for later this year. See the research page to collaborate.",
        answerNode: (
          <p>
            Yes. ClinicalSim actively supports research and provides the platform
            to researchers at no cost; for grant-funded studies we typically ask
            for a portion to cover our time. ClinicalSim has been used in research
            with the University of Chicago, Georgetown University, Johns Hopkins
            University, Advocate Health System, and Norton Children's Hospital in
            Louisville, Kentucky, with findings presented at IPSSW 2026 and
            peer-reviewed publications planned for later this year. See the{" "}
            <Link
              href="/research"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              research page
            </Link>{" "}
            to collaborate.
          </p>
        ),
      },
      {
        id: "accuracy",
        question: "How does ClinicalSim ensure accuracy?",
        answer:
          "ClinicalSim is committed to accuracy and to fidelity to the source documents behind every case. Each result is a transparent statement of the evidence in the encounter: it informs the learner and the reviewer, and it never replaces final human judgment.",
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
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ClinicalSim.ai FAQ",
            description:
              "Common questions about ClinicalSim's AI clinical simulation: the product, how it compares to Step 2 CS and standardized patients, communication remediation, ACGME Milestone scoring and My Progress, CCC-ready documentation, privacy, and research.",
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
            What ClinicalSim is, how it compares to Step 2 CS and standardized
            patients, how scoring and My Progress work, and how we handle
            privacy and research. For the full picture of how cases are built
            and scored, see our{" "}
            <Link
              href="/methodology"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              methodology page
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
            <div key={section.category}>
              <h2 className="text-2xl md:text-3xl font-light text-cs-navy mb-6">
                {section.category}
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
                        <ChevronRight className="w-5 h-5 text-cs-gray flex-shrink-0 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-6 pb-5 pt-2 text-base text-cs-dark-blue/85 font-light leading-relaxed space-y-4">
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
                Request a Pilot
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
