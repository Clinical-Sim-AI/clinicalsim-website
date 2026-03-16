import {
  Heart,
  MessageCircle,
  Brain,
  Flower2,
  Activity,
  type LucideIcon,
} from "lucide-react"

export interface CptCode {
  code: string
  description: string
  reimbursement: string
  notes?: string
}

export interface StatItem {
  value: string
  label: string
  source?: string
  variant: "warm" | "navy" | "blue" | "success"
}

export interface EvidenceItem {
  studyTitle: string
  journal: string
  year: string
  summary: string
  link?: string
  badges?: string[]
}

export interface RevenueProjection {
  perProvider: {
    value: string
    label: string
    assumption: string
  }
  perInstitution: {
    value: string
    label: string
    assumption: string
  }
  sectionHeading: string
  source?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Solution {
  slug: string
  title: string
  shortTitle: string
  description: string
  icon: LucideIcon
  colorVariant: "warm" | "navy" | "blue" | "success"

  // Hero
  heroSubtitle: string
  heroDescription: string

  // Revenue stats
  revenueStats: StatItem[]

  // CPT codes (optional)
  cptCodes?: CptCode[]

  // Revenue projection ("Do the Math")
  revenueProjection: RevenueProjection

  // Training gap
  trainingGapHeadline: string
  trainingGapDescription: string
  trainingGapBullets: string[]

  // Why simulation works
  simulationBenefits: {
    title: string
    description: string
  }[]

  // Evidence
  evidence: EvidenceItem
  outcomeStats: StatItem[]

  // CTA
  ctaHeadline: string
  ctaDescription: string

  // Related blog posts
  relatedPostSlugs: string[]

  // FAQs (for GEO structured data)
  faqs?: FaqItem[]

  // Last updated date
  lastUpdated?: string

  // Remediation connection (optional)
  remediationCallout?: string
}

const solutions: Solution[] = [
  {
    slug: "advance-care-planning",
    title: "Advance Care Planning Conversations",
    shortTitle: "Advance Care Planning",
    description:
      "Most patients never have an advance care planning conversation with their provider, even though Medicare created dedicated billing codes to make it happen. The bottleneck is training.",
    icon: Heart,
    colorVariant: "warm",

    heroSubtitle: "A conversation every patient deserves, and most providers never feel ready for.",
    heroDescription:
      "Medicare created dedicated billing codes for advance care planning conversations (CPT 99497 and 99498) with no annual frequency cap. Yet fewer than 5% of eligible Medicare beneficiaries have a billed ACP conversation each year. Provider readiness is the missing piece.",

    revenueStats: [
      {
        value: "$87",
        label: "Medicare reimbursement per ACP conversation (CPT 99497)",
        source: "CMS Physician Fee Schedule, 2026",
        variant: "warm",
      },
      {
        value: "No Cap",
        label: "No annual frequency limit on ACP billing under Medicare",
        source: "CMS Medicare Policy",
        variant: "navy",
      },
      {
        value: "<5%",
        label: "of eligible Medicare beneficiaries receive a billed ACP conversation annually",
        source: "Health Affairs, 2021",
        variant: "warm",
      },
    ],

    cptCodes: [
      {
        code: "99497",
        description: "Advance care planning, first 30 minutes",
        reimbursement: "$86.84",
        notes: "Face-to-face with patient/surrogate/family",
      },
      {
        code: "99498",
        description: "Advance care planning, each additional 30 minutes",
        reimbursement: "$74.83",
        notes: "Add-on code, use with 99497",
      },
    ],

    revenueProjection: {
      sectionHeading: "What this means for your health system",
      perProvider: {
        value: "$4,200",
        label: "per PCP per year",
        assumption: "Based on 48 ACP conversations/year at $87 each (conservative pace)",
      },
      perInstitution: {
        value: "$630K",
        label: "for a 75-PCP health system",
        assumption: "At moderate billing pace of 96 conversations per provider/year",
      },
      source: "JAMA Health Forum 2024: ACP training increased billing 11x (1.3% to 14%)",
    },

    trainingGapHeadline: "The conversation nobody practices.",
    trainingGapDescription:
      "Advance care planning is a clinical service with dedicated Medicare billing codes, yet most providers have never practiced it in a structured setting. The result: eligible patients go without documented preferences, families face crisis-point decisions without guidance, and hospitals miss conversations that Medicare specifically created billing codes to encourage.",
    trainingGapBullets: [
      "Most internal medicine and family medicine residencies offer no dedicated ACP training module",
      "Providers cite discomfort and lack of confidence as the primary barrier to initiating ACP",
      "The average ACP conversation takes 16 minutes (well within the billing window) when providers are trained",
      "Simulation-based training improves provider confidence in ACP conversations",
    ],

    simulationBenefits: [
      {
        title: "Practice the Full Conversation",
        description:
          "Simulate complete ACP discussions, from opening the topic to documenting preferences, in a realistic, voice-based format.",
      },
      {
        title: "From Practice to Action",
        description:
          "Providers who've practiced ACP conversations are more likely to initiate them consistently and document them appropriately.",
      },
      {
        title: "Reduce Family Conflict",
        description:
          "Trained providers facilitate clearer preference documentation, reducing crisis-point family disagreements.",
      },
      {
        title: "Scale Across Departments",
        description:
          "Deploy ACP training across primary care, hospitalist, and palliative care teams without scheduling constraints.",
      },
    ],

    evidence: {
      studyTitle:
        "The Effects of Advance Care Planning on End-of-Life Care: A Systematic Review",
      journal: "Palliative Medicine",
      year: "2014",
      summary:
        "Systematic review of 113 studies found that advance care planning decreased life-sustaining treatment, increased hospice and palliative care use, and prevented hospitalization. Complex ACP interventions increased compliance with patients' end-of-life wishes.",
      badges: ["Systematic Review", "113 Studies Analyzed"],
    },

    outcomeStats: [
      {
        value: "86%",
        label: "of patients who received ACP had end-of-life wishes known and followed",
        source: "Detering et al., BMJ, 2010",
        variant: "success",
      },
      {
        value: "68%",
        label: "reduction in ICU admission rates when end-of-life discussions occur",
        source: "Wright et al., JAMA, 2008",
        variant: "success",
      },
      {
        value: "$4,908",
        label: "average savings per admission with palliative care consultation",
        source: "Morrison et al., Archives of Internal Medicine, 2008",
        variant: "warm",
      },
    ],

    ctaHeadline: "Give every patient the conversation they deserve.",
    ctaDescription:
      "ClinicalSim helps providers practice ACP conversations so they're confident enough to have them early, have them often, and have them well.",

    relatedPostSlugs: [
      "end-of-life-care-communication",
      "hospital-communication-training-roi",
    ],

    faqs: [
      {
        question: "What is advance care planning?",
        answer: "Advance care planning (ACP) is a process in which patients, their families, and their healthcare providers discuss and document preferences for future medical care, particularly care desired near the end of life. ACP conversations cover topics like resuscitation preferences, comfort care goals, and designation of a healthcare proxy. Medicare reimburses these conversations under CPT codes 99497 and 99498.",
      },
      {
        question: "What are the CPT codes for advance care planning?",
        answer: "Medicare reimburses advance care planning under two CPT codes: 99497 covers the first 30 minutes of face-to-face ACP discussion ($86.84 reimbursement), and 99498 is an add-on code for each additional 30 minutes ($74.83). There is no annual frequency limit on ACP billing under Medicare.",
      },
      {
        question: "How much does Medicare reimburse for ACP conversations?",
        answer: "Medicare reimburses approximately $87 for the initial 30-minute ACP conversation (CPT 99497) and $75 for each additional 30 minutes (CPT 99498). There is no annual cap, so providers can bill for ACP conversations as often as clinically appropriate. Despite this, fewer than 5% of eligible Medicare beneficiaries receive a billed ACP conversation annually (Health Affairs, 2021).",
      },
      {
        question: "Why don't more providers bill for advance care planning?",
        answer: "The primary barrier to ACP billing is provider readiness. Most internal medicine and family medicine residencies offer no dedicated ACP training module, and providers consistently cite discomfort and lack of confidence as the main reason they avoid initiating ACP conversations. When providers receive structured ACP training, billing rates increase substantially. One study in JAMA Health Forum (2024) found that ACP training increased billing 11x, from 1.3% to 14% of eligible visits.",
      },
    ],

    lastUpdated: "2026-03-16",

    remediationCallout:
      "Advance care planning conversations are among the most common communication scenarios assigned during remediation. ClinicalSim provides structured, repeatable practice for residents working to demonstrate competence in discussing patient preferences and end-of-life care.",
  },

  {
    slug: "chronic-care-management",
    title: "Chronic Care Management Enrollment Conversations",
    shortTitle: "Chronic Care Management",
    description:
      "67% of Medicare beneficiaries qualify for chronic care coordination, but only 3-5% receive it. Millions of patients with complex chronic conditions go without structured support because the enrollment conversation never happens.",
    icon: Activity,
    colorVariant: "warm",

    heroSubtitle: "Millions of patients qualify for coordinated care. Almost none receive it.",
    heroDescription:
      "Chronic Care Management (CCM) was created so patients with multiple chronic conditions could receive structured, ongoing care coordination between visits. Two-thirds of Medicare beneficiaries qualify, yet only 3-5% are enrolled. The enrollment conversation is what's missing. Providers lack confidence in explaining the program, addressing the 20% coinsurance, and obtaining consent. Millions of patients end up managing complex conditions without the coordinated support Medicare designed for them.",

    revenueStats: [
      {
        value: "67%",
        label: "of Medicare beneficiaries qualify for CCM (2+ chronic conditions)",
        source: "ASPE data; CMS",
        variant: "warm",
      },
      {
        value: "3-5%",
        label: "of eligible Medicare patients currently enrolled in CCM",
        source: "ASPE, 2019",
        variant: "navy",
      },
      {
        value: "$55,800",
        label: "per provider per year at moderate CCM enrollment (50 patients)",
        source: "CMS Physician Fee Schedule; program modeling",
        variant: "warm",
      },
    ],

    cptCodes: [
      {
        code: "99490",
        description: "Chronic care management, first 20 minutes of clinical staff time",
        reimbursement: "~$62/mo",
        notes: "Non-face-to-face care coordination for patients with 2+ chronic conditions",
      },
      {
        code: "99491",
        description: "Chronic care management, first 30 minutes of physician/QHP time",
        reimbursement: "~$92/mo",
        notes: "Requires physician or qualified health professional direct time",
      },
      {
        code: "99437",
        description: "Chronic care management, each additional 30 minutes of clinical staff time",
        reimbursement: "~$70/mo",
        notes: "Add-on to 99490 for complex patients requiring more coordination",
      },
      {
        code: "99439",
        description: "Chronic care management, each additional 20 minutes of clinical staff time",
        reimbursement: "~$48/mo",
        notes: "Add-on to 99490 for additional care coordination time",
      },
    ],

    revenueProjection: {
      sectionHeading: "What this means for your health system",
      perProvider: {
        value: "$22K-$126K",
        label: "per provider per year",
        assumption: "Range from conservative (20 patients, 99490 only) to comprehensive (100 patients, full code stacking)",
      },
      perInstitution: {
        value: "$4.2M",
        label: "for a 75-PCP health system",
        assumption: "At moderate enrollment of 50 patients per provider billing 99490 monthly",
      },
      source: "CMS Physician Fee Schedule; ASPE CCM utilization analysis",
    },

    trainingGapHeadline: "The enrollment conversation nobody teaches.",
    trainingGapDescription:
      "CCM is the single largest untapped billing opportunity in primary care, and it requires an enrollment conversation that most providers have never practiced. Explaining what CCM is, why it matters, how the 20% coinsurance works, and obtaining informed consent is a distinct clinical communication skill that residency programs don't teach.",
    trainingGapBullets: [
      "No standard residency curriculum covers CCM enrollment conversations or consent documentation workflows",
      "Providers cite uncertainty about explaining the 20% patient coinsurance as a top barrier to enrollment",
      "Practice staff lack scripts for the initial outreach call that identifies and engages eligible patients",
      "Documentation requirements (care plan creation, monthly time tracking) are unfamiliar to most providers",
    ],

    simulationBenefits: [
      {
        title: "Practice Enrollment Scripts",
        description:
          "Simulate the complete CCM enrollment conversation: explaining the program, addressing coinsurance concerns, and obtaining informed consent.",
      },
      {
        title: "Build Recurring Revenue",
        description:
          "CCM generates monthly recurring revenue per enrolled patient. Even modest enrollment creates a significant, predictable revenue stream.",
      },
      {
        title: "Improve Patient Outcomes",
        description:
          "Enrolled CCM patients see fewer hospitalizations and better chronic disease management through structured care coordination.",
      },
      {
        title: "Scale Across Your Panel",
        description:
          "Train every provider and care coordinator in enrollment conversations, turning a one-time initiative into a system-wide capability.",
      },
    ],

    evidence: {
      studyTitle:
        "Evaluation of the Multi-Payer Advanced Primary Care Practice (MAPCP) Demonstration: Final Report",
      journal: "Mathematica Policy Research (for CMS)",
      year: "2017",
      summary:
        "CMS-commissioned evaluation of comprehensive primary care models found that chronic care management programs reduced hospitalizations by 32 per 1,000 beneficiaries at 6 months and generated $74 per member per month in savings through reduced acute care utilization.",
      badges: ["CMS-Commissioned", "Multi-State Evaluation"],
    },

    outcomeStats: [
      {
        value: "32 fewer",
        label: "hospitalizations per 1,000 beneficiaries at 6 months",
        source: "Mathematica/CMS MAPCP evaluation",
        variant: "success",
      },
      {
        value: "$74",
        label: "per member per month in savings from reduced acute utilization",
        source: "Mathematica/CMS MAPCP evaluation",
        variant: "warm",
      },
      {
        value: "67%",
        label: "of Medicare beneficiaries have 2+ chronic conditions qualifying for CCM",
        source: "ASPE; CMS data",
        variant: "navy",
      },
    ],

    ctaHeadline: "Give your patients the coordinated care they qualify for.",
    ctaDescription:
      "ClinicalSim trains providers and care coordinators to confidently enroll patients in CCM, so the patients who need structured chronic care actually receive it.",

    relatedPostSlugs: [
      "hospital-communication-training-roi",
    ],

    faqs: [
      {
        question: "What is Chronic Care Management (CCM)?",
        answer: "Chronic Care Management (CCM) is a Medicare program that reimburses providers for non-face-to-face care coordination for patients with two or more chronic conditions. It covers activities like care plan development, medication management, and coordination between specialists. Medicare reimburses CCM monthly under CPT codes 99490 (~$62/month), 99491 (~$92/month), 99437 (~$70/month), and 99439 (~$48/month). Despite 67% of Medicare beneficiaries qualifying, only 3-5% are currently enrolled (ASPE, 2019).",
      },
      {
        question: "Who qualifies for CCM services?",
        answer: "Medicare beneficiaries with two or more chronic conditions expected to last at least 12 months (or until death) qualify for CCM services. Common qualifying conditions include diabetes, hypertension, heart failure, COPD, depression, and arthritis. Approximately 67% of all Medicare beneficiaries meet this threshold (ASPE data; CMS). Patients must provide consent to enroll, and that consent conversation is exactly what providers need to practice.",
      },
      {
        question: "What are the CPT codes for Chronic Care Management?",
        answer: "The primary CCM billing codes are: CPT 99490 (~$62/month) for the first 20 minutes of clinical staff time; CPT 99491 (~$92/month) for the first 30 minutes of physician/QHP time; CPT 99437 (~$70/month) as an add-on for each additional 30 minutes of clinical staff time; and CPT 99439 (~$48/month) as an add-on for each additional 20 minutes. A single complex patient can generate $130+ per month through code stacking.",
      },
      {
        question: "Why is CCM so underutilized?",
        answer: "Despite two-thirds of Medicare beneficiaries qualifying, only 3-5% are enrolled in CCM (ASPE, 2019). Providers lack confidence in the enrollment conversation, particularly explaining the 20% patient coinsurance. No standard residency curriculum covers CCM enrollment. Practices lack established workflows for identifying eligible patients and obtaining consent. And documentation requirements (care plan creation, monthly time tracking) are unfamiliar. Together, these gaps leave billions in recurring revenue unrealized.",
      },
    ],

    lastUpdated: "2026-03-16",

    remediationCallout:
      "CCM enrollment conversations require the same structured communication skills that remediation programs target. ClinicalSim helps residents practice explaining complex programs, addressing patient concerns, and obtaining informed consent.",
  },

  {
    slug: "goals-of-care",
    title: "Goals-of-Care & Serious Illness Conversations",
    shortTitle: "Goals of Care",
    description:
      "Communication failures drive 66% of sentinel events. Structured serious illness conversations reduce ICU costs by thousands per patient.",
    icon: MessageCircle,
    colorVariant: "navy",

    heroSubtitle: "The highest-stakes conversation in medicine, and the least practiced.",
    heroDescription:
      "Goals-of-care conversations directly determine whether patients receive care aligned with their values. When these conversations happen well, ICU utilization drops, patient satisfaction rises, and malpractice exposure shrinks. When they don't happen, or happen poorly, patients receive care misaligned with their values, families are left in crisis, and hospitals absorb the downstream cost.",

    revenueStats: [
      {
        value: "$4,908",
        label: "average savings per admission with palliative care consultation",
        source: "Morrison et al., Archives of Internal Medicine, 2008",
        variant: "warm",
      },
      {
        value: "66%",
        label: "of sentinel events involved communication failures as root cause (1995-2005)",
        source: "The Joint Commission",
        variant: "navy",
      },
      {
        value: "$1.7B",
        label: "in malpractice costs linked to communication breakdowns over five years",
        source: "CRICO Benchmarking Report, 2009-2013",
        variant: "warm",
      },
    ],

    revenueProjection: {
      sectionHeading: "What this means for your institution",
      perProvider: {
        value: "$4,908",
        label: "in potential savings per palliative care consult",
        assumption: "Average cost savings for patients who died in hospital (Morrison et al., 2008)",
      },
      perInstitution: {
        value: "$2.25M",
        label: "per year in avoided ICU costs for a 300-bed hospital",
        assumption: "Based on 3,000 ICU admissions/year with 5% averted at ~$15,000 average ICU stay",
      },
      source: "Annals of ATS 2020; Morrison et al., Archives of Internal Medicine, 2008",
    },

    trainingGapHeadline: "Two hours of training for a career of difficult conversations.",
    trainingGapDescription:
      "The average resident receives fewer than two hours of formal training in serious illness conversations across their entire residency. Yet these conversations determine ICU utilization, goal-concordant care rates, and family satisfaction scores. The mismatch between stakes and preparation is staggering.",
    trainingGapBullets: [
      "Only 29% of seriously ill patients report having had a goals-of-care conversation with their provider",
      "Residents consistently rate goals-of-care as their lowest-confidence communication skill",
      "The Serious Illness Conversation Guide (SICG) from Ariadne Labs improves outcomes but requires practice to implement effectively",
      "Simulation-based communication training improves performance on validated assessment tools within a single session",
    ],

    simulationBenefits: [
      {
        title: "Practice the SICG Framework",
        description:
          "Simulate conversations using the Serious Illness Conversation Guide structure: understanding, preferences, prognosis, and recommendations.",
      },
      {
        title: "Reduce Avoidable ICU Days",
        description:
          "Providers trained in goals-of-care conversations drive earlier hospice enrollment and fewer unwanted interventions.",
      },
      {
        title: "Lower Malpractice Exposure",
        description:
          "Better communication reduces the 40% of malpractice claims driven by communication failures.",
      },
      {
        title: "Improve HCAHPS Scores",
        description:
          "Structured communication training directly impacts patient experience metrics tied to hospital reimbursement.",
      },
    ],

    evidence: {
      studyTitle:
        "Associations Between End-of-Life Discussions, Patient Mental Health, Medical Care Near Death, and Caregiver Bereavement Adjustment",
      journal: "JAMA",
      year: "2008",
      summary:
        "Landmark study showing end-of-life discussions were associated with lower rates of ventilation (1.6% vs 11.0%), resuscitation (0.8% vs 6.7%), and ICU admission (4.1% vs 12.4%), plus earlier hospice enrollment.",
      badges: ["Prospective Cohort", "Published in JAMA"],
    },

    outcomeStats: [
      {
        value: "3x",
        label: "reduction in ICU admissions when goals-of-care conversations occur",
        source: "Wright et al., JAMA, 2008",
        variant: "success",
      },
      {
        value: "$1,696",
        label: "direct cost savings per admission for discharged patients",
        source: "Morrison et al., Archives of Internal Medicine, 2008",
        variant: "warm",
      },
      {
        value: "86%",
        label: "of patients had wishes followed after structured ACP intervention",
        source: "Detering et al., BMJ, 2010",
        variant: "success",
      },
    ],

    ctaHeadline: "Train the conversation that drives every downstream decision.",
    ctaDescription:
      "ClinicalSim gives your teams unlimited practice with the conversations that determine family satisfaction, care quality, and institutional risk.",

    relatedPostSlugs: [
      "breaking-bad-news-medical-training",
      "end-of-life-care-communication",
      "hospital-communication-training-roi",
    ],

    faqs: [
      {
        question: "What is a goals-of-care conversation?",
        answer: "A goals-of-care conversation is a structured clinical discussion in which a provider explores a seriously ill patient's values, understanding of their illness, and preferences for future treatment. These conversations help align medical care with what matters most to the patient, whether that's pursuing aggressive treatment, focusing on comfort, or something in between. The Serious Illness Conversation Guide (SICG) from Ariadne Labs is a widely used framework for conducting these conversations.",
      },
      {
        question: "How do goals-of-care conversations reduce ICU costs?",
        answer: "Goals-of-care conversations reduce ICU costs by helping patients make informed decisions that often lead to less aggressive interventions. A JAMA study (Wright et al., 2008) found that end-of-life discussions were associated with 3x lower ICU admission rates (4.1% vs 12.4%). Palliative care consultation, which centers on goals-of-care conversations, saves an average of $4,908 per admission for patients who die in hospital (Morrison et al., Archives of Internal Medicine, 2008).",
      },
      {
        question: "What is the Serious Illness Conversation Guide?",
        answer: "The Serious Illness Conversation Guide (SICG) is a structured communication framework developed by Ariadne Labs to help clinicians have more effective conversations with seriously ill patients. The guide covers understanding the patient's awareness of their illness, exploring their values and priorities, sharing prognostic information, and making treatment recommendations. Studies show the SICG improves outcomes, but providers need practice to implement it effectively.",
      },
      {
        question: "What percentage of malpractice claims involve communication failures?",
        answer: "Communication failures were the root cause of 66% of sentinel events reported to The Joint Commission (1995-2005), and drive approximately 40% of malpractice claims (Candello, 2025). CRICO found that communication breakdowns contributed to $1.7 billion in malpractice costs over a five-year period (2009-2013). Communication-related malpractice cases have 39% greater odds of closing with an indemnity payment compared to non-communication-related cases (Candello, 2025).",
      },
    ],

    lastUpdated: "2026-03-16",

    remediationCallout:
      "Goals-of-care conversations are the highest-stakes communication scenario in clinical practice and among the most common triggers for communication remediation. ClinicalSim provides unlimited practice for residents working to meet ICS milestone expectations.",
  },

  {
    slug: "cognitive-assessments",
    title: "Cognitive Assessments & Dementia Diagnosis Conversations",
    shortTitle: "Cognitive Assessments",
    description:
      "Over half of cognitive impairment cases in primary care go undiagnosed, even though Medicare reimburses comprehensive cognitive assessment. Provider confidence is the missing piece.",
    icon: Brain,
    colorVariant: "blue",

    heroSubtitle: "A critical diagnosis conversation most primary care providers avoid.",
    heroDescription:
      "Over 7 million Americans are living with Alzheimer's, and over half of cognitive impairment cases in primary care go undiagnosed. Medicare reimburses comprehensive cognitive assessment and care planning (CPT 99483) at approximately $260 per visit, but millions of patients are going without a diagnosis. Provider readiness is the barrier.",

    revenueStats: [
      {
        value: "~$260",
        label: "Medicare reimbursement for cognitive assessment and care planning (CPT 99483)",
        source: "CMS Medicare Fee Schedule",
        variant: "warm",
      },
      {
        value: "50%+",
        label: "of cognitive impairment cases in primary care go undiagnosed",
        source: "JPAD, 2024",
        variant: "navy",
      },
      {
        value: "$384B",
        label: "annual US cost of Alzheimer's and dementia care in 2025",
        source: "Alzheimer's Association, 2025",
        variant: "warm",
      },
    ],

    cptCodes: [
      {
        code: "99483",
        description:
          "Assessment and care plan for patient with cognitive impairment (approximately 60 minutes)",
        reimbursement: "~$260",
        notes:
          "Includes cognition-focused evaluation, functional assessment, care plan creation, and advance care planning",
      },
    ],

    revenueProjection: {
      sectionHeading: "What this means for your health system",
      perProvider: {
        value: "$6,200",
        label: "per PCP per year",
        assumption: "Based on 24 cognitive assessments/year at ~$260 each (conservative pace)",
      },
      perInstitution: {
        value: "$1M+",
        label: "for a 75-PCP health system",
        assumption: "At moderate billing pace of 48 assessments per provider/year",
      },
      source: "GAO 2024: Utilization tripled 2018-2022 but remains under 3% of eligible population",
    },

    trainingGapHeadline: "Most providers avoid the diagnosis conversation entirely.",
    trainingGapDescription:
      "Delivering a cognitive impairment or dementia diagnosis is one of the most emotionally complex conversations in primary care. Without training, providers default to avoidance: skipping screening, deferring referrals, and leaving the 99483 code unbilled. The GAO found that while utilization tripled between 2018 and 2022, it remains a fraction of the eligible population.",
    trainingGapBullets: [
      "Over a quarter of primary care clinicians had zero patients with a diagnosed mild cognitive impairment in their panel, despite 20% expected prevalence (Liu et al., JPAD, 2024)",
      "GAO found 99483 utilization tripled from 2018–2022 but challenges with provider training remain the primary barrier",
      "Only 8% of expected cognitive impairment cases are actually diagnosed in primary care",
      "Providers report the diagnosis disclosure conversation as the primary reason they avoid formal cognitive assessment",
    ],

    simulationBenefits: [
      {
        title: "Practice Diagnosis Disclosure",
        description:
          "Simulate delivering cognitive impairment results to patients and families with empathy, clarity, and appropriate next steps.",
      },
      {
        title: "Build Clinical Confidence",
        description:
          "Providers who've practiced the full assessment conversation are more likely to complete the comprehensive evaluation and document it appropriately.",
      },
      {
        title: "Connect Screening to Action",
        description:
          "Train the conversation that connects a cognitive screen to a comprehensive care plan, including diagnosis, family support, and documented next steps.",
      },
      {
        title: "Support Caregivers",
        description:
          "Practice family conversations that address caregiver burden, safety planning, and community resource referrals.",
      },
    ],

    evidence: {
      studyTitle:
        "Medicare Cognitive Assessments: Utilization Tripled Between 2018 and 2022, but Challenges Remain",
      journal: "U.S. Government Accountability Office",
      year: "2024",
      summary:
        "GAO investigation found that while cognitive assessment utilization tripled between 2018 and 2022, significant barriers remain, primarily provider training and confidence in conducting the assessment and delivering results.",
      link: "https://www.gao.gov/products/gao-24-106328",
      badges: ["GAO Report", "Federal Investigation"],
    },

    outcomeStats: [
      {
        value: "3x",
        label: "higher Medicare costs per beneficiary with dementia vs. without",
        source: "Alzheimer's Association, 2025",
        variant: "navy",
      },
      {
        value: "7.2M",
        label: "Americans living with Alzheimer's disease",
        source: "Alzheimer's Association, 2025",
        variant: "blue",
      },
      {
        value: "$413B",
        label: "value of unpaid dementia caregiving annually",
        source: "Alzheimer's Association, 2025",
        variant: "warm",
      },
    ],

    ctaHeadline: "Close the gap between screening and diagnosis.",
    ctaDescription:
      "ClinicalSim trains providers to conduct cognitive assessments confidently, so they screen, diagnose, support families, and document care appropriately.",

    relatedPostSlugs: [
      "hospital-communication-training-roi",
      "why-communication-training-matters",
    ],

    faqs: [
      {
        question: "What is CPT 99483?",
        answer: "CPT 99483 is the Medicare billing code for a comprehensive cognitive assessment and care plan. It covers approximately 60 minutes of face-to-face time and reimburses at roughly $260. The assessment includes cognition-focused evaluation, functional assessment, care plan creation, and advance care planning. Despite its availability, utilization remains low. The GAO found that while usage tripled between 2018 and 2022, it covers fewer than 3% of the eligible population.",
      },
      {
        question: "Why is cognitive impairment underdiagnosed?",
        answer: "Over 50% of cognitive impairment cases in primary care go undiagnosed, with recent research suggesting the MCI detection rate may be as low as 8% (Liu et al., JPAD, 2024). The primary barrier is provider readiness. Over a quarter of primary care clinicians had zero patients with a diagnosed mild cognitive impairment in their panel, despite 20% expected prevalence. Providers report the diagnosis disclosure conversation as the primary reason they avoid formal cognitive assessment.",
      },
      {
        question: "How much does Medicare pay for cognitive assessment?",
        answer: "Medicare reimburses approximately $260 for a comprehensive cognitive assessment and care plan under CPT 99483. This covers approximately 60 minutes and includes cognition-focused evaluation, functional assessment, care plan creation, and advance care planning. For a 75-PCP health system with moderate billing, this represents over $1M in annual revenue opportunity (GAO 2024).",
      },
      {
        question: "What is the cost of dementia care in the United States?",
        answer: "Alzheimer's and dementia care costs the US $384 billion annually (Alzheimer's Association, 2025). Medicare beneficiaries with dementia cost 3x more than those without. Unpaid dementia caregiving is valued at another $413 billion annually. Over 7.2 million Americans are currently living with Alzheimer's disease (Alzheimer's Association, 2025), and earlier diagnosis through cognitive assessment can improve care planning and reduce crisis-driven costs.",
      },
    ],

    lastUpdated: "2026-03-16",

    remediationCallout:
      "Cognitive assessment disclosure conversations require empathy, clarity, and structured communication — the same competencies that ICS remediation targets. ClinicalSim helps residents practice delivering difficult diagnostic information with milestone-aligned feedback.",
  },

  {
    slug: "menopause-care",
    title: "Menopause & Midlife Women's Health Conversations",
    shortTitle: "Menopause Care",
    description:
      "Over 50 million American women are in perimenopause or menopause, and fewer than 1% of providers are certified to help them. Training is the gap.",
    icon: Flower2,
    colorVariant: "success",

    heroSubtitle: "A generation of women underserved, with almost no providers trained to help.",
    heroDescription:
      "Over 1.3 million American women enter menopause every year, and the vast majority can't find a provider who knows how to help them. Fewer than 1% of US physicians are certified menopause practitioners. NPs and PAs, who provide the majority of primary care visits, face the same training gap. BCG projects the menopause market will reach $40 billion. Hospitals that train providers in menopause conversations will be able to serve a patient population that currently has nowhere to turn.",

    revenueStats: [
      {
        value: "$40B+",
        label: "projected menopause market opportunity",
        source: "BCG, 2025",
        variant: "warm",
      },
      {
        value: "<1%",
        label: "of US physicians are certified menopause practitioners",
        source: "BCG, 2025",
        variant: "navy",
      },
      {
        value: "<7%",
        label: "of residents in key specialties feel prepared to support menopausal patients",
        source: "BCG, 2025",
        variant: "warm",
      },
    ],

    revenueProjection: {
      sectionHeading: "What this means for your practice",
      perProvider: {
        value: "$500-$800",
        label: "in visit revenue per menopause patient per year",
        assumption: "Initial consultation plus 2-3 follow-ups at commercial rates",
      },
      perInstitution: {
        value: "$500K-$750K",
        label: "per year for 10 trained OB/GYNs",
        assumption: "Each seeing 15 menopause patients/week = 7,500 patient-visits/year, plus downstream referrals",
      },
      source: "Midi Health reached $150M run rate / 25,000 patients per week, confirming market demand (Midi Health Series C, October 2025)",
    },

    trainingGapHeadline: "69% of OB/GYN residencies have no menopause curriculum.",
    trainingGapDescription:
      "A 2023 survey of US OB/GYN residency program directors found that only 31.3% reported having a menopause curriculum. A generation of clinicians is entering practice unprepared to manage the most common midlife health transition, sending patients to direct-to-consumer alternatives or out of the health system entirely.",
    trainingGapBullets: [
      "Only 31% of OB/GYN residency programs include a dedicated menopause curriculum",
      "Fewer than 1% of actively licensed US physicians hold Menopause Society certification (BCG, 2025)",
      "1 in 3 women don't feel confident advocating for themselves in menopause-related healthcare visits (Bonafide Health, State of Menopause 2025)",
      "Women frequently report being dismissed by providers, with symptoms incorrectly attributed to anxiety or aging",
    ],

    simulationBenefits: [
      {
        title: "Practice Symptom Assessment",
        description:
          "Simulate comprehensive menopause intake conversations covering vasomotor symptoms, mood changes, sleep disruption, and sexual health.",
      },
      {
        title: "Build Treatment Confidence",
        description:
          "Practice discussing hormone therapy options, risks, benefits, and contraindications in a judgment-free environment.",
      },
      {
        title: "Keep Patients in Care",
        description:
          "Providers who listen effectively and offer evidence-based guidance build the trust that keeps patients engaged and in the system.",
      },
      {
        title: "Lead in Women's Health",
        description:
          "Hospitals that build menopause competency now will become the trusted resource for a patient population that's currently underserved and growing.",
      },
    ],

    evidence: {
      studyTitle:
        "Needs Assessment of Menopause Education in United States Obstetrics and Gynecology Residency Training Programs",
      journal: "Menopause",
      year: "2023",
      summary:
        "Survey of 145 OB/GYN residency program directors (68.3% response rate) found that only 31.3% had a dedicated menopause curriculum, confirming the need for structured menopause education in residency training.",
      badges: ["Peer-Reviewed", "National Survey"],
    },

    outcomeStats: [
      {
        value: "~54M",
        label: "US women currently in perimenopause or menopause",
        source: "US Census / Menopause Society",
        variant: "success",
      },
      {
        value: "1.3M",
        label: "American women enter menopause each year",
        source: "The Menopause Society",
        variant: "blue",
      },
      {
        value: "85%",
        label: "of menopausal women experience symptoms during the menopause transition",
        source: "The Menopause Society",
        variant: "warm",
      },
    ],

    ctaHeadline: "Build the menopause practice your community needs.",
    ctaDescription:
      "ClinicalSim trains providers in menopause conversations so you can serve the patients who currently have nowhere to turn.",

    relatedPostSlugs: [
      "hospital-communication-training-roi",
      "why-communication-training-matters",
    ],

    faqs: [
      {
        question: "Why are so few providers trained in menopause care?",
        answer: "A 2023 survey of US OB/GYN residency program directors found that only 31.3% reported having a dedicated menopause curriculum (Menopause, 2023). Nearly 69% of OB/GYN residencies graduate physicians with no structured menopause training, and NP and PA programs have similarly sparse menopause education. Fewer than 1% of actively licensed US physicians are certified menopause practitioners (BCG, 2025). Fewer than 7% of residents in these specialties feel prepared to support menopausal patients (BCG, 2025).",
      },
      {
        question: "What percentage of OB/GYN residencies teach menopause?",
        answer: "Only 31.3% of OB/GYN residency programs include a dedicated menopause curriculum, according to a 2023 national survey published in Menopause (68.3% response rate, 145 program directors surveyed). This gap leaves the majority of graduating OB/GYNs unprepared to manage the most common midlife health transition affecting approximately 54 million American women.",
      },
      {
        question: "What is the menopause care gap?",
        answer: "The menopause care gap refers to the disconnect between the large population of women needing menopause care (~54 million in the US, with 1.3M entering menopause each year) and the small number of providers trained to help them (fewer than 1% of US physicians are certified menopause practitioners, per BCG 2025). 85% of menopausal women experience symptoms, yet 1 in 3 women don't feel confident advocating for themselves in menopause-related healthcare visits (Bonafide Health, State of Menopause 2025). BCG projects the menopause market could reach $40B+ as demand grows.",
      },
      {
        question: "How can hospitals build menopause care programs?",
        answer: "Hospitals can build menopause care programs by training existing OB/GYN, primary care, and internal medicine providers in menopause symptom assessment, hormone therapy discussion, and patient communication. Midi Health reached $150M in run rate serving 25,000 menopause patients per week, confirming strong market demand (Midi Health Series C, October 2025). A health system with 10 trained OB/GYNs seeing 15 menopause patients per week can generate $500K-$750K in annual visit revenue, plus downstream referrals.",
      },
    ],

    lastUpdated: "2026-03-16",

    remediationCallout:
      "Menopause care conversations require providers to listen actively, validate patient concerns, and discuss treatment options clearly — core ICS competencies that remediation programs work to develop.",
  },
]

export function getAllSolutions(): Solution[] {
  return solutions
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}
