import type { Metadata } from "next"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import {
  NURSING_BRIEF_MEETINGS_URL,
  NURSING_BRIEF_PDF_URL,
  NURSING_BRIEF_THANK_YOU_URL,
  NURSING_BRIEF_URL,
} from "@/lib/nursing-turnover-brief"

// HubSpot redirects here after the brief's form is submitted. Kept out of the
// sitemap and /llms.txt, and noindexed, because the PDF link is the gate.

const DESCRIPTION = "Download the nursing turnover brief and book a 20-minute demo."

export const metadata: Metadata = {
  title: "Nursing turnover brief download",
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Nursing turnover brief download",
    description: DESCRIPTION,
    url: NURSING_BRIEF_THANK_YOU_URL,
  },
  twitter: {
    title: "Nursing turnover brief download",
    description: DESCRIPTION,
  },
  alternates: {
    canonical: NURSING_BRIEF_THANK_YOU_URL,
  },
}

export default function NursingTurnoverBriefThankYouPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Nursing turnover brief download",
            description: DESCRIPTION,
            url: NURSING_BRIEF_THANK_YOU_URL,
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
              {
                "@type": "ListItem",
                position: 3,
                name: "Download",
                item: NURSING_BRIEF_THANK_YOU_URL,
              },
            ],
          },
        ]}
      />

      <section className="bg-cs-dark-blue px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-light tracking-tight md:text-5xl">Your brief is ready</h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-cs-cloud md:text-xl">
            Thanks for downloading it. A copy is on its way to your inbox as well.
          </p>
          <Button variant="accent" size="xl" asChild className="mt-8">
            <a href={NURSING_BRIEF_PDF_URL} target="_blank" rel="noopener">
              <Download className="shrink-0" />
              Download the PDF
            </a>
          </Button>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-light text-cs-dark-blue md:text-3xl">
            Want to see a nurse practice one of these conversations?
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-cs-dark-blue/80">
            In 20 minutes we&apos;ll walk through a case like the 3am call to an on-call physician, scored against an escalation policy or a public framework like SBAR.
          </p>
          <Button variant="secondary" size="lg" asChild className="mt-8">
            <a href={NURSING_BRIEF_MEETINGS_URL} target="_blank" rel="noopener">
              Book a 20-minute demo
              <ArrowRight className="shrink-0" />
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
