/**
 * The sentences ClinicalSim is obliged to publish, and the phrases it must never publish.
 *
 * Why this file exists: the use case library brief (2026-08-31) expands the site from graduate
 * medical education into informed consent, error disclosure, and eventually nursing, patient
 * experience, and advance care planning. Each new lane names an accreditor or a framework owner,
 * and each one carries a distinct way to overclaim. Writing the disclaimers by hand on each page
 * guarantees that the seventh page forgets one.
 *
 * So the sentences live here, the pages declare which ones apply through registry fields, and
 * `lib/claim-discipline.test.ts` fails the build when a conversation page is missing them or when
 * a banned phrase reaches any registry.
 *
 * These are legal-exposure sentences, not marketing copy. Do not soften them, do not paraphrase
 * them into a page, and do not "improve" them without Ben's sign-off.
 */

/**
 * Required wherever a framework owner or accreditor is named.
 *
 * ACGME's non-endorsement policy is explicit: "To the extent any vendor states that it is
 * endorsed by the ACGME or that its product will allow compliance with or meets ACGME standards,
 * such statement is false." Assume ANCC, ABMS and its member boards, the Joint Commission, ACCME,
 * NCQA, AACN, and NQF all run the same rule.
 *
 * @param orgs Organizations named on the page, in the order they should read aloud.
 */
export function nonEndorsementLine(orgs: string[]): string {
  if (orgs.length === 0) {
    throw new Error("nonEndorsementLine requires at least one organization")
  }

  // Two names take a bare "or". Only three or more take the serial comma before it, otherwise
  // the line renders as "approved by the ACGME, or the American Board of Pediatrics (ABP)".
  const named =
    orgs.length === 1
      ? orgs[0]
      : orgs.length === 2
        ? `${orgs[0]} or ${orgs[1]}`
        : `${orgs.slice(0, -1).join(", ")}, or ${orgs[orgs.length - 1]}`

  return `ClinicalSim is not endorsed by, affiliated with, or approved by ${named}. Scores map to published frameworks; they do not establish compliance with any standard, which a surveyor determines against the institution's own policy.`
}

/**
 * The high-stakes limitation. Already published as an answer on /faq ("Can ClinicalSim's
 * milestone-aligned scores be used for high-stakes decisions?"), and it matters more in the new
 * lanes, not less: nursing scores touch licensure and privileging, and patient experience scores
 * touch compensation at many systems.
 */
export const FORMATIVE_USE_LIMITATION =
  "ClinicalSim output is formative. It is evidence that informs program judgment, and it is not intended for employment, credentialing, privileging, licensure, or other high-stakes decisions."

/**
 * Publishing this is a competitive act. None of the incumbents publishes one, and every buyer who
 * has read an AI scoring pitch before is waiting to ask the question.
 */
export const RATER_VALIDATION_LIMITATION =
  "Consistency between model runs is not the same thing as agreement with expert human raters. Faculty-rater validation on a customer's own rubric is the gate before any high-stakes use, and that work has not been done."

export const NO_OUTCOME_PREDICTION_LIMITATION =
  "ClinicalSim does not predict patient experience scores, readmissions, safety events, claims, or other clinical or business outcomes. Any comparison with institution-held outcome data requires a separate study plan."

export const NO_EMPLOYMENT_USE_LIMITATION =
  "Formative scores must not be used for employment decisions, discipline, compensation, credentialing, privileging, or licensure. Institutions should set access, retention, and reporting rules before staff participate."

/**
 * Consistent with the published /faq answer. A "replaces SPs" line on any page contradicts it and
 * antagonizes the simulation directors who are the internal champions.
 */
export const SP_SUPPLEMENT_LINE =
  "ClinicalSim extends a standardized patient program and does not replace it. SP encounters remain the gold standard for live coaching and high-stakes assessment."

/**
 * Phrases that must not appear in any content registry.
 *
 * Each entry names why it is banned, because a future reader will otherwise assume the list is
 * stylistic and relax it. Keep patterns narrow: a false positive should be fixed by tightening
 * the regex, never by adding an exemption list.
 */
export const BANNED_CLAIM_PATTERNS: { pattern: RegExp; why: string }[] = [
  {
    pattern: /\bACGME[- ](compliant|approved|endorsed)\b/i,
    why: "ACGME's own policy states that a vendor claim of ACGME endorsement or compliance is false.",
  },
  {
    pattern: /\b(meets|satisfies|ensures compliance with)\s+(the\s+)?(ACGME|Joint Commission|CMS|ANCC|NCQA|ACCME)\b/i,
    why: "Compliance is determined by a surveyor against the institution's own policy, never by a vendor's tool.",
  },
  {
    pattern: /\bJoint Commission[- ](compliant|ready|approved)\b/i,
    why: "Survey readiness is not a claim a vendor can make.",
  },
  {
    pattern: /\bsurvey[- ]ready\b/i,
    why: "Same rule as Joint Commission readiness.",
  },
  {
    pattern: /\bMagnet[- ]?ready\b/i,
    why: "Magnet and Magnet Recognition are registered ANCC trademarks and cannot modify a product claim.",
  },
  {
    pattern: /\bPTAP[- ]aligned\b/i,
    why: "ANCC decides what satisfies a PTAP criterion, not the vendor.",
  },
  {
    // Declarative and promissory forms only. "Does ClinicalSim replace standardized patients?" is
    // a question two comparison pages ask and answer with no, and flagging it would train people
    // to ignore this test.
    pattern: /\b(replaces|replacement for)\s+(your\s+)?standardi[sz]ed patient/i,
    why: "Contradicts the published /faq answer. See SP_SUPPLEMENT_LINE.",
  },
  {
    pattern: /\breduc(e|es|ed|ing)\s+(malpractice|claims|indemnity|liability)\b/i,
    why: "An outcome claim requiring competent and reliable substantiation that ClinicalSim does not have.",
  },
  {
    pattern: /\b(capture|captures|capturing|unlock|unlocks)\s+(revenue|reimbursement|billing)\b/i,
    why: "Fraud-adjacent on the billable-conversation lanes. Never put revenue in the same sentence as the product's output.",
  },
  {
    pattern: /\bclinically proven\b/i,
    why: "Brand voice rule: say evidence-based.",
  },
  {
    pattern: /\bvalidated rubric\b/i,
    why: "No validated rubric exists for scoring a live procedural consent conversation in clinical care. Write 'scored against'.",
  },
]

/**
 * Accreditors and framework owners whose appearance in a solution's copy obliges a
 * non-endorsement line on that same entry.
 *
 * CMS is deliberately absent. Every other name here runs a formal non-endorsement or mark-use
 * policy, so naming one raises a real implied-endorsement question. CMS is a payer whose coverage
 * decisions and survey instruments are public domain; citing 42 CFR 482.51 or the HCAHPS item
 * wording is a factual reference, not a claim about CMS's opinion. Adding CMS here would fire on
 * nearly every string in the registry and train people to ignore the test. The separate ban on
 * "meets CMS requirements" in BANNED_CLAIM_PATTERNS is what actually guards that exposure.
 */
export const NON_ENDORSEMENT_TRIGGERS = [
  "ACGME",
  "ANCC",
  "Magnet",
  "ABMS",
  "ABP",
  "Joint Commission",
  "AHRQ",
  "NQF",
  "American College of Surgeons",
] as const
