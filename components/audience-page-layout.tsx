import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatHighlight } from "@/components/stat-highlight"
import { FeatureCard } from "@/components/feature-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { type Audience } from "@/lib/audiences"
import { getPostBySlug } from "@/lib/posts"
import {
  Target,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react"

const valuePropIcons = [Target, Shield, TrendingUp, Zap]

interface AudiencePageLayoutProps {
  audience: Audience
}

export function AudiencePageLayout({ audience }: AudiencePageLayoutProps) {
  const relatedPosts = audience.relatedPostSlugs
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)

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
        ]}
      />
      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 -z-10" />

        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/audiences" className="hover:text-gray-700 transition-colors">
              Who We Serve
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700">{audience.title}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light shimmer leading-loose pb-3 mb-6">
            {audience.heroHeadline}
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-4">
            For <span className="text-warm font-medium">{audience.title.toLowerCase()}</span> who need results they can measure.
          </p>

          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-8 max-w-3xl">
            {audience.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="gradient-primary" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <p className="text-sm text-gray-500 font-light self-center">
              Or{" "}
              <Link href="https://form.typeform.com/to/Zve4CKk2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-warm transition-colors">
                join the waitlist
              </Link>
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Pain Points - "What's at stake" */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              What&apos;s at <span className="text-warm font-medium">stake</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {audience.painPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white/70 rounded-xl p-6 md:p-8 border border-gray-200 border-glow-hover transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-3">
                  {point.headline}
                </h3>
                <p className="text-base text-gray-600 font-light leading-relaxed mb-4">
                  {point.description}
                </p>
                {point.stat && (
                  <div className="flex items-baseline gap-2 pt-3 border-t border-gray-100">
                    <span className="font-mono font-bold text-2xl text-warm">
                      {point.stat}
                    </span>
                    {point.statSource && (
                      <span className="text-sm text-gray-500 font-light">
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

      <SectionDivider variant="wave" color="slate" />

      {/* Key Stats */}
      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              The <span className="text-warm font-medium">numbers</span>
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
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              How ClinicalSim <span className="text-warm font-medium">helps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {audience.valueProps.map((prop, index) => (
              <FeatureCard
                key={index}
                icon={valuePropIcons[index % valuePropIcons.length]}
                title={prop.title}
                description={prop.description}
                variant={index === 0 ? "warm" : "default"}
                expandOnHover
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="blue" />

      {/* Practice Tool CTA — Program Directors only */}
      {audience.slug === "program-directors" && (
        <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-warm/20 border-glow-hover transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-warm uppercase tracking-wider mb-2">
                    Free Early Access
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light text-navy mb-2">
                    Practice the conversation before you have it
                  </h3>
                  <p className="text-base text-gray-600 font-light max-w-xl">
                    Try remediation conversations yourself with our AI simulation — experience the feedback, the milestone-aligned assessment, and the documentation firsthand.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link href="/practice">
                    <Button variant="warm-filled" size="lg">
                      Try It Yourself
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Communication Remediation CTA — all other audiences */}
      {audience.slug !== "program-directors" && (
        <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              Communication <span className="text-warm font-medium">remediation</span>
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto mb-8">
              Learn how ClinicalSim provides structured, milestone-aligned practice for communication remediation — with CCC-ready documentation from every session.
            </p>
            <Link href="/solutions/remediation">
              <Button variant="warm-accent" size="lg">
                Learn about Communication Remediation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Related Insights */}
      {relatedPosts.length > 0 && (
        <section className="px-6 py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-8">
              Related Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post!.slug}
                  href={`/insights/${post!.slug}`}
                  className="group block bg-white/70 rounded-xl p-6 border border-gray-200 hover:border-warm/30 transition-all duration-300 border-glow-hover"
                >
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-navy transition-colors mb-2">
                    {post!.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light line-clamp-2">
                    {post!.description}
                  </p>
                  <div className="mt-3 flex items-center text-blue-600 text-sm font-medium group-hover:text-warm transition-colors">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-gradient-to-br from-navy via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-pretty">
            {audience.ctaHeadline}
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-blue-100">
            {audience.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="warm-filled" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="/audiences">
              <Button variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Audiences
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
