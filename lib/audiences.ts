import {
  Building2,
  GraduationCap,
  FlaskConical,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react"

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
  variant: "warm" | "navy" | "blue" | "success"
}

export interface Audience {
  slug: string
  title: string
  shortTitle: string
  subtitle: string
  icon: LucideIcon
  colorVariant: "warm" | "navy" | "blue" | "success"

  // Homepage card bullets
  cardBullets: string[]

  // Hero
  heroHeadline: string
  heroDescription: string

  // Pain points
  painPoints: PainPoint[]

  // Stats
  stats: AudienceStatItem[]

  // Value propositions
  valueProps: ValueProp[]

  // Cross-links
  relevantSolutionSlugs: string[]

  // CTA
  ctaHeadline: string
  ctaDescription: string

  // Related blog posts
  relatedPostSlugs: string[]
}

const audiences: Audience[] = [
  {
    slug: "program-directors",
    title: "Program Directors",
    shortTitle: "Program Directors",
    subtitle: "The remediation toolkit you told CERA you wanted",
    icon: GraduationCap,
    colorVariant: "navy",

    cardBullets: [
      "20 structured encounters before your first coaching session",
      "Milestone-aligned feedback your CCC can use at the next review",
      "No scheduling, no SP recruitment, no faculty observer required for practice",
    ],

    heroHeadline:
      "Your next remediation case doesn't have to consume 45 faculty hours",
    heroDescription:
      "Your next remediation case will consume 29-45 faculty hours. The learner who needs the most practice will get the fewest repetitions, because every SP encounter takes weeks to schedule and costs $200-$500. ClinicalSim gives struggling residents unlimited, on-demand practice — breaking bad news, navigating angry patients, conducting informed consent — with real-time feedback mapped to ICS Milestones 2.0. Every session generates a timestamped, milestone-aligned record your CCC can actually use.",

    painPoints: [
      {
        headline: "Faculty time consumed",
        description:
          "Each remediation case absorbs 29-45 faculty hours in direct coaching, observation, and documentation. At $150-$300/hour clinical revenue, that's $5,000-$15,000 in opportunity cost per case.",
        stat: "29-45 hrs",
        statSource: "Per remediation case (University of Colorado; Penn EIRC)",
      },
      {
        headline: "No standardized tools",
        description:
          "93% of programs face remediation, but no national toolkit exists. Most programs build their approach from scratch every time, with inconsistent methods and undocumented outcomes.",
        stat: "93%",
        statSource: "CERA Survey, 267 Family Medicine PDs",
      },
      {
        headline: "Insufficient training in remediation",
        description:
          "One in four program directors report receiving little to no training in how to remediate residents. The people responsible for fixing communication deficits often lack formal preparation themselves.",
        stat: "25%",
        statSource: "CERA Survey",
      },
      {
        headline: "The hardest competencies to fix",
        description:
          "ICS and professionalism are consistently identified as the most difficult competencies to remediate. Programs report 77-91% overall remediation success, but communication failures are the cases that persist and escalate.",
      },
    ],

    stats: [
      {
        value: "93%",
        label: "of programs have faced remediation in the past 3 years",
        source: "CERA Survey, 267 Family Medicine PDs",
        variant: "navy",
      },
      {
        value: "29-45",
        label: "faculty hours consumed per remediation case",
        source: "University of Colorado; Penn EIRC",
        variant: "warm",
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
        variant: "warm",
      },
    ],

    valueProps: [
      {
        title: "Structured Practice Before Coaching",
        description:
          "Give residents 20 structured encounters before their first coaching session. Breaking bad news, angry patient encounters, informed consent — each with milestone-aligned feedback. Faculty time goes to coaching, not facilitation.",
      },
      {
        title: "Milestone-Aligned Assessment",
        description:
          "Every practice session generates feedback mapped to ICS Milestones 2.0 (ICS-1: patient communication, ICS-2: interprofessional communication, ICS-3: communication within healthcare systems). Documentation your CCC can use at the next review.",
      },
      {
        title: "On-Demand, Not On-Schedule",
        description:
          "The learner who needs the most practice shouldn't wait for the next available SP slot. ClinicalSim provides unlimited practice 24/7, from any device, with no scheduling bottleneck.",
      },
      {
        title: "Faculty Coach, Not Faculty Infrastructure",
        description:
          "The PD stays in the loop as coach, not as the entire remediation infrastructure. Monitor progress through the faculty dashboard without being present for every practice session.",
      },
    ],

    relevantSolutionSlugs: [
      "goals-of-care",
      "advance-care-planning",
      "cognitive-assessments",
    ],

    ctaHeadline:
      "The remediation toolkit you told CERA you wanted — it exists now.",
    ctaDescription:
      "Request a pilot and see how structured AI practice with milestone-aligned feedback changes how your program approaches communication remediation.",

    relatedPostSlugs: [
      "scalability-problem-sp-programs",
      "osce-case-design-guide",
      "breaking-bad-news-medical-training",
    ],
  },

  {
    slug: "dios-gme-leadership",
    title: "DIOs & GME Leadership",
    shortTitle: "DIOs & GME",
    subtitle: "Standardize remediation infrastructure across every program",
    icon: Building2,
    colorVariant: "warm",

    cardBullets: [
      "Standardized remediation documentation across every program",
      "Costs less than a single PACE assessment",
      "Every session creates a timestamped, milestone-aligned record",
    ],

    heroHeadline:
      "When the GMEC asks what you're doing about remediation consistency, there's an answer",
    heroDescription:
      "Communication failures are behind 60% of hospital adverse events and $1.7 billion in malpractice costs annually. Your institution has no standardized system for remediating the trainees most likely to cause them. ClinicalSim provides structured, repeatable communication practice across all ACGME-accredited programs — with every session documented, every assessment mapped to ICS milestones, and every learner's progress tracked longitudinally.",

    painPoints: [
      {
        headline: "No standardized remediation across programs",
        description:
          "Each program builds its remediation approach independently. Methods vary, documentation is inconsistent, and there's no way to demonstrate to GMEC or accreditation that communication remediation is systematic.",
      },
      {
        headline: "Accreditation vulnerability",
        description:
          "ACGME requires demonstrated competency in interpersonal and communication skills. When remediation documentation is inconsistent or missing, your institution carries risk in every site visit.",
      },
      {
        headline: "Documentation gaps create legal exposure",
        description:
          "Remediation cases that lack structured documentation are the ones that create liability. Due process requirements demand evidence of fair, consistent, and well-documented remediation efforts.",
        stat: "$1.7B",
        statSource:
          "In malpractice costs from communication breakdowns (CRICO, 2009-2013)",
      },
      {
        headline: "PACE referrals are expensive and limited",
        description:
          "External remediation referrals to PACE cost $15,000-$19,000 per learner. An institutional ClinicalSim license costs less than a single referral and covers every program, every resident, every competency committee cycle.",
        stat: "$15K-$19K",
        statSource: "Per PACE assessment (UC San Diego)",
      },
    ],

    stats: [
      {
        value: "60%",
        label: "of hospital adverse events linked to communication failures",
        source: "Literature",
        variant: "warm",
      },
      {
        value: "$1.7B",
        label:
          "in malpractice costs from communication breakdowns over 5 years",
        source: "CRICO, 2009-2013",
        variant: "navy",
      },
      {
        value: "$15K-$19K",
        label: "cost per external PACE remediation assessment",
        source: "PACE at UC San Diego",
        variant: "warm",
      },
      {
        value: "93%",
        label: "of programs face remediation in past 3 years",
        source: "CERA Survey",
        variant: "success",
      },
    ],

    valueProps: [
      {
        title: "Standardize Across All Programs",
        description:
          "One platform, consistent documentation, uniform assessment standards. Every program uses the same milestone-aligned framework for communication remediation, whether it's family medicine, surgery, or psychiatry.",
      },
      {
        title: "Documentation for Due Process",
        description:
          "Every practice session generates a timestamped, milestone-aligned record. When remediation decisions are reviewed — by GMEC, by legal, by accreditation — the documentation exists.",
      },
      {
        title: "Replace PACE-Level Costs",
        description:
          "One institutional license replaces the cost of 3-6 external PACE referrals — and covers every program, every resident, every competency committee cycle. The economics are straightforward.",
      },
      {
        title: "Accreditation-Ready Infrastructure",
        description:
          "Demonstrate to ACGME site visitors that your institution has a systematic, documented approach to communication remediation. Not ad hoc. Not program-dependent. Standardized.",
      },
    ],

    relevantSolutionSlugs: ["goals-of-care", "advance-care-planning"],

    ctaHeadline:
      "Standardize remediation documentation across every program.",
    ctaDescription:
      "Request a pilot and see how ClinicalSim provides the institutional remediation infrastructure your GMEC has been looking for.",

    relatedPostSlugs: [
      "hospital-communication-training-roi",
      "scalability-problem-sp-programs",
    ],
  },

  {
    slug: "simulation-center-directors",
    title: "Simulation Center Directors",
    shortTitle: "Sim Directors",
    subtitle: "Extend your SP program, don't replace it",
    icon: FlaskConical,
    colorVariant: "blue",

    cardBullets: [
      "Assessment data your CCC can actually use from every session",
      "Practice volume struggling learners need without scheduling bottleneck",
      "Measurable communication outcomes that justify your center's investment",
    ],

    heroHeadline:
      "The practice volume struggling learners need, without the scheduling bottleneck",
    heroDescription:
      "SP encounters are the gold standard for communication assessment. They're also $50-$500 per session, take weeks to schedule for individual remediation, and can't provide the practice volume struggling learners actually need. ClinicalSim isn't replacing your SP program. It's extending it. On-demand practice between scheduled encounters, with assessment data that validates what your center already does.",

    painPoints: [
      {
        headline: "SP encounters can't scale for remediation",
        description:
          "Individual remediation requires high-volume, repeated practice. At $50-$500 per SP encounter and weeks of scheduling lead time, you can't give a single struggling resident the 20+ practice sessions they need.",
        stat: "$50-$500",
        statSource: "Per SP encounter (industry range)",
      },
      {
        headline: "Budget pressure on communication sim",
        description:
          "60-75% of simulation center budgets go to procedural simulation. Communication simulation is labor-intensive, SP-dependent, and difficult to scale. Justifying budget for individual remediation encounters is hard.",
      },
      {
        headline: "Assessment data gaps",
        description:
          "SP encounters produce assessment data, but it's often inconsistent across evaluators and difficult to aggregate longitudinally. CCC members need standardized data they can compare across time and across learners.",
      },
      {
        headline: "Center value justification",
        description:
          "Simulation center directors constantly justify their centers' existence and impact. Measurable communication outcomes at scale — documented, longitudinal, milestone-aligned — are the kind of data that makes that case.",
      },
    ],

    stats: [
      {
        value: "$50-$500",
        label: "per SP encounter for communication assessment",
        source: "Industry range",
        variant: "blue",
      },
      {
        value: "60-75%",
        label: "of sim center budgets go to procedural simulation",
        source: "Simulation center surveys",
        variant: "navy",
      },
      {
        value: "24/7",
        label: "on-demand access with no scheduling bottleneck",
        variant: "blue",
      },
      {
        value: "ICS 1-3",
        label: "milestone-aligned feedback from every practice session",
        source: "ACGME Milestones 2.0",
        variant: "success",
      },
    ],

    valueProps: [
      {
        title: "Extend, Don't Replace",
        description:
          "ClinicalSim handles the high-volume practice reps between your scheduled SP encounters. Your SPs stay focused on high-stakes assessments like OSCEs. Both programs are stronger together.",
      },
      {
        title: "Assessment Data That Scales",
        description:
          "Every AI practice session generates milestone-aligned assessment data — the same ICS milestones your CCC already evaluates against. Consistent across learners, aggregable over time, ready for committee review.",
      },
      {
        title: "The Volume Remediation Requires",
        description:
          "A struggling learner needs 20+ practice encounters, not 2. ClinicalSim provides unlimited repetitions without consuming SP hours, faculty time, or scheduling bandwidth.",
      },
      {
        title: "Justify Your Center's Impact",
        description:
          "When you show the dean that your simulation infrastructure now generates measurable communication outcomes at scale — with documented improvement on validated milestones — that's a conversation worth having.",
      },
    ],

    relevantSolutionSlugs: [
      "goals-of-care",
      "advance-care-planning",
      "cognitive-assessments",
    ],

    ctaHeadline:
      "Assessment data your CCC can actually use — from every practice session.",
    ctaDescription:
      "Request a pilot and see how ClinicalSim extends your simulation center's communication training capacity.",

    relatedPostSlugs: [
      "scalability-problem-sp-programs",
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
    ],
  },

  {
    slug: "clinical-competency-committees",
    title: "Clinical Competency Committees",
    shortTitle: "CCCs",
    subtitle: "Milestone-aligned data for every learner review",
    icon: ClipboardCheck,
    colorVariant: "success",

    cardBullets: [
      "Milestone-aligned assessment data from structured practice sessions",
      "Longitudinal progress tracking across the remediation period",
      "Objective data to complement faculty observations",
    ],

    heroHeadline: "The assessment data you've been making decisions without",
    heroDescription:
      "Clinical Competency Committees make high-stakes decisions about resident progression with limited communication assessment data. Faculty observations are subjective, inconsistent, and sparse. ClinicalSim generates structured, milestone-aligned assessment data from every practice session — giving your committee objective evidence of communication competency development over time.",

    painPoints: [
      {
        headline: "Subjective assessment data",
        description:
          "Most ICS assessment relies on faculty observation and subjective reporting. One in five GME stakeholders report not knowing how to assess ICS milestones. The data reaching your committee may not reflect actual competency.",
        stat: "1 in 5",
        statSource:
          "GME stakeholders don't know how to assess ICS milestones",
      },
      {
        headline: "Sparse data points",
        description:
          "A resident in remediation might have 2-3 documented communication assessments over months. That's not enough data to make confident progression decisions or demonstrate improvement.",
      },
      {
        headline: "No longitudinal view",
        description:
          "Without structured, repeatable assessment, it's impossible to show a trajectory of improvement. Did the resident actually get better, or did they just have one good day with a lenient evaluator?",
      },
      {
        headline: "Documentation for due process",
        description:
          "When a CCC decision is challenged, the strength of your documentation determines the outcome. Subjective impressions don't withstand scrutiny. Timestamped, milestone-aligned assessment records do.",
      },
    ],

    stats: [
      {
        value: "1 in 5",
        label:
          "GME stakeholders don't know how to assess ICS milestones",
        source: "Survey of 1,195 GME stakeholders",
        variant: "success",
      },
      {
        value: "ICS 1-3",
        label:
          "structured feedback mapped to Milestones 2.0 from every session",
        source: "ACGME Milestones 2.0",
        variant: "navy",
      },
      {
        value: "100%",
        label: "of practice sessions generate timestamped assessment data",
        variant: "success",
      },
      {
        value: "Longitudinal",
        label: "progress tracking shows improvement trajectory over time",
        variant: "blue",
      },
    ],

    valueProps: [
      {
        title: "Objective Communication Data",
        description:
          "Every practice session generates assessment data mapped to ICS Milestones 2.0. Not subjective impressions — structured, consistent, comparable data your committee can use alongside faculty evaluations.",
      },
      {
        title: "Longitudinal Progress Tracking",
        description:
          "See a learner's communication trajectory across weeks and months of remediation. Multiple data points per milestone, tracked over time, showing whether intervention is working.",
      },
      {
        title: "CCC-Ready Reports",
        description:
          "Assessment data formatted for committee review. Timestamped sessions, milestone scores, progress trends — the documentation your committee needs to make and defend progression decisions.",
      },
      {
        title: "Complement Faculty Assessment",
        description:
          "ClinicalSim data doesn't replace faculty judgment. It supplements it with objective, repeatable assessment data that addresses the gaps in subjective observation.",
      },
    ],

    relevantSolutionSlugs: ["goals-of-care", "advance-care-planning"],

    ctaHeadline:
      "Milestone-aligned assessment data from every practice session.",
    ctaDescription:
      "Request a pilot and see how structured practice data changes the quality of your committee's learner reviews.",

    relatedPostSlugs: [
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
    ],
  },
]

export function getAllAudiences(): Audience[] {
  return audiences
}

export function getAudienceBySlug(slug: string): Audience | undefined {
  return audiences.find((a) => a.slug === slug)
}
