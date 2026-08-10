import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { FaqAnchorHandler } from "@/components/faq-anchor-handler"
import { CopyLinkButton } from "@/components/copy-link-button"
import { slugify } from "@/lib/utils"

export const metadata: Metadata = {
  title: "FAQ for medical educators: feedback, scoring, and evidence",
  description:
    "How to read a ClinicalSim feedback report, inspect transcript evidence, compare GME and UME scoring, choose a practice cadence, and use results in a rotation or remediation plan.",
  openGraph: {
    title: "FAQ for medical educators | ClinicalSim.ai",
    description:
      "How medical educators can inspect feedback, compare GME and UME scoring, set a practice cadence, and use simulated encounter evidence.",
    url: "https://clinicalsim.ai/medical-educator-faq",
  },
  twitter: {
    title: "FAQ for medical educators | ClinicalSim.ai",
    description:
      "How medical educators can inspect feedback, compare GME and UME scoring, set a practice cadence, and use simulated encounter evidence.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/medical-educator-faq",
  },
}

const LAST_UPDATED_ISO = "2026-08-10"
const LAST_UPDATED_LABEL = "August 10, 2026"

const sections = [
  {
    question: "How should I read the feedback?",
    answer:
      "Treat the report as formative evidence, not a verdict. It shows the case rubric, the learner's scores, and the transcript excerpts behind each rating so a faculty reviewer can accept, question, or override the result.",
  },
  {
    question: "How does ClinicalSim determine feedback?",
    answer:
      "Each physician-authored case names its competency and communication frameworks before it is released. After the voice encounter, the report applies the case rubric and cites one or two excerpts from the transcript for each scored item.",
  },
  {
    question: "How does scoring differ for medical students and residents?",
    answer:
      "GME cases use the relevant specialty-specific ACGME Milestones 2.0. UME cases use the Foundational Competencies for Undergraduate Medical Education and the communication framework named on the case, without assigning a five-level milestone rating. Entrustment remains a program decision.",
  },
  {
    question: "How can faculty inspect a score?",
    answer:
      "Every score cites one or two excerpts from the transcript, so a reviewer can check the rating against what the learner said. ClinicalSim is testing score performance in pilots and does not claim that its ratings are more accurate or fairer than faculty judgment.",
  },
  {
    question: "How many times should a learner run a case?",
    answer:
      "ClinicalSim does not prescribe a universal attempt count for clinical communication. Programs can set a cadence based on the learner, the purpose of the assignment, and the faculty coaching plan. A score from one simulated encounter does not establish competence.",
  },
  {
    question: "What does the evidence not yet establish?",
    answer:
      "ClinicalSim has not established effects on patient outcomes, clinical performance, malpractice claims, HCAHPS, or readmissions. Pilot scores describe performance in simulated encounters and should not replace live assessment or human judgment.",
  },
  {
    question: "How can a program use ClinicalSim in a curriculum?",
    answer:
      "Start with the learner group, the conversations they need to practice, and the evidence faculty need to review. Programs can assign cases before coaching, after coaching, or between standardized patient encounters, while keeping live assessment and program decisions with people.",
  },
  {
    question: "Can we use the reports to document remediation?",
    answer:
      "Yes. Reports create a timestamped record of what the learner practiced, how the case was scored, and which transcript excerpts support the rating. Use that record alongside faculty observation and the other evidence the CCC already reviews.",
  },
  {
    question: "How much faculty time does this take?",
    answer:
      "A faculty member does not need to attend each practice attempt. Faculty still select the cases, coach the learner, review the reports, and make program decisions, so the product changes where faculty time is spent rather than removing faculty from the process.",
  },
  {
    question: "What learner data does ClinicalSim handle?",
    answer:
      "Cases use synthetic patients written from clinical literature rather than patient records. The product handles learner recordings, transcripts, account data, and institutional data. The trust and data handling page describes current practices.",
  },
  {
    question: "How long does a typical case take?",
    answer:
      "A typical case takes three to ten minutes. Length varies with the conversation and the case objectives, and learners can repeat a case without scheduling another standardized patient encounter.",
  },
]

export default function MedicalEducatorFaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: sections.map((section) => ({
      "@type": "Question" as const,
      name: section.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: section.answer,
      },
    })),
  }

  return (
    <>
      <FaqAnchorHandler />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ClinicalSim.ai FAQ for medical educators",
            description:
              "How medical educators can inspect feedback, compare GME and UME scoring, set a practice cadence, and use simulated encounter evidence.",
            url: "https://clinicalsim.ai/medical-educator-faq",
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
                name: "FAQ for medical educators",
                item: "https://clinicalsim.ai/medical-educator-faq",
              },
            ],
          },
          faqJsonLd,
        ]}
      />

      <section className="relative px-6 pt-4 md:pt-6 pb-4 md:pb-6">
        <div className="absolute inset-0 bg-cs-cloud -z-10" />
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-cs-dark-gray mb-8">
            <Link href="/" className="hover:text-cs-dark-blue/85 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-dark-blue/85">FAQ for medical educators</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-6 text-cs-dark-blue">
            FAQ for <span className="font-medium">medical educators</span>
          </h1>
          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed max-w-3xl">
            How to read a feedback report, interpret GME and UME scoring,
            choose a practice cadence, and use the results in a rotation or
            remediation plan.
          </p>
          <p className="mt-6 text-sm text-cs-dark-gray">
            Last updated {LAST_UPDATED_LABEL}
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      <nav aria-label="Questions on this page" className="px-6 py-8 bg-cs-cloud/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-medium text-cs-dark-blue mb-4">
            On this page
          </h2>
          <ol className="grid gap-2 md:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.question}>
                <a
                  href={`#${slugify(section.question)}`}
                  className="text-sm text-cs-dark-blue/80 hover:text-cs-navy underline-offset-2 hover:underline"
                >
                  {index + 1}. {section.question}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto space-y-4">
          {sections.map((section) => {
            const id = slugify(section.question)
            return (
              <div
                key={section.question}
                id={id}
                className="border border-cs-gray/50 rounded-xl overflow-hidden scroll-mt-24"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                    <h2 className="text-lg font-medium text-cs-dark-blue pr-4">
                      {section.question}
                    </h2>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <CopyLinkButton
                        id={id}
                        label={`Copy link to "${section.question}"`}
                      />
                      <ChevronRight className="w-5 h-5 text-cs-gray transition-transform group-open:rotate-90" />
                    </div>
                  </summary>
                  <div className="px-6 pb-5 pt-2 text-base text-cs-dark-blue font-light leading-relaxed">
                    <p>{section.answer}</p>
                  </div>
                </details>
              </div>
            )
          })}
        </div>
      </section>

      <SectionDivider variant="curve" color="navy" />

      <section className="px-6 py-14 md:py-18 bg-cs-navy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4">
            See how the evidence works in your program
          </h2>
          <p className="text-white/75 font-light mb-8">
            Tell us which learners and conversations matter most. We will show
            you what one pilot cycle could look like.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="/contact">Request a pilot</Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-cs-navy"
              asChild
            >
              <Link href="/methodology">Read the methodology</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
