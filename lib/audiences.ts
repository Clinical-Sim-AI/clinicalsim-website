import type { BrandIconName } from "@/components/brand-icon"
import type { Market } from "@/lib/positioning"
import type { FaqItem } from "@/lib/types"
import type { SolutionSlug } from "@/lib/solutions"

export interface PainPoint {
  headline: string
  description: string
  stat?: string
  statSource?: string
}

export interface ValueProp {
  title: string
  description: string
}

export interface AudienceStatItem {
  value: string
  label: string
  source?: string
  variant: "accent" | "navy" | "blue" | "light-blue"
}

export interface Audience {
  slug: string
  market: Market
  title: string
  shortTitle: string
  subtitle: string
  icon: BrandIconName
  colorVariant: "accent" | "navy" | "blue" | "light-blue"

  // Homepage card bullets
  cardBullets: string[]

  // Hero
  heroHeadline: string
  heroDescription: string
  lastUpdated?: string

  // Pain points
  painPoints: PainPoint[]

  // Stats
  stats: AudienceStatItem[]

  // Value propositions
  valueProps: ValueProp[]

  // Cross-links
  /**
   * Solution pages this audience's primary use case maps to, most relevant
   * first. Typed against the real slug union, not string: four audiences
   * shipped pointing at "goals-of-care", "advance-care-planning", and
   * "cognitive-assessments", none of which is a solution, and the layout's
   * silent fallback rendered the same remediation block on three pages.
   *
   * Typed as a non-empty tuple because components/audience-page-layout.tsx
   * renders the primary use-case block from entry [0]. A plain array permits
   * [], which would typecheck and then throw at prerender and fail the whole
   * build, so the emptiness check belongs in the type rather than only in
   * lib/audiences.test.ts.
   */
  relevantSolutionSlugs: [SolutionSlug, ...SolutionSlug[]]

  /**
   * Optional FAQ block. When present it renders a Q/A section and emits
   * FAQPage JSON-LD. Each answer must stand alone without its question and
   * carry its own stat or source, per the GEO rules in CLAUDE.md. The JSON-LD
   * answer text is the visible answer verbatim.
   */
  faqs?: FaqItem[]

  /**
   * Glossary slugs to link from this page. The only inbound path to a term page
   * used to be the /glossary hub, so authority reaching an audience page stopped
   * there. Hub-only terms are dropped at render time; list indexable ones.
   */
  glossarySlugs?: string[]

  // CTA
  ctaHeadline: string
  ctaDescription: string

  // Related blog posts
  relatedPostSlugs: string[]
}

const audiences: Audience[] = [
  {
    slug: "program-directors",
    market: "medical-education",
    title: "Program directors",
    shortTitle: "Program directors",
    subtitle: "Give each learner a clear next step between coaching sessions",
    icon: "hat-graduation",
    colorVariant: "navy",
    lastUpdated: "2026-09-03",

    cardBullets: [
      "Structured encounters between coaching sessions",
      "Rubric-scored reports your CCC can review",
      "No scheduling, no SP recruitment, no faculty observer required for practice",
    ],

    heroHeadline:
      "Give each learner a clear path through communication remediation",
    heroDescription:
      "Learners rehearse high-stakes conversations with AI patients and see what they did well and what to practice next. Reports use the standard approved for the case and cite transcript evidence, so faculty can focus coaching and bring a clear record to CCC review.",

    painPoints: [
      {
        headline: "Faculty time consumed",
        description:
          "One published clinical reasoning remediation program required a mean of 29.6 specialist contact hours, excluding program director, CCC, coordinator, and legal time.",
        stat: "29.6 hrs",
        statSource: "Guerrasio and Aagaard, J Gen Intern Med, 2014",
      },
      {
        headline: "No standardized tools",
        description:
          "In a survey of 267 family medicine program directors, 93% reported at least one resident in remediation during the prior three years.",
        stat: "93%",
        statSource: "CERA Survey, 267 Family Medicine PDs",
      },
      {
        headline: "Limited formal training in remediation",
        description:
          "One in four program directors reported receiving little to no training in how to remediate residents.",
        stat: "25%",
        statSource: "CERA Survey",
      },
      {
        headline: "Communication needs repeated practice",
        description:
          "Communication and professionalism concerns require faculty judgment, repeated observation, and a plan that gives the learner another chance to show the behavior.",
      },
    ],

    stats: [
      {
        value: "93%",
        label: "of 267 surveyed family medicine program directors reported remediation in the prior three years",
        source: "CERA Survey, 267 Family Medicine PDs",
        variant: "navy",
      },
      {
        value: "29.6",
        label: "mean specialist contact hours in one clinical reasoning remediation program",
        source: "Guerrasio and Aagaard, J Gen Intern Med, 2014",
        variant: "accent",
      },
      {
        value: "50%",
        label: "of PDs want an accessible remediation toolkit",
        source: "CERA Survey",
        variant: "navy",
      },
      {
        value: "25%",
        label: "of PDs received little to no training in remediation",
        source: "CERA Survey",
        variant: "accent",
      },
    ],

    valueProps: [
      {
        title: "Feedback that guides the next attempt",
        description:
          "Learners see what they did well and what to practice next, then repeat breaking bad news, informed consent, and other high-stakes conversations between coaching sessions.",
      },
      {
        title: "Rubric-scored assessment",
        description:
          "Each conversation is scored against the standard approved for the case, and every score cites the transcript line behind it, so faculty and the CCC can inspect the feedback rather than rely on a rating alone.",
      },
      {
        title: "On demand, not on schedule",
        description:
          "The learner who needs more practice should not have to wait for the next available SP slot. ClinicalSim provides repeatable practice from any device without booking another room or actor.",
      },
      {
        title: "Faculty coach, not faculty infrastructure",
        description:
          "The program director stays in the loop as coach without serving as the entire remediation infrastructure. Review agreed practice records without sitting in every session.",
      },
    ],

    faqs: [
      {
        question: "How much faculty time does communication remediation take?",
        answer:
          "One published clinical reasoning remediation program required a mean of 29.6 specialist contact hours per learner (Guerrasio and Aagaard, J Gen Intern Med, 2014), and that figure excludes program director, CCC, coordinator, and legal time. It is a single program's mean rather than a benchmark, so treat it as the one published number available rather than a range to plan against.",
      },
      {
        question: "How common is resident remediation, and are program directors trained for it?",
        answer:
          "In a CERA survey of 267 family medicine program directors, 93% reported at least one resident in remediation during the prior three years, 25% reported receiving little to no training in how to remediate, and 50% said they want an accessible remediation toolkit. Communication and professionalism are the competencies that need faculty judgment and repeated observation, which is exactly what a program has least of.",
      },
      {
        question: "What can a program director give a learner between coaching sessions?",
        answer:
          "Structured practice in the specific conversation the learner wants to improve, repeated without booking a standardized patient or a room for each attempt. Each report shows strengths and areas for practice against the standard approved for the case. Under access rules set before launch, the program director can focus coaching without attending every session.",
      },
      {
        question: "Can a ClinicalSim report go into a Clinical Competency Committee review?",
        answer:
          "Yes. Each report scores the conversation against the standard approved for the case and quotes the learner's own words under every score, so a CCC can read what the learner said alongside faculty observation and the other evidence it already uses. The report does not replace faculty judgment or the committee's decision.",
      },
    ],

    relevantSolutionSlugs: ["longitudinal-curriculum", "remediation"],

    glossarySlugs: [
      "milestones",
      "remediation",
      "ccc",
      "epa",
      "high-stakes-conversations",
    ],
    ctaHeadline: "Start with a repeatable remediation structure",
    ctaDescription:
      "Talk with us about how structured practice and rubric-scored feedback could fit your communication remediation plan.",

    relatedPostSlugs: [
      "osce-case-design-guide",
      "breaking-bad-news-practice-not-knowledge",
      "ai-affirming-care-communication-training",
      "what-programs-lost-when-step-2-cs-disappeared",
    ],
  },

  {
    slug: "dios-gme-leadership",
    market: "medical-education",
    title: "DIOs and GME leadership",
    shortTitle: "DIOs and GME",
    subtitle: "One reporting structure across programs, with local clinical standards",
    icon: "hospital",
    colorVariant: "accent",
    lastUpdated: "2026-09-03",

    cardBullets: [
      "Shared remediation documentation across every program",
      "Case-specific frameworks in one program view",
      "Every session creates a timestamped, rubric-scored record",
    ],

    heroHeadline:
      "Give every program the same starting point for communication remediation",
    heroDescription:
      "Residents practice with AI patients and receive feedback against the standard approved for the case. The GME office gets a consistent program view under institution-defined access rules, while each program director and CCC keeps authority.",

    painPoints: [
      {
        headline: "Remediation varies across programs",
        description:
          "Each program may build its remediation approach independently, which makes it hard for GME leaders to see whether learners have a repeatable structure for practice and coaching.",
      },
      {
        headline: "Evidence is hard to compare",
        description:
          "Competency standards give programs shared language for interpersonal and communication skills, but the observations and documentation available to each CCC still vary.",
      },
      {
        headline: "The record may be incomplete",
        description:
          "A GME office may need to reconstruct which practice a learner completed, what feedback they received, and how faculty used that evidence in the remediation plan.",
        stat: "Transcript",
        statSource:
          "ClinicalSim evidence behind each practice score",
      },
      {
        headline: "Repeated practice is hard to coordinate",
        description:
          "Communication remediation requires repeated practice, but each standardized patient encounter requires actor time, space, faculty support, and scheduling. That makes a consistent institutional approach difficult to sustain across every program.",
      },
    ],

    stats: [
      {
        value: "29.6",
        label: "mean specialist contact hours in one clinical reasoning remediation program",
        source: "Guerrasio and Aagaard, J Gen Intern Med, 2014",
        variant: "accent",
      },
      {
        value: "Transcript",
        label: "evidence behind every practice score",
        source: "ClinicalSim reporting method",
        variant: "navy",
      },
      {
        value: "ICS 1-3",
        label: "rubric-scored documentation from every practice session",
        source: "ClinicalSim reporting method",
        variant: "accent",
      },
      {
        value: "93%",
        label:
          "of 267 surveyed family medicine program directors reported at least one resident in remediation during the prior three years",
        source: "CERA Survey, 267 family medicine program directors",
        variant: "light-blue",
      },
    ],

    valueProps: [
      {
        title: "One reporting structure across programs",
        description:
          "Every report uses a consistent structure while each case uses the communication framework that fits the specialty, learner, and task.",
      },
      {
        title: "Documentation for review",
        description:
          "Every practice session generates a timestamped, rubric-scored record that a program director, CCC, or GMEC can review alongside other evidence.",
      },
      {
        title: "Keep practice inside the program",
        description:
          "One institutional license can cover every program, learner, and competency committee cycle instead of sending each learner to a separate external assessment.",
      },
      {
        title: "One program view",
        description:
          "GME leaders can review participation and practice reports across programs without taking authority away from the program director or CCC.",
      },
    ],

    faqs: [
      {
        question: "How can a GME office standardize communication remediation across programs?",
        answer:
          "A consistent report structure gives a GME office one program view while each case still uses the communication framework that fits the specialty, learner, and task. Residents receive feedback tied to the harmonized ICS language, and each program director and CCC keeps authority over the remediation plan.",
      },
      {
        question: "What documentation does a GME office get from each practice session?",
        answer:
          "Every ClinicalSim practice session generates a timestamped record with feedback scored against the standard approved for the case and transcript evidence behind each score. A program director, CCC, or GMEC can review it alongside other evidence when a GME office needs to reconstruct which practice a learner completed and what feedback they received.",
      },
      {
        question: "Does ClinicalSim take authority away from a program director or CCC?",
        answer:
          "No. GME leaders can review participation and practice reports across programs, and each program director and CCC keeps authority over the remediation plan and the decision. ClinicalSim adds a comparable evidence source; it does not adjudicate anything.",
      },
    ],

    relevantSolutionSlugs: ["longitudinal-curriculum", "faculty-development"],

    glossarySlugs: [
      "dio",
      "gme",
      "cbme",
      "milestones",
      "remediation",
    ],
    ctaHeadline: "Give every program the same starting point",
    ctaDescription:
      "Talk with us about shared case standards, learner feedback, and the reporting rules your GME office needs.",

    relatedPostSlugs: [
      "why-communication-training-matters",
      "faculty-hour-problem-communication-remediation",
    ],
  },

  {
    slug: "simulation-center-directors",
    market: "medical-education",
    title: "Simulation center directors",
    shortTitle: "Simulation center directors",
    subtitle: "Extend your SP program, don't replace it",
    icon: "microscope",
    colorVariant: "blue",
    lastUpdated: "2026-09-03",

    cardBullets: [
      "Transcript evidence for faculty and CCC review",
      "Practice volume for learners who need more support",
      "A longitudinal record of simulated practice",
    ],

    heroHeadline:
      "Give learners more practice without adding another SP session",
    heroDescription:
      "ClinicalSim scores voice-based practice between scheduled encounters against the framework named on the case, or a rubric your center supplies, with the learner's own words quoted under every score. Your SP program keeps the live assessment and coaching work that require human presence.",

    painPoints: [
      {
        headline: "SP encounters can't scale for remediation",
        description:
          "Individual remediation requires repeated practice, but each live encounter requires a trained actor, space, faculty support, and scheduling. That makes frequent practice hard to provide through live simulation alone.",
        stat: "On demand",
        statSource: "Practice between scheduled SP encounters",
      },
      {
        headline: "Budget pressure on communication sim",
        description:
          "Communication simulation requires trained people, space, time, and scheduling. Those inputs limit the number of live practice encounters a center can provide for one remediation plan.",
      },
      {
        headline: "Assessment data gaps",
        description:
          "SP encounters provide human observation and feedback. Programs may still need a consistent way to record the practice that happens between live encounters.",
      },
      {
        headline: "Center value justification",
        description:
          "Simulation center directors have to document their centers' use and impact. Longitudinal, rubric-scored communication data gives them evidence that can support that work.",
      },
    ],

    stats: [
      {
        value: "24/7",
        label: "practice access between scheduled SP encounters",
        variant: "blue",
      },
      {
        value: "Transcript",
        label: "evidence behind each ClinicalSim practice score",
        source: "ClinicalSim reporting method",
        variant: "navy",
      },
      {
        value: "24/7",
        label: "on-demand access with no scheduling bottleneck",
        variant: "blue",
      },
      {
        value: "ICS 1-3",
        label: "rubric-scored feedback from every practice session",
        source: "ClinicalSim reporting method",
        variant: "light-blue",
      },
    ],

    valueProps: [
      {
        title: "Extend, don't replace",
        description:
          "ClinicalSim adds repeatable practice between scheduled SP encounters. Your SP program keeps the live coaching and high-stakes assessments that require human presence.",
      },
      {
        title: "Evidence from each practice session",
        description:
          "Each report scores the conversation against the framework named on the case and quotes the learner's own words under every score, so faculty can see which element changed between attempts and bring the record into committee review.",
      },
      {
        title: "The volume remediation requires",
        description:
          "ClinicalSim gives a learner repeatable voice-based practice between scheduled SP encounters without requiring another actor or room for each attempt.",
      },
      {
        title: "Show your center's impact",
        description:
          "Document which learners practiced, which cases they completed, and how their scores changed across simulated encounters.",
      },
    ],

    faqs: [
      {
        question: "Does ClinicalSim replace a standardized patient program?",
        answer:
          "No. ClinicalSim extends a standardized patient program rather than replacing it. SP encounters keep the live coaching and the high-stakes assessment that need human presence, and ClinicalSim adds the repetitions in between. It is also audio only, so eye contact, body language, and physical presence stay with live encounters.",
      },
      {
        question: "How does a simulation center provide the practice volume remediation requires?",
        answer:
          "Individual remediation requires repeated practice, and every live encounter requires a trained actor, space, faculty support, and scheduling, which is what caps how many repetitions a center can offer for one remediation plan. ClinicalSim runs on demand from any device, so a learner gets another attempt without another actor or room, and the center's SP capacity goes to the encounters that genuinely need a person.",
      },
      {
        question: "How can a simulation center document its impact?",
        answer:
          "Simulation center directors have to show use and impact, and communication practice is usually the hardest part to evidence. ClinicalSim records which learners practiced, which cases they completed, and how their scores changed across repeated simulated encounters, with rubric-scored feedback and transcript evidence behind each score.",
      },
    ],

    relevantSolutionSlugs: ["debriefing", "longitudinal-curriculum"],

    glossarySlugs: [
      "sim-lab",
      "patient-simulator",
      "clinical-judgment-model",
      "simulation-fidelity",
      "high-fidelity-simulation",
      "hybrid-simulation",
      "in-situ-simulation",
      "manikin",
      "task-trainer",
      "moulage",
      "embedded-participant",
      "standardized-patient",
      "standardized-patient-case",
      "aspe",
      "chse",
      "ai-standardized-patient",
    ],
    ctaHeadline: "See how ClinicalSim extends an SP program",
    ctaDescription:
      "Talk with us about how repeatable AI patient practice could extend your simulation center's communication training capacity.",

    relatedPostSlugs: [
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
      "healthcare-simulation-technology-trends",
    ],
  },

  {
    slug: "clinical-competency-committees",
    market: "medical-education",
    title: "Clinical competency committees",
    shortTitle: "CCCs",
    subtitle: "Rubric-scored evidence for CCC review",
    icon: "ribbon-check",
    colorVariant: "light-blue",
    lastUpdated: "2026-09-03",

    cardBullets: [
      "Rubric-scored assessment data from structured practice sessions",
      "Longitudinal progress tracking across the remediation period",
      "Structured data to complement faculty observations",
    ],

    heroHeadline: "Give your CCC another source of communication evidence",
    heroDescription:
      "Each conversation is scored against the standard approved for the case, with the learner's own words quoted under every score. Review it alongside faculty observation and the other evidence your committee already uses.",

    painPoints: [
      {
        headline: "Subjective assessment data",
        description:
          "Faculty observation remains central to CCC review, but communication evidence can be sparse and difficult to compare across a remediation period.",
        stat: "Transcript",
        statSource: "Evidence behind each ClinicalSim score",
      },
      {
        headline: "Sparse data points",
        description:
          "A learner in remediation may have only a few documented communication observations across several months. Repeatable practice can add another source of evidence between faculty observations.",
      },
      {
        headline: "No longitudinal view",
        description:
          "When evidence comes from isolated encounters, a committee may have difficulty seeing whether the same behavior changes across repeated attempts.",
      },
      {
        headline: "Documentation for due process",
        description:
          "A timestamped practice report can document what the learner said and how the score was reached. The committee still decides how that report fits with its other evidence.",
      },
    ],

    stats: [
      {
        value: "Transcript",
        label:
          "evidence behind each score for faculty and CCC review",
        source: "ClinicalSim reporting method",
        variant: "light-blue",
      },
      {
        value: "Case rubric",
        label:
          "structured feedback from every practice session",
        source: "ClinicalSim reporting method",
        variant: "navy",
      },
      {
        value: "Each report",
        label: "includes a timestamp and transcript evidence",
        variant: "light-blue",
      },
      {
        value: "Longitudinal",
        label: "progress tracking records repeated simulated encounters",
        variant: "blue",
      },
    ],

    valueProps: [
      {
        title: "Structured communication data",
        description:
          "Every practice conversation is scored against the standard approved for the case, element by element, with the learner's words under each score. Your committee can read that comparable record alongside faculty evaluations.",
      },
      {
        title: "Longitudinal progress tracking",
        description:
          "Review multiple practice attempts across weeks or months and compare the transcript evidence behind each score.",
      },
      {
        title: "Reports for CCC review",
        description:
          "Assessment data is formatted for committee review, with timestamped sessions, milestone scores, transcript evidence, and progress trends.",
      },
      {
        title: "Complement faculty assessment",
        description:
          "ClinicalSim data doesn't replace faculty judgment. It supplements faculty observation with a repeatable assessment record from each practice session.",
      },
    ],

    faqs: [
      {
        question: "What communication evidence can a CCC review besides faculty observation?",
        answer:
          "Faculty observation stays central, but communication evidence is often sparse and hard to compare across a remediation period, and a learner may have only a few documented observations across several months. A ClinicalSim practice report adds a timestamped record that scores the conversation against the standard approved for the case and quotes the learner's own words as the evidence for each score, which a committee can compare across attempts.",
      },
      {
        question: "Can a committee see whether a learner's communication changed over time?",
        answer:
          "Yes. Repeated attempts at the same or related cases are recorded longitudinally, so a committee can compare multiple practice sessions across weeks or months and read the transcript evidence behind each score rather than inferring change from isolated encounters.",
      },
      {
        question: "Does ClinicalSim replace faculty judgment in CCC review?",
        answer:
          "No. ClinicalSim supplements faculty observation with a repeatable assessment record from each practice session; the committee still decides how that report fits with its other evidence. ClinicalSim makes no claim that its scoring is more accurate or more valid than a faculty member's read.",
      },
    ],

    relevantSolutionSlugs: ["remediation", "longitudinal-curriculum"],

    glossarySlugs: [
      "ccc",
      "milestones",
      "epa",
      "cbme",
      "dreyfus-model",
    ],
    ctaHeadline: "Add another source of communication evidence",
    ctaDescription:
      "Talk with us about the learner feedback and transcript evidence ClinicalSim can add to your committee's existing sources.",

    relatedPostSlugs: [
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
    ],
  },

  {
    slug: "medical-school-leadership",
    market: "medical-education",
    title: "Medical school and UME leadership",
    shortTitle: "Medical school (UME)",
    subtitle: "Sequence communication across all four years",
    icon: "book-opened",
    colorVariant: "blue",
    lastUpdated: "2026-09-02",

    cardBullets: [
      "A four-year arc from history-taking to diagnosis disclosure",
      "Repeatable practice between standardized patient encounters",
      "A dashboard that follows each student through clerkships",
    ],

    heroHeadline:
      "Build communication skill across all four years",
    heroDescription:
      "Sequence voice-based practice from history taking to diagnosis disclosure, score every conversation against the framework named on the case with the student's own words under each score, and follow each student across clerkships in one dashboard. ClinicalSim adds repetition between SP encounters and OSCEs.",

    painPoints: [
      {
        headline: "The national communication exam is gone",
        description:
          "USMLE Step 2 CS was permanently discontinued in 2021. No national successor now assesses spoken clinical communication, so medical schools have built local methods.",
        stat: "2021",
        statSource: "Step 2 CS discontinued (USMLE / NBME)",
      },
      {
        headline: "Standardized-patient encounters don't scale",
        description:
          "SP encounters remain important for high-stakes assessment, but each session requires a trained actor, space, faculty support, and advance scheduling. That limits how often students can practice before clerkships.",
        stat: "On demand",
        statSource: "Practice between scheduled SP encounters",
      },
      {
        headline: "Curricula need a visible sequence",
        description:
          "A school can sequence communication practice from history taking through diagnosis disclosure and keep each student's work in one program view.",
      },
      {
        headline: "More live practice is hard to schedule",
        description:
          "Each SP encounter requires a trained actor, space, faculty support, and scheduling, which limits the repetitions available between OSCEs.",
      },
    ],

    stats: [
      {
        value: "2021",
        label: "Step 2 CS, the national communication exam, was discontinued",
        source: "USMLE / NBME",
        variant: "blue",
      },
      {
        value: "4 years",
        label: "of sequenced practice, from history-taking to diagnosis disclosure",
        variant: "navy",
      },
      {
        value: "24/7",
        label: "on-demand practice between standardized-patient encounters",
        variant: "blue",
      },
      {
        value: "Every session",
        label: "generates structured, rubric-scored feedback",
        variant: "light-blue",
      },
    ],

    valueProps: [
      {
        title: "A four-year arc",
        description:
          "Sequence scenarios so communication complexity rises with clinical knowledge: structured history-taking in the preclinical years, updating families on a plan in M3, and delivering a new diagnosis in M4.",
      },
      {
        title: "Practice between SP encounters",
        description:
          "ClinicalSim adds voice-based practice between scheduled standardized patient sessions and OSCEs. Live coaching and assessment stay with people.",
      },
      {
        title: "A dashboard through clerkships",
        description:
          "Review each student's simulated practice across four years alongside OSCEs and other program evidence.",
      },
      {
        title: "Built on published frameworks",
        description:
          "Every conversation is scored against a published framework named on the case, such as SPIKES, teach-back, or Calgary-Cambridge, with the student's own words quoted under each score, so students learn structures they'll carry into residency and see exactly which step they skipped.",
      },
    ],

    faqs: [
      {
        question: "How do medical schools assess spoken clinical communication now that Step 2 CS is gone?",
        answer:
          "USMLE Step 2 CS was permanently discontinued in 2021 (USMLE / NBME) and no national successor assesses spoken clinical communication, so schools have built local methods, usually around standardized patient encounters and OSCEs. Those stay the high-stakes assessment, and the gap most schools describe is repetition between them.",
      },
      {
        question: "How can a school sequence communication practice across four years?",
        answer:
          "Sequence the scenarios so communication complexity rises with clinical knowledge: structured history-taking in the preclinical years, updating a family on a plan in M3, and delivering a new diagnosis in M4. Each student's simulated practice sits in one view across all four years, so a clerkship director can read it alongside OSCE results and other program evidence rather than reconstructing it per rotation.",
      },
      {
        question: "Which communication frameworks do undergraduate medical education scenarios use?",
        answer:
          "Every case names the published communication framework it scores against, including SPIKES, teach-back, and Calgary-Cambridge, and every score quotes the student's own words. Students learn structures they carry into residency rather than a scoring scheme local to one platform.",
      },
    ],

    relevantSolutionSlugs: ["undergraduate-medical-education"],

    glossarySlugs: [
      "osce",
      "standardized-patient",
      "millers-pyramid",
      "cbme",
      "interprofessional-education",
    ],
    ctaHeadline:
      "Build communication skill across all four years.",
    ctaDescription:
      "Talk with us about a four-year practice sequence from the first patient history through diagnosis disclosure.",

    relatedPostSlugs: [
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
      "breaking-bad-news-practice-not-knowledge",
    ],
  },

  {
    slug: "faculty-clinician-educators",
    market: "medical-education",
    title: "Faculty and clinician educators",
    shortTitle: "Faculty educators",
    subtitle: "Practice the conversations faculty are expected to model",
    icon: "medal-star",
    colorVariant: "accent",
    lastUpdated: "2026-09-02",

    cardBullets: [
      "Rehearse giving specific corrective feedback",
      "Lead professionalism conversations with peers",
      "The same rubric system that trains residents",
    ],

    heroHeadline:
      "Practice the conversations you are expected to lead",
    heroDescription:
      "Rehearse corrective feedback, professionalism concerns, and bedside teaching in private. See which elements of the framework you hit and which you skipped, in your own words, before you have the conversation with a learner or colleague.",

    painPoints: [
      {
        headline: "Faculty model skills they never practiced",
        description:
          "Giving structured feedback, handling defensiveness, and running a professionalism conversation are learned skills that faculty can rehearse before leading them in person.",
      },
      {
        headline: "Faculty need evidence they can inspect",
        description:
          "A private report scores the conversation against the framework on the case and quotes what the faculty member said under each score, so they can see what worked and what to practice before discussing it with a coach.",
      },
      {
        headline: "No consistent feedback loop",
        description:
          "Faculty can rehearse a corrective feedback conversation in private and review the report before leading it with a learner or colleague.",
      },
      {
        headline: "Professionalism conversations get avoided",
        description:
          "Addressing a peer's lateness, disengagement, or underperformance is uncomfortable, so it's often deferred, and unaddressed concerns escalate into larger problems for the team and the program.",
      },
    ],

    stats: [
      {
        value: "Case specific",
        label: "frameworks selected for each faculty conversation",
        variant: "accent",
      },
      {
        value: "Pendleton · SBI",
        label: "structured feedback frameworks built into the scenarios",
        variant: "navy",
      },
      {
        value: "24/7",
        label: "private, on-demand practice from any device",
        variant: "accent",
      },
      {
        value: "Every session",
        label: "generates structured, rubric-scored feedback",
        variant: "light-blue",
      },
    ],

    valueProps: [
      {
        title: "Rehearse corrective feedback",
        description:
          "Practice delivering corrective feedback to a learner with structure (Pendleton, SBI) and handling defensiveness, before the real conversation, not during it.",
      },
      {
        title: "Address professionalism concerns",
        description:
          "Work through addressing lateness, disengagement, or a colleague performing below expectations directly, without damaging the working relationship.",
      },
      {
        title: "Practice bedside teaching",
        description:
          "Practice teach-back from the teacher's side, calibrating to the learner's level and protecting time for questions, with feedback tied to the transcript.",
      },
      {
        title: "One platform for learners and teachers",
        description:
          "Faculty development scenarios use the same engine and dashboard as learner scenarios, with frameworks selected for the faculty conversation rather than a trainee milestone.",
      },
    ],

    faqs: [
      {
        question: "Where do faculty actually learn to give structured corrective feedback?",
        answer:
          "Faculty can rehearse structured feedback, defensiveness, and professionalism conversations before leading them in person. ClinicalSim cases use named feedback frameworks such as Pendleton and SBI, with a private report that shows what worked and what to practice next.",
      },
      {
        question: "How can a faculty member prepare for a professionalism conversation with a peer?",
        answer:
          "Addressing a colleague's lateness, disengagement, or underperformance is uncomfortable, so it gets deferred, and deferred concerns grow into larger problems for the team and the program. Rehearsing the conversation produces a rubric-scored report with the transcript evidence behind each score, which a faculty member can read before deciding how to open the real conversation.",
      },
      {
        question: "Is faculty practice private?",
        answer:
          "Yes. Faculty practice on demand from any device with no observer in the encounter, and they review the rubric and the transcript themselves before sharing anything with a coach or program. Faculty development scenarios use the same engine and dashboard as learner scenarios, with frameworks chosen for the faculty conversation rather than a trainee milestone.",
      },
    ],

    relevantSolutionSlugs: ["error-disclosure", "debriefing"],

    glossarySlugs: [
      "debriefing",
      "pearls-debriefing",
      "ask-tell-ask",
      "deliberate-practice",
      "psychological-safety-in-simulation",
    ],
    ctaHeadline:
      "Give faculty the practice they never got.",
    ctaDescription:
      "Talk with us about cases for corrective feedback, professionalism concerns, and bedside teaching.",

    relatedPostSlugs: [
      "eol-communication-training-measurement-gap",
      "why-communication-training-matters",
      "breaking-bad-news-practice-not-knowledge",
    ],
  },
  {
    slug: "risk-and-patient-safety",
    market: "health-system",
    title: "Risk and patient safety leaders",
    shortTitle: "Risk and safety",
    subtitle: "Communication factors in 40% of asserted malpractice cases",
    icon: "chart-pipe-decrease",
    colorVariant: "navy",

    cardBullets: [
      "Practice conversations associated with malpractice claims",
      "Private participant feedback with access rules set before launch",
      "Extends the simulation program your institution already runs",
    ],

    heroHeadline:
      "Give clinicians a safe place to practice high-stakes safety conversations",
    heroDescription:
      "Clinicians rehearse disclosure, goals of care, family meetings, and de-escalation with AI patients. Each private report shows strengths and areas for practice against a published framework or institution policy. Leaders review completion or aggregate patterns under institution-defined access rules. ClinicalSim does not monitor patient care or predict claims.",
    lastUpdated: "2026-09-03",

    painPoints: [
      {
        headline: "The indemnity math on a single case",
        description:
          "Average indemnity on a communication-failure malpractice case runs from $386,000 in general medicine to $944,000 in obstetrics, and that is before defense costs. Communication claims are also more than twice as likely to top $1 million than other claims (Humphrey et al., Journal of Patient Safety 2022).",
        stat: "$386K to $944K",
        statSource:
          "Average indemnity per communication-failure case, general medicine to obstetrics (CRICO 2015)",
      },
      {
        headline: "The share of claims is rising",
        description:
          "Candello found communication factors in 40% of asserted malpractice cases from 2014 through 2024, compared with 30% in its earlier analysis. Those claims also carried 39% greater odds of closing with an indemnity payment. The data describes association, not the effect of a training product.",
        stat: "40%",
        statSource:
          "Of asserted malpractice cases included communication factors (Candello 2025)",
      },
      {
        headline: "Sentinel events keep coming back to communication",
        description:
          "The Joint Commission has repeatedly named communication a leading root cause of sentinel events in Sentinel Event Alert 58. That alert is qualitative and attaches no percentage, which is part of why a risk office struggles to size the exposure and defend a training budget against it.",
      },
      {
        headline: "Credit exists for courses, evidence of practice does not",
        description:
          "Carriers award premium credits of 5 to 19% for completing an approved risk-reduction course (CRICO and New York Regulation 124 premium programs). ClinicalSim holds no approved-course designation and has not been studied against claims.",
        stat: "5 to 19%",
        statSource:
          "Malpractice premium credit for an approved risk-reduction course (CRICO; NY Regulation 124)",
      },
    ],

    stats: [
      {
        value: "$386K-$944K",
        label:
          "average indemnity per communication-failure case, general medicine to obstetrics, before defense costs",
        source: "CRICO 2015 specialty indemnity averages",
        variant: "navy",
      },
      {
        value: "40%",
        label:
          "of asserted malpractice cases included communication factors from 2014 through 2024",
        source: "Candello 2025 Benchmarking Report",
        variant: "blue",
      },
      {
        value: "39%",
        label:
          "greater odds that a communication-failure claim closes with an indemnity payment",
        source: "Candello 2025 Benchmarking Report",
        variant: "navy",
      },
    ],

    valueProps: [
      {
        title: "Practice the conversations that appear in claims",
        description:
          "The library covers goals-of-care conversations, diagnosis disclosure, advance care planning, family meetings, and de-escalation. Clinicians practice by voice, on demand, from any device, and each conversation is scored against a published framework such as SPIKES or Calgary-Cambridge, or against your institution's own disclosure or consent policy, with their own words quoted under every score.",
      },
      {
        title: "Participant feedback and reporting rules set by you",
        description:
          "Clinicians see their own feedback after each simulated conversation. The institution chooses completion reporting, agreed coaching access, or aggregate patterns before practice begins.",
      },
      {
        title: "Extends the simulation program you already fund",
        description:
          "CRICO's obstetric safety program combined simulation with team training and other safety work. ClinicalSim adds repetitions between scheduled standardized patient encounters and drills. It has not been studied against claims.",
      },
      {
        title: "Volume without new scheduling",
        description:
          "A risk office can offer focused practice without adding standardized patient hours or booking sim lab time, because sessions run from any device at any hour.",
      },
    ],

    faqs: [
      {
        question: "What does a communication-failure claim actually cost?",
        answer:
          "Average indemnity on a communication-failure malpractice case runs from $386,000 in general medicine to $944,000 in obstetrics, before defense costs (CRICO 2015 specialty indemnity averages). Candello found communication factors in 40% of asserted malpractice cases from 2014 through 2024, and those claims carried 39% greater odds of closing with an indemnity payment. Communication claims were also more than twice as likely to top $1 million in Humphrey et al. (Journal of Patient Safety, 2022).",
      },
      {
        question:
          "Is there evidence that communication training changes claim rates?",
        answer:
          "A published report on CRICO's multi-part obstetric safety program described lower OB claim rates after a program that included simulation, team training, and other safety work (Schaffer et al., Obstetrics and Gynecology 2021). The change cannot be attributed to simulation alone. ClinicalSim has not been studied against claim rates.",
      },
      {
        question: "Does ClinicalSim qualify for a malpractice premium credit?",
        answer:
          "Carriers award premium credits of 5 to 19% for completing an approved risk-reduction course (CRICO and New York Regulation 124 premium programs), and approval is the carrier's decision rather than ours. ClinicalSim holds no approved-course designation today. It provides records from simulated practice under the reporting rules the institution sets before launch.",
      },
      {
        question: "Does this replace our standardized patient program?",
        answer:
          "No. Standardized patient encounters stay the high-stakes assessment, and ClinicalSim adds repetitions between those encounters. Live assessment and human judgment remain with the program.",
      },
      {
        question: "Does any patient data enter the platform?",
        answer:
          "Every patient in a ClinicalSim case is synthetic and written from clinical literature rather than a patient record. The product still handles learner recordings, transcripts, account data, and institutional data. Full detail is on our trust and data handling page.",
      },
    ],

    relevantSolutionSlugs: ["faculty-development"],

    glossarySlugs: [
      "high-stakes-conversations",
      "sbar",
      "goals-of-care",
      "serious-illness-conversation-guide",
      "spikes-protocol",
      "family-meeting",
    ],
    ctaHeadline: "Add structured practice to your patient safety training",
    ctaDescription:
      "Talk with us about the conversations clinicians should practice and the access rules your institution needs.",

    relatedPostSlugs: [
      "why-communication-training-matters",
      "breaking-bad-news-practice-not-knowledge",
    ],
  },
  {
    slug: "quality-and-patient-experience",
    market: "health-system",
    title: "Quality and patient experience leaders",
    shortTitle: "Quality and patient experience",
    subtitle:
      "Practice the service standards your institution already teaches",
    icon: "chart-pie-quarter",
    colorVariant: "blue",

    cardBullets: [
      "Start with one unit and one communication behavior",
      "Score your service standards and scripts",
      "Review named cohorts or anonymous unit results",
    ],

    heroHeadline:
      "Start with one unit, one standard, and one reporting question",
    heroDescription:
      "Nurses, clinicians, and patient facing staff practice by voice with AI patients. Each report scores the encounter against your approved service standards and cites the transcript. ClinicalSim does not predict HCAHPS, Qualtrics, readmission, or other patient outcomes.",
    lastUpdated: "2026-09-03",

    painPoints: [
      {
        headline: "Choose one unit and one behavior",
        description:
          "A useful pilot begins with a defined group and a behavior the institution already teaches, such as listening, explaining, teach back, or asking permission before entering a room.",
      },
      {
        headline: "Use the standard already in place",
        description:
          "The rubric should use the hospital's approved service model, script, or policy. It can give credit for the intended behavior without demanding one exact sentence.",
      },
      {
        headline: "Set privacy and access before launch",
        description:
          "Decide whether leaders need named completion records, named coaching reports, or anonymous unit results. Those choices should follow the institution's training policy and labor agreements.",
      },
      {
        headline: "Treat outcome comparison as research",
        description:
          "An institution can compare aggregate practice data with its own patient experience results under an approved study plan. A simulation score is not a patient outcome and should not be described as one.",
      },
    ],

    stats: [
      {
        value: "25%",
        label:
          "of the Medicare value-based purchasing score is patient experience, funded by a 2% withhold",
        source: "CMS FY2026 IPPS final rule",
        variant: "navy",
      },
      {
        value: "5 of 8",
        label:
          "HCAHPS measures Medicare pays on are communication measures, about 15.6% of the score",
        source: "CMS",
        variant: "blue",
      },
      {
        value: "~30%",
        label:
          "lower 30-day utilization after a communication-centered discharge, in a randomized trial",
        source: "Project RED, Annals of Internal Medicine 2009",
        variant: "navy",
      },
      {
        value: "OR 0.40",
        label:
          "heart failure readmissions after teach-back education",
        source: "Meta-analysis, Patient Education and Counseling 2023",
        variant: "blue",
      },
    ],

    valueProps: [
      {
        title: "Your service standards, scored as written",
        description:
          "ClinicalSim can score the behaviors in an approved service model, script, or rubric and give credit when the speaker conveys the same intent in natural language.",
      },
      {
        title: "Practice before the shift",
        description:
          "Nurses, clinicians, and patient facing staff can rehearse listening, explanation, teach back, and service conversations from a browser without booking a room or observer.",
      },
      {
        title: "Named cohort or anonymous unit reports",
        description:
          "The institution can use participant IDs, limit named access, and review aggregate patterns by unit or cohort. The person who practiced can still see the transcript evidence behind the feedback.",
      },
      {
        title: "Structured exports for an approved study",
        description:
          "Aggregate exports can support a comparison with institution held Qualtrics or HCAHPS data. ClinicalSim does not predict those scores or claim that practice changes them.",
      },
    ],

    faqs: [
      {
        question: "What does a one unit patient experience pilot look like?",
        answer:
          "Choose one unit, one group of staff, and one behavior the institution already teaches. Define the rubric, decide who can see names, run voice practice with AI patients, and review the aggregate pattern before choosing the next training topic.",
      },
      {
        question: "Can results be anonymous for leaders?",
        answer:
          "Yes. An institution can use anonymous participant IDs and receive aggregate unit or cohort results. Named completion records and named coaching reports are separate choices that should follow the training policy and labor agreements set before launch.",
      },
      {
        question: "Can ClinicalSim data be compared with Qualtrics results?",
        answer:
          "ClinicalSim can provide structured aggregate exports for an institution to compare with its own Qualtrics data under an approved study plan. It does not predict Qualtrics or HCAHPS scores, and no current evidence shows that a ClinicalSim score changes them.",
      },
      {
        question: "What are the HCAHPS nurse communication measures?",
        answer:
          "Communication with Nurses is a three-item HCAHPS composite. It asks how often, during this hospital stay, nurses treated the patient with courtesy and respect, how often nurses listened carefully to the patient, and how often nurses explained things in a way the patient could understand (CMS HCAHPS survey questions). None of the three asks about clinical accuracy, so what the composite scores is respect, listening, and whether an explanation worked.",
      },
      {
        question: "What are the HCAHPS doctor communication questions?",
        answer:
          "Communication with Doctors asks the same three questions as the nurse composite, about doctors: how often doctors treated the patient with courtesy and respect, how often doctors listened carefully, and how often doctors explained things in a way the patient could understand (CMS HCAHPS survey questions). Doctor communication rose 0.8 points from 2008 to 2019, the smallest gain of any HCAHPS domain (Beckett et al., Medical Care 2024).",
      },
      {
        question:
          "What share of a hospital's Total Performance Score is patient experience?",
        answer:
          "Patient experience is 25% of a hospital's Total Performance Score under Medicare's Hospital Value-Based Purchasing program, which is funded by a 2% withhold of base operating payments and redistributes about $1.7 billion a year (CMS FY2026 IPPS final rule). Five of the eight HCAHPS measures Medicare pays on are communication measures, roughly 15.6% of the total score (CMS).",
      },
      {
        question: "How do hospitals improve HCAHPS communication scores?",
        answer:
          "HCAHPS arrives as a unit or hospital score, weeks after discharge, about the whole stay. Teams can use it to choose a shared practice focus, while participants review their own simulated feedback under preset access rules. The evidence supports the behaviors: a communication-centered discharge cut 30-day utilization about 30% in a randomized trial (Project RED, Annals of Internal Medicine 2009), and teach-back education cut heart failure readmissions with an odds ratio of 0.40 in a 2023 meta-analysis (Patient Education and Counseling). No study has tested ClinicalSim against HCAHPS scores, and we claim no score-to-survey correlation.",
      },
      {
        question:
          "How much of a hospital's Medicare payment depends on communication?",
        answer:
          "Medicare withholds 2% of base operating payments and redistributes about $1.7 billion a year through value-based purchasing, and patient experience is 25% of that score (CMS FY2026 IPPS final rule). Five of the eight HCAHPS measures Medicare pays on are communication measures, roughly 15.6% of a hospital's total value-based purchasing score (CMS).",
      },
      {
        question: "Does communication training move readmissions?",
        answer:
          "A communication-centered discharge process cut 30-day hospital utilization by about 30% in a randomized trial (Project RED, Annals of Internal Medicine 2009), and teach-back education cut heart failure readmissions with an odds ratio of 0.40 in a 2023 meta-analysis (Patient Education and Counseling). CMS readmission penalties run $320 million to $563 million a year and reach roughly three quarters of evaluated hospitals (KFF and Definitive Healthcare analyses of CMS data). ClinicalSim itself has not been studied against readmission rates.",
      },
      {
        question: "Why has HCAHPS communication been so hard to move?",
        answer:
          "Doctor communication rose 0.8 points from 2008 to 2019, the smallest gain of any HCAHPS domain (Beckett et al., Medical Care 2024). That study does not establish why the domain changed less than others. ClinicalSim has not been studied against HCAHPS outcomes.",
      },
      {
        question: "Will this predict our HCAHPS scores?",
        answer:
          "No. ClinicalSim scores a conversation against published communication frameworks, not against HCAHPS items, and we claim no score-to-survey correlation.",
      },
      {
        question: "Does any patient data enter the platform?",
        answer:
          "Every patient in a ClinicalSim case is synthetic and written from clinical literature rather than a patient record. The product still handles learner recordings, transcripts, account data, and institutional data. Full detail is on our trust and data handling page.",
      },
    ],

    relevantSolutionSlugs: ["patient-experience"],

    glossarySlugs: [
      "hcahps",
      "aidet",
      "bedside-manner",
      "rapport",
      "teach-back-method",
      "motivational-interviewing",
    ],
    ctaHeadline: "Start with one team and one service standard",
    ctaDescription:
      "Bring the standard you already teach. We will map what a spoken encounter can score and define the reporting rules before the pilot begins.",

    relatedPostSlugs: [
      "why-communication-training-matters",
      "building-rapport-clinical-encounter",
    ],
  },
]

export function getAllAudiences(): Audience[] {
  return audiences
}

export function getAudiencesByMarket(market: Market): Audience[] {
  return audiences.filter((audience) => audience.market === market)
}

export function getAudienceBySlug(slug: string): Audience | undefined {
  return audiences.find((a) => a.slug === slug)
}
