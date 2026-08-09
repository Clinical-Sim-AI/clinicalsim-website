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
  heroH1: "The remediation toolkit program directors have been asking for.",
  heroSubtitle:
    "AI clinical simulation for communication remediation, with structured practice mapped to ACGME Milestones 2.0 and documentation your CCC can use.",
  heroStats: [
    {
      value: "93%",
      label:
        "of residency programs have faced remediation in the past 3 years",
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
        "There is no standardized assessment framework for communication remediation. Faculty write subjective narrative evaluations that vary by observer, and 1 in 5 GME stakeholders report they don't know how to assess ICS milestones.",
      stat: "1 in 5",
      statLabel: "GME stakeholders don't know how to assess ICS milestones",
      source: "ACGME stakeholder survey data",
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
        "Real-time feedback mapped to the ICS subcompetencies of ACGME Milestones 2.0 (ICS-1, ICS-2, ICS-3), so learners know exactly where they stand.",
      iconName: "BarChart3",
    },
    {
      title: "Longitudinal progress tracking",
      description:
        "Track performance across the full remediation period, documenting improvement over time rather than relying on single snapshots.",
      iconName: "TrendingUp",
    },
    {
      title: "CCC-ready documentation",
      description:
        "Every session generates structured, milestone-aligned reports your Clinical Competency Committee can use directly.",
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
      role: "Program Directors",
      headline:
        "20 structured practice encounters before your first coaching session.",
      painPoint:
        "Programs need a repeatable remediation structure and more practice than faculty calendars can provide.",
      whatTheyGet:
        "A structured remediation pathway with milestone-aligned practice and longitudinal, CCC-ready documentation between faculty coaching sessions.",
      iconName: "GraduationCap",
      colorVariant: "navy",
    },
    {
      role: "DIOs & GMEC",
      headline:
        "Standardized remediation infrastructure across all programs.",
      painPoint:
        "No consistent approach to communication remediation across programs, and documentation gaps create legal vulnerability.",
      whatTheyGet:
        "Institution-wide remediation infrastructure with consistent assessment standards, defensible documentation, and centralized oversight.",
      iconName: "Building2",
      colorVariant: "accent",
    },
    {
      role: "Simulation Centers",
      headline:
        "Extend your SP program to unlimited practice volume.",
      painPoint:
        "Live encounters require actor time, faculty support, space, and scheduling, which limits the repetitions available for individual remediation.",
      whatTheyGet:
        "Unlimited AI-driven practice encounters that complement your existing SP program, extending your capacity without additional scheduling or staffing.",
      iconName: "Monitor",
      colorVariant: "blue",
    },
    {
      role: "CCCs",
      headline:
        "Milestone-aligned assessment data from every practice session.",
      painPoint:
        "Subjective faculty reports with no standardized ICS assessment data to inform promotion decisions.",
      whatTheyGet:
        "Structured, longitudinal data aligned to ACGME Milestones 2.0 from every remediation session, giving your committee another source of evidence for competency decisions.",
      iconName: "ClipboardCheck",
      colorVariant: "light-blue",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 5: Team Credentials
  // ---------------------------------------------------------------------------
  teamCredentials: [
    {
      area: "Simulation Medicine",
      credentials: [
        "Director of Simulation, Advocate Health System",
        "Director of Simulation, University of Chicago",
      ],
      colorVariant: "navy",
    },
    {
      area: "Clinical Communication Research",
      credentials: [
        "Published communication skills researchers",
        "Structured evaluation using published frameworks",
      ],
      colorVariant: "accent",
    },
    {
      area: "Graduate Medical Education",
      credentials: [
        "ACGME milestone alignment",
        "CCC documentation expertise",
      ],
      colorVariant: "blue",
    },
    {
      area: "Healthcare Technology",
      credentials: [
        "No real patient data, so no PHI exposure",
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
        "of residency programs have faced remediation in the past 3 years",
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
      method: "PACE Program",
      costRange: "Published fees vary by service",
      scalability: "One learner at a time",
      availability: "Scheduled externally",
      documentation: "External report",
    },
    {
      method: "Faculty 1:1 Coaching",
      costRange: "Varies by faculty role and time",
      scalability: "One learner per faculty member",
      availability: "Subject to faculty availability",
      documentation: "Subjective notes",
    },
    {
      method: "SP Encounters",
      costRange: "Actor, space, and faculty costs vary",
      scalability: "Scheduled sessions",
      availability: "Scheduling required",
      documentation: "Varies by program",
    },
    {
      method: "ClinicalSim",
      costRange: "Institutional license",
      scalability: "Unlimited sessions for all learners",
      availability: "On-demand 24/7",
      documentation: "Milestone-aligned CCC-ready reports",
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
        "ClinicalSim generates feedback and assessment data mapped directly to the Interpersonal and Communication Skills (ICS) subcompetencies of ACGME Milestones 2.0. This includes ICS-1 (patient- and family-centered communication), ICS-2 (interprofessional and team communication), and ICS-3 (communication within health systems). Each practice session produces structured data aligned to these milestone levels, so program directors and CCCs can track learner progress using the same framework they use for all other competency assessments. This replaces subjective narrative evaluations with consistent, longitudinal data.",
    },
    {
      question:
        "What documentation does ClinicalSim generate for CCCs?",
      answer:
        "ClinicalSim generates timestamped, milestone-aligned reports from every practice session. Each report maps learner performance to specific ACGME Milestones 2.0 levels, documents communication behaviors observed during the encounter, and tracks longitudinal progress across the remediation period. These reports are designed to be used directly by Clinical Competency Committees (CCCs) for promotion and remediation decisions, replacing subjective faculty observations with structured, reproducible assessment data. Currently, 1 in 5 GME stakeholders report not knowing how to assess ICS milestones (ACGME stakeholder survey data).",
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
    "Remediation is inevitable. Rebuilding the process every time isn't.",
  ctaDescription:
    "Give learners structured communication practice mapped to their milestones, with documentation their CCC can use.",

  // ---------------------------------------------------------------------------
  // Meta
  // ---------------------------------------------------------------------------
  lastUpdated: "2026-08-07",
}
