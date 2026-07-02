import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import type { FaqItem } from "@/lib/types"

export const metadata: Metadata = {
  title: "FAQ: Case Development, Standards Alignment & Scoring",
  description:
    "Answers to common questions about how ClinicalSim.ai builds cases, aligns them to ACGME Milestones 2.0 and validated communication frameworks, scores encounters, and generates feedback.",
  openGraph: {
    title: "FAQ | ClinicalSim.ai",
    description:
      "Common questions about ClinicalSim's case development, standards alignment, scoring, and feedback methodology.",
    url: "https://clinicalsim.ai/faq",
  },
  twitter: {
    title: "FAQ | ClinicalSim.ai",
    description:
      "Common questions about ClinicalSim's case development, standards alignment, scoring, and feedback methodology.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/faq",
  },
}

interface FaqCategory {
  category: string
  items: FaqItem[]
}

const faqCategories: FaqCategory[] = [
  {
    category: "Case development",
    items: [
      {
        question: "How does ClinicalSim build a case?",
        answer:
          "Every case begins with a defined purpose: the communication and clinical skills it should exercise and the competencies it should assess. Content is written to that purpose, with explicit learning objectives and a clinical evidence base drawn from foundational and other applicable literature. Practicing physicians with strong academic backgrounds — including program directors, simulation facilitators, and UME and GME educators — then review each case for accuracy, content, alignment, and fit to its objectives.",
      },
      {
        question: "How does ClinicalSim confirm a case is ready to release?",
        answer:
          "Before release, each case is run repeatedly to confirm three things: that the AI character convincingly plays the role the case requires; that scoring and feedback perform as intended; and that what the case asks can be assessed within the limits of voice-based simulation. Refinements are made in coordination with ClinicalSim's clinical and technical leadership.",
      },
    ],
  },
  {
    category: "Standards and framework alignment",
    items: [
      {
        question:
          "What is the difference between a competency framework, a communication framework, and a rubric?",
        answer:
          "A competency framework is the governing-body standard a case is assessed against — the ACGME Milestones 2.0 in graduate medical education, or the Foundational Competencies in undergraduate medical education. A communication framework is a validated, published model of communication behavior, such as SPIKES or Calgary-Cambridge. A rubric is the scored instrument that turns a framework into rated items, including a program's own internal or external tools. The competency score reflects the learner's developmental level, while communication frameworks capture the specific skills underlying communication technique.",
      },
      {
        question: "Can more than one communication framework apply to a single case?",
        answer:
          "Yes. Each communication framework is drawn from a validated library with an approved citation and serves as a floor, not a ceiling — one or more may be applied to a case, each scored independently, and programs may add their own internal or externally validated rubrics. Because these frameworks and rubrics operate at different scopes, from whole-encounter structures to task-specific routines to discrete micro-skills, ClinicalSim selects those best suited to each case's communication task.",
      },
      {
        question: "Which communication frameworks does ClinicalSim use?",
        answer:
          "Representative frameworks include SPIKES, the Kalamazoo Essential Elements Communication Checklist (KEECC-A), SEGUE, NURSE, REMAP, SBAR, I-PASS, TeamSTEPPS, CANDOR, and Calgary-Cambridge. Full citations are maintained in the ClinicalSim Frameworks Bibliography; see the full methodology page for representative sources.",
      },
    ],
  },
  {
    category: "Evidence and scoring",
    items: [
      {
        question: "How is evidence captured during a simulated encounter?",
        answer:
          "Each encounter is a voice conversation between the learner and an AI role designed for the case, captured as a timestamped transcript. For every scored competency and framework step, the platform draws one or two verbatim excerpts that demonstrate the behavior, or documents its absence — so each score is traceable to the moment that supports it, rather than serving as an unexplained rating.",
      },
      {
        question: "How are graduate medical education (GME) cases scored?",
        answer:
          "GME cases align to the specialty-specific ACGME Milestones 2.0, with milestone text quoted verbatim from each specialty's own document. Scoring reflects whichever subcompetencies the scenario exercises — most often interpersonal and communication skills and professionalism, and systems-based practice or other domains where the encounter warrants — each scored on the Dreyfus scale (1 to 5), read against the milestone's verbatim level descriptors. The result is milestone-placed and ready for Clinical Competency Committee review.",
      },
      {
        question: "How are undergraduate medical education (UME) cases scored, since there's no five-level milestone scale?",
        answer:
          "UME cases align to the Foundational Competencies for Undergraduate Medical Education (AAMC, AACOM, and ACGME) and the AAMC Core Entrustable Professional Activities (EPAs) for Entering Residency. Because the Foundational Competencies are not published with the milestones' five-level scale, ClinicalSim does not assign a numeric level for UME; it records whether each competency was demonstrated and scores performance through the applied communication or skill rubric. Entrustment remains a program decision that this evidence informs.",
      },
      {
        question: "Can ClinicalSim's milestone-aligned scores be used for high-stakes decisions?",
        answer:
          "No. The ACGME Milestones are formative and were not designed for high-stakes external decisions, and ClinicalSim treats milestone-aligned output accordingly — as evidence that informs program judgment, not as a stand-alone basis for high-stakes decisions.",
      },
    ],
  },
  {
    category: "Feedback",
    items: [
      {
        question: "What does a ClinicalSim feedback report include?",
        answer:
          "Each encounter produces a single feedback report. Verbatim evidence is incorporated into the grading rubrics, justifying the level a learner reached or the specific step assessed. The report offers an overall impression — strengths, priority gaps, and top action items — and targeted recommendations. Depending on the case, it indicates where a learner sits developmentally and gives reviewers transcript-grounded evidence for decisions about progression, remediation, readiness for practice, readiness to perform a particular task, or familiarity with a given subject area.",
      },
      {
        question: "Does ClinicalSim's methodology extend beyond trainees to faculty?",
        answer:
          "Yes. The same case-building and assessment methods extend to the conversations faculty are expected to model, including delivering difficult feedback, navigating professionalism concerns, and bedside or small-group teaching.",
      },
    ],
  },
  {
    category: "Accuracy and appropriate use",
    items: [
      {
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
    mainEntity: faqCategories.flatMap((cat) =>
      cat.items.map((item) => ({
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
              "Common questions about ClinicalSim's case development, standards alignment, scoring, and feedback methodology.",
            url: "https://clinicalsim.ai/faq",
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
      <section className="relative px-6 pt-12 md:pt-20 pb-4 md:pb-6">
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
            Answers to common questions about how ClinicalSim builds cases,
            aligns them to competency and communication frameworks, scores
            encounters, and generates feedback. For the full picture, see
            our{" "}
            <Link
              href="/methodology"
              className="text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"
            >
              methodology page
            </Link>
            .
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* FAQ categories */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-2xl md:text-3xl font-light text-cs-navy mb-6">
                {cat.category}
              </h2>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div
                    key={item.question}
                    className="border border-cs-gray/50 rounded-xl overflow-hidden"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-medium text-cs-dark-blue pr-4">
                          {item.question}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-cs-gray flex-shrink-0 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-6 pb-5 pt-2">
                        <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                          {item.answer}
                        </p>
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
      <section className="px-6 py-12 md:py-16 bg-cs-cloud text-center">
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
