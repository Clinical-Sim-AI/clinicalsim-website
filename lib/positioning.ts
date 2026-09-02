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
 *
 * Repositioned 2026-09-02 after Ben's call with advisors: the company measures
 * communication against the standard an institution already holds, shows where
 * it breaks down per person, and fixes it. Seats and features are not the pitch.
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
 * The plain-language unpacking of CATEGORY_LINE. Measure, show, fix: the three
 * verbs Ben settled on 2026-09-02. The scoring paths (published framework or the
 * institution's own standard) stay named because lib/market-positioning.test.ts
 * asserts both appear.
 */
export const CATEGORY_DEFINITION =
  "Clinicians, medical learners, and patient facing staff hold spoken conversations with AI patients. ClinicalSim scores each conversation against published clinical frameworks or the institution's own policy, service standard, script, or rubric, quotes the participant's own words under every score, and gives people practice on the elements they missed."

/**
 * The canonical one-liner. Feeds POSITIONING_LONG (root metadata, the
 * Organization and WebSite nodes, /about), the footer tagline, and the /llms.txt
 * header. Keep the wording identical everywhere it appears: repetition across
 * pages is what makes a sentence extractable, and a near-variant reads to a
 * retrieval system as a competing claim rather than the same one.
 */
export const POSITIONING_ONE_LINER =
  "ClinicalSim measures how clinicians and staff talk with patients, against the standard your institution already holds, and fixes what it finds."

/** The sentence that follows the one-liner wherever there is room for two. */
export const POSITIONING_SUPPORT =
  "Every score quotes the participant's own words, by person, cohort, or unit. Cases use published clinical frameworks or the institution's own policy, service standard, script, or rubric."

/** One-liner plus support. The default for a meta description or a schema node. */
export const POSITIONING_LONG = `${POSITIONING_ONE_LINER} ${POSITIONING_SUPPORT}`

/**
 * Who the platform is for. Kept here because Organization.description and the
 * /llms.txt facts block should not drift from each other on this point. Both
 * markets are named on purpose: residency, fellowship, and medical school
 * programs are where traction is and must not read as an afterthought.
 */
export const POSITIONING_AUDIENCE =
  "Health systems use ClinicalSim across patient experience, risk and safety, informed consent, error disclosure, and debriefing. Residency, fellowship, and medical school programs use it for milestones, OSCE practice, and faculty development."

export type Market = "health-system" | "medical-education"

/**
 * The instrument claim, from the use case library brief (2026-08-31).
 *
 * This is what makes the product a category rather than a training tool. It is
 * the /llms.txt frameworks line. It stays separate from POSITIONING_ONE_LINER:
 * the one-liner says what the company does for a buyer, this says what the
 * instrument is. Both are true.
 */
export const MEASUREMENT_CLAIM =
  "ClinicalSim measures a spoken clinical conversation against a named standard, person by person, with the participant's own words quoted under every score."

/** The entry point. Shared by the homepage, /contact, and /llms.txt. */
export const ASSESSMENT_ENTRY =
  "An engagement starts with an assessment. You send the standard you already hold, one group runs a conversation or two with AI patients, and the report shows where the conversation breaks down, in the participants' own words."
