import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatHighlight } from "@/components/stat-highlight"
import { FeatureCard } from "@/components/feature-card"
import { EvidenceShowcase } from "@/components/evidence-showcase"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { type Solution } from "@/lib/solutions"
import { getPostBySlug } from "@/lib/posts"
import {
  Mic,
  BarChart3,
  Users,
  Clock,
} from "lucide-react"

const benefitIcons = [Mic, BarChart3, Users, Clock]

interface SolutionPageLayoutProps {
  solution: Solution
  children?: React.ReactNode
}

export function SolutionPageLayout({ solution, children }: SolutionPageLayoutProps) {
  const relatedPosts = solution.relatedPostSlugs
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)

  const faqJsonLd = solution.faqs && solution.faqs.length > 0 ? {
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
  } : null

  return (
    <>
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
                name: solution.shortTitle,
                item: `https://clinicalsim.ai/solutions/${solution.slug}`,
              },
            ],
          },
          ...(faqJsonLd ? [faqJsonLd] : []),
        ]}
      />
      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 -z-10" />

        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/solutions" className="hover:text-gray-700 transition-colors">
              Solutions
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700">{solution.shortTitle}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light shimmer leading-loose pb-3 mb-4">
            {solution.title}
          </h1>

          {solution.lastUpdated && (
            <p className="text-sm text-gray-400 font-light mb-4">
              Last updated: {new Date(solution.lastUpdated).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          )}

          <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-4">
            <span className="text-warm font-medium">{solution.heroSubtitle}</span>
          </p>

          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-8 max-w-3xl">
            {solution.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="gradient-primary" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="/solutions/remediation">
              <Button variant="warm-accent" size="lg">
                Communication Remediation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Revenue Opportunity */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              The <span className="text-warm font-medium">opportunity</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {solution.revenueStats.map((stat, index) => (
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

      {/* CPT Code Table (if applicable) */}
      {solution.cptCodes && solution.cptCodes.length > 0 && (
        <section className="px-6 pb-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/90 to-blue-50/90 rounded-2xl border border-blue-200 overflow-hidden">
              <div className="px-6 py-4 bg-navy">
                <h3 className="text-lg font-medium text-white">Billing Codes</h3>
              </div>
              <div className="divide-y divide-blue-100">
                {solution.cptCodes.map((cpt) => (
                  <div key={cpt.code} className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <div className="flex-shrink-0">
                      <span className="font-mono font-bold text-lg text-navy">CPT {cpt.code}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{cpt.description}</p>
                      {cpt.notes && (
                        <p className="text-sm text-gray-500 mt-1">{cpt.notes}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <span className="font-mono font-bold text-xl text-warm">{cpt.reimbursement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Do the Math — Revenue Projections */}
      <section className="px-6 pb-12 md:pb-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-navy mb-8">
            {solution.revenueProjection.sectionHeading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Per-provider projection */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-warm/20 p-8 text-center">
              <div className="font-mono font-bold text-4xl md:text-5xl text-warm mb-3">
                {solution.revenueProjection.perProvider.value}
              </div>
              <p className="text-lg text-gray-700 font-medium mb-4">
                {solution.revenueProjection.perProvider.label}
              </p>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {solution.revenueProjection.perProvider.assumption}
              </p>
            </div>

            {/* Per-institution projection */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-navy/20 p-8 text-center">
              <div className="font-mono font-bold text-4xl md:text-5xl text-navy mb-3">
                {solution.revenueProjection.perInstitution.value}
              </div>
              <p className="text-lg text-gray-700 font-medium mb-4">
                {solution.revenueProjection.perInstitution.label}
              </p>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {solution.revenueProjection.perInstitution.assumption}
              </p>
            </div>
          </div>

          {solution.revenueProjection.source && (
            <p className="text-xs text-gray-400 font-light mt-4 text-center italic">
              {solution.revenueProjection.source}
            </p>
          )}
        </div>
      </section>

      <SectionDivider variant="wave" color="slate" />

      {/* The Training Gap */}
      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
            {solution.trainingGapHeadline}
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
            {solution.trainingGapDescription}
          </p>
          <ul className="space-y-4">
            {solution.trainingGapBullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-warm mt-2.5 flex-shrink-0" />
                <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed">
                  {bullet}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Remediation Callout */}
      {solution.remediationCallout && (
        <section className="px-6 py-8 bg-warm/5">
          <div className="max-w-4xl mx-auto">
            <div className="border-l-4 border-warm pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How this connects to communication remediation
              </h3>
              <p className="text-base text-gray-700 font-light leading-relaxed">
                {solution.remediationCallout}
              </p>
              <Link
                href="/solutions/remediation"
                className="inline-flex items-center text-warm font-medium mt-3 hover:text-orange-600 transition-colors text-sm"
              >
                Learn about our remediation toolkit
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <SectionDivider variant="diagonal-up" color="white" />

      {/* Why Simulation Works */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Why <span className="text-warm font-medium">simulation</span> works
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Practice builds confidence, and confident providers have better conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {solution.simulationBenefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                icon={benefitIcons[index % benefitIcons.length]}
                title={benefit.title}
                description={benefit.description}
                variant={index === 0 ? "warm" : "default"}
                asymmetric
                expandOnHover
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="blue" />

      {/* Clinical Evidence */}
      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              The <span className="text-warm font-medium">evidence</span>
            </h2>
          </div>

          <EvidenceShowcase
            studyTitle={solution.evidence.studyTitle}
            journal={solution.evidence.journal}
            year={solution.evidence.year}
            summary={solution.evidence.summary}
            link={solution.evidence.link}
            badges={solution.evidence.badges}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {solution.outcomeStats.map((stat, index) => (
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

      {/* FAQ Section */}
      {solution.faqs && solution.faqs.length > 0 && (
        <section className="px-6 py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-8">
              Frequently Asked <span className="text-warm font-medium">Questions</span>
            </h2>
            <div className="space-y-6">
              {solution.faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-base text-gray-700 font-light leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Children slot for page-specific content */}
      {children}

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            {solution.ctaHeadline}
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-blue-100">
            {solution.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="warm-filled" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="/solutions">
              <Button variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
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
