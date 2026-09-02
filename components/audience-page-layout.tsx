import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatHighlight } from "@/components/stat-highlight"
import { FeatureCard } from "@/components/feature-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { GlossaryTermLinks } from "@/components/glossary-term-links"
import { type Audience } from "@/lib/audiences"
import { getPostBySlug } from "@/lib/posts"
import { getSolutionBySlug } from "@/lib/solutions"
import { BrandIcon, type BrandIconName } from "@/components/brand-icon"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { heroBadge, heroBadgeIconColor } from "@/lib/color-variants"
import { cn, formatIsoMonth } from "@/lib/utils"

const valuePropBrandIcons: Array<BrandIconName | null> = [
  "ribbon-check",
  "badge-check",
  null,
  "star-raising",
]

interface AudiencePageLayoutProps {
  audience: Audience
}

export function AudiencePageLayout({ audience }: AudiencePageLayoutProps) {
  const relatedPosts = audience.relatedPostSlugs
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)

  // The audience's primary use case, if it maps to a real solution page.
  // Falls back to the remediation solution to preserve existing behavior.
  const primarySolution =
    audience.relevantSolutionSlugs
      .map((slug) => getSolutionBySlug(slug))
      .find(Boolean) ?? getSolutionBySlug("remediation")!

  // The `as const` assertions are load-bearing: without them schema-dts widens
  // "@type" to string and WithContext<Thing> fails to typecheck.
  const faqJsonLd =
    audience.faqs && audience.faqs.length > 0
      ? {
          "@context": "https://schema.org" as const,
          "@type": "FAQPage" as const,
          mainEntity: audience.faqs.map((faq) => ({
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
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `ClinicalSim.ai for ${audience.title}`,
            description: audience.heroDescription,
            url: `https://clinicalsim.ai/audiences/${audience.slug}`,
            ...(audience.lastUpdated
              ? { dateModified: audience.lastUpdated }
              : {}),
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
                name: "Who We Serve",
                item: "https://clinicalsim.ai/audiences",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: audience.title,
                item: `https://clinicalsim.ai/audiences/${audience.slug}`,
              },
            ],
          },
          ...(faqJsonLd ? [faqJsonLd] : []),
        ]}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-12 md:py-16 bg-cs-dark-blue text-white">
        <Waveform seed={audience.slug} align="right" opacity={0.15} />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-cs-cloud/70 mb-8">
            <Link href="/audiences" className="hover:text-white transition-colors">
              Who We Serve
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{audience.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-white/15",
                heroBadge[audience.colorVariant]
              )}
            >
              <BrandIcon
                name={audience.icon}
                color={heroBadgeIconColor(audience.colorVariant)}
                size={26}
              />
            </span>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-electric">
              {audience.shortTitle}
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-balance mb-6 text-white">
            {audience.heroHeadline}
          </h1>

          {audience.lastUpdated && (
            <p className="text-sm text-cs-cloud/60 font-light mb-4">
              Last updated:{" "}
              {formatIsoMonth(audience.lastUpdated)}
            </p>
          )}

          <p className="text-base md:text-lg text-cs-cloud font-light leading-relaxed mb-8 max-w-3xl">
            {audience.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Start with an assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider
        variant="diagonal-down"
        color="white"
        className="bg-cs-dark-blue"
      />

      {/* Pain Points - "What's at stake" */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              What&apos;s at <span className="text-cs-dark-blue font-medium">stake</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {audience.painPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white/70 rounded-xl p-6 md:p-8 border border-cs-gray/50 transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-medium text-cs-dark-blue mb-3">
                  {point.headline}
                </h3>
                <p className="text-base text-cs-dark-blue/70 font-light leading-relaxed mb-4">
                  {point.description}
                </p>
                {point.stat && (
                  <div className="flex items-baseline gap-2 pt-3 border-t border-cs-gray/30">
                    <span className="font-bold tracking-tight text-2xl text-cs-dark-blue">
                      {point.stat}
                    </span>
                    {point.statSource && (
                      <span className="text-sm text-cs-dark-gray font-light">
                        {point.statSource}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* Key Stats */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              The <span className="text-cs-dark-blue font-medium">numbers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {audience.stats.map((stat, index) => (
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

      <SectionDivider variant="diagonal-up" color="white" />

      {/* Value Propositions */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-dark-blue mb-4">
              How ClinicalSim <span className="text-cs-dark-blue font-medium">helps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {audience.valueProps.map((prop, index) => {
              const slot = index % valuePropBrandIcons.length
              const brandIcon = valuePropBrandIcons[slot]
              return (
                <FeatureCard
                  key={index}
                  icon={brandIcon ? undefined : TrendingUp}
                  brandIcon={brandIcon ?? undefined}
                  title={prop.title}
                  description={prop.description}
                  variant={index === 0 ? "accent" : "default"}
                  expandOnHover
                />
              )
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="cloud" />

      {/* Practice tool CTA for program directors only */}
      {audience.slug === "program-directors" && (
        <section className="px-6 pt-8 md:pt-10 pb-4 md:pb-6 bg-cs-cloud">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-cs-electric/20 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-cs-dark-blue uppercase tracking-wider mb-2">
                    Example feedback
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light text-cs-navy mb-2">
                    Review an unedited encounter
                  </h3>
                  <p className="text-base text-cs-dark-blue/70 font-light max-w-xl">
                    Open the recording, transcript, and framework-based feedback without signing in or booking a demo.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button variant="accent" size="lg" asChild>
                    <Link href="/examples">
                      See example feedback
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Primary use-case CTA for all other audiences */}
      {audience.slug !== "program-directors" && (
        <section className="px-6 pt-8 md:pt-10 pb-4 md:pb-6 bg-cs-cloud">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              {primarySolution.title}
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto mb-8">
              {primarySolution.heroDescription}
            </p>
            <Link href={`/solutions/${primarySolution.slug}`}>
              <Button variant="secondary" size="lg">
                Learn about {primarySolution.shortTitle}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Related insights */}
      {relatedPosts.length > 0 && (
        <section className="px-6 py-8 md:py-10 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-cs-dark-blue mb-8">
              Related insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post!.slug}
                  href={`/insights/${post!.slug}`}
                  className="group block bg-white/70 rounded-xl p-6 border border-cs-gray/50 hover:border-cs-electric/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-medium text-cs-dark-blue group-hover:text-cs-navy transition-colors mb-2">
                    {post!.title}
                  </h3>
                  <p className="text-sm text-cs-dark-blue/70 font-light line-clamp-2">
                    {post!.description}
                  </p>
                  <div className="mt-3 flex items-center text-cs-dark-blue text-sm font-medium group-hover:text-cs-dark-blue transition-colors">
                    Read more
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {audience.faqs && audience.faqs.length > 0 && (
        <>
          <SectionDivider variant="wave" color="cloud" />
          <section className="px-6 py-8 md:py-10 bg-cs-cloud">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
                Questions we get{" "}
                <span className="text-cs-dark-blue font-medium">from this seat</span>
              </h2>
              <div className="space-y-6">
                {audience.faqs.map((faq, index) => (
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

      <GlossaryTermLinks slugs={audience.glossarySlugs} />

      {/* Final CTA */}
      <WaveformBand seed={audience.slug}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            {audience.ctaHeadline}
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            {audience.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Start with an assessment
              </Button>
            </Link>
            <Link href="/audiences">
              <Button variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All audiences
              </Button>
            </Link>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
