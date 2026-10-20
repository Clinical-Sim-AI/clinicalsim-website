import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import {
  CCI_BRIEF_MEETINGS_URL,
  CCI_BRIEF_PDF_URL,
  CCI_BRIEF_THANK_YOU_URL,
  CCI_BRIEF_URL,
} from "@/lib/cci-executive-brief"
import { COHORT_REPORT_PATH } from "@/lib/cohort-report"
import { PRIMARY_CTA } from "@/lib/positioning"

// HubSpot redirects here after the brief's form is submitted. Kept out of the
// sitemap and /llms.txt, and noindexed, because the PDF link is the gate.

const DESCRIPTION = "Download the clinical communication intelligence executive brief."

export const metadata: Metadata = {
  title: "Executive brief download",
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Executive brief download",
    description: DESCRIPTION,
    url: CCI_BRIEF_THANK_YOU_URL,
  },
  twitter: {
    title: "Executive brief download",
    description: DESCRIPTION,
  },
  alternates: {
    canonical: CCI_BRIEF_THANK_YOU_URL,
  },
}

export default function CciExecutiveBriefThankYouPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Executive brief download",
            description: DESCRIPTION,
            url: CCI_BRIEF_THANK_YOU_URL,
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
              {
                "@type": "ListItem",
                position: 3,
                name: "Download",
                item: CCI_BRIEF_THANK_YOU_URL,
              },
            ],
          },
        ]}
      />

      <section className="bg-cs-dark-blue px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-light tracking-tight md:text-5xl">Your brief is ready</h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-cs-cloud md:text-xl">
            Thanks. Download it below. It&apos;s two pages, written to be forwarded as is.
          </p>
          <Button variant="accent" size="xl" asChild className="mt-8">
            <a href={CCI_BRIEF_PDF_URL} target="_blank" rel="noopener">
              <Download className="shrink-0" />
              Download the PDF
            </a>
          </Button>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-light text-cs-dark-blue md:text-3xl">
            Which communication responsibility would be most useful to understand?
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-cs-dark-blue/80">
            Tell us what your team wants to practice. We&apos;ll show you a relevant case and talk through how a first assessment could work. The brief&apos;s second page comes from{" "}
            <Link href={COHORT_REPORT_PATH} className="font-medium underline underline-offset-4 hover:text-cs-navy">
              this anonymized cohort report
            </Link>
            , which you can read in full.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button variant="default" size="lg" asChild>
              <Link href="/contact">
                {PRIMARY_CTA}
                <ArrowRight className="shrink-0" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href={CCI_BRIEF_MEETINGS_URL} target="_blank" rel="noopener">
                Book a time to talk
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
