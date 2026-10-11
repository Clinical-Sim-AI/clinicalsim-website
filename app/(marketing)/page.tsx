import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BrandIcon } from "@/components/brand-icon"
import { FeedbackPreview } from "@/components/feedback-preview"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { HOMEPAGE_PUBLIC_COPY, HOMEPAGE_SEO } from "@/lib/homepage-content"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"

export const metadata: Metadata = {
  title: HOMEPAGE_SEO.title,
  description: HOMEPAGE_SEO.description,
  openGraph: {
    title: HOMEPAGE_SEO.title,
    description: HOMEPAGE_SEO.description,
    url: "https://clinicalsim.ai",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ClinicalSim, spoken practice with AI patients" }],
  },
  twitter: { title: HOMEPAGE_SEO.title, description: HOMEPAGE_SEO.description, images: ["/og-image.png"] },
  alternates: { canonical: "https://clinicalsim.ai" },
}

const priorities = [
  { title: "Patient experience", body: "Practice listening, explanation, and respect against the service standard your institution already teaches.", href: "/solutions/patient-experience", icon: "chat-square-heart" as const },
  { title: "Consent and disclosure", body: "Rehearse informed consent and error disclosure before the conversation with a patient or family.", href: "/health-systems#consent-and-disclosure", icon: "badge-check" as const },
  { title: "Team communication", body: "Practice debriefing, feedback, and conversations between managers and staff against your own framework.", href: "/health-systems#team-communication", icon: "people-connected" as const },
]

export default function HomePage() {
  const copy = HOMEPAGE_PUBLIC_COPY
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "WebPage", name: HOMEPAGE_SEO.title, description: HOMEPAGE_SEO.description, url: "https://clinicalsim.ai", dateModified: PAGE_DATE_MODIFIED.home, isPartOf: { "@type": "WebSite", name: "ClinicalSim.ai", url: "https://clinicalsim.ai" } },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://clinicalsim.ai" }] },
      ]} />

      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-14 text-white md:py-20">
        <div className="relative isolate mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          {/* Anchor the wave to the first grid column and extend through the gap to the feedback card. */}
          <Waveform seed="home-hero-flow" variant="flow" align="right" opacity={0.2} className="-z-10 hidden lg:col-start-1 lg:col-end-2 lg:block lg:left-[min(-1.5rem,calc((72rem_-_100vw)/2))] lg:right-auto lg:-top-20 lg:bottom-auto lg:h-[calc(100%_+_10rem)] lg:w-[calc(100%_+_4rem_+_max(1.5rem,calc((100vw_-_72rem)/2)))]" />
          <div className="min-w-0">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.14em] text-cs-electric md:text-sm">{copy.hero.eyebrow}</p>
            <h1 className="max-w-2xl text-balance text-4xl font-light leading-[1.12] tracking-tight md:text-5xl lg:text-[3.5rem]">{copy.hero.headline}</h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-cs-cloud">{copy.hero.body}</p>
            <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="accent" size="lg" asChild><Link href="/contact" className="h-auto min-h-12 whitespace-normal py-3 text-center">{copy.hero.primaryCta}<ArrowRight className="shrink-0" /></Link></Button>
              <Button variant="inverse" size="lg" asChild><Link href="/examples" className="h-auto min-h-12 whitespace-normal py-3 text-center">{copy.hero.secondaryCta}</Link></Button>
            </div>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-cs-cloud/80">{copy.hero.pilot}</p>
          </div>
          <FeedbackPreview compact dark />
        </div>
      </section>

      <section aria-label="Choose your setting" className="bg-cs-cloud px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Link href="/health-systems" className="group min-w-0 rounded-2xl border border-cs-gray/60 bg-white p-7 transition-colors hover:border-cs-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cs-navy md:p-9">
            <BrandIcon name="hospital" size={36} className="mb-5" />
            <h2 className="flex items-center justify-between gap-4 text-2xl font-medium text-cs-dark-blue">Health systems<ArrowRight className="h-5 w-5 shrink-0" /></h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-cs-dark-blue/80">{copy.buyers.healthSystemBody}</p>
          </Link>
          <Link href="/medical-education" className="group min-w-0 rounded-2xl border border-cs-gray/60 bg-white p-7 transition-colors hover:border-cs-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cs-navy md:p-9">
            <BrandIcon name="hat-graduation" size={36} className="mb-5" />
            <h2 className="flex items-center justify-between gap-4 text-2xl font-medium text-cs-dark-blue">Medical education<ArrowRight className="h-5 w-5 shrink-0" /></h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-cs-dark-blue/80">{copy.buyers.medicalEducationBody}</p>
          </Link>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl text-3xl font-light text-cs-dark-blue md:text-4xl">Useful feedback for each person. A clearer view for the program.</h2>
          <div className="mt-9 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <p className="mb-5 text-lg leading-relaxed text-cs-dark-blue/80">Participants see what they did well and what to practice next. Every score points to their own words in the simulated conversation.</p>
              <FeedbackPreview focus="next" headingLevel={3} />
            </div>
            <div className="min-w-0 rounded-xl bg-cs-cloud p-7 md:p-9">
              <h3 className="text-2xl font-medium text-cs-dark-blue">What leaders can review</h3>
              <p className="mt-4 leading-relaxed text-cs-dark-blue/80">Patterns across a cohort or anonymous unit, scored against the standard your team already teaches. Use that review to choose the next round of practice.</p>
              <div className="mt-6 border-t border-cs-gray pt-6">
                <p className="text-sm font-medium text-cs-navy">What one health system learned</p>
                <p className="mt-3 leading-relaxed text-cs-dark-blue/80">{copy.howItStarts.example}</p>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-cs-dark-blue/70">These are findings from simulated practice. Formative scores stay out of personnel files.</p>
              <Link href="/clinical-communication-intelligence" className="mt-6 inline-flex items-center gap-2 font-medium text-cs-dark-blue underline underline-offset-4">See how it works<ArrowRight className="h-4 w-4 shrink-0" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cs-cloud px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-cs-dark-blue md:text-4xl">Start with a conversation your institution cares about</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {priorities.map((priority) => (
              <Link key={priority.title} href={priority.href} className="min-w-0 rounded-xl border border-cs-gray/60 bg-white p-7 transition-colors hover:border-cs-navy">
                <BrandIcon name={priority.icon} size={32} className="mb-5" />
                <h3 className="text-xl font-medium text-cs-dark-blue">{priority.title}</h3>
                <p className="mt-3 leading-relaxed text-cs-dark-blue/80">{priority.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cs-navy">Explore this priority<ArrowRight className="h-4 w-4 shrink-0" /></span>
              </Link>
            ))}
          </div>
          <p className="mt-7 leading-relaxed text-cs-dark-blue/80">For residency, fellowship, and medical school programs, explore <Link href="/medical-education" className="font-medium underline underline-offset-4">curriculum, faculty development, and communication remediation</Link>.</p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <figure className="min-w-0">
            <blockquote className="border-l-4 border-cs-navy pl-6 text-2xl font-light leading-relaxed text-cs-dark-blue">&quot;It was helpful to have time to think and reflect without feeling the pressure of a person across from you expecting a response.&quot;</blockquote>
            <figcaption className="mt-5 pl-6 text-sm text-cs-dark-blue/70">Clinician, Pilot Study Participant</figcaption>
            <Link href="/examples#clinician-reflections" className="mt-6 inline-block pl-6 text-sm font-medium text-cs-dark-blue underline underline-offset-4">Read clinicians&apos; accounts</Link>
          </figure>
          <div>
            <h2 className="text-2xl font-medium text-cs-dark-blue">Inspect the evidence before deciding</h2>
            <p className="mt-4 leading-relaxed text-cs-dark-blue/80">Open complete practice reports and read how the scoring works, what research is public, and where the evidence stops.</p>
            <Link href="/evidence" className="mt-6 inline-flex items-center gap-2 font-medium text-cs-dark-blue underline underline-offset-4">Evidence and scoring limits<ArrowRight className="h-4 w-4 shrink-0" /></Link>
          </div>
        </div>
      </section>

      <section id="how-an-assessment-works" className="bg-cs-cloud px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-cs-dark-blue md:text-4xl">Start with one team and one communication priority</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {copy.startingSteps.map((step, index) => (
              <div key={step.title} className="min-w-0">
                <p className="mb-3 text-sm font-medium text-cs-navy">Step {index + 1}</p>
                <h3 className="text-xl font-medium text-cs-dark-blue">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-cs-dark-blue/80">{step.body}</p>
              </div>
            ))}
          </div>
          <Link href="/evaluation#operations" className="mt-8 inline-flex items-center gap-2 font-medium text-cs-dark-blue underline underline-offset-4">What launching requires<ArrowRight className="h-4 w-4 shrink-0" /></Link>
        </div>
      </section>

      <WaveformBand seed="home-final">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light md:text-4xl">{copy.closing.heading}</h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-cs-cloud">{copy.closing.body}</p>
          <Button variant="accent" size="lg" asChild className="mt-7"><Link href="/contact">{copy.closing.cta}<ArrowRight /></Link></Button>
        </div>
      </WaveformBand>
    </>
  )
}
