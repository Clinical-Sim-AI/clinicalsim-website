import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { WaveformBand } from "@/components/waveform-band"
import { getCategoryExample } from "@/lib/category-example"
import {
  FORMATIVE_USE_LIMITATION,
  NO_OUTCOME_PREDICTION_LIMITATION,
  SP_SUPPLEMENT_LINE,
} from "@/lib/claim-discipline"
import { HOMEPAGE_PUBLIC_COPY } from "@/lib/homepage-content"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { CATEGORY_MEANING, PRIMARY_CTA } from "@/lib/positioning"

/**
 * The category page, written to be the link a program leader can forward to an
 * executive sponsor. Sources:
 *  - the definition is CATEGORY_MEANING (lib/positioning.ts), rendered verbatim;
 *  - the loop reuses the homepage's howItStarts step bodies (lib/homepage-content.ts);
 *  - the example is derived from lib/examples at render time (lib/category-example.ts);
 *  - the limits are the claim-discipline sentences, rendered verbatim.
 *
 * The acronym CCI appears once on the page, in the definition section. Running
 * copy elsewhere on the site keeps the lowercase phrase. Outputs are described
 * by the question each one answers, never by a consultant deliverable name.
 */

const PAGE_URL = "https://clinicalsim.ai/clinical-communication-intelligence"
const PAGE_H1 =
  "What clinical communication intelligence means for a healthcare institution"
const PAGE_DESCRIPTION =
  "Clinical communication intelligence makes how healthcare teams handle important conversations visible, interpretable, and improvable. See the practice loop, one scored conversation, and what each role gets."

export const metadata: Metadata = {
  title: { absolute: "Clinical communication intelligence (CCI), defined" },
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Clinical communication intelligence (CCI), defined | ClinicalSim.ai",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
  },
  twitter: {
    title: "Clinical communication intelligence (CCI), defined | ClinicalSim.ai",
    description: PAGE_DESCRIPTION,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

const LOOP_LABELS = [
  "Agree the standard",
  "Practice and observe",
  "Focus the next round",
  "Practice again and compare",
] as const

const loop = LOOP_LABELS.map((label, index) => ({
  label,
  body: HOMEPAGE_PUBLIC_COPY.howItStarts.steps[index].body,
}))

/**
 * Participant first, per CLAUDE.md. The educator and quality questions are
 * adapted from the buyer questions in the Walia & Miller offer strategy
 * (Doc 3, p11), in American spelling and without deficit framing.
 */
const roles = [
  {
    role: "The participant",
    question: "What did I do well, and what should I practice next?",
    answer:
      "A report after each conversation, with their own words quoted under every score and what to try on the next attempt. They can repeat the case and see whether the score moves.",
  },
  {
    role: "The educator or program director",
    question: "Where does this group need support, and how should we organize it?",
    answer:
      "Results across the cohort, with the transcript behind each score, so faculty can inspect any rating rather than trust a number and choose the cases for the next round.",
  },
  {
    role: "The quality or patient experience leader",
    question:
      "Which parts of these conversations deserve attention for our priority, and what can we do about them?",
    answer:
      "Patterns by named cohort or anonymous unit, scored against the service standard, policy, or script the team already teaches, to decide where the next round of practice goes.",
  },
  {
    role: "The executive sponsor",
    question:
      "Is our communication training running against our own standard, and where should it go next?",
    answer:
      "A plain record of which conversations were practiced, against which standard, and which areas the group chose to focus on. It informs program decisions and stays formative.",
  },
]

export default function ClinicalCommunicationIntelligencePage() {
  const example = getCategoryExample()

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: PAGE_H1,
            description: PAGE_DESCRIPTION,
            url: PAGE_URL,
            dateModified: PAGE_DATE_MODIFIED.clinicalCommunicationIntelligence,
            publisher: {
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
                name: "Clinical communication intelligence",
                item: PAGE_URL,
              },
            ],
          },
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
            <span className="text-cs-dark-blue/85">Clinical communication intelligence</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-balance pb-3 mb-6 text-cs-dark-blue">
            {PAGE_H1}
          </h1>

          <div className="rounded-xl border-l-4 border-cs-electric bg-cs-dark-blue px-6 py-5 max-w-3xl">
            <p className="text-lg md:text-xl text-white font-light leading-relaxed">
              {CATEGORY_MEANING}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* 1. Definition */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            What the term covers
          </h2>
          <p className="text-base md:text-lg text-cs-dark-blue/85 font-light leading-relaxed mb-4 max-w-3xl">
            Clinicians, medical learners, and patient facing staff practice
            spoken conversations with AI patients. Each conversation is scored
            against a standard the institution already holds, and the person
            who practiced sees what they did well and what to practice next,
            with their own words quoted under every score.
          </p>
          <p className="text-base md:text-lg text-cs-dark-blue/85 font-light leading-relaxed max-w-3xl">
            When we use the shorthand CCI, we mean that whole loop rather than
            any single score. The standard comes from the institution, the
            practice belongs to the participant, and the patterns help leaders
            decide where the group practices next.
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 2. The loop */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            How the loop runs
          </h2>
          <ol className="space-y-4">
            {loop.map((step, index) => (
              <li
                key={step.label}
                className="rounded-xl border border-cs-gray/50 border-l-4 border-l-cs-navy bg-white px-6 py-5"
              >
                <h3 className="mb-2 text-lg font-medium text-cs-dark-blue">
                  {index + 1}. {step.label}
                </h3>
                <p className="text-base font-light leading-relaxed text-cs-dark-blue/85">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 3. One real example, derived from lib/examples at render time */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            One conversation, scored
          </h2>
          <p className="text-base md:text-lg text-cs-dark-blue/85 font-light leading-relaxed mb-6 max-w-3xl">
            In a published encounter, a learner talks a hesitant parent through
            a two-month vaccine visit. The report scores the conversation
            against the {example.framework} at{" "}
            <span data-example="total">
              {example.total} of {example.max}
            </span>
            , and it quotes the learner under each domain so the score can be
            checked against what was said.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-cs-navy p-6 text-white">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.16em] text-cs-electric">
                What went well
              </p>
              <p className="mb-3 text-lg font-medium">
                {example.strongest.label},{" "}
                <span data-example="strongest">
                  {example.strongest.value} of {example.strongest.max}
                </span>
              </p>
              <blockquote className="border-l-2 border-cs-electric pl-4 font-light leading-relaxed text-cs-cloud">
                &quot;{example.strongest.quote}&quot;
              </blockquote>
            </div>
            <div className="rounded-2xl border border-cs-gray bg-white p-6">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.16em] text-cs-dark-gray">
                What to practice next
              </p>
              <p className="mb-3 text-lg font-medium text-cs-dark-blue">
                {example.nextFocus.label},{" "}
                <span data-example="next-focus">
                  {example.nextFocus.value} of {example.nextFocus.max}
                </span>
              </p>
              <blockquote className="border-l-2 border-cs-dark-blue pl-4 font-light leading-relaxed text-cs-dark-blue/85">
                &quot;{example.nextFocus.quote}&quot;
              </blockquote>
            </div>
          </div>

          <p className="mt-6 text-base text-cs-dark-blue/85 font-light leading-relaxed max-w-3xl">
            The warmth that earned the top score and the abrupt close that
            earned the lowest sit in the same{" "}
            <span data-example="minutes">{example.minutes} minute</span>{" "}
            conversation. That
            is the point of scoring the conversation domain by domain: the
            learner keeps what worked and practices one thing next.{" "}
            <Link
              href={`/examples/${example.slug}`}
              className="text-cs-dark-blue font-medium underline underline-offset-4 hover:text-cs-navy transition-colors"
            >
              Read the full report and transcript
            </Link>
            .
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 4. Who uses what */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            The question each person brings
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((item) => (
              <div
                key={item.role}
                className="rounded-xl border border-cs-gray/60 bg-white px-6 py-5"
              >
                <h3 className="mb-2 text-sm font-medium uppercase tracking-[0.14em] text-cs-dark-gray">
                  {item.role}
                </h3>
                <p className="mb-3 text-lg font-medium leading-snug text-cs-dark-blue">
                  {item.question}
                </p>
                <p className="text-base font-light leading-relaxed text-cs-dark-blue/85">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 5. What it is not. Verbatim from lib/claim-discipline.ts. */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            What it is not
          </h2>
          <ul className="space-y-4">
            {[
              FORMATIVE_USE_LIMITATION,
              NO_OUTCOME_PREDICTION_LIMITATION,
              SP_SUPPLEMENT_LINE,
            ].map((line) => (
              <li
                key={line}
                className="flex gap-4 rounded-xl border border-cs-gray/60 bg-white px-5 py-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cs-dark-blue"
                />
                <span className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Next steps */}
      <WaveformBand seed="clinical-communication-intelligence">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            See how the scoring works, then bring us a priority.
          </h2>
          <p className="text-lg font-light mb-8 text-white/90">
            The{" "}
            <Link
              href="/methodology"
              className="text-cs-electric font-medium underline underline-offset-4 hover:text-white transition-colors"
            >
              methodology
            </Link>{" "}
            explains how cases are built and scored, and the{" "}
            <Link
              href="/examples"
              className="text-cs-electric font-medium underline underline-offset-4 hover:text-white transition-colors"
            >
              published examples
            </Link>{" "}
            show four complete reports with no sign-in.
          </p>
          <Link href="/contact">
            <Button variant="accent" size="xl">
              {PRIMARY_CTA}
            </Button>
          </Link>
        </div>
      </WaveformBand>
    </>
  )
}
