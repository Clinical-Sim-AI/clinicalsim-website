// Product scope: /audiences/nursing-leadership, /solutions/patient-experience,
// /solutions/workforce-retention, and /help/roles-and-permissions.
//
// The cases table lists only catalog cases in which the learner plays the nurse, checked against
// the catalog's card descriptions on 2026-11-06. The catalog's rapid response, NEC, handoff,
// error disclosure, discharge dispute, and charge nurse cases put the learner in a physician's
// role, so they stay off this page until a nurse-side version exists.
import { COHORT_REPORT_META, COHORT_REPORT_PATH, COHORT_REPORT_SUMMARY } from "@/lib/cohort-report"
import type { ContentSection } from "@/lib/content-sections"
import { headingId } from "@/lib/howto-schema"

export const NURSING_URL = "https://clinicalsim.ai/nursing"

/** The H1. The <title> is the same text through the root template, so it renders with the suffix. */
export const NURSING_HEADLINE = "Voice AI simulation for nursing communication training"

export const nursingDescription =
  "Nurses and nursing students practice high-stakes conversations out loud with AI patients and families, then get feedback scored against your standard with their own words quoted behind each score."

export const NURSING_HOWTO_HEADING = "How ClinicalSim voice simulation works for nurses"

/** Rendered as a visible numbered list and as the HowTo node, from this one array. */
export const nursingHowToSteps = [
  {
    name: "Choose the case and the standard",
    text: "Your educator picks or approves the case and the standard it is scored against, such as SBAR, teach-back, or your hospital's own service standard.",
  },
  {
    name: "Talk it through out loud",
    text: "The nurse opens the case in a browser and talks with the AI patient, family member, or colleague.",
  },
  {
    name: "Hear the other person respond",
    text: "The AI character stays in role and responds with the questions, worry, or frustration the case calls for.",
  },
  {
    name: "Read the feedback",
    text: "The nurse gets a report with strengths, next steps, and a score for each step of the standard, each one backed by quoted lines from the transcript.",
  },
  {
    name: "Practice again",
    text: "The nurse repeats the case, and educators see practice across the cohort under the reporting rules the institution agreed to.",
  },
]

export const nursingSections: ContentSection[] = [
  {
    type: "prose",
    id: "who-its-for",
    heading: "Built for nurses on the unit and the programs that train them",
    paragraphs: [
      "Many voice AI tools for nursing are built for students preparing for clinical skills checks and licensing exams. ClinicalSim trains what nurses say, whether that is an update for a family that has waited all night or a call to a physician about a patient who is getting worse. It is built for nurses already on the unit, new graduates in residency, and the schools preparing them.",
      "It doesn't teach physical assessment or stand in for hands-on skills time. Nurses practice the conversation itself, out loud, and can run the case again after reading their feedback.",
    ],
  },
  {
    type: "list",
    id: headingId(NURSING_HOWTO_HEADING),
    heading: NURSING_HOWTO_HEADING,
    ordered: true,
    items: nursingHowToSteps.map((step) => ({ id: headingId(step.name), title: step.name, text: step.text })),
  },
  {
    type: "cases",
    id: "conversations",
    heading: "Conversations nurses can practice",
    intro:
      "Each case below puts the learner in the nurse's role. Each one can be scored against the standard your unit already teaches, and your educator confirms which cases fit before anyone is assigned.",
    columns: ["Conversation", "Standard it can be scored against", "Nurse-side case in the catalog"],
    rows: [
      [
        "Updating a waiting or worried family",
        "Ask-tell-ask with teach-back, with NURSE empathy responses reported",
        "48 Hours in the Hallway",
      ],
      [
        "Raising a safety concern with a physician",
        "SBAR, or your escalation policy",
        "Two Hours After the Biopsy",
      ],
    ],
    catalogHref: "https://platform.clinicalsim.ai/catalog",
    catalogLabel: "Browse the full catalog",
    links: [
      { label: "Nurse residency practice: escalation, handoffs, and family questions", href: "/solutions/workforce-retention" },
      { label: "Discharge teaching and teach-back practice", href: "/solutions/patient-understanding" },
    ],
  },
  {
    type: "list",
    id: "feedback",
    heading: "Feedback nurses can inspect and use",
    intro:
      "Each nurse reads their own report first. It shows what they did well and what to practice next, so the next attempt has a clear focus.",
    ordered: false,
    items: [
      "Every score quotes what the nurse said, or notes what was missing.",
      "Scores follow your hospital's standard. Where a unit doesn't have one, the case uses a published framework such as SBAR or teach-back.",
      "Practice scores stay out of performance reviews.",
    ],
  },
  {
    type: "report-excerpt",
    id: "example-strength",
    heading: "From a nursing report: what went well",
    intro:
      "In 48 Hours in the Hallway, the learner plays an emergency department nurse talking with the daughter of a patient who has been boarding in a hallway bed while he waits for a procedure and an inpatient bed. The report credited the nurse's empathy and the clear follow-up plan.",
    quote:
      "Supporting was handled with real skill: concrete, repeated, specific commitments that directly answered the daughter's fear of being forgotten in the system, capped by a clear read-back of exactly what she would do next.",
    source: { exampleSlug: "48-hours-in-the-hallway", label: "48 Hours in the Hallway" },
    note: "Supporting is the S in the NURSE empathy framework. The report quotes the line that earned it: \"I promise, as soon as I know something, you'll know something.\"",
  },
  {
    type: "report-excerpt",
    id: "example-next-step",
    heading: "From the same report: what to practice next",
    quote:
      "Use teach-back by having the family member restate the plan in their own words, framed as checking your own clarity.",
    source: { exampleSlug: "48-hours-in-the-hallway", label: "48 Hours in the Hallway" },
    note: "The report also suggests asking what the daughter already understands before explaining, with sample wording for both steps. Read the transcript and listen to the recording alongside the feedback. This is one simulated encounter, not evidence of nursing outcomes.",
  },
  {
    type: "cards",
    id: "where-it-fits",
    heading: "Where it fits: nurse residency, Magnet, patient experience, and nursing schools",
    cards: [
      {
        title: "Nurse residency",
        description:
          "New graduates practice escalation, handoffs, and family questions before they face them alone, between teaching sessions and preceptor coaching.",
        href: "/solutions/workforce-retention",
        linkLabel: "Nurse residency practice",
      },
      {
        title: "Magnet and professional development",
        description:
          "Practice records can feed a unit's professional development program. ClinicalSim isn't affiliated with ANCC, and practice doesn't establish Magnet recognition or compliance.",
        href: "/audiences/nursing-leadership",
        linkLabel: "For nurse leaders",
      },
      {
        title: "Patient experience",
        description:
          "Practice targets the HCAHPS nurse communication themes of courtesy and respect, careful listening, and clear explanation. It doesn't predict HCAHPS results.",
        href: "/solutions/patient-experience",
        linkLabel: "Patient experience practice",
      },
      {
        title: "Nursing schools",
        description:
          "Students practice the conversations they will have in clinicals and their first year, scored against the school's rubric. It adds to lab time and standardized patients rather than replacing them.",
        href: "/compare/ai-clinical-simulation-vs-standardized-patients",
        linkLabel: "How AI practice fits with standardized patients",
      },
    ],
    links: [
      {
        label: "CMS HCAHPS question crosswalk, which lists the Communication with Nurses questions",
        href: "https://www.hcahpsonline.org/globalassets/hcahps/updated-hcahps-survey/crosswalk-of-updated-hcahps-survey-questions-to-sub-measures-.pdf",
      },
      { label: "ANCC Magnet Model", href: "https://www.nursingworld.org/organizational-programs/magnet/magnet-model" },
    ],
  },
  {
    type: "list",
    id: "privacy-and-reporting",
    heading: "Privacy and reporting for nursing teams",
    intro:
      "Each nurse sees their own feedback. Leaders see only what the institution agrees to before anyone starts.",
    ordered: false,
    items: [
      "Unit and cohort reporting can be anonymous, so leaders see patterns without names.",
      "Every case is simulated. Case content is synthetic, with no real patients and no protected health information.",
      "Results are formative and must not be used for hiring, discipline, compensation, credentialing, or licensure.",
      {
        title: "What a cohort report looks like.",
        text: `${COHORT_REPORT_SUMMARY} That cohort was ${COHORT_REPORT_META.participants}, so read it as an example of the format rather than a nursing result.`,
      },
    ],
    links: [
      { label: "How we handle data, privacy, and reporting", href: "/trust" },
      { label: "Read the anonymized health system cohort report", href: COHORT_REPORT_PATH },
    ],
  },
]

export const NURSING_FAQ_HEADING = "Voice AI nursing simulation questions"

export const nursingFaqs = [
  {
    question: "What is voice AI simulation for nursing communication training?",
    answer:
      "It is spoken practice with an AI patient, family member, or colleague in a simulated case. The nurse talks out loud in a browser, the AI character answers in role, and a report scores the conversation against the standard the educator chose, quoting the nurse's words behind each score. Nurses can read the feedback and run the case again.",
  },
  {
    question: "How is ClinicalSim different from voice AI tools built for nursing students?",
    answer:
      "It focuses on communication rather than clinical skills or exam prep, and it scores each conversation against your own standard. Working nurses, new graduates in residency, and students can all use it. Every score quotes what the nurse said, so an educator can check the reasoning behind a number instead of taking it on trust.",
  },
  {
    question: "Can we use our hospital's own communication standard?",
    answer:
      "Yes. Your educator chooses the case and the hospital standard or published framework used for feedback, then agrees which spoken behaviors the case can assess and who sees results before anyone practices. The feedback is formative, and faculty-rater validation on a customer's own rubric has not been completed.",
  },
  {
    question: "Does it score tone of voice?",
    answer:
      "No. Scoring reads the transcript of what the nurse said. Each score quotes lines from that transcript, or notes that a step was missing, so the nurse and educator can see which words earned it. The nurse still practices out loud, because finding the words in the moment is the skill being built.",
  },
  {
    question: "Will this improve our HCAHPS nurse communication scores?",
    answer:
      "ClinicalSim does not predict HCAHPS scores, and no current evidence shows that its practice scores change them. Educators can choose practice behaviors related to listening, respect, and clear explanations, while any comparison with hospital survey data needs a separate study plan agreed before the practice starts.",
  },
  {
    question: "Does ClinicalSim establish Magnet or nurse residency compliance?",
    answer:
      "No. We aren't affiliated with ANCC or Vizient, and practice scores don't establish Magnet recognition or accreditation compliance. Nursing educators decide how practice records fit their professional development program and institutional review process, and any compliance decision belongs to the surveyor who reviews the program.",
  },
  {
    question: "Can nursing schools use ClinicalSim?",
    answer:
      "Yes. Students practice the conversations they will have in clinicals and their first year, such as updating a worried family or calling a physician about a change in condition, scored against the school's own rubric. It adds to lab time and standardized patients rather than replacing them, and it makes no claim about licensing exam results.",
  },
  {
    question: "What do nurses need to take part?",
    answer:
      "Nurses need a phone, tablet, or computer with a browser, internet access, microphone access, and a place where they can speak privately. Nothing needs installing, and institutional IT may need to allow the voice service before the first session. Practice is in English.",
  },
  {
    question: "Who sees a nurse's practice results?",
    answer:
      "The institution decides before anyone practices. Each nurse sees their own report, and leaders can see completion, named reports with agreed access, or anonymous results reported only by unit or cohort. Formative scores must not decide hiring, discipline, compensation, credentialing, privileging, or licensure.",
  },
  {
    question: "Does it replace simulation lab time or standardized patients?",
    answer:
      "No. Voice practice extends your SP program and lab time, and it doesn't replace either. Standardized patient encounters remain the gold standard for live coaching and high-stakes assessment. Nurses use AI practice between those sessions to rehearse a conversation, read feedback, and try again without booking an actor, a room, or a faculty observer.",
  },
]
