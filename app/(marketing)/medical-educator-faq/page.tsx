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
  title: "FAQ for Medical Educators: Feedback, Scoring & Evidence",
  description:
    "How to read a ClinicalSim feedback report, how GME and UME scoring differ, how the AI scores accurately and fairly, practice cadence, skill decay, and how to build cases into a rotation, clerkship, or remediation plan, grounded in the direct-observation and mastery-learning literature.",
  openGraph: {
    title: "FAQ for Medical Educators | ClinicalSim.ai",
    description:
      "Feedback interpretation, GME versus UME scoring, assessment reliability, practice cadence, and remediation, for program directors, DIOs, clerkship and course directors, simulation leads, and the committees that review learner progress.",
    url: "https://clinicalsim.ai/medical-educator-faq",
  },
  twitter: {
    title: "FAQ for Medical Educators | ClinicalSim.ai",
    description:
      "Feedback interpretation, GME versus UME scoring, assessment reliability, practice cadence, and remediation for medical education leaders.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/medical-educator-faq",
  },
}

const LAST_UPDATED_ISO = "2026-07-07"
const LAST_UPDATED_LABEL = "July 7, 2026"

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

// Anchors used for cross-references between sections. Kept in sync with the
// section questions below so links survive copy edits.
const scoringLevelsAnchor = slugify(
  "How does scoring work for our students versus our residents?",
)
const fairnessAnchor = slugify(
  "How do we know the AI scores accurately and fairly?",
)

const sections: PdFaqSection[] = [
  {
    question: "How should I read the feedback?",
    answer:
      "How you read a report matters as much as what it says: treat it as evidence, not a verdict. Every encounter produces one feedback report, and every score in it traces back to a verbatim line from the transcript, not an unexplained rating. The report opens with an overall impression (strengths, priority gaps, top action items) and then gives targeted recommendations. For GME cases, that means a milestone placement on the Dreyfus scale, read against the specialty's own verbatim level descriptors. For UME cases there is no numeric level, since the Foundational Competencies were not published with one. Instead the report records whether each competency was demonstrated, partially demonstrated, or not demonstrated, and scores performance through whichever communication rubric was applied. Treat the milestone-aligned score as evidence for your Clinical Competency Committee discussion, not a stand-alone verdict. The ACGME milestones are formative and were not designed for high-stakes decisions, so ClinicalSim does not use them that way either. The full standards-alignment logic, including how level descriptors and rubrics are applied, is documented on the methodology page.",
    node: (
      <>
        <p className="font-medium text-cs-navy">
          How you read a report matters as much as what it says: treat it as
          evidence, not a verdict.
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
          specialty&apos;s own verbatim level descriptors. For UME cases there
          is no numeric level, since the Foundational Competencies were not
          published with one. Instead the report records whether each
          competency was demonstrated, partially demonstrated, or not
          demonstrated, and scores performance through whichever communication
          rubric was applied.
        </p>
        <p>
          Treat the milestone-aligned score as evidence for your Clinical
          Competency Committee discussion, not a stand-alone verdict. The
          ACGME milestones are formative and were not designed for high-stakes
          decisions, so ClinicalSim does not use them that way either. The
          full standards-alignment logic, including how level descriptors and
          rubrics are applied, is documented on the{" "}
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
      "Each case is a voice conversation between the learner and an AI role built for that case, recorded as a timestamped transcript. For every scored competency and framework step, the platform pulls one or two verbatim excerpts that show the behavior, or notes that it did not happen. That is what makes each score traceable to a specific moment instead of a black box. Scoring runs on two tracks that stay separate. The competency framework (ACGME Milestones 2.0 for GME, the Foundational Competencies for UME) reflects where the learner sits developmentally. Communication frameworks like SPIKES or Calgary-Cambridge, plus any rubric your program already uses, score the specific technique independently. Both show up together with their evidence, so you see the full picture. The methodology page walks through this end to end, from case creation to how each score is generated.",
    node: (
      <>
        <p>
          Each case is a voice conversation between the learner and an AI role
          built for that case, recorded as a timestamped transcript. For every
          scored competency and framework step, the platform pulls{" "}
          <Link href="/faq#evidence-capture" className={linkClass}>
            one or two verbatim excerpts
          </Link>{" "}
          that show the behavior, or notes that it did not happen. That is
          what makes each score traceable to a specific moment instead of a
          black box.
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
          technique independently. Both show up together with their evidence,
          so you see the full picture. The{" "}
          <Link href="/methodology" className={linkClass}>
            methodology page
          </Link>{" "}
          walks through this end to end, from case creation to how each score
          is generated.
        </p>
      </>
    ),
  },
  {
    question:
      "How does scoring work for our students versus our residents?",
    answer:
      "The method is the same across levels. What changes is the competency framework a case is anchored to and how it is scored. For residents and fellows (GME), cases align to the specialty-specific ACGME Milestones 2.0, with the milestone text quoted verbatim from the specialty's own document. The subcompetencies the scenario exercises, most often interpersonal and communication skills and professionalism, are placed on the Dreyfus scale (Level 1 Novice through Level 5 Expert), read against those verbatim descriptors. If a case cannot reach the complexity needed to evaluate through Level 4, we do not assign a milestone score rather than force one. For medical students (UME), the Foundational Competencies (AAMC, AACOM, and ACGME) are not published with the milestones' five-level scale, so there is no numeric level. The report records each competency as demonstrated, partially demonstrated, or not demonstrated, and scores technique through the applied communication or skill rubric. We map UME cases to the Foundational Competencies and to the AAMC Core EPAs independently, with no fixed crosswalk, since an EPA set aligned to the 2024 Foundational Competencies has not been published yet. Entrustment stays a program decision that this evidence informs. The full logic for both levels is on the methodology page.",
    node: (
      <>
        <p>
          The method is the same across levels. What changes is the competency
          framework a case is anchored to and how it is scored.
        </p>
        <p>
          For residents and fellows (GME), cases align to the
          specialty-specific ACGME Milestones 2.0, with the milestone text
          quoted verbatim from the specialty&apos;s own document. The
          subcompetencies the scenario exercises, most often interpersonal and
          communication skills and professionalism, are placed on the Dreyfus
          scale (Level 1 Novice through Level 5 Expert), read against those
          verbatim descriptors. If a case cannot reach the complexity needed
          to evaluate through Level 4, we do not assign a milestone score
          rather than force one.
        </p>
        <p>
          For medical students (UME), the Foundational Competencies (AAMC,
          AACOM, and ACGME) are not published with the milestones&apos;
          five-level scale, so there is no numeric level. The report records
          each competency as demonstrated, partially demonstrated, or not
          demonstrated, and scores technique through the applied communication
          or skill rubric. We map UME cases to the Foundational Competencies
          and to the AAMC Core EPAs independently, with no fixed crosswalk,
          since an EPA set aligned to the 2024 Foundational Competencies has
          not been published yet. Entrustment stays a program decision that
          this evidence informs.
        </p>
        <p>
          The full logic for both levels is on the{" "}
          <Link href="/methodology" className={linkClass}>
            methodology page
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    question: "How do we know the AI scores accurately and fairly?",
    answer:
      "The short answer is transparency plus human judgment, not a black box you are asked to trust. Every score traces to one or two verbatim excerpts from the transcript, or a note that the behavior did not occur, so any reviewer can check the basis of a rating rather than accept it on faith. The same scoring logic applies to every case regardless of specialty, learner level, or which frameworks are applied, which keeps results consistent across learners. And each case is built from primary sources, reviewed by practicing physicians before release, and run repeatedly beforehand to confirm the scoring and feedback perform as intended. Just as important is what the output is for: it is formative evidence that informs a faculty or committee decision, and it never replaces human judgment. When a rating looks off, the evidence is right there to check and, if needed, override. The methodology page documents the review process and scoring logic in full.",
    node: (
      <>
        <p className="font-medium text-cs-navy">
          The short answer is transparency plus human judgment, not a black
          box you are asked to trust.
        </p>
        <p>
          Every score traces to one or two verbatim excerpts from the
          transcript, or a note that the behavior did not occur, so any
          reviewer can check the basis of a rating rather than accept it on
          faith. The same scoring logic applies to every case regardless of
          specialty, learner level, or which frameworks are applied, which
          keeps results consistent across learners. And each case is built
          from primary sources, reviewed by practicing physicians before
          release, and run repeatedly beforehand to confirm the scoring and
          feedback perform as intended.
        </p>
        <p>
          Just as important is what the output is for: it is formative
          evidence that informs a faculty or committee decision, and it never
          replaces human judgment. When a rating looks off, the evidence is
          right there to check and, if needed, override. The{" "}
          <Link href="/methodology" className={linkClass}>
            methodology page
          </Link>{" "}
          documents the review process and scoring logic in full.
        </p>
      </>
    ),
  },
  {
    question:
      "Clinical assessment is subjective and inconsistent: how does ClinicalSim help?",
    answer:
      "A ClinicalSim encounter is, in effect, a direct observation of a clinical encounter scored on a structured tool, the same modality medical schools and residencies already rely on, from the mini-CEX to EPA-based workplace assessment. So the direct-observation literature applies to us directly, and it identifies two well-documented constraints on that modality generally, not on any individual faculty member's judgment. The first is that a single observation is not reliable, and reaching a defensible level takes many. Direct observation is nearly universal in undergraduate medical education (almost every student is observed at least once during core clerkships), but its frequency and quality are not well established (Kogan et al., 2009), and in practice learners are judged on far too few observations to be reliable, mostly because standardized-patient scheduling and faculty time cap how many a rotation can offer. The second is that a given score reflects the rater as well as the learner. In a seven-institution study of more than 53,000 assessments, less than 10% of score variance was attributable to the learner (Ryan et al., 2024). Different faculty watching the same encounter reach different conclusions, the well-described assessor-cognition problem (Gingerich et al., 2014), and that is a property of holistic human judgment applied across many raters, not a reflection on any one evaluator. And the inconsistency does not stop at the individual score. The committees that weigh these data vary too. This is most visible in UME, where the LCME requires only a fair, timely process for decisions affecting a student's standing (Element 9.9) and prescribes no committee structure or meeting cadence, leaving those to each school, so how a progress or promotions committee is composed, and how often it meets, differ from one institution to the next. That variability is inherent to holistic human judgment. It is one more reason consistent, evidence-linked input matters. ClinicalSim's structure speaks to the first two. Because there is no standardized-patient schedule or faculty roster capping how often a case can run, a learner can accumulate the observations reliability actually requires, distributed over time, rather than the handful a rotation allows. And because one consistent rubric and scoring process applies to every encounter, a learner's score does not shift depending on which faculty member happened to be observing, a consequence of being a single repeatable scorer, not a claim that the AI judges better than a trained clinician would. Every score stays tied to verbatim evidence, and the output remains formative: it informs the Clinical Competency Committee or student progress committee, which continues to own the decision. To be clear about the boundary: we are not claiming ClinicalSim's scoring is more accurate or more valid than a faculty member's. We do not have the validation data to say that, and we will not claim it until we do. What we can say plainly is that the platform adds observation capacity and holds scoring consistent across encounters, which speaks to the frequency and rater-variance findings above, not to whether the AI's judgment is better than a clinician's. Because a ClinicalSim encounter mirrors a direct-observation tool like the mini-CEX rather than an EPA entrustment scale, the relevant target is modest: on the order of four to five spaced encounters per skill (the range programs commonly use to document competence), rising toward eight for higher statistical reliability, set by the instrument rather than the training level and tuned by in-product performance. Because these figures come from real-patient, human-rated observation, we treat them as a guide for a simulated, single-scorer setting rather than an exact transfer.",
    node: (
      <>
        <p>
          A ClinicalSim encounter is, in effect, a direct observation of a
          clinical encounter scored on a structured tool, the same modality
          medical schools and residencies already rely on, from the mini-CEX
          to EPA-based workplace assessment. So the direct-observation
          literature applies to us directly, and it identifies two
          well-documented constraints on that modality generally, not on any
          individual faculty member&apos;s judgment.
        </p>
        <p>
          The first is that a single observation is not reliable, and reaching
          a defensible level takes many. Direct observation is nearly
          universal in undergraduate medical education (almost every student
          is observed at least once during core clerkships), but its frequency
          and quality are not well established (Kogan et al., 2009), and in
          practice learners are judged on far too few observations to be
          reliable, mostly because standardized-patient scheduling and faculty
          time cap how many a rotation can offer. The second is that a given
          score reflects the rater as well as the learner. In a
          seven-institution study of more than 53,000 assessments, less than
          10% of score variance was attributable to the learner (Ryan et al.,
          2024). Different faculty watching the same encounter reach different
          conclusions, the well-described assessor-cognition problem (Gingerich
          et al., 2014), a property of holistic human judgment applied across
          many raters, not a reflection on any one evaluator.
        </p>
        <p>
          And the inconsistency does not stop at the individual score. The
          committees that weigh these data vary too. This is most visible in
          UME, where the LCME requires only a fair, timely process for
          decisions affecting a student&apos;s standing (Element 9.9) and
          prescribes no committee structure or meeting cadence, leaving those
          to each school, so how a progress or promotions committee is
          composed, and how often it meets, differ from one institution to the
          next. That variability is inherent to holistic human judgment. It is
          one more reason consistent, evidence-linked input matters.
        </p>
        <p>
          ClinicalSim&apos;s structure speaks to the first two. Because there
          is no standardized-patient schedule or faculty roster capping how
          often a case can run, a learner can accumulate the observations
          reliability actually requires, distributed over time, rather than
          the handful a rotation allows. And because one consistent rubric and
          scoring process applies to every encounter, a learner&apos;s score
          does not shift depending on which faculty member happened to be
          observing, a consequence of being a single repeatable scorer, not a
          claim that the AI judges better than a trained clinician would.
          Every score stays tied to verbatim evidence, and the output remains
          formative: it informs the Clinical Competency Committee or student
          progress committee, which continues to own the decision (how each
          score is made auditable and kept in human hands is covered in the{" "}
          <a href={`#${fairnessAnchor}`} className={linkClass}>
            question above
          </a>
          ).
        </p>
        <p>
          To be clear about the boundary: we are not claiming
          ClinicalSim&apos;s scoring is more accurate or more valid than a
          faculty member&apos;s. We do not have the validation data to say
          that, and we will not claim it until we do. What we can say plainly
          is that the platform adds observation capacity and holds scoring
          consistent across encounters, which speaks to the frequency and
          rater-variance findings above, not to whether the AI&apos;s judgment
          is better than a clinician&apos;s. Because a ClinicalSim encounter
          mirrors a direct-observation tool like the mini-CEX rather than an
          EPA entrustment scale, the relevant target is modest: on the order
          of four to five spaced encounters per skill (the range programs
          commonly use to document competence), rising toward eight for
          higher statistical reliability, set by the instrument rather than
          the training level and tuned by in-product performance. Because
          these figures come from real-patient, human-rated observation, we
          treat them as a guide for a simulated, single-scorer setting rather
          than an exact transfer.
        </p>
        <EvidenceDetail>
          <li>
            <strong>
              How many observations it takes, and why it depends on the
              instrument.
            </strong>{" "}
            For direct-observation tools like the mini-CEX, the class
            ClinicalSim belongs to, programs commonly document competence with
            a handful of spaced encounters per skill, often around four to
            five, though entrustment practice varies widely across
            institutions (from zero to more than fifteen observations per
            determination). Reaching a formal reliability of about 0.8 takes
            roughly eight mini-CEX encounters (Norcini et al., 2003;
            Moonen-van Loon et al., 2013, from 12,779 assessments across 953
            residents). EPA entrustment scales are a different, lower-signal
            instrument: they capture under 10% learner variance, so they need
            far more, 9 to 11 observations to reach only 0.7 in a UME clerkship
            (Dunne et al., 2022), and a median of 60 for reasonable
            reliability across a seven-institution sample (Ryan et al., 2024).
            That gap is a reason to anchor our framing to direct observation,
            not a target for our platform.
          </li>
          <li>
            <strong>Why our UME scoring is built the way it is.</strong> This
            is exactly why, when a case is tied to a UME EPA, ClinicalSim
            records whether the competency was demonstrated, partially
            demonstrated, or not demonstrated rather than assigning a numeric
            entrustment level: workplace entrustment ratings are not reliable
            enough to support a numeric judgment on their own, and entrustment
            remains a program decision this evidence informs. See the{" "}
            <a href={`#${scoringLevelsAnchor}`} className={linkClass}>
              students-versus-residents question above
            </a>
            , and the{" "}
            <Link href="/methodology" className={linkClass}>
              methodology page
            </Link>
            .
          </li>
          <li>
            <strong>Over what timeline.</strong> These are sampling counts,
            not calendar rules. In the source studies they accrued over a
            residency year (mini-CEX, about four to seven per resident per year
            is typical in practice) or across a clerkship in UME. Because a
            clerkship is a fraction of a residency year, most students are
            directly observed only once or twice per skill, well below what
            reliability requires, which is why the sampling gap is widest in
            UME. The counts should be distributed over time, not collected in a
            burst.
          </li>
          <li>
            <strong>Why the rater matters as much as the learner.</strong> In
            the seven-institution study, less than 10% of score variance was
            the learner. The rest was rater, context, and error (Ryan et al.,
            2024), consistent with the assessor-cognition literature (Gingerich
            et al., 2014). A single, consistent scoring process holds the
            rater facet constant by design.
          </li>
        </EvidenceDetail>
      </>
    ),
  },
  {
    question:
      "Is there an expectation for how many times a learner runs a scenario?",
    answer:
      "Neither ClinicalSim nor the mastery-learning literature sets a fixed number, and the communication-skills evidence argues against picking one. McGaghie and colleagues describe simulation-based mastery learning as outcomes-based, not time- or repetition-based: learners practice and get reassessed until they clear a minimum passing standard, and how many attempts that takes differs learner to learner. No study establishes a novice-to-competent rep count for a purely interpersonal skill, so any run-it-five-times rule would be invented rather than evidenced. Two findings shape how we think about it instead. First, competence in communication is scenario-specific: performance on one case predicts performance on another only weakly, so breadth across varied scenarios matters more than depth on one. Second, learners cannot reliably judge their own competence, which is why the standard has to be observed and objective rather than a learner's own sense of readiness. Repetition still matters (Issenberg's BEME review found it was the second most cited feature of effective simulation-based learning, present in 39% of studies, right behind feedback), but it is repetition across cases, measured against a rubric, that does the work. So the expectation is not a rep count. It is this: keep practicing across varied cases until performance holds up against the standard, then come back before it slips. Most programs could not run cases to that standard before now, because standardized-patient scheduling and faculty time capped how many reps a learner could get. That is the ceiling ClinicalSim removes. For the pilot, we recommend being prescriptive: each learner takes every case assigned to them and keeps retaking it until they meet the minimum standard for their PGY year. The logic is the one your program already applies to procedures. You would not clear a resident on a central line or an intubation until they had shown they could do it to standard, and communication deserves the same treatment. Milestone level descriptors set the bar, the report shows where the learner sits against it, and progression follows the standard, not the number of attempts.",
    node: (
      <>
        <p>
          Neither ClinicalSim nor the mastery-learning literature sets a fixed
          number, and the communication-skills evidence argues against picking
          one. McGaghie and colleagues describe simulation-based mastery
          learning as outcomes-based, not time- or repetition-based: learners
          practice and get reassessed until they clear a minimum passing
          standard, and how many attempts that takes differs learner to
          learner. No study establishes a novice-to-competent rep count for a
          purely interpersonal skill, so any run-it-five-times rule would be
          invented rather than evidenced.
        </p>
        <p>
          Two findings shape how we think about it instead. First, competence
          in communication is scenario-specific: performance on one case
          predicts performance on another only weakly, so breadth across
          varied scenarios matters more than depth on one. Second, learners
          cannot reliably judge their own competence, which is why the
          standard has to be observed and objective rather than a
          learner&apos;s own sense of readiness. Repetition still matters
          (Issenberg&apos;s BEME review found it was the second most cited
          feature of effective simulation-based learning, present in 39% of
          studies, right behind feedback), but it is repetition across cases,
          measured against a rubric, that does the work.
        </p>
        <p>
          So the expectation is not a rep count. It is this: keep practicing
          across varied cases until performance holds up against the standard,
          then come back before it slips. Most programs could not run cases to
          that standard before now, because standardized-patient scheduling
          and faculty time capped how many reps a learner could get. That is
          the ceiling ClinicalSim removes.
        </p>
        <p>
          For the pilot, we recommend being prescriptive: each learner takes
          every case assigned to them and keeps retaking it until they meet
          the minimum standard for their PGY year. The logic is the one your
          program already applies to procedures. You would not clear a
          resident on a central line or an intubation until they had shown
          they could do it to standard, and communication deserves the same
          treatment. Milestone level descriptors set the bar, the report{" "}
          <Link href="/faq#my-progress" className={linkClass}>
            shows where the learner sits against it
          </Link>
          , and progression follows the standard, not the number of attempts.
        </p>
        <EvidenceDetail>
          <li>
            <strong>Case-specificity.</strong> Guiton and colleagues (N=567
            final-year students, 7-station OSCE) found the student-by-case
            interaction accounted for roughly 50% of variance: high internal
            consistency within a station (Cronbach&apos;s alpha 0.89 to 0.94)
            but low reliability across cases. Swanson and Norcini estimated
            about 24 twenty-minute standardized-patient stations (about 8
            hours) to reliably assess communication and information-gathering
            skill, a conclusion the field&apos;s state-of-the-art review
            reaffirmed (Swanson and van der Vleuten, 2013). The point is that
            dose here is a matter of assessment reliability, not a learning
            plateau.
          </li>
          <li>
            <strong>Self-assessment is unreliable.</strong> A JAMA systematic
            review (Davis and colleagues, 2006) found physicians&apos;
            self-assessments correlate poorly, sometimes inversely, with
            observed measures of their competence, and that the least skilled
            are often the most confident. That is the direct case for an
            objective, observed benchmark rather than learner self-report.
          </li>
          <li>
            <strong>Repetition as a feature of effective simulation.</strong>{" "}
            Issenberg and colleagues (2005 BEME systematic review) found
            repetitive practice present in 39% of reviewed studies, second
            only to feedback. A later meta-analysis (Cook and colleagues,
            2013) quantified repetitive practice as one of the
            instructional-design features most strongly associated with better
            learning outcomes.
          </li>
          <li>
            <strong>Caveat.</strong> The reps-to-competence gap is real: no
            primary source plots a communication learning curve to an
            empirical plateau, so this answer is anchored to proficiency
            deliberately rather than to a number we cannot defend.
          </li>
        </EvidenceDetail>
      </>
    ),
  },
  {
    question:
      "How often should a learner practice while first building a skill?",
    answer:
      "For acquisition, the defensible cadence is spaced, coached practice distributed across days over several weeks, not a single crammed workshop. A workable default is two to three coached, feedback-rich scenario sessions per week for three to six weeks, each covering varied cases rather than the same one repeated. Three things support that shape: spacing helps during learning itself and not just for later recall, the benefit carries into applied training and not just the laboratory, and deliberate practice with feedback (individualized, coach-designed, at the edge of ability) is the active ingredient rather than mere exposure. The number of weeks is a starting point, not a law. Gate progression to the proficiency standard, not the calendar: a learner is done acquiring when they clear the rubric across varied cases. If in-product data show most learners plateau before three weeks, shorten the block. If most still fail the standard at six weeks, the standard or the scenario difficulty needs recalibration.",
    node: (
      <>
        <p>
          For acquisition, the defensible cadence is spaced, coached practice
          distributed across days over several weeks, not a single crammed
          workshop. A workable default is two to three coached, feedback-rich
          scenario sessions per week for three to six weeks, each covering
          varied cases rather than the same one repeated. Three things support
          that shape: spacing helps during learning itself and not just for
          later recall, the benefit carries into applied training and not just
          the laboratory, and deliberate practice with feedback
          (individualized, coach-designed, at the edge of ability) is the
          active ingredient rather than mere exposure.
        </p>
        <p>
          The number of weeks is a starting point, not a law. Gate progression
          to the proficiency standard, not the calendar: a learner is done
          acquiring when they clear the rubric across varied cases. If
          in-product data show most learners plateau before three weeks,
          shorten the block. If most still fail the standard at six weeks, the
          standard or the scenario difficulty needs recalibration.
        </p>
        <EvidenceDetail>
          <li>
            <strong>Spacing helps acquisition as well as retention.</strong>{" "}
            Donovan and Radosevich (1999, meta-analysis of 63 studies and 112
            effect sizes) found an overall spaced-practice advantage of d =
            0.46, with d = 0.45 for acquisition and d = 0.51 for retention
            (statistically indistinguishable). Because their sample was largely
            applied training tasks, this is not merely a laboratory effect.
            Cepeda and colleagues&apos; synthesis (2006, 184 studies and 317
            experiments, Psychological Bulletin) reaches the same conclusion,
            making distributed practice one of the most robust findings in
            learning science.
          </li>
          <li>
            <strong>Deliberate practice is the mechanism.</strong> Deliberate
            practice (individualized, coach-designed work at the edge of
            ability, with feedback) is the recognized route to expert clinical
            performance (Ericsson, 2004), the active ingredient rather than
            mere exposure. Workshops alone fade: Schwalbe and colleagues (2014)
            measured a training gain of d = 0.76 that eroded to d = -0.30 over
            six months without coaching.
          </li>
          <li>
            <strong>Two important limits.</strong> Task complexity attenuates
            the spacing benefit (Donovan and Radosevich found complexity
            negatively correlated with the effect, r = -0.25), and
            interpersonal skill is high-complexity, so expect
            smaller-than-headline effects. And deliberate practice explains
            little variance in professional performance (under 1% in Macnamara
            and colleagues&apos; 2014 professions category), so cadence is
            necessary but not sufficient. The specific week count here is the
            weakest-sourced element and is best treated as a testable default.
          </li>
        </EvidenceDetail>
      </>
    ),
  },
  {
    question:
      "Once a learner is proficient, how do we keep the skill from decaying?",
    answer:
      "Communication skills demonstrably decay within about six months without reinforcement, and coaching is what prevents it. Rather than fix a maintenance interval by rule, gate it to performance and let spaced booster practice carry the load between checks. Cognitive-psychology spacing research gives a useful heuristic for the interval: the optimal gap between practice sessions scales with how long the skill needs to last, so a six-to-twelve-month retention horizon points to booster practice on the order of every one to two months, lengthening as proficiency proves durable. Which sub-skill decays depends on what the learner's real-world environment reinforces, so maintenance practice should preferentially re-target whatever the clinic fails to keep sharp, often the warmer, emotionally demanding skills for busy clinicians. The schedule is only a fallback: whenever an in-product assessment shows performance below standard, re-trigger a short acquisition-style block. If scores hold at or above standard at three months with no touch, lengthen the interval. If they drop by a standard deviation or more before the next scheduled touch, shorten it.",
    node: (
      <>
        <p>
          Communication skills demonstrably decay within about six months
          without reinforcement, and coaching is what prevents it. Rather than
          fix a maintenance interval by rule, gate it to performance and let
          spaced booster practice carry the load between checks.
          Cognitive-psychology spacing research gives a useful heuristic for
          the interval: the optimal gap between practice sessions scales with
          how long the skill needs to last, so a six-to-twelve-month retention
          horizon points to booster practice on the order of every one to two
          months, lengthening as proficiency proves durable.
        </p>
        <p>
          Which sub-skill decays depends on what the learner&apos;s real-world
          environment reinforces, so maintenance practice should preferentially
          re-target whatever the clinic fails to keep sharp, often the warmer,
          emotionally demanding skills for busy clinicians. The schedule is
          only a fallback: whenever an in-product assessment shows performance
          below standard, re-trigger a short acquisition-style block. If scores
          hold at or above standard at three months with no touch, lengthen the
          interval. If they drop by a standard deviation or more before the
          next scheduled touch, shorten it.
        </p>
        <EvidenceDetail>
          <li>
            <strong>Coaching prevents decay.</strong> Schwalbe, Oh and Zweben
            (2014, meta-analysis of 21 MI training studies) found a training
            gain of d = 0.76 that eroded without follow-up (d = -0.30 at 6
            months) but was sustained when workshops were followed by feedback
            or coaching (d about 0.03 at 6 months). The decision-relevant part
            is the direction: ongoing coaching, not the workshop, is what holds
            a skill in place. We do not import the study&apos;s specific
            session count, since it was measured for motivational interviewing
            rather than the harder conversations these cases target.
          </li>
          <li>
            <strong>What the spacing research implies for the interval.</strong>{" "}
            Cepeda and colleagues (2008, more than 1,350 participants) found
            the optimal review gap declined as a proportion of the retention
            interval, from about 20 to 40% of a one-week delay to about 5 to
            10% of a one-year delay. Practically, a 6-to-12-month retention
            horizon points to booster gaps of roughly one to two months, a
            defensible default to tune against in-product performance, not a
            fixed rule.
          </li>
          <li>
            <strong>Uneven, context-dependent decay.</strong> The Cancer
            Research UK communication-skills RCT (Fallowfield and colleagues,
            2002, Lancet; 160 UK oncologists) established that training changes
            real behavior. The 12-month follow-up (2003), about 15 months after
            the 3-day course and with no booster, showed the gains decay
            unevenly: structural skills persisted (interruptions fell 32 to 6;
            summarising rose) while empathy expressions declined (3.22 to
            1.49). Bombeke and colleagues (2011) found the same warm-skill
            erosion in trainees, whose patient-centred attitudes slipped across
            clinical clerkships. The lesson: re-target the empathic skills
            clinical environments tend to under-reinforce.
          </li>
          <li>
            <strong>General procedural decay timing.</strong> Legoux and
            colleagues (2021, systematic review) found significant decline in
            critical procedural skill as early as three months, clearer by
            twelve, reinforcing that scheduled, distributed boosters should
            pre-empt decay rather than wait for it, consistent with the
            distributed-practice advantage seen in simulation-based training
            (Cook and colleagues, 2013).
          </li>
        </EvidenceDetail>
      </>
    ),
  },
  {
    question: "What does the evidence not yet establish?",
    answer:
      "We would rather be straight about the limits than oversell the numbers. The biggest one is a domain-transfer gap: almost all of the quantitative cadence and decay figures come from procedural skills, fact learning, or motivational interviewing specifically, not from breaking bad news, goals-of-care conversations, or general interpersonal skill. That is exactly why we do not put a fixed maintenance interval on communication skills. Importing a motivational-interviewing schedule to those harder conversations would be extrapolation, not a measured result. We present cadences as proficiency-anchored defaults, tuned by in-product performance data, rather than as settled facts. Two smaller limits matter too. There is no published rep count for reaching competence on a purely interpersonal skill, which is why the acquisition cadence is a starting hypothesis rather than a proven dose. And the results are genuinely mixed in places: which sub-skill decays runs in opposite directions across studies, and not every retention study shows decay by six months. The honest read is that the direction of the evidence is clear (space it, coach it, reassess it) while the exact numbers deserve the humility of a default you keep testing.",
    node: (
      <>
        <p>
          We would rather be straight about the limits than oversell the
          numbers. The biggest one is a domain-transfer gap: almost all of the
          quantitative cadence and decay figures come from procedural skills,
          fact learning, or motivational interviewing specifically, not from
          breaking bad news, goals-of-care conversations, or general
          interpersonal skill. That is exactly why we do not put a fixed
          maintenance interval on communication skills. Importing a
          motivational-interviewing schedule to those harder conversations
          would be extrapolation, not a measured result. We present cadences
          as proficiency-anchored defaults, tuned by in-product performance
          data, rather than as settled facts.
        </p>
        <p>
          Two smaller limits matter too. There is no published rep count for
          reaching competence on a purely interpersonal skill, which is why
          the acquisition cadence is a starting hypothesis rather than a proven
          dose. And the results are genuinely mixed in places: which sub-skill
          decays runs in opposite directions across studies, and not every
          retention study shows decay by six months. The honest read is that
          the direction of the evidence is clear (space it, coach it, reassess
          it) while the exact numbers deserve the humility of a default you
          keep testing.
        </p>
      </>
    ),
  },
  {
    question:
      "How do we build this into a rotation, clerkship, or remediation plan?",
    answer:
      "Because there is no standardized patient to schedule and no faculty member needed to staff each encounter, cases go wherever the curriculum needs them, in a few common shapes. As a rotation or clerkship set, assign the cases that match the high-stakes conversations the rotation is meant to exercise, and have each learner retake them until they meet the standard for their level. As a remediation plan, use a short, spaced block of coached practice across varied cases (the acquisition cadence above), then reassess against the rubric. As maintenance, space lighter touches to keep a proficient skill from slipping. In every shape, the principle is the same: gate progression to the proficiency standard, not a rep count or the calendar. If you are standing up a pilot, we will help you map cases to the rotation and set the standard for each learner level. The methodology page covers the scoring logic behind it, and you can talk to us about program design.",
    node: (
      <>
        <p>
          Because there is no standardized patient to schedule and no faculty
          member needed to staff each encounter, cases go wherever the
          curriculum needs them, in a few common shapes.
        </p>
        <p>
          As a rotation or clerkship set, assign the cases that match the
          high-stakes conversations the rotation is meant to exercise, and have
          each learner retake them until they meet the standard for their
          level. As a remediation plan, use a short, spaced block of coached
          practice across varied cases (the acquisition cadence above), then
          reassess against the rubric. As maintenance, space lighter touches to
          keep a proficient skill from slipping. In every shape, the principle
          is the same: gate progression to the proficiency standard, not a rep
          count or the calendar.
        </p>
        <p>
          If you are standing up a pilot, we will help you map cases to the
          rotation and set the standard for each learner level. The{" "}
          <Link href="/methodology" className={linkClass}>
            methodology page
          </Link>{" "}
          covers the scoring logic behind it, and you can{" "}
          <Link href="/contact" className={linkClass}>
            talk to us about program design
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    question: "Can we use the reports to document remediation?",
    answer:
      "Yes, and the format is built for it. Each encounter produces a single transcript-grounded report: verbatim evidence for each rating, an overall impression, and targeted recommendations. Run across a remediation block, those reports give a defensible, time-stamped record of what a learner practiced and where their performance landed against the standard over time. One important caveat on how you frame that record. GME milestone-aligned output is formative. The ACGME is explicit that individual milestones were not designed for high-stakes external decisions, so it should inform your Clinical Competency Committee's judgment rather than stand alone as a verdict. The same holds for UME: entrustment remains a program decision the evidence informs. Used that way, the reports strengthen a remediation file. They do not replace the committee that owns the decision.",
    node: (
      <>
        <p>
          Yes, and the format is built for it. Each encounter produces a single
          transcript-grounded report: verbatim evidence for each rating, an
          overall impression, and targeted recommendations. Run across a
          remediation block, those reports give a defensible, time-stamped
          record of what a learner practiced and where their performance landed
          against the standard over time.
        </p>
        <p>
          One important caveat on how you frame that record. GME
          milestone-aligned output is formative. The ACGME is explicit that
          individual milestones were not designed for high-stakes external
          decisions, so it should inform your Clinical Competency
          Committee&apos;s judgment rather than stand alone as a verdict. The
          same holds for UME: entrustment remains a program decision the
          evidence informs. Used that way, the reports strengthen a
          remediation file. They do not replace the committee that owns the
          decision.
        </p>
      </>
    ),
  },
  {
    question: "How much faculty time does this take?",
    answer:
      "Less than standardized-patient practice, and spent differently. There is no SP to recruit, train, or schedule and no faculty member needed to observe and score each encounter. The platform captures the transcript and generates the report. That removes the scheduling-and-staffing ceiling that normally caps how much practice a learner can get. What faculty time remains shifts to the part that actually moves the needle: reviewing reports and coaching where the evidence points. That is deliberate practice with feedback, the active ingredient in the acquisition and maintenance research above, rather than time spent running and hand-scoring encounters.",
    node: (
      <>
        <p>
          Less than standardized-patient practice, and spent differently. There
          is no SP to recruit, train, or schedule and no faculty member needed
          to observe and score each encounter. The platform captures the
          transcript and generates the report. That removes the
          scheduling-and-staffing ceiling that normally caps how much practice
          a learner can get.
        </p>
        <p>
          What faculty time remains shifts to the part that actually moves the
          needle: reviewing reports and coaching where the evidence points.
          That is deliberate practice with feedback, the active ingredient in
          the acquisition and maintenance research above, rather than time
          spent running and hand-scoring encounters.
        </p>
      </>
    ),
  },
  {
    question: "Is learner data safe, and is there any PHI?",
    answer:
      "Case content is entirely synthetic. Scenarios are authored from the clinical literature, not from real patient records, so there is no protected health information in the cases themselves. For how learner data (transcripts and reports) is stored and handled, see our privacy policy, or talk to us and we will walk your privacy or IRB reviewers through the specifics for your institution.",
    node: (
      <>
        <p>
          Case content is entirely synthetic. Scenarios are authored from the
          clinical literature, not from real patient records, so there is no
          protected health information in the cases themselves.
        </p>
        <p>
          For how learner data (transcripts and reports) is stored and handled,
          see our{" "}
          <Link href="/privacy" className={linkClass}>
            privacy policy
          </Link>
          , or{" "}
          <Link href="/contact" className={linkClass}>
            talk to us
          </Link>{" "}
          and we will walk your privacy or IRB reviewers through the specifics
          for your institution.
        </p>
      </>
    ),
  },
  {
    question: "How long does a typical case take?",
    answer:
      "A typical case takes between three and ten minutes. It is a single voice encounter captured as one transcript, not a multi-hour simulation block, and length varies with the complexity of the conversation the case is built to exercise. There is no scheduling step and no standardized patient to coordinate, which is exactly what lets a learner run a case again the same day if they need another rep.",
    node: (
      <p>
        A typical case takes{" "}
        <Link href="/faq#encounter-length" className={linkClass}>
          between three and ten minutes
        </Link>
        . It is a single voice encounter captured as one transcript, not a
        multi-hour simulation block, and length varies with the complexity of
        the conversation the case is built to exercise. There is no scheduling
        step and no standardized patient to coordinate, which is exactly what
        lets a learner run a case again the same day if they need another rep.
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
            name: "ClinicalSim.ai FAQ for Medical Educators",
            description:
              "Questions program directors, DIOs, clerkship and course directors, simulation leads, and the committees that review learner progress ask once they have seen a feedback report: how to read it, how GME and UME scoring differ, how the AI scores fairly, practice cadence, skill decay, and how to build cases into a rotation, clerkship, or remediation plan.",
            url: "https://clinicalsim.ai/medical-educator-faq",
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
                name: "FAQ for Medical Educators",
                item: "https://clinicalsim.ai/medical-educator-faq",
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
            <span className="text-cs-dark-blue/85">FAQ for Medical Educators</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-6 text-cs-dark-blue">
            FAQ for{" "}
            <span className="font-medium">medical educators</span>
          </h1>

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed max-w-3xl">
            Questions we hear most from program directors, DIOs, clerkship and
            course directors, simulation leads, and the committees that review
            learner progress (Clinical Competency Committees and student
            progress committees) once they have seen a feedback report and
            started thinking about how to build ClinicalSim into a rotation,
            clerkship, or remediation plan.
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
              McGaghie WC, Issenberg SB, Barsuk JH, Wayne DB. A critical review
              of simulation-based mastery learning with translational outcomes.{" "}
              <em>Med Educ.</em> 2014;48(4):375-385.
            </li>
            <li>
              Issenberg SB, McGaghie WC, Petrusa ER, Gordon DL, Scalese RJ.
              Features and uses of high-fidelity medical simulations that lead
              to effective learning: a BEME systematic review.{" "}
              <em>Med Teach.</em> 2005;27(1):10-28.
            </li>
            <li>
              Cook DA, Hamstra SJ, Brydges R, et al. Comparative effectiveness
              of instructional design features in simulation-based education:
              systematic review and meta-analysis. <em>Med Teach.</em>{" "}
              2013;35(1):e867-e898.
            </li>
            <li>
              Swanson DB, Norcini JJ. Factors influencing reproducibility of
              tests using standardized patients. <em>Teach Learn Med.</em>{" "}
              1989;1(3):158-166.
            </li>
            <li>
              Swanson DB, van der Vleuten CPM. Assessment of clinical skills
              with standardized patients: state of the art revisited.{" "}
              <em>Teach Learn Med.</em> 2013;25(Suppl 1):S17-S25.
            </li>
            <li>
              Guiton G, Hodgson CS, Delandshere G, Wilkerson L. Communication
              skills in standardized-patient assessment of final-year medical
              students: a psychometric study. <em>Adv Health Sci Educ.</em>{" "}
              2004;9(3):179-187.
            </li>
            <li>
              Davis DA, Mazmanian PE, Fordis M, Van Harrison R, Thorpe KE,
              Perrier L. Accuracy of physician self-assessment compared with
              observed measures of competence: a systematic review.{" "}
              <em>JAMA.</em> 2006;296(9):1094-1102.
            </li>
            <li>
              Kogan JR, Holmboe ES, Hauer KE. Tools for direct observation and
              assessment of clinical skills of medical trainees: a systematic
              review. <em>JAMA.</em> 2009;302(12):1316-1326.
            </li>
            <li>
              Norcini JJ, Blank LL, Duffy FD, Fortna GS. The mini-CEX: a method
              for assessing clinical skills. <em>Ann Intern Med.</em>{" "}
              2003;138(6):476-481.
            </li>
            <li>
              Moonen-van Loon JMW, Overeem K, Donkers HHLM, van der Vleuten
              CPM, Driessen EW. Composite reliability of a workplace-based
              assessment toolbox for postgraduate medical education.{" "}
              <em>Adv Health Sci Educ Theory Pract.</em> 2013;18:1087-1102.
            </li>
            <li>
              Dunne D, Green M, et al. WBAs in UME: how many are needed? A
              reliability analysis of 5 AAMC Core EPAs implemented in the
              internal medicine clerkship. <em>J Gen Intern Med.</em>{" "}
              2022;37(11):2684-2690.
            </li>
            <li>
              Ryan MS, Gielissen KA, Shin D, et al. How well do workplace-based
              assessments support summative entrustment decisions? A
              multi-institutional generalisability study. <em>Med Educ.</em>{" "}
              2024;58(7):825-837.
            </li>
            <li>
              Gingerich A, Kogan J, Yeates P, Govaerts M, Holmboe E. Seeing the
              black box differently: assessor cognition from three research
              perspectives. <em>Med Educ.</em> 2014;48(11):1055-1068.
            </li>
            <li>
              Ericsson KA. Deliberate practice and the acquisition and
              maintenance of expert performance in medicine and related
              domains. <em>Acad Med.</em> 2004;79(10 Suppl):S70-S81.
            </li>
            <li>
              Donovan JJ, Radosevich DJ. A meta-analytic review of the
              distribution of practice effect. <em>J Appl Psychol.</em>{" "}
              1999;84(5):795-805.
            </li>
            <li>
              Cepeda NJ, Pashler H, Vul E, Wixted JT, Rohrer D. Distributed
              practice in verbal recall tasks: a review and quantitative
              synthesis. <em>Psychol Bull.</em> 2006;132(3):354-380.
            </li>
            <li>
              Cepeda NJ, Vul E, Rohrer D, Wixted JT, Pashler H. Spacing effects
              in learning: a temporal ridgeline of optimal retention.{" "}
              <em>Psychol Sci.</em> 2008;19(11):1095-1102.
            </li>
            <li>
              Schwalbe CS, Oh HY, Zweben A. Sustaining motivational
              interviewing: a meta-analysis of training studies.{" "}
              <em>Addiction.</em> 2014;109(8):1287-1294.
            </li>
            <li>
              Macnamara BN, Hambrick DZ, Oswald FL. Deliberate practice and
              performance in music, games, sports, education, and professions:
              a meta-analysis. <em>Psychol Sci.</em> 2014;25(8):1608-1618.
            </li>
            <li>
              Fallowfield L, Jenkins V, Farewell V, Saul J, Duffy A, Eves R.
              Efficacy of a Cancer Research UK communication skills training
              model for oncologists: a randomised controlled trial.{" "}
              <em>Lancet.</em> 2002;359(9307):650-656.
            </li>
            <li>
              Fallowfield L, Jenkins V, Farewell V, Solis-Trapala I. Enduring
              impact of communication skills training: results of a 12-month
              follow-up. <em>Br J Cancer.</em> 2003;89(8):1445-1449.
            </li>
            <li>
              Bombeke K, Van Roosbroeck S, De Winter B, Debaene L, Schol S, Van
              Hal G, Van Royen P. Medical students trained in communication
              skills show a decline in patient-centred attitudes: an
              observational study comparing two cohorts during clinical
              clerkships. <em>Patient Educ Couns.</em> 2011;84(3):310-318.
            </li>
            <li>
              Legoux C, Gerein R, Boutis K, Barrowman N, Plint A. Retention of
              critical procedural skills after simulation training: a
              systematic review. <em>AEM Educ Train.</em> 2021;5(3):e10536.
            </li>
            <li>
              Liaison Committee on Medical Education (LCME). Functions and
              Structure of a Medical School, Element 9.9 (Student Advancement
              and Appeal Process). March 2022.
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
            Read the full methodology, or talk to us about piloting ClinicalSim
            at your program.
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
