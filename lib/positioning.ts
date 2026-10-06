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
 * communication against the standard an institution already holds and turns
 * that evidence into focused practice. Seats and features are not the pitch.
 */

/**
 * The company-level category statement. Deck slide 1 (seed deck v10,
 * 2026-08-27) leads with this line, and the 2026-08-07 GEO audit listed it as a
 * public candidate pending positioning approval.
 *
 * "Clinical" was added 2026-10-06, from the Walia & Miller strategy decks. In
 * running copy the category is lowercase "clinical communication intelligence";
 * the acronym CCI is reserved for a dedicated category page.
 *
 * Never ship it alone. It is an abstraction, and an abstraction with no
 * definition attached is exactly the kind of sentence an answer engine cannot
 * quote. Pair it with CATEGORY_DEFINITION on first use.
 */
export const CATEGORY_LINE =
  "The clinical communication intelligence platform for healthcare."

/**
 * The plain-language unpacking of CATEGORY_LINE. It opens with a one-sentence
 * definition of the category (Walia & Miller, 2026-10) and then says what the
 * participant does. Practice is the participant's
 * experience and measurement is the institution's method. The scoring paths
 * stay named because lib/market-positioning.test.ts asserts both appear.
 */
export const CATEGORY_MEANING =
  "Clinical communication intelligence means making how healthcare teams handle important conversations visible, interpretable, and improvable."

export const CATEGORY_DEFINITION = `${CATEGORY_MEANING} Clinicians, medical learners, and patient facing staff practice spoken conversations with AI patients. ClinicalSim scores each simulation against published clinical frameworks or the institution's own policy, service standard, script, or rubric, quotes the participant's own words under every score, and shows what they did well and what to practice next.`

/**
 * The canonical one-liner. Feeds POSITIONING_LONG (root metadata, the
 * Organization and WebSite nodes, /about), the footer tagline, and the /llms.txt
 * header. Keep the wording identical everywhere it appears: repetition across
 * pages is what makes a sentence extractable, and a near-variant reads to a
 * retrieval system as a competing claim rather than the same one.
 */
export const POSITIONING_ONE_LINER =
  "ClinicalSim gives clinicians and staff spoken practice with AI patients and measures each simulation against the standard your institution already holds."

/** The sentence that follows the one-liner wherever there is room for two. */
export const POSITIONING_SUPPORT =
  "Participants see what they did well and what to practice next, with their own words under every score. Leaders can review patterns by cohort or unit and decide where the group focuses its next round of practice. Cases use published clinical frameworks or the institution's own policy, service standard, script, or rubric."

/** One-liner plus support. The default for a meta description or a schema node. */
export const POSITIONING_LONG = `${POSITIONING_ONE_LINER} ${POSITIONING_SUPPORT}`

/**
 * Who the platform is for. Kept here because Organization.description and the
 * /llms.txt facts block should not drift from each other on this point. Both
 * markets are named on purpose: residency, fellowship, and medical school
 * programs are where traction is and must not read as an afterthought.
 */
export const POSITIONING_AUDIENCE =
  "Health systems use ClinicalSim across patient experience, risk and safety, informed consent, error disclosure, and debriefing. Residency, fellowship, and medical school programs use it for competency assessment, OSCE practice, and faculty development."

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
  "ClinicalSim measures a simulated clinical conversation against a named standard, with the participant's own words quoted under every score."

/**
 * The entry point. Rendered in /llms.txt ("How it starts").
 *
 * Rewritten 2026-10-06 to describe the engagement sequence Ben confirmed
 * (assessment, then a longer program, then a continuing engagement). No prices,
 * scope allowances, or durations: none of those are published.
 */
export const ASSESSMENT_ENTRY =
  "An engagement starts with a communication priority your institution already recognizes. In a communication assessment, one group practices a conversation or two with AI patients against the standard your institution already holds, and the report shows strengths and areas for focused practice in the participants' own words. A longer program can include that baseline, and a continuing engagement extends practice and review across more teams."

/**
 * The one in-page primary call to action, from the Walia & Miller decks
 * (2026-10). The decision it invites is about the program, never about a
 * person. The short header button keeps "Talk with us".
 */
export const PRIMARY_CTA = "Discuss your communication priorities"

/**
 * The publisher logo used by every Organization node on the site: the site-wide
 * Organization, the Article publisher on each insight post, and VideoObject.
 *
 * Defined once because those three call sites all pointed independently at
 * /logo.svg, which has never existed and returned a 404 in production. A logo
 * URL that 404s makes the whole publisher node unusable, so this path is the
 * square brand mark that is actually committed under public/, and the
 * dimensions are the real pixel dimensions of that file.
 */
export const ORGANIZATION_LOGO = {
  url: "https://clinicalsim.ai/brand/ClinicalSim_Logo_Icon_DarkBlue.png",
  width: "1200",
  height: "1200",
} as const

/**
 * The mission statement, approved by Ben on 2026-09-03 and published verbatim.
 *
 * Two things about it are deliberate and should not be "cleaned up":
 *
 * 1. It keeps its em dashes. Every other string in this file is dash free
 *    because the brand voice rules ban them in published copy, and
 *    lib/market-positioning.test.ts asserts that for the positioning
 *    constants. The mission was written by hand and approved as written, so it
 *    is the one exception, and the test below locks the wording instead of the
 *    punctuation.
 * 2. It says "aims to change that", not "changes that". The claim is an
 *    intention, which is what the company can honestly say today.
 *
 * Split into a lead sentence and the paragraph that follows so /about can set
 * the first line larger without either half being retyped. MISSION_STATEMENT is
 * the whole thing in one string for /llms.txt and any schema or metadata use.
 */
export const MISSION_STATEMENT_LEAD =
  "Our mission is to improve clinical communication to improve patient care—and make an extraordinarily hard job a little less hard."

export const MISSION_STATEMENT_BODY = [
  "Medicine measures how patients experience communication, but rarely the communication itself: what clinicians say, how they say it, and how they can improve.",
  "We send clinicians into some of the hardest conversations of a family's life with little practice or feedback, and both patients and clinicians bear the consequences.",
  "ClinicalSim aims to change that by making communication a skill we can practice, measure, and improve—so what is said and what is understood are finally the same thing.",
] as const

/** Lead plus body, as one paragraph. */
export const MISSION_STATEMENT = [
  MISSION_STATEMENT_LEAD,
  ...MISSION_STATEMENT_BODY,
].join(" ")
