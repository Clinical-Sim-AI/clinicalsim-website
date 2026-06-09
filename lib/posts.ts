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
}

const posts: Post[] = [
  {
    slug: "eol-communication-training-measurement-gap",
    title: "Six of 105: Why End-of-Life Communication Training Has a Measurement Problem",
    description: "A systematic review of 105 studies found only 6 with clear training objectives — none sharing the same outcomes. A pediatric intensivist and palliative care physician explains what this means for fellows learning to navigate the hardest conversations in medicine.",
    date: "2026-06-09",
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
    author: "ClinicalSim Team",
    readingTime: "8 min read",
    tags: ["breaking-bad-news", "communication-training", "SPIKES", "Calgary-Cambridge", "Kalamazoo", "simulation", "deliberate-practice", "medical-education", "remediation"],
  },
  {
    slug: "what-programs-lost-when-step-2-cs-disappeared",
    title: "What Programs Lost When Step 2 CS Disappeared, and What Hasn't Replaced It",
    description: "USMLE Step 2 CS was permanently discontinued in 2021. Five years later, residency programs still have no standardized way to assess communication skills. Milestones 2.0 raised the bar, but gave programs no new tools to meet it.",
    date: "2026-05-11",
    author: "ClinicalSim Team",
    readingTime: "7 min read",
    tags: ["step-2-cs", "communication-assessment", "ACGME", "milestones", "medical-education", "residency", "USMLE"],
  },
  {
    slug: "faculty-hour-problem-communication-remediation",
    title: "The Faculty Hour Problem with Communication Remediation, and Why It Doesn't Scale",
    description: "93% of residency programs face remediation, and communication is the hardest competency to fix. Each case consumes 25-75 faculty hours. Programs build their approach from scratch every time. The math doesn't work.",
    date: "2026-04-07",
    author: "ClinicalSim Team",
    readingTime: "7 min read",
    tags: ["communication-remediation", "faculty-time", "ACGME", "milestones", "medical-education", "residency"],
  },
  {
    slug: "ai-affirming-care-communication-training",
    title: "When Affirming Care Training Disappears, Simulation Has to Fill the Gap",
    description: "A new AI simulation approach presented at IPSS Rome tackles the growing gap in transgender communication training for pediatric residents, where 60% of programs lack direct clinical exposure.",
    date: "2026-03-30",
    author: "ClinicalSim Team",
    readingTime: "6 min read",
    tags: ["ai", "simulation", "communication-training", "affirming-care", "pediatrics"],
  },
  {
    slug: "osce-case-design-guide",
    title: "How to Design Effective OSCE Cases: A Practical Guide for Medical Educators",
    description: "Proven strategies for creating OSCE cases that assess clinical competence. Practical frameworks, common pitfalls, and validation methods.",
    date: "2026-03-04",
    author: "ClinicalSim Team",
    readingTime: "10 min read",
    tags: ["OSCE", "case design", "medical education", "assessment"],
  },
  {
    slug: "hospital-communication-training-roi",
    title: "The ROI of Communication Training: By the Numbers",
    description: "The business case for communication training is clear: reduced malpractice risk, improved HCAHPS scores, and better outcomes.",
    date: "2026-02-04",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["ROI", "communication training", "hospital administration"],
  },
  {
    slug: "healthcare-simulation-technology-trends",
    title: "Where Medical Simulation Is Headed in 2026",
    description: "From VR to AI voice agents, medical simulation technology is evolving rapidly. Heres what matters for 2026.",
    date: "2026-01-07",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["simulation", "technology trends", "medical education"],
  },
  {
    slug: "breaking-bad-news-medical-training",
    title: "Breaking Bad News: The Skill No One Teaches",
    description: "Breaking bad news is a core clinical skill — yet most clinicians have never practiced it before doing it for real.",
    date: "2025-10-07",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["breaking bad news", "medical training", "communication"],
  },
  {
    slug: "what-learners-want-from-ai-sps",
    title: "What Medical Learners Actually Want from AI Standardized Patients",
    description: "New CHI 2026 research reveals six key requirements for AI-SP design—straight from the medical students who would use them.",
    date: "2025-12-03",
    author: "ClinicalSim Team",
    readingTime: "6 min read",
    tags: ["research", "AI-SP", "medical education", "HCI"],
  },
  {
    slug: "end-of-life-care-communication",
    title: "End-of-Life Conversations: Practice Makes Progress",
    description: "EOL conversations are low-frequency, high-stakes events. Traditional training models cant provide the practice clinicians need.",
    date: "2025-11-04",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["end-of-life", "palliative care", "communication"],
  },
  {
    slug: "why-communication-training-matters",
    title: "Why Communication Training Matters",
    description: "Communication failures are the leading driver of malpractice claims, yet most clinicians receive minimal structured training. The gap between what's at stake and how we prepare is wider than most realize.",
    date: "2025-08-12",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["communication", "malpractice", "training gap"],
  },
  {
    slug: "scalability-problem-sp-programs",
    title: "The Scalability Problem with Standardized Patient Programs",
    description: "Traditional SP encounters cost $150-300 each and can't scale to meet demand. Why AI augments — rather than replaces — existing simulation programs.",
    date: "2025-09-09",
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
