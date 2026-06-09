import { getAllPosts } from "@/lib/posts"
import { getAllSolutions } from "@/lib/solutions"
import { getAllAudiences } from "@/lib/audiences"
import { getAllComparisons } from "@/lib/comparisons"

const BASE_URL = "https://clinicalsim.ai"

const HEADER = `# ClinicalSim.ai

> Voice-based AI clinical simulation platform to practice and measure clinical communication at every stage of a medical career — undergraduate medical education, residency and fellowship, communication remediation, and faculty development. Mapped to ACGME ICS Milestones 2.0. Built by simulation directors and communication researchers.

## Pages

- [Homepage](${BASE_URL}): Overview of ClinicalSim.ai — voice-based AI clinical simulation to practice the conversations that matter most across the medical-education continuum. Rubric-scored practice mapped to ACGME ICS Milestones 2.0 with milestone-aligned documentation.
- [About](${BASE_URL}/about): Why communication is the hardest competency to teach, train, and measure — and how structured, repeatable practice changes that. Built by leaders in simulation and clinical communication.`

export async function GET() {
  const posts = getAllPosts()
  const solutions = getAllSolutions()
  const audiences = getAllAudiences()
  const comparisons = getAllComparisons()

  const solutionLines = [
    `\n## Use Cases\n`,
    `- [Use Cases](${BASE_URL}/solutions): One platform for clinical communication across remediation, a longitudinal residency and fellowship curriculum, undergraduate medical education, and faculty development.`,
    ...solutions.map(
      (s) =>
        `- [${s.title}](${BASE_URL}/solutions/${s.slug}): ${s.metaDescription}`
    ),
  ].join("\n")

  const audienceLines = [
    `\n## Who We Serve\n`,
    `- [Who We Serve](${BASE_URL}/audiences): The stakeholders across the training continuum that ClinicalSim serves.`,
    ...audiences.map(
      (a) =>
        `- [${a.title}](${BASE_URL}/audiences/${a.slug}): ${a.subtitle}.`
    ),
  ].join("\n")

  const otherPages = [
    `\n## More\n`,
    `- [Practice Conversations](${BASE_URL}/practice): Free AI simulation to practice difficult conversations firsthand, with milestone-aligned feedback mapped to ACGME ICS Milestones 2.0.`,
    `- [Research Collaboration](${BASE_URL}/research): Apply to collaborate on research in clinical communication, simulation-based education, and competency assessment.`,
    `- [Insights](${BASE_URL}/insights): Research and evidence on medical communication training, simulation technology, and clinical conversation outcomes.`,
  ].join("\n")

  const glossaryLines = [
    `\n## Glossary\n`,
    `- [Glossary](${BASE_URL}/glossary): Clear, sourced definitions of key medical-education and clinical-simulation terms — competency-based medical education (CBME), EPAs, ACGME Milestones, Clinical Competency Committees, OSCEs, standardized patients, deliberate practice, and remediation.`,
  ].join("\n")

  const comparisonLines = [
    `\n## Compare\n`,
    `- [Compare](${BASE_URL}/compare): Neutral, side-by-side comparisons of clinical communication training approaches.`,
    ...comparisons.map(
      (c) => `- [${c.title}](${BASE_URL}/compare/${c.slug}): ${c.metaDescription}`
    ),
  ].join("\n")

  const postLines = [
    `\n## Insights\n`,
    ...posts.map(
      (post) =>
        `- [${post.title}](${BASE_URL}/insights/${post.slug}): ${post.description}`
    ),
  ].join("\n")

  const privacyLine = `\n\n- [Privacy Policy](${BASE_URL}/privacy): Privacy policy covering data collection, cookies, online advertising opt-out, and user rights.`

  const body = `${HEADER}\n${solutionLines}\n${audienceLines}\n${otherPages}\n${comparisonLines}\n${glossaryLines}\n${postLines}${privacyLine}\n`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
