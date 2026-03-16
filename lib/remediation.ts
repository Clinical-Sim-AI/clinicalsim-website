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
  colorVariant: "warm" | "navy" | "blue" | "success"
}

export interface TeamCredential {
  area: string
  credentials: string[]
  colorVariant: "warm" | "navy" | "blue" | "success"
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
    "AI clinical simulation for communication remediation — structured practice with real-time feedback, mapped to ACGME ICS Milestones 2.0, generating documentation your CCC can use.",
  heroStats: [
    {
      value: "93%",
      label:
        "of residency programs have faced remediation in the past 3 years",
      source: "CERA Survey, 267 Family Medicine PDs",
      variant: "warm",
    },
    {
      value: "16",
      label:
        "published studies exist on communication-specific remediation",
      source: "Literature review",
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
      value: "29-45",
      label: "faculty hours consumed per remediation case",
      source: "University of Colorado; Penn EIRC",
      variant: "warm",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 2: The Problem
  // ---------------------------------------------------------------------------
  painPoints: [
    {
      headline: "Faculty Time",
      description:
        "Each remediation case consumes 29-45 faculty hours — time pulled from clinical revenue, teaching, and research. At $150-$300/hr in clinical revenue opportunity cost, a single case costs $5,000-$15,000 in faculty time alone.",
      stat: "29-45",
      statLabel: "faculty hours per remediation case",
      source: "University of Colorado; Penn EIRC",
      icon: "Clock",
    },
    {
      headline: "SP Bottleneck",
      description:
        "Standardized patients cost $200-$500 per encounter and take weeks to schedule. Struggling learners need volume — repeated practice with feedback — but the SP model can't deliver it at the frequency remediation demands.",
      stat: "$200-$500",
      statLabel: "per SP encounter, with weeks to schedule",
      source: "Simulation center industry benchmarks",
      icon: "Users",
    },
    {
      headline: "Documentation Gap",
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
      title: "On-Demand AI Patient Encounters",
      description:
        "Structured practice scenarios purpose-built for communication remediation — available 24/7, no scheduling required.",
      iconName: "Mic",
    },
    {
      title: "Milestone-Aligned Feedback",
      description:
        "Real-time feedback mapped to ICS Milestones 2.0 (ICS-1, ICS-2, ICS-3), so learners know exactly where they stand.",
      iconName: "BarChart3",
    },
    {
      title: "Longitudinal Progress Tracking",
      description:
        "Track performance across the full remediation period, documenting improvement over time rather than relying on single snapshots.",
      iconName: "TrendingUp",
    },
    {
      title: "CCC-Ready Documentation",
      description:
        "Every session generates structured, milestone-aligned reports your Clinical Competency Committee can use directly.",
      iconName: "FileText",
    },
    {
      title: "Faculty Dashboard",
      description:
        "Monitor learner progress and session data without scheduling overhead — stay informed without sacrificing your clinical time.",
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
        "29-45 faculty hours per case with no standardized tools for communication-specific remediation.",
      whatTheyGet:
        "A structured remediation pathway with milestone-aligned practice, longitudinal tracking, and CCC-ready documentation — without consuming your faculty's clinical time.",
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
      colorVariant: "warm",
    },
    {
      role: "Simulation Centers",
      headline:
        "Extend your SP program to unlimited practice volume.",
      painPoint:
        "SPs cost $50-$500 per encounter and can't scale for individual remediation needs that require high-volume repetition.",
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
        "Structured, longitudinal data aligned to ICS Milestones 2.0 from every remediation session, giving your committee objective evidence for competency decisions.",
      iconName: "ClipboardCheck",
      colorVariant: "success",
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
        "Blinded evaluation using validated frameworks",
      ],
      colorVariant: "warm",
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
        "HIPAA-compliant platform architecture",
        "Voice-based AI simulation",
      ],
      colorVariant: "success",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 6: Evidence
  // ---------------------------------------------------------------------------
  evidence: {
    studyTitle:
      "AI-Powered Simulation for Pediatric Critical Care Communication Training",
    journal: "Academic Pediatrics",
    year: "2024",
    summary:
      "Pilot study with PICU fellows demonstrated measurable improvements in clinical communication skills through AI-driven simulation. Performance was assessed via blinded evaluation using validated communication frameworks, showing that structured AI practice can produce objective, measurable gains in communication competency.",
    badges: ["Pilot Study", "Blinded Evaluation"],
  },

  outcomeStats: [
    {
      value: "93%",
      label:
        "of residency programs have faced remediation in the past 3 years",
      source: "CERA Survey, 267 Family Medicine PDs",
      variant: "warm",
    },
    {
      value: "50%",
      label:
        "of program directors want an accessible remediation toolkit",
      source: "CERA Survey",
      variant: "blue",
    },
    {
      value: "29-45",
      label: "faculty hours consumed per remediation case",
      source: "University of Colorado; Penn EIRC",
      variant: "navy",
    },
  ],

  // ---------------------------------------------------------------------------
  // Section 7: Pricing Frame
  // ---------------------------------------------------------------------------
  pricingComparisons: [
    {
      method: "PACE Program",
      costRange: "$15,000-$19,000 per learner",
      scalability: "One learner at a time",
      availability: "4-8 week wait",
      documentation: "External report",
    },
    {
      method: "Faculty 1:1 Coaching",
      costRange: "$5,000-$15,000 in opportunity cost",
      scalability: "One learner per faculty member",
      availability: "Subject to faculty availability",
      documentation: "Subjective notes",
    },
    {
      method: "SP Encounters",
      costRange: "$200-$500 per session",
      scalability: "1-2 sessions typical",
      availability: "Weeks to schedule",
      documentation: "Varies by program",
    },
    {
      method: "ClinicalSim",
      costRange: "Fraction of alternatives",
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
        "Communication remediation in graduate medical education (GME) is a structured process for learners who have been identified as struggling with clinical communication skills, particularly interpersonal and communication skills (ICS) as defined by the ACGME. 93% of residency programs have encountered remediation in the past 3 years (CERA Survey, 267 Family Medicine PDs). ICS and professionalism are consistently among the hardest competencies to remediate because they require repeated practice with feedback — not just didactic instruction. Despite the prevalence of the problem, only 16 published studies address communication-specific remediation, and 50% of program directors report wanting an accessible remediation toolkit.",
    },
    {
      question:
        "How does ClinicalSim map to ACGME milestones?",
      answer:
        "ClinicalSim generates feedback and assessment data mapped directly to ACGME Interpersonal and Communication Skills (ICS) Milestones 2.0. This includes ICS-1 (patient- and family-centered communication), ICS-2 (interprofessional and team communication), and ICS-3 (communication within health systems). Each practice session produces structured data aligned to these milestone levels, so program directors and CCCs can track learner progress using the same framework they use for all other competency assessments. This replaces subjective narrative evaluations with consistent, longitudinal data.",
    },
    {
      question:
        "What documentation does ClinicalSim generate for CCCs?",
      answer:
        "ClinicalSim generates timestamped, milestone-aligned reports from every practice session. Each report maps learner performance to specific ICS Milestones 2.0 levels, documents communication behaviors observed during the encounter, and tracks longitudinal progress across the remediation period. These reports are designed to be used directly by Clinical Competency Committees (CCCs) for promotion and remediation decisions, replacing subjective faculty observations with structured, reproducible assessment data. Currently, 1 in 5 GME stakeholders report not knowing how to assess ICS milestones (ACGME stakeholder survey data).",
    },
    {
      question:
        "How does this compare to standardized patient encounters?",
      answer:
        "Standardized patient (SP) encounters cost $200-$500 per session and typically take weeks to schedule. For remediation, where struggling learners need high-volume repetitive practice with feedback, the SP model creates a bottleneck: programs can usually provide only 1-2 SP encounters during a remediation period. ClinicalSim provides unlimited on-demand practice sessions at a fraction of the cost, available 24/7, with milestone-aligned feedback after every encounter. This isn't a replacement for SPs in high-stakes assessment — it's the volume practice layer that remediation requires but SPs can't deliver.",
    },
    {
      question:
        "What is PACE and how does ClinicalSim compare?",
      answer:
        "PACE (Program for Accelerated Curriculum in Education) and similar external remediation programs are intensive coaching interventions that cost $15,000-$19,000 per learner, serve one learner at a time, and typically have a 4-8 week wait. They provide an external report at conclusion. ClinicalSim operates differently: it provides structured, on-demand practice at a fraction of the cost, serves all learners in a program simultaneously, is available immediately, and generates milestone-aligned CCC-ready documentation from every session. ClinicalSim can be used as a standalone remediation tool or as a complement to external programs, providing the volume practice between coaching sessions.",
    },
  ],

  // ---------------------------------------------------------------------------
  // CTA
  // ---------------------------------------------------------------------------
  ctaHeadline:
    "The institutions that move first will set the standard.",
  ctaDescription:
    "Communication remediation is inevitable. The only question is whether you build the infrastructure from scratch every time, or use a system already mapped to your milestones.",

  // ---------------------------------------------------------------------------
  // Meta
  // ---------------------------------------------------------------------------
  lastUpdated: "2026-03-16",
}
