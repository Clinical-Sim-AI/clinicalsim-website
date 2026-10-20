import type { Metadata } from "next"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { HubSpotEmbedForm } from "@/components/hubspot-embed-form"
import {
  ECONOMICS_PAPER_FORM,
  ECONOMICS_PAPER_URL,
  ECONOMICS_POST_PATH,
} from "@/lib/hospital-economics-white-paper"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"

// Every claim on this page restates the paper, whose figures come from the
// verified claim ledgers in Claude-Workspace/04-market-research.

const TITLE = "Hospital economics white paper"
const H1 = "The impact of communication on hospital economics"
const DESCRIPTION =
  "The full white paper for hospital leaders: four communication pathways traced into the costs a hospital already tracks, what the published evidence establishes and what it doesn't, and a method for a first review with local data."

const INSIDE = [
  "Four communication behaviors followed into the operational consequences they may produce and the economic categories those fall into",
  "What the published evidence on discharge, handoffs, claims, value-based payment and consent establishes, and what it leaves for the hospital to find out",
  "Why a readmission isn't a uniform loss, and how payer mix changes what an avoided one is worth",
  "A first engagement leadership can run with two owners, one pathway and its own data",
]

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: H1,
    description: DESCRIPTION,
    url: ECONOMICS_PAPER_URL,
  },
  twitter: {
    title: H1,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: ECONOMICS_PAPER_URL,
  },
}

export default function HospitalEconomicsWhitePaperPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: TITLE,
            description: DESCRIPTION,
            url: ECONOMICS_PAPER_URL,
            dateModified: PAGE_DATE_MODIFIED.hospitalEconomicsWhitePaper,
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
                name: "Hospital economics white paper",
                item: ECONOMICS_PAPER_URL,
              },
            ],
          },
        ]}
      />

      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-12 text-white md:py-16">
        <Waveform seed="hospital-economics-white-paper" align="right" opacity={0.15} />

        <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-x-16 lg:gap-y-0">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <nav className="mb-8 flex items-center gap-2 text-sm text-cs-cloud/70">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Hospital economics white paper</span>
            </nav>

            <p className="mb-5 text-xs font-medium uppercase tracking-[0.14em] text-cs-electric md:text-sm">
              Free white paper for hospital leaders
            </p>
            <h1 className="text-balance text-3xl font-light leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              {H1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-cs-cloud md:text-xl">
              Hospital leaders already track readmissions, survey scores, complaints and claims, and each can carry a communication problem the dashboard doesn&apos;t show. This paper sets out how to ask whether communication is contributing to a cost the hospital already pays, without pricing a problem it hasn&apos;t confirmed.
            </p>
          </div>

          <div id="get-the-white-paper" className="min-w-0 scroll-mt-20 rounded-2xl bg-white p-6 text-cs-dark-blue shadow-xl md:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <h2 className="text-2xl font-medium text-cs-dark-blue">Get the white paper</h2>
            <div className="mt-5 min-h-[420px]">
              <HubSpotEmbedForm {...ECONOMICS_PAPER_FORM} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cs-dark-blue/70">
              Every figure is cited to a published source. The download opens as soon as you submit.
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
              Prefer to read it here first? The{" "}
              <Link
                href={ECONOMICS_POST_PATH}
                className="font-medium text-cs-electric underline underline-offset-4 hover:text-white"
              >
                shorter web edition
              </Link>{" "}
              is open to everyone, no form.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
