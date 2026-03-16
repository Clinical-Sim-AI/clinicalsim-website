import Link from "next/link"
import { ChevronRight, ArrowLeft } from "lucide-react"
import {
  Clock,
  Users,
  FileWarning,
  Mic,
  BarChart3,
  TrendingUp,
  FileText,
  LayoutDashboard,
  GraduationCap,
  Building2,
  Monitor,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatHighlight } from "@/components/stat-highlight"
import { FeatureCard } from "@/components/feature-card"
import { EvidenceShowcase } from "@/components/evidence-showcase"
import { SectionDivider } from "@/components/section-divider"
import { AsymmetricGrid } from "@/components/asymmetric-grid"
import { JsonLd } from "@/components/json-ld"
import { cn } from "@/lib/utils"
import type { RemediationPageData } from "@/lib/remediation"

// ---------------------------------------------------------------------------
// Icon mapping
// ---------------------------------------------------------------------------

const iconMap: Record<string, LucideIcon> = {
  Clock,
  Users,
  FileWarning,
  Mic,
  BarChart3,
  TrendingUp,
  FileText,
  LayoutDashboard,
  GraduationCap,
  Building2,
  Monitor,
  ClipboardCheck,
}

const featureVariants: Array<"warm" | "navy" | "default" | "warm" | "default"> = [
  "warm",
  "navy",
  "default",
  "warm",
  "default",
]

const colorVariantStyles = {
  warm: {
    border: "border-warm/30",
    text: "text-warm",
    topBorder: "border-t-warm",
    bg: "from-orange-50 to-amber-50",
  },
  navy: {
    border: "border-navy/30",
    text: "text-navy",
    topBorder: "border-t-navy",
    bg: "from-blue-50 to-indigo-50",
  },
  blue: {
    border: "border-blue-400/30",
    text: "text-blue-600",
    topBorder: "border-t-blue-600",
    bg: "from-sky-50 to-blue-50",
  },
  success: {
    border: "border-success/30",
    text: "text-success",
    topBorder: "border-t-success",
    bg: "from-emerald-50 to-green-50",
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface RemediationPageLayoutProps {
  data: RemediationPageData
}

export function RemediationPageLayout({ data }: RemediationPageLayoutProps) {
  const faqJsonLd =
    data.faqs && data.faqs.length > 0
      ? {
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
      : null

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd
        data={[
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
                name: "Solutions",
                item: "https://clinicalsim.ai/solutions",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Communication Remediation",
                item: "https://clinicalsim.ai/solutions/remediation",
              },
            ],
          },
          ...(faqJsonLd ? [faqJsonLd] : []),
        ]}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Section 1: Hero                                                    */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative px-6 py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 -z-10" />

        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link
              href="/"
              className="hover:text-gray-700 transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/solutions"
              className="hover:text-gray-700 transition-colors"
            >
              Solutions
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700">Communication Remediation</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light shimmer leading-loose pb-3 mb-4">
            {data.heroH1}
          </h1>

          {data.lastUpdated && (
            <p className="text-sm text-gray-400 font-light mb-4">
              Last updated:{" "}
              {new Date(data.lastUpdated).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-10 max-w-3xl">
            {data.heroSubtitle}
          </p>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {data.heroStats.map((stat, index) => (
              <StatHighlight
                key={index}
                value={stat.value}
                label={stat.label}
                source={stat.source}
                variant={stat.variant}
              />
            ))}
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="gradient-primary" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="#evidence">
              <Button variant="warm-accent" size="lg">
                See a Remediation Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2: The Problem                                             */}
      {/* ----------------------------------------------------------------- */}
      <SectionDivider variant="diagonal-down" color="white" />

      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              Why communication{" "}
              <span className="text-warm font-medium">remediation</span> is
              broken
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.painPoints.map((point, index) => {
              const Icon = iconMap[point.icon]
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 border-glow-hover"
                >
                  {Icon && (
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-warm to-orange-600 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  )}
                  <div className="font-mono text-3xl font-bold text-warm mb-1">
                    {point.stat}
                  </div>
                  <p className="text-sm text-gray-500 font-medium mb-3">
                    {point.statLabel}
                  </p>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {point.headline}
                  </h3>
                  <p className="text-base text-gray-700 font-light leading-relaxed mb-3">
                    {point.description}
                  </p>
                  <p className="text-xs text-gray-400 italic">{point.source}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 3: How It Works                                            */}
      {/* ----------------------------------------------------------------- */}
      <SectionDivider variant="wave" color="slate" />

      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              How <span className="text-warm font-medium">ClinicalSim</span>{" "}
              works for remediation
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Five capabilities purpose-built for communication remediation in
              GME.
            </p>
          </div>

          <AsymmetricGrid layout="staggered" gap="large">
            {data.features.map((feature, index) => {
              const Icon = iconMap[feature.iconName]
              return (
                <FeatureCard
                  key={index}
                  icon={Icon || Mic}
                  title={feature.title}
                  description={feature.description}
                  variant={featureVariants[index % featureVariants.length]}
                  asymmetric
                  expandOnHover
                />
              )
            })}
          </AsymmetricGrid>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 4: Who It's For                                            */}
      {/* ----------------------------------------------------------------- */}
      <SectionDivider variant="diagonal-up" color="white" />

      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              Built for every stakeholder in the{" "}
              <span className="text-warm font-medium">remediation process</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {data.personas.map((persona, index) => {
              const Icon = iconMap[persona.iconName]
              const styles = colorVariantStyles[persona.colorVariant]
              return (
                <div
                  key={index}
                  className={cn(
                    "bg-white rounded-xl border p-6 hover:shadow-lg transition-all duration-300 border-glow-hover",
                    styles.border
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {Icon && (
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          persona.colorVariant === "warm" &&
                            "bg-gradient-to-r from-warm to-orange-600",
                          persona.colorVariant === "navy" && "bg-navy",
                          persona.colorVariant === "blue" &&
                            "bg-gradient-to-r from-blue-600 to-indigo-600",
                          persona.colorVariant === "success" &&
                            "bg-gradient-to-r from-success to-emerald-600"
                        )}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <h3 className="text-xl font-medium text-gray-900">
                      {persona.role}
                    </h3>
                  </div>

                  <p
                    className={cn(
                      "text-base font-medium mb-3 leading-relaxed",
                      styles.text
                    )}
                  >
                    &ldquo;{persona.headline}&rdquo;
                  </p>

                  <p className="text-sm text-gray-600 italic mb-4">
                    {persona.painPoint}
                  </p>

                  <p className="text-sm text-gray-700 font-light leading-relaxed">
                    {persona.whatTheyGet}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 5: The Team                                                */}
      {/* ----------------------------------------------------------------- */}
      <SectionDivider variant="curve" color="blue" />

      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              Built by the people who{" "}
              <span className="text-warm font-medium">do this work</span>
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Simulation directors, communication researchers, and GME leaders
              who understand what remediation actually requires.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.teamCredentials.map((cred, index) => {
              const styles = colorVariantStyles[cred.colorVariant]
              return (
                <div
                  key={index}
                  className={cn(
                    "bg-white rounded-xl border-t-4 border border-gray-200 p-6 hover:shadow-lg transition-all duration-300",
                    styles.topBorder
                  )}
                >
                  <h3
                    className={cn(
                      "text-lg font-medium mb-4",
                      styles.text
                    )}
                  >
                    {cred.area}
                  </h3>
                  <ul className="space-y-2">
                    {cred.credentials.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700 font-light"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 6: Evidence                                                */}
      {/* ----------------------------------------------------------------- */}
      <SectionDivider variant="diagonal-down" color="white" />

      <section id="evidence" className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              Backed by{" "}
              <span className="text-warm font-medium">rigorous evidence</span>
            </h2>
          </div>

          <EvidenceShowcase
            studyTitle={data.evidence.studyTitle}
            journal={data.evidence.journal}
            year={data.evidence.year}
            summary={data.evidence.summary}
            link={data.evidence.link}
            badges={data.evidence.badges}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {data.outcomeStats.map((stat, index) => (
              <StatHighlight
                key={index}
                value={stat.value}
                label={stat.label}
                source={stat.source}
                variant={stat.variant}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 7: Pricing Frame                                           */}
      {/* ----------------------------------------------------------------- */}
      <SectionDivider variant="wave" color="slate" />

      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              How the{" "}
              <span className="text-warm font-medium">economics</span> compare
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Current remediation approaches are expensive, unscalable, and
              inconsistently documented.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Method
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Cost
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Scalability
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Availability
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Documentation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.pricingComparisons.map((row, index) => (
                    <tr
                      key={index}
                      className={cn(
                        "transition-colors",
                        row.highlight
                          ? "bg-warm/5 border-l-4 border-l-warm"
                          : "hover:bg-gray-50"
                      )}
                    >
                      <td
                        className={cn(
                          "px-6 py-4 text-sm font-medium",
                          row.highlight ? "text-warm" : "text-gray-900"
                        )}
                      >
                        {row.method}
                      </td>
                      <td
                        className={cn(
                          "px-6 py-4 text-sm font-mono",
                          row.highlight
                            ? "text-warm font-bold"
                            : "text-gray-700"
                        )}
                      >
                        {row.costRange}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.scalability}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.availability}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.documentation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {data.pricingComparisons.map((row, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl border p-5",
                  row.highlight
                    ? "bg-warm/5 border-warm/20"
                    : "bg-white border-gray-200"
                )}
              >
                <h3
                  className={cn(
                    "text-lg font-medium mb-3",
                    row.highlight ? "text-warm" : "text-gray-900"
                  )}
                >
                  {row.method}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cost</span>
                    <span
                      className={cn(
                        "font-mono",
                        row.highlight
                          ? "text-warm font-bold"
                          : "text-gray-700"
                      )}
                    >
                      {row.costRange}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scalability</span>
                    <span className="text-gray-700">{row.scalability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Availability</span>
                    <span className="text-gray-700">{row.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Documentation</span>
                    <span className="text-gray-700">{row.documentation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below comparison */}
          <div className="text-center mt-10">
            <Link href="/contact">
              <Button variant="gradient-primary" size="xl">
                Request a Pilot
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* FAQs                                                               */}
      {/* ----------------------------------------------------------------- */}
      {data.faqs && data.faqs.length > 0 && (
        <>
          <SectionDivider variant="diagonal-up" color="white" />

          <section className="px-6 py-12 md:py-16 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-navy mb-8">
                Frequently Asked{" "}
                <span className="text-warm font-medium">Questions</span>
              </h2>
              <div className="space-y-6">
                {data.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-6 pb-5 pt-2">
                        <p className="text-base text-gray-700 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Final CTA                                                          */}
      {/* ----------------------------------------------------------------- */}
      <SectionDivider variant="diagonal-down" color="indigo" />

      <section className="px-6 py-16 md:py-20 bg-gradient-to-br from-navy via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            {data.ctaHeadline}
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-blue-100">
            {data.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="warm-filled" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
