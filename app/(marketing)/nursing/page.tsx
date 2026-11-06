import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClaimBoundary } from "@/components/claim-boundary"
import { ContentSections } from "@/components/content-section"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { buildHowToSchema, headingId } from "@/lib/howto-schema"
import {
  NURSING_FAQ_HEADING,
  NURSING_HEADLINE,
  NURSING_HOWTO_HEADING,
  NURSING_URL,
  nursingDescription,
  nursingFaqs,
  nursingHowToSteps,
  nursingSections,
} from "@/lib/nursing"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { ORGANIZATION, PRIMARY_CTA } from "@/lib/positioning"

const EXAMPLE_HREF = "/examples/48-hours-in-the-hallway"
const EXAMPLE_CTA = "Hear a nursing conversation"

export const metadata: Metadata = {
  title: "Voice AI simulation for nursing communication training",
  description: nursingDescription,
  openGraph: {
    title: "Voice AI simulation for nursing communication training",
    description: nursingDescription,
    url: "https://clinicalsim.ai/nursing",
  },
  twitter: { title: "Voice AI simulation for nursing communication training", description: nursingDescription },
  alternates: { canonical: "https://clinicalsim.ai/nursing" },
}

export default function NursingPage() {
  const howToJsonLd = buildHowToSchema({
    name: NURSING_HOWTO_HEADING,
    url: NURSING_URL,
    steps: nursingHowToSteps,
  })

  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: NURSING_HEADLINE,
          description: nursingDescription,
          url: NURSING_URL,
          dateModified: PAGE_DATE_MODIFIED.nursing,
          publisher: ORGANIZATION,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://clinicalsim.ai" },
            { "@type": "ListItem", position: 2, name: "Nursing communication training", item: NURSING_URL },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "ClinicalSim nursing communication training",
          description: nursingDescription,
          url: NURSING_URL,
          provider: ORGANIZATION,
          serviceType: "Formative nursing communication practice",
        },
        ...(howToJsonLd ? [howToJsonLd] : []),
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: nursingFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
      ]} />
      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-16 md:py-24 text-white">
        <Waveform seed="nursing" align="right" opacity={0.15} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-cs-electric mb-6">Nursing communication training</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6">{NURSING_HEADLINE}</h1>
          <p className="text-lg md:text-xl font-light text-cs-cloud leading-relaxed mb-8">Nurses talk out loud with an AI patient, family member, or colleague about the conversations that matter most on the unit, from explaining a delay to a worried family to calling a physician about a patient who is getting worse. Each nurse gets feedback scored against your hospital&apos;s standard, with their own words quoted behind every score.</p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
            <Button variant="accent" size="lg" asChild><Link href={EXAMPLE_HREF}>{EXAMPLE_CTA}</Link></Button>
            <Button variant="inverse" size="lg" asChild><Link href="/contact">{PRIMARY_CTA}</Link></Button>
          </div>
        </div>
      </section>
      <ContentSections sections={nursingSections} />
      <section id={headingId(NURSING_FAQ_HEADING)} className="scroll-mt-24 px-6 py-12 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">{NURSING_FAQ_HEADING}</h2>
          <div className="space-y-4">{nursingFaqs.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-cs-gray bg-white p-6">
              <summary className="cursor-pointer text-lg font-medium text-cs-dark-blue">{faq.question}</summary>
              <p className="mt-4 text-cs-dark-blue/85 font-light leading-relaxed">{faq.answer}</p>
            </details>
          ))}</div>
        </div>
      </section>
      <ClaimBoundary
        nonEndorsementOrgs={["ANCC", "Vizient", "VitalTalk", "CMS"]}
        showFormative
        showRaterValidation
        showOutcomePredictionLimit
        note="This page makes no claim of improved HCAHPS scores, Magnet recognition, or accreditation compliance."
      />
      <WaveformBand seed="nursing-cta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Start with one nursing cohort and one conversation</h2>
          <p className="text-lg text-cs-cloud font-light mb-8">Bring the communication standard you teach and the conversation your nurses most want to practice. We&apos;ll agree on the case and who sees results before the group begins.</p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4">
            <Button variant="accent" size="lg" asChild><Link href={EXAMPLE_HREF}>{EXAMPLE_CTA}</Link></Button>
            <Button variant="inverse" size="lg" asChild><Link href="/contact">{PRIMARY_CTA}</Link></Button>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
