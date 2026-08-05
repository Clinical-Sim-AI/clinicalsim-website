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

  ctaHeadline: string
  ctaDescription: string
}

// Shared platform capabilities — these are product features (not statistics),
// safe to reuse across solutions. The competency-framework claim differs by
// audience (ACGME Milestones govern GME trainees only), so that value prop is
// defined per audience below instead of shared.
const ON_DEMAND_VALUE_PROP: SolutionValueProp = {
  title: "On-Demand, Not On-Schedule",
  description:
    "Voice-based AI patient encounters available 24/7 from any device. No standardized patient to recruit, no sim center to book, no faculty observer required to practice.",
}

const DASHBOARD_VALUE_PROP: SolutionValueProp = {
  title: "A Dashboard That Follows the Learner",
  description:
    "Longitudinal scores by subcompetency, learner-by-scenario heatmaps, and flags for anyone trending below benchmark — the same dashboard whether you track one learner or an entire cohort.",
}

const PRIVATE_REPETITION_VALUE_PROP: SolutionValueProp = {
  title: "Private, Judgment-Free Repetition",
  description:
    "A low-stakes environment with no real patients and no social judgment gives learners permission to be imperfect while they build the skill — and makes the human feedback that follows land better.",
}

// For residency and fellowship (ACGME-accredited GME trainees).
const GME_VALUE_PROPS: SolutionValueProp[] = [
  ON_DEMAND_VALUE_PROP,
  {
    title: "Milestone-Aligned Feedback",
    description:
      "Every encounter is rubric-scored and mapped to ACGME Milestones 2.0, with feedback that points to the specific behavior to change rather than a vague “be more empathic.”",
  },
  DASHBOARD_VALUE_PROP,
  PRIVATE_REPETITION_VALUE_PROP,
]

// For medical students (UME is governed by LCME, not ACGME).
const UME_VALUE_PROPS: SolutionValueProp[] = [
  ON_DEMAND_VALUE_PROP,
  {
    title: "Feedback Aligned to UME Competencies",
    description:
      "Every encounter is rubric-scored against the AAMC Foundational Competencies and Core EPAs for Entering Residency, with feedback that points to the specific behavior to change rather than a vague “be more empathic.”",
  },
  DASHBOARD_VALUE_PROP,
  PRIVATE_REPETITION_VALUE_PROP,
]

// For faculty and clinician educators (already-trained, not scored against a trainee milestone framework).
const FACULTY_VALUE_PROPS: SolutionValueProp[] = [
  ON_DEMAND_VALUE_PROP,
  {
    title: "Structured, Rubric-Scored Feedback",
    description:
      "Every encounter is rubric-scored against established feedback frameworks like Pendleton and SBI, with feedback that points to the specific behavior to change rather than a vague “be more empathic.”",
  },
  DASHBOARD_VALUE_PROP,
  PRIVATE_REPETITION_VALUE_PROP,
]

const solutions: Solution[] = [
  // -------------------------------------------------------------------------
  // Communication Remediation — bespoke page (RemediationPageLayout)
  // -------------------------------------------------------------------------
  {
    slug: "remediation",
    title: "Communication Remediation",
    shortTitle: "Remediation",
    subtitle: "Targeted practice for the learner on a remediation plan",
    icon: "chat-exclamation",
    colorVariant: "navy",
    customPage: true,
    cardBullets: [
      "Targeted, milestone-mapped practice for a struggling learner",
      "Unlimited on-demand repetitions — no SP, no scheduling",
      "CCC-ready documentation from every session",
    ],
    metaTitle:
      "Communication Remediation | ClinicalSim",
    metaDescription:
      "AI clinical simulation for communication remediation. Milestone-mapped practice and CCC-ready documentation for the learner on a remediation plan.",
    heroHeadline:
      "Communication remediation with evidence for the CCC",
    heroDescription:
      "Targeted, on-demand practice with a milestone-mapped progress dashboard that drops into the next CCC packet.",
    ctaHeadline: "The remediation toolkit CERA asked for is here.",
    ctaDescription:
      "See how structured AI practice with milestone-aligned feedback changes how your program approaches communication remediation.",
  },

  // -------------------------------------------------------------------------
  // Residency & Fellowship — longitudinal curriculum
  // -------------------------------------------------------------------------
  {
    slug: "longitudinal-curriculum",
    title: "Residency & Fellowship",
    shortTitle: "Residency & Fellowship",
    subtitle: "A longitudinal communication curriculum across PGY years",
    icon: "stack",
    colorVariant: "accent",
    cardBullets: [
      "A gradual arc from PGY-1 to senior resident and fellow",
      "Mapped to ACGME Milestones 2.0 and ABP EPAs",
      "A trackable dashboard that follows learners year over year",
    ],
    metaTitle: "Residency & Fellowship Communication Curriculum | ClinicalSim",
    metaDescription:
      "A longitudinal communication curriculum for residency and fellowship. Cases progress across PGY years, mapped to ACGME Milestones 2.0 and EPAs.",
    heroHeadline: "Communication that grows with clinical responsibility",
    heroDescription:
      "Cases progress in clinical responsibility, cognitive load, and emotional intensity across PGY years. Every encounter is mapped to ACGME Milestones 2.0 subcompetencies, ABP Entrustable Professional Activities, and the ICS guideline framework — so communication develops on a deliberate arc rather than by chance.",
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
          "New diagnoses, parental disagreement, and communicating uncertainty. The learner moves from information delivery to the relational work of a difficult conversation.",
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
          "No. The platform creates practice volume and a psychologically safe place to rehearse, so that scarce faculty time goes to coaching rather than facilitation. A faculty mentor watching a learner run a real family meeting is irreplaceable; structured practice makes that feedback land better.",
      },
    ],
    relatedPostSlugs: [
      "what-programs-lost-when-step-2-cs-disappeared",
      "breaking-bad-news-practice-not-knowledge",
      "faculty-hour-problem-communication-remediation",
    ],
    ctaHeadline: "Build a communication curriculum that spans training.",
    ctaDescription:
      "See how a longitudinal arc of milestone-mapped scenarios develops communication skill from intern year through fellowship.",
  },

  // -------------------------------------------------------------------------
  // Undergraduate Medical Education (UME)
  // -------------------------------------------------------------------------
  {
    slug: "undergraduate-medical-education",
    title: "Undergraduate Medical Education",
    shortTitle: "Medical School (UME)",
    subtitle: "From history-taking to delivering a diagnosis, across four years",
    icon: "student",
    colorVariant: "blue",
    cardBullets: [
      "A four-year arc from M1 history-taking to M4 diagnosis disclosure",
      "Communication grows alongside clinical knowledge",
      "A dashboard that follows students through clerkships",
    ],
    metaTitle: "Undergraduate Medical Education (UME) Communication | ClinicalSim",
    metaDescription:
      "Sequence communication practice across all four years of medical school — from history-taking to delivering a new diagnosis — with a dashboard that follows students through clerkships.",
    heroHeadline: "Build communication skills alongside clinical knowledge",
    heroDescription:
      "Medical schools can sequence scenarios across the four years so communication grows alongside clinical knowledge. Each step builds on the last, with a dashboard that follows the student from the first history through clerkships.",
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
          "Scenarios are sequenced so that communication complexity rises with clinical knowledge — from structured history-taking in the preclinical years to delivering a new diagnosis in the clerkship years. A longitudinal dashboard follows each student across the four years.",
      },
      {
        question: "Can it support standardized-patient and OSCE preparation?",
        answer:
          "Yes. The platform gives students unlimited on-demand reps between scheduled standardized-patient encounters and OSCEs, so high-stakes, in-person sessions are spent demonstrating skill rather than building it for the first time.",
      },
    ],
    relatedPostSlugs: [
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
      "breaking-bad-news-medical-training",
    ],
    ctaHeadline: "Sequence communication across all four years.",
    ctaDescription:
      "See how a four-year arc of scenarios develops communication skill from the first patient history to delivering a diagnosis.",
  },

  // -------------------------------------------------------------------------
  // Faculty Development
  // -------------------------------------------------------------------------
  {
    slug: "faculty-development",
    title: "Faculty Development",
    shortTitle: "Faculty Development",
    subtitle: "The conversations faculty are expected to model",
    icon: "group",
    colorVariant: "light-blue",
    cardBullets: [
      "Practice giving difficult, specific feedback",
      "Navigate professionalism conversations with peers",
      "Rehearse bedside and small-group teaching",
    ],
    metaTitle: "Faculty Development Communication Practice | ClinicalSim",
    metaDescription:
      "Attendings and clinician educators practice the conversations they're expected to model — giving feedback, professionalism concerns, and bedside teaching — with the same rubric-scored simulation.",
    heroHeadline: "Faculty have to model conversations no one trained them for",
    heroDescription:
      "The platform isn't only for trainees. Attendings, fellows-as-teachers, and clinician educators practice the conversations they're expected to model — giving difficult feedback, navigating professionalism concerns, and teaching at the bedside — with the same rubric-scored simulation. Because confidence in these conversations is often the absence of feedback, not evidence of skill: in one survey, the attendings furthest out from training reported the highest confidence and the least formal preparation.",
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
        title: "Hard conversations with peers",
        description:
          "Address lateness, disengagement, or a colleague performing below expectations — directly, but without damaging the working relationship.",
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
          "Because confidence is not evidence of skill — it is largely the absence of feedback. Faculty are expected to model feedback, professionalism, and teaching conversations they were rarely formally trained to lead, and they almost never get objective, structured feedback on how they run them. The platform provides that feedback in a private, low-stakes setting.",
      },
      {
        question: "Does this use the same system as trainee scenarios?",
        answer:
          "Yes. Faculty-development scenarios run on the same engine, rubric structure, and dashboard as the trainee-facing programs — so an institution can support learners and the faculty who teach them from one platform.",
      },
    ],
    relatedPostSlugs: [
      "eol-communication-training-measurement-gap",
      "why-communication-training-matters",
      "end-of-life-care-communication",
    ],
    ctaHeadline: "Give faculty the practice they never got.",
    ctaDescription:
      "See how attendings and clinician educators rehearse feedback, professionalism, and teaching conversations with structured, objective feedback.",
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
