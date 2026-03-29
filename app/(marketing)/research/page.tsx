import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FeatureCard } from "@/components/feature-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { FlaskConical, Laptop, BarChart3, FileText, Users, Lightbulb, Presentation, MapPin, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Research Collaboration",
  description: "ClinicalSim.ai research includes presentations at IPSSW, PAS, Critical Care Congress, and IPSS on AI-driven communication training. Apply to collaborate on research in communication remediation, simulation-based education, and competency assessment.",
  openGraph: {
    title: "Research with ClinicalSim.ai",
    description: "Apply to collaborate on research in medical communication training using AI voice simulation. Platform access, custom scenarios, and publication support provided.",
    url: "https://clinicalsim.ai/research",
  },
  twitter: {
    title: "Research with ClinicalSim.ai",
    description: "Apply to collaborate on AI voice simulation research in medical communication training.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/research",
  },
}

const benefits = [
  {
    icon: Laptop,
    title: "Full Platform Access",
    description: "Complimentary access to ClinicalSim.ai for your study participants, including all simulation scenarios and feedback tools.",
    variant: "default" as const,
  },
  {
    icon: Lightbulb,
    title: "Custom Scenario Development",
    description: "We'll work with you to build tailored simulation scenarios that match your study design and clinical focus area.",
    variant: "warm" as const,
  },
  {
    icon: BarChart3,
    title: "Data Collection Infrastructure",
    description: "Built-in data capture for conversation transcripts, usage metrics, and structured outcome measures to support your analysis.",
    variant: "navy" as const,
  },
  {
    icon: FileText,
    title: "Publication Support",
    description: "Co-authorship opportunities, statistical consultation, and support preparing manuscripts for peer-reviewed journals.",
    variant: "success" as const,
  },
  {
    icon: Users,
    title: "Participant Management",
    description: "Dedicated accounts, onboarding support, and technical assistance for study participants throughout the research period.",
    variant: "default" as const,
  },
  {
    icon: FlaskConical,
    title: "IRB & Study Design Guidance",
    description: "Experience navigating IRB protocols for AI simulation research and input on study design considerations unique to this modality.",
    variant: "warm" as const,
  },
]

const presentations = [
  {
    authors: "Brennan G, … Havalad V, et al.",
    title: "Teaching Affirming Care in Challenging Times: An AI Approach for Transgender Communication Training",
    venue: "International Pediatric Simulation Society Meeting",
    location: "Rome",
    date: "May 2026",
    year: "2026",
  },
  {
    authors: "Havalad V, et al.",
    title: "Enhancing Difficult Conversations in Pediatrics Using Artificial Intelligence: A Hands-On Workshop for Designing AI-Driven Communication Training",
    venue: "International Pediatric Simulation Society Meeting",
    location: "Rome",
    date: "May 2026",
    year: "2026",
  },
  {
    authors: "Brennan G, … Havalad V",
    title: "From Simulation to Conversation: Using AI to Teach Difficult Conversations",
    venue: "Pediatric Academic Societies Meeting",
    location: "Boston",
    date: "April 2026",
    year: "2026",
  },
  {
    authors: "Havalad V, et al.",
    title: "AI-Driven Just-In-Time Training for Handling Difficult Conversations",
    venue: "Critical Care Congress",
    location: "Chicago",
    date: "March 2026",
    year: "2026",
  },
  {
    authors: "Havalad V, Rissman L, Conway B, Brennan G",
    title: "AI-Driven Just-In-Time Training for Handling Difficult Conversations",
    venue: "International Pediatric Simulation Symposium and Workshops (IPSSW)",
    type: "Oral Presentation",
    location: "Munich",
    date: "May 2025",
    year: "2025",
  },
]

export default function ResearchPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Research Collaboration — ClinicalSim.ai",
          description: "Apply to collaborate with ClinicalSim.ai on research in medical communication training using AI voice simulation.",
          url: "https://clinicalsim.ai/research",
          isPartOf: {
            "@type": "WebSite",
            name: "ClinicalSim.ai",
            url: "https://clinicalsim.ai",
          },
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Research Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-light mb-6">Research with ClinicalSim.ai</h1>
              <p className="text-lg md:text-xl font-light leading-relaxed mb-8 text-blue-50">
                We partner with researchers studying communication remediation, simulation-based education,
                and competency assessment in graduate and undergraduate medical education. If you have a study idea that could use our platform,
                we&apos;d love to hear from you.
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-medium mb-2">What We Provide</h3>
                  <p className="text-base font-light text-blue-50">
                    Platform access, custom scenario development, data collection support,
                    and co-authorship opportunities, all at no cost to your research team.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-medium mb-2">Response Time</h3>
                  <p className="text-base font-light text-blue-50">
                    We review applications on a rolling basis and typically respond within{" "}
                    <span className="font-mono text-warm">1-2 weeks</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <form
              action="https://formspree.io/f/maqdboak"
              method="POST"
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-white text-base font-normal mb-2 block">
                  Name <span className="text-warm">*</span>
                </Label>
                <Input
                  name="name"
                  id="name"
                  required
                  placeholder="Full name"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 rounded-lg"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white text-base font-normal mb-2 block">
                  Email <span className="text-warm">*</span>
                </Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  required
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 rounded-lg"
                />
              </div>

              {/* Institution */}
              <div>
                <Label htmlFor="institution" className="text-white text-base font-normal mb-2 block">
                  Affiliate Institution <span className="text-warm">*</span>
                </Label>
                <Input
                  name="institution"
                  id="institution"
                  required
                  placeholder="University, hospital, or research center"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 rounded-lg"
                />
              </div>

              {/* Primary Specialty */}
              <div>
                <Label htmlFor="specialty" className="text-white text-base font-normal mb-2 block">
                  Primary Specialty <span className="text-warm">*</span>
                </Label>
                <Input
                  name="specialty"
                  id="specialty"
                  required
                  placeholder="e.g., Palliative Care, Medical Education, Internal Medicine"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 rounded-lg"
                />
              </div>

              {/* Study Idea */}
              <div>
                <Label htmlFor="studyIdea" className="text-white text-base font-normal mb-2 block">
                  Study Idea <span className="text-warm">*</span>
                </Label>
                <Textarea
                  name="studyIdea"
                  id="studyIdea"
                  rows={3}
                  required
                  placeholder="Brief description of your research question and how you envision using the platform"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 resize-none rounded-lg"
                />
              </div>

              {/* Target Participants */}
              <div>
                <Label htmlFor="targetParticipants" className="text-white text-base font-normal mb-2 block">
                  Target Participants <span className="text-warm">*</span>
                </Label>
                <Input
                  name="targetParticipants"
                  id="targetParticipants"
                  required
                  placeholder="e.g., PGY-1 internal medicine learners"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 rounded-lg"
                />
              </div>

              {/* Estimated Number of Participants */}
              <div>
                <Label htmlFor="participantCount" className="text-white text-base font-normal mb-2 block">
                  Estimated Number of Participants <span className="text-warm">*</span>
                </Label>
                <Input
                  name="participantCount"
                  id="participantCount"
                  required
                  placeholder="e.g., 30-50"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 rounded-lg"
                />
              </div>

              {/* Feedback Evaluation Tool */}
              <div>
                <Label htmlFor="feedbackTool" className="text-white text-base font-normal mb-2 block">
                  Feedback Evaluation Tool
                </Label>
                <Textarea
                  name="feedbackTool"
                  id="feedbackTool"
                  rows={2}
                  placeholder="e.g., Calgary-Cambridge, ACGME milestones. If not yet decided, write NA."
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 resize-none rounded-lg"
                />
              </div>

              {/* Pre-survey */}
              <div>
                <Label htmlFor="preSurvey" className="text-white text-base font-normal mb-2 block">
                  Pre-survey Details
                </Label>
                <Textarea
                  name="preSurvey"
                  id="preSurvey"
                  rows={2}
                  placeholder="Describe any pre-intervention survey or assessment. If no, write NA."
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 resize-none rounded-lg"
                />
              </div>

              {/* Post-survey */}
              <div>
                <Label htmlFor="postSurvey" className="text-white text-base font-normal mb-2 block">
                  Post-survey Details
                </Label>
                <Textarea
                  name="postSurvey"
                  id="postSurvey"
                  rows={2}
                  placeholder="Describe any post-intervention survey or assessment. If no, write NA."
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-warm focus:ring-0 resize-none rounded-lg"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="warm-filled"
                size="lg"
                className="w-full md:w-auto"
              >
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Conference Presentations Section */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              Conference Presentations
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Our team has presented research on AI-driven communication training at leading medical education and simulation conferences.
            </p>
          </div>

          <div className="space-y-4">
            {presentations.map((p, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-xl p-6 md:p-8 border border-blue-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Presentation className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-navy mb-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {p.authors}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex items-center gap-1.5 text-gray-700 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-warm" />
                        {p.venue}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-warm" />
                        {p.location}, {p.date}
                      </span>
                      {p.type && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                          {p.type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* Why Collaborate Section */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              Why collaborate with <span className="text-warm font-medium">ClinicalSim.ai</span>?
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              We handle the platform logistics so you can focus on the research.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                variant={benefit.variant}
                expandOnHover
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 font-light">
              Have questions before applying?{" "}
              <Link href="/contact" className="text-blue-600 font-medium hover:text-warm transition-colors">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
