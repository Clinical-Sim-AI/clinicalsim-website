import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import {
  FORMATIVE_USE_LIMITATION,
  NO_OUTCOME_PREDICTION_LIMITATION,
  RATER_VALIDATION_LIMITATION,
} from "@/lib/claim-discipline"
import {
  COHORT_REPORT_COUNTS,
  COHORT_REPORT_ELEMENTS,
  COHORT_REPORT_FEEDBACK_ELEMENT,
  COHORT_REPORT_FEEDBACK_EXAMPLES,
  COHORT_REPORT_FRAMEWORKS,
  COHORT_REPORT_LIMITS,
  COHORT_REPORT_META,
  COHORT_REPORT_NEXT_ROUND,
  COHORT_REPORT_PATH,
  COHORT_REPORT_SCENARIOS,
  COHORT_REPORT_SCOPE_RULE,
  COHORT_REPORT_SCOPE_TOTALS,
  COHORT_REPORT_STRENGTH_QUOTES,
} from "@/lib/cohort-report"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { ORGANIZATION, PRIMARY_CTA } from "@/lib/positioning"

const PAGE_URL = `https://clinicalsim.ai${COHORT_REPORT_PATH}`
const PAGE_DESCRIPTION =
  "An anonymized report from one partner health system: 82 practice conversations with AI patients by 68 clinicians, scored against the system's own patient experience frameworks."

export const metadata: Metadata = {
  title: "Health system cohort report example",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "What one health system learned from 82 practice conversations",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
  },
  twitter: {
    title: "What one health system learned from 82 practice conversations",
    description: PAGE_DESCRIPTION,
  },
  alternates: { canonical: PAGE_URL },
}

function formatMean(mean: number) {
  return mean.toFixed(2)
}

export default function HealthSystemCohortReportPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Health system cohort report example",
            description: PAGE_DESCRIPTION,
            url: PAGE_URL,
            dateModified: PAGE_DATE_MODIFIED.cohortReport,
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
              { "@type": "ListItem", position: 2, name: "Examples", item: "https://clinicalsim.ai/examples" },
              { "@type": "ListItem", position: 3, name: "Health system cohort report", item: PAGE_URL },
            ],
          },
        ]}
      />

      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-14 text-white md:py-20">
        <Waveform seed="cohort-report" align="right" opacity={0.14} />
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-cs-cloud/70">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <Link href="/examples" className="transition-colors hover:text-white">Examples</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-white">Health system cohort report</span>
          </nav>
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.1em] text-cs-electric">
            Anonymized report from one partner health system, {COHORT_REPORT_META.reportDateLabel}
          </p>
          <h1 className="max-w-4xl text-4xl font-light leading-tight text-balance md:text-5xl">
            What one health system learned from 82 practice conversations
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-cs-cloud">
            Between {COHORT_REPORT_META.collectionWindow}, {COHORT_REPORT_META.participants} at
            one partner health system spoke with AI patients and family members on ClinicalSim.
            We scored every transcript against the system&apos;s own patient experience
            frameworks and quoted the clinician&apos;s words under every score.
          </p>
          <p className="mt-4 max-w-3xl font-light leading-relaxed text-cs-cloud/90">
            This is the leadership view of those encounters. The health system and its framework
            names are withheld, ClinicalSim staff and outside users were removed from the data,
            and no clinician is named. The partner approved this anonymized version for publication.
          </p>
          <dl className="mt-10 grid gap-6 border-t border-white/20 pt-8 sm:grid-cols-3">
            {COHORT_REPORT_COUNTS.map((count) => (
              <div key={count.label}>
                <dt className="sr-only">{count.label}</dt>
                <dd>
                  <span className="block text-5xl font-light text-cs-electric">{count.value}</span>
                  <span className="mt-2 block font-light text-cs-cloud">{count.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-medium text-cs-navy">The finding</p>
          <h2 className="mb-6 max-w-3xl text-3xl font-light text-cs-navy md:text-4xl">
            Clinicians open these conversations well, and the close is where to practice next
          </h2>
          <div className="max-w-3xl space-y-4 text-lg font-light leading-relaxed text-cs-dark-blue/85">
            <p>
              All three frameworks show the same pattern. Scores run highest where clinicians
              receive a concern and explain the situation: hearing the family averaged 4.22 and
              4.15 on the two service recovery models.
            </p>
            <p>
              The transcripts show clinicians listening. The practice opportunity is saying so out
              loud: reflecting the concern back, checking it was understood, asking what matters
              most, and thanking the family for raising it. Those are the steps that let a family
              leave knowing they were heard, and they can be taught and practiced.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-cs-gray">
            <table className="w-full text-left text-cs-dark-blue">
              <caption className="sr-only">
                Mean element scores on a 1 to 5 scale, the number of conversations scored, and the share scored below 3
              </caption>
              <thead className="bg-cs-dark-blue text-sm text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium md:px-6">Element</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium md:px-6">Mean (1 to 5)</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium md:px-6">n</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium md:px-6">Below 3</th>
                </tr>
              </thead>
              {COHORT_REPORT_ELEMENTS.map((group) => (
                <tbody key={group.heading}>
                  <tr className="bg-cs-cloud">
                    <th scope="colgroup" colSpan={4} className="px-4 py-3 text-sm font-medium text-cs-navy md:px-6">
                      {group.heading}
                    </th>
                  </tr>
                  {group.elements.map((row) => (
                    <tr key={`${row.framework}-${row.element}`} className="border-t border-cs-gray/60">
                      <th scope="row" className="px-4 py-4 font-normal md:px-6">
                        <span className="mr-2 inline-block rounded-xs bg-cs-navy px-2 py-0.5 text-xs font-medium text-white">
                          {row.framework}
                        </span>
                        <span className="font-light">{row.element}</span>
                      </th>
                      <td className="px-3 py-4 text-right tabular-nums md:px-6">
                        <span className="font-medium">{formatMean(row.mean)}</span>
                        <span
                          aria-hidden="true"
                          className="ml-3 hidden h-1.5 w-20 overflow-hidden rounded-full bg-cs-gray/60 align-middle md:inline-block"
                        >
                          <span className="block h-full bg-cs-navy" style={{ width: `${(row.mean / 5) * 100}%` }} />
                        </span>
                      </td>
                      <td className="px-3 py-4 text-right font-light tabular-nums md:px-6">{row.n}</td>
                      <td className="px-4 py-4 text-right font-light tabular-nums md:px-6">{row.belowThreePercent}%</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <dl className="mt-5 grid max-w-4xl gap-x-6 gap-y-2 text-sm font-light text-cs-dark-blue/80 md:grid-cols-3">
            {COHORT_REPORT_FRAMEWORKS.map((framework) => (
              <div key={framework.code}>
                <dt className="inline font-medium text-cs-dark-blue">{framework.code}: </dt>
                <dd className="inline">{framework.description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 max-w-4xl text-sm font-light text-cs-dark-blue/80">
            Each element was scored 1 to 5 with a written rationale and a verbatim quote as evidence.
            &quot;Below 3&quot; is the share of scored conversations under the bar.
          </p>
        </div>
      </section>

      <section className="bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-medium text-cs-navy">What strength sounds like</p>
          <h2 className="mb-6 max-w-3xl text-3xl font-light text-cs-navy md:text-4xl">
            The skill is already inside the cohort
          </h2>
          <p className="mb-8 max-w-3xl text-lg font-light leading-relaxed text-cs-dark-blue/85">
            The strongest conversations come from the same clinicians. Every line below is verbatim
            from a recorded simulation and identified by scenario only.
          </p>
          <ul className="grid gap-5 md:grid-cols-3">
            {COHORT_REPORT_STRENGTH_QUOTES.map((quote) => (
              <li key={quote.text} className="rounded-xl border border-cs-gray bg-white p-6">
                <blockquote className="border-l-2 border-cs-navy pl-4 text-xl font-light leading-snug text-cs-dark-blue">
                  &quot;{quote.text}&quot;
                </blockquote>
                <p className="mt-4 text-sm font-medium text-cs-dark-blue">{quote.speaker}</p>
                <p className="mt-1 text-sm font-light text-cs-dark-blue/75">{quote.context}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-medium text-cs-navy">What each participant sees</p>
          <h2 className="mb-6 max-w-3xl text-3xl font-light text-cs-navy md:text-4xl">
            Feedback tied to a sentence the clinician said
          </h2>
          <p className="mb-8 max-w-3xl text-lg font-light leading-relaxed text-cs-dark-blue/85">
            Each clinician reads scored, quoted feedback right after the conversation, before any
            group report exists. These two examples are on one element, {COHORT_REPORT_FEEDBACK_ELEMENT}.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {COHORT_REPORT_FEEDBACK_EXAMPLES.map((example, index) => (
              <div
                key={example.score}
                className={
                  index === 0
                    ? "rounded-2xl bg-cs-navy p-6 text-white md:p-8"
                    : "rounded-2xl border border-cs-gray bg-cs-cloud p-6 text-cs-dark-blue md:p-8"
                }
              >
                <p className={index === 0 ? "mb-4 text-sm font-medium text-cs-electric" : "mb-4 text-sm font-medium text-cs-navy"}>
                  {index === 0 ? "What went well" : "What to practice next"}
                </p>
                <p className="mb-4 text-3xl font-light">{example.score}</p>
                <blockquote
                  className={
                    index === 0
                      ? "border-l-2 border-cs-electric pl-4 font-light leading-relaxed text-cs-cloud"
                      : "border-l-2 border-cs-navy pl-4 font-light leading-relaxed text-cs-dark-blue/85"
                  }
                >
                  &quot;{example.quote}&quot;
                </blockquote>
                <p className={index === 0 ? "mt-5 font-light leading-relaxed text-white" : "mt-5 font-light leading-relaxed"}>
                  {example.feedback}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl font-light leading-relaxed text-cs-dark-blue/85">
            Because the score points to the clinician&apos;s own words, the clinician can see exactly
            what to change and run the case again right away.{" "}
            <Link href="/examples" className="font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">
              Open a complete participant report, transcript, and recording
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-medium text-cs-navy">Scenarios and scope</p>
          <h2 className="mb-6 max-w-3xl text-3xl font-light text-cs-navy md:text-4xl">
            Which conversations, and where each framework applied
          </h2>
          <p className="mb-8 max-w-3xl text-lg font-light leading-relaxed text-cs-dark-blue/85">
            {COHORT_REPORT_SCOPE_RULE}
          </p>
          <ul className="space-y-4">
            {COHORT_REPORT_SCENARIOS.map((scenario) => (
              <li key={scenario.name} className="rounded-xl border border-cs-gray bg-white p-5 md:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-medium text-cs-dark-blue">{scenario.name}</h3>
                  <p className="text-sm font-light text-cs-dark-blue/80">
                    {scenario.conversations} {scenario.conversations === 1 ? "conversation" : "conversations"}
                  </p>
                </div>
                <p className="mt-2 font-light leading-relaxed text-cs-dark-blue/85">{scenario.summary}</p>
                <p className="mt-3 text-sm font-light text-cs-dark-blue/80">
                  In scope: Comm {scenario.scope.comm}, SR-A {scenario.scope.srA}, SR-B {scenario.scope.srB}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-medium text-cs-dark-blue">
            Total in scope: Comm {COHORT_REPORT_SCOPE_TOTALS.comm}, SR-A {COHORT_REPORT_SCOPE_TOTALS.srA},
            SR-B {COHORT_REPORT_SCOPE_TOTALS.srB}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-3xl font-light text-cs-navy md:text-4xl">What this report does not show</h2>
          <ul className="max-w-3xl list-disc space-y-3 pl-5 font-light leading-relaxed text-cs-dark-blue/85">
            {COHORT_REPORT_LIMITS.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
            <li>{RATER_VALIDATION_LIMITATION}</li>
            <li>{FORMATIVE_USE_LIMITATION}</li>
            <li>{NO_OUTCOME_PREDICTION_LIMITATION}</li>
          </ul>
        </div>
      </section>

      <section className="bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-medium text-cs-navy">What a next round looks like</p>
          <h2 className="mb-6 max-w-3xl text-3xl font-light text-cs-navy md:text-4xl">
            From one report to a second round of practice
          </h2>
          <p className="mb-8 max-w-3xl text-lg font-light leading-relaxed text-cs-dark-blue/85">
            A retrospective report shows what the practice conversations contain. A second round
            tests whether practice changes the scores and whether faculty agree with them.
          </p>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COHORT_REPORT_NEXT_ROUND.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-cs-gray bg-white p-6">
                <span aria-hidden="true" className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-cs-dark-blue font-medium text-white">
                  {index + 1}
                </span>
                <h3 className="mb-2 text-lg font-medium text-cs-dark-blue">{step.title}</h3>
                <p className="font-light leading-relaxed text-cs-dark-blue/85">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl font-light leading-relaxed text-cs-dark-blue/85">
            See <Link href="/clinical-communication-intelligence" className="font-medium underline underline-offset-4 hover:text-cs-navy">how ClinicalSim works from the first case to the next round</Link>,
            or read <Link href="/evaluation" className="font-medium underline underline-offset-4 hover:text-cs-navy">how an engagement is structured</Link>.
          </p>
        </div>
      </section>

      <WaveformBand seed="cohort-report">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-light md:text-4xl">Bring us the conversation your institution wants to understand</h2>
          <p className="mb-8 text-lg font-light text-white/90">
            Tell us which standard your teams already teach. We&apos;ll show you what a report like
            this one could cover for your group.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="accent" size="xl">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
              <Link href="/examples">
                See participant examples <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
