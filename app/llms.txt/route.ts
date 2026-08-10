import { getAllPosts } from "@/lib/posts"
import { getAllSolutions } from "@/lib/solutions"
import { getAllAudiences } from "@/lib/audiences"
import { getAllComparisons } from "@/lib/comparisons"
import { getAllExamples } from "@/lib/examples"

const BASE_URL = "https://clinicalsim.ai"

const HEADER = `# ClinicalSim.ai

> ClinicalSim gives learners voice-based practice with AI patients and gives faculty the transcript evidence behind each score. Named physicians write and review cases, and each case names the competency and communication frameworks it uses.

## Pages

- [Homepage](${BASE_URL}): Voice-based practice with AI patients for high-stakes clinical conversations, with rubric-scored feedback tied to the transcript.
- [About](${BASE_URL}/about): Why ClinicalSim exists, how it extends standardized patient programs, the evidence behind its reports, and the team responsible for the work.`

export async function GET() {
  const posts = getAllPosts()
  const solutions = getAllSolutions()
  const audiences = getAllAudiences()
  const comparisons = getAllComparisons()
  const examples = getAllExamples()

  const exampleLines = [
    `\n## Examples\n`,
    `- [Examples](${BASE_URL}/examples): Unedited ClinicalSim encounters with the feedback a learner receives, including the assessment report, recording, and full transcript. No sign-in required.`,
    ...examples.map(
      (e) => `- [${e.title}](${BASE_URL}/examples/${e.slug}): ${e.summary}`
    ),
  ].join("\n")

  const solutionLines = [
    `\n## Use cases\n`,
    `- [Use cases](${BASE_URL}/solutions): One platform for clinical communication across remediation, a longitudinal residency and fellowship curriculum, undergraduate medical education, and faculty development.`,
    ...solutions.map(
      (s) =>
        `- [${s.title}](${BASE_URL}/solutions/${s.slug}): ${s.metaDescription}`
    ),
  ].join("\n")

  const audienceLines = [
    `\n## Who we serve\n`,
    `- [Who we serve](${BASE_URL}/audiences): The stakeholders across the training continuum that ClinicalSim serves.`,
    ...audiences.map(
      (a) =>
        `- [${a.title}](${BASE_URL}/audiences/${a.slug}): ${a.subtitle}.`
    ),
  ].join("\n")

  const otherPages = [
    `\n## More\n`,
    `- [Methodology](${BASE_URL}/methodology): How ClinicalSim builds cases, names the competency and communication frameworks each case uses, and generates rubric-scored feedback tied to transcript evidence.`,
    `- [Trust and data handling](${BASE_URL}/trust): ClinicalSim is intended for training and assessment and does not diagnose patients, recommend treatment, or create clinical documentation. Cases use synthetic patients written from clinical literature rather than patient records. The product handles learner recordings, transcripts, account data, and institutional data.`,
    `- [FAQ](${BASE_URL}/faq): Common questions about ClinicalSim's AI clinical simulation, including how it compares to Step 2 CS and standardized patients, communication remediation, ACGME Milestone scoring and My Progress, evidence for CCC review, privacy, and research.`,
    `- [FAQ for medical educators](${BASE_URL}/medical-educator-faq): How to read a feedback report, inspect transcript evidence, compare GME and UME scoring, choose a practice cadence, and use results in a rotation or remediation plan.`,
    `- [Research collaboration](${BASE_URL}/research): Propose a study in clinical communication, simulation-based education, or competency assessment.`,
    `- [Insights](${BASE_URL}/insights): Research and evidence on medical communication training, simulation technology, and clinical conversation outcomes.`,
    `- [Contact](${BASE_URL}/contact): Request a pilot, ask a product question, or contact the ClinicalSim team.`,
    `- [Help center](${BASE_URL}/help): Guides, release notes, and support for ClinicalSim programs and learners.`,
    `- [Release notes](${BASE_URL}/help/release-notes): A concise log of customer-visible ClinicalSim changes, newest first.`,
  ].join("\n")

  const glossaryLines = [
    `\n## Glossary\n`,
    `- [Glossary](${BASE_URL}/glossary): Clear, sourced definitions of key medical-education and clinical-simulation terms, including competency-based medical education (CBME), EPAs, ACGME Milestones, Clinical Competency Committees, OSCEs, standardized patients, deliberate practice, and remediation.`,
  ].join("\n")

  const comparisonLines = [
    `\n## Compare\n`,
    `- [Compare](${BASE_URL}/compare): Practical comparisons of what each communication training method can assess, what it requires to run, and where it fits.`,
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

  const privacyLine = `\n\n- [Privacy policy](${BASE_URL}/privacy): Privacy policy covering data collection, cookies, online advertising opt-out, and user rights.`

  const body = `${HEADER}\n${solutionLines}\n${audienceLines}\n${exampleLines}\n${otherPages}\n${comparisonLines}\n${glossaryLines}\n${postLines}${privacyLine}\n`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
