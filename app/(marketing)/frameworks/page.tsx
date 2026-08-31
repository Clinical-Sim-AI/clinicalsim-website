import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { ClaimBoundary } from "@/components/claim-boundary"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import { MEASUREMENT_CLAIM } from "@/lib/positioning"

const CANONICAL = "https://clinicalsim.ai/frameworks"

const NON_ENDORSEMENT_ORGS = [
  "the ACGME",
  "AHRQ",
  "the National Quality Forum",
  "The Joint Commission",
  "the American College of Surgeons",
]

/**
 * Public, free-to-score frameworks only.
 *
 * Deliberately excluded: the NCSBN Clinical Judgment Measurement Model (posted for
 * non-commercial educational use only), the Lasater Clinical Judgment Rubric and the Casey-Fink
 * survey (copyrighted, and Casey-Fink is self-report, so scoring a transcript against it is a
 * category error), the Patient Activation Measure (proprietary to Phreesia and patient-reported),
 * and AIDET (a Huron trademark, pending counsel). Do not add any of them without a license or a
 * legal sign-off.
 */
const FRAMEWORKS: { name: string; owner: string; note: string }[] = [
  {
    name: "Braddock's elements of informed decision making",
    owner: "Published in JAMA, quoted verbatim by AHRQ",
    note: "Seven elements, from discussing the patient's role in the decision through eliciting their preference. The scale researchers already use to score recorded surgical consent conversations.",
  },
  {
    name: "CMS well-designed informed consent process",
    owner: "CMS interpretive guidelines, public domain",
    note: "Names the material risks, the alternatives, the consequences of declining, and who will perform which parts of the operation. Every element is a spoken behavior.",
  },
  {
    name: "AHRQ ten strategies for informed consent",
    owner: "AHRQ, developed with The Joint Commission",
    note: "Prepare, use health literacy universal precautions, remove language barriers, use teach-back, offer choices, elicit goals and values, and seven more. Behavioral, named, and co-authored by the accreditor.",
  },
  {
    name: "AHRQ SHARE approach",
    owner: "AHRQ, public domain",
    note: "Five steps of shared decision making: seek participation, help explore and compare options, assess values, reach a decision together, evaluate the decision.",
  },
  {
    name: "NQF Safe Practice on disclosure",
    owner: "National Quality Forum, public",
    note: "Names what a disclosure conversation contains, including an explicit expression of regret, a commitment to investigate, and feedback of the result. It also says the skill should be practiced.",
  },
  {
    name: "AHRQ CANDOR",
    owner: "AHRQ, public domain",
    note: "Eight modules across three phases, including response and disclosure communication and care for the caregiver.",
  },
  {
    name: "TeamSTEPPS Team Performance Observation Tool",
    owner: "AHRQ, public domain",
    note: "Twenty-five behavioral items across five sections, plus named speech acts a transcript can verify were said: SBAR, check-back, call-out, CUS, the two-challenge rule, DESC.",
  },
  {
    name: "OPTION-12",
    owner: "Elwyn et al., published in full",
    note: "Twelve observer-rated shared decision making behaviors on a 0 to 100 scale. Observer-scored, so it works on a transcript.",
  },
  {
    name: "Four Habits Coding Scheme",
    owner: "Krupat et al., published in full",
    note: "Twenty-three items on a five-point scale covering investing in the beginning, eliciting the patient's perspective, demonstrating empathy, and investing in the end.",
  },
  {
    name: "HCAHPS and CG-CAHPS item wording",
    owner: "CMS and AHRQ, public domain",
    note: "The exact questions a hospital is measured on, including listening carefully, explaining things in a way the patient could understand, and describing medication side effects.",
  },
  {
    name: "ACGME Milestones 2.0, interpersonal and communication skills",
    owner: "ACGME, published per specialty",
    note: "The subcompetency language a Clinical Competency Committee already uses. Cases map to it; scores read in the same words as the committee's own report.",
  },
  {
    name: "CMS community health integration and navigation competencies",
    owner: "CMS, CY2024 Physician Fee Schedule rule",
    note: "Seven named competencies for auxiliary personnel, the first of which is patient and family communication. CMS names them and names no curriculum, assessment, or passing standard.",
  },
]

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What does scoring against our own framework actually require from us?",
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
      "Most scoring platforms grade against content and rubrics the vendor wrote. That produces a number the vendor can defend and a program cannot report on, because it does not match the standard the program is already accountable for. Scoring against the customer's own element definitions produces a number that goes straight into the report the program already writes.",
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
  title: { absolute: "Scored against your framework" },
  description:
    "Send your element definitions and get those definitions back as scores, per clinician, with the line that earned each one quoted underneath. Covers the scope rule and the public frameworks ClinicalSim scores against today.",
  openGraph: {
    title: "Scored against your framework | ClinicalSim.ai",
    description:
      "Your element definitions, scored verbatim against a spoken clinical conversation, per person, with the clinician's own words under every score.",
    url: CANONICAL,
  },
  twitter: {
    title: "Scored against your framework | ClinicalSim.ai",
    description:
      "Your element definitions, scored verbatim against a spoken clinical conversation, per person, with the clinician's own words under every score.",
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
      name: "Scored against your framework",
      description:
        "How ClinicalSim scores a spoken clinical conversation against a customer's own element definitions, and the public frameworks it scores against today.",
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
      name: "Communication frameworks ClinicalSim scores against",
      description:
        "Public, named element frameworks that a spoken clinical conversation can be scored against element by element.",
      url: CANONICAL,
      hasDefinedTerm: FRAMEWORKS.map((framework) => ({
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

      {/* Hero */}
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
            Scored against{" "}
            <span className="text-cs-electric font-medium">your framework</span>
          </h1>

          <p className="text-lg md:text-xl text-cs-cloud font-light leading-relaxed mb-8 max-w-3xl">
            Send us the element definitions you already use, in the words you already use, and we
            score a spoken clinical conversation against them element by element, per clinician,
            with the line that earned each score quoted underneath. An element is scored only where
            the case gave the clinician a chance to show it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Send us your framework
              </Button>
            </Link>
            <Link href="/methodology">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                How cases are built
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The gap */}
      <SectionDivider variant="diagonal-down" color="white" />

      <section className="px-6 py-8 md:py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            The frameworks exist. The measurement does not.
          </h2>

          <div className="bg-cs-cloud rounded-2xl p-8 mb-8">
            <p className="text-lg md:text-xl text-cs-dark-blue font-light leading-relaxed">
              Health care has spent thirty years writing communication frameworks and almost no
              time building instruments to measure whether anyone follows them. A named framework
              exists, usually from an accreditor or a federal agency. It has elements. Hospitals
              train against it, print it on badge cards, and put it in onboarding. Nobody scores an
              individual clinician against it, because the only available measurement is a patient
              survey, and a survey comment never carries the name of the clinician it describes. So
              the framework is a poster, the measurement is a population average, and there is
              nothing in between.
            </p>
          </div>

          <p className="text-lg text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            {MEASUREMENT_CLAIM} That is the thing sitting in the gap, and the standard is whatever
            you already report on.
          </p>
          <p className="text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            ACGME Milestones 2.0 was the first standard we scored against, because graduate medical
            education is where a measurement obligation is written into accreditation and someone
            is already paying for standardized patients. It is not the only place that obligation
            exists.
          </p>
        </div>
      </section>

      {/* How it works */}
      <SectionDivider variant="wave" color="cloud" />

      <section className="px-6 py-8 md:py-12 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            How it works
          </h2>

          <div className="space-y-5">
            {[
              {
                step: "Your definitions, unedited",
                body: "You send the document you already use: a consent policy, an escalation policy, a preceptor rubric, a disclosure standard. We take its element names and its element definitions as written. We do not paraphrase them into a rubric of ours, and where an element is ambiguous we ask you what you meant.",
              },
              {
                step: "One score per element",
                body: "A clinician speaks with an AI patient. The conversation is scored element by element against your definitions, not against a global impression of how it went. A report shows each element, its score, and where the total came from.",
              },
              {
                step: "The clinician's own words under every score",
                body: "Each element score carries the line from the transcript that earned it. A faculty member reading the report can disagree with the score and still see exactly what it was responding to, which is the difference between feedback and a verdict.",
              },
              {
                step: "Out of scope, not marked down",
                body: "An element is scored only where the case gave the clinician a chance to show it. Every report states how many elements were excluded, so nobody is penalized for a behavior the scenario never called for.",
              },
              {
                step: "Per person, and again later",
                body: "Scores report per clinician and per cohort, and the same clinician can be re-measured against the same baseline after practice. Survey and complaint data cannot do either, because the comment does not attach to a person.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border-l-4 border-l-cs-electric border border-cs-gray/50 px-6 py-5"
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
        </div>
      </section>

      {/* The scope rule */}
      <SectionDivider variant="diagonal-up" color="white" />

      <section className="px-6 py-8 md:py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            The scope rule, stated as a rule
          </h2>

          <blockquote className="border-l-4 border-l-cs-navy pl-6 mb-8">
            <p className="text-xl md:text-2xl text-cs-dark-blue font-light leading-relaxed">
              An element is scored only where the conversation gave the clinician a chance to show
              it. Elements the case never raised are marked out of scope and excluded from the
              total, and the report says how many.
            </p>
          </blockquote>

          <p className="text-lg text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            This is the answer to the objection that ends most AI scoring pilots in the first
            faculty meeting: you marked my attending down for something the case never asked for.
            Once a rubric scores every element every time, a low total stops meaning anything, and
            the people whose judgment the program depends on stop trusting the report.
          </p>
          <p className="text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            Applying it costs something, because deciding whether a case created an opportunity is
            a judgment made before scoring rather than a filter applied after. Most vendors will
            not carry that cost, which is why almost nobody states the rule.
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
            <blockquote className="border-l-4 border-l-cs-electric pl-5 mb-6">
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

      {/* Framework list */}
      <SectionDivider variant="diagonal-up" color="white" />

      <section className="px-6 py-8 md:py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4">
            Public frameworks we score against today
          </h2>
          <p className="text-lg text-cs-dark-blue/70 font-light mb-8 max-w-2xl">
            These are published at element level and free to score against, so they need nothing
            from you. Most of what we actually score is institution-specific, because a surveyor
            checks whether your staff followed your policy.
          </p>

          <div className="space-y-4">
            {FRAMEWORKS.map((framework) => (
              <div
                key={framework.name}
                className="border border-cs-gray/50 rounded-xl px-6 py-5"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-lg font-medium text-cs-dark-blue">
                    {framework.name}
                  </h3>
                  <span className="text-sm text-cs-dark-gray font-light">
                    {framework.owner}
                  </span>
                </div>
                <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                  {framework.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-cs-cloud rounded-2xl p-8">
            <h3 className="text-xl font-medium text-cs-dark-blue mb-3">
              If yours is not here, send it
            </h3>
            <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-5">
              Bring the document your staff are already measured against. We will tell you which
              elements a spoken conversation can evidence, which ones it cannot, and why, before
              you commit to anything.
            </p>
            <Link href="/contact">
              <Button variant="default" size="lg">
                Send us your framework
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <SectionDivider variant="wave" color="cloud" />

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

      <ClaimBoundary
        nonEndorsementOrgs={NON_ENDORSEMENT_ORGS}
        showFormative
        showRaterValidation
        note="Naming a framework here describes what the engine can score against. It does not mean the framework's owner has reviewed, approved, or licensed anything, and it does not make an institution compliant with any standard."
      />

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            Bring us the standard you already report on
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            We will show you what a scored conversation against it looks like, element by element,
            before you commit to a pilot.
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
                See the conversations we score
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
