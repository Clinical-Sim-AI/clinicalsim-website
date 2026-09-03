import type { BrandIconName } from "@/components/brand-icon"
import type { Market } from "@/lib/positioning"
import type { PostSlug } from "@/lib/posts"

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

/** A named element framework this lane can score a conversation against. */
export interface SolutionFramework {
  name: string
  /** Who publishes it. Named so a reader can go and read the elements themselves. */
  owner: string
  /** One sentence on what the framework names. Not a claim about what ClinicalSim does to it. */
  note: string
}

/**
 * Which limitations render in the ClaimBoundary block above the final CTA.
 * Required on every entry with `category: "conversation"`; see lib/claim-discipline.test.ts.
 */
export interface SolutionClaimBoundary {
  formative: boolean
  raterValidation: boolean
  noOutcomePrediction?: boolean
  noEmploymentUse?: boolean
  /** A lane-specific boundary the shared constants do not cover. */
  note?: string
}

/**
 * Every slug that resolves to a real solution page.
 *
 * Hand-listed on purpose, and `Solution.slug` is typed against it, so adding a
 * solution without extending this union is a typecheck error rather than a
 * silent gap. Cross-registry references are typed against this too (see
 * Audience.relevantSolutionSlugs): four audiences shipped pointing at
 * "goals-of-care", "advance-care-planning", and "cognitive-assessments", none
 * of which is a solution, and the fallback in
 * components/audience-page-layout.tsx rendered the identical remediation block
 * on three different indexable pages instead of failing. lib/solutions.test.ts
 * checks this union and the registry against each other in both directions.
 */
export type SolutionSlug =
  | "longitudinal-curriculum"
  | "undergraduate-medical-education"
  | "faculty-development"
  | "patient-experience"
  | "debriefing"
  | "informed-consent"
  | "error-disclosure"
  | "remediation"

export interface Solution {
  slug: SolutionSlug
  market: Market
  title: string
  shortTitle: string
  subtitle: string
  icon: BrandIconName
  colorVariant: "accent" | "navy" | "blue" | "light-blue"

  /**
   * Which half of the library this belongs to.
   *
   * "conversation" pages are organized by the conversation being scored (informed consent, error
   * disclosure). They are the pages a buyer searches for, because nobody searches "solutions for
   * DIOs". "program" pages are the original learner-stage pages and stay exactly as they are.
   */
  category: "conversation" | "program"

  /** Bullets shown on the homepage / solutions-index cards */
  cardBullets: string[]

  /**
   * When true, a bespoke page owns the `/solutions/<slug>` route and this entry
   * exists only for navigation, the index, and the sitemap (see remediation).
   * The generic SolutionPageLayout renders every other solution.
   */
  customPage?: boolean

  /**
   * When true the lane keeps its page, its index card, and its sitemap entry, but it is left
   * off the homepage use-case grid. This is a positioning call, not a publishing one: the
   * homepage leads with what we are selling, and remediation is not it (Ben, 2026-08-31).
   */
  hideFromHomepage?: boolean

  /**
   * When true the page still builds and renders at its URL, but it is withheld from every
   * surface that would publish it: the sitemap, /llms.txt, the header dropdown, and the
   * /solutions index. Pair it with `robots: { index: false }` on the route, the way
   * /roi-calculator does.
   *
   * Use `getPublishedSolutions()` for anything user-facing. `getAllSolutions()` deliberately
   * still returns these so the claim-discipline and title-length tests keep guarding them.
   */
  unpublished?: boolean

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
  /** Heading over the value props. Was a per-slug switch inside the layout. */
  valuePropsHeading?: string
  valueProps?: SolutionValueProp[]

  /** Named frameworks this lane scores against. Renders a section linking to /frameworks. */
  frameworks?: SolutionFramework[]
  /** Accreditors and framework owners named anywhere on the page. Drives the non-endorsement line. */
  nonEndorsementOrgs?: string[]
  claimBoundary?: SolutionClaimBoundary

  faqs?: SolutionFaq[]
  relatedPostSlugs?: PostSlug[]
  /**
   * Glossary slugs to link from this page. The only inbound path to a term page
   * used to be the /glossary hub, so authority reaching a solution page stopped
   * there. Hub-only terms are dropped at render time; list indexable ones.
   */
  glossarySlugs?: string[]

  ctaHeadline: string
  ctaDescription: string
}

// Shared platform capabilities are product features, not statistics. The
// competency-framework claim differs by audience, so that value prop is
// defined per audience below instead of shared.
const ON_DEMAND_VALUE_PROP: SolutionValueProp = {
  title: "On demand, not on schedule",
  description:
    "Voice-based AI patient encounters available 24/7 from any device. No standardized patient to recruit, no sim center to book, no faculty observer required to practice.",
}

const DASHBOARD_VALUE_PROP: SolutionValueProp = {
  title: "A program view for coaching",
  description:
    "Review repeated practice and transcript-linked feedback by participant or cohort, with institution-defined access, so coaches can see strengths and choose the next practice focus.",
}

const PRIVATE_REPETITION_VALUE_PROP: SolutionValueProp = {
  title: "Private, repeatable practice",
  description:
    "Learners can repeat a case in private before sharing the report with a faculty member, coach, or program.",
}

// For residency and fellowship.
const GME_VALUE_PROPS: SolutionValueProp[] = [
  ON_DEMAND_VALUE_PROP,
  {
    title: "Rubric-scored feedback, in the learner's words",
    description:
      "Each conversation is scored against the standard approved for the case, and every score quotes the learner's own words, so a faculty member or CCC can inspect the feedback rather than rely on a rating alone.",
  },
  DASHBOARD_VALUE_PROP,
  PRIVATE_REPETITION_VALUE_PROP,
]

// For medical students (UME is governed by LCME, not ACGME).
const UME_VALUE_PROPS: SolutionValueProp[] = [
  ON_DEMAND_VALUE_PROP,
  {
    title: "Scored on the case framework, mapped to UME competencies",
    description:
      "Each conversation is scored against the communication framework named on the case and recorded against the AAMC Foundational Competencies, with the student's own words quoted under every score.",
  },
  DASHBOARD_VALUE_PROP,
  PRIVATE_REPETITION_VALUE_PROP,
]

// For faculty and clinician educators (already-trained, not scored against a trainee milestone framework).
const FACULTY_VALUE_PROPS: SolutionValueProp[] = [
  ON_DEMAND_VALUE_PROP,
  {
    title: "Scored against the framework on the case",
    description:
      "Each conversation is scored against the framework named on the case, and every score quotes what the faculty member said, so the report shows strengths and a clear focus for the next attempt.",
  },
  DASHBOARD_VALUE_PROP,
  PRIVATE_REPETITION_VALUE_PROP,
]

const solutions: Solution[] = [
  // -------------------------------------------------------------------------
  // Residency & Fellowship, longitudinal curriculum
  // -------------------------------------------------------------------------
  {
    slug: "longitudinal-curriculum",
    market: "medical-education",
    category: "program",
    title: "Residency and fellowship",
    shortTitle: "Residency and fellowship",
    subtitle: "A longitudinal communication curriculum across PGY years",
    icon: "stack",
    colorVariant: "accent",
    lastUpdated: "2026-09-03",
    cardBullets: [
      "A gradual arc from PGY-1 to senior resident and fellow",
      "Mapped to your program's competency standards",
      "A trackable dashboard that follows learners year over year",
    ],
    metaTitle: "Core communication curriculum for residency",
    metaDescription:
      "A core communication curriculum for every resident and fellow, not a remediation add-on. Cases progress across PGY years and use program-approved competency standards.",
    heroHeadline: "Communication practice that grows with clinical responsibility",
    heroDescription:
      "Every resident works the same sequence, from clear information delivery through uncertainty, family meetings, and leadership. Each conversation is scored against the competency standard and communication framework approved for the case, with the resident's own words quoted under every score.",
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
    valuePropsHeading: "One record across training",
    valueProps: GME_VALUE_PROPS,
    faqs: [
      {
        question:
          "Is ClinicalSim a remediation tool or a core curriculum platform?",
        answer:
          "ClinicalSim is built to run as a core communication curriculum for every learner, with remediation as one high-intensity use of the same cases. The arc on this page is the deployment model: interns practice clear information delivery, PGY-2 residents work on uncertainty and family disagreement, and senior residents and fellows lead goals-of-care discussions and error disclosure. A program that starts with remediation is running a subset of that sequence, and the cases, rubrics, and reports are the same either way.",
      },
      {
        question:
          "How is the curriculum mapped to our competency standards?",
        answer:
          "Each scenario can use the competency standard that your program supplies or approves. Rubric scores trace back to that standard, so a learner's progress reads in the same language your Clinical Competency Committee already uses.",
      },
      {
        question: "Does this replace bedside teaching and faculty feedback?",
        answer:
          "No. ClinicalSim scores each practice conversation against the rubric on the case and quotes the learner's words under every score, so a faculty member arrives at coaching knowing which element needs attention. A faculty mentor observing a real family meeting provides human judgment that ClinicalSim does not replace.",
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
      "family-meeting",
    ],
    ctaHeadline: "Build a communication curriculum that spans training.",
    ctaDescription:
      "Review a longitudinal sequence of rubric-scored cases from intern year through fellowship.",
  },

  // -------------------------------------------------------------------------
  // Undergraduate Medical Education (UME)
  // -------------------------------------------------------------------------
  {
    slug: "undergraduate-medical-education",
    market: "medical-education",
    category: "program",
    title: "Undergraduate medical education",
    shortTitle: "Medical school (UME)",
    subtitle: "From history-taking to delivering a diagnosis, across four years",
    icon: "student",
    colorVariant: "blue",
    lastUpdated: "2026-09-02",
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
      "Sequence practice from the first patient history through diagnosis disclosure and clerkship conversations, including the communication stations students meet in an OSCE. Each conversation is scored against the communication framework named on the case and recorded against the AAMC Foundational Competencies.",
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
    valuePropsHeading: "One record across four years",
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
          "Students get repeatable OSCE practice on demand between scheduled standardized patient encounters, rehearsing the communication tasks a station asks for: taking a focused history, explaining a diagnosis, and answering a family's questions. Each attempt is scored against the rubric written for the case, with the student's own words quoted under every score, so the student sees what worked and what to practice before the station counts. Scheduled SP encounters are limited by actor time, rooms, and faculty observers, so they can score a communication skill without giving a student the repetition needed to build one. Live assessment stays with faculty and the program. Extend your SP program, don't replace it.",
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
    market: "medical-education",
    category: "program",
    title: "Faculty development",
    shortTitle: "Faculty development",
    subtitle: "The conversations faculty are expected to model",
    icon: "group",
    colorVariant: "light-blue",
    lastUpdated: "2026-09-02",
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
      "Faculty can rehearse corrective feedback, professionalism concerns, bedside teaching, and peer conversations before they lead them in person. Each conversation is scored against the framework named on the case, with the faculty member's own words quoted under every score, to review privately or with a coach.",
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
          "Faculty are expected to model feedback, professionalism, and teaching conversations. ClinicalSim gives them a private place to rehearse, scores the conversation against the framework named on the case, and quotes their own words under each score, so they can see what worked and what to practice before leading the conversation in person.",
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
      "breaking-bad-news-practice-not-knowledge",
    ],
    glossarySlugs: [
      "debriefing",
      "pearls-debriefing",
      "plus-delta-debriefing",
      "prebriefing",
      "ask-tell-ask",
      "psychological-safety-in-simulation",
      "telehealth-communication",
    ],
    ctaHeadline: "Add communication practice to faculty development",
    ctaDescription:
      "Review cases for corrective feedback, professionalism concerns, and bedside teaching.",
  },

  // -------------------------------------------------------------------------
  // Patient experience
  // -------------------------------------------------------------------------
  {
    slug: "patient-experience",
    market: "health-system",
    category: "program",
    title: "Patient experience and service standards",
    shortTitle: "Patient experience",
    subtitle: "Practice the behaviors behind listening, explanation, and respect",
    icon: "chat-square-heart",
    colorVariant: "accent",
    lastUpdated: "2026-09-01",
    cardBullets: [
      "Score the service standards your institution already teaches",
      "Quote the words behind each score",
      "Review named cohorts or anonymous unit reports",
    ],
    metaTitle: "Patient experience communication training",
    metaDescription:
      "Nurses, clinicians, and patient facing staff practice with AI patients. ClinicalSim scores each encounter against your service standards and cites the transcript behind every score.",
    heroHeadline: "Practice against the service standards your hospital already uses",
    heroDescription:
      "Nurses, clinicians, and patient facing staff speak with AI patients by voice. Each report scores the encounter against your approved standards and cites the words behind the score. ClinicalSim does not predict HCAHPS, Qualtrics, readmission, or other patient outcomes.",
    stagesHeading: "Start with one unit and one behavior",
    stagesIntro:
      "A focused pilot can test whether staff show the behavior in simulation before an institution studies any link to patient feedback.",
    stages: [
      {
        label: "Define",
        title: "Use the standard already in place",
        description:
          "Add the service script, listening behavior, explanation standard, or teach back step your team already teaches. The rubric can recognize the intended behavior without demanding one exact sentence.",
      },
      {
        label: "Practice",
        title: "Give staff a patient conversation to rehearse",
        description:
          "Staff open a case in a browser, speak with an AI patient, and review their report. No app download, room booking, or faculty observer is required for practice.",
      },
      {
        label: "Review",
        title: "See the pattern without turning training into discipline",
        description:
          "Leaders can review named cohorts or anonymous unit results, while the person who practiced can see the transcript evidence behind the feedback.",
      },
    ],
    valuePropsHeading: "What a patient experience team gets",
    valueProps: [
      {
        title: "Your standards, scored as written",
        description:
          "ClinicalSim can score the behaviors in an approved service model, script, or rubric and give credit when the speaker conveys the same intent in natural language.",
      },
      {
        title: "Evidence behind the score",
        description:
          "Each rating cites the words used in the encounter, so a coach can see what happened without listening to every recording.",
      },
      {
        title: "Unit and cohort reporting",
        description:
          "Institutions can review named cohorts or anonymized unit results and use the pattern to choose the next training topic.",
      },
      {
        title: "A clean research boundary",
        description:
          "Structured aggregate exports can support an approved comparison with institution held patient experience data. ClinicalSim does not treat that comparison as an established product outcome.",
      },
    ],
    faqs: [
      {
        question: "Can ClinicalSim score our service scripts and standards?",
        answer:
          "Yes. The institution supplies the approved script, service model, or rubric, and ClinicalSim scores the defined behavior. The report can give credit for the intended meaning rather than require one exact sentence.",
      },
      {
        question: "Can nurses and nonclinical staff use the same platform?",
        answer:
          "Yes. Nurses, environmental services staff, food service staff, transport staff, and other patient facing teams can use browser based cases designed for their role. Clinical content should stay limited to what that role would handle in practice.",
      },
      {
        question: "Can leaders review results without seeing employee names?",
        answer:
          "Yes. An institution can use anonymous participant IDs and receive aggregate unit or cohort reports. Access to named reports should follow the institution's training policy and labor agreements.",
      },
      {
        question: "Does ClinicalSim integrate with Qualtrics or predict HCAHPS?",
        answer:
          "ClinicalSim can provide structured aggregate exports for an institution to compare with its own Qualtrics or HCAHPS data under an approved study plan. It does not predict those scores, and no current evidence shows that a ClinicalSim score changes them.",
      },
      {
        question: "Can these scores be used for employment decisions?",
        answer:
          "No. ClinicalSim output is formative and should not decide hiring, discipline, compensation, credentialing, privileging, or licensure. A health system pilot should set access, retention, and reporting rules before staff participate.",
      },
    ],
    claimBoundary: {
      formative: true,
      raterValidation: true,
      noOutcomePrediction: true,
      noEmploymentUse: true,
    },
    glossarySlugs: ["teach-back-method"],
    ctaHeadline: "Start with one team and one service standard",
    ctaDescription:
      "Bring the standard you already teach. We will map what a spoken encounter can score and define the reporting rules before the pilot begins.",
  },

  // -------------------------------------------------------------------------
  // Clinical and educational debriefing
  // -------------------------------------------------------------------------
  {
    slug: "debriefing",
    market: "health-system",
    category: "program",
    title: "Clinical and educational debriefing",
    shortTitle: "Debriefing",
    subtitle: "Practice leading a debrief before the real event",
    icon: "people-connected",
    colorVariant: "light-blue",
    lastUpdated: "2026-09-01",
    cardBullets: [
      "Rehearse clinical event and educational debriefs",
      "Score against the framework your institution teaches",
      "Track completion without turning practice scores into employment records",
    ],
    metaTitle: "Clinical and educational debriefing practice",
    metaDescription:
      "Clinicians and simulation faculty practice leading debriefs with AI participants. Reports score the encounter against the institution's framework and cite transcript evidence.",
    heroHeadline: "Give debriefers a place to practice the conversation",
    heroDescription:
      "Clinicians and simulation faculty rehearse clinical event or educational debriefs with AI participants. The report scores the encounter against the institution's framework and cites the transcript. It does not assess the safety event itself.",
    stagesHeading: "A debriefing program that can extend beyond the classroom",
    stagesIntro:
      "Teach the framework in person, then give each debriefer a repeatable place to practice and review the conversation.",
    stages: [
      {
        label: "Learn",
        title: "Teach one shared framework",
        description:
          "The institution defines the structure, behaviors, and boundaries it expects in a clinical event or educational debrief.",
      },
      {
        label: "Rehearse",
        title: "Lead the debrief by voice",
        description:
          "The debriefer speaks with AI participants who respond to the questions, pacing, and psychological safety created in the conversation.",
      },
      {
        label: "Review",
        title: "Use evidence for coaching and completion",
        description:
          "The participant reviews the report, and the institution can track who completed the training. Scores remain formative unless a separate validation plan supports another use.",
      },
    ],
    valuePropsHeading: "What a debriefing program gets",
    valueProps: [
      {
        title: "Clinical and educational cases",
        description:
          "Build separate practice for a clinical event debrief, a simulation debrief, or the basic skills both share.",
      },
      {
        title: "Your framework in the rubric",
        description:
          "The report scores the structure and behaviors your institution teaches, with transcript evidence for each rating.",
      },
      {
        title: "Practice after the course",
        description:
          "Participants can return from any browser after the in person session, without scheduling another faculty observer or simulation room.",
      },
      {
        title: "Completion and cohort reporting",
        description:
          "Leaders can confirm who completed the training and review aggregate cohort patterns without using formative scores for employment decisions.",
      },
    ],
    faqs: [
      {
        question: "Can the same program cover clinical event and educational debriefing?",
        answer:
          "Yes. The shared skills can sit in one program, while separate cases and rubrics address the different purpose, participants, and boundaries of each type of debrief.",
      },
      {
        question: "Can we use our own debriefing framework?",
        answer:
          "Yes. The institution defines the framework and the behavior expected at each step. ClinicalSim scores the simulated conversation against those definitions and cites the transcript.",
      },
      {
        question: "Can we track who completed the training?",
        answer:
          "Yes. An institution can receive a completion list without using the participant's formative score as an employment record. Named score access should follow the training policy set before launch.",
      },
      {
        question: "Does a ClinicalSim debrief assess the real safety event?",
        answer:
          "No. It assesses the simulated debriefing conversation. It does not investigate the event, determine cause, judge clinical care, or replace the institution's patient safety process.",
      },
    ],
    claimBoundary: {
      formative: true,
      raterValidation: true,
      noOutcomePrediction: true,
      noEmploymentUse: true,
    },
    glossarySlugs: [
      "debriefing",
      "pearls-debriefing",
      "plus-delta-debriefing",
      "psychological-safety-in-simulation",
    ],
    ctaHeadline: "Build the practice that follows your debriefing course",
    ctaDescription:
      "Bring the framework you teach. We will map it to a case, a rubric, and the completion report your institution needs.",
  },

  // -------------------------------------------------------------------------
  // Informed consent
  // -------------------------------------------------------------------------
  // Lane 1 of the use case library (brief 2026-08-31). The strongest lane and the emptiest market:
  // following the informed consent policy was the single most cited patient rights finding in
  // Joint Commission hospital surveys and moved into a National Performance Goal on 2026-01-01,
  // and the search results for the clinical conversation return courseware and law firm alerts
  // rather than a vendor.
  //
  // Copy rules specific to this page, from the brief's claim discipline section:
  //   - Never "compliant", "meets", or "satisfies" against the Joint Commission, CMS, or the
  //     ACGME. The hospital defines the elements; ClinicalSim scores whether they were spoken.
  //   - Never the word "validated". No validated rubric exists for scoring a live procedural
  //     consent conversation in clinical care. That absence is a real publishable gap, and it is
  //     the reason the copy says "scored against".
  //   - Only [Confirmed] figures from the brief ship. The derived $133M/year consent loss estimate
  //     and the 68.2% consent-delegation figure are deliberately absent.
  {
    slug: "informed-consent",
    market: "health-system",
    category: "conversation",
    title: "Informed consent",
    shortTitle: "Informed consent",
    subtitle: "Scoring the conversation behind the signature",
    icon: "badge-check",
    colorVariant: "navy",
    lastUpdated: "2026-09-01",
    cardBullets: [
      "Scored element by element against your own consent policy",
      "Every score quotes the line the clinician actually said",
      "Per resident and per department, not a survey average",
    ],
    metaTitle: "Informed consent, scored as a conversation",
    metaDescription:
      "The signature is almost always obtained. The conversation usually is not: 9% of 1,057 recorded encounters contained all seven elements of an informed decision (Braddock, JAMA 1999). Score consent conversations against your own policy, element by element.",
    heroHeadline: "Help clinicians practice the whole consent conversation",
    heroDescription:
      "Clinicians practice with AI patients before a real procedure. Their private report shows what they covered well and where to practice, scored against the element definitions in your policy.",
    stagesHeading: "The six elements in the ready to use consent rubric",
    stagesIntro:
      "The current catalog case uses a six element rubric grounded in AMA Code of Medical Ethics Opinion 2.1.1 and the StatPearls review of informed consent.",
    stages: [
      {
        label: "1",
        title: "Assess decision making capacity",
        description:
          "Establish that the patient can understand the options, weigh their implications, and communicate a choice. When a surrogate decides, confirm that role and start from what they understand.",
      },
      {
        label: "2",
        title: "Explain the diagnosis and proposed intervention",
        description:
          "State the clinical problem in plain terms, then explain what is proposed and why the team recommends it.",
      },
      {
        label: "3",
        title: "Describe risks, benefits, and expected outcomes",
        description:
          "Explain the material risks and expected benefits without minimizing harm or promising an outcome the clinician cannot know.",
      },
      {
        label: "4",
        title: "Discuss alternatives, including no treatment",
        description:
          "Present reasonable alternatives as real choices and compare their risks, benefits, and likely outcomes with the proposed intervention.",
      },
      {
        label: "5",
        title: "Protect voluntariness",
        description:
          "Make clear that the patient or surrogate can decide without coercion, ask for time, or decline.",
      },
      {
        label: "6",
        title: "Confirm understanding, questions, and the decision",
        description:
          "Invite questions, use teach back to check the explanation, correct misunderstandings, and ask for the patient's decision.",
      },
    ],
    valuePropsHeading: "What a program gets",
    valueProps: [
      {
        title: "Your consent policy, scored as written",
        description:
          "The rubric uses your element definitions, in your words, including the disclosure of who performs which parts that CMS addressed in its April 2024 hospital memo.",
      },
      {
        title: "Feedback for the clinician and a reviewable program record",
        description:
          "The clinician receives specific feedback after each simulated consent conversation. Under agreed access rules, a program can review a dated record alongside its other evidence.",
      },
      ON_DEMAND_VALUE_PROP,
      {
        title: "Scored only where the case asked",
        description:
          "An element is scored only where the conversation gave the clinician a chance to show it. A same-day consent that never raised a preference-sensitive alternative does not mark the clinician down for missing one.",
      },
    ],
    frameworks: [
      {
        name: "Informed consent: Consent discussion",
        owner: "AMA Code of Medical Ethics and StatPearls",
        note: "The ready to use rubric above has six scored elements and is attached to the current PICU central line case.",
      },
      {
        name: "Your own consent policy",
        owner: "Yours",
        note: "Send the approved policy and procedure specific form. We use their element definitions as written.",
      },
    ],
    faqs: [
      {
        question: "How often do consent conversations actually contain all the elements?",
        answer:
          "Rarely. Across 1,057 audio-recorded clinical encounters, 9% contained all seven elements of an informed decision, and in a separate sample of 141 orthopedic surgery discussions the figure was zero (Braddock et al., JAMA 1999 and J Bone Joint Surg Am 2008). In 145 major vascular surgery cases, 45% contained all the informed consent elements and in 23% the surgeon did not discuss the basic ones (Etchells et al., Can J Surg 2011).",
      },
      {
        question: "Which part of the conversation is usually missing?",
        answer:
          "The end of it. When 90 preoperative conversations before major cardiothoracic, vascular, oncologic and neurosurgical operations were recorded and scored, surgeons reliably described the nature of the illness, the operation, and the potential complications, and were least likely to check whether the patient had understood any of it (Journal of the American College of Surgeons, 2021).",
      },
      {
        question: "Do patients remember what they were told?",
        answer:
          "Not for long. Adult spinal deformity patients who received both a verbal and a video risk discussion recalled a median 45% of the risks immediately afterward and 18% at six to eight weeks (Spine, 2015, n=56). That is one reason a check of understanding inside the conversation matters more than the volume of information delivered.",
      },
      {
        question: "Is this a skill that responds to training?",
        answer:
          "Yes, with a measured effect. In a randomized trial of 122 senior medical students, consent OSCE scores rose from 61% to 71% in the trained arm against under 1% change in control, an effect size of 0.79, and the number reporting confidence obtaining consent went from 11 to 62 (BMC Medical Education, 2025). Separately, 56% of 402 emergency medicine residents reported never having had formal training on informed consent at all (Academic Emergency Medicine, 2007).",
      },
      {
        question: "Does ClinicalSim make our consent process compliant?",
        answer:
          "No, and no vendor can. Compliance is determined by a surveyor against your own policy. What ClinicalSim does is narrower and checkable: your policy defines the elements, and the score reports whether each one appeared in the conversation, with the clinician's words attached.",
      },
      {
        question: "Is the consent rubric validated?",
        answer:
          "No. ClinicalSim's consent rubric has not been validated against expert raters. Scores are anchored to published element definitions and verbatim transcript evidence, and agreement with faculty raters remains unmeasured.",
      },
    ],
    nonEndorsementOrgs: ["the ACGME", "the American College of Surgeons"],
    claimBoundary: {
      formative: true,
      raterValidation: true,
      noOutcomePrediction: true,
      noEmploymentUse: true,
      note: "Practicing consent conversations in simulation has not been shown to reduce claims, reduce survey findings, improve patient recall, or change any accreditation score, and this page does not claim it does. The closest published attempt improved interns' confidence discussing benefits without moving total confidence (Journal of Surgical Education, 2023).",
    },
    relatedPostSlugs: ["breaking-bad-news-practice-not-knowledge"],
    ctaHeadline: "Send us your consent policy",
    ctaDescription:
      "We will show you which of its elements a spoken conversation can evidence, which ones it cannot, and what a scored consent encounter looks like against your own wording.",
  },
  // Lane 2 of the use case library (brief 2026-08-31), written to a deliberately narrow frame.
  //
  // Ben's call on 2026-08-31: ship this page as competence before the event, with no risk or
  // liability framing at all. That means:
  //   - No claim about malpractice claims, indemnity, defense cost, or time to resolution. The
  //     controlled study of communication and resolution programs found improved trends at some
  //     hospitals and no significant change at others, and apology laws increased both claim
  //     probability and average payment for non-surgeons (McMichael, Stanford Law Review 2019).
  //   - Nothing about identifying at-risk clinicians. A page framed as risk mitigation invites
  //     plaintiff counsel to argue the institution knew a clinician scored poorly and let them
  //     disclose anyway.
  //   - Never suggest the product coaches clinicians on what to say to reduce liability. That is
  //     ethically indefensible and commercially fatal with the patient safety buyer.
  //   - Buyer is the DIO, the Chief Quality Officer, and the patient safety educator. Not the
  //     Chief Risk Officer, not the captive insurer, not general counsel.
  //
  // Open item Ben still owes an answer on: retention and legal hold for practice recordings.
  {
    slug: "error-disclosure",
    market: "health-system",
    category: "conversation",
    title: "Disclosing a medical error",
    shortTitle: "Error disclosure",
    subtitle: "Practicing the conversation before it is needed",
    icon: "chat-exclamation",
    colorVariant: "blue",
    lastUpdated: "2026-09-01",
    cardBullets: [
      "Practice in private, before the first real disclosure",
      "Scored against your own disclosure policy, element by element",
      "Evidence for a competence requirement that already exists",
    ],
    metaTitle: "Error disclosure, practiced and scored",
    metaDescription:
      "97% of physicians say they would disclose a hypothetical minor-harm error; 5% have disclosed an actual major one (Kaldjian, JGIM 2007). Practice with AHRQ CANDOR or your own disclosure policy.",
    heroHeadline: "Practice disclosure before a clinician faces the real conversation",
    heroDescription:
      "Clinicians rehearse with AI patients in private, then review strengths and areas for practice against AHRQ CANDOR or the institution's disclosure policy.",
    stagesHeading: "What a disclosure conversation has to carry",
    stagesIntro:
      "The ready to use rubric follows the disclosure checklist in AHRQ's CANDOR toolkit. It scores six parts of the conversation with the patient or family.",
    stages: [
      {
        label: "Prepare",
        title: "Set the stage",
        description:
          "Confirm who should attend, what is known, who will lead the conversation, and what support the patient or family may need.",
      },
      {
        label: "Listen",
        title: "Hear the patient or family first",
        description:
          "Ask what they understand, invite questions, and respond to emotion before moving through the facts.",
      },
      {
        label: "Explain",
        title: "State the facts without blame or speculation",
        description:
          "Explain what happened and what it means for the patient. Separate confirmed facts from what the review has not established.",
      },
      {
        label: "Apologize",
        title: "Offer a sincere apology",
        description:
          "Acknowledge the harm or unexpected outcome directly and express regret in words that fit what is known.",
      },
      {
        label: "Plan",
        title: "Explain consequences and next steps",
        description:
          "Describe the patient's care plan, immediate support, and what the organization will review next.",
      },
      {
        label: "Follow up",
        title: "Commit to follow up and documentation",
        description:
          "Name who will return, when they will return, and how the conversation and open questions will be documented.",
      },
    ],
    valuePropsHeading: "What a program gets",
    valueProps: [
      {
        title: "Evidence for a requirement you already carry",
        description:
          "ACGME Common Program Requirement 4.9.g asks residents to demonstrate competence in disclosure of patient safety events, real or simulated. A scored simulated disclosure gives programs a reviewable record to use alongside other evidence.",
      },
      {
        title: "Your disclosure policy, scored as written",
        description:
          "Every institution running a CANDOR or CARe program has written its own disclosure policy and its own coaching script. We use those element definitions rather than substituting a generic checklist.",
      },
      PRIVATE_REPETITION_VALUE_PROP,
      {
        title: "The first one is not the real one",
        description:
          "In a randomized trial of 146 residents, the largest improvement went to those who had never done a real disclosure. Practice is worth most to exactly the people who have not had to do this yet.",
      },
    ],
    frameworks: [
      {
        name: "AHRQ CANDOR: Disclosure communication",
        owner: "Agency for Healthcare Research and Quality",
        note: "The ready to use rubric applies the CANDOR disclosure checklist to the spoken encounter.",
      },
      {
        name: "Your own disclosure policy",
        owner: "Yours",
        note: "Send the approved policy or coaching script. We use its element definitions as written.",
      },
    ],
    faqs: [
      {
        question: "Why practice a conversation most clinicians will rarely have?",
        answer:
          "Because the gap between intention and action is enormous. In a survey of 538 physicians, residents, and students, 97% said they would disclose a hypothetical minor-harm error and 93% a major-harm error, but only 41% had ever disclosed an actual minor error and 5% an actual major one (Kaldjian et al., J Gen Intern Med, 2007). Whatever closes that gap, it is not knowing that disclosure is the right thing to do.",
      },
      {
        question: "Does practice actually change the next disclosure?",
        answer:
          "In the published evidence, yes, measured on the next simulated disclosure. A randomized trial of 146 PGY2 residents found that scored feedback on a simulated disclosure improved performance on the next one (mean 3.26 versus 3.14, P=.01), with the largest gain among residents who had never done a real disclosure (3.33 versus 3.09, P=.007) (White et al., JAMA Network Open, 2024). A pre-post study of 55 PGY1s doing two standardized-patient disclosures four weeks apart found self-efficacy rose from 119.6 to 150.3 (P<.001) and external faculty ratings improved (P=.001) (Sukalich et al., Academic Medicine, 2014).",
      },
      {
        question: "Does this count for our ACGME requirement?",
        answer:
          "That is the program's call, not ours. ACGME Common Program Requirement 4.9.g states that residents must demonstrate competence in using tools and techniques that promote patient safety and disclosure of patient safety events, real or simulated. A scored simulated disclosure is evidence a program can put behind that requirement. Whether it is sufficient is decided by the program and its reviewers.",
      },
      {
        question: "Do TeamSTEPPS or AIDET work as disclosure rubrics?",
        answer:
          "Neither fits, and it is worth saying so plainly because both get suggested. TeamSTEPPS is team-facing, covering SBAR, check-back, call-out, and handoff, and it contains nothing about the conversation after harm. AIDET is a five-step service encounter script and is not a disclosure protocol. Score against a disclosure framework or against your own policy.",
      },
      {
        question: "Who is this page for?",
        answer:
          "Designated Institutional Officials, quality officers, and the patient safety educators who already run disclosure training and have no way to show what it produced. It is about whether a clinician can hold the conversation competently, which is a training question rather than a risk-management one.",
      },
    ],
    nonEndorsementOrgs: ["the ACGME", "AHRQ"],
    claimBoundary: {
      formative: true,
      raterValidation: true,
      noOutcomePrediction: true,
      noEmploymentUse: true,
      note: "ClinicalSim has no evidence of any effect on malpractice claims, indemnity, defense cost, or time to resolution, and makes no such claim. The published evidence in this lane measures performance on the next simulated disclosure, which is what this page describes.",
    },
    relatedPostSlugs: ["breaking-bad-news-practice-not-knowledge"],
    ctaHeadline: "Send us your disclosure policy",
    ctaDescription:
      "We will show you which of its elements a spoken conversation can evidence and what a scored disclosure looks like against your own wording, before anything is committed.",
  },
  {
    slug: "remediation",
    market: "medical-education",
    category: "program",
    title: "Communication remediation",
    shortTitle: "Remediation",
    subtitle: "Targeted practice for the learner on a remediation plan",
    icon: "chat-exclamation",
    colorVariant: "navy",
    customPage: true,
    hideFromHomepage: true,
    lastUpdated: "2026-09-03",
    cardBullets: [
      "Targeted, rubric-scored practice for a learner who needs support",
      "Repeatable, on-demand practice without SP scheduling",
      "Reports with transcript evidence for CCC review",
    ],
    metaTitle: "Communication remediation",
    metaDescription:
      "AI clinical simulation for communication remediation. Rubric-scored practice and transcript evidence for faculty and CCC review.",
    heroHeadline:
      "Give every learner a clear path to better communication",
    heroDescription:
      "Learners rehearse high-stakes conversations with AI patients, see what they did well and what to practice next, and return to coaching with transcript-linked feedback against the standard your program approves.",
    ctaHeadline: "Start with a repeatable remediation structure",
    ctaDescription:
      "Review how structured practice and rubric-scored feedback could fit a communication remediation plan.",
  },
]

export function getAllSolutions(): Solution[] {
  return solutions
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}

/**
 * Every solution safe to link, list, or submit to a crawler.
 *
 * Prefer this over getAllSolutions() in pages, navigation, the sitemap, and /llms.txt.
 * getAllSolutions() is the full registry and exists so tests can guard held pages too.
 */
export function getPublishedSolutions(): Solution[] {
  return solutions.filter((s) => !s.unpublished)
}

export function getSolutionsByMarket(market: Market): Solution[] {
  return getPublishedSolutions().filter((solution) => solution.market === market)
}

/**
 * The lanes the homepage use-case grid leads with.
 *
 * A subset of getPublishedSolutions(): everything here is fully published and linked from
 * /solutions, it just does not lead the homepage. See `hideFromHomepage`.
 */
export function getHomepageSolutions(): Solution[] {
  return getPublishedSolutions().filter((s) => !s.hideFromHomepage)
}

export function getHomepageSolutionGroups(): Array<{
  market: Market
  solutions: Solution[]
}> {
  const homepageSolutions = getHomepageSolutions()

  return (["health-system", "medical-education"] as const).map((market) => ({
    market,
    solutions: homepageSolutions.filter((solution) => solution.market === market),
  }))
}

/** Solutions rendered by the generic SolutionPageLayout (excludes bespoke pages). */
export function getGenericSolutions(): Solution[] {
  return solutions.filter((s) => !s.customPage)
}
