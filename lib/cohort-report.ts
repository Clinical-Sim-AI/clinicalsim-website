/**
 * Snapshot of the partner health system's Patient Experience Analysis (August
 * 2026), the source for /examples/health-system-cohort-report.
 *
 * Source: "ClinicalSim Patient Experience Analysis.pdf" (Claude-Workspace/
 * 01-fundraising). The partner approved anonymized public use on 2026-10-20.
 * Every number and every quote below is copied from that PDF. The page renders
 * only from this file, so a figure that is not here does not ship.
 *
 * Deliberately left out, by Ben's decision on 2026-10-20:
 *   - the per-clinician distribution (individual averages from 1.8 to 4.8, and
 *     the count below 3). It ranks people, and this page describes a cohort.
 *   - the PDF's background paragraph tying the skill to readmissions and
 *     malpractice exposure, which NO_OUTCOME_PREDICTION_LIMITATION rules out.
 *   - the customer-specific 90-day pilot proposal and the sign-off.
 *   - the health system's name and the names of its three frameworks. The PDF
 *     withholds them too, and uses the same Comm, SR-A, and SR-B codes.
 */

export const COHORT_REPORT_PATH = "/examples/health-system-cohort-report"

export const COHORT_REPORT_META = {
  /** When the analysis was delivered to the partner. */
  reportDate: "2026-08",
  reportDateLabel: "August 2026",
  /** When the recorded conversations took place. */
  collectionWindow: "November 2025 to August 2026",
  participants: "residents, fellows, attendings, and nurse practitioners",
} as const

/** The report's scope. Every page that cites the report reads these rather than restating them. */
export const COHORT_REPORT_TOTALS = { conversations: 82, clinicians: 68, frameworks: 3 } as const

export const COHORT_REPORT_COUNTS = [
  { value: String(COHORT_REPORT_TOTALS.conversations), label: "recorded practice conversations analyzed" },
  { value: String(COHORT_REPORT_TOTALS.clinicians), label: "clinicians, anonymized" },
  { value: String(COHORT_REPORT_TOTALS.frameworks), label: "of the health system's own frameworks applied" },
] as const

/** The report page's H1, reused as the title of every card that links to it. */
export const COHORT_REPORT_TITLE = `What one health system learned from ${COHORT_REPORT_TOTALS.conversations} practice conversations`

/**
 * One-paragraph summary for other pages. It leads with the general communication model, scored on
 * every conversation, because the service recovery means rest on 9 to 13 conversations and the
 * report's own limits say they shouldn't carry strong claims alone.
 */
export const COHORT_REPORT_SUMMARY = `One partner health system's anonymized report covers ${COHORT_REPORT_TOTALS.conversations} practice conversations by ${COHORT_REPORT_TOTALS.clinicians} clinicians, scored against the system's own patient experience frameworks. On the general communication model, scored on all ${COHORT_REPORT_TOTALS.conversations}, Listen averaged 3.83 and Explain 3.79, while Inquire what matters most averaged 3.67, with 18% of conversations below 3.`

/** The three withheld frameworks, by the codes the report uses. */
export const COHORT_REPORT_FRAMEWORKS = [
  { code: "Comm", description: `the health system's general patient communication model, applied to all ${COHORT_REPORT_TOTALS.conversations} conversations` },
  { code: "SR-A", description: "its earlier service recovery model" },
  { code: "SR-B", description: "the service recovery model replacing SR-A" },
] as const

export interface CohortElement {
  framework: "Comm" | "SR-A" | "SR-B"
  element: string
  /** Mean score on a 1 to 5 scale. */
  mean: number
  /** Conversations scored on this element. */
  n: number
  /** Share of those conversations scored below 3, as a whole percent. */
  belowThreePercent: number
}

export interface CohortElementGroup {
  heading: string
  elements: CohortElement[]
}

/** The findings table, in the PDF's order. */
export const COHORT_REPORT_ELEMENTS: CohortElementGroup[] = [
  {
    heading: "Receiving and explaining",
    elements: [
      { framework: "SR-B", element: "Hear", mean: 4.22, n: 9, belowThreePercent: 0 },
      { framework: "SR-A", element: "Hear", mean: 4.15, n: 13, belowThreePercent: 8 },
      { framework: "Comm", element: "Listen", mean: 3.83, n: 82, belowThreePercent: 17 },
      { framework: "Comm", element: "Explain", mean: 3.79, n: 81, belowThreePercent: 6 },
    ],
  },
  {
    heading: "Confirming and asking",
    elements: [
      { framework: "Comm", element: "Inquire what matters most", mean: 3.67, n: 82, belowThreePercent: 18 },
      { framework: "SR-B", element: "Learn (reflect the concern back and confirm)", mean: 3.33, n: 9, belowThreePercent: 22 },
      { framework: "SR-A", element: "Thanks (for raising the concern)", mean: 2.0, n: 11, belowThreePercent: 73 },
    ],
  },
]

export interface CohortQuote {
  text: string
  /** Who said it. Every AI patient line is labeled as one. */
  speaker: string
  context: string
}

/**
 * Lines from strong performances in the same cohort. The clinician's line and
 * the AI parent's replies are verbatim from the PDF's findings section. The PDF
 * names no scenario for the third line, so none is given.
 *
 * The clinician's "Does that kind of make sense?" is a yes-or-no check, which
 * AHRQ says is not teach-back (see /solutions/patient-understanding). The
 * strength is the reflection before it, and the context says so.
 */
export const COHORT_REPORT_STRENGTH_QUOTES: CohortQuote[] = [
  {
    text: "Does that kind of make sense?",
    speaker: "Clinician",
    context: "Goals of care. The clinician had just reflected the mother's account back to her, the smile she had seen fade and the six PICU admissions, and asked whether the summary was right. The reflection is the skill; the question confirms it.",
  },
  {
    text: "that's exactly it.",
    speaker: "The AI parent, in reply",
    context: "Goals of care",
  },
  {
    text: "Nobody's said it like that before.",
    speaker: "An AI parent in another encounter",
    context: "Another conversation from the same cohort",
  },
]

export interface CohortFeedbackExample {
  score: string
  quote: string
  feedback: string
}

/**
 * The two feedback examples the PDF gives on SR-B Learn. Quotes are verbatim.
 * The 5/5 feedback is the PDF's wording. The 2/5 feedback keeps the PDF's
 * facts and puts the next step first instead of the miss, so the page labels
 * both notes as summaries rather than the participant's report text.
 */
export const COHORT_REPORT_FEEDBACK_ELEMENT = "SR-B Learn: reflect the concern back and confirm understanding"

export const COHORT_REPORT_FEEDBACK_EXAMPLES: CohortFeedbackExample[] = [
  {
    score: "5/5",
    quote:
      "It sounds like the Eli that you know and love is the one who's smiling at you, the one who is happy, the one who is always interactive with you.",
    feedback:
      "The clinician reflected the mother's account back with real specificity, checked understanding, and drew out her goals: comfort at home, being \"his mom, not his nurse.\"",
  },
  {
    score: "2/5",
    quote: "Is there anything we can do to help minimize his suffering in your mind?",
    feedback:
      "The mother had just said she wonders whether Eli is suffering more than living. The question is a caring one. The next step is to say her words back to her and check they landed before moving on, because that is how a family learns they were heard.",
  },
]

export interface CohortScenario {
  name: string
  conversations: number
  /** One line from the PDF's briefing. Every patient in every case is synthetic. */
  summary: string
  /** In-scope conversations per framework, as "in/total". */
  scope: { comm: string; srA: string; srB: string }
}

export const COHORT_REPORT_SCENARIOS: CohortScenario[] = [
  {
    name: "First conversation with a parent after a drowning",
    conversations: 46,
    summary: "The clinician makes first contact with a mother during her son's active resuscitation, before she has been told anything definite.",
    scope: { comm: "46/46", srA: "1/46", srB: "0/46" },
  },
  {
    name: "General pediatrics goals of care, before a lecture",
    conversations: 28,
    summary: "The resident leads a meeting with the exhausted mother of a 7-year-old with severe cerebral palsy and six PICU admissions in the past year.",
    scope: { comm: "28/28", srA: "12/28", srB: "8/28" },
  },
  {
    name: "Informed consent for a central venous catheter (PICU)",
    conversations: 3,
    summary: "A PICU fellow obtains consent from an anxious mother and uses teach-back to confirm she understood.",
    scope: { comm: "3/3", srA: "0/3", srB: "0/3" },
  },
  {
    name: "General pediatrics goals of care, after a lecture",
    conversations: 2,
    summary: "The same case with the mother's key worry removed from the briefing, so the resident has to draw it out.",
    scope: { comm: "2/2", srA: "0/2", srB: "1/2" },
  },
  {
    name: "Unlabeled early sessions",
    conversations: 2,
    summary: "The same drowning case, recorded before scenarios carried IDs.",
    scope: { comm: "2/2", srA: "0/2", srB: "0/2" },
  },
  {
    name: "Asthma discharge counseling, limited English proficiency",
    conversations: 1,
    summary: "A mother with limited English proficiency says okay even when she doesn't understand, because she is embarrassed to ask questions in English.",
    scope: { comm: "1/1", srA: "0/1", srB: "0/1" },
  },
]

export const COHORT_REPORT_SCOPE_TOTALS = { comm: "82/82", srA: "13/82", srB: "9/82" } as const

/** The scope rule, as the PDF states it. */
export const COHORT_REPORT_SCOPE_RULE =
  `The two service recovery models assume a family has raised a concern, complaint, or service failure. So before scoring, each conversation was judged in or out of scope for each framework, with the reason recorded, and no clinician was marked down for a behavior the conversation gave no chance to show. The general communication model applied to all ${COHORT_REPORT_TOTALS.conversations}.`

/** Report-specific limits, from the PDF's Limitations section. */
export const COHORT_REPORT_LIMITS = [
  `Service recovery results rest on 9 and 13 in-scope conversations, because the current cases rarely give a family a reason to raise a concern. Those means shouldn't carry strong claims on their own. The general communication model, scored on all ${COHORT_REPORT_TOTALS.conversations}, can.`,
  "Scenario mixes differed by cohort, so nothing here compares units or programs.",
  "A simulation is a proxy for the bedside, the same proxy in-person simulation already relies on.",
]

/**
 * What a next round looks like. A general version of the PDF's proposed pilot
 * design, with the customer-specific duration, cohort, and timeline removed.
 */
export const COHORT_REPORT_NEXT_ROUND = [
  {
    title: "Confirm the standard",
    body: "Agree on the framework or policy the institution wants to use. Rescoring every conversation against a revised rubric is quick, so the standard can be settled before the round begins.",
  },
  {
    title: "Run the same cases with one defined group",
    body: `Everyone in the group practices the same scenarios. Add cases in which a family raises a concern, since the current library gave a family that chance in only 9 of ${COHORT_REPORT_TOTALS.conversations} conversations.`,
  },
  {
    title: "Return feedback to each participant",
    body: "Each person gets the score, the transcript excerpt behind it, written feedback, and one or two things to practice next.",
  },
  {
    title: "Practice again and compare",
    body: "Participants repeat the cases, and the report compares the group's later attempts with its first ones without ranking individuals.",
  },
  {
    title: "Add faculty validation",
    body: "Faculty independently score a sample of the same transcripts, and agreement with the platform is measured before any broader use.",
  },
]
