import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/feature-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { BrandIcon, type BrandIconName } from "@/components/brand-icon"
import { cn } from "@/lib/utils"
import { type Solution } from "@/lib/solutions"
import { getPostBySlug } from "@/lib/posts"

const valuePropBrandIcons: Array<BrandIconName | null> = [
  "sound-wave",
  "ribbon-check",
  "chart-pie-quarter",
  "chat-square-heart",
]

const stageAccent = {
  accent: "border-l-cs-electric",
  navy: "border-l-cs-navy",
  blue: "border-l-cs-dark-blue",
  "light-blue": "border-l-cs-light-blue",
}

const stageBadge = {
  accent: "bg-cs-electric text-cs-dark-blue",
  navy: "bg-cs-navy text-white",
  blue: "bg-cs-dark-blue text-white",
  "light-blue": "bg-cs-light-blue text-cs-dark-blue",
}

interface SolutionPageLayoutProps {
  solution: Solution
}

export function SolutionPageLayout({ solution }: SolutionPageLayoutProps) {
  const relatedPosts = (solution.relatedPostSlugs ?? [])
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)

  const faqJsonLd =
    solution.faqs && solution.faqs.length > 0
      ? {
          "@context": "https://schema.org" as const,
          "@type": "FAQPage" as const,
          mainEntity: solution.faqs.map((faq) => ({
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
            name: solution.metaTitle,
            description: solution.heroDescription,
            url: `https://clinicalsim.ai/solutions/${solution.slug}`,
            ...(solution.lastUpdated
              ? { dateModified: solution.lastUpdated }
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
                name: "Use Cases",
                item: "https://clinicalsim.ai/solutions",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: solution.title,
                item: `https://clinicalsim.ai/solutions/${solution.slug}`,
              },
            ],
          },
          ...(faqJsonLd ? [faqJsonLd] : []),
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 py-12 md:py-20">
        <div className="absolute inset-0 bg-cs-cloud -z-10" />

        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-cs-dark-gray mb-8">
            <Link href="/" className="hover:text-cs-dark-blue/85 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/solutions"
              className="hover:text-cs-dark-blue/85 transition-colors"
            >
              Use Cases
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-dark-blue/85">{solution.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                stageBadge[solution.colorVariant]
              )}
            >
              <BrandIcon
                name={solution.icon}
                color={
                  solution.colorVariant === "accent" ||
                  solution.colorVariant === "light-blue"
                    ? "dark"
                    : "white"
                }
                size={26}
              />
            </span>
            <p className="text-sm font-medium uppercase tracking-wider text-cs-dark-gray">
              {solution.shortTitle}
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-6">
            {solution.heroHeadline}
          </h1>

          {solution.lastUpdated && (
            <p className="text-sm text-cs-gray font-light mb-4">
              Last updated:{" "}
              {new Date(solution.lastUpdated).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed mb-8 max-w-3xl">
            {solution.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="/solutions">
              <Button variant="secondary" size="lg">
                See all use cases
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stages / progression arc */}
      {solution.stages && solution.stages.length > 0 && (
        <>
          <SectionDivider variant="diagonal-down" color="white" />

          <section className="px-6 py-12 md:py-16 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
                  {solution.stagesHeading ?? "The arc"}
                </h2>
                {solution.stagesIntro && (
                  <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
                    {solution.stagesIntro}
                  </p>
                )}
              </div>

              <div className="space-y-5">
                {solution.stages.map((stage, index) => (
                  <div
                    key={index}
                    className={cn(
                      "bg-white rounded-xl border border-cs-gray/50 border-l-4 p-6 md:p-7 hover:shadow-lg transition-all duration-300",
                      stageAccent[solution.colorVariant]
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <span
                        className={cn(
                          "inline-flex items-center self-start rounded-full px-3 py-1 text-sm font-medium",
                          stageBadge[solution.colorVariant]
                        )}
                      >
                        {stage.label}
                      </span>
                      <h3 className="text-xl font-medium text-cs-dark-blue">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* What you get */}
      {solution.valueProps && solution.valueProps.length > 0 && (
        <>
          <SectionDivider variant="wave" color="white" />

          <section className="px-6 py-12 md:py-16 bg-cs-cloud">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
                  One platform, <span className="text-cs-dark-blue font-medium">one rubric</span>
                </h2>
                <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
                  The same engine and dashboard that serve every other use case.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {solution.valueProps.map((prop, index) => {
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
        </>
      )}

      {/* FAQs */}
      {solution.faqs && solution.faqs.length > 0 && (
        <>
          <SectionDivider variant="diagonal-up" color="white" />

          <section className="px-6 py-12 md:py-16 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
                Frequently Asked{" "}
                <span className="text-cs-dark-blue font-medium">Questions</span>
              </h2>
              <div className="space-y-6">
                {solution.faqs.map((faq, index) => (
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

      {/* Related Insights */}
      {relatedPosts.length > 0 && (
        <>
          <SectionDivider variant="diagonal-down" color="white" />
          <section className="px-6 py-12 md:py-16 bg-cs-cloud">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light text-cs-dark-blue mb-8">
                Related Insights
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
                    <div className="mt-3 flex items-center text-cs-dark-blue text-sm font-medium">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            {solution.ctaHeadline}
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            {solution.ctaDescription}
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
                All Use Cases
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
