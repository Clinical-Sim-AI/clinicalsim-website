import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { CopyLinkButton } from "@/components/copy-link-button"
import { slugify } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Program Director FAQ: Feedback, Practice Cadence & Evidence",
  description:
    "How to read a ClinicalSim feedback report, how many times a learner should run a scenario, spaced-practice cadence for skill acquisition, and how to prevent skill decay, grounded in mastery-learning and communication-training research.",
  openGraph: {
    title: "Program Director FAQ | ClinicalSim.ai",
    description:
      "Feedback interpretation, practice cadence, and the evidence behind ClinicalSim's approach to communication skill acquisition and maintenance, for program directors, DIOs, and simulation leads.",
    url: "https://clinicalsim.ai/program-director-faq",
  },
  twitter: {
    title: "Program Director FAQ | ClinicalSim.ai",
    description:
      "Feedback interpretation, practice cadence, and the evidence behind ClinicalSim's approach to communication skill acquisition and maintenance.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/program-director-faq",
  },
}

const LAST_UPDATED_ISO = "2026-07-05"
const LAST_UPDATED_LABEL = "July 5, 2026"

interface PdFaqSection {
  question: string
  // Plain-text answer for FAQPage JSON-LD. Must match the visible body copy
  // (minus link markup and evidence-detail asides).
  answer: string
  node: ReactNode
}

const linkClass =
  "text-cs-dark-blue underline underline-offset-2 hover:text-cs-navy"

function EvidenceDetail({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 border border-cs-gray/50 rounded-xl overflow-hidden">
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer px-6 py-4 bg-cs-cloud/40 hover:bg-cs-cloud/60 transition-colors">
          <span className="text-sm font-medium text-cs-dark-blue">
            Evidence detail
          </span>
          <ChevronRight className="w-4 h-4 text-cs-gray flex-shrink-0 transition-transform group-open:rotate-90" />
        </summary>
        <div className="px-6 pb-5 pt-3 text-sm text-cs-dark-blue/85 font-light leading-relaxed">
          <ul className="list-disc space-y-3 pl-5">{children}</ul>
        </div>
      </details>
    </div>
  )
}

const sections: PdFaqSection[] = [
  {
    question: "How should I read the feedback?",
    answer:
      "How you read a report matters as much as what it says: treat it as evidence, not a verdict. Every encounter produces one feedback report, and every score in it traces back to a verbatim line from the transcript, not an unexplained rating. The report opens with an overall impression (strengths, priority gaps, top action items) and then gives targeted recommendations. For GME cases, that means a milestone placement on the Dreyfus scale, read against the specialty's own verbatim level descriptors. For UME cases, there's no numeric level since the Foundational Competencies weren't published with one. Instead the report records whether each competency was demonstrated and scores performance through whichever communication rubric was applied. Treat the milestone-aligned score as evidence for your Clinical Competency Committee discussion, not a stand-alone verdict. The ACGME milestones are formative and weren't designed for high-stakes decisions, so ClinicalSim doesn't use them that way either. The full standards-alignment logic, including how level descriptors and rubrics are applied, is documented on the methodology page.",
    node: (
      <>
        <p className="font-medium text-cs-navy">
          How you read a report matters as much as what it says: treat it
          as evidence, not a verdict.
        </p>
        <p>
          Every encounter produces one{" "}
          <Link href="/faq#feedback-report" className={linkClass}>
            feedback report
          </Link>
          , and every score in it traces back to a verbatim line from the
          transcript, not an unexplained rating. The report opens with an
          overall impression (strengths, priority gaps, top action items) and
          then gives targeted recommendations. For GME cases, that means a
          milestone placement on the Dreyfus scale, read against the
          specialty&apos;s own verbatim level descriptors. For UME cases,
          there&apos;s no numeric level since the Foundational Competencies
          weren&apos;t published with one. Instead the report records whether
          each competency was demonstrated and scores performance through
          whichever communication rubric was applied.
        </p>
        <p>
          Treat the milestone-aligned score as evidence for your Clinical
          Competency Committee discussion, not a stand-alone verdict. The
          ACGME milestones are formative and weren&apos;t designed for
          high-stakes decisions, so ClinicalSim doesn&apos;t use them that way
          either. The full standards-alignment logic, including how level
          descriptors and rubrics are applied, is documented on the{" "}
          <Link href="/methodology" className={linkClass}>
            methodology page
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    question: "How does ClinicalSim determine feedback?",
    answer:
      "Each case is a voice conversation between the learner and an AI role built for that case, recorded as a timestamped transcript. For every scored competency and framework step, the platform pulls one or two verbatim excerpts that show the behavior, or notes that it didn't happen. That's what makes each score traceable to a specific moment instead of a black box. Scoring runs on two tracks that stay separate. The competency framework (ACGME Milestones 2.0 for GME, the Foundational Competencies for UME) reflects where the learner sits developmentally. Communication frameworks like SPIKES or Calgary-Cambridge, plus any rubric your program already uses, score the specific technique independently. Both show up together with their evidence, so you see the full picture. The methodology page walks through this process end to end, from case creation to how each score is generated.",
    node: (
      <>
        <p>
          Each case is a voice conversation between the learner and an AI role
          built for that case, recorded as a timestamped transcript. For
          every scored competency and framework step, the platform pulls{" "}
          <Link href="/faq#evidence-capture" className={linkClass}>
            one or two verbatim excerpts
          </Link>{" "}
          that show the behavior, or notes that it didn&apos;t happen.
          That&apos;s what makes each score traceable to a specific moment
          instead of a black box.
        </p>
        <p>
          Scoring runs on two tracks that stay separate. The competency
          framework (ACGME Milestones 2.0 for GME, the Foundational
          Competencies for UME) reflects where the learner sits
          developmentally.{" "}
          <Link href="/faq#framework-vs-rubric" className={linkClass}>
            Communication frameworks like SPIKES or Calgary-Cambridge
          </Link>
          , plus any rubric your program already uses, score the specific
          technique independently. Both show up together with their
          evidence, so you see the full picture. The{" "}
          <Link href="/methodology" className={linkClass}>
            methodology page
          </Link>{" "}
          walks through this process end to end, from case creation to how
          each score is generated.
        </p>
      </>
    ),
  },
  {
    question:
      "Is there an expectation for how many times a learner runs a scenario?",
    answer:
      "Neither ClinicalSim nor the mastery learning literature sets a fixed number, and the communication-skills evidence argues against picking one. McGaghie and colleagues describe simulation-based mastery learning as outcomes-based, not time-based or repetition-based: learners practice and get reassessed until they clear a minimum passing standard, and how many attempts that takes differs learner to learner. No study establishes a novice-to-competent rep count for a purely interpersonal skill, so any \"run it five times\" rule would be invented rather than evidenced. Two findings shape how we think about the number instead. The first is that competence in communication is scenario-specific: performance on one case predicts performance on another only weakly, so breadth across varied scenarios matters more than depth on a single one. The second is that learners can't reliably judge their own competence, which is why the standard has to be an observed, objective one rather than a learner's sense of \"I've got this.\" Repetition still matters (Issenberg's BEME review found repetitive practice was the second most cited feature of effective simulation-based learning, present in 39% of studies, right behind feedback), but it's repetition across cases, measured against a rubric, that does the work. So the expectation isn't a rep count. It's \"keep practicing across varied cases until performance holds up against the standard, then come back before it slips.\" Most programs couldn't run cases to that standard before now, because standardized patient scheduling and faculty time capped how many reps a learner could get. That's the ceiling ClinicalSim removes. For the pilot, we recommend being prescriptive about this. Each learner should take every case assigned to them and keep retaking each one until they meet the minimum standard for their PGY year. The logic is the same one your program already applies to procedures: you wouldn't clear a resident to move on from a central line or an intubation until they'd shown they could do it to standard, and we think communication deserves the same treatment. Milestone level descriptors for the PGY year set the bar, the feedback report shows where the learner sits against it, and progression follows the standard rather than the number of attempts.",
    node: (
      <>
        <p>
          Neither ClinicalSim nor the mastery learning literature sets a
          fixed number, and the communication-skills evidence argues against
          picking one. McGaghie and colleagues describe simulation-based
          mastery learning as outcomes-based, not time-based or
          repetition-based: learners practice and get reassessed until they
          clear a minimum passing standard, and how many attempts that takes
          differs learner to learner. No study establishes a
          novice-to-competent rep count for a purely interpersonal skill, so
          any &quot;run it five times&quot; rule would be invented rather
          than evidenced.
        </p>
        <p>
          Two findings shape how we think about the number instead. The
          first is that competence in communication is scenario-specific:
          performance on one case predicts performance on another only
          weakly, so breadth across varied scenarios matters more than depth
          on a single one. The second is that learners can&apos;t reliably
          judge their own competence, which is why the standard has to be an
          observed, objective one rather than a learner&apos;s sense of
          &quot;I&apos;ve got this.&quot; Repetition still matters
          (Issenberg&apos;s BEME review found repetitive practice was the
          second most cited feature of effective simulation-based learning,
          present in 39% of studies, right behind feedback), but it&apos;s
          repetition across cases, measured against a rubric, that does the
          work.
        </p>
        <p>
          So the expectation isn&apos;t a rep count. It&apos;s &quot;keep
          practicing across varied cases until performance holds up against
          the standard, then come back before it slips.&quot; Most programs
          couldn&apos;t run cases to that standard before now, because
          standardized patient scheduling and faculty time capped how many
          reps a learner could get. That&apos;s the ceiling ClinicalSim
          removes.
        </p>
        <p>
          For the pilot, we recommend being prescriptive about this. Each
          learner should take every case assigned to them and keep retaking
          each one until they meet the minimum standard for their PGY year.
          The logic is the same one your program already applies to
          procedures: you wouldn&apos;t clear a resident to move on from a
          central line or an intubation until they&apos;d shown they could do
          it to standard, and we think communication deserves the same
          treatment. Milestone level descriptors for the PGY year set the
          bar, the feedback report{" "}
          <Link href="/faq#my-progress" className={linkClass}>
            shows where the learner sits against it
          </Link>
          , and progression follows the standard rather than the number of
          attempts.
        </p>
        <EvidenceDetail>
          <li>
            <strong>Case-specificity.</strong> Guiton and colleagues (N=567
            final-year students, 7-station OSCE) found the student-by-case
            interaction accounted for roughly 50% of variance: high internal
            consistency within a station (Cronbach&apos;s alpha 0.89 to 0.94)
            but low reliability across cases. Swanson and Norcini estimated
            about 24 twenty-minute standardized-patient stations (~8 hours)
            to reliably assess communication and information-gathering
            skill; Gruppen and colleagues found a 12-station OSCE gave
            reliability near 0.60, needing roughly 20 stations for defensible
            reliability. The field frames &quot;dose&quot; as assessment
            reliability, not a learning plateau.
          </li>
          <li>
            <strong>Self-assessment is unreliable.</strong> Miller and Mount
            (2001) found clinicians&apos; self-rated motivational
            interviewing ability barely tracked their actual ability (r =
            .17 to .33, occasionally negative). This is the direct case for
            an objective, observed benchmark.
          </li>
          <li>
            <strong>Repetition as a feature of effective simulation.</strong>{" "}
            Issenberg and colleagues (2005 BEME systematic review) found
            repetitive practice present in 39% of reviewed studies, second
            only to feedback.
          </li>
          <li>
            <strong>Caveat.</strong> The reps-to-competence gap is real: no
            primary source plots a communication learning curve to an
            empirical plateau, so this answer is anchored to proficiency
            deliberately rather than to a number we can&apos;t defend.
          </li>
        </EvidenceDetail>
      </>
    ),
  },
  {
    question:
      "How often should a learner practice while first building a skill?",
    answer:
      "For acquisition, the defensible cadence is spaced, coached practice distributed across days over several weeks, not a single crammed workshop. A workable default is two to three coached, feedback-rich scenario sessions per week for three to six weeks, each covering varied cases rather than the same one repeated. Three things support that shape. Spacing helps during learning itself and not just for later recall, the benefit holds up in real classrooms, and deliberate practice with feedback (individualized, coach-designed, at the edge of ability) is the active ingredient rather than mere exposure. The number of weeks is a starting point, not a law. Gate progression to the proficiency standard, not to the calendar: a learner is done acquiring when they clear the rubric across varied cases. If in-product data show most learners plateau before three weeks, the block should shorten; if most still fail the standard at six weeks, the standard or the scenario difficulty needs recalibration.",
    node: (
      <>
        <p>
          For acquisition, the defensible cadence is spaced, coached practice
          distributed across days over several weeks, not a single crammed
          workshop. A workable default is two to three coached,
          feedback-rich scenario sessions per week for three to six weeks,
          each covering varied cases rather than the same one repeated.
          Three things support that shape. Spacing helps during learning
          itself and not just for later recall, the benefit holds up in real
          classrooms, and deliberate practice with feedback (individualized,
          coach-designed, at the edge of ability) is the active ingredient
          rather than mere exposure.
        </p>
        <p>
          The number of weeks is a starting point, not a law. Gate
          progression to the proficiency standard, not to the calendar: a
          learner is done acquiring when they clear the rubric across varied
          cases. If in-product data show most learners plateau before three
          weeks, the block should shorten; if most still fail the standard
          at six weeks, the standard or the scenario difficulty needs
          recalibration.
        </p>
        <EvidenceDetail>
          <li>
            <strong>Spacing helps acquisition as well as retention.</strong>{" "}
            Donovan and Radosevich (1999, meta-analysis of 63 studies / 112
            effect sizes) found an overall spaced-practice advantage of d =
            0.46, with d = 0.45 for acquisition and d = 0.51 for retention
            (statistically indistinguishable). Mawson and Kang (2025, 22
            classroom studies, N &gt; 3000) found d = 0.54 (95% CI 0.31 to
            0.77) favoring distributed practice in real classrooms.
          </li>
          <li>
            <strong>Deliberate practice is the mechanism.</strong> Larsson
            and colleagues (2023) RCT (N=36 novice health/psychology
            students, 2 sessions) found the deliberate-practice group gained
            significantly in expressed empathy while a didactic group did
            not. Workshops alone fade: Schwalbe and colleagues (2014)
            measured a training gain of d = 0.76 that eroded to d = -0.30
            over six months without coaching.
          </li>
          <li>
            <strong>Two important limits.</strong> Task complexity
            attenuates the spacing benefit (Donovan and Radosevich found
            complexity negatively correlated with the effect, r = -0.25),
            and interpersonal skill is high-complexity, so expect
            smaller-than-headline effects. And deliberate practice explains
            little variance in professional performance (under 1% in
            Macnamara and colleagues&apos; 2014 &quot;professions&quot;
            category), so cadence is necessary but not sufficient. The
            specific week count here is the weakest-sourced element and is
            best treated as a testable default.
          </li>
        </EvidenceDetail>
      </>
    ),
  },
  {
    question:
      "Once a learner is proficient, how do we keep the skill from decaying?",
    answer:
      "Communication skills demonstrably decay within about six months without reinforcement, and coaching is what prevents it. The cleanest number in the literature comes from motivational-interviewing research: three to four feedback or coaching sessions over six months, totaling roughly five hours, move a skill from erosion back to maintenance. That maps to one coached maintenance scenario every four to eight weeks across the first six months, then a taper toward one every two to three months if proficiency holds. Cognitive-psychology spacing research points independently to the same range, which is a striking convergence for a field this heterogeneous. Which sub-skill decays depends on what the learner's real-world environment reinforces, so maintenance practice should preferentially re-target whatever the clinic fails to keep sharp, often the warmer, emotionally demanding skills for busy clinicians. And the time-based schedule is only a fallback: whenever an in-product assessment shows performance below standard, re-trigger a short acquisition-style block. If scores hold at or above standard at three months with no touch, lengthen the interval; if they drop by a standard deviation or more before the next scheduled touch, shorten it.",
    node: (
      <>
        <p>
          Communication skills demonstrably decay within about six months
          without reinforcement, and coaching is what prevents it. The
          cleanest number in the literature comes from
          motivational-interviewing research: three to four feedback or
          coaching sessions over six months, totaling roughly five hours,
          move a skill from erosion back to maintenance. That maps to one
          coached maintenance scenario every four to eight weeks across the
          first six months, then a taper toward one every two to three
          months if proficiency holds. Cognitive-psychology spacing research
          points independently to the same range, which is a striking
          convergence for a field this heterogeneous.
        </p>
        <p>
          Which sub-skill decays depends on what the learner&apos;s
          real-world environment reinforces, so maintenance practice should
          preferentially re-target whatever the clinic fails to keep sharp,
          often the warmer, emotionally demanding skills for busy
          clinicians. And the time-based schedule is only a fallback:
          whenever an in-product assessment shows performance below
          standard, re-trigger a short acquisition-style block. If scores
          hold at or above standard at three months with no touch, lengthen
          the interval; if they drop by a standard deviation or more before
          the next scheduled touch, shorten it.
        </p>
        <EvidenceDetail>
          <li>
            <strong>The MI maintenance number.</strong> Schwalbe, Oh and
            Zweben (2014, meta-analysis of 21 MI training studies): training
            gain d = 0.76; without coaching, skills eroded (d = -0.35 at 3
            months, d = -0.30 at 6 months); with post-workshop
            feedback/coaching, skills were sustained (d ~ 0.03). The authors
            conclude that on average three to four feedback/coaching
            sessions over six months sustain MI skills, with commentary
            specifying roughly five hours of expert coaching on
            audio-recorded sessions. This is the single most
            decision-relevant number in the review.
          </li>
          <li>
            <strong>The spacing math agrees.</strong> Cepeda and colleagues
            (2008, &gt;1,350 participants) found the optimal review gap
            declined as a proportion of the retention interval, from about
            20 to 40% of a one-week delay to about 5 to 10% of a one-year
            delay. Practically, a 6-to-12-month retention horizon implies
            review gaps of roughly one to two months.
          </li>
          <li>
            <strong>Uneven, context-dependent decay.</strong> Fallowfield
            and colleagues (2003, RCT, N=160 UK oncologists) found that 15
            months after a single 3-day course with no booster, structural
            skills persisted (interruptions fell 32 to 6; summarising rose)
            while empathy expressions declined (3.22 to 1.49). Taveira-Gomes
            and colleagues (2016) found the mirror-image pattern in students
            whose clerkships reinforced empathy but not interview structure.
            The lesson is to re-target what the environment
            under-reinforces.
          </li>
          <li>
            <strong>General procedural decay timing.</strong> Legoux and
            colleagues (2021) found significant decline in critical
            procedural skill as early as three months, clearer by twelve.
            Sullivan and colleagues (2019) recommend a booster around six
            months in a low-dose, high-frequency model built to pre-empt
            decay rather than wait for it.
          </li>
        </EvidenceDetail>
      </>
    ),
  },
  {
    question: "What does the evidence not yet establish?",
    answer:
      "We'd rather be straight about the limits than oversell the numbers. The biggest one is a domain-transfer gap: almost all of the quantitative cadence and decay figures come from procedural skills, fact learning, or motivational interviewing specifically, not from breaking bad news, goals-of-care conversations, or general interpersonal skill. Applying MI's six-month maintenance schedule to those harder conversations is a reasoned extrapolation, not a measured result, so we present cadences as proficiency-anchored defaults tuned by in-product performance data rather than as settled facts. Two smaller limits matter too. There's no published rep count for reaching competence on a purely interpersonal skill, which is why the acquisition cadence is a starting hypothesis rather than a proven dose. And the results are genuinely mixed in places: which sub-skill decays runs in opposite directions across studies, and not every retention study shows decay by six months. The honest read is that the direction of the evidence is clear (space it, coach it, reassess it) while the exact numbers deserve the humility of a default you keep testing.",
    node: (
      <>
        <p>
          We&apos;d rather be straight about the limits than oversell the
          numbers. The biggest one is a domain-transfer gap: almost all of
          the quantitative cadence and decay figures come from procedural
          skills, fact learning, or motivational interviewing specifically,
          not from breaking bad news, goals-of-care conversations, or
          general interpersonal skill. Applying MI&apos;s six-month
          maintenance schedule to those harder conversations is a reasoned
          extrapolation, not a measured result, so we present cadences as
          proficiency-anchored defaults tuned by in-product performance data
          rather than as settled facts.
        </p>
        <p>
          Two smaller limits matter too. There&apos;s no published rep count
          for reaching competence on a purely interpersonal skill, which is
          why the acquisition cadence is a starting hypothesis rather than a
          proven dose. And the results are genuinely mixed in places: which
          sub-skill decays runs in opposite directions across studies, and
          not every retention study shows decay by six months. The honest
          read is that the direction of the evidence is clear (space it,
          coach it, reassess it) while the exact numbers deserve the
          humility of a default you keep testing.
        </p>
      </>
    ),
  },
  {
    question: "How long does a typical case take?",
    answer:
      "A typical case takes between three and ten minutes. It's a single voice encounter captured as one transcript, not a multi-hour simulation block, and length varies with the complexity of the conversation the case is built to exercise. There's no scheduling step and no standardized patient to coordinate, which is exactly what lets a learner run a case again the same day if they need another rep.",
    node: (
      <p>
        A typical case takes{" "}
        <Link href="/faq#encounter-length" className={linkClass}>
          between three and ten minutes
        </Link>
        . It&apos;s a single voice encounter captured as one transcript, not
        a multi-hour simulation block, and length varies with the complexity
        of the conversation the case is built to exercise. There&apos;s no
        scheduling step and no standardized patient to coordinate, which is
        exactly what lets a learner run a case again the same day if they
        need another rep.
      </p>
    ),
  },
]

export default function ProgramDirectorFaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: sections.map((section) => ({
      "@type": "Question" as const,
      name: section.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: section.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ClinicalSim.ai FAQ for Program Directors",
            description:
              "Questions program directors, DIOs, and simulation leads ask once they've seen a feedback report: how to read it, how many times a learner should run a scenario, spaced-practice cadence, and how to prevent skill decay.",
            url: "https://clinicalsim.ai/program-director-faq",
            dateModified: LAST_UPDATED_ISO,
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
                name: "Program Director FAQ",
                item: "https://clinicalsim.ai/program-director-faq",
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
            <span className="text-cs-dark-blue/85">Program Director FAQ</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-6 text-cs-dark-blue">
            FAQ for{" "}
            <span className="font-medium">program directors</span>
          </h1>

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed max-w-3xl">
            Questions we hear most from program directors, DIOs, and
            simulation leads once they&apos;ve seen a feedback report and
            started thinking about how to build ClinicalSim into a rotation
            or remediation plan.
          </p>

          <p className="mt-6 text-sm text-cs-dark-gray">
            Last updated {LAST_UPDATED_LABEL}
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Jump links */}
      <section className="px-6 pt-8 md:pt-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <a
                key={section.question}
                href={`#${slugify(section.question)}`}
                className="text-sm px-3 py-1.5 rounded-full font-medium border border-cs-gray/50 text-cs-dark-blue/80 hover:border-cs-electric/40 hover:text-cs-dark-blue transition-colors"
              >
                {section.question}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto space-y-14">
          {sections.map((section) => (
            <div
              key={section.question}
              id={slugify(section.question)}
              className="scroll-mt-24"
            >
              <h2 className="flex items-start gap-2 text-2xl md:text-3xl font-light text-cs-navy mb-5">
                <span>{section.question}</span>
                <CopyLinkButton
                  id={slugify(section.question)}
                  label={`Copy link to "${section.question}"`}
                  className="mt-2"
                />
              </h2>
              <div className="text-base text-cs-dark-blue font-light leading-relaxed space-y-4">
                {section.node}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sources */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-medium text-cs-dark-blue mb-4">
            Sources
          </h2>
          <ul className="text-sm text-cs-dark-blue/80 font-light leading-relaxed space-y-2 list-disc pl-5">
            <li>
              ClinicalSim.ai.{" "}
              <Link href="/methodology" className={linkClass}>
                Methodology: case creation, standards alignment, and feedback
                generation
              </Link>
              . Last updated July 2026.
            </li>
            <li>
              ClinicalSim.ai.{" "}
              <Link href="/faq" className={linkClass}>
                Frequently asked questions
              </Link>
              .
            </li>
            <li>
              McGaghie WC, Issenberg SB, Barsuk JH, Wayne DB. A critical
              review of simulation-based mastery learning with translational
              outcomes. <em>Med Educ.</em> 2014;48(4):375-385.
            </li>
            <li>
              Issenberg SB, McGaghie WC, Petrusa ER, Gordon DL, Scalese RJ.
              Features and uses of high-fidelity medical simulations that
              lead to effective learning: a BEME systematic review.{" "}
              <em>Med Teach.</em> 2005;27(1):10-28.
            </li>
            <li>
              Donovan JJ, Radosevich DJ. A meta-analytic review of the
              distribution of practice effect. <em>J Appl Psychol.</em>{" "}
              1999;84(5):795-805.
            </li>
            <li>
              Cepeda NJ, Vul E, Rohrer D, Wixted JT, Pashler H. Spacing
              effects in learning: a temporal ridgeline of optimal
              retention. <em>Psychol Sci.</em> 2008;19(11):1095-1102.
            </li>
            <li>
              Mawson C, Kang SHK. Distributed practice in the classroom: a
              meta-analysis. <em>Behav Sci.</em> 2025;15(6):771.
            </li>
            <li>
              Schwalbe CS, Oh HY, Zweben A. Sustaining motivational
              interviewing: a meta-analysis of training studies.{" "}
              <em>Addiction.</em> 2014;109(8):1287-1294.
            </li>
            <li>
              Fallowfield L, Jenkins V, Farewell V, Solis-Trapala I. Enduring
              impact of communication skills training: results of a
              12-month follow-up. <em>Br J Cancer.</em> 2003;89:1445-1449.
            </li>
            <li>
              Taveira-Gomes I, Mota-Cardoso R, Figueiredo-Braga M.{" "}
              <em>Porto Biomed J.</em> 2016;1(5):173-180.
            </li>
            <li>
              Larsson, Broberg, Kaldo. Does deliberate practice surpass
              didactic training in learning empathy skills? A randomized
              controlled study. <em>Nordic Psychology.</em> 2023.
            </li>
            <li>
              Macnamara BN, Hambrick DZ, Oswald FL. Deliberate practice and
              performance in music, games, sports, education, and
              professions: a meta-analysis. <em>Psychol Sci.</em>{" "}
              2014;25:1608-1618.
            </li>
            <li>
              Miller WR, Mount KA. A small study of training in motivational
              interviewing: does one workshop change clinician and client
              behavior? <em>Behav Cogn Psychother.</em> 2001;29(4):457-471.
            </li>
            <li>
              Guiton G, Hodgson CS, Delandshere G, Wilkerson L. Communication
              skills in standardized-patient assessment of final-year
              medical students: a psychometric study.{" "}
              <em>Adv Health Sci Educ.</em> 2004;9:179-187.
            </li>
            <li>
              Legoux C, Gerein R, Boutis K, Barrowman N, Plint A. Retention
              of critical procedural skills after simulation training: a
              systematic review. <em>AEM Educ Train.</em> 2021;5:e10536.
            </li>
            <li>
              Sullivan A, Elshenawy S, Ades A, Sawyer T. Acquiring and
              maintaining technical skills using simulation: initial,
              maintenance, booster, and refresher training. <em>Cureus.</em>{" "}
              2019;11(9):e5729.
            </li>
            <li>
              Koubek R, Jarecke JLT, Haidet P. Merging the curriculum with
              the clinic: an intervention to foster deliberate practice of
              communication skills. <em>Patient Educ Couns.</em>{" "}
              2025;138:108824.
            </li>
          </ul>
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" />

      {/* CTA */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-cs-navy mb-4">
            Ready to build this into{" "}
            <span className="text-cs-dark-blue font-medium">
              a rotation or remediation plan?
            </span>
          </h2>
          <p className="text-base text-cs-dark-blue/70 font-light leading-relaxed mb-8">
            Read the full methodology, or talk to us about piloting
            ClinicalSim at your program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/methodology">
              <Button variant="secondary" size="lg">
                Read the full methodology
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="default" size="lg">
                Request a Pilot
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
