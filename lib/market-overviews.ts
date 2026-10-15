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
  roles: MarketLink[]
}

// Product and reporting descriptions come from /evaluation, /trust,
// /help/roles-and-permissions, and the linked solution and audience pages.
// These overviews introduce those programs without adding outcome claims.
export const healthSystemsOverview: MarketOverviewContent = {
  slug: "health-systems",
  title: "Health systems",
  headline: "Practice the conversations your teams have with patients and each other",
  description:
    "Clinicians and staff practice spoken conversations with AI patients and get feedback against a published framework or your institution's own standard. Each person sees what they did well and what to practice next.",
  metaDescription:
    "Spoken communication practice for health system teams: patient experience, consent and disclosure, and team communication, with participant feedback and agreed reporting.",
  participants:
    "Nurses, clinicians, patient facing staff, and managers, selected for the conversation your team wants to practice.",
  programsHeading: "Choose a communication priority",
  programs: [
    {
      title: "Patient experience",
      description:
        "Practice listening, explaining care, checking understanding, and responding to concerns against the service standard you already teach.",
      icon: "chat-square-heart",
      links: [
        { label: "Patient experience program", href: "/solutions/patient-experience" },
      ],
    },
    {
      title: "Consent and disclosure",
      description:
        "Clinicians rehearse consent discussions and explaining a medical error before leading those conversations with a patient or family.",
      icon: "chat-exclamation",
      links: [
        { label: "Informed consent", href: "/solutions/informed-consent" },
        { label: "Error disclosure", href: "/solutions/error-disclosure" },
      ],
    },
    {
      title: "Team communication",
      description:
        "Practice debriefing after a clinical event or simulation, and feedback conversations between managers and new nurses.",
      icon: "people-connected",
      links: [
        { label: "Debriefing", href: "/solutions/debriefing" },
        { label: "Manager and new nurse conversations", href: "/solutions/workforce-retention" },
        { label: "Nursing turnover brief", href: "/resources/nursing-turnover-brief" },
      ],
    },
  ],
  participantFeedback:
    "Each participant gets a report that shows strengths and next practice steps, with their own words behind each score. They can review the feedback and repeat the conversation.",
  leaderReporting:
    "Leaders can review completion and practice patterns across a cohort or unit. Decide whether you need completion records, agreed coaching access, or anonymous unit results before anyone starts.",
  startingPoint:
    "Start with one team and one communication priority. We'll agree on the conversation, scoring standard, and reporting rules before staff take part.",
  institutionProvides:
    "A training lead, the participating group, and the policy or service standard you want to practice. Your team sets who can see results and how you plan to use them.",
  clinicalSimProvides:
    "We'll work with you to choose the cases and map what a spoken conversation can score, then agree on participant feedback and the reporting your team needs.",
  roles: [
    { label: "Quality and patient experience leaders", href: "/audiences/quality-and-patient-experience" },
    { label: "Risk and patient safety leaders", href: "/audiences/risk-and-patient-safety" },
    { label: "Nursing leadership", href: "/audiences/nursing-leadership" },
  ],
}

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
  roles: [
    { label: "Program directors", href: "/audiences/program-directors" },
    { label: "DIOs and GME leaders", href: "/audiences/dios-gme-leadership" },
    { label: "Medical school leaders", href: "/audiences/medical-school-leadership" },
    { label: "Simulation center directors", href: "/audiences/simulation-center-directors" },
    { label: "Faculty and clinician educators", href: "/audiences/faculty-clinician-educators" },
  ],
}
