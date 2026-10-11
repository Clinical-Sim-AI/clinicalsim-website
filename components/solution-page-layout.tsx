import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/feature-card"
import { SectionDivider } from "@/components/section-divider"
import { Waveform } from "@/components/waveform"
import { JsonLd } from "@/components/json-ld"
import { GlossaryTermLinks } from "@/components/glossary-term-links"
import { ClaimBoundary } from "@/components/claim-boundary"
import { BrandIcon, type BrandIconName } from "@/components/brand-icon"
import { WaveformBand } from "@/components/waveform-band"
import { heroBadge, heroBadgeIconColor } from "@/lib/color-variants"
import { cn, formatIsoMonth } from "@/lib/utils"
import { type Solution, type SolutionStage } from "@/lib/solutions"
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

function StageCard({
  stage,
  colorVariant,
}: {
  stage: SolutionStage
  colorVariant: Solution["colorVariant"]
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-cs-gray/50 border-l-4 p-6 md:p-7 hover:shadow-lg transition-all duration-300",
        stageAccent[colorVariant]
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
        {stage.label && (
          <span
            className={cn(
              "inline-flex items-center self-start rounded-full px-3 py-1 text-sm font-medium",
              stageBadge[colorVariant]
            )}
          >
            {stage.label}
          </span>
        )}
        <h3 className="text-xl font-medium text-cs-dark-blue">
          {stage.title}
        </h3>
      </div>
      <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
        {stage.description}
      </p>
    </div>
  )
}

export function SolutionPageLayout({ solution }: SolutionPageLayoutProps) {
  const relatedPosts = (solution.relatedPostSlugs ?? [])
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)

  /**
   * SectionDivider paints a filled wedge over a transparent ground, and the
   * marketing layout behind it is white. Under the dark hero the wedge's
   * negative space would show white and eat the band's bottom edge, so
   * whichever optional block renders first has to carry the hero's color.
   */
  const optionalBlocks = {
    context: (solution.context?.paragraphs.length ?? 0) > 0,
    stages: (solution.stages?.length ?? 0) > 0,
    stageGroups: (solution.stageGroups?.length ?? 0) > 0,
    valueProps: (solution.valueProps?.length ?? 0) > 0,
    frameworks: (solution.frameworks?.length ?? 0) > 0,
    faqs: (solution.faqs?.length ?? 0) > 0,
    relatedPosts: relatedPosts.length > 0,
  }
  const blockOrder = Object.keys(optionalBlocks) as Array<keyof typeof optionalBlocks>
  const underHero = (block: keyof typeof optionalBlocks) =>
    blockOrder.slice(0, blockOrder.indexOf(block)).some((key) => optionalBlocks[key])
      ? undefined
      : "bg-cs-dark-blue"

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
      <section className="relative overflow-hidden px-6 py-12 md:py-16 bg-cs-dark-blue text-white">
        <Waveform seed={solution.slug} align="right" opacity={0.15} />

        <div className="max-w-4xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-cs-cloud/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/solutions"
              className="hover:text-white transition-colors"
            >
              Use Cases
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{solution.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-white/15",
                heroBadge[solution.colorVariant]
              )}
            >
              <BrandIcon
                name={solution.icon}
                color={heroBadgeIconColor(solution.colorVariant)}
                size={26}
              />
            </span>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-electric">
              {solution.shortTitle}
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-balance mb-6 text-white">
            {solution.heroHeadline}
          </h1>

          {solution.lastUpdated && (
            <p className="text-sm text-cs-cloud/60 font-light mb-4">
              Last updated:{" "}
              {formatIsoMonth(solution.lastUpdated)}
            </p>
          )}

          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed mb-8 max-w-3xl">
            {solution.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Talk with us
              </Button>
            </Link>
            <Link href="/solutions">
              <Button variant="inverse" size="lg">
                See all use cases
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Context */}
      {optionalBlocks.context && solution.context && (
        <>
          <SectionDivider variant="diagonal-down" color="white" className={underHero("context")} />

          <section className="px-6 py-8 md:py-10 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
                {solution.context.heading}
              </h2>
              <div className="space-y-5">
                {solution.context.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-cs-dark-blue/85 font-light leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Stages / progression arc */}
      {solution.stages && solution.stages.length > 0 && (
        <>
          <SectionDivider variant="diagonal-down" color="white" className={underHero("stages")} />

          <section className="px-6 py-8 md:py-10 bg-white">
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
                  <StageCard
                    key={index}
                    stage={stage}
                    colorVariant={solution.colorVariant}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Headed stage groups, for pages that speak to more than one group */}
      {solution.stageGroups && solution.stageGroups.length > 0 && (
        <>
          <SectionDivider variant="diagonal-down" color="white" className={underHero("stageGroups")} />

          <section className="px-6 py-8 md:py-10 bg-white">
            <div className="max-w-4xl mx-auto space-y-14">
              {solution.stageGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
                      {group.heading}
                    </h2>
                    {group.intro && (
                      <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
                        {group.intro}
                      </p>
                    )}
                  </div>
                  <div className="space-y-5">
                    {group.stages.map((stage, index) => (
                      <StageCard
                        key={index}
                        stage={stage}
                        colorVariant={solution.colorVariant}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* What you get */}
      {solution.valueProps && solution.valueProps.length > 0 && (
        <>
          <SectionDivider variant="wave" color="white" className={underHero("valueProps")} />

          <section className="px-6 py-8 md:py-10 bg-cs-cloud">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
                  {solution.valuePropsHeading ?? "Practice for participants, reporting for programs"}
                </h2>
                <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
                  Participants get feedback they can use on the next attempt, while programs review agreed individual or cohort views.
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

      {/* Frameworks this lane scores against */}
      {solution.frameworks && solution.frameworks.length > 0 && (
        <>
          <SectionDivider variant="diagonal-up" color="white" className={underHero("frameworks")} />

          <section className="px-6 py-8 md:py-10 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
                The frameworks behind the score
              </h2>
              <p className="text-lg text-cs-dark-blue/70 font-light mb-8 max-w-2xl">
                {solution.frameworksIntro ??
                  "Each AI patient case names the published framework or institution-defined standard used for feedback. The report shows strengths and areas for practice, with the participant's own words behind each score."}
              </p>

              <div className="space-y-4">
                {solution.frameworks.map((framework, index) => (
                  <div
                    key={index}
                    className="border border-cs-gray/50 rounded-xl px-6 py-5"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-lg font-medium text-cs-dark-blue">
                        {framework.name}
                      </h3>
                      <span className="text-sm text-cs-dark-gray font-light">
                        {framework.owner}
                      </span>
                    </div>
                    <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                      {framework.note}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-base text-cs-dark-blue font-light">
                <Link
                  href="/frameworks"
                  className="underline underline-offset-4 hover:text-cs-navy transition-colors"
                >
                  How scoring against a framework works, including the scope rule
                </Link>
              </p>
            </div>
          </section>
        </>
      )}

      {/* FAQs */}
      {solution.faqs && solution.faqs.length > 0 && (
        <>
          <SectionDivider variant="diagonal-up" color="white" className={underHero("faqs")} />

          <section className="px-6 py-8 md:py-10 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
                Frequently asked questions
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

      {/* Related insights */}
      {relatedPosts.length > 0 && (
        <>
          <SectionDivider variant="diagonal-down" color="white" className={underHero("relatedPosts")} />
          <section className="px-6 py-8 md:py-10 bg-cs-cloud">
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
                    <div className="mt-3 flex items-center text-cs-dark-blue text-sm font-medium">
                      Read more
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <GlossaryTermLinks slugs={solution.glossarySlugs} />

      {!solution.omitClaimBoundary && (
        <ClaimBoundary
          nonEndorsementOrgs={solution.nonEndorsementOrgs}
          showFormative={solution.claimBoundary?.formative}
          showRaterValidation={solution.claimBoundary?.raterValidation}
          showOutcomePredictionLimit={
            solution.claimBoundary?.noOutcomePrediction
          }
          showEmploymentUseLimit={solution.claimBoundary?.noEmploymentUse}
          note={solution.claimBoundary?.note}
        />
      )}

      {/* Final CTA */}
      <WaveformBand seed={solution.slug}>
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
                Talk with us
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All use cases
              </Button>
            </Link>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
