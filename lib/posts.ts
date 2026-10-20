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
  | "communication-and-hospital-economics"
  | "ccc-communication-evidence-threshold"
  | "identifying-struggling-residents-intern-year"
  | "what-an-osce-score-predicts"
  | "communication-remediation-plan"
  | "simulation-vendor-shutdown-program-obligations"
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
  /**
   * Short <title> for posts whose headline runs past 43 characters. The root
   * layout template appends " | ClinicalSim.ai" (17 characters), and Google
   * truncates near 60, so 43 is the most the bare title can carry. The visible
   * H1, og:title, and twitter:title keep the full `title`. Keep the page's main
   * search phrase in it.
   */
  seoTitle?: string
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
  /**
   * Set only on a post whose body is a real sequence of steps. ArticleLayout
   * then emits a HowTo node beside the Article. Each `name` must be an H2 in
   * the MDX, verbatim, and each `text` a paragraph from that section, verbatim:
   * lib/howto-schema.test.ts fails on any drift. Do not paraphrase or add steps
   * the page does not show.
   */
  howToSteps?: HowToStep[]
}

export interface HowToStep {
  name: string
  text: string
}

const posts: Post[] = [
  {
    slug: "communication-and-hospital-economics",
    title: "The impact of communication on hospital economics",
    seoTitle: "Communication and hospital economics",
    description:
      "Across 19 trials, discharge communication interventions were associated with fewer readmissions (relative risk 0.69; Becker, 2021), and by our calculation communication HCAHPS items make up roughly 12.5% to 17% of Medicare's value-based score. Neither tells a hospital what communication costs it. Here is a method for finding out.",
    date: "2026-10-20",
    author: "ClinicalSim Team",
    readingTime: "14 min read",
    tags: ["hospital-economics", "patient-experience", "readmissions", "health-system"],
  },
  {
    slug: "ccc-communication-evidence-threshold",
    title: "What a CCC needs before it can act on a communication problem",
    seoTitle: "What a CCC needs to rate communication",
    description:
      "Faculty narrative assessments in one emergency medicine residency covered an average of 2.04 of 23 milestone sub-competencies, and 14 of the 23 appeared in fewer than 5 percent (Diller et al., 2019). What a committee needs in the file before it rates communication.",
    date: "2026-10-12",
    author: "Vinod Havalad, MD",
    // Byline approved by Vinod on 2026-09-24 ("happy to have my name
    // attached" / "good to go from my perspective"), covering this draft and
    // communication-remediation-plan. His Google Doc edits are merged here.
    authorId: "vinod-havalad",
    readingTime: "6 min read",
    tags: ["communication-assessment", "assessment", "ACGME", "milestones", "medical-education", "residency"],
  },
  {
    slug: "identifying-struggling-residents-intern-year",
    title: "Most residents who need remediation are spotted in intern year",
    seoTitle: "Identifying struggling residents early",
    description:
      "In a survey of 267 family medicine program directors, 86 percent of residents who needed remediation were identified before the end of intern year, and 46 percent of them between July and December of PGY-1. What that asks of an intern year assessment plan.",
    date: "2026-10-16",
    author: "Vinod Havalad, MD",
    // Byline confirmed by Vinod, relayed by Ben on 2026-10-16.
    authorId: "vinod-havalad",
    readingTime: "5 min read",
    tags: ["communication-remediation", "assessment", "ACGME", "milestones", "medical-education", "residency"],
  },
  {
    slug: "what-an-osce-score-predicts",
    title: "What an OSCE score predicts, and what it doesn't",
    seoTitle: "What an OSCE score predicts",
    description:
      "In a cohort of 3,424 physicians followed for up to 12 years, lower communication scores on a national clinical skills examination went with more retained patient complaints years later. What that does and does not tell a program about one resident.",
    date: "2026-10-08",
    author: "Gillian Brennan, MB BCh BAO",
    authorId: "gillian-brennan",
    readingTime: "4 min read",
    tags: ["OSCE", "assessment", "communication-assessment", "milestones", "medical-education", "residency"],
  },
  {
    slug: "communication-remediation-plan",
    title: "What belongs in a resident communication remediation plan",
    seoTitle: "Communication remediation plans",
    description:
      "In a survey of 267 family medicine program directors, 93 percent had a resident in remediation and 22 percent said missing documented evaluations made it hard to start or guide. What a communication remediation plan needs to record.",
    date: "2026-09-24",
    author: "Vinod Havalad, MD",
    authorId: "vinod-havalad",
    readingTime: "6 min read",
    tags: ["communication-remediation", "ACGME", "milestones", "medical-education", "residency"],
  },
  {
    slug: "simulation-vendor-shutdown-program-obligations",
    title: "When a simulation vendor shuts down, the program keeps the obligation",
    seoTitle: "When a simulation vendor shuts down",
    description:
      "Kognito stopped selling in August 2023. Five questions to ask before a simulation vendor holds records your program needs for resident evaluation.",
    date: "2026-09-22",
    author: "Ben Conway",
    authorId: "ben-conway",
    readingTime: "5 min read",
    tags: ["simulation", "assessment", "ACGME", "medical education"],
  },
  {
    slug: "why-standardized-patient-programs-run-out-of-capacity",
    title: "Why standardized patient programs run out of capacity",
    // TODO(ben): confirm short title.
    seoTitle: "Standardized patient program capacity",
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
    seoTitle: "Building rapport in the clinical encounter",
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
    seoTitle: "End-of-life communication training gap",
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
    seoTitle: "Breaking bad news is a practice problem",
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
    seoTitle: "What programs lost with Step 2 CS",
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
    // TODO(ben): confirm short title.
    seoTitle: "Faculty time in communication remediation",
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
    // TODO(ben): confirm short title.
    seoTitle: "Simulation for affirming care practice",
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
    seoTitle: "OSCE case design guide",
    description: "Start with the decision the station should support, define observable behaviors, give learners a fair chance to show them, train the SP, and pilot the scoring before the station counts.",
    date: "2026-03-04",
    dateModified: "2026-09-02",
    author: "ClinicalSim Team",
    readingTime: "4 min read",
    tags: ["OSCE", "case design", "medical education", "assessment"],
    // "Where AI patients fit" is left out: it is a product note, not a step.
    // Step 4 uses the section's third paragraph, the one that states the
    // action, rather than its framing opener.
    howToSteps: [
      {
        name: "Start with the decision",
        text: "A communication station and a diagnostic reasoning station may use the same encounter, but they should not use the same rubric. Write down what the score will mean before you write the patient. If the program cannot say what a passing performance allows it to conclude, the case is not ready.",
      },
      {
        name: "Define behaviors a reviewer can see",
        text: "Write objectives as actions. \"Acknowledges the patient's concern before giving more information\" is easier to observe than \"shows empathy.\" A reviewer should be able to point to what the learner said or did.",
      },
      {
        name: "Give the learner a fair chance to show the skill",
        text: "The case must create an opening for every scored behavior. If the rubric asks whether a learner responds to emotion, the patient needs a clear emotional cue. If the station does not give that opportunity, mark the item not assessable instead of treating silence as failure.",
      },
      {
        name: 'Make "not assessable" a real outcome, not a zero',
        text: "Two things follow for a station design. Say which items the station's own modality cannot reach, in the rubric, before anyone runs it. And report the count of excluded items alongside the total, so a reviewer reading 25 out of 30 knows whether the denominator was 30 or something less.",
      },
      {
        name: "Match the case to the learner",
        text: "An early medical student may need to gather a focused history and explain the next step. A resident may need to manage uncertainty, competing priorities, or a family meeting. The clinical task, case complexity, and framework should change with the learner's stage.",
      },
      {
        name: "Train the standardized patient and the rater together",
        text: "The patient portrayal and the scoring rules are part of the same instrument. Use sample learner responses to calibrate when the patient offers information, how emotion changes, and what evidence meets each rating.",
      },
      {
        name: "Pilot before the score counts",
        text: "Run the complete station with learners who resemble the intended group. Watch for unclear instructions, cues that appear too early or too late, equipment problems, and items that almost everyone passes or misses.",
      },
    ],
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
    seoTitle: "What medical students want from AI patients",
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
    // TODO(ben): confirm short title.
    seoTitle: "Evidence for communication training",
    description: "Candello found a communication factor in 40% of asserted malpractice cases, and Chung's review of 20 training studies rated the evidence very low to low quality. Neither supports an ROI headline. What a program can measure is its own learners, scored against a named framework.",
    date: "2025-08-12",
    dateModified: "2026-10-02",
    author: "ClinicalSim Team",
    readingTime: "7 min read",
    tags: ["communication", "malpractice", "training gap"],
    // Ben confirmed Vinod as reviewer on 2026-10-02. The readmission,
    // patient experience, and medicolegal studies came from his list.
    reviewedBy: "Vinod Havalad, MD",
    reviewedDate: "2026-10-02",
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
 * The <title> goes through the root layout template ("%s | ClinicalSim.ai"), so
 * the brand suffix is appended once and the <title> never matches the visible H1
 * (Semrush flags an identical pair). It uses `seoTitle` when a post has one, so
 * the rendered title stays at 60 characters or fewer. og:title and twitter:title
 * keep the full headline. Registry titles stay bare -- never bake a suffix into one.
 */
export function getPostMetadata(slug: string) {
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `${SITE_URL}/insights/${post.slug}`
  return {
    title: post.seoTitle ?? post.title,
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
