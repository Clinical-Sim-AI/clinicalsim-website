import type { Metadata } from "next"
import Link from "next/link"
import { Check, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatHighlight } from "@/components/stat-highlight"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { ROICalculator } from "@/components/roi-calculator"
import { cn } from "@/lib/utils"
import { pricingPageData } from "@/lib/pricing"

export const metadata: Metadata = {
  title: "Pricing — AI Clinical Simulation for Medical Education",
  description:
    "ClinicalSim.ai pricing for individuals, programs, and enterprise. Individual plans from $19/month. Program licenses from $29/user/month billed annually. Enterprise custom pricing with SSO, LMS integration, and dedicated support.",
  openGraph: {
    title: "Pricing | ClinicalSim.ai",
    description:
      "AI clinical simulation pricing for medical education. Individual, program, and enterprise plans with milestone-aligned practice and CCC-ready documentation.",
    url: "https://clinicalsim.ai/pricing",
  },
  twitter: {
    title: "Pricing | ClinicalSim.ai",
    description:
      "ClinicalSim.ai pricing from $19/month for individuals. Program licenses from $29/user/month. Enterprise custom pricing available.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/pricing",
  },
}

const data = pricingPageData

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Pricing — ClinicalSim.ai",
            description: metadata.description,
            url: "https://clinicalsim.ai/pricing",
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
                name: "Pricing",
                item: "https://clinicalsim.ai/pricing",
              },
            ],
          },
          faqJsonLd,
        ]}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden bg-cs-dark-blue text-white">
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            <span className="font-medium">{data.heroHeadline}</span>
          </h1>
          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed max-w-3xl mx-auto mb-8">
            {data.heroSubheadline}
          </p>
          <a href="#roi-calculator">
            <Button variant="accent" size="lg">
              See what you could save
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Context stat                                                        */}
      {/* ------------------------------------------------------------------ */}
      <SectionDivider variant="diagonal-down" color="white" />

      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <StatHighlight
            value="93%"
            label="of residency programs have faced communication remediation in the past three years"
            source="CERA Survey"
            variant="accent"
            size="large"
          />
          <p className="text-base md:text-lg text-cs-dark-blue/85 font-light leading-relaxed max-w-3xl mx-auto mt-8">
            {data.contextParagraph}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ROI Calculator                                                      */}
      {/* ------------------------------------------------------------------ */}
      <SectionDivider variant="wave" color="white" />

      <section id="roi-calculator" className="px-6 py-12 md:py-16 bg-white scroll-mt-20">
        <ROICalculator />
        <div className="text-center mt-8">
          <a href="#plans">
            <Button variant="secondary" size="lg">
              See plans &amp; pricing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Pricing cards                                                       */}
      {/* ------------------------------------------------------------------ */}
      <SectionDivider variant="wave" color="slate" />

      <section
        id="plans"
        className="px-6 py-12 md:py-16 bg-cs-cloud scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 items-start">
            {data.tiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  "relative bg-white rounded-2xl border transition-all duration-300 flex flex-col",
                  tier.highlighted
                    ? "border-cs-electric/50 md:scale-105 shadow-xl z-10 p-6 md:p-8"
                    : "border-cs-gray/50 p-6 md:p-8",
                  tier.id === "individual" && "md:opacity-80 md:scale-95"
                )}
              >
                {/* Badge */}
                {tier.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cs-electric text-white text-sm font-medium px-4 py-1 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </span>
                )}

                {/* Tier name */}
                <h3 className="text-sm font-medium uppercase tracking-wider text-cs-dark-gray mb-4">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mb-2">
                  {tier.priceMonthly ? (
                    <div className="flex items-baseline gap-1">
                      <span
                        className={cn(
                          "font-bold tracking-tight text-4xl md:text-5xl font-bold",
                          tier.highlighted ? "text-cs-dark-blue" : "text-cs-dark-blue"
                        )}
                      >
                        {tier.priceMonthly}
                      </span>
                      <span className="text-cs-dark-gray font-light text-base">
                        {tier.priceLabel}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold tracking-tight text-3xl md:text-4xl font-bold text-cs-navy">
                      {tier.priceLabel}
                    </span>
                  )}
                </div>

                {/* Annual price note */}
                {tier.priceAnnualPerMonth && (
                  <p className="text-sm text-cs-dark-gray font-light mb-4">
                    {tier.priceAnnualPerMonth}/month billed annually (
                    {tier.priceAnnualTotal})
                  </p>
                )}

                {/* Footnote (billing terms) */}
                {tier.footnote && !tier.priceAnnualPerMonth && (
                  <p className="text-sm text-cs-dark-gray font-light mb-4">
                    {tier.footnote}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-cs-dark-blue/70 font-light leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Features heading */}
                {tier.featuresHeading && (
                  <p className="text-sm font-medium text-cs-dark-blue mb-3">
                    {tier.featuresHeading}
                  </p>
                )}

                {/* Feature list */}
                <ul className="space-y-3 mb-6 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check
                        className={cn(
                          "w-4 h-4 mt-0.5 flex-shrink-0",
                          tier.highlighted ? "text-cs-dark-blue" : "text-cs-dark-blue"
                        )}
                      />
                      <span className="text-sm text-cs-dark-blue/85 font-light leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Custom scenarios callout — Program tier only */}
                {tier.id === "program" && (
                  <div className="border border-cs-electric/20 bg-cs-cloud rounded-lg px-4 py-3 mb-6">
                    <p className="text-sm text-cs-dark-blue font-medium mb-1">
                      Need scenarios built for your specialty?
                    </p>
                    <p className="text-xs text-cs-dark-blue/70 font-light leading-relaxed">
                      We build custom scenarios grounded in validated frameworks
                      (Calgary-Cambridge, SPIKES, ACGME ICS 2.0) — included for
                      founding programs.{" "}
                      <Link
                        href="/contact"
                        className="text-cs-dark-blue hover:text-cs-dark-blue transition-colors font-normal"
                      >
                        Learn more &rarr;
                      </Link>
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto">
                  <Link href={tier.cta.href} className="block">
                    <Button
                      variant={tier.cta.variant}
                      size="lg"
                      className="w-full"
                    >
                      {tier.cta.label}
                    </Button>
                  </Link>
                  {tier.secondaryCta && (
                    <Link
                      href={tier.secondaryCta.href}
                      className="block text-center mt-2 text-sm text-cs-dark-blue hover:text-cs-dark-blue transition-colors font-light"
                    >
                      {tier.secondaryCta.label}
                    </Link>
                  )}
                  {tier.footnote && tier.priceAnnualPerMonth && (
                    <p className="text-xs text-cs-gray font-light text-center mt-2">
                      {tier.footnote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Program cost table                                                */}
          {/* ---------------------------------------------------------------- */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light text-cs-dark-blue mb-2 text-center">
              What does this look like for{" "}
              <span className="text-cs-dark-blue font-medium">your program?</span>
            </h3>
            <p className="text-sm text-cs-dark-gray font-light text-center mb-8">
              Program tier pricing
            </p>

            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl border border-cs-gray/50 overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cs-navy text-white">
                      <th className="px-6 py-4 text-left text-sm font-medium">
                        Program Size
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium">
                        Annual Cost
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium">
                        Per Learner / Year
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.programCostRows.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-cs-dark-blue">
                          {row.programSize}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold tracking-tight text-cs-dark-blue font-bold">
                          {row.annualCost}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold tracking-tight text-cs-dark-blue/85">
                          {row.perLearnerYear}
                          {row.note && (
                            <span className="block font-sans font-light text-xs text-cs-dark-gray mt-1">
                              {row.note}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {data.programCostRows.map((row, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-cs-gray/50 p-5"
                >
                  <h4 className="text-base font-medium text-cs-dark-blue mb-3">
                    {row.programSize}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cs-dark-gray">Annual Cost</span>
                      <span className="font-bold tracking-tight text-cs-dark-blue font-bold">
                        {row.annualCost}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cs-dark-gray">Per Learner / Year</span>
                      <span className="font-bold tracking-tight text-cs-dark-blue/85">
                        {row.perLearnerYear}
                      </span>
                    </div>
                  </div>
                  {row.note && (
                    <p className="text-xs text-cs-dark-gray font-light mt-3">
                      {row.note}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="text-sm text-cs-dark-blue/70 font-light leading-relaxed mt-8 max-w-3xl mx-auto text-center">
              {data.programCostContext}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Comparison table                                                     */}
      {/* ------------------------------------------------------------------ */}
      <SectionDivider variant="diagonal-up" color="slate" />

      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 text-center">
            Standardized Patients vs.{" "}
            <span className="text-cs-dark-blue font-medium">ClinicalSim AI</span>
          </h2>

          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl border border-cs-gray/50 overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-cs-navy text-white">
                    <th className="px-6 py-4 text-left text-sm font-medium" />
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Standardized Patients
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      ClinicalSim AI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.comparisonRows.map((row, index) => (
                    <tr
                      key={index}
                      className={cn(
                        "transition-colors",
                        row.highlight
                          ? "bg-cs-electric/5 border-l-4 border-l-cs-electric"
                          : "hover:bg-gray-50"
                      )}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-cs-dark-blue">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-sm text-cs-dark-blue/85">
                        {row.sp}
                      </td>
                      <td
                        className={cn(
                          "px-6 py-4 text-sm",
                          row.highlight
                            ? "text-cs-dark-blue font-bold font-bold tracking-tight"
                            : "text-cs-dark-blue/85"
                        )}
                      >
                        {row.clinicalsim}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {data.comparisonRows.map((row, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl border p-5",
                  row.highlight
                    ? "bg-cs-electric/5 border-cs-electric/20"
                    : "bg-white border-cs-gray/50"
                )}
              >
                <h3 className="text-base font-medium text-cs-dark-blue mb-3">
                  {row.feature}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cs-dark-gray">SPs</span>
                    <span className="text-cs-dark-blue/85">{row.sp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-dark-gray">ClinicalSim</span>
                    <span
                      className={cn(
                        row.highlight
                          ? "text-cs-dark-blue font-bold font-bold tracking-tight"
                          : "text-cs-dark-blue/85"
                      )}
                    >
                      {row.clinicalsim}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Testimonials                                                         */}
      {/* ------------------------------------------------------------------ */}
      <SectionDivider variant="diagonal-down" color="white" />

      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {data.testimonials.map((testimonial, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-2 md:-left-4 -top-2 text-6xl text-cs-dark-blue/20 font-serif">
                  &ldquo;
                </div>
                <blockquote className="relative pl-8 pt-4">
                  <p className="text-lg md:text-xl text-cs-dark-blue font-light leading-relaxed mb-4">
                    {testimonial.quote}
                  </p>
                  <cite className="text-sm text-cs-dark-blue/70 font-normal not-italic border-l-4 border-cs-electric pl-4">
                    {testimonial.attribution}
                  </cite>
                </blockquote>
              </div>
            ))}
          </div>

          <p className="text-sm text-cs-dark-gray font-light text-center mt-12 max-w-2xl mx-auto italic">
            {data.trustLine}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ                                                                  */}
      {/* ------------------------------------------------------------------ */}
      <SectionDivider variant="diagonal-up" color="slate" />

      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            Frequently Asked{" "}
            <span className="text-cs-dark-blue font-medium">Questions</span>
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-cs-gray/50 rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-medium text-cs-dark-blue pr-4">
                      {faq.question}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-cs-gray flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Founding Program CTA                                                 */}
      {/* ------------------------------------------------------------------ */}
      <SectionDivider variant="diagonal-down" color="indigo" />

      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            {data.foundingHeadline}
          </h2>
          {data.foundingDescription.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="text-lg md:text-xl font-light mb-6 text-white/90"
            >
              {paragraph}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                {data.foundingCta}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
