import type { FaqItem } from "@/lib/types"

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface PricingTier {
  id: string
  name: string
  description: string
  priceMonthly: string | null
  priceAnnualPerMonth: string | null
  priceAnnualTotal: string | null
  priceLabel: string
  badge: string | null
  features: string[]
  featuresHeading: string | null
  cta: {
    label: string
    href: string
    variant: "default" | "accent" | "secondary"
  }
  secondaryCta: {
    label: string
    href: string
  } | null
  footnote: string | null
  highlighted: boolean
}

export interface ProgramCostRow {
  programSize: string
  annualCost: string
  perLearnerYear: string
  note?: string
}

export interface ComparisonRow {
  feature: string
  sp: string
  clinicalsim: string
  highlight?: boolean
}

export interface Testimonial {
  quote: string
  attribution: string
}

export interface PricingPageData {
  heroHeadline: string
  heroSubheadline: string
  contextParagraph: string
  contextCta: string
  tiers: PricingTier[]
  programCostRows: ProgramCostRow[]
  programCostContext: string
  customScenariosHeadline: string
  customScenariosHowItWorks: string
  customScenariosComingSoon: string
  customScenariosFoundingNote: string
  comparisonRows: ComparisonRow[]
  testimonials: Testimonial[]
  trustLine: string
  faqs: FaqItem[]
  foundingHeadline: string
  foundingDescription: string
  foundingCta: string
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const pricingPageData: PricingPageData = {
  heroHeadline: "Practice the conversations that matter most.",
  heroSubheadline:
    "Structured, voice-based simulation for communication remediation and training — from medical school through fellowship. Backed by research with top academic medical institutions.",

  contextParagraph:
    "93% of residency programs have faced communication remediation in the past three years. Each case consumes 29\u201345 faculty hours — and most programs still don\u2019t have a structured toolkit for it. ClinicalSim gives learners unlimited, private practice on the conversations they\u2019re struggling with, mapped to ACGME ICS Milestones 2.0 and scored with validated frameworks.",
  contextCta: "Pick the plan that fits how your learners train.",

  tiers: [
    {
      id: "individual",
      name: "Individual",
      description:
        "For residents, fellows, and clinicians building communication confidence on their own.",
      priceMonthly: "$19",
      priceAnnualPerMonth: "$15",
      priceAnnualTotal: "$179/year",
      priceLabel: "/month",
      badge: null,
      featuresHeading: null,
      features: [
        "Unlimited voice-based practice sessions across 15+ clinical scenarios",
        "Goals of care, diagnosis disclosure, family meetings, de-escalation, and more",
        "Real-time AI patient conversations from any device",
        "Structured feedback scored against Calgary-Cambridge and ACGME ICS Milestones 2.0",
        "Individual performance dashboard with session-level data",
        "New scenarios added monthly",
      ],
      cta: {
        label: "Start practicing",
        href: "#PLACEHOLDER_INDIVIDUAL_MONTHLY",
        variant: "default",
      },
      secondaryCta: {
        label: "or $179/year — save 21%",
        href: "#PLACEHOLDER_INDIVIDUAL_ANNUAL",
      },
      footnote: "7-day free trial, cancel anytime",
      highlighted: false,
    },
    {
      id: "program",
      name: "Program",
      description:
        "For residency and fellowship programs that need structured communication training and remediation at scale.",
      priceMonthly: "$29",
      priceAnnualPerMonth: null,
      priceAnnualTotal: null,
      priceLabel: "/user/month",
      badge: "Most popular",
      featuresHeading: "Everything in Individual, plus:",
      features: [
        "Faculty admin dashboard — program directors and administrators view every learner\u2019s performance, progress, and practice patterns in one place",
        "CCC-ready documentation — every session generates timestamped, milestone-aligned assessment data ready for Clinical Competency Committee review",
        "ACGME ICS Milestone 2.0 reporting — structured competency tracking built in, not bolted on",
        "Program-level analytics — aggregate data across your entire cohort to identify trends, gaps, and remediation progress",
        "Dedicated onboarding — we align scenarios to your curriculum and train your faculty team",
        "Custom scenario creation — included for founding programs",
        "Priority access to new scenarios and features",
      ],
      cta: {
        label: "Request a pilot",
        href: "/contact",
        variant: "accent",
      },
      secondaryCta: null,
      footnote: "Billed annually. 10+ users.",
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description:
        "For health systems, GME consortia, and institutions deploying across multiple programs or sites.",
      priceMonthly: null,
      priceAnnualPerMonth: null,
      priceAnnualTotal: null,
      priceLabel: "Custom pricing",
      badge: null,
      featuresHeading: "Everything in Program, plus:",
      features: [
        "Institution-wide deployment across residency, fellowship, and medical school programs",
        "SSO and LMS integration (SCORM-compatible)",
        "Custom scenario library built to your clinical and institutional priorities",
        "Dedicated customer success manager",
        "System-wide analytics tied to HCAHPS, quality, and remediation outcomes",
        "Executive reporting for DIO, CMO, and CNO stakeholders",
        "Volume pricing for 100+ users",
      ],
      cta: {
        label: "Contact us",
        href: "/contact",
        variant: "secondary",
      },
      secondaryCta: null,
      footnote: null,
      highlighted: false,
    },
  ],

  programCostRows: [
    {
      programSize: "20 fellows",
      annualCost: "$6,960",
      perLearnerYear: "$348",
    },
    {
      programSize: "40 residents",
      annualCost: "$13,920",
      perLearnerYear: "$348",
    },
    {
      programSize: "60 residents",
      annualCost: "$20,880",
      perLearnerYear: "$348",
    },
    {
      programSize: "90 residents",
      annualCost: "$31,320",
      perLearnerYear: "$348",
      note: "Volume pricing available for 100+ users — contact us",
    },
  ],
  programCostContext:
    "For context: a 60-resident program running 4\u201310 SP encounters per year spends $27,000\u2013$68,000 on scheduling, standardized patients, and faculty evaluation time. ClinicalSim replaces that with unlimited on-demand practice at $20,880/year — and every session generates CCC-ready assessment data automatically.",

  customScenariosHeadline: "Built for your program\u2019s clinical reality",
  customScenariosHowItWorks:
    "You describe the conversation — delivering a difficult prognosis, navigating a family conflict, conducting a cognitive assessment, handling a challenging remediation case. We build the scenario, the rubric, and the scoring criteria using validated tools like Calgary-Cambridge, SPIKES, and ACGME ICS Milestones 2.0. Your learners practice on-demand, with structured feedback after every session.",
  customScenariosComingSoon:
    "A self-service scenario builder. Input a clinical situation, and ClinicalSim pulls from a validated library of frameworks and assessment tools to generate the scenario, rubric, and feedback criteria automatically. Build and deploy custom encounters in minutes instead of weeks.",
  customScenariosFoundingNote:
    "Custom scenario creation is included for founding program partners at no additional cost.",

  comparisonRows: [
    {
      feature: "Cost per encounter",
      sp: "$100\u2013200 fully loaded",
      clinicalsim: "Unlimited (flat subscription)",
      highlight: true,
    },
    {
      feature: "Availability",
      sp: "Scheduled, limited slots",
      clinicalsim: "On-demand, 24/7, any device",
    },
    {
      feature: "Faculty time per case",
      sp: "29\u201345 hours (remediation)",
      clinicalsim: "Zero — automated assessment",
      highlight: true,
    },
    {
      feature: "Feedback consistency",
      sp: "Variable, evaluator-dependent",
      clinicalsim: "Standardized, framework-based",
    },
    {
      feature: "Assessment alignment",
      sp: "Manual ACGME mapping",
      clinicalsim: "Built-in ICS Milestone 2.0 reporting",
    },
    {
      feature: "CCC documentation",
      sp: "Faculty-generated",
      clinicalsim: "Automated, timestamped",
    },
    {
      feature: "Learner stigma",
      sp: "High (observed practice)",
      clinicalsim: "Low (private, judgment-free)",
    },
    {
      feature: "Annual cost (60 residents)",
      sp: "$27,000\u2013$68,000",
      clinicalsim: "$20,880",
      highlight: true,
    },
    {
      feature: "Practice volume",
      sp: "4\u201310 encounters/year",
      clinicalsim: "Unlimited",
    },
  ],

  testimonials: [
    {
      quote:
        "I just tried it out and it was like talking to a real patient.",
      attribution: "Faculty, Johns Hopkins University School of Medicine",
    },
    {
      quote:
        "The AI feedback is very pinpoint and detailed. I did perform a demo to my faculty group and they were BLOWN AWAY!",
      attribution: "Faculty, Georgetown University",
    },
    {
      quote:
        "It was helpful to have time to think and reflect without feeling the pressure of a person across from you expecting a response.",
      attribution: "PICU Fellow, Pilot Study Participant",
    },
  ],
  trustLine:
    "Built on research with top academic medical institutions. Blinded evaluation using validated assessment tools.",

  faqs: [
    {
      question: "How is this different from standardized patients?",
      answer:
        "SPs cost $100\u2013200 per encounter and require scheduling, space, and faculty evaluators — and each remediation case consumes 29\u201345 faculty hours. ClinicalSim is on-demand from any device, with automated feedback grounded in the same validated frameworks. A 60-resident program gets unlimited practice for $20,880/year instead of spending $27,000\u2013$68,000 on 4\u201310 SP encounters per resident.",
    },
    {
      question:
        "What\u2019s the difference between Individual and Program?",
      answer:
        "Individual gives you full access to practice scenarios and your own performance dashboard. Program adds the institutional layer: a faculty admin dashboard so program directors and administrators can view every learner\u2019s performance, CCC-ready documentation from every session, ACGME ICS Milestone 2.0 reporting, program-level analytics, dedicated onboarding, and custom scenario creation.",
    },
    {
      question: "What scenarios are available?",
      answer:
        "The core library includes 15+ scenarios spanning goals-of-care conversations, diagnosis disclosure, advance care planning, family meetings, de-escalation, behavioral health screening, and cognitive assessments. We add new scenarios monthly and build custom scenarios for program partners.",
    },
    {
      question: "How does the voice simulation work?",
      answer:
        "Learners have a real-time spoken conversation with an AI-simulated patient from any device with a microphone. The simulation responds naturally and adapts to the learner\u2019s approach. After each session, ClinicalSim generates structured feedback scored against validated communication frameworks — Calgary-Cambridge, ACGME ICS Milestones 2.0 — with timestamped, CCC-ready documentation.",
    },
    {
      question: "Is there evidence this works?",
      answer:
        "ClinicalSim is built on research conducted with top academic medical institutions, using blinded evaluation and validated assessment tools. The platform was developed alongside clinical educators and medical practitioners.",
    },
    {
      question: "How does this help with remediation?",
      answer:
        "93% of residency programs have faced communication remediation in the past three years, and each case consumes 29\u201345 faculty hours. ClinicalSim gives learners private, stigma-free practice on the exact conversations they\u2019re struggling with — plus structured assessment data that documents progress for CCCs. No scheduling, no SP coordination, no faculty observation time.",
    },
    {
      question: "What does onboarding look like for a program?",
      answer:
        "We work directly with program directors to align scenarios to your curriculum, configure CCC reporting, and train your faculty team. Most programs are practicing within two weeks.",
    },
    {
      question: "Can learners access this on their phones?",
      answer:
        "Yes. ClinicalSim works from any device with a browser and microphone. No app download, no special hardware.",
    },
    {
      question: "What about HIPAA?",
      answer:
        "No real patient data is used in any simulation. ClinicalSim is a training platform, not a clinical documentation tool.",
    },
  ],

  foundingHeadline: "Become a Founding Program",
  foundingDescription:
    "We\u2019re working with a small number of residency and fellowship programs to shape the next generation of communication training. Founding programs get custom scenario development at no additional cost, direct input on product roadmap, and priority access to new features — including the self-service scenario builder.\n\n50% of program directors told CERA they want an accessible remediation toolkit. We\u2019re building it with you.",
  foundingCta: "Apply to become a founding program",
}
