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

const featureVariants: Array<"accent" | "navy" | "default"> = [
  "accent",
  "navy",
  "default",
  "accent",
  "default",
]

const colorVariantStyles = {
  accent: {
    border: "border-cs-electric/40",
    text: "text-cs-dark-blue",
    topBorder: "border-t-cs-electric",
    bg: "bg-cs-cloud",
  },
  navy: {
    border: "border-cs-navy/30",
    text: "text-cs-navy",
    topBorder: "border-t-cs-navy",
    bg: "bg-cs-cloud",
  },
  blue: {
    border: "border-cs-dark-blue/20",
    text: "text-cs-dark-blue",
    topBorder: "border-t-cs-dark-blue",
    bg: "bg-cs-cloud",
  },
  "light-blue": {
    border: "border-cs-light-blue/40",
    text: "text-cs-dark-blue",
    topBorder: "border-t-cs-light-blue",
    bg: "bg-cs-cloud",
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
        <div className="absolute inset-0 bg-cs-cloud -z-10" />

        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-cs-dark-gray mb-8">
            <Link
              href="/"
              className="hover:text-cs-dark-blue/85 transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/solutions"
              className="hover:text-cs-dark-blue/85 transition-colors"
            >
              Solutions
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-dark-blue/85">Communication Remediation</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-loose pb-3 mb-4">
            {data.heroH1}
          </h1>

          {data.lastUpdated && (
            <p className="text-sm text-cs-gray font-light mb-4">
              Last updated:{" "}
              {new Date(data.lastUpdated).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          <p className="text-lg md:text-xl text-cs-dark-blue/70 font-light leading-relaxed mb-10 max-w-3xl">
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
              <Button variant="accent" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="#evidence">
              <Button variant="secondary" size="lg">
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
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              Why communication{" "}
              <span className="text-cs-dark-blue font-medium">remediation</span> is
              broken
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.painPoints.map((point, index) => {
              const Icon = iconMap[point.icon]
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-cs-gray/50 p-6 hover:shadow-lg transition-all duration-300"
                >
                  {Icon && (
                    <div className="w-12 h-12 rounded-lg bg-cs-electric flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  )}
                  <div className="font-bold tracking-tight text-3xl font-bold text-cs-dark-blue mb-1">
                    {point.stat}
                  </div>
                  <p className="text-sm text-cs-dark-gray font-medium mb-3">
                    {point.statLabel}
                  </p>
                  <h3 className="text-xl font-medium text-cs-dark-blue mb-2">
                    {point.headline}
                  </h3>
                  <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-3">
                    {point.description}
                  </p>
                  <p className="text-xs text-cs-gray italic">{point.source}</p>
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

      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              How <span className="text-cs-dark-blue font-medium">ClinicalSim</span>{" "}
              works for remediation
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
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
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              Built for every stakeholder in the{" "}
              <span className="text-cs-dark-blue font-medium">remediation process</span>
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
                    "bg-white rounded-xl border p-6 hover:shadow-lg transition-all duration-300",
                    styles.border
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {Icon && (
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          persona.colorVariant === "accent" &&
                            "bg-cs-electric",
                          persona.colorVariant === "navy" && "bg-cs-navy",
                          persona.colorVariant === "blue" &&
                            "bg-cs-dark-blue",
                          persona.colorVariant === "light-blue" &&
                            "bg-cs-light-blue"
                        )}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <h3 className="text-xl font-medium text-cs-dark-blue">
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

                  <p className="text-sm text-cs-dark-blue/70 italic mb-4">
                    {persona.painPoint}
                  </p>

                  <p className="text-sm text-cs-dark-blue/85 font-light leading-relaxed">
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

      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              Built by the people who{" "}
              <span className="text-cs-dark-blue font-medium">do this work</span>
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
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
                    "bg-white rounded-xl border-t-4 border border-cs-gray/50 p-6 hover:shadow-lg transition-all duration-300",
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
                        className="flex items-start gap-2 text-sm text-cs-dark-blue/85 font-light"
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
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              Backed by{" "}
              <span className="text-cs-dark-blue font-medium">rigorous evidence</span>
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

      <section className="px-6 py-12 md:py-16 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              How the{" "}
              <span className="text-cs-dark-blue font-medium">economics</span> compare
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
              Current remediation approaches are expensive, unscalable, and
              inconsistently documented.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl border border-cs-gray/50 overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-cs-navy text-white">
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
                          ? "bg-cs-electric/5 border-l-4 border-l-cs-electric"
                          : "hover:bg-gray-50"
                      )}
                    >
                      <td
                        className={cn(
                          "px-6 py-4 text-sm font-medium",
                          row.highlight ? "text-cs-dark-blue" : "text-cs-dark-blue"
                        )}
                      >
                        {row.method}
                      </td>
                      <td
                        className={cn(
                          "px-6 py-4 text-sm font-bold tracking-tight",
                          row.highlight
                            ? "text-cs-dark-blue font-bold"
                            : "text-cs-dark-blue/85"
                        )}
                      >
                        {row.costRange}
                      </td>
                      <td className="px-6 py-4 text-sm text-cs-dark-blue/85">
                        {row.scalability}
                      </td>
                      <td className="px-6 py-4 text-sm text-cs-dark-blue/85">
                        {row.availability}
                      </td>
                      <td className="px-6 py-4 text-sm text-cs-dark-blue/85">
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
                    ? "bg-cs-electric/5 border-cs-electric/20"
                    : "bg-white border-cs-gray/50"
                )}
              >
                <h3
                  className={cn(
                    "text-lg font-medium mb-3",
                    row.highlight ? "text-cs-dark-blue" : "text-cs-dark-blue"
                  )}
                >
                  {row.method}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cs-dark-gray">Cost</span>
                    <span
                      className={cn(
                        "font-bold tracking-tight",
                        row.highlight
                          ? "text-cs-dark-blue font-bold"
                          : "text-cs-dark-blue/85"
                      )}
                    >
                      {row.costRange}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-dark-gray">Scalability</span>
                    <span className="text-cs-dark-blue/85">{row.scalability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-dark-gray">Availability</span>
                    <span className="text-cs-dark-blue/85">{row.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-dark-gray">Documentation</span>
                    <span className="text-cs-dark-blue/85">{row.documentation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below comparison */}
          <div className="text-center mt-10">
            <Link href="/contact">
              <Button variant="accent" size="xl">
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
              <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
                Frequently Asked{" "}
                <span className="text-cs-dark-blue font-medium">Questions</span>
              </h2>
              <div className="space-y-6">
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
        </>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Final CTA                                                          */}
      {/* ----------------------------------------------------------------- */}
      <SectionDivider variant="diagonal-down" color="indigo" />

      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            {data.ctaHeadline}
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            {data.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
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
