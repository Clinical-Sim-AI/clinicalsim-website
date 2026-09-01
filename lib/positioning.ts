/**
 * The canonical positioning strings.
 *
 * Why this file exists: the one-liner below was already written verbatim in four
 * places (the homepage description and its "What is ClinicalSim?" h2, the
 * /llms.txt header, and /about), but the three descriptions that sit ABOVE those
 * in the metadata hierarchy each said something different. Root metadata claimed
 * ClinicalSim was "built by simulation directors and communication researchers",
 * a phrase used nowhere else on the site; Organization.description and
 * WebSite.description each led with a third and fourth wording. An AI system
 * reads the root default and the Organization node first, so the site's clearest
 * sentence was the one it was least likely to see.
 *
 * Import from here rather than retyping. Anything that describes the company as
 * a whole should use these.
 */

/**
 * The company-level category statement. Deck slide 1 (seed deck v10,
 * 2026-08-27) leads with this line, and the 2026-08-07 GEO audit listed it as a
 * public candidate pending positioning approval.
 *
 * Never ship it alone. It is an abstraction, and an abstraction with no
 * definition attached is exactly the kind of sentence an answer engine cannot
 * quote. Pair it with CATEGORY_DEFINITION on first use.
 */
export const CATEGORY_LINE =
  "The communication intelligence platform for health systems."

/**
 * The plain-language unpacking of CATEGORY_LINE, from deck slide 3's three-part
 * product definition. The third part is deliberately reconciled to the site's
 * own wording ("named physicians write and review each case") rather than the
 * deck's stronger phrasing about national standards.
 */
export const CATEGORY_DEFINITION =
  "Clinicians, medical learners, and patient facing staff practice spoken encounters with AI patients. Cases use published clinical frameworks or an institution supplied policy, service standard, script, or rubric, with transcript evidence behind every score."

/**
 * The canonical one-liner. Already the homepage h2 and the /llms.txt header
 * blurb. Keep the wording identical everywhere it appears: repetition across
 * pages is what makes a sentence extractable, and a near-variant reads to a
 * retrieval system as a competing claim rather than the same one.
 */
export const POSITIONING_ONE_LINER =
  "ClinicalSim gives healthcare teams voice-based practice with AI patients and gives leaders the transcript evidence behind each score."

/** The sentence that follows the one-liner wherever there is room for two. */
export const POSITIONING_SUPPORT =
  "Teams can start with ready to use cases based on published clinical frameworks or add an institution's policy, service standard, script, or rubric."

/** One-liner plus support. The default for a meta description or a schema node. */
export const POSITIONING_LONG = `${POSITIONING_ONE_LINER} ${POSITIONING_SUPPORT}`

/**
 * Who the platform is for. Kept here because Organization.description and the
 * /llms.txt facts block should not drift from each other on this point.
 */
export const POSITIONING_AUDIENCE =
  "Health systems use ClinicalSim across patient experience, risk and safety, medical education, and faculty development."

export type Market = "health-system" | "medical-education"

/**
 * The instrument claim, from the use case library brief (2026-08-31).
 *
 * This is what makes the product a category rather than a training tool, and it is the sentence
 * /frameworks is built to be cited for. It is deliberately separate from POSITIONING_ONE_LINER:
 * the one-liner describes what a learner and a faculty member each get, this describes what the
 * thing is. Both are true; rewriting the one-liner into this is a positioning decision Ben has
 * not made.
 */
export const MEASUREMENT_CLAIM =
  "ClinicalSim measures a spoken clinical conversation against a named standard, person by person, with the clinician's own words quoted under every score."
