import type { BrandIconName } from "@/components/brand-icon"

interface MarketLink {
  label: string
  href: string
}

interface MarketProgram {
  title: string
  description: string
  icon: BrandIconName
  links: MarketLink[]
}

export interface MarketOverviewContent {
  slug: "health-systems" | "medical-education"
  title: string
  headline: string
  description: string
  metaDescription: string
  participants: string
  programsHeading: string
  programs: MarketProgram[]
  participantFeedback: string
  leaderReporting: string
  startingPoint: string
  institutionProvides: string
  clinicalSimProvides: string
  /** What happens after the first round (Walia & Miller Doc 7, section 12). */
  continuity?: { question: string; answer: string }[]
  continuityLink?: MarketLink
  roles: MarketLink[]
}

// Product and reporting descriptions come from the linked solution and audience pages.
// The overview introduces those programs without adding outcome claims. /health-systems
// no longer uses this shape; its content lives in lib/health-systems.ts.
export const medicalEducationOverview: MarketOverviewContent = {
  slug: "medical-education",
  title: "Medical education",
  headline: "Give learners another chance to practice before the next patient conversation",
  description:
    "Medical learners and faculty practice spoken conversations with AI patients and get feedback against the framework on each case. Faculty can read the participant's words behind each score and choose the next practice focus.",
  metaDescription:
    "Communication practice for residency, fellowship, medical school, faculty development, and remediation, with transcript-linked feedback that complements faculty observation.",
  participants:
    "Medical students, residents, fellows, and faculty, with cases chosen for their stage of training and the conversation they need to practice.",
  programsHeading: "Find the program that fits your learners",
  programs: [
    {
      title: "Residency and fellowship",
      description:
        "Build repeated communication practice into the curriculum and review progress across attempts between coaching sessions.",
      icon: "hat-graduation",
      links: [
        { label: "Residency and fellowship program", href: "/solutions/longitudinal-curriculum" },
      ],
    },
    {
      title: "Medical school",
      description:
        "Give students spoken practice before clerkships and OSCEs, with feedback they can inspect between standardized patient encounters.",
      icon: "student",
      links: [
        { label: "Undergraduate medical education", href: "/solutions/undergraduate-medical-education" },
        { label: "OSCE communication practice", href: "/solutions/osce-preparation" },
      ],
    },
    {
      title: "Faculty development",
      description:
        "Faculty rehearse corrective feedback and professionalism conversations before leading them with a learner or colleague.",
      icon: "book-opened",
      links: [
        { label: "Faculty development program", href: "/solutions/faculty-development" },
        { label: "Debriefing practice", href: "/solutions/debriefing" },
      ],
    },
    {
      title: "Communication remediation",
      description:
        "Choose focused cases for a learner's practice plan and review the transcript evidence alongside faculty observation. Faculty and the CCC keep authority over decisions.",
      icon: "ribbon-check",
      links: [
        { label: "Remediation program", href: "/solutions/remediation" },
        { label: "Evidence for CCC review", href: "/audiences/clinical-competency-committees" },
      ],
    },
  ],
  participantFeedback:
    "Learners see what they did well and what to practice next, with transcript evidence tied to the case framework. They can repeat the case and bring the report into a coaching conversation.",
  leaderReporting:
    "Faculty and program leaders can review participation, repeated practice, and transcript-linked feedback for the learners they oversee. Institution-defined roles control access, and the program decides how reports fit its other evidence.",
  startingPoint:
    "Start with one learner group and a conversation that fits its curriculum or practice plan. We'll agree on the case standard and faculty review before learners take part.",
  institutionProvides:
    "A program lead, the participating learners, and the conversation you want them to practice. Name the faculty who will review feedback and how practice fits your teaching or coaching plan.",
  clinicalSimProvides:
    "We'll work with you to choose cases and the scoring framework, then agree on learner feedback, assignments, and the program reporting your faculty needs.",
  // Engagement shape from ASSESSMENT_ENTRY in lib/positioning.ts. No durations or prices.
  continuity: [
    {
      question: "What happens when a new cohort begins?",
      answer:
        "A new cohort starts on the cases and standard the program already approved, so nothing has to be rebuilt. Faculty can compare the new group's first attempts with an earlier group's at the cohort level, without ranking anyone, and decide which cases to keep, swap, or add for the year.",
    },
    {
      question: "How does a program connect to a wider institutional engagement?",
      answer:
        "A program can start on its own with a communication assessment for one learner group. When other programs or the health system's own teams want the same kind of practice, a continuing engagement extends practice and review across more teams, and each program keeps its own cases, standard, and access rules.",
    },
  ],
  continuityLink: {
    label: "How ClinicalSim works, from the first case to the next round",
    href: "/clinical-communication-intelligence",
  },
  roles: [
    { label: "Program directors", href: "/audiences/program-directors" },
    { label: "DIOs and GME leaders", href: "/audiences/dios-gme-leadership" },
    { label: "Medical school leaders", href: "/audiences/medical-school-leadership" },
    { label: "Simulation center directors", href: "/audiences/simulation-center-directors" },
    { label: "Faculty and clinician educators", href: "/audiences/faculty-clinician-educators" },
  ],
}
