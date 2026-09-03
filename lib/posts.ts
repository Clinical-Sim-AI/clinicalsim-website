/**
 * Every slug that has a registry entry, whether or not it still resolves to a
 * page of its own (`redirectTo` entries stay listed so their old URLs keep
 * consolidating). `Post.slug` is typed against it, so adding a post without
 * extending the union is a typecheck error rather than a silent gap, and the
 * cross-registry `relatedPostSlugs` arrays are typed against it too.
 *
 * The union catches a slug that no longer exists. It cannot catch a slug that
 * exists but redirects, because both are members: getPostBySlug() resolves a
 * redirected post, so a related-posts card can still render a link that 308s.
 * lib/posts.test.ts covers that half at runtime. Both halves are needed.
 */
export type PostSlug =
  | "why-standardized-patient-programs-run-out-of-capacity"
  | "building-rapport-clinical-encounter"
  | "eol-communication-training-measurement-gap"
  | "breaking-bad-news-practice-not-knowledge"
  | "what-programs-lost-when-step-2-cs-disappeared"
  | "faculty-hour-problem-communication-remediation"
  | "ai-affirming-care-communication-training"
  | "osce-case-design-guide"
  | "hospital-communication-training-roi"
  | "healthcare-simulation-technology-trends"
  | "breaking-bad-news-medical-training"
  | "what-learners-want-from-ai-sps"
  | "end-of-life-care-communication"
  | "why-communication-training-matters"
  | "scalability-problem-sp-programs"

export interface Post {
  slug: PostSlug
  title: string
  description: string
  date: string
  author: string
  readingTime: string
  tags: string[]
  redirectTo?: string
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
    slug: "why-standardized-patient-programs-run-out-of-capacity",
    title: "Why standardized patient programs run out of capacity",
    description:
      "A standardized patient program's capacity is set by how many trained people it can put in a room, not by how many rooms it has.",
    date: "2026-09-03",
    author: "Jacqueline Ponczek, MD, MS, FAAP",
    authorId: "jacqueline-ponczek",
    readingTime: "5 min read",
    tags: ["standardized patients", "simulation", "medical education", "OSCE", "capacity", "communication training"],
  },
  {
    slug: "building-rapport-clinical-encounter",
    title: "Building rapport is a set of behaviors, not a personality",
    description:
      "Clinicians elicited the patient's agenda in 36% of 112 recorded encounters and interrupted after a median of 11 seconds. Rapport lives in that half minute, and three hours of training moved patient ratings in a randomized trial.",
    date: "2026-08-18",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["rapport", "communication-training", "Kalamazoo", "Calgary-Cambridge", "empathy", "assessment", "simulation", "medical-education"],
  },
  {
    slug: "eol-communication-training-measurement-gap",
    title: "Six of 105: the measurement gap in end-of-life communication training",
    description: "A systematic review of 105 studies found only 6 with clear training objectives — none sharing the same outcomes. A pediatric intensivist and palliative care physician explains what this means for fellows learning to navigate the hardest conversations in medicine.",
    date: "2026-06-09",
    dateModified: "2026-08-20",
    author: "Lauren Rissman, MD",
    authorId: "lauren-rissman",
    readingTime: "7 min read",
    tags: ["end-of-life", "palliative-care", "communication-training", "pediatrics", "simulation", "AI", "medical-education", "OSCE"],
  },
  {
    slug: "breaking-bad-news-practice-not-knowledge",
    title: "Breaking bad news is a practice problem, not a knowledge problem",
    description: "A framework can organize a conversation, but learners still need repeated spoken practice with feedback. The evidence shows how little formal training many residents receive and what a program can do about it.",
    date: "2026-05-19",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "6 min read",
    tags: ["breaking-bad-news", "communication-training", "SPIKES", "Calgary-Cambridge", "Kalamazoo", "simulation", "deliberate-practice", "medical-education", "remediation"],
  },
  {
    slug: "what-programs-lost-when-step-2-cs-disappeared",
    title: "What programs lost when Step 2 CS disappeared, and what hasn't replaced it",
    description: "USMLE discontinued Step 2 CS in 2021. No national successor now assesses clinical communication, so programs have built local methods around Milestones 2.0 with uneven time, tools, and evidence.",
    date: "2026-05-11",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "6 min read",
    tags: ["step-2-cs", "communication-assessment", "ACGME", "milestones", "medical-education", "residency", "USMLE"],
  },
  {
    slug: "faculty-hour-problem-communication-remediation",
    title: "The faculty hour problem with communication remediation",
    description: "One published clinical reasoning remediation program required a mean of 29.6 specialist contact hours. The figure is not a universal estimate, but it shows why programs should separate the decisions that need faculty judgment from the repetitions that do not.",
    date: "2026-04-07",
    dateModified: "2026-09-03",
    author: "ClinicalSim Team",
    readingTime: "4 min read",
    tags: ["communication-remediation", "faculty-time", "ACGME", "milestones", "medical-education", "residency"],
  },
  {
    slug: "ai-affirming-care-communication-training",
    title: "Simulation can preserve affirming care practice as exposure shrinks",
    description: "Sixty percent of surveyed residency program directors reported no rotation with direct clinical exposure to transgender patients. A team presenting at IPSS Rome designed an AI patient scenario for structured communication practice when clinical exposure is limited.",
    date: "2026-03-30",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "3 min read",
    tags: ["ai", "simulation", "communication-training", "affirming-care", "pediatrics"],
  },
  {
    slug: "osce-case-design-guide",
    title: "How to design an OSCE case that shows what a learner can do",
    description: "Start with the decision the station should support, define observable behaviors, give learners a fair chance to show them, train the SP, and pilot the scoring before the station counts.",
    date: "2026-03-04",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "4 min read",
    tags: ["OSCE", "case design", "medical education", "assessment"],
  },
  {
    slug: "hospital-communication-training-roi",
    title: "Communication training ROI: build the case without inventing a number",
    description:
      "This article has been consolidated into What the evidence says about communication training.",
    date: "2026-02-04",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "2 min read",
    tags: ["ROI", "communication training", "hospital administration"],
    redirectTo: "/insights/why-communication-training-matters",
  },
  {
    slug: "healthcare-simulation-technology-trends",
    // Retitled 2026-09-03. The old title ("Choosing a medical simulation
    // method in 2026") dated itself for no benefit: the post is a method
    // selection guide, not a trends piece, and nothing in it is year-specific.
    title: "How to choose a medical simulation method",
    description: "Standardized patients, mannequins, screen-based cases, text, and voice each show different parts of clinical performance. Choose by the behavior learners need to practice or faculty need to assess, not by fidelity.",
    date: "2026-01-07",
    dateModified: "2026-09-03",
    author: "ClinicalSim Team",
    readingTime: "3 min read",
    tags: ["simulation", "technology trends", "medical education"],
  },
  {
    slug: "breaking-bad-news-medical-training",
    title: "SPIKES gives learners a structure. Practice shows whether they can use it.",
    description: "This article has been consolidated into Breaking bad news is a practice problem, not a knowledge problem.",
    date: "2025-10-07",
    dateModified: "2026-08-10",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["breaking bad news", "medical training", "communication"],
    redirectTo: "/insights/breaking-bad-news-practice-not-knowledge",
  },
  {
    slug: "what-learners-want-from-ai-sps",
    title: "What 12 medical students want from AI patient simulation",
    description: "Researchers interviewed 12 clinical-year medical students and ran three codesign workshops. The students put feedback, case quality, and faculty involvement ahead of novelty.",
    date: "2025-12-03",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "4 min read",
    tags: ["research", "AI-SP", "medical education", "HCI"],
  },
  {
    slug: "end-of-life-care-communication",
    title: "What end-of-life communication training can and cannot show",
    description:
      "This article has been consolidated into What the evidence says about communication training.",
    date: "2025-11-04",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "2 min read",
    tags: ["end-of-life", "palliative care", "communication"],
    redirectTo: "/insights/why-communication-training-matters",
  },
  {
    slug: "why-communication-training-matters",
    title: "What the evidence says about communication training",
    description: "Candello found a communication factor in 40% of asserted malpractice cases, and Chung's review of 20 training studies rated the evidence very low to low quality. Neither supports an ROI headline. What a program can measure is its own learners, scored against a named framework.",
    date: "2025-08-12",
    dateModified: "2026-09-03",
    author: "ClinicalSim Team",
    readingTime: "5 min read",
    tags: ["communication", "malpractice", "training gap"],
  },
  {
    slug: "scalability-problem-sp-programs",
    title: "Where standardized patient programs need more practice capacity",
    description:
      "This article has been consolidated into the AI clinical simulation vs. standardized patients comparison.",
    date: "2025-09-09",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "1 min read",
    tags: ["standardized patients", "cost", "scalability"],
    redirectTo: "/compare/ai-clinical-simulation-vs-standardized-patients",
  },
]

export function getAllPosts(): Post[] {
  return posts
    .filter((post) => !post.redirectTo)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

const SITE_URL = "https://clinicalsim.ai"

/**
 * Build the full Metadata object for an insight post from its slug. Keeps every
 * post's title, description, canonical, OpenGraph, and Twitter tags in sync with
 * the registry in this file so MDX pages don't hand-maintain (and drift on) their
 * own metadata.
 *
 * The <title> is set as `absolute`, so the root layout template
 * ("%s | ClinicalSim.ai") does NOT append the brand suffix. Post titles are full
 * editorial headlines and the extra 17 characters pushed them past the 75-character
 * limit Semrush flags. Registry titles stay bare -- never bake a suffix into one.
 */
export function getPostMetadata(slug: string) {
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `${SITE_URL}/insights/${post.slug}`
  return {
    title: { absolute: post.title },
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
