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
  description: "Tell ClinicalSim who would practice, which high-stakes conversations matter most, and what your program needs to measure.",
  openGraph: {
    title: "Contact ClinicalSim.ai",
    description: "Tell us about the learners, conversations, and measures that matter to your program.",
    url: "https://clinicalsim.ai/contact",
  },
  twitter: {
    title: "Contact ClinicalSim.ai",
    description: "Request a pilot or talk with us about your program.",
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
              "Tell ClinicalSim who would practice, which high-stakes conversations matter most, and what the program needs to measure.",
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
              <h1 className="text-4xl md:text-5xl font-light mb-6">Tell us about your program</h1>
              <p className="text-lg md:text-xl font-light leading-relaxed mb-8 text-cs-cloud">
                If you are considering a pilot, tell us who would practice,
                which conversations matter most, and what you need to measure.
                We usually reply within two business days.
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-medium mb-2">What to include</h3>
                  <p className="text-base font-light text-cs-cloud">
                    Include your learner group, program size, and the communication problem you are trying to solve.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-medium mb-2">Rather look first?</h3>
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

              {/* Message Field */}
              <div>
                <Label htmlFor="message" className="text-white text-base font-normal mb-2 block">
                  Message <span className="text-cs-dark-blue">*</span>
                </Label>
                <Textarea
                  name="message"
                  rows={6}
                  placeholder="Tell us who would practice, which conversations matter most, and what you need to measure."
                  required
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 resize-none rounded-lg"
                />
                <p className="text-xs text-white/70 mt-2 font-light">Include your learner group, program size, and the communication problem you are trying to solve.</p>
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
            Request a pilot, propose a study, or tell us about a specific curriculum partnership.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-cs-gray/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cs-electric flex items-center justify-center mb-6">
                <BrandIcon name="people-connected" color="dark" size={28} />
              </div>
              <h3 className="text-xl font-medium text-cs-navy mb-3">Pilot program</h3>
              <p className="text-cs-dark-blue/85 font-light leading-relaxed">
                We&apos;re piloting with medical schools, residency programs, and fellowships looking to standardize communication
                training and remediation with structured, milestone-aligned practice.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-cs-gray/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cs-dark-blue flex items-center justify-center mb-6">
                <BrandIcon name="friendship" color="white" size={28} />
              </div>
              <h3 className="text-xl font-medium text-cs-navy mb-3">Partnerships</h3>
              <p className="text-cs-dark-blue/85 font-light leading-relaxed">
                We consider case development and curriculum partnerships with medical schools and health systems. Tell us the learner group and work you want to share.
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
            cover most of what comes up first.
          </p>
        </div>
      </section>
    </>
  )
}
