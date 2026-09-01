import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { ArrowRight } from "lucide-react"
import { BrandIcon } from "@/components/brand-icon"

export const metadata: Metadata = {
  title: "Contact us: request a pilot",
  description: "Tell ClinicalSim which team would practice, what standard you already use, and how your institution needs the results reported.",
  openGraph: {
    title: "Contact ClinicalSim.ai",
    description: "Tell us about the team, communication standard, and reporting needs for your pilot.",
    url: "https://clinicalsim.ai/contact",
  },
  twitter: {
    title: "Contact ClinicalSim.ai",
    description: "Request a health system or medical education pilot.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/contact",
  },
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact ClinicalSim.ai",
            description:
              "Tell ClinicalSim which team would practice, what standard the institution already uses, and how the results should be reported.",
            url: "https://clinicalsim.ai/contact",
            mainEntity: {
              "@type": "Organization",
              name: "ClinicalSim",
              url: "https://clinicalsim.ai",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                availableLanguage: "English",
              },
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
                name: "Contact",
                item: "https://clinicalsim.ai/contact",
              },
            ],
          },
        ]}
      />
      {/* Contact Hero Section */}
      <section className="bg-cs-dark-blue text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-light mb-6">Tell us about the team and the standard</h1>
              <p className="text-lg md:text-xl font-light leading-relaxed mb-8 text-cs-cloud">
                Tell us who would practice, which conversation or service
                behavior matters, what standard you already use, and who should
                see the results. We usually reply within two business days.
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-medium mb-2">What to include</h3>
                  <p className="text-base font-light text-cs-cloud">
                    Include the team or unit, the approximate participant count, the standard or policy you already teach, and any reporting or privacy limits.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-medium mb-2">Review the product first</h3>
                  <p className="text-base font-light text-cs-cloud mb-4">
                    The example encounters run a full session end to end, including the
                    transcript and the feedback report the learner received. The
                    methodology page covers how a case is built and what the scoring is
                    anchored to.
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <Link
                      href="/examples"
                      className="inline-flex items-center text-sm font-medium text-cs-electric hover:text-white transition-colors"
                    >
                      See an example encounter
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                    <Link
                      href="/methodology"
                      className="inline-flex items-center text-sm font-medium text-cs-electric hover:text-white transition-colors"
                    >
                      Read the methodology
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              action="https://formspree.io/f/mzzrnbkk"
              method="POST"
              className="space-y-6"
            >
              {/* Name Fields */}
              <div>
                <Label htmlFor="name" className="text-white text-base font-normal mb-2 block">
                  Name <span className="text-cs-dark-blue">*</span>
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="firstName"
                      placeholder="First name"
                      required
                      className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                    />
                  </div>
                  <div>
                    <Input
                      name="lastName"
                      placeholder="Last name"
                      required
                      className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-white text-base font-normal mb-2 block">
                  Email <span className="text-cs-dark-blue">*</span>
                </Label>
                <Input
                  name="email"
                  type="email"
                  required
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                />
                <p className="text-xs text-white/70 mt-2 font-light">We use this address to reply to your message.</p>
              </div>

              {/* Organization Field */}
              <div>
                <Label htmlFor="organization" className="text-white text-base font-normal mb-2 block">
                  Organization
                </Label>
                <Input
                  name="organization"
                  placeholder="Hospital, medical school, or program"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="team" className="text-white text-base font-normal mb-2 block">
                  Team or department
                </Label>
                <select
                  id="team"
                  name="team"
                  defaultValue=""
                  className="flex h-10 w-full rounded-lg border-2 border-white/30 bg-white/10 px-3 py-2 text-sm text-white focus:border-cs-electric focus:outline-none"
                >
                  <option value="" disabled className="text-cs-dark-blue">
                    Select a team
                  </option>
                  <option value="patient-experience" className="text-cs-dark-blue">Patient experience</option>
                  <option value="risk-safety" className="text-cs-dark-blue">Risk and patient safety</option>
                  <option value="nursing-education" className="text-cs-dark-blue">Nursing education</option>
                  <option value="simulation" className="text-cs-dark-blue">Simulation center</option>
                  <option value="gme" className="text-cs-dark-blue">Graduate medical education</option>
                  <option value="ume" className="text-cs-dark-blue">Undergraduate medical education</option>
                  <option value="other" className="text-cs-dark-blue">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="pilotGroupSize" className="text-white text-base font-normal mb-2 block">
                  Approximate pilot group size
                </Label>
                <Input
                  id="pilotGroupSize"
                  name="pilotGroupSize"
                  inputMode="numeric"
                  placeholder="For example, one unit or 25 participants"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                />
              </div>

              {/* Message Field */}
              <div>
                <Label htmlFor="message" className="text-white text-base font-normal mb-2 block">
                  Message <span className="text-cs-dark-blue">*</span>
                </Label>
                <Textarea
                  name="message"
                  rows={6}
                  placeholder="Tell us what people should practice, which standard or policy you already use, and how the results should be reported."
                  required
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 resize-none rounded-lg"
                />
                <p className="text-xs text-white/70 mt-2 font-light">Include any need for anonymous unit reporting, named completion records, or an approved research comparison.</p>
              </div>

              {/* Newsletter Checkbox */}
              <div className="flex items-start space-x-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <Checkbox
                  name="newsletter"
                  className="border-white/50 data-[state=checked]:bg-cs-electric data-[state=checked]:border-cs-electric mt-1"
                />
                <div>
                  <Label htmlFor="newsletter" className="text-white text-base font-normal">
                    Sign up for news and updates
                  </Label>
                  <p className="text-xs text-white/70 mt-1 font-light">Get notified about new features, research findings, and pilot opportunities.</p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full md:w-auto"
              >
                Request a pilot
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Contact Information */}
      <section className="py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4 text-center">Other ways to work with us</h2>
          <p className="text-lg text-cs-dark-blue/70 font-light text-center mb-12 max-w-2xl mx-auto">
            Request a pilot, propose a study, or tell us about a case and rubric partnership.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-cs-gray/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cs-electric flex items-center justify-center mb-6">
                <BrandIcon name="people-connected" color="dark" size={28} />
              </div>
              <h3 className="text-xl font-medium text-cs-navy mb-3">Pilot program</h3>
              <p className="text-cs-dark-blue/85 font-light leading-relaxed">
                Health system and medical education teams can begin with one group, one conversation, and one reporting question before they expand.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-cs-gray/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cs-dark-blue flex items-center justify-center mb-6">
                <BrandIcon name="friendship" color="white" size={28} />
              </div>
              <h3 className="text-xl font-medium text-cs-navy mb-3">Partnerships</h3>
              <p className="text-cs-dark-blue/85 font-light leading-relaxed">
                We consider case, rubric, and curriculum partnerships with medical schools and health systems. Tell us the standard and work you want to share.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-cs-gray/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cs-light-blue flex items-center justify-center mb-6">
                <BrandIcon name="microscope" color="dark" size={28} />
              </div>
              <h3 className="text-xl font-medium text-cs-navy mb-3">Research collaboration</h3>
              <p className="text-cs-dark-blue/85 font-light leading-relaxed mb-4">
                We work with investigators studying clinical communication,
                simulation based education, and competency assessment.
              </p>
              <Link
                href="/research"
                className="inline-flex items-center text-sm font-medium text-cs-dark-blue hover:text-cs-dark-blue transition-colors"
              >
                Apply to collaborate
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <p className="mt-12 text-base text-cs-dark-blue/70 font-light leading-relaxed max-w-3xl mx-auto text-center">
            If you are evaluating rather than buying, say so in the note. Program
            directors usually want to see what a feedback report actually contains
            before they talk about scope or pricing, and it is a shorter conversation
            once you have read one. The{" "}
            <Link href="/examples" className="text-cs-dark-blue underline underline-offset-2 hover:no-underline">
              example encounters
            </Link>{" "}
            and the{" "}
            <Link href="/medical-educator-faq" className="text-cs-dark-blue underline underline-offset-2 hover:no-underline">
              FAQ for medical educators
            </Link>{" "}
            cover most of what comes up first, and{" "}
            <Link href="/evaluation" className="text-cs-dark-blue underline underline-offset-2 hover:no-underline">
              evaluating ClinicalSim
            </Link>{" "}
            answers the procurement, evidence, and licensing questions before
            you have to ask them.
          </p>
        </div>
      </section>
    </>
  )
}
