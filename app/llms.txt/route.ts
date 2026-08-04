import { getAllPosts } from "@/lib/posts"
import { getAllSolutions } from "@/lib/solutions"
import { getAllAudiences } from "@/lib/audiences"
import { getAllComparisons } from "@/lib/comparisons"
import { getAllExamples } from "@/lib/examples"

const BASE_URL = "https://clinicalsim.ai"

const HEADER = `# ClinicalSim.ai

> Voice-based AI clinical simulation platform to practice and measure clinical communication at every stage of a medical career, covering undergraduate medical education, residency and fellowship, communication remediation, and faculty development. Feedback is rubric-scored against the framework appropriate to each stage, including ACGME Milestones 2.0 for residents and fellows. Built by simulation directors and communication researchers.

## Pages

- [Homepage](${BASE_URL}): Overview of ClinicalSim.ai. Communication is medicine's most performed procedure and its least measured. Voice-based AI clinical simulation to practice and score it across the medical-education continuum. Rubric-scored practice mapped to ACGME Milestones 2.0 for residents and fellows, with milestone-aligned documentation.
- [About](${BASE_URL}/about): Why communication is the hardest competency to teach, train, and measure, and how structured, repeatable practice changes that. Includes the team: practicing physicians who direct fellowship programs and simulation centers at Advocate Children's Hospital, the University of Chicago, and Northwestern Feinberg, alongside the founders.`

export async function GET() {
  const posts = getAllPosts()
  const solutions = getAllSolutions()
  const audiences = getAllAudiences()
  const comparisons = getAllComparisons()
  const examples = getAllExamples()

  const exampleLines = [
    `\n## Examples\n`,
    `- [Examples](${BASE_URL}/examples): Real ClinicalSim encounters with the exact feedback a learner receives, including the milestone-aligned assessment report, the recording, and the full transcript. No sign-in required.`,
    ...examples.map(
      (e) => `- [${e.title}](${BASE_URL}/examples/${e.slug}): ${e.summary}`
    ),
  ].join("\n")

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
    `- [Methodology](${BASE_URL}/methodology): How ClinicalSim builds cases, aligns them to ACGME Milestones 2.0 or the Foundational Competencies, applies validated communication frameworks like SPIKES and Calgary-Cambridge, and generates transcript-grounded, competency-based feedback.`,
    `- [Trust and Compliance](${BASE_URL}/trust): How ClinicalSim handles data. It is a training and assessment tool rather than a diagnostic device, so no FDA clearance is required. Every patient in every case is synthetic, authored from the clinical literature rather than from patient records, so no protected health information enters the platform and there is nothing to de-identify. Published cases, rubrics, and scoring prompts are versioned and locked. Learner voice data is consent-gated with erasure on request. SOC 2 and HIPAA certification are on the funded roadmap and are not yet in place.`,
    `- [FAQ](${BASE_URL}/faq): Common questions about ClinicalSim's AI clinical simulation, including how it compares to Step 2 CS and standardized patients, communication remediation, ACGME Milestone scoring and My Progress, CCC-ready documentation, privacy, and research.`,
    `- [FAQ for Medical Educators](${BASE_URL}/medical-educator-faq): How to read a ClinicalSim feedback report, how GME and UME scoring differ, how the AI scores accurately and fairly, practice cadence and skill decay, and how to build cases into a rotation, clerkship, or remediation plan, grounded in the direct-observation and mastery-learning literature. For program directors, DIOs, clerkship and course directors, simulation leads, and learner-progress committees.`,
    `- [Research Collaboration](${BASE_URL}/research): Apply to collaborate on research in clinical communication, simulation-based education, and competency assessment.`,
    `- [Insights](${BASE_URL}/insights): Research and evidence on medical communication training, simulation technology, and clinical conversation outcomes.`,
    `- [Help Center](${BASE_URL}/help): Getting-started videos, release notes, and support for ClinicalSim programs and learners.`,
    `- [Release Notes](${BASE_URL}/help/release-notes): Plain-language log of what's new in ClinicalSim, newest first, covering learner- and program-facing changes and the work behind each release.`,
  ].join("\n")

  const glossaryLines = [
    `\n## Glossary\n`,
    `- [Glossary](${BASE_URL}/glossary): Clear, sourced definitions of key medical-education and clinical-simulation terms, including competency-based medical education (CBME), EPAs, ACGME Milestones, Clinical Competency Committees, OSCEs, standardized patients, deliberate practice, and remediation.`,
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

  const body = `${HEADER}\n${solutionLines}\n${audienceLines}\n${exampleLines}\n${otherPages}\n${comparisonLines}\n${glossaryLines}\n${postLines}${privacyLine}\n`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
