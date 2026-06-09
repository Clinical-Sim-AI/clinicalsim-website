import { getAllPosts } from "@/lib/posts"

const BASE_URL = "https://clinicalsim.ai"

const STATIC_PAGES = `# ClinicalSim.ai

> AI clinical simulation platform purpose-built for communication remediation in graduate medical education. Built by simulation directors and communication researchers.

## Pages

- [Homepage](${BASE_URL}): Overview of ClinicalSim.ai — AI clinical simulation purpose-built for communication remediation. Structured practice mapped to ACGME ICS Milestones 2.0 with CCC-ready documentation. 93% of programs face remediation. Built by simulation directors and communication researchers.
- [About](${BASE_URL}/about): Built by leaders in simulation and clinical communication — Director of Simulation at Advocate Health, Director of Simulation at University of Chicago, and published communication researchers.
- [Communication Remediation](${BASE_URL}/solutions/remediation): The first AI clinical simulation purpose-built for communication remediation. Structured practice mapped to ACGME ICS Milestones 2.0 with CCC-ready documentation. 93% of programs face remediation — 50% of program directors want a toolkit.
- [Program Directors](${BASE_URL}/audiences/program-directors): Communication remediation toolkit for program directors — 20 structured encounters before coaching, milestone-aligned feedback, CCC-ready documentation.
- [DIOs & GME Leadership](${BASE_URL}/audiences/dios-gme-leadership): Standardized remediation infrastructure across all programs — costs less than a single PACE assessment, accreditation-ready documentation.
- [Simulation Center Directors](${BASE_URL}/audiences/simulation-center-directors): Extend your SP program to unlimited practice volume — assessment data from every session, measurable communication outcomes.
- [Clinical Competency Committees](${BASE_URL}/audiences/clinical-competency-committees): Milestone-aligned assessment data from every practice session — longitudinal progress tracking, CCC-ready reports.
- [Practice Remediation Conversations](${BASE_URL}/practice): Free AI simulation for program directors to practice difficult remediation conversations — delivering remediation news, addressing professionalism, communicating milestone deficiency. Milestone-aligned feedback mapped to ACGME ICS Milestones 2.0.
- [Research Collaboration](${BASE_URL}/research): Apply to collaborate on research in communication remediation, simulation-based education, and competency assessment. Platform access, custom scenarios, data collection, and publication support provided.
- [Insights](${BASE_URL}/insights): Research and evidence on medical communication training, simulation technology, and clinical conversation outcomes.`

export async function GET() {
  const posts = getAllPosts()

  const postLines = posts
    .map((post) => `- [${post.title}](${BASE_URL}/insights/${post.slug}): ${post.description}`)
    .join("\n")

  const privacyLine = `\n- [Privacy Policy](${BASE_URL}/privacy): Privacy policy covering data collection, cookies, online advertising opt-out, and user rights.`

  const body = `${STATIC_PAGES}\n${postLines}${privacyLine}\n`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
