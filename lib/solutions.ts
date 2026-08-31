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
  /** A lane-specific boundary the shared constants do not cover. */
  note?: string
}

export interface Solution {
  slug: string
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
  // Residency & Fellowship, longitudinal curriculum
  // -------------------------------------------------------------------------
  {
    slug: "longitudinal-curriculum",
    category: "program",
    title: "Residency and fellowship",
    shortTitle: "Residency and fellowship",
    subtitle: "A longitudinal communication curriculum across PGY years",
    icon: "stack",
    colorVariant: "accent",
    lastUpdated: "2026-08-20",
    cardBullets: [
      "A gradual arc from PGY-1 to senior resident and fellow",
      "Mapped to ACGME Milestones 2.0 and ABP EPAs",
      "A trackable dashboard that follows learners year over year",
    ],
    metaTitle: "Core communication curriculum for residency",
    metaDescription:
      "A core communication curriculum for every resident and fellow, not a remediation add-on. Cases progress across PGY years, mapped to ACGME Milestones 2.0 and EPAs.",
    heroHeadline: "Communication practice that grows with clinical responsibility",
    heroDescription:
      "Every resident works the same sequence, from clear information delivery through uncertainty, family meetings, and leadership. Each case uses the ACGME Milestones and communication framework that fit the learner, specialty, and task.",
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
    // Named because the page maps cases to ACGME Milestones 2.0 and ABP EPAs. ACGME's own policy
    // states that a vendor claim of ACGME endorsement or compliance is false, so the disclaimer
    // stands near the framework name.
    nonEndorsementOrgs: ["the ACGME", "the American Board of Pediatrics (ABP)"],
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
      "family-meeting",
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
    category: "program",
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
    category: "program",
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
      "telehealth-communication",
    ],
    ctaHeadline: "Add communication practice to faculty development",
    ctaDescription:
      "Review cases for corrective feedback, professionalism concerns, and bedside teaching.",
  },

  // -------------------------------------------------------------------------
  // Communication Remediation, bespoke page (RemediationPageLayout)
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
    category: "conversation",
    title: "Informed consent",
    shortTitle: "Informed consent",
    subtitle: "Scoring the conversation behind the signature",
    icon: "badge-check",
    colorVariant: "navy",
    lastUpdated: "2026-08-31",
    cardBullets: [
      "Scored element by element against your own consent policy",
      "Every score quotes the line the clinician actually said",
      "Per resident and per department, not a survey average",
    ],
    metaTitle: "Informed consent, scored as a conversation",
    metaDescription:
      "The signature is almost always obtained. The conversation usually is not: 9% of 1,057 recorded encounters contained all seven elements of an informed decision (Braddock, JAMA 1999). Score consent conversations against your own policy, element by element.",
    heroHeadline: "The signature is not the consent",
    heroDescription:
      "Consent is a procedure that every hospital documents and almost nobody observes. ClinicalSim scores a spoken consent conversation against the element definitions in your own policy, one score per element, with the line the clinician said quoted underneath.",
    stagesHeading: "The seven elements of an informed decision",
    stagesIntro:
      "Braddock's elements, quoted as AHRQ publishes them. They are the scale researchers already use to score recorded surgical consent conversations, which is what makes them a workable spine for a rubric.",
    stages: [
      {
        label: "1",
        title: "The patient's role in the decision",
        description:
          "Saying out loud that there is a decision here and that the patient has a part in making it. This is the element most often skipped entirely, because the conversation opens as an explanation rather than a choice.",
      },
      {
        label: "2",
        title: "The clinical issue and the suggested treatment",
        description:
          "Naming what is wrong and what is proposed, in words the patient uses rather than the words the chart uses. Surgeons do this reliably; it is the part of the conversation that rarely goes missing.",
      },
      {
        label: "3",
        title: "Alternatives, including doing nothing",
        description:
          "Watchful waiting is an alternative. So is declining. In 90 recorded conversations before high-risk surgery, alternatives came up in 63% of discussions where the decision was still open and 27% where the operation was already booked (JACS, 2021).",
      },
      {
        label: "4",
        title: "Risks and benefits, compared across options",
        description:
          "Not a recitation of a complication list, but a comparison. The risks of the proposed operation set against the risks of the alternatives, in numbers the patient can hold onto.",
      },
      {
        label: "5",
        title: "The uncertainties",
        description:
          "Saying plainly what the clinician does not know. A best case, a worst case, and an honest statement that nobody can say yet which one this patient will get.",
      },
      {
        label: "6",
        title: "Assessing what the patient understood",
        description:
          "The element surgeons are least likely to reach. Asking the patient to say back, in their own words, what the operation will do and what could go wrong, then correcting what they got wrong.",
      },
      {
        label: "7",
        title: "Eliciting the patient's preference",
        description:
          "Asking what this patient wants, having given them what they needed to answer. Consent is the answer to that question rather than the signature that follows it.",
      },
    ],
    valuePropsHeading: "What a program gets",
    valueProps: [
      {
        title: "Your consent policy, scored as written",
        description:
          "A surveyor checks whether staff followed your policy, not whether your policy matches a national ideal. So the rubric uses your element definitions, in your words, including the disclosure of who performs which parts that the April 2024 CMS memo forced hospitals to write in.",
      },
      {
        title: "Evidence per person, before it is needed",
        description:
          "A Clinical Competency Committee can hold a resident at a communication level with no observed consent encounter on record anywhere. Scored practice puts a dated, quoted, per-resident artifact in the packet.",
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
        name: "Braddock's elements of informed decision making",
        owner: "Braddock et al., quoted verbatim by AHRQ",
        note: "The seven elements above. Published in full and already used to score recorded consent conversations in the literature.",
      },
      {
        name: "CMS well-designed informed consent process",
        owner: "CMS interpretive guidelines, public domain",
        note: "Material risks and benefits, treatment alternatives, the consequences of declining, who performs the operation and administers anesthesia, and whether residents or advanced practice providers perform important tasks.",
      },
      {
        name: "American College of Surgeons, Statement on Principles II.A",
        owner: "American College of Surgeons, revised 2016",
        note: "Five items, including estimated mortality and morbidity, the more commonly known complications, and the roles of everyone who will participate.",
      },
      {
        name: "AHRQ ten strategies for informed consent",
        owner: "AHRQ, developed with The Joint Commission",
        note: "Behavioral and named: health literacy universal precautions, removing language barriers, teach-back, offering choices, eliciting goals and values, using a decision aid.",
      },
      {
        name: "Your own consent policy",
        owner: "Yours",
        note: "The one that matters commercially and in a survey. Send the policy and the procedure-specific form; we use their element definitions as written.",
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
          "No. Nobody has published a validated rubric for scoring a live procedural consent conversation in clinical care, as opposed to research consent, and we are not going to describe ours as one. Scores are anchored to published element definitions and to verbatim transcript evidence, and agreement with faculty raters is unmeasured work that a pilot should do.",
      },
    ],
    nonEndorsementOrgs: [
      "The Joint Commission",
      "the ACGME",
      "AHRQ",
      "the American College of Surgeons",
    ],
    claimBoundary: {
      formative: true,
      raterValidation: true,
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
    category: "conversation",
    title: "Disclosing a medical error",
    shortTitle: "Error disclosure",
    subtitle: "Practicing the conversation before it is needed",
    icon: "chat-exclamation",
    colorVariant: "blue",
    lastUpdated: "2026-08-31",
    cardBullets: [
      "Practice in private, before the first real disclosure",
      "Scored against your own disclosure policy, element by element",
      "Evidence for a competence requirement that already exists",
    ],
    metaTitle: "Error disclosure, practiced and scored",
    metaDescription:
      "97% of physicians say they would disclose a hypothetical minor-harm error; 5% have ever disclosed an actual major one (Kaldjian, JGIM 2007). ACGME Common Program Requirement 4.9.g names simulated disclosure, and nobody scores it. Practice against your own disclosure policy.",
    heroHeadline: "The hardest conversation in medicine, rehearsed first",
    heroDescription:
      "Most clinicians have their first real disclosure conversation with no practice behind it. ClinicalSim gives them a private one to get wrong first, scored against your institution's own disclosure elements with the words they used quoted under each score.",
    stagesHeading: "What a disclosure conversation has to carry",
    stagesIntro:
      "The National Quality Forum's Safe Practice on disclosure names these in writing, and then says the skill should be developed and practiced. It does not say how anyone would know whether it was.",
    stages: [
      {
        label: "Say it",
        title: "An explicit statement of what happened",
        description:
          "In plain words, including what it means for this patient. The failing version is \"there was an issue with one of her medications and we are reviewing it.\" The passing version names the dose, names the harm, and says it was a mistake.",
      },
      {
        label: "Explain",
        title: "Why it happened, and whether it was preventable",
        description:
          "Naming what failed without hiding behind the system. \"The result got lost\" is a sentence with no subject in it, and families hear that.",
      },
      {
        label: "Regret",
        title: "An explicit and empathic expression of regret",
        description:
          "The NQF language is specific: an expression of regret that the outcome was not as expected, distinct from an explanation and distinct from a finding of fault.",
      },
      {
        label: "Commit",
        title: "A commitment to investigate and prevent recurrence",
        description:
          "Naming who is accountable for the review rather than promising that it will happen. The commitment is only worth as much as the person attached to it.",
      },
      {
        label: "Close",
        title: "Feedback of the investigation result",
        description:
          "Saying when the family will hear the outcome and from whom. This is the element that most often falls off the end of an otherwise good conversation.",
      },
      {
        label: "Support",
        title: "Emotional support, on both sides",
        description:
          "Support for the patient and family, and the part institutions forget: the clinician who was involved. The element is not finished once the family has been offered something, because the person who delivered the disclosure carries the event too.",
      },
    ],
    valuePropsHeading: "What a program gets",
    valueProps: [
      {
        title: "Evidence for a requirement you already carry",
        description:
          "ACGME Common Program Requirement 4.9.g asks residents to demonstrate competence in disclosure of patient safety events, real or simulated. Simulated is already accepted. Until now there has been nothing to put in the file when a resident does one.",
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
        name: "NQF Safe Practice on disclosure",
        owner: "National Quality Forum, public",
        note: "The elements above, including the initial conversation within 24 hours where possible, and the statement that the skill should be developed and practiced.",
      },
      {
        name: "AHRQ CANDOR",
        owner: "AHRQ, public domain",
        note: "Eight modules across three phases, including response and disclosure communication and care for the caregiver.",
      },
      {
        name: "Video-based Communication Assessment rating scheme",
        owner: "White et al., published in full",
        note: "Six domains rated on a five-point scale: accountability, honesty, apology, empathy, caring, and overall response. The only published instrument that rates an actual disclosure performance rather than an attitude.",
      },
      {
        name: "Seven Pillars",
        owner: "University of Illinois, published",
        note: "Pillar 3 is communication and disclosure, Pillar 7 is education and training.",
      },
      {
        name: "Your own disclosure policy",
        owner: "Yours",
        note: "The version that governs in practice. Institution-specific policies dominate this field, and they are what a clinician will be held to.",
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
    nonEndorsementOrgs: [
      "the ACGME",
      "the National Quality Forum (NQF)",
      "AHRQ",
    ],
    claimBoundary: {
      formative: true,
      raterValidation: true,
      note: "ClinicalSim has no evidence of any effect on malpractice claims, indemnity, defense cost, or time to resolution, and makes no such claim. The published evidence in this lane measures performance on the next simulated disclosure, which is what this page describes.",
    },
    relatedPostSlugs: ["breaking-bad-news-practice-not-knowledge"],
    ctaHeadline: "Send us your disclosure policy",
    ctaDescription:
      "We will show you which of its elements a spoken conversation can evidence and what a scored disclosure looks like against your own wording, before anything is committed.",
  },
  {
    slug: "remediation",
    category: "program",
    title: "Communication remediation",
    shortTitle: "Remediation",
    subtitle: "Targeted practice for the learner on a remediation plan",
    icon: "chat-exclamation",
    colorVariant: "navy",
    customPage: true,
    hideFromHomepage: true,
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

/**
 * The lanes the homepage use-case grid leads with.
 *
 * A subset of getPublishedSolutions(): everything here is fully published and linked from
 * /solutions, it just does not lead the homepage. See `hideFromHomepage`.
 */
export function getHomepageSolutions(): Solution[] {
  return getPublishedSolutions().filter((s) => !s.hideFromHomepage)
}

/** Solutions rendered by the generic SolutionPageLayout (excludes bespoke pages). */
export function getGenericSolutions(): Solution[] {
  return solutions.filter((s) => !s.customPage)
}
