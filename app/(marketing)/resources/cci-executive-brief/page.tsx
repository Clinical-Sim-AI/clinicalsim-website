import type { Metadata } from "next"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { HubSpotEmbedForm } from "@/components/hubspot-embed-form"
import { CCI_BRIEF_FORM, CCI_BRIEF_URL } from "@/lib/cci-executive-brief"
import { COHORT_REPORT_PATH, COHORT_REPORT_TOTALS } from "@/lib/cohort-report"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"

// The brief is for the clinical champion to forward upward, so the page speaks
// to that person first. Every claim here restates the brief, whose numbers come
// from lib/cohort-report.ts and lib/positioning.ts.

const TITLE = "Clinical communication intelligence brief"
const H1 = "Clinical communication intelligence, in two pages"
const DESCRIPTION =
  "A two-page executive brief you can forward to a budget holder: the question clinical communication intelligence answers, how an engagement starts, and one anonymized health system report."

const INSIDE = [
  "The institutional question: which conversations need attention, who should practice them, and what evidence would show useful development",
  "How an engagement starts, in four steps, from sending your standard to practicing again and comparing",
  `An excerpt from one partner health system's anonymized report: ${COHORT_REPORT_TOTALS.conversations} practice conversations by ${COHORT_REPORT_TOTALS.clinicians} clinicians, scored against its own frameworks`,
  "The limits that come with the scores, stated plainly: formative use, and rater validation that hasn't been done yet",
]

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: H1,
    description: DESCRIPTION,
    url: CCI_BRIEF_URL,
  },
  twitter: {
    title: H1,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: CCI_BRIEF_URL,
  },
}

export default function CciExecutiveBriefPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: TITLE,
            description: DESCRIPTION,
            url: CCI_BRIEF_URL,
            dateModified: PAGE_DATE_MODIFIED.cciExecutiveBrief,
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
                name: "Executive brief",
                item: CCI_BRIEF_URL,
              },
            ],
          },
        ]}
      />

      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-12 text-white md:py-16">
        <Waveform seed="cci-executive-brief" align="right" opacity={0.15} />

        <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-x-16 lg:gap-y-0">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <nav className="mb-8 flex items-center gap-2 text-sm text-cs-cloud/70">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Executive brief</span>
            </nav>

            <p className="mb-5 text-xs font-medium uppercase tracking-[0.14em] text-cs-electric md:text-sm">
              Free brief to forward to your executive
            </p>
            <h1 className="text-balance text-3xl font-light leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              {H1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-cs-cloud md:text-xl">
              For the program director or patient experience lead who needs a budget holder to understand ClinicalSim without sitting through a product tour. Page one sets out the question and how an engagement starts. Page two shows what one health system&apos;s leaders received.
            </p>
          </div>

          <div id="get-the-brief" className="min-w-0 scroll-mt-20 rounded-2xl bg-white p-6 text-cs-dark-blue shadow-xl md:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <h2 className="text-2xl font-medium text-cs-dark-blue">Get the brief</h2>
            <div className="mt-5 min-h-[420px]">
              <HubSpotEmbedForm {...CCI_BRIEF_FORM} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cs-dark-blue/70">
              Two pages, US Letter, ready to forward. The download opens as soon as you submit.
            </p>
          </div>

          <div className="min-w-0 max-w-2xl lg:col-start-1 lg:row-start-2 lg:mt-10">
            <h2 className="text-2xl font-light text-white">What&apos;s inside</h2>
            <ul className="mt-5 space-y-4">
              {INSIDE.map((item) => (
                <li key={item} className="flex gap-3 text-base font-light leading-relaxed text-cs-cloud">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-cs-electric" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base font-light leading-relaxed text-cs-cloud">
              The full report is public, with no form. Read{" "}
              <Link
                href={COHORT_REPORT_PATH}
                className="font-medium text-cs-electric underline underline-offset-4 hover:text-white"
              >
                one health system&apos;s anonymized cohort report
              </Link>{" "}
              or see{" "}
              <Link
                href="/clinical-communication-intelligence"
                className="font-medium text-cs-electric underline underline-offset-4 hover:text-white"
              >
                how ClinicalSim works
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
