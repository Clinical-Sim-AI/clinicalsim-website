import type { Metadata } from "next"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { HubSpotEmbedForm } from "@/components/hubspot-embed-form"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { NURSING_BRIEF_FORM, NURSING_BRIEF_URL } from "@/lib/nursing-turnover-brief"

// Copy from Ben's handoff (nursing-turnover-brief v1, 2026-10-12). The path is
// printed on the ANCC Magnet 2026 booth QR code, so it must not move, and its
// UTM query string must reach HubSpot untouched.

const TITLE = "The conversations behind nurse turnover"
const DESCRIPTION =
  "A three-page brief for nurse leaders on why nurses leave, why the hardest conversations go untrained, and how to practice them before they count."

const INSIDE = [
  "Why nurses leave, in their own survey answers, with a source on every number",
  "Why speaking up, handoffs and manager conversations go untrained and unmeasured",
  "How nurse leaders and first-year nurses can practice those conversations out loud, scored against your hospital's own standards",
]

export const metadata: Metadata = {
  title: "The conversations behind nurse turnover",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: NURSING_BRIEF_URL,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: NURSING_BRIEF_URL,
  },
}

export default function NursingTurnoverBriefPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: TITLE,
            description: DESCRIPTION,
            url: NURSING_BRIEF_URL,
            dateModified: PAGE_DATE_MODIFIED.nursingTurnoverBrief,
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
                name: "Nursing turnover brief",
                item: NURSING_BRIEF_URL,
              },
            ],
          },
        ]}
      />

      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-12 text-white md:py-16">
        <Waveform seed="nursing-turnover-brief" align="right" opacity={0.15} />

        <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-x-16 lg:gap-y-0">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <nav className="mb-8 flex items-center gap-2 text-sm text-cs-cloud/70">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Nursing turnover brief</span>
            </nav>

            <p className="mb-5 text-xs font-medium uppercase tracking-[0.14em] text-cs-electric md:text-sm">
              Free brief for nurse leaders
            </p>
            <h1 className="text-balance text-3xl font-light leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              {TITLE}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-cs-cloud md:text-xl">
              22.7% of newly hired RNs leave within their first year, at $60,090 per departure (NSI Nursing Solutions, 2026). This three-page brief covers why nurses say they leave, why the conversations behind those reasons are so hard to train and measure, and what practicing them looks like.
            </p>
          </div>

          <div id="get-the-brief" className="min-w-0 scroll-mt-20 rounded-2xl bg-white p-6 text-cs-dark-blue shadow-xl md:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <h2 className="text-2xl font-medium text-cs-dark-blue">Get the brief</h2>
            <div className="mt-5 min-h-[420px]">
              <HubSpotEmbedForm {...NURSING_BRIEF_FORM} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cs-dark-blue/70">
              Three pages, sources on every number. We&apos;ll email you a copy too.
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
          </div>
        </div>
      </section>
    </>
  )
}
