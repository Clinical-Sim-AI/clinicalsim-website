import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { ClaimBoundary } from "@/components/claim-boundary"
import { publishedFrameworks } from "@/lib/frameworks"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"

const CANONICAL = "https://clinicalsim.ai/frameworks"

const NON_ENDORSEMENT_ORGS = [
  "the ACGME",
  "AHRQ",
  "the National Quality Forum",
  "The Joint Commission",
  "the American College of Surgeons",
]

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What do you need from us to score against our own framework?",
    answer:
      "The element definitions as you have written them, in whatever document you already use: a consent policy, an escalation policy, a preceptor rubric, a disclosure standard, a badge card. We do not rewrite them, shorten them, or map them onto a rubric of ours. If an element is ambiguous we ask you what you meant rather than deciding for you.",
  },
  {
    question: "What is the scope rule?",
    answer:
      "An element is scored only where the case gave the clinician a chance to show it. If a scenario never raises a decision about alternatives, the alternatives element is marked out of scope and left out of the total rather than scored as a failure. Every report states how many elements were excluded and why.",
  },
  {
    question: "How is this different from an AI simulation platform that scores against its own rubric?",
    answer:
      "ClinicalSim can score the element definitions your program already uses instead of limiting every case to a vendor written rubric. The report keeps the original element name beside the score and transcript evidence, so the program can compare the result with its own standard.",
  },
  {
    question: "Can a framework be scored if it was written for teams rather than individuals?",
    answer:
      "Only for the elements a single speaker can demonstrate. TeamSTEPPS names speech acts an individual either performed or did not, such as a check-back or a two-challenge escalation, and those score cleanly. A team-level item about shared mental models does not, and we say so rather than inventing a proxy for it.",
  },
  {
    question: "Are the scores validated against expert human raters?",
    answer:
      "Not yet. Consistency between model runs is not the same thing as agreement with faculty raters, and we say that before anyone asks. Measuring agreement on a customer's own rubric is the work a first pilot should do, and it is the gate before any high-stakes use.",
  },
  {
    question: "What if our framework is not on this list?",
    answer:
      "Send it. The list names the public frameworks we can score against without anything from you, and it is not a limit. Most of what we score is institution-specific, because a surveyor checks whether staff followed your policy rather than whether your policy matches a national ideal.",
  },
]

export const metadata: Metadata = {
  title: { absolute: "Published frameworks and institution standards" },
  description:
    "Start with ready to use cases based on published clinical frameworks or add your institution's policy, service standard, script, or rubric. Every score cites transcript evidence.",
  openGraph: {
    title: "Published frameworks and institution standards | ClinicalSim.ai",
    description:
      "Use a published clinical framework or add your institution's own standard, with transcript evidence behind every score.",
    url: CANONICAL,
  },
  twitter: {
    title: "Published frameworks and institution standards | ClinicalSim.ai",
    description:
      "Use a published clinical framework or add your institution's own standard, with transcript evidence behind every score.",
  },
  alternates: {
    canonical: CANONICAL,
  },
}

export default function FrameworksPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org" as const,
      "@type": "WebPage" as const,
      name: "Published frameworks and institution standards",
      description:
        "Ready to use cases based on published clinical frameworks and institution supplied policies, service standards, scripts, and rubrics.",
      url: CANONICAL,
      dateModified: PAGE_DATE_MODIFIED.frameworks,
      isPartOf: {
        "@type": "WebSite" as const,
        name: "ClinicalSim.ai",
        url: "https://clinicalsim.ai",
      },
    },
    {
      "@context": "https://schema.org" as const,
      "@type": "BreadcrumbList" as const,
      itemListElement: [
        {
          "@type": "ListItem" as const,
          position: 1,
          name: "Home",
          item: "https://clinicalsim.ai",
        },
        {
          "@type": "ListItem" as const,
          position: 2,
          name: "Frameworks",
          item: CANONICAL,
        },
      ],
    },
    {
      "@context": "https://schema.org" as const,
      "@type": "DefinedTermSet" as const,
      name: "Published communication frameworks used in ClinicalSim cases",
      description:
        "Published frameworks developed and used in health care or medical education that can support element level scoring of a spoken encounter.",
      url: CANONICAL,
      hasDefinedTerm: publishedFrameworks.map((framework) => ({
        "@type": "DefinedTerm" as const,
        name: framework.name,
        description: framework.note,
        inDefinedTermSet: CANONICAL,
      })),
    },
    {
      "@context": "https://schema.org" as const,
      "@type": "FAQPage" as const,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question" as const,
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: faq.answer,
        },
      })),
    },
  ]

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative px-6 py-16 md:py-24 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-sm text-cs-cloud/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-cloud">Frameworks</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            Use a published framework or{" "}
            <span className="text-cs-electric font-medium">bring your own</span>
          </h1>

          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed mb-8 max-w-3xl">
            Start with ready to use cases based on named, published clinical frameworks, or add your
            institution&apos;s policy, service standard, script, or rubric. Every score quotes the
            transcript evidence behind it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#ready-to-use-frameworks">
              <Button variant="accent" size="xl">
                View published frameworks
              </Button>
            </Link>
            <Link href="#institution-standards">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                Add your standard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      <section
        id="ready-to-use-frameworks"
        className="scroll-mt-24 px-6 py-12 md:py-16 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
            Ready to use framework catalog
          </h2>
          <p className="text-lg text-cs-dark-blue/70 font-light mb-8 max-w-3xl">
            These published frameworks were developed and used in health care or medical education.
            They name elements that can support a case rubric without an institution supplying its
            own document.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {publishedFrameworks.map((framework) => (
              <article
                key={framework.name}
                className="border border-cs-gray/50 rounded-xl px-6 py-5"
              >
                <h3 className="text-lg font-medium text-cs-dark-blue mb-1">
                  {framework.name}
                </h3>
                <p className="text-sm text-cs-dark-gray font-light mb-3">
                  {framework.owner}
                </p>
                <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                  {framework.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" />

      <section
        id="institution-standards"
        className="scroll-mt-24 px-6 py-12 md:py-16 bg-cs-cloud"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
            Institution supplied standards
          </h2>
          <p className="text-lg text-cs-dark-blue/70 font-light mb-8 max-w-3xl">
            Bring an approved policy, service model, script, or rubric. We use its element names and
            definitions, then identify which elements a spoken encounter can show.
          </p>

          <div className="space-y-5">
            {[
              {
                step: "Use the approved definitions",
                body: "You send the document your institution uses. We keep its element names and definitions, and we ask when an element is unclear.",
              },
              {
                step: "One score per element",
                body: "A clinician speaks with an AI patient, and the report scores the encounter against each element rather than a general impression.",
              },
              {
                step: "The clinician's own words under every score",
                body: "Each element score carries the transcript excerpt behind it, so a reviewer can inspect the evidence and disagree with the rating.",
              },
              {
                step: "Out of scope, not marked down",
                body: "An element is scored only when the case gives the clinician a chance to show it. The report states which elements were excluded.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border-l-4 border-l-cs-navy border border-cs-gray/50 px-6 py-5"
              >
                <h3 className="text-lg font-medium text-cs-dark-blue mb-2">
                  {index + 1}. {item.step}
                </h3>
                <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/contact">
              <Button variant="default" size="lg">
                Discuss your standard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The scope rule */}
      <SectionDivider variant="diagonal-up" color="white" />

      <section className="px-6 py-8 md:py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            The scope rule
          </h2>

          <blockquote className="border-l-4 border-l-cs-navy pl-6 mb-8">
            <p className="text-xl md:text-2xl text-cs-dark-blue font-light leading-relaxed">
              An element is scored only where the conversation gave the clinician a chance to show
              it. Elements the case never raised are marked out of scope and excluded from the
              total, and the report says how many.
            </p>
          </blockquote>

          <p className="text-lg text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Without this rule, a low score can reflect a case that never asked for the behavior.
            Faculty need to see which elements the case tested before they interpret the total.
          </p>
        </div>
      </section>

      {/* Worked example */}
      <SectionDivider variant="wave" color="cloud" />

      <section className="px-6 py-8 md:py-12 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
            What one element looks like
          </h2>
          <p className="text-lg text-cs-dark-blue/70 font-light mb-8 max-w-2xl">
            From a published example on this site: a pediatric critical care fellow obtaining
            consent from a mother for a central line in the PICU, scored against a six-element
            consent framework.
          </p>

          <div className="bg-white rounded-2xl border border-cs-gray/50 p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5 pb-5 border-b border-cs-gray/50">
              <h3 className="text-xl font-medium text-cs-dark-blue">
                Assess decision-making capacity
              </h3>
              <span className="text-lg font-medium text-cs-navy">2 out of 5</span>
            </div>

            <p className="text-sm font-medium text-cs-dark-gray mb-2">
              The line that earned the score
            </p>
            <blockquote className="border-l-4 border-l-cs-navy pl-5 mb-6">
              <p className="text-lg text-cs-dark-blue font-light italic leading-relaxed">
                &quot;Absolutely. I&apos;m really glad you asked.&quot;
              </p>
            </blockquote>

            <p className="text-sm font-medium text-cs-dark-gray mb-2">Why</p>
            <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
              The fellow answers the question and moves straight into explaining the procedure. In
              a surrogate consent conversation the element asks for something earlier than that:
              confirming the mother&apos;s role as the decision maker, finding out what she
              already understands, and asking how much detail she wants. The fellow adapted well to
              her questions, which is why this is not a failing score, but the assessment happened
              reactively rather than up front.
            </p>

            <p className="text-sm text-cs-dark-gray font-light">
              Same report, same conversation: risks and benefits scored 5 out of 5, alternatives 3
              out of 5, and no elements were excluded, because the case gave the fellow a chance at
              all six.
            </p>
          </div>

          <p className="mt-6 text-base text-cs-dark-blue font-light">
            <Link
              href="/examples/informed-consent-discussion-for-central-venous-catheter-placement-in-the-picu"
              className="underline underline-offset-4 hover:text-cs-navy transition-colors"
            >
              Read the whole report, transcript, and audio
            </Link>
          </p>
        </div>
      </section>

      {/* FAQs */}
      <SectionDivider variant="diagonal-up" color="cloud" />

      <section className="px-6 py-8 md:py-12 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="border border-cs-gray/50 rounded-xl overflow-hidden bg-white"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-medium text-cs-dark-blue pr-4">
                      {faq.question}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-cs-gray flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="scoring-limits" className="scroll-mt-24">
        <ClaimBoundary
          nonEndorsementOrgs={NON_ENDORSEMENT_ORGS}
          showFormative
          showRaterValidation
          note="Naming a framework here describes what the engine can score against. It does not mean the framework's owner has reviewed, approved, or licensed anything, and it does not make an institution compliant with any standard."
        />
      </div>

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            Start with a ready to use case or bring your own standard
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Tell us which conversation you need to train. We will show you the closest published
            framework or explain how to add your institution&apos;s standard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Request a pilot
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                View ready to use conversations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
