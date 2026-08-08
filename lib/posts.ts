export interface Post {
  slug: string
  title: string
  description: string
  date: string
  author: string
  readingTime: string
  tags: string[]
  authorId?: string
  dateModified?: string
  /**
   * Name of a credentialed clinical reviewer for "Medically reviewed by"
   * attribution on clinical posts. Populate only with a real reviewer who has
   * actually reviewed the content, never fabricate. Optional reviewedDate is
   * an ISO date string.
   */
  reviewedBy?: string
  reviewedDate?: string
}

const posts: Post[] = [
  {
    slug: "eol-communication-training-measurement-gap",
    title: "Six of 105: Why End-of-Life Communication Training Has a Measurement Problem",
    description: "A pediatric intensivist and palliative care physician explains why end-of-life communication training needs shared objectives, consistent measures, and feedback tied to observable behavior.",
    date: "2026-06-09",
    dateModified: "2026-07-18",
    author: "Lauren Rissman, MD",
    authorId: "lauren-rissman",
    readingTime: "8 min read",
    tags: ["end-of-life", "palliative-care", "communication-training", "pediatrics", "simulation", "AI", "medical-education", "OSCE"],
  },
  {
    slug: "breaking-bad-news-practice-not-knowledge",
    title: "Breaking Bad News Is a Practice Problem, Not a Knowledge Problem",
    description: "Residents who score well on written exams still freeze in real conversations. Only 17.6% of residents report formal training in breaking bad news, and the gap isn't knowledge, it's comfort. Communication skills improve through repetition and feedback in realistic scenarios, not lectures.",
    date: "2026-05-19",
    dateModified: "2026-07-18",
    author: "ClinicalSim Team",
    readingTime: "8 min read",
    tags: ["breaking-bad-news", "communication-training", "SPIKES", "Calgary-Cambridge", "Kalamazoo", "simulation", "deliberate-practice", "medical-education", "remediation"],
  },
  {
    slug: "what-programs-lost-when-step-2-cs-disappeared",
    title: "What Programs Lost When Step 2 CS Disappeared, and What Hasn't Replaced It",
    description: "USMLE Step 2 CS was permanently discontinued in 2021 with no national successor for assessing clinical communication. This left programs to build local approaches around the expectations in Milestones 2.0.",
    date: "2026-05-11",
    dateModified: "2026-07-18",
    author: "ClinicalSim Team",
    readingTime: "7 min read",
    tags: ["step-2-cs", "communication-assessment", "ACGME", "milestones", "medical-education", "residency", "USMLE"],
  },
  {
    slug: "faculty-hour-problem-communication-remediation",
    title: "The Faculty Hour Problem with Communication Remediation, and Why It Doesn't Scale",
    description: "A published clinical reasoning remediation program required a mean of 29.6 specialist contact hours. Here is what that figure measures, what it leaves out, and how programs can separate practice from faculty coaching.",
    date: "2026-04-07",
    dateModified: "2026-08-07",
    author: "ClinicalSim Team",
    readingTime: "7 min read",
    tags: ["communication-remediation", "faculty-time", "ACGME", "milestones", "medical-education", "residency"],
  },
  {
    slug: "ai-affirming-care-communication-training",
    title: "When Affirming Care Training Disappears, Simulation Has to Fill the Gap",
    description: "A new AI simulation approach presented at IPSS Rome tackles the growing gap in transgender communication training for pediatric residents, where 60% of programs lack direct clinical exposure.",
    date: "2026-03-30",
    dateModified: "2026-08-07",
    author: "ClinicalSim Team",
    readingTime: "6 min read",
    tags: ["ai", "simulation", "communication-training", "affirming-care", "pediatrics"],
  },
  {
    slug: "osce-case-design-guide",
    title: "How to Design Effective OSCE Cases: A Practical Guide for Medical Educators",
    description: "Practical strategies for creating OSCE cases that assess clinical competence, with guidance on case structure, scoring, common pitfalls, and review.",
    date: "2026-03-04",
    dateModified: "2026-08-07",
    author: "ClinicalSim Team",
    readingTime: "10 min read",
    tags: ["OSCE", "case design", "medical education", "assessment"],
  },
  {
    slug: "hospital-communication-training-roi",
    title: "The ROI of Communication Training: By the Numbers",
    description: "Candello found communication factors in 40% of asserted malpractice cases from 2014 through 2024. A credible training business case starts with that exposure and keeps local costs, participation, and outcomes separate.",
    date: "2026-02-04",
    dateModified: "2026-08-07",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["ROI", "communication training", "hospital administration"],
  },
  {
    slug: "healthcare-simulation-technology-trends",
    title: "Where Medical Simulation Is Headed in 2026",
    description: "Medical simulation now includes voice-based AI patients alongside standardized patient, mannequin, and screen-based methods. The useful question is which practice or assessment job each method can do.",
    date: "2026-01-07",
    dateModified: "2026-08-07",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["simulation", "technology trends", "medical education"],
  },
  {
    slug: "breaking-bad-news-medical-training",
    title: "Breaking Bad News: The Skill No One Teaches",
    description: "SPIKES gives clinicians a six-step structure for breaking bad news. Repeated practice shows whether a learner can use that structure while responding to emotion, uncertainty, and questions.",
    date: "2025-10-07",
    dateModified: "2026-08-07",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["breaking bad news", "medical training", "communication"],
  },
  {
    slug: "what-learners-want-from-ai-sps",
    title: "What Medical Learners Actually Want from AI Standardized Patients",
    description: "CHI 2026 research identifies six requirements for AI standardized patient design based on input from the medical students who would use them.",
    date: "2025-12-03",
    dateModified: "2026-07-18",
    author: "ClinicalSim Team",
    readingTime: "6 min read",
    tags: ["research", "AI-SP", "medical education", "HCI"],
  },
  {
    slug: "end-of-life-care-communication",
    title: "End-of-Life Conversations: Practice Makes Progress",
    description: "A systematic review found that end-of-life communication training can improve knowledge, self-efficacy, and simulated performance, while evidence for patient-level outcomes remains insufficient.",
    date: "2025-11-04",
    dateModified: "2026-08-07",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["end-of-life", "palliative care", "communication"],
  },
  {
    slug: "why-communication-training-matters",
    title: "Why Communication Training Matters",
    description: "Candello found that communication factors appeared in 40% of asserted malpractice cases from 2014 through 2024. Training gives clinicians a structured way to practice the conversations behind that exposure.",
    date: "2025-08-12",
    dateModified: "2026-08-04",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["communication", "malpractice", "training gap"],
  },
  {
    slug: "scalability-problem-sp-programs",
    title: "The Scalability Problem with Standardized Patient Programs",
    description: "Standardized patient encounters require actor training, delivery time, space, and faculty support. AI patients can add repeatable voice-based practice between live encounters without replacing them.",
    date: "2025-09-09",
    dateModified: "2026-08-07",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["standardized patients", "cost", "scalability"],
  },
]

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

const SITE_URL = "https://clinicalsim.ai"

/**
 * Build the full Metadata object for an insight post from its slug. Keeps every
 * post's title, description, canonical, OpenGraph, and Twitter tags in sync with
 * the registry in this file so MDX pages don't hand-maintain (and drift on) their
 * own metadata. The title is the bare registry title; the root layout template
 * ("%s | ClinicalSim.ai") appends the brand suffix once, so posts must NOT bake
 * it in themselves.
 */
export function getPostMetadata(slug: string) {
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `${SITE_URL}/insights/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article" as const,
      title: post.title,
      description: post.description,
      url,
    },
    twitter: {
      title: post.title,
      description: post.description,
    },
  }
}
