/**
 * Content for /health-systems (ENG-329), rebuilt from
 * aeo-page-brief-health-systems-v2-2026-11-06.md.
 *
 * Every string here is plain text that renders on the page. The page composes these in brief
 * order: hero, risk, conversations, scored, works with, leaders, union and privacy, rollout,
 * FAQ. The sections that fit the shared ContentSection shape live in `healthSystemsSections`;
 * the conversation grid and the leader proof block need per-item links and the cohort summary,
 * so they have their own shapes below.
 *
 * Claims guardrails (brief section 8): the health system partner stays unnamed, the CRICO 40%
 * figure is the only outside statistic, and unit and role views are labelled as coming. Catalog
 * cases have no per-case URLs, so they print as plain text with one catalog link.
 */
import type { ContentSection, ListSection, ProseSection } from "@/lib/content-sections"
import { headingId, type HowToStepInput } from "@/lib/howto-schema"
import type { Citation } from "@/lib/types"

export const HEALTH_SYSTEMS_URL = "https://clinicalsim.ai/health-systems"

export const healthSystemsPage = {
  /** Rendered through the root template, so the <title> ends in " | ClinicalSim.ai" once. */
  title: "Health system clinical communication training",
  h1: "Clinical communication training for health systems",
  eyebrow: "Health systems",
  description:
    "Give every clinician repeated spoken practice for goals of care, error disclosure, de-escalation, and family conversations, scored against your own standards, with feedback each clinician can read in their own words and transcript evidence leaders can review.",
  subhead:
    "Nurses, physicians, and staff practice the highest-stakes conversations out loud with AI patients and families, as often as they need. ClinicalSim scores each one against your standard, gives each clinician feedback quoted from their own words, and shows leaders the evidence behind every score.",
  breadcrumbName: "Health systems",
} as const

export const healthSystemsCta = {
  leaderView: "See what a leader sees",
  closingHeading: "Which conversation would you want every clinician to practice first?",
  closingBody:
    "We'll walk through a practice conversation, its feedback, and the cohort view leaders get, then talk about where your teams would start.",
} as const

const CRICO_PRESS_RELEASE =
  "https://www.rmf.harvard.edu/News-and-Blog/Press-Releases-Home/Press-Releases/2025/November/2025BenchmarkingReport10yearlookbackComm"

/** Shown in the References block and as `citation` on the WebPage node. */
export const healthSystemsCitations: Citation[] = [
  {
    authors: "Candello",
    title: "New Candello report reveals communication failures between providers and patients are rising [press release]",
    source: "CRICO; November 17, 2025",
    year: "2025",
    url: CRICO_PRESS_RELEASE,
  },
]

export const riskSection: ProseSection = {
  type: "prose",
  id: "communication-risk",
  heading: "The riskiest conversations get the least practice",
  paragraphs: [
    "Communication-related factors played a part in 40% of asserted malpractice cases from 2014 to 2024, according to Candello's 2025 Benchmarking Report, Malpractice Risks from Communication Failures (CRICO, November 2025).",
    "Health systems pay for workshops and licensed communication programs, but staff rarely get to rehearse a goals of care talk, an error disclosure, or a family that's losing patience before they face the real one. The workshop ends, and without repetition the skill fades.",
  ],
  links: [
    { label: "Candello's 2025 benchmarking report on communication failures (CRICO)", href: CRICO_PRESS_RELEASE },
    { label: "What the evidence says about communication training", href: "/insights/why-communication-training-matters" },
    { label: "The impact of communication on hospital economics", href: "/insights/communication-and-hospital-economics" },
  ],
}

export interface HealthSystemConversation {
  name: string
  /** The published framework or institution standard the conversation is scored against. */
  framework: string
  /** Catalog case titles, printed as plain text. Empty when no public case exists yet. */
  cases: string[]
  link?: { label: string; href: string }
}

export interface HealthSystemConversationGroup {
  /** Anchor id. The homepage links to #consent-and-disclosure and #team-communication. */
  id: string
  heading: string
  conversations: HealthSystemConversation[]
}

export const conversationsSection = {
  id: "conversations-to-practice",
  heading: "Conversations your teams can practice",
  intro:
    "Each conversation below is scored against a published framework or your own standard. The case titles come from the public catalog.",
  catalog: { href: "https://platform.clinicalsim.ai/catalog", label: "Browse the full catalog" },
} as const

export const healthSystemsConversationGroups: HealthSystemConversationGroup[] = [
  {
    id: "patient-and-family-conversations",
    heading: "Patient and family conversations",
    conversations: [
      {
        name: "Goals of care and family meetings",
        framework: "Serious Illness Conversation Guide or REMAP, with NURSE responses reported",
        cases: [
          "Goals of Care Discussion in Progressive Respiratory Failure",
          "Pediatric Polytrauma: Urgent Family Meeting: PEM",
        ],
        link: { label: "Read a goals of care example report", href: "/examples/goals-of-care-medically-complex-child" },
      },
      {
        name: "De-escalation with patients and families",
        framework: "Your system's de-escalation standard",
        cases: [
          "\"We are taking him home tonight.\"",
          "Parent Requesting Discharge Despite Ongoing PICU Monitoring Needs",
        ],
      },
      {
        name: "Discharge and teach-back",
        framework: "Ask, tell, ask and teach back",
        cases: ["Limited English Proficiency Discharge Counseling After PICU Asthma Admission"],
        link: { label: "Discharge and patient understanding", href: "/solutions/patient-understanding" },
      },
      {
        name: "Patient experience service standards",
        framework: "Your service standard",
        cases: ["48 Hours in the Hallway"],
        link: { label: "Patient experience program", href: "/solutions/patient-experience" },
      },
    ],
  },
  {
    id: "consent-and-disclosure",
    heading: "Consent and disclosure",
    conversations: [
      {
        name: "Medical error disclosure",
        framework: "AHRQ CANDOR or your disclosure policy",
        cases: [
          "Disclosing a Chemotherapy Dosing Error Resulting in Patient Harm",
          "Disclosure of Delayed Antibiotics in Pediatric Septic Shock",
        ],
        link: { label: "Error disclosure practice", href: "/solutions/error-disclosure" },
      },
      {
        name: "Informed consent",
        framework: "AMA Code of Medical Ethics consent elements or your policy",
        cases: ["Informed Consent for Laparoscopic Cholecystectomy"],
        link: { label: "Informed consent practice", href: "/solutions/informed-consent" },
      },
    ],
  },
  {
    id: "team-communication",
    heading: "Team communication",
    conversations: [
      {
        name: "Handoffs and escalation",
        framework: "I-PASS or SBAR",
        cases: [
          "ICU Transfer Handoff for Rapidly Deteriorating Septic Shock (Adult)",
          "Two Hours After the Biopsy",
        ],
        link: { label: "Handoff and escalation practice", href: "/solutions/handoffs-and-escalation" },
      },
      {
        name: "Interprofessional conflict",
        framework: "Interprofessional Collaborator Assessment Rubric",
        cases: ["Conflict Between Admitting Medicine and Surgery Teams Over Operative Urgency"],
      },
      {
        name: "Manager and new nurse conversations",
        framework: "R2C2 or your leadership model",
        cases: [],
        link: { label: "Retention conversations for managers and new nurses", href: "/solutions/workforce-retention" },
      },
    ],
  },
]

export const scoredSection: ListSection = {
  type: "list",
  id: "scored-against-your-standard",
  heading: "Scored against your standard",
  intro:
    "Each clinician sees what they did well and what to practice next, then can repeat the case with that feedback in hand.",
  ordered: false,
  items: [
    "Bring your policy, service standard, or licensed model, and ClinicalSim scores each conversation against it step by step.",
    "Every score quotes the clinician's words from the transcript, or notes that the step was missing.",
    "Published frameworks are the floor, and your standard gets its own score.",
  ],
  links: [
    { label: "How scoring works, from transcript to evidence", href: "/methodology" },
    { label: "The published frameworks behind each case", href: "/frameworks" },
  ],
}

export const worksWithSection: ProseSection = {
  type: "prose",
  id: "works-with-your-programs",
  heading: "How ClinicalSim works with the programs you already run",
  paragraphs: [
    "De-escalation programs, communication workshops, and simulation centers teach the model, and that's where staff learn it, with a facilitator and their colleagues. ClinicalSim gives staff repetitions between those sessions, scored against the same model, and gives leaders a record of that practice. It extends your simulation program and doesn't replace it.",
  ],
}

export const leadersSection = {
  id: "what-leaders-can-track",
  heading: "What leaders can track",
  intro:
    "Each participant sees their own feedback first: strengths, next steps, and the transcript lines behind every score. Leaders then see the patterns across the group.",
  live: [
    "Completion and practice patterns across a cohort or unit",
    "Framework scores with the transcript evidence behind them",
    "Access levels chosen before launch",
  ],
  coming: ["Views by unit and role"],
  proofHeading: "From a partner health system's cohort report",
  /** Same framing /evidence uses after COHORT_REPORT_SUMMARY. */
  proofNote:
    "It shows the full element table, the quotes behind the finding, and the limits of a retrospective analysis.",
} as const

export const unionPrivacySection: ListSection = {
  type: "list",
  id: "union-and-privacy",
  heading: "Built for union and privacy requirements",
  intro:
    "Your system sets these rules before anyone practices, and labor agreements govern what leadership can see.",
  ordered: false,
  items: [
    "Reporting can be anonymous and unit-only, so leaders see a unit's results without a name attached.",
    "Practice is simulated. ClinicalSim does not record or monitor real patient encounters, and every patient in a case is synthetic, so there is no PHI in the cases themselves.",
    "Results are formative. They must not be used for employment decisions, discipline, credentialing, or privileging.",
  ],
  links: [{ label: "How voice data, transcripts, and access are handled", href: "/trust" }],
}

export const rolloutHeading = "How a system rollout starts"

/** Visible as a numbered list and emitted as HowTo. Each name and text renders verbatim. */
export const healthSystemsRolloutSteps: HowToStepInput[] = [
  {
    name: "Pick one team and one priority conversation.",
    text: "A single unit or service line and a single conversation keep the first round small enough to review closely.",
  },
  {
    name: "Bring the policy or standard you want practiced.",
    text: "Your disclosure policy, service standard, or licensed communication model becomes the scoring standard.",
  },
  {
    name: "Agree on cases, what speech can be scored, and reporting rules.",
    text: "We choose the cases together, map which parts of your standard a spoken conversation can show, and settle who sees results.",
  },
  {
    name: "Launch to the first cohort.",
    text: "Staff need a browser and a microphone. Practice is audio only and in English for now.",
  },
  {
    name: "Review the cohort report and choose the next team or conversation.",
    text: "Your training lead reads the cohort results with us and decides where practice goes next.",
  },
]

export const rolloutSection: ListSection = {
  type: "list",
  id: headingId(rolloutHeading),
  heading: rolloutHeading,
  ordered: true,
  items: healthSystemsRolloutSteps.map((step) => ({
    id: headingId(step.name),
    title: step.name,
    text: step.text,
  })),
}

/** The ContentSection-shaped H2s on the page, for the shared section guard tests. */
export const healthSystemsSections: ContentSection[] = [
  riskSection,
  scoredSection,
  worksWithSection,
  unionPrivacySection,
  rolloutSection,
]

export interface HealthSystemsFaq {
  question: string
  /** Plain text. Also the FAQPage answer, word for word. */
  answer: string
  link?: { label: string; href: string }
}

export const faqHeading = "Health system communication training questions"

export const healthSystemsFaqs: HealthSystemsFaq[] = [
  {
    question: "How do health systems train clinicians for high-stakes conversations at scale?",
    answer:
      "They add practice that doesn't depend on a classroom schedule. Nurses, physicians, and staff hold spoken conversations with AI patients and families from a browser, as often as they need, and each one is scored against the system's own standard. Practice stays consistent across hospitals, while each clinician gets feedback on their own words and another attempt.",
  },
  {
    question: "Can we use our own communication or disclosure policy?",
    answer:
      "Yes. Send the disclosure policy, service standard, or licensed communication model your teams already learn, and each case is scored against it step by step. Published frameworks such as AHRQ CANDOR stay available as a floor, and your standard gets its own score. Every score quotes the clinician's words from the transcript, or notes that a step was missing.",
  },
  {
    question: "Which roles can practice?",
    answer:
      "Nurses, physicians, advanced practice providers, and other patient-facing staff can all practice, and so can managers who need to rehearse conversations with their own teams. Cases are written for the role, from a bedside nurse calling the resident about a patient who is getting worse to a physician leading a family meeting. Practice runs in a browser with a microphone, so staff on any shift can take part.",
  },
  {
    question: "Does it replace our de-escalation or communication workshops?",
    answer:
      "No. Workshops and licensed curricula teach the model, and staff learn it there with a facilitator and colleagues in the room. ClinicalSim adds the repetitions between those sessions, so a clinician can rehearse a goals of care talk or a family insisting on discharge, read the feedback, and try again. Leaders get a record of that practice.",
  },
  {
    question: "Will practice change our HCAHPS scores or claims?",
    answer:
      "We don't predict outcomes, including patient experience scores, safety events, or claims. Comparing practice records with your own HCAHPS or claims data takes a separate study plan that both teams agree on before any data is collected. What the platform shows is how each practice conversation went against your standard, with the transcript behind every score.",
  },
  {
    question: "Can results stay anonymous for unionized staff?",
    answer:
      "Yes. Your system can use anonymous participant IDs and receive results only at the unit or cohort level, so no leader sees a named score. Labor agreements and your training policy decide who sees what, and those rules are set before anyone practices. Results are formative and must not be used for employment decisions, discipline, credentialing, or privileging.",
  },
  {
    question: "Does scoring analyze tone of voice?",
    answer:
      "No. Clinicians speak out loud, and scoring reads the transcript of what they said rather than the sound of their voice. Each score quotes the clinician's own words as evidence, or notes that a step was missing, so a reviewer can check any rating against the conversation it came from.",
  },
  {
    question: "What does IT need to do before launch?",
    answer:
      "Allow the voice service and run the connection test. Staff practice in a web browser with a microphone on a phone, tablet, or desktop, and the connection test shows whether your network blocks the voice service before the first cohort starts. Practice is audio only and supports English for now, so choose a first team that practices in English.",
    link: { label: "Rollout and buying details", href: "/evaluation" },
  },
  {
    question: "How is it priced?",
    answer:
      "No price is published. We scope each engagement with the health system and quote it directly. An engagement usually starts with one team and one priority conversation. Tell us which conversation matters most and how many people you want to reach, and we'll walk through what a first round would include for your teams.",
    link: { label: "Discuss your communication priorities", href: "/contact" },
  },
]

/**
 * Organizations whose frameworks the conversation grid names. ClaimBoundary renders the
 * non-endorsement line for them (see nonEndorsementLine in lib/claim-discipline.ts).
 */
export const healthSystemsNonEndorsementOrgs = [
  "AHRQ",
  "Ariadne Labs",
  "VitalTalk",
  "the American Medical Association",
  "the I-PASS Study Group",
]
