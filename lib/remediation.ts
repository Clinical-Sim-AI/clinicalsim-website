import type { StatItem, EvidenceItem, FaqItem } from "@/lib/types"

// ---------------------------------------------------------------------------
// Remediation-specific interfaces
// ---------------------------------------------------------------------------

export interface RemediationPainPoint {
  headline: string
  description: string
  stat: string
  statLabel: string
  source: string
  icon: string
}

export interface RemediationFeature {
  title: string
  description: string
  iconName: string
}

export interface RemediationPersona {
  role: string
  headline: string
  painPoint: string
  whatTheyGet: string
  iconName: string
  colorVariant: "accent" | "navy" | "blue" | "light-blue"
}

export interface TeamCredential {
  area: string
  credentials: string[]
  colorVariant: "accent" | "navy" | "blue" | "light-blue"
}

export interface PricingComparison {
  method: string
  costRange: string
  scalability: string
  availability: string
  documentation: string
  highlight?: boolean
}

export interface RemediationPageData {
  // Hero
  heroH1: string
  heroSubtitle: string
  heroStats: StatItem[]

  // The Problem
  painPoints: RemediationPainPoint[]

  // How It Works
  features: RemediationFeature[]

  // Who It's For
  personas: RemediationPersona[]

  // Team Credentials
  teamCredentials: TeamCredential[]

  // Evidence
  evidence: EvidenceItem
  outcomeStats: StatItem[]

  // Pricing Frame
  pricingComparisons: PricingComparison[]

  // FAQs
  faqs: FaqItem[]

  // CTA
  ctaHeadline: string
  ctaDescription: string

  // Meta
  lastUpdated: string
}

// ---------------------------------------------------------------------------
// Page data
// ---------------------------------------------------------------------------

export const remediationPageData: RemediationPageData = {
  // ---------------------------------------------------------------------------
  // Hero
  // ---------------------------------------------------------------------------
  heroH1: "The communication remediation toolkit program directors have been asking for",
  heroSubtitle:
    "Give a learner structured voice-based practice between coaching sessions. Each report maps the encounter to the relevant ACGME Milestones and cites the transcript evidence your CCC can review.",
  heroStats: [
    {
      value: "93%",
      label:
        "of 267 surveyed family medicine program directors reported at least one resident in remediation during the prior three years",
      source: "CERA Survey, 267 Family Medicine PDs",
      variant: "accent",
    },
    {
      value: "91%",
      label:
        "of residents undergoing remediation were successful within 12 months",
      source: "Frazier et al., Family Medicine, 2021",
      variant: "navy",
    },
    {
      value: "50%",
      label:
        "of program directors want an accessible remediation toolkit",
      source: "CERA Survey",
      variant: "blue",
    },
    {
      value: "29.6",
      label: "mean specialist contact hours in one clinical reasoning remediation program",
      source: "Guerrasio and Aagaard, J Gen Intern Med, 2014",
      variant: "accent",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 2: The Problem
  // ---------------------------------------------------------------------------
  painPoints: [
    {
      headline: "Faculty time",
      description:
        "One published clinical reasoning remediation program required a mean of 29.6 specialist contact hours. That figure excluded program director, CCC, coordinator, and legal time, so it should not be treated as a general range for every remediation case.",
      stat: "29.6",
      statLabel: "mean specialist contact hours in one clinical reasoning program",
      source: "Guerrasio and Aagaard, J Gen Intern Med, 2014",
      icon: "Clock",
    },
    {
      headline: "SP bottleneck",
      description:
        "Each standardized patient encounter requires a trained actor, space, faculty support, and scheduling. Struggling learners need repeated practice with feedback, which is hard to provide through live simulation alone.",
      stat: "On demand",
      statLabel: "practice between scheduled SP encounters",
      source: "ClinicalSim platform availability",
      icon: "Users",
    },
    {
      headline: "Documentation gap",
      description:
        "Faculty observations can vary by observer and may be sparse across a remediation period. ClinicalSim adds a consistent record that a faculty member or CCC can inspect alongside those observations.",
      stat: "Transcript",
      statLabel: "evidence behind every score",
      source: "ClinicalSim reporting method",
      icon: "FileWarning",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 3: How It Works
  // ---------------------------------------------------------------------------
  features: [
    {
      title: "On-demand AI patient encounters",
      description:
        "Structured practice scenarios purpose-built for communication remediation, available 24/7 with no scheduling required.",
      iconName: "Mic",
    },
    {
      title: "Milestone-aligned feedback",
      description:
        "Feedback mapped to the relevant ICS subcompetencies of ACGME Milestones 2.0, with transcript evidence a learner and faculty member can review.",
      iconName: "BarChart3",
    },
    {
      title: "Longitudinal progress tracking",
      description:
        "Track performance across the full remediation period, documenting improvement over time rather than relying on single snapshots.",
      iconName: "TrendingUp",
    },
    {
      title: "Evidence for CCC review",
      description:
        "Every session generates a structured, milestone-aligned report your Clinical Competency Committee can review alongside other evidence.",
      iconName: "FileText",
    },
    {
      title: "Faculty dashboard",
      description:
        "Monitor learner progress and session data without attending every practice encounter, so faculty time stays focused on coaching and assessment.",
      iconName: "LayoutDashboard",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 4: Who It's For
  // ---------------------------------------------------------------------------
  personas: [
    {
      role: "Program directors",
      headline: "More practice between coaching sessions",
      painPoint:
        "Programs need a repeatable remediation structure and more practice than faculty calendars can provide.",
      whatTheyGet:
        "A structured remediation pathway with milestone-aligned practice and longitudinal evidence for CCC review between faculty coaching sessions.",
      iconName: "GraduationCap",
      colorVariant: "navy",
    },
    {
      role: "DIOs and GMECs",
      headline: "Shared remediation standards across programs",
      painPoint:
        "Programs may use different approaches to communication remediation and document different kinds of evidence.",
      whatTheyGet:
        "Shared case standards and a central view of practice reports, while each program director and CCC keeps authority over the plan.",
      iconName: "Building2",
      colorVariant: "accent",
    },
    {
      role: "Simulation centers",
      headline: "Extend your SP program with repeatable practice",
      painPoint:
        "Live encounters require actor time, faculty support, space, and scheduling, which limits the repetitions available for individual remediation.",
      whatTheyGet:
        "AI patient practice that complements scheduled SP encounters without requiring another actor or room for each attempt.",
      iconName: "Monitor",
      colorVariant: "blue",
    },
    {
      role: "CCCs",
      headline: "Milestone-aligned evidence from every practice session",
      painPoint:
        "Limited communication evidence across a remediation period.",
      whatTheyGet:
        "Structured, longitudinal data aligned to ACGME Milestones 2.0, giving your committee another source of evidence to review.",
      iconName: "ClipboardCheck",
      colorVariant: "light-blue",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 5: Team Credentials
  // ---------------------------------------------------------------------------
  teamCredentials: [
    {
      area: "Simulation medicine",
      credentials: [
        "Director of Simulation, Advocate Health System",
        "Director of Simulation, University of Chicago",
      ],
      colorVariant: "navy",
    },
    {
      area: "Clinical communication research",
      credentials: [
        "Published communication skills researchers",
        "Structured evaluation using published frameworks",
      ],
      colorVariant: "accent",
    },
    {
      area: "Graduate medical education",
      credentials: [
        "ACGME milestone alignment",
        "CCC documentation expertise",
      ],
      colorVariant: "blue",
    },
    {
      area: "Healthcare technology",
      credentials: [
        "Synthetic cases written without patient records",
        "Voice-based AI simulation",
      ],
      colorVariant: "light-blue",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 6: Evidence
  // ---------------------------------------------------------------------------
  evidence: {
    studyTitle:
      "Resident Remediation in Family Medicine Residency Programs: A CERA Survey of Program Directors",
    journal: "Family Medicine",
    year: "2021",
    summary:
      "Among 267 family medicine program directors, 93% reported at least one resident in remediation during the prior three years, 91% reported successful remediation within 12 months, and 50% selected an accessible remediation toolkit as the most important tool for improving the process.",
    link: "https://doi.org/10.22454/FamMed.2021.546572",
    badges: ["Peer reviewed", "CERA survey"],
  },

  outcomeStats: [
    {
      value: "93%",
      label:
        "of 267 surveyed family medicine program directors reported at least one resident in remediation during the prior three years",
      source: "CERA Survey, 267 Family Medicine PDs",
      variant: "accent",
    },
    {
      value: "50%",
      label:
        "of program directors want an accessible remediation toolkit",
      source: "CERA Survey",
      variant: "blue",
    },
    {
      value: "29.6",
      label: "mean specialist contact hours in one clinical reasoning remediation program",
      source: "Guerrasio and Aagaard, J Gen Intern Med, 2014",
      variant: "navy",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 7: Pricing Frame
  // ---------------------------------------------------------------------------
  pricingComparisons: [
    {
      method: "PACE program",
      costRange: "Published fees vary by service",
      scalability: "One learner at a time",
      availability: "Scheduled externally",
      documentation: "External report",
    },
    {
      method: "Faculty 1:1 coaching",
      costRange: "Varies by faculty role and time",
      scalability: "One learner per faculty member",
      availability: "Subject to faculty availability",
      documentation: "Varies by program",
    },
    {
      method: "SP encounters",
      costRange: "Actor, space, and faculty costs vary",
      scalability: "Scheduled sessions",
      availability: "Scheduling required",
      documentation: "Varies by program",
    },
    {
      method: "ClinicalSim",
      costRange: "Institutional license",
      scalability: "Repeatable sessions for assigned learners",
      availability: "On-demand 24/7",
      documentation: "Milestone-aligned reports for CCC review",
      highlight: true,
    },
  ],

  // ---------------------------------------------------------------------------
  // FAQs
  // ---------------------------------------------------------------------------
  faqs: [
    {
      question: "What is communication remediation in GME?",
      answer:
        "Communication remediation in graduate medical education (GME) is a structured process for learners who have been identified as struggling with clinical communication skills, particularly interpersonal and communication skills (ICS) as defined by the ACGME. In a CERA survey of 267 family medicine program directors, 93% reported at least one resident in remediation during the prior three years, 91% reported successful remediation within 12 months, and 50% selected an accessible remediation toolkit as the most important tool for improving the process (Frazier et al., Family Medicine, 2021).",
    },
    {
      question:
        "How does ClinicalSim map to ACGME milestones?",
      answer:
        "ClinicalSim generates feedback mapped to the Interpersonal and Communication Skills subcompetencies of ACGME Milestones 2.0. Each practice session produces structured evidence that program directors and CCCs can review alongside faculty observations. It does not replace faculty judgment or the committee's decision.",
    },
    {
      question:
        "What documentation does ClinicalSim generate for CCCs?",
      answer:
        "ClinicalSim generates a timestamped report from every practice session. Each report maps observed behavior to relevant ACGME Milestones 2.0 levels, cites the learner's words, and tracks performance across the remediation period. A CCC can review the report alongside faculty observation and the other evidence it already uses. ClinicalSim does not replace faculty judgment or the committee's decision.",
    },
    {
      question:
        "How does this compare to standardized patient encounters?",
      answer:
        "Standardized patient (SP) encounters remain important for high-stakes assessment, and each encounter requires actor time, space, faculty support, and scheduling. ClinicalSim adds on-demand practice between those encounters, with milestone-aligned feedback after every session. It extends an SP program by supplying repetition, and it does not replace live assessment.",
    },
    {
      question:
        "What is PACE and how does ClinicalSim compare?",
      answer:
        "PACE (Program for Accelerated Curriculum in Education) and similar external remediation programs provide intensive assessment or coaching for one learner at a time and issue an external report at the end. ClinicalSim provides structured, on-demand practice within the learner's home program and generates milestone-aligned documentation from every session. A program can use ClinicalSim on its own or between sessions with an external remediation service.",
    },
  ],

  // ---------------------------------------------------------------------------
  // CTA
  // ---------------------------------------------------------------------------
  ctaHeadline:
    "Start the next remediation plan with a repeatable structure",
  ctaDescription:
    "Give the learner more practice, keep faculty time for coaching, and bring the CCC evidence from each session.",

  // ---------------------------------------------------------------------------
  // Meta
  // ---------------------------------------------------------------------------
  lastUpdated: "2026-08-10",
}
