import type { BrandIconName } from "@/components/brand-icon"
import type { FaqItem } from "@/lib/types"

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
  relevantSolutionSlugs: string[]

  /**
   * Optional FAQ block. When present it renders a Q/A section and emits
   * FAQPage JSON-LD. Each answer must stand alone without its question and
   * carry its own stat or source, per the GEO rules in CLAUDE.md. The JSON-LD
   * answer text is the visible answer verbatim.
   */
  faqs?: FaqItem[]

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
    icon: "hat-graduation",
    colorVariant: "navy",
    lastUpdated: "2026-08-07",

    cardBullets: [
      "20 structured encounters before your first coaching session",
      "Milestone-aligned feedback your CCC can use at the next review",
      "No scheduling, no SP recruitment, no faculty observer required for practice",
    ],

    heroHeadline:
      "Your next remediation case doesn't have to start from scratch",
    heroDescription:
      "The learner who needs the most practice often gets the fewest repetitions because every standardized patient encounter takes coordination and faculty time. ClinicalSim gives struggling learners on-demand practice in breaking bad news, high-stakes patient encounters, and informed consent, with feedback mapped to ACGME Milestones 2.0. Every session generates a timestamped, milestone-aligned record your CCC can use.",

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
        title: "Structured Practice Before Coaching",
        description:
          "Give learners 20 structured encounters before their first coaching session, including breaking bad news, high-stakes patient encounters, and informed consent. Faculty time goes to coaching instead of facilitating every repetition.",
      },
      {
        title: "Milestone-Aligned Assessment",
        description:
          "Every practice session generates feedback mapped to the ICS subcompetencies of ACGME Milestones 2.0 (ICS-1: patient communication, ICS-2: interprofessional communication, ICS-3: communication within healthcare systems). Documentation your CCC can use at the next review.",
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
      "The remediation toolkit CERA asked for is here.",
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
    icon: "hospital",
    colorVariant: "accent",

    cardBullets: [
      "Standardized remediation documentation across every program",
      "Costs less than a single PACE assessment",
      "Every session creates a timestamped, milestone-aligned record",
    ],

    heroHeadline:
      "When the GMEC asks what you're doing about remediation consistency, there's an answer",
    heroDescription:
      "Communication failure is a factor in 40% of malpractice cases, up from 30% a decade ago (Candello 2025), and communication breakdowns were linked to $1.7 billion in losses and 1,744 deaths over five years (CRICO 2015). Your institution has no standardized system for remediating the trainees most likely to cause them. ClinicalSim provides structured, repeatable communication practice across all ACGME-accredited programs, with every session documented, every assessment mapped to ICS milestones, and every learner's progress tracked longitudinally.",

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
        stat: "40%",
        statSource:
          "Of malpractice cases now involve a communication failure, up from 30% (Candello 2025 Benchmarking Report)",
      },
      {
        headline: "PACE referrals are expensive and limited",
        description:
          "External remediation referrals to PACE cost $15,000-$19,000 per learner. An institutional ClinicalSim license costs less than a single referral and covers every program, every learner, every competency committee cycle.",
        stat: "$15K-$19K",
        statSource: "Per PACE assessment (UC San Diego)",
      },
    ],

    stats: [
      {
        value: "60%",
        label: "of hospital adverse events linked to communication failures",
        source: "The Joint Commission Sentinel Event Data",
        variant: "accent",
      },
      {
        value: "40%",
        label:
          "of malpractice cases involve a communication failure, up from 30%",
        source: "Candello 2025 Benchmarking Report",
        variant: "navy",
      },
      {
        value: "$15K-$19K",
        label: "cost per external PACE remediation assessment",
        source: "PACE at UC San Diego",
        variant: "accent",
      },
      {
        value: "93%",
        label: "of programs face remediation in past 3 years",
        source: "CERA Survey",
        variant: "light-blue",
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
          "Every practice session generates a timestamped, milestone-aligned record, so the documentation is available when GMEC, legal teams, or accreditors review a remediation decision.",
      },
      {
        title: "Keep practice inside the program",
        description:
          "One institutional license can cover every program, learner, and competency committee cycle instead of sending each learner to a separate external assessment.",
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
    icon: "microscope",
    colorVariant: "blue",
    lastUpdated: "2026-08-07",

    cardBullets: [
      "Assessment data your CCC can actually use from every session",
      "Practice volume struggling learners need without scheduling bottleneck",
      "Measurable communication outcomes that justify your center's investment",
    ],

    heroHeadline:
      "The practice volume struggling learners need, without the scheduling bottleneck",
    heroDescription:
      "SP encounters remain the standard for high-stakes communication assessment, and they require actor time, space, faculty support, and scheduling. ClinicalSim extends your SP program with on-demand practice between scheduled encounters and assessment data that documents what learners do over time.",

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
          "Simulation center directors have to document their centers' use and impact. Longitudinal, milestone-aligned communication data gives them evidence that can support that work.",
      },
    ],

    stats: [
      {
        value: "24/7",
        label: "practice access between scheduled SP encounters",
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
        variant: "light-blue",
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
          "Every AI practice session generates assessment data against the same ICS milestones your CCC already uses. Programs can compare the results across attempts and bring them into committee review.",
      },
      {
        title: "The Volume Remediation Requires",
        description:
          "A struggling learner needs 20+ practice encounters, not 2. ClinicalSim provides unlimited repetitions without consuming SP hours, faculty time, or scheduling bandwidth.",
      },
      {
        title: "Justify Your Center's Impact",
        description:
          "When you show the dean that your simulation infrastructure produces longitudinal communication data at scale, with assessment tied to the relevant milestones, you can document how learners use the program and how their performance changes.",
      },
    ],

    relevantSolutionSlugs: [
      "goals-of-care",
      "advance-care-planning",
      "cognitive-assessments",
    ],

    ctaHeadline:
      "Assessment data from every practice session that your CCC can use.",
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
    icon: "ribbon-check",
    colorVariant: "light-blue",

    cardBullets: [
      "Milestone-aligned assessment data from structured practice sessions",
      "Longitudinal progress tracking across the remediation period",
      "Structured data to complement faculty observations",
    ],

    heroHeadline: "The assessment data you've been making decisions without",
    heroDescription:
      "Clinical Competency Committees make high-stakes decisions about learner progression with limited communication assessment data. ClinicalSim generates structured, milestone-aligned data from every practice session, giving your committee another source of evidence alongside faculty observation.",

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
          "A learner in remediation might have 2-3 documented communication assessments over months. That's not enough data to make confident progression decisions or demonstrate improvement.",
      },
      {
        headline: "No longitudinal view",
        description:
          "Without structured, repeatable assessment, it's impossible to show a trajectory of improvement. Did the learner actually get better, or did they just have one good day with a lenient evaluator?",
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
        variant: "light-blue",
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
        variant: "light-blue",
      },
      {
        value: "Longitudinal",
        label: "progress tracking shows improvement trajectory over time",
        variant: "blue",
      },
    ],

    valueProps: [
      {
        title: "Structured communication data",
        description:
          "Every practice session generates assessment data mapped to ACGME Milestones 2.0. Your committee can use that structured, comparable record alongside faculty evaluations.",
      },
      {
        title: "Longitudinal Progress Tracking",
        description:
          "See a learner's communication trajectory across weeks and months of remediation. Multiple data points per milestone, tracked over time, showing whether intervention is working.",
      },
      {
        title: "CCC-Ready Reports",
        description:
          "Assessment data is formatted for committee review, with timestamped sessions, milestone scores, and progress trends that document the basis for a progression decision.",
      },
      {
        title: "Complement Faculty Assessment",
        description:
          "ClinicalSim data doesn't replace faculty judgment. It supplements faculty observation with a repeatable assessment record from each practice session.",
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

  {
    slug: "medical-school-leadership",
    title: "Medical School & UME Leadership",
    shortTitle: "Medical School (UME)",
    subtitle: "Sequence communication across all four years",
    icon: "book-opened",
    colorVariant: "blue",
    lastUpdated: "2026-08-07",

    cardBullets: [
      "A four-year arc from history-taking to diagnosis disclosure",
      "Unlimited practice between standardized-patient encounters",
      "A dashboard that follows each student through clerkships",
    ],

    heroHeadline:
      "Communication should grow alongside clinical knowledge, not be left to chance",
    heroDescription:
      "Medical students learn anatomy and pathophysiology on a deliberate sequence, but communication is often taught unevenly and assessed inconsistently. When Step 2 CS was discontinued in 2021, schools lost the only national standardized assessment of clinical communication. ClinicalSim lets you sequence scenarios across all four years, from structured history-taking to delivering a new diagnosis, with unlimited on-demand practice and a dashboard that follows each student through clerkships.",

    painPoints: [
      {
        headline: "The national communication exam is gone",
        description:
          "USMLE Step 2 CS was permanently discontinued in 2021. Medical schools lost the only external, standardized assessment of clinical communication skills and have had no scalable replacement since.",
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
        headline: "Communication is taught unevenly",
        description:
          "Across a four-year curriculum, communication instruction is often fragmented, a workshop here, an OSCE there, with no continuous arc and no longitudinal view of how each student is progressing.",
      },
      {
        headline: "Skills fade without practice",
        description:
          "Communication is a performance skill. Without deliberate, repeated practice and feedback, the rapport-building and diagnosis-disclosure skills students learn early erode before they reach the wards.",
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
        title: "A Four-Year Arc",
        description:
          "Sequence scenarios so communication complexity rises with clinical knowledge: structured history-taking in the preclinical years, updating families on a plan in M3, and delivering a new diagnosis in M4.",
      },
      {
        title: "Practice Between SP Encounters",
        description:
          "ClinicalSim handles the high-volume reps between scheduled standardized-patient sessions and OSCEs, so in-person encounters are spent demonstrating skill rather than building it for the first time.",
      },
      {
        title: "A Dashboard Through Clerkships",
        description:
          "Follow each student's communication trajectory across four years instead of relying on a single OSCE score.",
      },
      {
        title: "Built on Published Frameworks",
        description:
          "Scenarios and feedback draw on published communication frameworks such as SPIKES, teach-back, and Calgary-Cambridge, so students learn structures they'll carry into residency.",
      },
    ],

    relevantSolutionSlugs: ["undergraduate-medical-education"],

    ctaHeadline:
      "Build communication skill across all four years.",
    ctaDescription:
      "Request a pilot and see how a sequenced arc of scenarios develops communication from the first patient history to delivering a diagnosis.",

    relatedPostSlugs: [
      "osce-case-design-guide",
      "what-learners-want-from-ai-sps",
      "breaking-bad-news-medical-training",
    ],
  },

  {
    slug: "faculty-clinician-educators",
    title: "Faculty & Clinician Educators",
    shortTitle: "Faculty Educators",
    subtitle: "Practice the conversations faculty are expected to model",
    icon: "medal-star",
    colorVariant: "accent",

    cardBullets: [
      "Rehearse giving difficult, specific feedback",
      "Navigate professionalism conversations with peers",
      "The same rubric system that trains residents",
    ],

    heroHeadline:
      "Faculty have to model conversations no one trained them for",
    heroDescription:
      "Attendings, fellows-as-teachers, and clinician educators are expected to give difficult feedback, address professionalism concerns, and teach at the bedside, even though they were rarely trained to lead those conversations. ClinicalSim gives faculty private practice with rubric-scored feedback on the skills they are expected to model.",

    painPoints: [
      {
        headline: "Faculty model skills they never practiced",
        description:
          "Giving structured feedback, handling defensiveness, and running a professionalism conversation are learned skills, but most faculty picked them up by osmosis, without deliberate practice or feedback.",
      },
      {
        headline: "Confidence is not competence",
        description:
          "In one survey, the attendings furthest out from training reported the highest confidence in leading end-of-life conversations and the least formal preparation for them. Confidence, in this domain, is largely the absence of feedback.",
        statSource: "See our essay on the measurement gap",
      },
      {
        headline: "No consistent feedback loop",
        description:
          "Once training ends, structured feedback on how a clinician actually communicates effectively stops. There is rarely a safe place to rehearse a hard feedback conversation before having it for real.",
      },
      {
        headline: "Professionalism conversations get avoided",
        description:
          "Addressing a peer's lateness, disengagement, or underperformance is uncomfortable, so it's often deferred, and unaddressed concerns escalate into larger problems for the team and the program.",
      },
    ],

    stats: [
      {
        value: "Same rubric",
        label: "the engine and dashboard that train residents, turned toward faculty",
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
        title: "Rehearse Difficult Feedback",
        description:
          "Practice delivering corrective feedback to a learner with structure (Pendleton, SBI) and handling defensiveness, before the real conversation, not during it.",
      },
      {
        title: "Navigate Professionalism Concerns",
        description:
          "Work through addressing lateness, disengagement, or a colleague performing below expectations directly, without damaging the working relationship.",
      },
      {
        title: "Sharpen Bedside Teaching",
        description:
          "Practice teach-back from the teacher's side, calibrating to the learner's level and protecting time for questions, with feedback on how it lands.",
      },
      {
        title: "One Platform for Learners and Teachers",
        description:
          "Faculty-development scenarios run on the same engine, rubric, and dashboard as the trainee-facing programs, so an institution supports learners and the faculty who teach them from one system.",
      },
    ],

    relevantSolutionSlugs: ["faculty-development"],

    ctaHeadline:
      "Give faculty the practice they never got.",
    ctaDescription:
      "Request a pilot and see how attendings and clinician educators rehearse feedback, professionalism, and teaching conversations with rubric-scored feedback.",

    relatedPostSlugs: [
      "eol-communication-training-measurement-gap",
      "why-communication-training-matters",
      "breaking-bad-news-practice-not-knowledge",
    ],
  },
  {
    slug: "risk-and-patient-safety",
    title: "Risk & Patient Safety Leaders",
    shortTitle: "Risk & Safety",
    subtitle: "The claims data already points at the conversation",
    icon: "chart-pipe-decrease",
    colorVariant: "navy",

    cardBullets: [
      "Practice on the failure mode behind 40% of malpractice claims",
      "A timestamped record of which clinician rehearsed which conversation",
      "Extends the simulation program your carrier already recognizes",
    ],

    heroHeadline:
      "Communication failure is a factor in 40% of malpractice cases, and it is the one you can rehearse",
    heroDescription:
      "Communication failure is a factor in 40% of malpractice cases, up from 30% a decade ago, and those claims carry 39% greater odds of closing with an indemnity payment (Candello 2025 Benchmarking Report). Average indemnity runs from $386,000 in general medicine to $944,000 in obstetrics before defense costs (CRICO 2015 specialty indemnity averages), and communication claims are more than twice as likely to top $1 million (Humphrey et al., Journal of Patient Safety 2022). OB claim rates dropped roughly 50% under CRICO's simulation-built obstetric safety program (Schaffer et al., Obstetrics and Gynecology 2021), so the behavior behind those claims does respond to structured practice. ClinicalSim extends the simulation program you already fund, adding unlimited voice-based practice on goals-of-care conversations, diagnosis disclosure, family meetings, and de-escalation, with a timestamped, rubric-scored record of every session.",
    lastUpdated: "2026-08-04",

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
          "Communication failure is a factor in 40% of malpractice cases, up from 30% a decade ago, and those claims carry 39% greater odds of closing with an indemnity payment. The one failure mode a risk office can train directly against is the one that keeps growing.",
        stat: "40%",
        statSource:
          "Of malpractice cases involve a communication failure, up from 30% (Candello 2025)",
      },
      {
        headline: "Sentinel events keep coming back to communication",
        description:
          "The Joint Commission has repeatedly named communication a leading root cause of sentinel events in Sentinel Event Alert 58. That alert is qualitative and attaches no percentage, which is part of why a risk office struggles to size the exposure and defend a training budget against it.",
      },
      {
        headline: "Credit exists for courses, evidence of practice does not",
        description:
          "Carriers award premium credits of 5 to 19% for completing an approved risk-reduction course (CRICO and New York Regulation 124 premium programs). What most risk offices cannot produce is per-clinician evidence that practice actually happened, which conversations were rehearsed, and whether performance moved.",
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
          "of malpractice cases involve a communication failure, up from 30% a decade ago",
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
      {
        value: "~50%",
        label:
          "drop in OB claim rates under CRICO's simulation-built obstetric safety program",
        source: "Schaffer et al., Obstetrics and Gynecology 2021",
        variant: "blue",
      },
    ],

    valueProps: [
      {
        title: "Practice on the Conversations Claims Start In",
        description:
          "The library covers goals-of-care conversations, diagnosis disclosure, advance care planning, family meetings, and de-escalation. Clinicians practice by voice, on demand, from any device, and get feedback scored against published frameworks including SPIKES and Calgary-Cambridge.",
      },
      {
        title: "A Record Per Clinician, Not a Sign-In Sheet",
        description:
          "An attendance list tells a carrier who sat in a room. Every ClinicalSim session generates a timestamped, rubric-scored record of which conversation a clinician rehearsed and how it scored, so a risk office can show practice at the individual level.",
      },
      {
        title: "Extends the Simulation Program You Already Fund",
        description:
          "Simulation is what moved OB claim rates roughly 50% in CRICO's obstetric safety program (Schaffer et al., Obstetrics and Gynecology 2021). ClinicalSim adds the repetitions between scheduled standardized patient encounters and drills rather than standing in for them.",
      },
      {
        title: "Volume Without New Scheduling",
        description:
          "A risk office can direct practice at the services carrying the most exposure without adding standardized patient hours or booking sim lab time, because sessions run from any device at any hour.",
      },
    ],

    faqs: [
      {
        question: "What does a communication-failure claim actually cost?",
        answer:
          "Average indemnity on a communication-failure malpractice case runs from $386,000 in general medicine to $944,000 in obstetrics, before defense costs (CRICO 2015 specialty indemnity averages). Communication failure is a factor in 40% of malpractice cases, up from 30% a decade ago, and those claims carry 39% greater odds of closing with an indemnity payment (Candello 2025 Benchmarking Report). Communication claims are also more than twice as likely to top $1 million (Humphrey et al., Journal of Patient Safety 2022).",
      },
      {
        question:
          "Is there evidence that communication training changes claim rates?",
        answer:
          "The closest published evidence is CRICO's obstetric safety program, built on simulation and team training, where OB claim rates dropped roughly 50% (Schaffer et al., Obstetrics and Gynecology 2021). ClinicalSim itself has not been studied against claim rates and should not be presented as if it had been. What the platform produces today is the practice volume and the per-clinician record a risk-reduction program needs.",
      },
      {
        question: "Does ClinicalSim qualify for a malpractice premium credit?",
        answer:
          "Carriers award premium credits of 5 to 19% for completing an approved risk-reduction course (CRICO and New York Regulation 124 premium programs), and approval is the carrier's decision rather than ours. ClinicalSim holds no approved-course designation today. What it provides is the timestamped, per-clinician practice record a carrier review asks for.",
      },
      {
        question: "Does this replace our standardized patient program?",
        answer:
          "No. Standardized patient encounters stay the high-stakes assessment, and ClinicalSim adds the repetitions in between, at whatever hour a clinician is free. The simulation-based programs that moved OB claim rates roughly 50% in CRICO's obstetric safety work (Schaffer et al., Obstetrics and Gynecology 2021) are the model this extends, not the thing it substitutes for.",
      },
      {
        question: "Does any patient data enter the platform?",
        answer:
          "No. Every patient in every ClinicalSim case is synthetic, authored from the clinical literature rather than from patient records, so no protected health information enters the platform and there is nothing to de-identify. SOC 2 and HIPAA certification are on our funded roadmap and are not yet in place. Full detail is on our trust and compliance page.",
      },
    ],

    relevantSolutionSlugs: ["faculty-development"],

    ctaHeadline: "Put the failure mode behind 40% of claims into a simulator.",
    ctaDescription:
      "Request a pilot and see the per-clinician practice record a risk office can take into a carrier review.",

    relatedPostSlugs: [
      "why-communication-training-matters",
      "hospital-communication-training-roi",
    ],
  },
  {
    slug: "quality-and-patient-experience",
    title: "Quality & Patient Experience Leaders",
    shortTitle: "Quality & Experience",
    subtitle:
      "Five of the eight HCAHPS measures Medicare pays on are communication measures",
    icon: "chart-pie-quarter",
    colorVariant: "blue",

    cardBullets: [
      "Practice on the five HCAHPS communication measures Medicare pays on",
      "Teach-back and discharge conversations, rehearsed before the shift",
      "A rubric-scored record for every clinician who practiced",
    ],

    heroHeadline:
      "Patient experience is 25% of your value-based purchasing score, and communication carries most of it",
    heroDescription:
      "Medicare withholds 2% of base operating payments and redistributes about $1.7 billion a year through value-based purchasing, with patient experience worth 25% of the score (CMS FY2026 IPPS final rule). Five of the eight HCAHPS measures Medicare pays on are communication measures, roughly 15.6% of a hospital's total score (CMS). Doctor communication rose 0.8 points from 2007 to 2019, the smallest gain of any HCAHPS domain (Beckett et al., Medical Care 2024), so the domain carrying the most payment weight is the one that has moved least. ClinicalSim gives clinicians unlimited voice-based practice on the conversations those measures ask patients about, with a rubric-scored record of every session.",
    lastUpdated: "2026-08-04",

    painPoints: [
      {
        headline: "The payment weight sits on communication",
        description:
          "Medicare withholds 2% of base operating payments and redistributes about $1.7 billion a year through value-based purchasing. Patient experience is 25% of that score, and five of the eight HCAHPS measures Medicare pays on are communication measures, roughly 15.6% of the total.",
        stat: "15.6%",
        statSource:
          "Share of a hospital's value-based purchasing score carried by HCAHPS communication measures (CMS)",
      },
      {
        headline: "The domain that moved least",
        description:
          "Doctor communication rose 0.8 points from 2007 to 2019, the smallest gain of any HCAHPS domain. Twelve years of improvement work produced less movement here than anywhere else on the survey, which is what you would expect from a performance skill addressed with scripting rather than practice.",
        stat: "0.8 points",
        statSource:
          "Doctor communication gain 2007 to 2019, the smallest HCAHPS gain (Beckett et al., Medical Care 2024)",
      },
      {
        headline: "Readmission penalties reach most hospitals",
        description:
          "CMS readmission penalties run $320 million to $563 million a year and hit roughly three quarters of evaluated hospitals. A communication-centered discharge cut 30-day utilization about 30% in a randomized trial (Project RED, Annals of Internal Medicine 2009), and teach-back education cut heart failure readmissions with an odds ratio of 0.40 (meta-analysis, Patient Education and Counseling 2023).",
        stat: "$320M-$563M",
        statSource:
          "Annual CMS readmission penalties, reaching roughly three quarters of evaluated hospitals (KFF and Definitive Healthcare)",
      },
      {
        headline: "Adherence tracks with how the clinician talks",
        description:
          "Physician communication training raises the odds of patient adherence 1.62 times (Zolnierek and DiMatteo, Medical Care 2009), and the Joint Commission has repeatedly named communication a leading root cause of sentinel events in Sentinel Event Alert 58. Quality leaders know the mechanism. What has been missing is a way to give thousands of clinicians repetitions on it.",
        stat: "1.62x",
        statSource:
          "Odds of patient adherence after physician communication training (Zolnierek and DiMatteo, Medical Care 2009)",
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
        title: "Practice on the Measures That Carry Payment Weight",
        description:
          "Five of the eight HCAHPS measures Medicare pays on are communication measures, about 15.6% of a hospital's value-based purchasing score (CMS). Clinicians rehearse those conversations by voice, on demand, with feedback scored against published communication frameworks such as Calgary-Cambridge. The scoring is framework-based and is not a prediction of a survey score.",
      },
      {
        title: "Teach-Back, Rehearsed Before the Shift",
        description:
          "Teach-back education cut heart failure readmissions with an odds ratio of 0.40 in a 2023 meta-analysis (Patient Education and Counseling), and a communication-centered discharge cut 30-day utilization about 30% in a randomized trial (Project RED, Annals of Internal Medicine 2009). Clinicians run the sequence until it holds under time pressure.",
      },
      {
        title: "A Record Per Clinician, Not a Completion Rate",
        description:
          "Every session generates a timestamped, rubric-scored record of which conversation a clinician practiced and how it went, so quality reporting can show practice at the individual and unit level instead of a course completion percentage.",
      },
      {
        title: "Extends the Coaching and Simulation You Already Run",
        description:
          "ClinicalSim adds repetitions between scheduled standardized patient encounters, coaching rounds, and service excellence work rather than standing in for them. Coaches and faculty stay in the loop, reading a dashboard instead of facilitating every session.",
      },
    ],

    faqs: [
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
          "Doctor communication rose 0.8 points from 2007 to 2019, the smallest gain of any HCAHPS domain (Beckett et al., Medical Care 2024). Communication is a performance skill, and the standard interventions have been scripting and reminders rather than repeated practice with feedback. Physician communication training raises the odds of patient adherence 1.62 times (Zolnierek and DiMatteo, Medical Care 2009), which points at practice rather than prompting as the lever.",
      },
      {
        question: "Will this predict our HCAHPS scores?",
        answer:
          "No. ClinicalSim scores a conversation against published communication frameworks, not against HCAHPS items, and we claim no score-to-survey correlation. Benchmarking against outcome data is on our roadmap and is not available today.",
      },
      {
        question: "Does any patient data enter the platform?",
        answer:
          "No. Every patient in every ClinicalSim case is synthetic, authored from the clinical literature rather than from patient records, so no protected health information enters the platform and there is nothing to de-identify. SOC 2 and HIPAA certification are on our funded roadmap and are not yet in place. Full detail is on our trust and compliance page.",
      },
    ],

    relevantSolutionSlugs: ["faculty-development"],

    ctaHeadline: "Give clinicians reps on the measures Medicare pays for.",
    ctaDescription:
      "Request a pilot and see the per-clinician practice record behind the five HCAHPS communication measures.",

    relatedPostSlugs: [
      "why-communication-training-matters",
      "hospital-communication-training-roi",
    ],
  },
]

export function getAllAudiences(): Audience[] {
  return audiences
}

export function getAudienceBySlug(slug: string): Audience | undefined {
  return audiences.find((a) => a.slug === slug)
}
