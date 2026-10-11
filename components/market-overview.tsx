import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BrandIcon } from "@/components/brand-icon"
import { FeedbackPreview } from "@/components/feedback-preview"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import {
  FORMATIVE_USE_LIMITATION,
  NO_OUTCOME_PREDICTION_LIMITATION,
  SP_SUPPLEMENT_LINE,
} from "@/lib/claim-discipline"
import type { MarketOverviewContent } from "@/lib/market-overviews"

interface MarketOverviewProps {
  content: MarketOverviewContent
  dateModified: string
}

const inlineLink =
  "inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-cs-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cs-dark-blue"

export function MarketOverview({ content, dateModified }: MarketOverviewProps) {
  const url = `https://clinicalsim.ai/${content.slug}`
  const isHealthSystem = content.slug === "health-systems"

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${content.title} | ClinicalSim.ai`,
            description: content.metaDescription,
            url,
            dateModified,
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
              { "@type": "ListItem", position: 2, name: content.title, item: url },
            ],
          },
        ]}
      />

      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-12 text-white md:py-20">
        <Waveform seed={content.slug} variant="bars" align="right" opacity={0.12} />
        <div className="relative mx-auto grid max-w-6xl min-w-0 gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div className="min-w-0">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-cs-electric">
              {content.title}
            </p>
            <h1 className="max-w-3xl text-3xl font-light leading-tight md:text-4xl lg:text-5xl">
              {content.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cs-cloud md:text-lg">
              {content.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/contact">Talk with us <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="inverse" size="lg">
                <Link href="/examples">See a conversation</Link>
              </Button>
            </div>
          </div>
          <FeedbackPreview compact dark />
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-4 md:grid-cols-2 md:gap-10">
            <h2 className="text-3xl font-light leading-tight md:text-4xl">{content.programsHeading}</h2>
            <p className="text-base leading-relaxed text-cs-dark-blue/80">
              {content.participants}
            </p>
          </div>
          <div className={`grid gap-5 md:grid-cols-2 ${isHealthSystem ? "lg:grid-cols-3" : ""}`}>
            {content.programs.map((program) => (
              <article id={program.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={program.title} className="flex min-w-0 scroll-mt-24 flex-col rounded-xl border border-cs-gray bg-white p-6">
                <BrandIcon name={program.icon} size={48} className="mb-5" />
                <h3 className="text-2xl font-medium">{program.title}</h3>
                <p className="mb-6 mt-3 text-base leading-relaxed text-cs-dark-blue/80">{program.description}</p>
                <ul className="mt-auto space-y-3">
                  {program.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={inlineLink}>
                        {link.label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-light md:text-4xl">Feedback for the person who practices, a view for the program</h2>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="mb-3 text-2xl font-medium">What participants receive</h3>
              <p className="mb-5 text-base leading-relaxed text-cs-dark-blue/80">{content.participantFeedback}</p>
              <Link href="/examples" className={inlineLink}>Read a complete feedback report <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div>
              <h3 className="mb-3 text-2xl font-medium">What leaders can review</h3>
              <p className="mb-5 text-base leading-relaxed text-cs-dark-blue/80">{content.leaderReporting}</p>
              <Link href="/help/roles-and-permissions" className={inlineLink}>Review roles and access <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="mt-8 border-t border-cs-gray pt-6 text-sm leading-relaxed text-cs-dark-blue/80">
            <p className="mb-3">Practice takes place in simulated conversations. ClinicalSim does not record or monitor real patient encounters.</p>
            <p>{FORMATIVE_USE_LIMITATION}</p>
            {isHealthSystem ? <p className="mt-3">{NO_OUTCOME_PREDICTION_LIMITATION}</p> : <p className="mt-3">{SP_SUPPLEMENT_LINE}</p>}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-light md:text-4xl">How we start together</h2>
          <p className="mb-8 mt-4 max-w-3xl text-base leading-relaxed text-cs-dark-blue/80">{content.startingPoint}</p>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="mb-3 text-xl font-medium">What your team brings</h3>
              <p className="text-base leading-relaxed text-cs-dark-blue/80">{content.institutionProvides}</p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-medium">What we&apos;ll work through with you</h3>
              <p className="text-base leading-relaxed text-cs-dark-blue/80">{content.clinicalSimProvides}</p>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-cs-gray p-6">
            <h3 className="mb-3 text-xl font-medium">What launching requires</h3>
            <p className="max-w-4xl text-base leading-relaxed text-cs-dark-blue/80">
              Participants need a browser and microphone on a phone, tablet, or desktop. Practice is audio only and currently supports English. Your IT team may need to allow the voice service; the connection test helps identify a blocked connection.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/evaluation" className={inlineLink}>Rollout and buying details <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/trust" className={inlineLink}>Data handling and product limits <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-medium">Questions for your role</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {content.roles.map((role) => <li key={role.href}><Link href={role.href} className={inlineLink}>{role.label}</Link></li>)}
            </ul>
          </div>
        </div>
      </section>

      <WaveformBand seed={`${content.slug}-contact`}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light md:text-4xl">Tell us what your team wants to practice</h2>
          <p className="mb-8 mt-4 text-base leading-relaxed text-cs-cloud">
            We&apos;ll show you a simulated conversation and its feedback, then discuss where it could fit your {isHealthSystem ? "team's training" : "program"}.
          </p>
          <Button asChild variant="accent" size="lg"><Link href="/contact">Talk with us <ArrowRight aria-hidden="true" /></Link></Button>
        </div>
      </WaveformBand>
    </>
  )
}
