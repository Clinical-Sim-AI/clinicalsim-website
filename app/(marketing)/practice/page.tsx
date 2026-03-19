import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  MessageSquare,
  ShieldAlert,
  BarChart3,
  ClipboardCheck,
  Eye,
  TrendingUp,
  Quote,
  Layers,
  UserCheck,
  Clock,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { StatHighlight } from "@/components/stat-highlight"
import { FeatureCard } from "@/components/feature-card"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Practice Remediation Conversations with AI Simulation",
  description:
    "93% of residency programs face remediation, yet 25% of program directors report no formal training. Practice difficult remediation conversations with an AI-simulated trainee — free early access for program directors.",
  openGraph: {
    title: "Practice Remediation Conversations | ClinicalSim.ai",
    description:
      "Practice the conversation before you have it. Free AI simulation for program directors preparing for remediation meetings with residents and fellows.",
    url: "https://clinicalsim.ai/practice",
  },
  twitter: {
    title: "Practice Remediation Conversations | ClinicalSim.ai",
    description:
      "93% of programs face remediation. 25% of PDs were never trained for it. Practice with AI simulation before the real conversation.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/practice",
  },
}

const scenarios = [
  {
    icon: MessageSquare,
    title: "Delivering initial remediation news",
    description:
      "The resident doesn't see it coming. They're shocked, defensive, or shut down entirely. You need to be clear, compassionate, and legally sound — all in the same conversation.",
    variant: "warm" as const,
  },
  {
    icon: ShieldAlert,
    title: "Addressing professionalism concerns",
    description:
      "Multiple staff members have reported dismissive behavior. The resident disputes every account. You need to convey a pattern without it becoming adversarial.",
    variant: "navy" as const,
  },
  {
    icon: BarChart3,
    title: "Communicating milestone deficiency from CCC",
    description:
      "The committee rated them below expected level. They believe the assessment was subjective. You need to deliver the message and keep them engaged in a plan forward.",
    variant: "default" as const,
  },
  {
    icon: ClipboardCheck,
    title: "The conversation after failed remediation",
    description:
      "They completed every step of the plan, but benchmarks weren't met. This is the hardest conversation because they tried — and it still wasn't enough.",
    variant: "success" as const,
  },
]

const feedbackFeatures = [
  {
    icon: TrendingUp,
    title: "Milestone-aligned feedback",
    description:
      "Every response is evaluated against ACGME ICS Milestones 2.0. You see exactly where your approach lands on the assessment framework — not vague encouragement, but specific, actionable guidance tied to the standards your CCC already uses.",
  },
  {
    icon: Quote,
    title: "Individual moments highlighted",
    description:
      "Specific exchanges from your conversation are pulled out with targeted feedback. See where the trainee became defensive, where you missed an opening, and where your approach worked — with concrete suggestions for each moment.",
  },
  {
    icon: Eye,
    title: "Transparent assessment framework",
    description:
      "See the rubric, the communication framework, and the assessment criteria being used. Grounded in established models like Kalamazoo and Calgary-Cambridge — nothing happens in a black box.",
  },
  {
    icon: FileText,
    title: "Structured session documentation",
    description:
      "Every practice session generates a structured report — the same kind of milestone-aligned documentation a CCC would use. When you're ready to bring this to your learners, the reporting infrastructure is already built.",
  },
]

export default function PracticePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Practice Remediation Conversations with AI Simulation",
            description:
              "Free AI simulation for program directors to practice difficult remediation conversations with residents and fellows.",
            url: "https://clinicalsim.ai/practice",
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
                name: "Practice Remediation Conversations",
                item: "https://clinicalsim.ai/practice",
              },
            ],
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 -z-10" />

        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-warm uppercase tracking-wider mb-4">
            Free Early Access for Program Directors
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light shimmer leading-loose pb-3 mb-6">
            Practice the conversation before you have it
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-4">
            You were trained to lead a program, teach clinical medicine, and
            evaluate competency. But{" "}
            <span className="text-warm font-medium">
              remediation conversations
            </span>{" "}
            are a different skill — and the data shows most program directors
            never received formal training in them.
          </p>

          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-8 max-w-3xl">
            ClinicalSim gives you a private space to practice difficult
            remediation conversations with an AI-simulated resident or fellow —
            before the stakes are real. Describe your exact situation, and we
            dynamically generate the scenario, the rubric, and the assessment
            around it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a href="#early-access">
              <Button variant="gradient-primary" size="xl">
                Get Early Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="text-sm text-gray-500 font-light self-center">
              Free for program directors. Limited spots.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Stats Bar */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <StatHighlight
              value="93%"
              label="of residency programs have faced remediation in the past 3 years"
              source="CERA Survey"
              variant="warm"
            />
            <StatHighlight
              value="25%"
              label="of program directors report little to no training in remediation"
              source="CERA Survey"
              variant="navy"
            />
            <StatHighlight
              value="29-45"
              label="faculty hours consumed per remediation case"
              source="UPenn EIRC / U of Colorado"
              variant="blue"
            />
            <StatHighlight
              value="50%"
              label="of PDs said an accessible remediation toolkit is what they want most"
              source="CERA Survey"
              variant="success"
            />
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="slate" />

      {/* Scenarios Section */}
      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              The conversations{" "}
              <span className="text-warm font-medium">
                no one prepared you for
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              You know how to run a morbidity conference. You know how to
              evaluate a procedure. But when you sit across from a resident who
              just learned they&apos;re being placed on remediation — or a
              fellow who&apos;s defensive about professionalism feedback — the
              playbook doesn&apos;t exist. Until now.
            </p>
            <p className="text-lg text-gray-600 font-light leading-relaxed mt-4">
              These are common starting points — but you&apos;re not limited to
              them.{" "}
              <span className="text-navy font-medium">
                Tell us the specific conversation you&apos;re preparing for, and
                we&apos;ll dynamically build the scenario, the simulated
                trainee&apos;s personality, the assessment rubric, and the
                feedback framework around your exact situation.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {scenarios.map((scenario, index) => (
              <FeatureCard
                key={index}
                icon={scenario.icon}
                title={scenario.title}
                description={scenario.description}
                variant={scenario.variant}
                expandOnHover
              />
            ))}
          </div>

          <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-warm/20 border-glow-hover transition-all duration-300 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-warm flex items-center justify-center flex-shrink-0 mt-1">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your situation is unique — your practice scenario should be too
                </h3>
                <p className="text-base text-gray-600 font-light leading-relaxed">
                  Don&apos;t see your exact conversation above? That&apos;s the
                  point. Describe what you&apos;re facing — the resident&apos;s
                  history, the specific deficiency, the political dynamics — and
                  we generate a complete practice encounter tailored to your
                  situation: custom scenario prompt, realistic trainee persona,
                  milestone-aligned rubric, and structured feedback, all built
                  around the conversation you actually need to have.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* Feedback & Data Section */}
      <section className="px-6 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              See exactly{" "}
              <span className="text-warm font-medium">
                how you did — and why
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              This isn&apos;t a chatbot that tells you &ldquo;good job.&rdquo;
              Every practice conversation generates structured, milestone-aligned
              feedback — the same assessment rigor your learners would
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {feedbackFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                variant={index === 0 ? "warm" : "default"}
                expandOnHover
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="blue" />

      {/* Transparency Section */}
      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
              Full transparency into{" "}
              <span className="text-warm font-medium">our approach</span>
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              We don&apos;t ask you to trust a black box. Every scenario, every
              rubric, every piece of feedback is visible and grounded in the
              communication science your CCCs already use.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Layers,
                title: "Case library",
                description:
                  "See every scenario, what communication skills it targets, and how it maps to ACGME milestones.",
              },
              {
                icon: Eye,
                title: "Assessment rubric",
                description:
                  "The criteria are visible, editable, and grounded in Kalamazoo, Calgary-Cambridge, and SEGUE frameworks.",
              },
              {
                icon: UserCheck,
                title: "Feedback methodology",
                description:
                  "How individual moments are identified, evaluated, and translated into actionable guidance.",
              },
              {
                icon: TrendingUp,
                title: "Longitudinal tracking",
                description:
                  "Progress across multiple sessions with trend lines and targeted improvement areas.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/70 rounded-xl p-6 border border-gray-200 border-glow-hover transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Early Access Form */}
      <section id="early-access" className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Copy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Be one of the first to{" "}
                <span className="text-warm font-medium">try it</span>
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
                We&apos;re opening early access to a limited group of residency
                and fellowship program directors who want to practice
                remediation conversations with AI simulation.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: MessageSquare,
                    text: "Describe your situation and get a custom-built practice scenario — or choose from our library",
                  },
                  {
                    icon: TrendingUp,
                    text: "Get real-time feedback mapped to ICS Milestones 2.0",
                  },
                  {
                    icon: FileText,
                    text: "Receive structured session reports after every conversation",
                  },
                  {
                    icon: Clock,
                    text: "Practice on your schedule — private, on-demand, no booking required",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-base text-gray-700 font-light">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-gray-500 font-light">
                Free. Private. On your schedule.
              </p>
            </div>

            {/* Right: Form */}
            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-gray-200">
              <h3 className="text-xl font-medium text-navy mb-6">
                Request early access
              </h3>

              <form
                action="https://formspree.io/f/mzzrnbkk"
                method="POST"
                className="space-y-5"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="PD Practice Tool — Early Access Request"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="practice-firstName"
                      className="text-sm font-normal text-gray-700 mb-1.5 block"
                    >
                      First name <span className="text-warm">*</span>
                    </Label>
                    <Input
                      id="practice-firstName"
                      name="firstName"
                      required
                      className="bg-white border-gray-300 focus:border-blue-500 focus:ring-0 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="practice-lastName"
                      className="text-sm font-normal text-gray-700 mb-1.5 block"
                    >
                      Last name <span className="text-warm">*</span>
                    </Label>
                    <Input
                      id="practice-lastName"
                      name="lastName"
                      required
                      className="bg-white border-gray-300 focus:border-blue-500 focus:ring-0 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="practice-email"
                    className="text-sm font-normal text-gray-700 mb-1.5 block"
                  >
                    Email <span className="text-warm">*</span>
                  </Label>
                  <Input
                    id="practice-email"
                    name="email"
                    type="email"
                    required
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-0 rounded-lg"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="practice-institution"
                    className="text-sm font-normal text-gray-700 mb-1.5 block"
                  >
                    Institution <span className="text-warm">*</span>
                  </Label>
                  <Input
                    id="practice-institution"
                    name="institution"
                    placeholder="Hospital, Medical School, etc."
                    required
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-0 rounded-lg"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="practice-specialty"
                    className="text-sm font-normal text-gray-700 mb-1.5 block"
                  >
                    Program / Specialty <span className="text-warm">*</span>
                  </Label>
                  <Input
                    id="practice-specialty"
                    name="specialty"
                    placeholder="e.g., Internal Medicine Residency"
                    required
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-0 rounded-lg"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="practice-scenario"
                    className="text-sm font-normal text-gray-700 mb-1.5 block"
                  >
                    Describe the conversation you&apos;re preparing for
                  </Label>
                  <Textarea
                    id="practice-scenario"
                    name="scenario"
                    rows={3}
                    placeholder="e.g., 'PGY-2 who received below-expected milestone ratings from CCC, disputes the assessment, has a history of defensiveness with feedback...'"
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-0 resize-none rounded-lg"
                  />
                  <p className="text-xs text-gray-500 font-light mt-1.5">
                    We&apos;ll dynamically generate a practice scenario, trainee persona, and assessment rubric tailored to your exact situation.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="gradient-primary"
                  size="lg"
                  className="w-full"
                >
                  Request Early Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-gray-500 font-light text-center">
                  We&apos;ll never share your information. See our{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-warm transition-colors"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="blue" />

      {/* Bridge Section — From Your Practice to Your Program */}
      <section className="px-6 py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-navy mb-4">
            From your practice to{" "}
            <span className="text-warm font-medium">your program</span>
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed mb-8 max-w-3xl">
            The same simulation engine that helps you prepare for a remediation
            meeting helps your residents and fellows practice the clinical
            conversations they&apos;re struggling with — breaking bad news,
            goals-of-care discussions, error disclosure, informed consent.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: MessageSquare,
                title: "Unlimited AI patient encounters",
                description:
                  "Clinical communication scenarios your learners can practice on demand — no SPs to book, no rooms to reserve.",
              },
              {
                icon: ClipboardCheck,
                title: "CCC-ready documentation",
                description:
                  "Every session generates milestone-aligned reports with longitudinal tracking visible to you and your CCC.",
              },
              {
                icon: Clock,
                title: "On-demand, not on-schedule",
                description:
                  "Struggling learners who need the most repetitions finally get them — without consuming 45 faculty hours per case.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/70 rounded-xl p-6 border border-gray-200 border-glow-hover transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/audiences/program-directors">
              <Button variant="warm-accent" size="lg">
                Learn more about ClinicalSim for your program
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Request a pilot
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-gradient-to-br from-navy via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            The next remediation conversation doesn&apos;t have to be the first
            time you practice it
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-blue-100">
            Get free early access to AI-powered remediation practice — built for
            program directors, by people who understand graduate medical
            education.
          </p>
          <a href="#early-access">
            <Button variant="warm-filled" size="xl">
              Get Early Access
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>
    </>
  )
}
