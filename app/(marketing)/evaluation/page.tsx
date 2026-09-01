import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { WaveformBand } from "@/components/waveform-band"
import { getAllAudiences } from "@/lib/audiences"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import type { FaqItem } from "@/lib/types"

/**
 * The buyer-decision page. Every claim below traces to something already
 * published elsewhere on this site. Each section carries its source in a
 * comment, following the pattern app/(marketing)/research/page.tsx establishes.
 *
 * Three standing prohibitions apply to this file specifically:
 *
 *  1. NO new compliance facts. Nothing about SOC 2, HIPAA, BAAs, FDA, SSO, LTI,
 *     encryption, retention, subprocessors, or hosting. Section 4 is structure
 *     over the trust page's existing claims and nothing more. Deck slide 23
 *     holds cleared sentences for all of these if Ben ever asks for them.
 *  2. NO price. Section 6 is budget framing only. The list price in
 *     lib/roi/constants.public.json and the deck's average contract value both
 *     stay off the site, and no claim may be made about which approval
 *     threshold a ClinicalSim purchase sits under.
 *  3. NO research outcomes, and no description of the research portfolio's
 *     shape or independence. Both were drafted and then withdrawn on
 *     2026-08-31 at Ben's instruction. They return only once the study owners
 *     confirm the records in writing.
 */

export const metadata: Metadata = {
  title: "Evaluating ClinicalSim",
  description:
    "What ClinicalSim is for and what it is not, who owns the decision inside an institution, what the evidence establishes, what a procurement reviewer will find, what it takes to run, and how it is licensed.",
  openGraph: {
    title: "Evaluating ClinicalSim | ClinicalSim.ai",
    description:
      "The questions behind the purchase: intended use, evidence and its limits, procurement, rollout, licensing, and four scored encounters you can read without signing in.",
    url: "https://clinicalsim.ai/evaluation",
  },
  twitter: {
    title: "Evaluating ClinicalSim | ClinicalSim.ai",
    description:
      "Intended use, evidence and its limits, procurement, rollout, licensing, and what we will not claim.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/evaluation",
  },
}

const LAST_UPDATED = PAGE_DATE_MODIFIED.evaluation
const LAST_UPDATED_LABEL = "August 2026"

/**
 * Each answer has to read on its own, without its question, because an answer
 * engine lifts them one at a time. Sources match the numbered sections below.
 */
const evaluationFaqs: FaqItem[] = [
  {
    question:
      "What should a program consider before adopting an AI communication training platform?",
    answer:
      "Six questions decide it. What the platform is intended for and what it explicitly does not do; who inside the institution owns the problem and the budget, which for communication training is rarely one office; what the evidence establishes and, more usefully, what it does not; what a privacy and procurement reviewer will find, starting with whether any patient data enters the system; what it takes to run, meaning devices, encounter length, roles, and anything IT has to allow; and how it is licensed. Ask to see a complete scored encounter before any of that. A vendor who will not show you an unflattering report has not answered the question.",
  },
  {
    question: "Does ClinicalSim replace a standardized patient program?",
    answer:
      "No. ClinicalSim extends a standardized patient program rather than replacing it. SP encounters stay the high-stakes assessment and the place live coaching happens, and ClinicalSim adds repeatable practice between them without booking another actor or room. Because it is audio only, it cannot assess eye contact, body language, or physical presence, so those skills stay with live encounters and human review.",
  },
  {
    question: "Can a ClinicalSim score carry a high-stakes decision on its own?",
    answer:
      "No, and ClinicalSim does not claim it can. The communication frameworks ClinicalSim applies were built for trained human raters observing real encounters, and that is the setting in which their published reliability was established. Scoring them with AI in a simulated encounter goes beyond that setting, so a framework's reliability does not carry over to a ClinicalSim score. Each score is a formative signal backed by verbatim transcript evidence, meant to sit alongside faculty observation rather than substitute for it.",
  },
  {
    question: "Does patient data enter ClinicalSim?",
    answer:
      "No patient data enters through a case. Every patient in every ClinicalSim case is synthetic and written from the clinical literature rather than adapted from a chart, so case development needs no patient record and no de-identification step. The platform does handle learner recordings, transcripts, account data, and institutional data, and those records need protection. Voice collection is consent-gated and learners can request erasure.",
  },
  {
    question: "What does a program need in place to run ClinicalSim?",
    answer:
      "A browser and nothing else. ClinicalSim runs on any phone, tablet, or desktop with no download and no app to install, and a typical encounter takes 3 to 10 minutes. The platform currently supports English only. One thing IT may need to do is allow the voice service, because hospital firewalls, VPNs, and web filters sometimes block it; the briefing page runs a connection test that detects this and names what to ask IT to allow.",
  },
  {
    question: "How is ClinicalSim licensed and budgeted?",
    answer:
      "ClinicalSim is an annual per-learner subscription, which makes it operating expense rather than a capital purchase. That distinction usually matters more to how a purchase gets routed inside an academic medical center than the size of the number does. What a specific program pays depends on how many learners it covers, which cases it needs, and the term, so there is no list price published here.",
  },
  {
    question: "Can I see a real ClinicalSim encounter before talking to sales?",
    answer:
      "Yes. Four complete encounters are published at clinicalsim.ai/examples with the audio, the full transcript, and the entire scored report, with no sign-in and no form. They are not flattering, which is the point: the informed consent encounter scored 22 out of 30 and the vaccine hesitancy encounter scored 17 out of 25, with the weak domains named and the learner's own words quoted as the reason.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "FAQPage" as const,
  mainEntity: evaluationFaqs.map((faq) => ({
    "@type": "Question" as const,
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faq.answer,
    },
  })),
}

/**
 * Section 8, consolidated from restraint already published across the site so
 * the whole list lifts as one passage. Sources, in order: /trust section 5;
 * /methodology 2.5; /trust section 5 again; /trust section 5; CLAUDE.md
 * evidence guardrail; lib/audiences.ts risk-and-patient-safety FAQ;
 * lib/audiences.ts quality-and-patient-experience FAQ.
 */
const willNotClaim = [
  "That our scoring is more accurate or more valid than a faculty member's read. We don't have the validation data to say it, and we won't say it until we do.",
  "That a framework's published reliability transfers to an AI score. It was established with trained human raters watching real encounters, which is not what happens here.",
  "That ClinicalSim replaces a standardized patient program. It extends one.",
  "That we can price your malpractice risk or benchmark your institution against another. We do neither.",
  "A study outcome before the study's owners have confirmed the record in writing.",
  "That ClinicalSim holds an approved-course designation with any malpractice carrier. It holds none, and that approval is the carrier's decision rather than ours.",
  "Any effect on HCAHPS. No study has tested ClinicalSim against HCAHPS scores, and we claim no score-to-survey correlation.",
]

export default function EvaluationPage() {
  const audiences = getAllAudiences()

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Evaluating ClinicalSim",
            description:
              "What ClinicalSim is for and what it is not, who owns the decision inside an institution, what the evidence establishes, what a procurement reviewer will find, what it takes to run, and how it is licensed.",
            url: "https://clinicalsim.ai/evaluation",
            dateModified: LAST_UPDATED,
            publisher: {
              "@type": "Organization",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
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
                name: "Evaluating ClinicalSim",
                item: "https://clinicalsim.ai/evaluation",
              },
            ],
          },
          faqJsonLd,
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 pt-4 md:pt-6 pb-4 md:pb-6">
        <div className="absolute inset-0 bg-cs-cloud -z-10" />

        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-cs-dark-gray mb-8">
            <Link href="/" className="hover:text-cs-dark-blue/85 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-dark-blue/85">Evaluating ClinicalSim</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-4 text-cs-dark-blue">
            Evaluating <span className="font-medium">ClinicalSim</span>
          </h1>

          <p className="text-sm text-cs-dark-gray font-light mb-6">
            Last updated: {LAST_UPDATED_LABEL}
          </p>

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed mb-4 max-w-3xl">
            Most of what a program needs to decide about a platform like this
            never comes up on a product page. Who owns the problem, what the
            evidence actually supports, what a procurement reviewer will ask,
            what IT has to do, and how the thing is paid for. This page answers
            those, including the parts that don&apos;t flatter us.
          </p>

          <div className="rounded-xl border-l-4 border-cs-electric bg-cs-dark-blue px-6 py-5 max-w-3xl">
            <p className="text-base md:text-lg text-white font-light leading-relaxed">
              If you read one thing before talking to us, read a complete scored
              encounter. Four are published with audio, transcript, and the full
              report, no sign-in required, and they are not flattering.{" "}
              <Link
                href="/examples"
                className="text-cs-electric font-medium underline underline-offset-4 hover:text-white transition-colors"
              >
                See the examples
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* 1. Intended use and boundaries.
          Sources: /trust section 1 (intended use) and section 5 (product
          boundaries); /faq "Why is ClinicalSim audio-only" and
          "How is ClinicalSim different from a standardized patient program". */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            1. What it is for, and what it is{" "}
            <span className="text-cs-dark-blue font-medium">not</span> for
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            ClinicalSim is intended for clinician training and assessment. It
            produces no patient-facing output, makes no diagnostic or treatment
            recommendation, and creates no clinical documentation. What it
            produces is a rubric-scored record of how a clinician handled a
            simulated conversation, mapped to a published competency framework
            and tied to the transcript.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            It extends a standardized patient program rather than replacing one.
            SP encounters stay the high-stakes assessment and the place live
            coaching happens. ClinicalSim adds the repetitions between them.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            It does not price malpractice risk, and it does not benchmark one
            institution against another.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            It is audio only. Voice practice surfaces pacing, silence, word
            choice, and how a clinician responds to emotion in the moment. It
            cannot assess eye contact, body language, or physical presence, so
            those stay with live encounters and human review.
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 2. Who owns the problem. Driven from lib/audiences.ts so this list and
          the /audiences hub cannot disagree. */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            2. Who inside an institution{" "}
            <span className="text-cs-dark-blue font-medium">owns this</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-8">
            Communication training rarely has a single owner, which is the
            quiet reason these purchases stall. The office that feels the
            problem, the office that holds the budget, and the office that has
            to defend the decision are often three different offices. These are
            the roles ClinicalSim is built around, and each page states the case
            in that role&apos;s own terms.
          </p>

          <ul className="grid sm:grid-cols-2 gap-3">
            {audiences.map((audience) => (
              <li key={audience.slug}>
                <Link
                  href={`/audiences/${audience.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-cs-gray/60 bg-white px-5 py-4 hover:border-cs-dark-blue/40 hover:shadow-sm transition-all"
                >
                  <span className="text-base font-medium text-cs-dark-blue group-hover:text-cs-navy transition-colors">
                    {audience.title}
                  </span>
                  <span className="mt-1 text-sm text-cs-dark-blue/70 font-light leading-snug">
                    {audience.subtitle}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 3. Evidence and its limits.
          Sources: /methodology 2.5 ("What a score claims, and what it does
          not"); /trust section 5. Study outcomes and the shape of the research
          portfolio both stay off the site until the study owners confirm the
          records in writing (Ben, 2026-08-31). Do not restore either here
          without that confirmation. */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            3. What the evidence establishes, and{" "}
            <span className="text-cs-dark-blue font-medium">what it does not</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            The communication frameworks ClinicalSim applies were built for
            trained human raters observing real encounters, and that is the
            setting in which their published reliability was established.
            Scoring them with AI in a simulated encounter goes beyond that
            setting, so a framework&apos;s reliability does not carry over to a
            ClinicalSim score. Each score is a formative signal backed by
            verbatim transcript evidence, and it should not carry a high-stakes
            decision on its own.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            We don&apos;t claim our scoring is more accurate or more valid than
            a faculty member&apos;s read. We don&apos;t have the validation data
            to say that, and we won&apos;t claim it until we do. How cases are
            built and scored is documented on our{" "}
            <Link
              href="/methodology"
              className="text-cs-dark-blue font-medium hover:text-cs-navy transition-colors"
            >
              methodology page
            </Link>
            .
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Studies of ClinicalSim are underway at partner institutions, and we
            will not publish an outcome from any of them until that study&apos;s
            owners have confirmed the record in writing. What is public today is
            the conference presentation list on our{" "}
            <Link
              href="/research"
              className="text-cs-dark-blue font-medium hover:text-cs-navy transition-colors"
            >
              research page
            </Link>
            .
          </p>

          <div className="rounded-xl bg-cs-navy px-6 py-6">
            <p className="text-base md:text-lg text-white font-light leading-relaxed">
              Worth asking any vendor in this category, us included: which
              frameworks the score is built on, whether those frameworks&apos;
              published reliability was established in the setting you are
              buying for, and whether any automated score has been compared
              against blinded expert raters.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 4. Procurement and privacy. STRUCTURE ONLY over what /trust already
          publishes, plus per-organization isolation from
          /help/roles-and-permissions ("Nothing crosses organizations"). No new
          compliance facts: see the file header. */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            4. What a privacy or procurement{" "}
            <span className="text-cs-dark-blue font-medium">reviewer will find</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Every patient in every case is synthetic, written from the clinical
            literature rather than adapted from a chart. Case development needs
            no patient record and no de-identification step, so no protected
            health information enters the platform through a case.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            What the platform does handle is learner recordings, transcripts,
            account data, and institutional data, and those records need
            protection. Learners speak their side of the conversation aloud,
            which makes voice data sensitive. Voice collection is consent-gated
            and learners can request erasure. A recording exists to generate
            that learner&apos;s feedback.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Once a case is published, its case text, its rubric, and its scoring
            prompts are versioned and locked, so a program can identify the
            exact materials behind any learner&apos;s report and inspect the
            transcript evidence behind each score.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Nothing crosses organizations. Every project, learner, transcript,
            and score belongs to one organization, and no role reaches outside
            it. Inside an organization, roles decide who sees whose results:
            details are in the{" "}
            <Link
              href="/help/roles-and-permissions"
              className="text-cs-dark-blue font-medium hover:text-cs-navy transition-colors"
            >
              roles and permissions guide
            </Link>
            , and the full data-handling picture is on our{" "}
            <Link
              href="/trust"
              className="text-cs-dark-blue font-medium hover:text-cs-navy transition-colors"
            >
              trust page
            </Link>
            .
          </p>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            If your security review needs something these pages don&apos;t
            cover, ask us. We&apos;ll tell you what exists and what
            doesn&apos;t.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 5. Operational requirements.
          Sources: /faq "devices-and-install", "encounter-length", "languages",
          "faculty-monitoring"; /help/roles-and-permissions (roles, cohort
          views); lib/release-notes.ts 2026-08-07 (bulk invitations, cohort
          views, progress reports, exports) and 2026-08-03 (the connection test
          that names the blocked voice service). */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            5. What it takes to{" "}
            <span className="text-cs-dark-blue font-medium">run</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            A browser, and that is the whole list. ClinicalSim runs on any
            phone, tablet, or desktop with nothing to download and no app to
            install. A typical encounter takes 3 to 10 minutes, short enough to
            fit a clinical day and repeat as often as a learner needs. The
            platform currently supports English.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            There are four roles. Members practice and see only their own work.
            Project Managers build a cohort, assign cases, and see that
            cohort&apos;s results and nothing else. Admins see every program in
            the organization and control who belongs to it. An Owner is an Admin
            who can also close the account. Faculty review assigned
            learners&apos; progress, recordings, transcripts, and feedback
            without attending a session, and programs get cohort progress views,
            progress reports, exports, and bulk invitations.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            The one thing IT may need to do is allow the voice service. Hospital
            firewalls, VPNs, and web filters sometimes block it, which used to
            look to a learner like a slow network. The briefing page now runs a
            connection test that checks whether the network can actually reach
            the voice service and, when it can&apos;t, says so and names what to
            ask IT to allow.
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 6. Licensing. Structure of lib/roi/constants.public.json only: an
          annual per-learner subscription. NO number, and no claim about which
          approval threshold this sits under. See the file header. */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            6. How it is{" "}
            <span className="text-cs-dark-blue font-medium">licensed</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            ClinicalSim is an annual per-learner subscription. That makes it
            operating expense rather than a capital purchase, which in most
            academic medical centers matters more to how the decision gets
            routed than the size of the number does.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            There is no list price on this page, because what a program pays
            depends on how many learners it covers, which cases it needs, and
            the term. Ask us and we&apos;ll give you a number for your program
            rather than a range you have to translate.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 7. Proof before the decision. The two scores are verified against the
          rubricGrades content in lib/examples/*.ts:
          informed-consent... "Total 22/30", vaccine-hesitancy "Total 17/25". */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            7. How to see it{" "}
            <span className="text-cs-dark-blue font-medium">before deciding</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Four complete encounters are published with the audio, the full
            transcript, and the entire scored report. No sign-in, no form, no
            call first.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Read the reports before you read anything else we&apos;ve written,
            because they are not flattering. The informed consent encounter
            scored 22 out of 30, losing most of its points on assessing
            decision-making capacity. The vaccine hesitancy encounter scored 17
            out of 25 and ended weakest of all. In both, the low domains are
            named and the learner&apos;s own words are quoted as the reason.
            That is the product working, and it is a more useful thing to judge
            than a demo.
          </p>

          <Link href="/examples">
            <Button variant="default" size="lg">
              Read the four encounters
            </Button>
          </Link>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 8. Consolidated restraint. See the `willNotClaim` comment for the
          per-item sources. */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            8. What we{" "}
            <span className="text-cs-dark-blue font-medium">will not claim</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-6">
            Scattered across this site are the things we&apos;ve decided not to
            say. Collected in one place, they are probably the fastest way to
            work out whether we&apos;re worth your time.
          </p>

          <ul className="space-y-4">
            {willNotClaim.map((claim) => (
              <li
                key={claim}
                className="flex gap-4 rounded-xl border border-cs-gray/60 bg-white px-5 py-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cs-dark-blue"
                />
                <span className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                  {claim}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 9. FAQ */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            9. Questions buyers{" "}
            <span className="text-cs-dark-blue font-medium">actually ask</span>
          </h2>

          <div className="space-y-6">
            {evaluationFaqs.map((faq) => (
              <div
                key={faq.question}
                className="border border-cs-gray/50 rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
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

      {/* Final CTA */}
      <WaveformBand seed="evaluation">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Bring us the question this page didn&apos;t answer.
          </h2>
          <p className="text-lg font-light mb-8 text-white/90">
            We&apos;ll tell you what exists and what doesn&apos;t, including
            when the answer is that we haven&apos;t built it or haven&apos;t
            measured it yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Talk with us
              </Button>
            </Link>
            <Link href="/examples">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                See a scored encounter
              </Button>
            </Link>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
