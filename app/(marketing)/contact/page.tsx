import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { HubSpotForm } from "@/components/hubspot-form"
import { HubSpotMeetings } from "@/components/hubspot-meetings"
import { HUBSPOT_MEETINGS_URL } from "@/lib/hubspot"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { ContactSourceField } from "@/components/contact-source-field"
import { COHORT_REPORT_PATH } from "@/lib/cohort-report"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { ORGANIZATION } from "@/lib/positioning"

const description = "Bring ClinicalSim a conversation your health system or medical education program wants to improve. See a relevant case and discuss how a first assessment could work."
// The <title> is the in-page CTA wording (PRIMARY_CTA), so it differs from the H1.
export const metadata: Metadata = {
  title: "Discuss your communication priorities",
  description,
  openGraph: { title: "Discuss your communication priorities with ClinicalSim", description, url: "https://clinicalsim.ai/contact" },
  twitter: { title: "Discuss your communication priorities with ClinicalSim", description },
  alternates: { canonical: "https://clinicalsim.ai/contact" },
}

// Shown after a successful submit, for the visitor who wants to read while waiting.
const successDetail = (
  <div className="mt-5 border-t border-white/20 pt-5">
    <p className="font-light text-cs-cloud">While you wait, you can read:</p>
    <ul className="mt-3 space-y-2">
      <li><Link href={COHORT_REPORT_PATH} className="inline-flex items-center gap-2 font-medium text-white underline underline-offset-4">One health system&apos;s anonymized cohort report<ArrowRight className="h-4 w-4 shrink-0" /></Link></li>
      <li><Link href="/examples" className="inline-flex items-center gap-2 font-medium text-white underline underline-offset-4">Complete participant feedback examples<ArrowRight className="h-4 w-4 shrink-0" /></Link></li>
    </ul>
  </div>
)

const fieldClass = "border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:border-cs-electric focus:ring-0"
const labelClass = "mb-2 block text-base font-normal text-white"

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact ClinicalSim", description, url: "https://clinicalsim.ai/contact", dateModified: PAGE_DATE_MODIFIED.contact, mainEntity: { ...ORGANIZATION, contactPoint: { "@type": "ContactPoint", contactType: "sales", availableLanguage: "English" } } },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://clinicalsim.ai" }, { "@type": "ListItem", position: 2, name: "Contact", item: "https://clinicalsim.ai/contact" }] },
      ]} />
      <section className="relative overflow-hidden bg-cs-dark-blue px-6 py-14 text-white md:py-20">
        <Waveform seed="contact" align="right" opacity={0.12} />
        <div className="relative mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <h1 className="text-4xl font-light md:text-5xl">Bring us a conversation your institution wants to improve</h1>
            <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-cs-cloud">Tell us what you&apos;re considering or ask a question. We&apos;ll show you a relevant case and talk through how a first assessment could work. You don&apos;t need a finished plan.</p>
            <p className="mt-5 text-sm text-cs-cloud/80">We usually reply within two business days.</p>
            {HUBSPOT_MEETINGS_URL && <a href="#book-a-meeting" className="mt-7 inline-flex items-center gap-2 font-medium text-cs-electric underline underline-offset-4">Or book a time to talk<ArrowRight className="h-4 w-4" /></a>}
            <div className="mt-10 border-t border-white/20 pt-7">
              <h2 className="text-xl font-medium">See it before we talk</h2>
              <p className="mt-3 max-w-md leading-relaxed text-cs-cloud">Open a complete recording, transcript, and feedback report without signing in.</p>
              <Link href="/examples" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4">See example feedback<ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-white/20 bg-white/5 p-6 md:p-8">
            <HubSpotForm form="contact" booleanFields={["newsletter_opt_in"]} successMessage="Your message is with our team, and we'll reply to the email address you gave us." successDetail={successDetail} className="space-y-5">
              <ContactSourceField />
              <fieldset className="min-w-0">
                <legend className={labelClass}>Name <span aria-hidden="true" className="text-cs-electric">*</span></legend>
                <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                  <div><Label htmlFor="firstName" className="sr-only">First name</Label><Input id="firstName" name="firstname" autoComplete="given-name" placeholder="First name" required className={fieldClass} /></div>
                  <div><Label htmlFor="lastName" className="sr-only">Last name</Label><Input id="lastName" name="lastname" autoComplete="family-name" placeholder="Last name" required className={fieldClass} /></div>
                </div>
              </fieldset>
              <div><Label htmlFor="email" className={labelClass}>Work email <span aria-hidden="true" className="text-cs-electric">*</span></Label><Input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} /></div>
              <div><Label htmlFor="organization" className={labelClass}>Organization</Label><Input id="organization" name="company" autoComplete="organization" placeholder="Hospital, medical school, or program" className={fieldClass} /></div>
              <div><Label htmlFor="message" className={labelClass}>What would you like to discuss? <span aria-hidden="true" className="text-cs-electric">*</span></Label><Textarea id="message" name="message" rows={4} placeholder="A conversation your team wants to practice, or a question about ClinicalSim" required className={fieldClass} /></div>
              <details className="rounded-xl border border-white/20 p-4">
                <summary className="cursor-pointer text-sm font-medium">Add details about your team (optional)</summary>
                <div className="mt-5 space-y-5">
                  <div><Label htmlFor="communicationPriority" className={labelClass}>Communication priority</Label><Input id="communicationPriority" name="communication_priority" placeholder="For example, consent or patient experience" className={fieldClass} /></div>
                  <div><Label htmlFor="role" className={labelClass}>Your role</Label><Input id="role" name="jobtitle" autoComplete="organization-title" className={fieldClass} /></div>
                  <div><Label htmlFor="team" className={labelClass}>Team or department</Label><select id="team" name="team" defaultValue="" className="h-10 w-full rounded-md border-2 border-white/30 bg-cs-dark-blue px-3 text-sm text-white"><option value="">Select a team</option><option value="patient-experience">Patient experience</option><option value="risk-safety">Risk and patient safety</option><option value="nursing-education">Nursing education</option><option value="simulation">Simulation center</option><option value="gme">Graduate medical education</option><option value="ume">Undergraduate medical education</option><option value="other">Other</option></select></div>
                  <div><Label htmlFor="pilotGroupSize" className={labelClass}>Approximate group size</Label><Input id="pilotGroupSize" name="pilot_group_size" placeholder="One unit or a participant count" className={fieldClass} /></div>
                  <div><Label htmlFor="preferredNextStep" className={labelClass}>Preferred next step</Label><select id="preferredNextStep" name="preferred_next_step" defaultValue="" className="h-10 w-full rounded-md border-2 border-white/30 bg-cs-dark-blue px-3 text-sm text-white"><option value="">Select a next step</option><option value="conversation">A conversation about the priority</option><option value="assessment">A communication assessment</option><option value="program">A longer communication program</option><option value="not-sure">Not sure yet</option></select></div>
                </div>
              </details>
              <div className="flex items-start gap-3"><Checkbox id="newsletter" name="newsletter_opt_in" className="mt-1 border-white/50 data-[state=checked]:border-cs-electric data-[state=checked]:bg-cs-electric" /><Label htmlFor="newsletter" className="text-sm font-normal leading-relaxed text-cs-cloud">Send me ClinicalSim news and research updates.</Label></div>
              <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">Send your message</Button>
            </HubSpotForm>
          </div>
        </div>
      </section>
      {HUBSPOT_MEETINGS_URL && <section id="book-a-meeting" className="scroll-mt-20 bg-white px-6 py-16 md:py-20"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-light text-cs-dark-blue">Book a time to talk</h2><p className="mt-4 mb-8 max-w-2xl leading-relaxed text-cs-dark-blue/80">Pick a time and we&apos;ll walk through a relevant case, participant feedback, and how this could fit your team.</p><HubSpotMeetings title="Book a meeting with ClinicalSim" /></div></section>}
      <section className="bg-cs-cloud px-6 py-12"><div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><p className="max-w-xl leading-relaxed text-cs-dark-blue/80">Planning a study or a case partnership? Use our <Link href="/research" className="font-medium underline underline-offset-4">research collaboration page</Link>.</p><div className="flex flex-wrap gap-6 text-sm font-medium text-cs-dark-blue"><Link href="/evaluation" className="underline underline-offset-4">Evaluation guide</Link><Link href="/trust" className="underline underline-offset-4">Trust and data handling</Link></div></div></section>
    </>
  )
}
