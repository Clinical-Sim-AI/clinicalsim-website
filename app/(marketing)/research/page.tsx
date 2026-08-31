import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FeatureCard } from "@/components/feature-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import type { FaqItem } from "@/lib/types"
import { FlaskConical, Laptop, BarChart3, FileText, Users, Lightbulb, Presentation, MapPin, Calendar } from "lucide-react"

const RESEARCH_DESCRIPTION =
  "ClinicalSim works with investigators studying clinical communication, simulation based education, and competency assessment. Review conference presentations and propose a study."

export const metadata: Metadata = {
  title: "Research with ClinicalSim",
  description: RESEARCH_DESCRIPTION,
  openGraph: {
    title: "Research with ClinicalSim.ai",
    description: "Propose a study in clinical communication, simulation based education, or competency assessment.",
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
    title: "Platform access",
    description: "Depending on the study, we can provide ClinicalSim access for study participants.",
    variant: "default" as const,
  },
  {
    icon: Lightbulb,
    title: "Case development support",
    description: "We can help develop cases that match the study question, population, and clinical focus.",
    variant: "accent" as const,
  },
  {
    icon: BarChart3,
    title: "Structured data exports",
    description: "Depending on the protocol and agreement, we can provide structured exports of transcripts, usage data, and scored outcomes.",
    variant: "navy" as const,
  },
  {
    icon: FileText,
    title: "Study documentation",
    description: "We can provide technical documentation about the platform, cases, and scoring method for manuscripts and study records.",
    variant: "light-blue" as const,
  },
  {
    icon: Users,
    title: "Participant onboarding",
    description: "We can provide study accounts, onboarding, and technical support for participants.",
    variant: "default" as const,
  },
  {
    icon: FlaskConical,
    title: "IRB documentation",
    description: "We can provide technical documentation for an IRB submission. The study team remains responsible for the protocol and review process.",
    variant: "accent" as const,
  },
]

/**
 * Conference presentation record. Author lines, titles, venues and
 * presentation types for the entries Brennan co-authored are verified against
 * her CV (Team/Gillian Brennan/Gillian Brennan MB BCh BAO CV_may26.docx,
 * supplied by Ben 2026-08-31), which is a primary source for her own author
 * lines. This is the presentation record only. No study outcome appears on
 * this page until the study owners confirm the record in writing.
 */
const presentations = [
  {
    authors:
      "Lemelman M, Havalad V, Rissman L, Cangellaris O, Koskol A, Conway B, Brennan G",
    title:
      "Teaching Affirming Care in Challenging Times: An AI Approach to Transgender Communication Training",
    venue: "International Pediatric Simulation Symposium and Workshops (IPSSW)",
    type: "Oral Presentation",
    location: "Rome",
    date: "May 2026",
    year: "2026",
  },
  {
    authors: "Havalad V, Rissman L, Conway B, Brennan G",
    title: "Enhancing Difficult Conversations in Pediatrics Using Artificial Intelligence: A Hands-On Workshop for Designing AI-Driven Communication Training",
    venue: "International Pediatric Simulation Symposium and Workshops (IPSSW)",
    type: "Oral Presentation",
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

/**
 * Every answer here restates something already on this page, principally the
 * `benefits` list below. No outcome or effect claim belongs in this block: the
 * pilot study results stay withheld until the study owners confirm them.
 */
const researchFaqs: FaqItem[] = [
  {
    question:
      "Can ClinicalSim support a multi-site or multi-institution study of communication training?",
    answer:
      "ClinicalSim works with investigators studying clinical communication, simulation based education, and competency assessment, and the platform is browser-based, so participants at different institutions use the same cases and the same scoring without local installation. Depending on the protocol and the agreement, a study team can request structured exports of transcripts, usage data, and scored outcomes. Tell us the question, the population, and the design, and we will say whether the platform fits.",
  },
  {
    question: "What can a study team request from ClinicalSim?",
    answer:
      "A study team can request platform access for participants, help developing cases that match the study question and population, structured data exports covering transcripts, usage, and scored outcomes, technical documentation about the platform and its scoring method for manuscripts and study records, participant onboarding and technical support, and technical documentation for an IRB submission.",
  },
  {
    question: "Who is responsible for the IRB protocol and review?",
    answer:
      "The study team remains responsible for the protocol and the review process. ClinicalSim can supply technical documentation about the platform, the cases, and the scoring method for an IRB submission, which is the part an investigator cannot write without us, but the science and the ethical review stay with the investigators and their institution.",
  },
  {
    question: "How does ClinicalSim decide which research proposals to take on?",
    answer:
      "Proposals are reviewed on a rolling basis, and the deciding question is whether the platform genuinely fits the study rather than whether the study flatters the platform. A proposal that needs a capability ClinicalSim does not have is better turned down than stretched. ClinicalSim team members have presented this work at the International Pediatric Simulation Symposium and Workshops, the Pediatric Academic Societies Meeting, and the Critical Care Congress, and the full presentation record is listed on this page.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "FAQPage" as const,
  mainEntity: researchFaqs.map((faq) => ({
    "@type": "Question" as const,
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faq.answer,
    },
  })),
}

export default function ResearchPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Research Collaboration",
            description: RESEARCH_DESCRIPTION,
            url: "https://clinicalsim.ai/research",
            dateModified: PAGE_DATE_MODIFIED.research,
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://clinicalsim.ai",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Research Collaboration",
                item: "https://clinicalsim.ai/research",
              },
            ],
          },
          faqJsonLd,
        ]}
      />

      {/* Hero Section */}
      <section className="bg-cs-dark-blue text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Research Info */}
            <div>
              <p className="inline-flex items-center gap-2 text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-cs-electric mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-cs-electric" aria-hidden="true" />
                Research collaboration
              </p>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.08] text-balance mb-6">Research with ClinicalSim</h1>
              <p className="text-lg md:text-xl font-light leading-relaxed mb-8 text-cs-cloud">
                We work with investigators studying clinical communication,
                simulation based education, and competency assessment. Tell us
                the question, population, and study design. We will tell you
                whether the platform fits.
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-medium mb-2">What we can provide</h3>
                  <p className="text-base font-light text-cs-cloud">
                    Depending on the study, we can provide platform access, case development support, participant onboarding, structured data exports, and technical documentation for an IRB submission.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-medium mb-2">Response time</h3>
                  <p className="text-base font-light text-cs-cloud">
                    We review applications on a rolling basis and typically respond within{" "}
                    <span className="font-bold tracking-tight text-cs-electric">1-2 weeks</span>.
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
                  Name <span className="text-cs-dark-blue">*</span>
                </Label>
                <Input
                  name="name"
                  id="name"
                  required
                  placeholder="Full name"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white text-base font-normal mb-2 block">
                  Email <span className="text-cs-dark-blue">*</span>
                </Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  required
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                />
              </div>

              {/* Institution */}
              <div>
                <Label htmlFor="institution" className="text-white text-base font-normal mb-2 block">
                  Affiliate institution <span className="text-cs-dark-blue">*</span>
                </Label>
                <Input
                  name="institution"
                  id="institution"
                  required
                  placeholder="University, hospital, or research center"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                />
              </div>

              {/* Primary Specialty */}
              <div>
                <Label htmlFor="specialty" className="text-white text-base font-normal mb-2 block">
                  Primary specialty <span className="text-cs-dark-blue">*</span>
                </Label>
                <Input
                  name="specialty"
                  id="specialty"
                  required
                  placeholder="e.g., Palliative Care, Medical Education, Internal Medicine"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                />
              </div>

              {/* Study Idea */}
              <div>
                <Label htmlFor="studyIdea" className="text-white text-base font-normal mb-2 block">
                  Study idea <span className="text-cs-dark-blue">*</span>
                </Label>
                <Textarea
                  name="studyIdea"
                  id="studyIdea"
                  rows={3}
                  required
                  placeholder="Brief description of your research question and how you envision using the platform"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 resize-none rounded-lg"
                />
              </div>

              {/* Target Participants */}
              <div>
                <Label htmlFor="targetParticipants" className="text-white text-base font-normal mb-2 block">
                  Target participants <span className="text-cs-dark-blue">*</span>
                </Label>
                <Input
                  name="targetParticipants"
                  id="targetParticipants"
                  required
                  placeholder="e.g., PGY-1 internal medicine learners"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                />
              </div>

              {/* Estimated Number of Participants */}
              <div>
                <Label htmlFor="participantCount" className="text-white text-base font-normal mb-2 block">
                  Estimated number of participants <span className="text-cs-dark-blue">*</span>
                </Label>
                <Input
                  name="participantCount"
                  id="participantCount"
                  required
                  placeholder="e.g., 30-50"
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 rounded-lg"
                />
              </div>

              {/* Feedback Evaluation Tool */}
              <div>
                <Label htmlFor="feedbackTool" className="text-white text-base font-normal mb-2 block">
                  Feedback evaluation tool
                </Label>
                <Textarea
                  name="feedbackTool"
                  id="feedbackTool"
                  rows={2}
                  placeholder="e.g., Calgary-Cambridge, ACGME milestones. If not yet decided, write NA."
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 resize-none rounded-lg"
                />
              </div>

              {/* Pre-survey */}
              <div>
                <Label htmlFor="preSurvey" className="text-white text-base font-normal mb-2 block">
                  Pre-survey details
                </Label>
                <Textarea
                  name="preSurvey"
                  id="preSurvey"
                  rows={2}
                  placeholder="Describe any pre-intervention survey or assessment. If no, write NA."
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 resize-none rounded-lg"
                />
              </div>

              {/* Post-survey */}
              <div>
                <Label htmlFor="postSurvey" className="text-white text-base font-normal mb-2 block">
                  Post-survey details
                </Label>
                <Textarea
                  name="postSurvey"
                  id="postSurvey"
                  rows={2}
                  placeholder="Describe any post-intervention survey or assessment. If no, write NA."
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 text-white placeholder:text-gray-300 focus:border-cs-electric focus:ring-0 resize-none rounded-lg"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full md:w-auto"
              >
                Submit application
              </Button>
            </form>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="cloud" />

      {/* Conference Presentations Section */}
      <section className="px-6 pt-16 md:pt-24 pb-4 md:pb-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              Conference presentations
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
              Presentations at the International Pediatric Simulation Symposium and Workshops, the Pediatric Academic Societies Meeting, and the Critical Care Congress.
            </p>
          </div>

          <div className="space-y-4">
            {presentations.map((p, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl p-6 md:p-8 border border-cs-gray hover:border-cs-light-blue/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cs-dark-blue flex items-center justify-center">
                    <Presentation className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-cs-navy mb-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-cs-dark-blue/70 mb-3">
                      {p.authors}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex items-center gap-1.5 text-cs-dark-blue/85 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-cs-dark-blue" />
                        {p.venue}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-cs-dark-gray">
                        <MapPin className="w-3.5 h-3.5 text-cs-dark-blue" />
                        {p.location}, {p.date}
                      </span>
                      {p.type && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cs-light-blue/10 text-cs-light-blue border border-cs-light-blue/20">
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
            <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
              What a study team can request
            </h2>
            <p className="text-lg text-cs-dark-blue/70 font-light max-w-2xl mx-auto">
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

          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-cs-navy mb-8">
              Common questions from{" "}
              <span className="text-cs-dark-blue font-medium">investigators</span>
            </h2>
            <div className="space-y-7">
              {researchFaqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg md:text-xl font-medium text-cs-dark-blue mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-cs-dark-blue/70 font-light">
              Have questions before applying?{" "}
              <Link href="/contact" className="text-cs-dark-blue font-medium hover:text-cs-dark-blue transition-colors">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
