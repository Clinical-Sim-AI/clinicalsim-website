import type { BrandIconName } from "@/components/brand-icon"

export interface SolutionStage {
  /** Short label for the stage, e.g. "PGY-1", "M1/M2", "Giving feedback" */
  label: string
  title: string
  description: string
}

export interface SolutionFaq {
  question: string
  answer: string
}

export interface SolutionStatItem {
  value: string
  label: string
  source?: string
  variant: "accent" | "navy" | "blue" | "light-blue"
}

export interface SolutionValueProp {
  title: string
  description: string
}

export interface Solution {
  slug: string
  title: string
  shortTitle: string
  subtitle: string
  icon: BrandIconName
  colorVariant: "accent" | "navy" | "blue" | "light-blue"

  /** Bullets shown on the homepage / solutions-index cards */
  cardBullets: string[]

  /**
   * When true, a bespoke page owns the `/solutions/<slug>` route and this entry
   * exists only for navigation, the index, and the sitemap (see remediation).
   * The generic SolutionPageLayout renders every other solution.
   */
  customPage?: boolean

  // Page metadata
  metaTitle: string
  metaDescription: string

  // Hero
  heroHeadline: string
  heroDescription: string
  lastUpdated?: string

  // The progression / topic arc
  stagesHeading?: string
  stagesIntro?: string
  stages?: SolutionStage[]

  // What you get
  valueProps?: SolutionValueProp[]

  faqs?: SolutionFaq[]
  relatedPostSlugs?: string[]
  /**
   * Glossary slugs to link from this page. The only inbound path to a term page
   * used to be the /glossary hub, so authority reaching a solution page stopped
   * there. Hub-only terms are dropped at render time; list indexable ones.
   */
  glossarySlugs?: string[]

  ctaHeadline: string
  ctaDescription: string
}

// Shared platform capabilities are product features, not statistics, and are
// safe to reuse across solutions. The competency-framework claim differs by
// audience (ACGME Milestones govern GME trainees only), so that value prop is
// defined per audience below instead of shared.
const ON_DEMAND_VALUE_PROP: SolutionValueProp = {
  title: "On demand, not on schedule",
  description:
    "Voice-based AI patient encounters available 24/7 from any device. No standardized patient to recruit, no sim center to book, no faculty observer required to practice.",
}

const DASHBOARD_VALUE_PROP: SolutionValueProp = {
  title: "A dashboard that follows the learner",
  description:
    "Review repeated attempts, subcompetency scores, and case reports in one dashboard for an individual learner or cohort.",
}

const PRIVATE_REPETITION_VALUE_PROP: SolutionValueProp = {
  title: "Private, repeatable practice",
  description:
    "Learners can repeat a case in private before sharing the report with a faculty member, coach, or program.",
}

// For residency and fellowship (ACGME-accredited GME trainees).
const GME_VALUE_PROPS: SolutionValueProp[] = [
  ON_DEMAND_VALUE_PROP,
  {
    title: "Milestone-aligned feedback",
    description:
      "Each report maps observed behavior to the relevant ACGME Milestones 2.0 and cites the learner's words behind the rating.",
  },
  DASHBOARD_VALUE_PROP,
  PRIVATE_REPETITION_VALUE_PROP,
]

// For medical students (UME is governed by LCME, not ACGME).
const UME_VALUE_PROPS: SolutionValueProp[] = [
  ON_DEMAND_VALUE_PROP,
  {
    title: "Feedback aligned to UME competencies",
    description:
      "Each report uses the AAMC Foundational Competencies and the communication framework named on the case, with feedback tied to transcript evidence.",
  },
  DASHBOARD_VALUE_PROP,
  PRIVATE_REPETITION_VALUE_PROP,
]

// For faculty and clinician educators (already-trained, not scored against a trainee milestone framework).
const FACULTY_VALUE_PROPS: SolutionValueProp[] = [
  ON_DEMAND_VALUE_PROP,
  {
    title: "Structured, rubric-scored feedback",
    description:
      "Each report uses the framework named on the case and ties feedback to specific behavior in the transcript.",
  },
  DASHBOARD_VALUE_PROP,
  PRIVATE_REPETITION_VALUE_PROP,
]

const solutions: Solution[] = [
  // -------------------------------------------------------------------------
  // Communication Remediation, bespoke page (RemediationPageLayout)
  // -------------------------------------------------------------------------
  {
    slug: "remediation",
    title: "Communication remediation",
    shortTitle: "Remediation",
    subtitle: "Targeted practice for the learner on a remediation plan",
    icon: "chat-exclamation",
    colorVariant: "navy",
    customPage: true,
    lastUpdated: "2026-08-10",
    cardBullets: [
      "Targeted, milestone-mapped practice for a struggling learner",
      "Repeatable, on-demand practice without SP scheduling",
      "Reports with transcript evidence for CCC review",
    ],
    metaTitle: "Communication remediation",
    metaDescription:
      "AI clinical simulation for communication remediation. Milestone-mapped practice and transcript evidence for faculty and CCC review.",
    heroHeadline:
      "Communication remediation with evidence for the CCC",
    heroDescription:
      "Targeted, on-demand practice with milestone-aligned reports and transcript evidence for faculty and CCC review.",
    ctaHeadline: "Start with a repeatable remediation structure",
    ctaDescription:
      "Review how structured practice and milestone-aligned feedback could fit a communication remediation plan.",
  },

  // -------------------------------------------------------------------------
  // Residency & Fellowship, longitudinal curriculum
  // -------------------------------------------------------------------------
  {
    slug: "longitudinal-curriculum",
    title: "Residency and fellowship",
    shortTitle: "Residency and fellowship",
    subtitle: "A longitudinal communication curriculum across PGY years",
    icon: "stack",
    colorVariant: "accent",
    lastUpdated: "2026-08-10",
    cardBullets: [
      "A gradual arc from PGY-1 to senior resident and fellow",
      "Mapped to ACGME Milestones 2.0 and ABP EPAs",
      "A trackable dashboard that follows learners year over year",
    ],
    metaTitle: "Residency and fellowship communication curriculum",
    metaDescription:
      "A longitudinal communication curriculum for residency and fellowship. Cases progress across PGY years, mapped to ACGME Milestones 2.0 and EPAs.",
    heroHeadline: "Communication practice that grows with clinical responsibility",
    heroDescription:
      "Cases progress from clear information delivery to uncertainty, family meetings, and leadership. Each case uses the ACGME Milestones and communication framework that fit the learner, specialty, and task.",
    stagesHeading: "The arc across training",
    stagesIntro:
      "Increasing complexity, emotional intensity, and leadership demand from intern year through fellowship.",
    stages: [
      {
        label: "PGY-1",
        title: "Communicate safely",
        description:
          "Discharge counseling, normal results, and safety-netting, using frameworks like teach-back and HEEADSSS. The goal is clear, accurate information delivery.",
      },
      {
        label: "PGY-2",
        title: "Adapt under pressure",
        description:
          "New diagnoses, parental disagreement, and communicating uncertainty. The learner moves from information delivery to the relational work of a high-stakes conversation.",
      },
      {
        label: "PGY-3+ / Fellow",
        title: "Lead and guide",
        description:
          "Goals-of-care discussions, ICU escalation, and error disclosure involving harm. Learners lead family meetings and begin coaching juniors.",
      },
    ],
    valueProps: GME_VALUE_PROPS,
    faqs: [
      {
        question:
          "How is the curriculum mapped to ACGME milestones and EPAs?",
        answer:
          "Each scenario is tagged to specific ACGME Milestones 2.0 subcompetencies and, where applicable, to ABP Entrustable Professional Activities. Rubric scores trace back to a milestone or EPA descriptor, so a learner's progress reads in the same language your Clinical Competency Committee already uses.",
      },
      {
        question: "Does this replace bedside teaching and faculty feedback?",
        answer:
          "No. The platform gives learners private, repeatable practice, so faculty time can stay focused on coaching. A faculty mentor observing a real family meeting provides human judgment that ClinicalSim does not replace.",
      },
    ],
    relatedPostSlugs: [
      "what-programs-lost-when-step-2-cs-disappeared",
      "breaking-bad-news-practice-not-knowledge",
      "faculty-hour-problem-communication-remediation",
    ],
    glossarySlugs: [
      "cbme",
      "milestones",
      "epa",
      "deliberate-practice",
      "master-adaptive-learner",
      "millers-pyramid",
    ],
    ctaHeadline: "Build a communication curriculum that spans training.",
    ctaDescription:
      "Review a longitudinal sequence of milestone-mapped cases from intern year through fellowship.",
  },

  // -------------------------------------------------------------------------
  // Undergraduate Medical Education (UME)
  // -------------------------------------------------------------------------
  {
    slug: "undergraduate-medical-education",
    title: "Undergraduate medical education",
    shortTitle: "Medical school (UME)",
    subtitle: "From history-taking to delivering a diagnosis, across four years",
    icon: "student",
    colorVariant: "blue",
    lastUpdated: "2026-08-20",
    cardBullets: [
      "A four-year arc from M1 history-taking to M4 diagnosis disclosure",
      "OSCE practice on demand between scheduled SP encounters",
      "A dashboard that follows students through clerkships",
    ],
    metaTitle: "OSCE practice for medical students (UME)",
    metaDescription:
      "Give medical students virtual OSCE practice between scheduled standardized patient encounters, sequenced across four years from the first history through diagnosis disclosure.",
    heroHeadline: "Build communication skills alongside clinical knowledge",
    heroDescription:
      "Sequence practice from the first patient history through diagnosis disclosure and clerkship conversations, including the communication stations students meet in an OSCE. Each report uses the AAMC Foundational Competencies and the communication framework named on the case.",
    stagesHeading: "A four-year progression",
    stagesIntro:
      "Communication competency sequenced to develop in step with the curriculum.",
    stages: [
      {
        label: "M1 / M2",
        title: "History taking",
        description:
          "Structured intake, building rapport, eliciting the chief complaint, and asking about sensitive history without breaking trust.",
      },
      {
        label: "M3",
        title: "Updating the family on a plan",
        description:
          "Translating a working diagnosis and treatment plan into plain language, checking understanding with teach-back, and handling questions.",
      },
      {
        label: "M4",
        title: "Delivering a new diagnosis",
        description:
          "Disclosing a serious new diagnosis with structure (SPIKES), responding to emotion, and outlining next steps clearly.",
      },
    ],
    valueProps: UME_VALUE_PROPS,
    faqs: [
      {
        question: "How does this fit a four-year UME curriculum?",
        answer:
          "Scenarios are sequenced so communication complexity rises with clinical knowledge, beginning with structured history-taking in the preclinical years and progressing to diagnosis disclosure during clerkships. A longitudinal dashboard follows each student across all four years.",
      },
      {
        question: "Can students use it to prepare for an OSCE?",
        answer:
          "Students get repeatable OSCE practice on demand between scheduled standardized patient encounters, rehearsing the communication tasks a station asks for: taking a focused history, explaining a diagnosis, and answering a family's questions. Scheduled SP encounters are limited by actor time, rooms, and faculty observers, so they can score a communication skill without giving a student the repetition needed to build one. Live assessment stays with faculty and the program. Extend your SP program, don't replace it.",
      },
      {
        question: "What does a virtual OSCE station look like here?",
        answer:
          "A student opens a case, speaks with an AI patient by voice for about the length of a station, and gets a report scored against the rubric written for that case and the AAMC Foundational Competencies. The encounter is transcribed, so a student can read back what they actually said rather than what they remember saying, which is the part a hurried debrief after a real OSCE rarely reaches. Graded encounters stay with faculty.",
      },
    ],
    relatedPostSlugs: [
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
      "breaking-bad-news-practice-not-knowledge",
    ],
    glossarySlugs: [
      "osce",
      "standardized-patient",
      "ai-standardized-patient",
      "virtual-patient-simulation",
      "spikes-protocol",
      "clinical-reasoning",
    ],
    ctaHeadline: "Sequence communication across all four years.",
    ctaDescription:
      "Review a four-year sequence from the first patient history through diagnosis disclosure.",
  },

  // -------------------------------------------------------------------------
  // Faculty Development
  // -------------------------------------------------------------------------
  {
    slug: "faculty-development",
    title: "Faculty development",
    shortTitle: "Faculty development",
    subtitle: "The conversations faculty are expected to model",
    icon: "group",
    colorVariant: "light-blue",
    lastUpdated: "2026-08-10",
    cardBullets: [
      "Practice giving specific corrective feedback",
      "Lead professionalism conversations with peers",
      "Rehearse bedside and small-group teaching",
    ],
    metaTitle: "Faculty development communication practice",
    metaDescription:
      "Attendings and clinician educators practice the conversations they're expected to model, including feedback, professionalism concerns, and bedside teaching, with rubric-scored simulation.",
    heroHeadline: "Build communication practice into faculty development",
    heroDescription:
      "Faculty can rehearse corrective feedback, professionalism concerns, bedside teaching, and peer conversations before they lead them in person. Each session produces framework-based feedback they can review privately or with a coach.",
    stagesHeading: "What faculty practice",
    stagesIntro:
      "The same rubric system that trains residents, turned toward the skills faculty are expected to demonstrate.",
    stages: [
      {
        label: "Giving feedback",
        title: "Constructive, specific, timely",
        description:
          "Deliver corrective feedback to a learner with structure (Pendleton, SBI) and handle defensiveness without dissolving the relationship.",
      },
      {
        label: "Professionalism",
        title: "Professionalism conversations with peers",
        description:
          "Address lateness, disengagement, or a colleague performing below expectations directly, without damaging the working relationship.",
      },
      {
        label: "Teaching",
        title: "Bedside and small-group",
        description:
          "Practice teach-back from the teacher's side, calibrating to the learner's level and protecting time for questions.",
      },
    ],
    valueProps: FACULTY_VALUE_PROPS,
    faqs: [
      {
        question: "Why would experienced faculty need communication practice?",
        answer:
          "Faculty are expected to model feedback, professionalism, and teaching conversations. The platform gives them a private place to rehearse and review rubric-scored feedback before leading those conversations in person.",
      },
      {
        question: "Does this use the same system as trainee scenarios?",
        answer:
          "Yes. Faculty-development scenarios run on the same engine, rubric structure, and dashboard as the trainee-facing programs, so an institution can support learners and the faculty who teach them from one platform.",
      },
    ],
    relatedPostSlugs: [
      "eol-communication-training-measurement-gap",
      "why-communication-training-matters",
      "end-of-life-care-communication",
    ],
    glossarySlugs: [
      "debriefing",
      "pearls-debriefing",
      "plus-delta-debriefing",
      "prebriefing",
      "ask-tell-ask",
      "psychological-safety-in-simulation",
    ],
    ctaHeadline: "Add communication practice to faculty development",
    ctaDescription:
      "Review cases for corrective feedback, professionalism concerns, and bedside teaching.",
  },
]

export function getAllSolutions(): Solution[] {
  return solutions
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}

/** Solutions rendered by the generic SolutionPageLayout (excludes bespoke pages). */
export function getGenericSolutions(): Solution[] {
  return solutions.filter((s) => !s.customPage)
}
