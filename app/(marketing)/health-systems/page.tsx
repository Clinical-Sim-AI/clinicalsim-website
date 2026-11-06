import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { ClaimBoundary } from "@/components/claim-boundary"
import { ContentSection } from "@/components/content-section"
import { JsonLd } from "@/components/json-ld"
import { ReferencesSection } from "@/components/references-section"
import { SectionDivider } from "@/components/section-divider"
import { Button } from "@/components/ui/button"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { COHORT_REPORT_PATH, COHORT_REPORT_SUMMARY } from "@/lib/cohort-report"
import {
  HEALTH_SYSTEMS_URL,
  conversationsSection,
  faqHeading,
  healthSystemsCitations,
  healthSystemsConversationGroups,
  healthSystemsCta,
  healthSystemsFaqs,
  healthSystemsNonEndorsementOrgs,
  healthSystemsPage,
  healthSystemsRolloutSteps,
  leadersSection,
  riskSection,
  rolloutHeading,
  rolloutSection,
  scoredSection,
  unionPrivacySection,
  worksWithSection,
} from "@/lib/health-systems"
import { buildHowToSchema, headingId } from "@/lib/howto-schema"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { PRIMARY_CTA } from "@/lib/positioning"
import { buildWebPageReviewFields } from "@/lib/review-schema"
import { formatIsoMonth } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Health system clinical communication training",
  description: healthSystemsPage.description,
  openGraph: {
    title: `${healthSystemsPage.title} | ClinicalSim.ai`,
    description: healthSystemsPage.description,
    url: HEALTH_SYSTEMS_URL,
  },
  twitter: {
    title: `${healthSystemsPage.title} | ClinicalSim.ai`,
    description: healthSystemsPage.description,
  },
  alternates: { canonical: HEALTH_SYSTEMS_URL },
}

const inlineLink =
  "inline-flex items-center gap-2 text-sm font-medium text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy"

export default function HealthSystemsPage() {
  const dateModified = PAGE_DATE_MODIFIED.healthSystems
  const howToJsonLd = buildHowToSchema({
    name: rolloutHeading,
    url: HEALTH_SYSTEMS_URL,
    steps: healthSystemsRolloutSteps,
  })

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${healthSystemsPage.title} | ClinicalSim.ai`,
            description: healthSystemsPage.description,
            url: HEALTH_SYSTEMS_URL,
            dateModified,
            ...buildWebPageReviewFields(undefined, healthSystemsCitations),
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
              { "@type": "ListItem", position: 1, name: "Home", item: "https://clinicalsim.ai" },
              { "@type": "ListItem", position: 2, name: healthSystemsPage.breadcrumbName, item: HEALTH_SYSTEMS_URL },
            ],
          },
          ...(howToJsonLd ? [howToJsonLd] : []),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: healthSystemsFaqs.map((faq) => ({
              "@type": "Question" as const,
              name: faq.question,
              acceptedAnswer: { "@type": "Answer" as const, text: faq.answer },
            })),
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-12 text-white md:py-16">
        <Waveform seed="health-systems" variant="bars" align="right" opacity={0.12} />
        <div className="relative z-10 mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-cs-cloud/70">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-white">{healthSystemsPage.breadcrumbName}</span>
          </nav>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-cs-electric">
            {healthSystemsPage.eyebrow}
          </p>
          <h1 className="mb-6 text-3xl font-light leading-[1.1] tracking-tight text-balance md:text-4xl lg:text-5xl">
            {healthSystemsPage.h1}
          </h1>
          <p className="mb-4 text-sm font-light text-cs-cloud/60">
            Last updated: {formatIsoMonth(dateModified)}
          </p>
          <p className="mb-8 max-w-3xl text-lg font-light leading-relaxed text-cs-cloud md:text-xl">
            {healthSystemsPage.subhead}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button asChild variant="accent" size="lg">
              <Link href={COHORT_REPORT_PATH}>
                {healthSystemsCta.leaderView} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="inverse" size="lg">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" className="bg-cs-dark-blue" />
      <ContentSection section={riskSection} />

      {/* Conversation grid: grouped so the homepage's #consent-and-disclosure and
          #team-communication anchors keep resolving. */}
      <section id={conversationsSection.id} className="scroll-mt-24 bg-cs-cloud px-6 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-light text-cs-navy md:text-4xl">{conversationsSection.heading}</h2>
          <p className="mb-10 max-w-3xl text-lg font-light leading-relaxed text-cs-dark-blue/70">
            {conversationsSection.intro}
          </p>
          <div className="space-y-12">
            {healthSystemsConversationGroups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-24">
                <h3 className="mb-5 text-2xl font-medium text-cs-dark-blue">{group.heading}</h3>
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.conversations.map((conversation) => (
                    <li
                      key={conversation.name}
                      id={headingId(conversation.name)}
                      className="flex min-w-0 scroll-mt-24 flex-col rounded-xl border border-cs-gray bg-white p-6"
                    >
                      <h4 className="text-lg font-medium text-cs-dark-blue">{conversation.name}</h4>
                      <p className="mt-3 text-sm text-cs-dark-gray">Scored against</p>
                      <p className="text-base font-light leading-relaxed text-cs-dark-blue/85">{conversation.framework}</p>
                      {conversation.cases.length > 0 && (
                        <>
                          <p className="mt-3 text-sm text-cs-dark-gray">Example cases</p>
                          <ul className="list-disc space-y-1 pl-5 text-base font-light leading-relaxed text-cs-dark-blue/85">
                            {conversation.cases.map((title) => (
                              <li key={title}>{title}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {conversation.link && (
                        <Link href={conversation.link.href} className={`${inlineLink} mt-auto pt-5`}>
                          {conversation.link.label}
                          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-base font-medium">
            <Link href={conversationsSection.catalog.href} className={inlineLink}>
              {conversationsSection.catalog.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <ContentSection section={scoredSection} />
      <ContentSection section={worksWithSection} className="bg-cs-cloud" />

      {/* What leaders can track: participant feedback first, then the cohort view and its proof. */}
      <section id={leadersSection.id} className="scroll-mt-24 bg-white px-6 py-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-light text-cs-navy md:text-4xl">{leadersSection.heading}</h2>
          <p className="mb-6 max-w-3xl text-lg font-light leading-relaxed text-cs-dark-blue/70">
            {leadersSection.intro}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-cs-gray/50 p-6">
              <h3 className="mb-3 text-lg font-medium text-cs-dark-blue">Available now</h3>
              <ul className="list-disc space-y-2 pl-5 text-base font-light leading-relaxed text-cs-dark-blue/85">
                {leadersSection.live.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-dashed border-cs-gray p-6">
              <h3 className="mb-3 text-lg font-medium text-cs-dark-blue">Coming</h3>
              <ul className="list-disc space-y-2 pl-5 text-base font-light leading-relaxed text-cs-dark-blue/85">
                {leadersSection.coming.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <figure className="mt-8 rounded-r-xl border-l-4 border-cs-navy bg-cs-cloud px-6 py-5">
            <h3 className="mb-3 text-lg font-medium text-cs-dark-blue">{leadersSection.proofHeading}</h3>
            <p className="text-base font-light leading-relaxed text-cs-dark-blue/85">
              {COHORT_REPORT_SUMMARY} {leadersSection.proofNote}
            </p>
            <Link href={COHORT_REPORT_PATH} className={`${inlineLink} mt-4`}>
              {healthSystemsCta.leaderView}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </figure>
        </div>
      </section>

      <ContentSection section={unionPrivacySection} className="bg-cs-cloud" />
      <ContentSection section={rolloutSection} />

      {/* FAQ */}
      <section id="questions" className="scroll-mt-24 bg-white px-6 py-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-light text-cs-navy md:text-4xl">{faqHeading}</h2>
          <div className="space-y-6">
            {healthSystemsFaqs.map((faq) => (
              <div key={faq.question} className="overflow-hidden rounded-xl border border-cs-gray/50">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between bg-white px-6 py-5 transition-colors hover:bg-gray-50">
                    <h3 className="pr-4 text-lg font-medium text-cs-dark-blue">{faq.question}</h3>
                    <ChevronRight className="h-5 w-5 flex-shrink-0 text-cs-gray transition-transform group-open:rotate-90" aria-hidden="true" />
                  </summary>
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-base font-light leading-relaxed text-cs-dark-blue/85">{faq.answer}</p>
                    {faq.link && (
                      <Link href={faq.link.href} className={`${inlineLink} mt-4`}>
                        {faq.link.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-4">
        <div className="mx-auto max-w-4xl">
          <ReferencesSection references={healthSystemsCitations} />
        </div>
      </section>

      <ClaimBoundary
        nonEndorsementOrgs={healthSystemsNonEndorsementOrgs}
        showFormative
        showRaterValidation
        showOutcomePredictionLimit
        showEmploymentUseLimit
      />

      <WaveformBand seed="health-systems-contact">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light md:text-4xl">{healthSystemsCta.closingHeading}</h2>
          <p className="mb-8 mt-4 text-base leading-relaxed text-cs-cloud">{healthSystemsCta.closingBody}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Button asChild variant="accent" size="lg">
              <Link href={COHORT_REPORT_PATH}>
                {healthSystemsCta.leaderView} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="inverse" size="lg">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
