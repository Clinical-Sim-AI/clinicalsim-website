import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { getCategoryExample } from "@/lib/category-example"
import { COHORT_REPORT_PATH } from "@/lib/cohort-report"
import {
  FORMATIVE_USE_LIMITATION,
  NO_OUTCOME_PREDICTION_LIMITATION,
  SP_SUPPLEMENT_LINE,
} from "@/lib/claim-discipline"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { CATEGORY_MEANING, ORGANIZATION, PRIMARY_CTA } from "@/lib/positioning"

const PAGE_URL = "https://clinicalsim.ai/clinical-communication-intelligence"
const PAGE_DESCRIPTION =
  "See how participants practice with AI patients, receive transcript-backed feedback, and practice again, while leaders review patterns across a cohort or unit."

export const metadata: Metadata = {
  title: { absolute: "How ClinicalSim works | ClinicalSim.ai" },
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "How ClinicalSim works | ClinicalSim.ai",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
  },
  twitter: {
    title: "How ClinicalSim works | ClinicalSim.ai",
    description: PAGE_DESCRIPTION,
  },
  alternates: { canonical: PAGE_URL },
}

// Product behavior and program sequence from lib/positioning and /evaluation.
const steps = [
  {
    title: "Choose a conversation and standard",
    body: "Your team chooses a communication priority and who will practice. Cases use a published clinical framework or your own policy, service standard, script, or rubric.",
  },
  {
    title: "Practice a spoken conversation",
    body: "Participants speak with an AI patient in a browser on a phone, tablet, or computer. They practice a simulated encounter, without using a real patient record.",
  },
  {
    title: "Read feedback with the words behind it",
    body: "Each participant gets a report that shows strengths and what to practice next, with transcript excerpts under the scores. They can review the recording and full transcript.",
  },
  {
    title: "Practice again with a clear focus",
    body: "Participants repeat cases, and program leaders review the group's practice patterns to choose the next round. Results inform coaching and program decisions.",
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
            name: "How ClinicalSim works",
            description: PAGE_DESCRIPTION,
            url: PAGE_URL,
            dateModified: PAGE_DATE_MODIFIED.clinicalCommunicationIntelligence,
            isPartOf: {
              "@type": "WebSite",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
            publisher: ORGANIZATION,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://clinicalsim.ai" },
              { "@type": "ListItem", position: 2, name: "How it works", item: PAGE_URL },
            ],
          },
        ]}
      />

      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-16 text-white md:py-24">
        <Waveform seed="how-it-works" align="right" opacity={0.14} />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.1em] text-cs-electric">How it works</p>
          <h1 className="max-w-4xl text-4xl font-light leading-tight text-balance md:text-5xl lg:text-6xl">
            Practice a conversation and see what to try next
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-cs-cloud md:text-xl">
            Clinicians, learners, and staff speak with AI patients and get feedback
            against a named standard. Participants see their own work, and leaders
            review patterns across a cohort or unit.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="accent" size="lg"><Link href="#participant-feedback">See the feedback <ArrowRight /></Link></Button>
            <Button asChild variant="inverse" size="lg"><Link href="/contact">{PRIMARY_CTA}</Link></Button>
          </div>
        </div>
      </section>

      <section className="bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-light text-cs-navy md:text-4xl">From the first case to the next round of practice</h2>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-cs-gray bg-white p-6">
                <span aria-hidden="true" className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-cs-dark-blue text-lg font-medium text-white">{index + 1}</span>
                <h3 className="mb-3 text-xl font-medium text-cs-dark-blue">{step.title}</h3>
                <p className="font-light leading-relaxed text-cs-dark-blue/85">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="participant-feedback" className="scroll-mt-24 bg-white px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-medium text-cs-navy">What the participant receives</p>
            <h2 className="mb-5 text-3xl font-light text-cs-navy md:text-4xl">Feedback you can check against the conversation</h2>
            <p className="text-lg font-light leading-relaxed text-cs-dark-blue/85">
              This published pediatric example shows a learner talking with a
              hesitant parent at a two-month vaccine visit. The report scores the
              conversation against the {example.framework} at{" "}
              <span data-example="total">{example.total} of {example.max}</span>.
              Below are two excerpts from that report.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-cs-navy p-6 text-white md:p-8">
              <p className="mb-4 text-sm font-medium text-cs-electric">What went well</p>
              <h3 className="mb-3 text-xl font-medium">{example.strongest.label}</h3>
              <p className="mb-5 text-2xl font-light" data-example="strongest">{example.strongest.value} of {example.strongest.max}</p>
              <blockquote className="border-l-2 border-cs-electric pl-4 font-light leading-relaxed text-cs-cloud">&quot;{example.strongest.quote}&quot;</blockquote>
              <p className="mt-4 text-sm font-light text-cs-cloud">Participant transcript excerpt</p>
            </div>
            <div className="rounded-2xl border border-cs-gray bg-cs-cloud p-6 md:p-8">
              <p className="mb-4 text-sm font-medium text-cs-navy">What to practice next</p>
              <h3 className="mb-3 text-xl font-medium text-cs-dark-blue">{example.nextFocus.label}</h3>
              <p className="mb-5 text-2xl font-light text-cs-dark-blue" data-example="next-focus">{example.nextFocus.value} of {example.nextFocus.max}</p>
              <blockquote className="border-l-2 border-cs-navy pl-4 font-light leading-relaxed text-cs-dark-blue/85">&quot;{example.nextFocus.quote}&quot;</blockquote>
              <p className="mt-4 text-sm font-light text-cs-dark-blue/70">Participant transcript excerpt</p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl font-light leading-relaxed text-cs-dark-blue/85">
            Both excerpts come from the same <span data-example="minutes">{example.minutes} minute</span> conversation.
            The participant can keep what worked and focus the next attempt on a
            specific part of the conversation. This is one example of product
            feedback, not evidence of a patient outcome.
          </p>
          <Link href={`/examples/${example.slug}`} className="mt-5 inline-flex items-center gap-2 font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">
            Read the full report, transcript, and recording <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </section>

      <section className="bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-medium text-cs-navy">What leaders can review</p>
            <h2 className="mb-5 text-3xl font-light text-cs-navy md:text-4xl">Use practice patterns to plan support</h2>
            <p className="text-lg font-light leading-relaxed text-cs-dark-blue/85">
              Leaders review simulated conversations under the program&apos;s
              agreed access and reporting rules. Each participant gets feedback
              on their own work before the group&apos;s results inform the next
              round of practice.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-cs-gray bg-white p-6">
              <h3 className="mb-3 text-xl font-medium text-cs-dark-blue">Educators and program directors</h3>
              <p className="font-light leading-relaxed text-cs-dark-blue/85">Review cohort results and the transcripts behind the scores. Choose cases and coaching priorities, then review later attempts alongside faculty observations.</p>
            </div>
            <div className="rounded-xl border border-cs-gray bg-white p-6">
              <h3 className="mb-3 text-xl font-medium text-cs-dark-blue">Health system leaders</h3>
              <p className="font-light leading-relaxed text-cs-dark-blue/85">Review patterns by named cohort or anonymous unit against the standard your team teaches. Use those patterns to plan focused practice and review the program with its leaders.</p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-cs-gray bg-white p-6">
            <h3 className="mb-3 text-xl font-medium text-cs-dark-blue">A leadership report from one health system</h3>
            <p className="max-w-3xl font-light leading-relaxed text-cs-dark-blue/85">One partner health system&apos;s report covers 82 practice conversations by 68 clinicians, scored against its own patient experience frameworks. Clinicians opened conversations well, and the report names the steps at the close to practice next.</p>
            <Link href={COHORT_REPORT_PATH} className="mt-4 inline-flex items-center gap-2 font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">Read the anonymized cohort report <ArrowRight className="h-4 w-4 shrink-0" /></Link>
          </div>
          <p className="mt-6 max-w-4xl font-light leading-relaxed text-cs-dark-blue/85">{FORMATIVE_USE_LIMITATION}</p>
          <Link href="/evaluation#operations" className="mt-4 inline-block font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">Review roles and rollout requirements</Link>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-3xl font-light text-cs-navy">The idea behind the product</h2>
            <p className="mb-4 font-light leading-relaxed text-cs-dark-blue/85">{CATEGORY_MEANING}</p>
            <p className="font-light leading-relaxed text-cs-dark-blue/85">We use the shorthand CCI for that whole process: a named standard, spoken practice, feedback, and another chance to practice. A single score is one part of it.</p>
            <Link href="/methodology" className="mt-5 inline-block font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">Read how cases are built and scored</Link>
          </div>
          <div>
            <h2 className="mb-5 text-3xl font-light text-cs-navy">Use and limits</h2>
            <p className="mb-4 font-light leading-relaxed text-cs-dark-blue/85">{NO_OUTCOME_PREDICTION_LIMITATION}</p>
            <p className="font-light leading-relaxed text-cs-dark-blue/85">{SP_SUPPLEMENT_LINE}</p>
            <Link href="/evidence" className="mt-5 inline-block font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">Review the evidence and its limits</Link>
          </div>
        </div>
      </section>

      <WaveformBand seed="how-it-works-contact">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-5 text-3xl font-light md:text-4xl">See how this would work for your team</h2>
          <p className="mb-8 text-lg font-light leading-relaxed text-cs-cloud">Bring a conversation you want your team to practice. We&apos;ll show you the participant experience and discuss what your leaders would review.</p>
          <Button asChild variant="accent" size="lg" className="h-auto min-h-11 max-w-full whitespace-normal py-3"><Link href="/contact">{PRIMARY_CTA}</Link></Button>
        </div>
      </WaveformBand>
    </>
  )
}
