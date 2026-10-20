import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import {
  FORMATIVE_USE_LIMITATION,
  NO_OUTCOME_PREDICTION_LIMITATION,
} from "@/lib/claim-discipline"
import { COHORT_REPORT_PATH, COHORT_REPORT_SUMMARY } from "@/lib/cohort-report"
import { getAllExamples } from "@/lib/examples"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { ORGANIZATION, PRIMARY_CTA } from "@/lib/positioning"

const PAGE_URL = "https://clinicalsim.ai/evidence"
const PAGE_DESCRIPTION =
  "Review ClinicalSim's public product examples, scoring methods, framework sources, and conference record, with clear limits on what AI formative scores establish."

export const metadata: Metadata = {
  title: "Evidence and product limits",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Evidence and product limits | ClinicalSim.ai",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
  },
  twitter: {
    title: "Evidence and product limits | ClinicalSim.ai",
    description: PAGE_DESCRIPTION,
  },
  alternates: { canonical: PAGE_URL },
}

// The source pages carry the detailed records. This overview distinguishes
// product inspection, published framework evidence, and the conference record.
// Research outcome claims remain withheld per /research and /evaluation.
const evidenceLinks = [
  {
    id: "methods",
    title: "How cases and scores are built",
    body: "Our methodology explains case development, the scoring process, and how transcript evidence supports feedback. It also sets out what a score can and can't establish.",
    href: "/methodology",
    label: "Read the methodology",
  },
  {
    id: "leadership-view",
    title: "What a leader sees across a cohort",
    body: `${COHORT_REPORT_SUMMARY} It shows the full element table, the quotes behind the finding, and the limits of a retrospective analysis.`,
    href: COHORT_REPORT_PATH,
    label: "Read the health system cohort report",
  },
  {
    id: "frameworks",
    title: "Published communication frameworks",
    body: "The framework library links to the sources behind the named standards. Their published reliability comes from the settings and raters those studies tested. It doesn't establish the reliability of AI scoring in ClinicalSim.",
    href: "/frameworks",
    label: "Review the framework sources",
  },
  {
    id: "research",
    title: "The public research record",
    body: "Our research page lists conference presentations, including records from the International Pediatric Simulation Symposium and Workshops, the Pediatric Academic Societies Meeting, and the Critical Care Congress. A presentation record isn't evidence of a confirmed product outcome.",
    href: "/research",
    label: "View presentations and research collaboration",
  },
]

// Doc 7 section 13: send each reviewer to the page that answers their question.
const roleRoutes = [
  {
    role: "Clinical reviewer",
    question: "How are cases built, and what can a score establish?",
    links: [{ href: "/methodology", label: "Methodology and scoring limits" }],
  },
  {
    role: "Finance",
    question: "What can we say about return without inventing a number?",
    links: [
      { href: "/insights/communication-and-hospital-economics", label: "The impact of communication on hospital economics" },
      { href: "/insights/why-communication-training-matters", label: "What the evidence says about communication training" },
      { href: "/evaluation", label: "How an engagement is structured" },
    ],
  },
  {
    role: "Procurement, IT, and privacy",
    question: "What data does the product handle, and how?",
    links: [{ href: "/trust", label: "Trust and data handling" }],
  },
  {
    role: "Executive sponsor",
    question: "What would leaders review, and how does the work run?",
    links: [
      { href: COHORT_REPORT_PATH, label: "An anonymized health system cohort report" },
      { href: "/clinical-communication-intelligence", label: "How ClinicalSim works" },
    ],
  },
  {
    role: "Research collaborator",
    question: "Can we study this with our own learners?",
    links: [{ href: "/research", label: "Research collaboration" }],
  },
]

export default function EvidencePage() {
  const examples = getAllExamples()

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Evidence and product limits",
            description: PAGE_DESCRIPTION,
            url: PAGE_URL,
            dateModified: PAGE_DATE_MODIFIED.evidence,
            publisher: ORGANIZATION,
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
              { "@type": "ListItem", position: 1, name: "Home", item: "https://clinicalsim.ai" },
              { "@type": "ListItem", position: 2, name: "Evidence", item: PAGE_URL },
            ],
          },
        ]}
      />

      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-16 text-white md:py-24">
        <Waveform seed="evidence" align="right" opacity={0.14} />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.1em] text-cs-electric">Evidence</p>
          <h1 className="max-w-4xl text-4xl font-light leading-tight text-balance md:text-5xl lg:text-6xl">What you can inspect today</h1>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-cs-cloud md:text-xl">
            Start with a complete conversation and the feedback a participant
            receives. Then review how we build cases, score practice, and define
            the limits of those scores.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="accent" size="lg" className="h-auto min-h-11 max-w-full whitespace-normal py-3"><Link href="/examples">Read the product examples <ArrowRight /></Link></Button>
            <Link href="#score-limits" className="inline-flex items-center py-3 font-medium text-white underline underline-offset-4 hover:text-cs-electric">Review scoring limits</Link>
          </div>
        </div>
      </section>

      <section className="bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-light text-cs-navy md:text-4xl">Different sources answer different questions</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="flex flex-col rounded-2xl border border-cs-gray bg-white p-6 md:p-8">
              <h3 className="mb-4 text-2xl font-medium text-cs-dark-blue">The participant experience</h3>
              <p className="mb-6 font-light leading-relaxed text-cs-dark-blue/85">
                {examples.length} complete examples include the
                recording, full transcript, and feedback report, with no
                sign-in required. They let you inspect the words behind a score
                and judge whether the feedback would support practice in your
                program. They don&apos;t establish training effectiveness or
                patient outcomes.
              </p>
              <Link href="/examples" className="mt-auto inline-flex items-center gap-2 font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">Open the complete examples <ArrowRight className="h-4 w-4 shrink-0" /></Link>
            </article>
            {evidenceLinks.map((item) => (
              <article key={item.id} id={item.id} className="flex scroll-mt-24 flex-col rounded-2xl border border-cs-gray bg-white p-6 md:p-8">
                <h3 className="mb-4 text-2xl font-medium text-cs-dark-blue">{item.title}</h3>
                <p className="mb-6 font-light leading-relaxed text-cs-dark-blue/85">{item.body}</p>
                <Link href={item.href} className="mt-auto inline-flex items-center gap-2 font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">{item.label} <ArrowRight className="h-4 w-4 shrink-0" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="by-role" className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="by-role" className="mb-3 text-3xl font-light text-cs-navy md:text-4xl">Find the answer for your role</h2>
          <p className="mb-8 max-w-3xl font-light leading-relaxed text-cs-dark-blue/85">Each person in an institution&apos;s review tends to ask a different question first. These are the pages that answer them.</p>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roleRoutes.map((route) => (
              <li key={route.role} className="flex flex-col rounded-xl border border-cs-gray p-6">
                <h3 className="text-lg font-medium text-cs-dark-blue">{route.role}</h3>
                <p className="mt-2 mb-4 font-light leading-relaxed text-cs-dark-blue/85">{route.question}</p>
                <div className="mt-auto flex flex-col gap-2">
                  {route.links.map((link) => (
                    <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">{link.label} <ArrowRight className="h-4 w-4 shrink-0" /></Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="score-limits" className="scroll-mt-24 bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 max-w-4xl text-3xl font-light text-cs-navy md:text-4xl">A framework&apos;s evidence doesn&apos;t validate an AI score</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 font-light leading-relaxed text-cs-dark-blue/85">
              <p>The communication frameworks we apply were built for trained human raters. Applying them through AI in simulated encounters goes beyond the settings in which their published reliability was established.</p>
              <p>Consistency between model runs isn&apos;t agreement with expert human raters. We haven&apos;t completed faculty-rater validation on a customer&apos;s own rubric, and we don&apos;t claim our scores are more accurate than faculty judgment.</p>
              <Link href="/methodology" className="inline-block font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">Read the scoring method and limits</Link>
            </div>
            <div className="rounded-xl bg-cs-dark-blue p-6 text-cs-cloud md:p-8">
              <h3 className="mb-4 text-xl font-medium text-white">Keep practice feedback formative</h3>
              <p className="font-light leading-relaxed">{FORMATIVE_USE_LIMITATION}</p>
              <p className="mt-4 font-light leading-relaxed">{NO_OUTCOME_PREDICTION_LIMITATION}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-3xl font-light text-cs-navy">Research outcomes need a confirmed record</h2>
            <p className="font-light leading-relaxed text-cs-dark-blue/85">Studies of ClinicalSim are underway at partner institutions. We won&apos;t publish their outcomes until the study owners confirm the record in writing. The public conference list records presentations, and it doesn&apos;t imply a peer-reviewed outcome publication.</p>
            <Link href="/research" className="mt-5 inline-block font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">Discuss a research question</Link>
          </div>
          <div>
            <h2 className="mb-5 text-3xl font-light text-cs-navy">Continue your institution&apos;s review</h2>
            <p className="font-light leading-relaxed text-cs-dark-blue/85">The evaluation guide covers intended use, rollout needs, and who takes part in the review. The trust page describes data handling and the questions IT and privacy teams should examine.</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/evaluation" className="font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">Evaluation guide</Link>
              <Link href="/trust" className="font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">Trust and data handling</Link>
            </div>
          </div>
        </div>
      </section>

      <WaveformBand seed="evidence-contact">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-5 text-3xl font-light md:text-4xl">Bring the questions your team needs answered</h2>
          <p className="mb-8 text-lg font-light leading-relaxed text-cs-cloud">We&apos;ll walk through the product, the standard you want participants to practice against, and the evidence your institution needs to review.</p>
          <Button asChild variant="accent" size="lg"><Link href="/contact">{PRIMARY_CTA}</Link></Button>
        </div>
      </WaveformBand>
    </>
  )
}
