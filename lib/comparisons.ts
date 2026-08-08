export interface ComparisonRow {
  dimension: string
  optionA: string
  optionB: string
}

export interface ComparisonFaq {
  question: string
  answer: string
}

export interface Comparison {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  heroHeadline: string
  /** Answer-first 40 to 80 word summary that lifts cleanly out of context. */
  intro: string
  optionALabel: string
  optionBLabel: string
  rows: ComparisonRow[]
  lastUpdated?: string
  relatedSolutionSlugs?: string[]
  relatedPostSlugs?: string[]
  faqs?: ComparisonFaq[]
}

// Neutral, category-level comparisons only. No named competitors. Claims are
// either qualitative or tied to figures already published elsewhere on the
// site. Never invent statistics or make unsourced claims about a specific
// company's product.
const comparisons: Comparison[] = [
  {
    slug: "ai-clinical-simulation-vs-standardized-patients",
    title: "AI Clinical Simulation vs. Standardized Patients",
    metaTitle:
      "AI Clinical Simulation vs. Standardized Patients: A Comparison",
    metaDescription:
      "How AI clinical simulation and standardized patients (SPs) compare across cost, availability, scheduling, and scoring, and where each fits in a communication training program.",
    heroHeadline:
      "AI clinical simulation vs. standardized patients",
    intro:
      "AI clinical simulation and standardized patients are complementary, not interchangeable. Programs use standardized patients for live, high-stakes assessment where human realism matters most. AI simulation adds on-demand deliberate practice between those encounters, with a consistent scenario and rubric, so learners arrive at SP encounters and OSCEs having already practiced.",
    optionALabel: "AI Clinical Simulation",
    optionBLabel: "Standardized Patients (SPs)",
    rows: [
      {
        dimension: "Cost per encounter",
        optionA:
          "An institutional license does not require a separate actor or room booking for each session.",
        optionB:
          "Varies by actor wages, training, staffing, space, and faculty support.",
      },
      {
        dimension: "Scalability",
        optionA:
          "Unlimited concurrent encounters; an entire cohort can practice at once.",
        optionB:
          "Bounded by the number of trained SPs, available rooms, and faculty observers.",
      },
      {
        dimension: "Availability",
        optionA:
          "On demand, 24/7, from any device.",
        optionB:
          "Limited to scheduled sessions during simulation-center hours.",
      },
      {
        dimension: "Standardization",
        optionA:
          "Identical scenario and rubric every time, with no inter-rater drift.",
        optionB:
          "High human realism; portrayal and scoring can vary between individual SPs and raters.",
      },
      {
        dimension: "Scheduling",
        optionA:
          "No booking required; a learner starts the moment they need practice.",
        optionB:
          "Requires coordinating SPs, rooms, and observers in advance.",
      },
      {
        dimension: "Scoring & documentation",
        optionA:
          "Every encounter rubric-scored and mapped to ACGME Milestones 2.0, with a record generated automatically.",
        optionB:
          "Rich, human-rated assessment; rigorous but resource-intensive to score and aggregate longitudinally.",
      },
      {
        dimension: "Best-fit role",
        optionA:
          "High-volume deliberate practice and remediation between high-stakes encounters.",
        optionB:
          "Gold-standard high-stakes and summative assessment, including OSCEs.",
      },
    ],
    lastUpdated: "2026-08-07",
    relatedSolutionSlugs: ["remediation", "undergraduate-medical-education"],
    relatedPostSlugs: [
      "scalability-problem-sp-programs",
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
    ],
    faqs: [
      {
        question:
          "Does AI clinical simulation replace standardized patients?",
        answer:
          "No. AI clinical simulation is designed to extend standardized patient programs, not replace them. Programs continue to use SPs for live, high-stakes assessment, while AI simulation provides on-demand deliberate practice between those encounters.",
      },
      {
        question:
          "Why is AI simulation more scalable than standardized patients?",
        answer:
          "Standardized patient encounters are bounded by the number of trained SPs, available rooms, and faculty observers. AI clinical simulation can run concurrent encounters on demand, so a cohort can practice without booking a separate actor and room for each learner.",
      },
      {
        question:
          "How does AI simulation keep assessment consistent?",
        answer:
          "Every AI encounter uses an identical scenario and rubric, eliminating the inter-rater and portrayal variability that can occur across human raters. Scores are mapped to ACGME Milestones 2.0 and recorded automatically, producing standardized, longitudinally comparable data.",
      },
    ],
  },
  {
    slug: "voice-vs-text-virtual-patient-simulation",
    title: "Voice-Based vs. Text-Based AI Patient Simulation",
    metaTitle:
      "Voice-Based vs. Text-Based AI Patient Simulation",
    metaDescription:
      "How voice-based and text-based AI patient simulation compare for clinical communication training, including realism, skills assessed, accessibility, and where each format fits.",
    heroHeadline:
      "Voice-based vs. text-based AI patient simulation",
    intro:
      "Text-based AI patients are useful for practicing clinical reasoning and information gathering, but spoken conversation is where most communication skill actually lives. Voice-based simulation lets learners practice tone, pacing, silence, and responses to emotion in real time, which more closely mirrors the encounters clinicians face at the bedside.",
    optionALabel: "Voice-Based Simulation",
    optionBLabel: "Text-Based Simulation",
    rows: [
      {
        dimension: "Fidelity to real encounters",
        optionA:
          "Spoken, real-time dialogue that mirrors an actual patient conversation.",
        optionB:
          "Typed exchange; useful but removed from the dynamics of live speech.",
      },
      {
        dimension: "Communication skills exercised",
        optionA:
          "Tone, pacing, silence, interruption, and responding to emotion in the moment.",
        optionB:
          "Word choice and structure, with less practice of paralinguistic skills.",
      },
      {
        dimension: "Clinical-reasoning practice",
        optionA:
          "Supported, alongside the conversational demands of speaking aloud.",
        optionB:
          "Well-suited to deliberate, step-by-step reasoning at the learner's own pace.",
      },
      {
        dimension: "Cognitive load",
        optionA:
          "Closer to real conditions because the learner must think and speak simultaneously.",
        optionB:
          "Lower; typing allows time to compose and revise each response.",
      },
      {
        dimension: "Best-fit role",
        optionA:
          "Rehearsing high-stakes spoken conversations such as breaking bad news, goals of care, and error disclosure.",
        optionB:
          "Early reasoning practice, written documentation, and asynchronous review.",
      },
    ],
    lastUpdated: "2026-08-07",
    relatedSolutionSlugs: ["remediation"],
    relatedPostSlugs: [
      "what-learners-want-from-ai-sps",
      "breaking-bad-news-practice-not-knowledge",
    ],
    faqs: [
      {
        question:
          "Is voice-based or text-based AI patient simulation better for communication training?",
        answer:
          "For communication skills specifically, voice-based simulation is closer to real practice because it exercises tone, pacing, silence, and responding to emotion in real time. Text-based simulation remains valuable for clinical-reasoning practice and asynchronous review, where a learner benefits from working at their own pace.",
      },
      {
        question:
          "Why does spoken practice matter for high-stakes conversations?",
        answer:
          "High-stakes conversations such as breaking bad news depend on how something is said, when the clinician pauses, and how the clinician responds to a patient's emotion. Those behaviors require spoken practice, so voice-based simulation more closely reflects the bedside encounter.",
      },
    ],
  },
]

export function getAllComparisons(): Comparison[] {
  return comparisons
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug)
}
