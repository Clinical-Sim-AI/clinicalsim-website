import { getAllPosts } from "@/lib/posts"
import { getPublishedSolutions } from "@/lib/solutions"
import { getAllAudiences } from "@/lib/audiences"
import { getAllComparisons } from "@/lib/comparisons"
import { getAllExamples } from "@/lib/examples"
import { getIndexableGlossaryTerms } from "@/lib/glossary"
import { getAllHelpArticles } from "@/lib/help-articles"
import {
  CATEGORY_DEFINITION,
  CATEGORY_LINE,
  MEASUREMENT_CLAIM,
  POSITIONING_AUDIENCE,
  POSITIONING_ONE_LINER,
  POSITIONING_SUPPORT,
} from "@/lib/positioning"

const BASE_URL = "https://clinicalsim.ai"

/**
 * Facts, not just links. This file used to be roughly 100 URLs with one
 * meta-description each, which gives an agent evaluating the company a table of
 * contents and nothing to answer with. Every line below restates something
 * already published on the site; the source page is named so a crawler and a
 * human can both check it.
 *
 * lib/llms-coverage.test.ts asserts that every indexable sitemap URL appears
 * here and places no constraint on extra content, so this block is safe. Keep
 * it short: it is a summary, not a copy of the site.
 */
const KEY_FACTS = `## Key facts

- **What it is.** ${CATEGORY_LINE} ${CATEGORY_DEFINITION}
- **In one sentence.** ${POSITIONING_ONE_LINER}
- **Intended use.** Clinician training and assessment. ClinicalSim produces no patient-facing output, makes no diagnostic or treatment recommendation, and creates no clinical documentation. (/trust)
- **What it does not do.** It does not replace a standardized patient program, it extends one. It does not predict patient experience scores, readmissions, safety events, claims, or other clinical or business outcomes. It does not price malpractice risk or benchmark one institution against another. It is audio only, so it cannot assess eye contact, body language, or physical presence. (/trust, /faq, /solutions/patient-experience)
- **Patient data.** Every patient in every case is synthetic, written from the clinical literature rather than adapted from a chart, so case development needs no patient record and no de-identification step. The platform does handle learner recordings, transcripts, account data, and institutional data. Voice collection is consent-gated and learners can request erasure. (/trust)
- **Frameworks.** ${MEASUREMENT_CLAIM} The standard is whatever the customer already reports on: their own consent policy, escalation policy, or preceptor rubric, scored against their element definitions as written. Public frameworks scored against today include the ACGME Milestones 2.0, SPIKES, Calgary-Cambridge, SEGUE, NURSE, REMAP, Braddock's elements of informed decision making, the AHRQ CANDOR and SHARE material, TeamSTEPPS, and OPTION-12, with Entrustable Professional Activities where a case uses them. An element is scored only where the case gave the clinician a chance to show it. (/frameworks, /methodology)
- **Limits of the evidence.** Those frameworks were built for trained human raters observing real encounters, which is where their published reliability was established. A framework's reliability does not carry over to an AI score in a simulated encounter, so each score is a formative signal rather than a validated measure. ClinicalSim does not claim its scoring is more accurate or more valid than a faculty member's read. (/methodology, /trust)
- **Who it serves.** ${POSITIONING_AUDIENCE} Buyers include patient experience, risk and patient safety, nursing education, simulation, GME, and UME leaders. (/audiences)
- **Proof you can read without signing in.** Four complete encounters are published at ${BASE_URL}/examples with audio, the full transcript, and the entire scored report, no sign-in and no form. They are deliberately unflattering: 22 out of 30 on an informed consent encounter, 17 out of 25 on a vaccine hesitancy encounter, with the weak domains named and the learner's own words quoted as the reason.
- **How it is licensed.** An annual per-learner subscription, so operating expense rather than a capital purchase. No list price is published; what a program pays depends on learner count, cases, and term. (/evaluation)
- **Deployment.** Browser-based on any phone, tablet, or desktop with nothing to install. A typical encounter runs 3 to 10 minutes. English only. Four roles: Member, Project Manager, Admin, Owner. Nothing crosses organizations. IT may need to allow the voice service. (/faq, /help/roles-and-permissions)
- **Contact.** ${BASE_URL}/contact for a pilot or a product question, ${BASE_URL}/research to propose a study (rolling review, typically a 1 to 2 week response).
`

const HEADER = `# ClinicalSim.ai

> ${CATEGORY_LINE} ${POSITIONING_ONE_LINER} ${POSITIONING_SUPPORT}

${KEY_FACTS}
## Pages

- [Homepage](${BASE_URL}): Voice based practice with AI patients. Teams can start with ready to use cases based on published clinical frameworks or add an institution's policy, service standard, script, or rubric.
- [About](${BASE_URL}/about): How ClinicalSim began, why the platform extends beyond medical education, how it handles scoring evidence, and the team responsible for the work.`

export async function GET() {
  const posts = getAllPosts()
  const solutions = getPublishedSolutions()
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
    `- [Use cases](${BASE_URL}/solutions): One platform for patient experience, debriefing, informed consent, error disclosure, medical education, and communication remediation.`,
    ...solutions.map(
      (s) =>
        `- [${s.title}](${BASE_URL}/solutions/${s.slug}): ${s.metaDescription}`
    ),
  ].join("\n")

  const audienceLines = [
    `\n## Who we serve\n`,
    `- [Who we serve](${BASE_URL}/audiences): Health system and medical education teams responsible for patient experience, safety, simulation, curricula, competency review, and remediation.`,
    ...audiences.map(
      (a) =>
        `- [${a.title}](${BASE_URL}/audiences/${a.slug}): ${a.subtitle}.`
    ),
  ].join("\n")

  const otherPages = [
    `\n## More\n`,
    `- [Published frameworks and institution standards](${BASE_URL}/frameworks): Start with ready to use cases based on published clinical frameworks or add an institution's policy, service standard, script, or rubric. Every score cites transcript evidence, and the page states the scope rule and scoring limits.`,
    `- [Methodology](${BASE_URL}/methodology): How ClinicalSim builds cases, names the competency and communication frameworks each case uses, and generates rubric-scored feedback tied to transcript evidence.`,
    `- [Evaluating ClinicalSim](${BASE_URL}/evaluation): The questions behind the purchase, answered in one place: what ClinicalSim is intended for and what it is not, who inside an institution owns the decision, what the evidence establishes and what it does not, what a privacy or procurement reviewer will find, what it takes to run, how it is licensed, and what ClinicalSim will not claim.`,
    `- [Trust and data handling](${BASE_URL}/trust): ClinicalSim is intended for training and assessment and does not diagnose patients, recommend treatment, or create clinical documentation. Cases use synthetic patients written from clinical literature rather than patient records. The product handles learner recordings, transcripts, account data, and institutional data.`,
    `- [FAQ](${BASE_URL}/faq): Common questions about ClinicalSim's AI clinical simulation, including how it compares to Step 2 CS and standardized patients, communication remediation, ACGME Milestone scoring and My Progress, evidence for CCC review, privacy, and research.`,
    `- [FAQ for medical educators](${BASE_URL}/medical-educator-faq): How to read a feedback report, inspect transcript evidence, compare GME and UME scoring, choose a practice cadence, and use results in a rotation or remediation plan.`,
    `- [Research collaboration](${BASE_URL}/research): Propose a study in communication training, implementation, patient experience, workforce education, or competency assessment.`,
    `- [Insights](${BASE_URL}/insights): Research and evidence on medical communication training, simulation technology, and clinical conversation outcomes.`,
    `- [Contact](${BASE_URL}/contact): Request a pilot with one team, one standard, and defined reporting rules.`,
    `- [Help center](${BASE_URL}/help): Guides, release notes, and support for ClinicalSim programs and learners.`,
    `- [Release notes](${BASE_URL}/help/release-notes): A concise log of customer-visible ClinicalSim changes, newest first.`,
    // Mapped from the registry so this list and app/sitemap.ts cannot disagree.
    ...getAllHelpArticles().map(
      (article) =>
        `- [${article.title}](${BASE_URL}/help/${article.slug}): ${article.description}`
    ),
  ].join("\n")

  const glossaryTermPages = getIndexableGlossaryTerms()

  const glossaryLines = [
    `\n## Glossary\n`,
    `- [Glossary](${BASE_URL}/glossary): Clear, sourced definitions of key medical-education and clinical-simulation terms, including competency-based medical education (CBME), EPAs, ACGME Milestones, Clinical Competency Committees, OSCEs, standardized patients, deliberate practice, and remediation. Terms listed below have their own page.`,
    ...glossaryTermPages.map(
      (term) =>
        `- [${term.term}](${BASE_URL}/glossary/${term.slug}): ${term.metaDescription}`
    ),
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
