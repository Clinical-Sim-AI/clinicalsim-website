import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Calculator } from "@/components/roi/Calculator"
import { JsonLd } from "@/components/json-ld"
import { SectionDivider } from "@/components/section-divider"
import { Button } from "@/components/ui/button"

const URL = "https://clinicalsim.ai/roi-calculator"

const DESCRIPTION =
  "Estimate what ClinicalSim is worth to your program in your own numbers. Built on Goyal 2018 (6.7 faculty hours per trainee per year on milestone assessment), published remediation base rates, and AAMC stipend data. Runs in your browser, nothing is transmitted, and every figure shows its source."

export const metadata: Metadata = {
  title: "GME ROI Calculator for Program Directors and DIOs",
  description: DESCRIPTION,
  // Unpublished pending review. noindex rather than a robots.txt Disallow: a
  // Disallow would stop crawlers reading the page at all, and a crawler that
  // cannot read the page never sees the noindex, so anything already linked
  // externally can keep surfacing. Remove this block to publish.
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "GME ROI Calculator | ClinicalSim.ai",
    description: DESCRIPTION,
    url: URL,
  },
  twitter: {
    title: "GME ROI Calculator | ClinicalSim.ai",
    description:
      "A break-even calculator for residency programs and GME institutions. Faculty assessment time, remediation time, and the extended-year threshold, with every constant sourced.",
  },
  alternates: {
    canonical: URL,
  },
}

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "GME ROI Calculator: ClinicalSim.ai",
            description: DESCRIPTION,
            url: URL,
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
                name: "ROI Calculator",
                item: URL,
              },
            ],
          },
        ]}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-16 text-white md:py-24">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cs-electric md:text-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-cs-electric"
              aria-hidden="true"
            />
            For program directors and DIOs
          </p>
          <h1 className="mb-6 text-balance text-4xl font-light leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
            What is this worth{" "}
            <span className="font-medium text-cs-electric">
              in your own numbers?
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg font-light leading-relaxed text-cs-cloud md:text-xl">
            A break-even threshold you can check, not an ROI multiple you have
            to take on faith. Every figure below carries its source, the model
            can return a losing answer, and nothing you enter leaves your
            browser.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* ------------------------------------------------------------------ */}
      {/* Calculator                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white px-6 py-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <Calculator />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* What this does not price                                            */}
      {/* ------------------------------------------------------------------ */}
      <SectionDivider variant="wave" color="white" />

      <section className="bg-cs-cloud px-6 py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-light text-cs-navy md:text-4xl">
            What this calculator{" "}
            <span className="font-medium text-cs-dark-blue">will not tell you</span>
          </h2>
          <p className="text-base font-light leading-relaxed text-cs-dark-blue/85 md:text-lg">
            It does not price the practice every trainee who is not in
            remediation gets, because nobody has measured what that is worth. It
            does not claim to displace standardized patient spend, because
            ClinicalSim extends an SP program rather than replacing it. It does
            not put a dollar on accreditation exposure, because the base rates
            are published and the costs are not. And it does not project how
            many extended training years it prevents, because the literature
            reports composite adverse outcomes rather than extension rates.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-cs-dark-blue/85 md:text-lg">
            Refusing to make a claim we cannot support is the point. If the
            number this produces is smaller than you expected, that is the
            model working.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <SectionDivider variant="diagonal-up" color="cloud" />

      <section className="bg-cs-dark-blue px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-light md:text-4xl lg:text-5xl">
            Want the numbers for your own program?
          </h2>
          <p className="mb-8 text-lg font-light text-white/90 md:text-xl">
            Send us the link with your inputs already in it and we will walk
            through where our assumptions and your experience disagree. That
            conversation is more useful to us than the calculator is.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Talk to us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
