import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClaimBoundary } from "@/components/claim-boundary"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import { nursingDescription, nursingFaqs, nursingSections } from "@/lib/nursing"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { ORGANIZATION, PRIMARY_CTA } from "@/lib/positioning"

export const metadata: Metadata = {
  title: "Nursing communication training",
  description: nursingDescription,
  openGraph: {
    title: "Nursing communication training",
    description: nursingDescription,
    url: "https://clinicalsim.ai/nursing",
  },
  twitter: { title: "Nursing communication training", description: nursingDescription },
  alternates: { canonical: "https://clinicalsim.ai/nursing" },
}

export default function NursingPage() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Nursing communication training",
          description: nursingDescription,
          url: "https://clinicalsim.ai/nursing",
          dateModified: PAGE_DATE_MODIFIED.nursing,
          publisher: ORGANIZATION,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://clinicalsim.ai" },
            { "@type": "ListItem", position: 2, name: "Nursing communication training", item: "https://clinicalsim.ai/nursing" },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "ClinicalSim nursing communication training",
          description: nursingDescription,
          url: "https://clinicalsim.ai/nursing",
          provider: ORGANIZATION,
          serviceType: "Formative nursing communication practice",
        },
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6">Give nurses time to practice before the next high-stakes conversation</h1>
          <p className="text-lg md:text-xl font-light text-cs-cloud leading-relaxed mb-8">Nurses practice spoken conversations with AI patients and get feedback they can use on the next attempt. Nurse leaders, educators, and residency coordinators agree on the cases, scoring standard, and reporting rules before anyone begins.</p>
          <Button variant="accent" size="lg" asChild><Link href="/contact">{PRIMARY_CTA}</Link></Button>
        </div>
      </section>
      <nav aria-label="On this page" className="bg-cs-cloud px-6 py-6">
        <ul className="max-w-4xl mx-auto flex flex-wrap gap-x-6 gap-y-3">
          {nursingSections.map((section) => <li key={section.id}><Link href={`#${section.id}`} className="text-cs-dark-blue underline underline-offset-4">{section.id === "hcahps" ? "HCAHPS" : section.id === "magnet" ? "Magnet hospitals" : section.id === "nurse-residency" ? "Nurse residencies" : section.id === "feedback" ? "Feedback" : section.id === "example-feedback" ? "Example reports" : "Patient and family practice"}</Link></li>)}
        </ul>
      </nav>
      {nursingSections.map((section, index) => (
        <section key={section.id} id={section.id} className={`scroll-mt-24 px-6 py-12 md:py-16 ${index % 2 ? "bg-cs-cloud/40" : "bg-white"}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">{section.heading}</h2>
            <div className="space-y-5 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <ul className="mt-6 space-y-3">{section.links.map((link) => <li key={link.href}><Link href={link.href} className="text-cs-dark-blue underline underline-offset-4 hover:text-cs-navy">{link.label}</Link></li>)}</ul>
          </div>
        </section>
      ))}
      <section className="px-6 py-12 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-cs-navy mb-8">Nursing communication training questions</h2>
          <div className="space-y-4">{nursingFaqs.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-cs-gray bg-white p-6">
              <summary className="cursor-pointer text-lg font-medium text-cs-dark-blue">{faq.question}</summary>
              <p className="mt-4 text-cs-dark-blue/85 font-light leading-relaxed">{faq.answer}</p>
            </details>
          ))}</div>
        </div>
      </section>
      <ClaimBoundary nonEndorsementOrgs={["ANCC", "Vizient"]} showFormative showRaterValidation showOutcomePredictionLimit showEmploymentUseLimit note="ClinicalSim does not claim improved HCAHPS scores, nurse retention, Magnet recognition, or accreditation compliance. It extends standardized patient programs and does not replace live coaching or summative assessment." />
      <WaveformBand seed="nursing-cta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Start with one nursing cohort and one conversation</h2>
          <p className="text-lg text-cs-cloud font-light mb-8">Bring the communication standard you teach and the practice your nurses need. We&apos;ll agree on the case and who sees results before the group begins.</p>
          <Button variant="accent" size="lg" asChild><Link href="/contact">{PRIMARY_CTA}</Link></Button>
        </div>
      </WaveformBand>
    </>
  )
}
