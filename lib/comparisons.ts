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
    title: "AI clinical simulation vs. standardized patients",
    metaTitle:
      "AI clinical simulation vs. standardized patients: a comparison",
    metaDescription:
      "How AI clinical simulation and standardized patients (SPs) compare across cost, availability, scheduling, and scoring, and where each fits in a communication training program.",
    heroHeadline:
      "AI clinical simulation vs. standardized patients",
    intro:
      "Standardized patients provide human realism for live coaching and high-stakes assessment. AI clinical simulation adds repeatable practice between those encounters. Compare availability, staffing, consistency, feedback, and the job each method does best.",
    optionALabel: "AI clinical simulation",
    optionBLabel: "Standardized patients (SPs)",
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
          "Concurrent encounters without a separate actor or room for each learner.",
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
          "The same published case and rubric version, with evidence tied to each transcript.",
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
        dimension: "Scoring and documentation",
        optionA:
          "A rubric-scored report tied to the competency and communication frameworks named on the case.",
        optionB:
          "Human observation and feedback, with local staffing and documentation requirements.",
      },
      {
        dimension: "Best used for",
        optionA:
          "High-volume deliberate practice and remediation between high-stakes encounters.",
        optionB:
          "Live coaching and high-stakes or summative assessment, including OSCEs.",
      },
    ],
    lastUpdated: "2026-08-31",
    relatedSolutionSlugs: ["remediation", "undergraduate-medical-education"],
    relatedPostSlugs: [
      "scalability-problem-sp-programs",
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
    ],
    faqs: [
      {
        // Ben authorized this figure on 2026-08-31, reversing the standing
        // CLAUDE.md ban on SP cost. Source: seed deck v10 slide 11, which
        // attributes the range to the published UCLA and University of Utah
        // rate cards. This is an hourly rate for SP time plus the program-year
        // total derived from it, NOT an all-in cost per encounter, which stays
        // unpublished because no public method supports the total.
        question: "What does standardized patient time cost to run?",
        answer:
          "Two published university rate cards put fully loaded standardized patient time at roughly $123 to $177 an hour (UCLA and the University of Utah rate cards, as published at August 2026). For a 60-resident program that works out to roughly $27,000 to $68,000 a year, depending on how many encounters each resident gets. Read that as the SP-time component rather than the whole bill: faculty time, space, case development, and local geography sit on top of it and vary too much between programs to total honestly.",
      },
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
          "Each learner receives the same published case and rubric version. Every score cites transcript evidence, so faculty can inspect the rating. ClinicalSim does not claim that its ratings are more accurate or fairer than faculty judgment.",
      },
    ],
  },
  {
    slug: "ai-patient-simulation-vs-avatar-role-play-platforms",
    title: "AI patient simulation vs. avatar role-play platforms",
    metaTitle: "AI patient simulation vs. avatar role-play platforms",
    metaDescription:
      "How AI patient simulation and avatar-based role-play platforms compare for clinical communication training: who plays the other party, what the case content is drawn from, how performance is scored, and what evidence each produces.",
    heroHeadline: "AI patient simulation vs. avatar role-play platforms",
    intro:
      "Both categories give learners a simulated conversation partner. Avatar role-play platforms were built for professional and interpersonal skills across industries and present a visual avatar. AI patient simulation is built for the clinical encounter, runs by voice, and scores against published clinical communication frameworks. Compare what each was designed to assess and what record it leaves behind.",
    optionALabel: "AI patient simulation",
    optionBLabel: "Avatar role-play platforms",
    rows: [
      {
        dimension: "What the category was built for",
        optionA:
          "The clinical encounter, including breaking bad news, goals of care, informed consent, and family meetings.",
        optionB:
          "Interpersonal and professional conversations across industries, such as management, sales, and customer interactions, with healthcare as one vertical among several.",
      },
      {
        dimension: "Who plays the other party",
        optionA:
          "An AI patient that responds to whatever the learner says, with no human operator in the session.",
        optionB:
          "An avatar, which depending on the platform is driven by software or by a trained specialist operating it live. Check which model a given product uses.",
      },
      {
        dimension: "Scheduling",
        optionA:
          "On demand, including outside business hours, because no second person has to be present.",
        optionB:
          "On demand where the avatar is software-driven. Where a live operator is involved, sessions are booked like an SP encounter.",
      },
      {
        dimension: "How the learner responds",
        optionA:
          "Spoken conversation in the learner's own words, on a browser and a microphone.",
        optionB:
          "Spoken or typed depending on the product, presented through a 2D or 3D avatar and sometimes a VR headset.",
      },
      {
        dimension: "Where case content comes from",
        optionA:
          "Cases written from clinical literature and reviewed by clinicians, with the patient's history, affect, and response rules specified.",
        optionB:
          "Scenario libraries built for the platform's target skills. Clinical depth depends on whether the vendor authors clinical content and who reviews it.",
      },
      {
        dimension: "What performance is scored against",
        optionA:
          "Published clinical communication frameworks such as SPIKES and Calgary-Cambridge, mapped to the ACGME Milestones, with every rating citing transcript evidence.",
        optionB:
          "The platform's own behavioral competency model. Ask whether it maps to the accreditation framework your program reports against.",
      },
      {
        dimension: "What a program can put in front of a CCC",
        optionA:
          "A timestamped, rubric-scored record with the learner's actual words available for review.",
        optionB:
          "Varies. Completion and behavioral analytics are common; transcript-level evidence tied to a milestone is not a given.",
      },
      {
        dimension: "Whether two scores can be compared",
        optionA:
          "Every learner meets the same locked case and rubric versions, which limits variation caused by content changes. Versioning supports consistent review, but does not by itself establish reliability, validity, or score comparability.",
        optionB:
          "Depends on whether the scenario and the scoring model are versioned and identical between learners. Ask before treating any two scores as comparable.",
      },
      {
        dimension: "Relationship to standardized patients",
        optionA:
          "Extends an SP program by carrying the repetitions between graded encounters. It does not replace them.",
        optionB:
          "Positioned as practice rather than assessment in most products, so the same rule applies.",
      },
    ],
    lastUpdated: "2026-08-31",
    relatedSolutionSlugs: ["remediation", "longitudinal-curriculum"],
    relatedPostSlugs: [
      "building-rapport-clinical-encounter",
      "what-learners-want-from-ai-sps",
    ],
    faqs: [
      {
        question:
          "What is the difference between AI patient simulation and an avatar role-play platform?",
        answer:
          "AI patient simulation is built for the clinical encounter: the case content comes from clinical literature, the learner speaks to an AI patient, and the session is scored against published clinical communication frameworks and mapped to the ACGME Milestones. Avatar role-play platforms were built for interpersonal and professional skills across industries and present a visual avatar, which in some products is operated live by a trained specialist. The practical questions for a program are who authored the clinical content, what framework the scoring rests on, and whether the learner's words are preserved for review.",
      },
      {
        question:
          "Can an avatar role-play platform be used for clinical communication training?",
        answer:
          "It depends on what the program needs the session to prove. For general interpersonal practice, an avatar platform can give learners repetitions. For a program that has to defend a competency judgment, the requirements are clinical case content with a documented source, scoring tied to a framework the program already reports against, and transcript evidence a reviewer can inspect. Ask any vendor in either category for those three things rather than for a demo.",
      },
      {
        question: "Does clinical communication training need a VR headset?",
        answer:
          "The skill being trained in a high-stakes conversation is spoken: what the clinician says, when they pause, and how they respond to emotion. What matters most is whether the learner has to compose and say the words out loud under time pressure, which a browser and a microphone can require. Visual immersion may add value for procedural or environmental scenarios, and hardware also adds cost, distribution, and infection control questions that a program should price before committing.",
      },
      {
        // Deck slide 15's positive frame, which is category-level and names no
        // competitor, so it clears the registry's header rule.
        question:
          "What makes an automated communication score comparable between two learners?",
        answer:
          "Locked case and rubric versions limit variation caused by content changes, so a reviewer can confirm that two learners met the same material. Versioning supports consistent review, but does not by itself establish reliability, validity, or score comparability. Those claims require separate evidence.",
      },
      {
        // The narrow negative from deck slide 15, with its qualifiers intact
        // and the review date printed, because a search cannot prove absence.
        // Deliberately NOT claimed: that no competitor has validity evidence,
        // that nobody has published reliability of any kind, or anything about
        // a named product. Several vendors in adjacent categories do publish
        // validity work on related constructs.
        question:
          "Has an automated communication score been shown to agree with expert human raters?",
        answer:
          "In ClinicalSim's own public review through 26 August 2026, we found no published method and result showing that an automated communication score agrees with blinded expert raters. That describes what we could find in the public record on that date rather than proving nothing exists, which is why the date is printed: a search cannot establish absence, and vendors in adjacent categories do publish validity work on related constructs. The gap applies to ClinicalSim as much as to anyone else, and it is why we call our own scores a formative signal rather than a validated measure.",
      },
      {
        question: "Does either category replace standardized patients?",
        answer:
          "No. Both are practice formats. A trained standardized patient can tell a learner how one particular sentence landed and can improvise in ways no rubric anticipated, which is why the graded encounter and the human feedback should stay with SPs and faculty. Extend your SP program, do not replace it.",
      },
    ],
  },
  {
    slug: "voice-vs-text-virtual-patient-simulation",
    title: "Voice-based vs. text-based AI patient simulation",
    metaTitle:
      "Voice-based vs. text-based AI patient simulation",
    metaDescription:
      "How voice-based and text-based AI patient simulation compare for clinical communication training, including realism, skills assessed, accessibility, and where each format fits.",
    heroHeadline:
      "Voice-based vs. text-based AI patient simulation",
    intro:
      "Voice practice can surface pacing, silence, tone, and real-time responses to emotion. Text gives learners more time to compose and makes written reasoning easy to review. Compare the skill each format can show, its accessibility needs, and where it fits.",
    optionALabel: "Voice-based simulation",
    optionBLabel: "Text-based simulation",
    rows: [
      {
        dimension: "Fidelity to real encounters",
        optionA:
          "Spoken, real-time dialogue that requires the learner to respond aloud.",
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
        dimension: "Best used for",
        optionA:
          "Rehearsing high-stakes spoken conversations such as breaking bad news, goals of care, and error disclosure.",
        optionB:
          "Early reasoning practice, written documentation, and asynchronous review.",
      },
    ],
    lastUpdated: "2026-08-10",
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
