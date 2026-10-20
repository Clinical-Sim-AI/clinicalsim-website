// Gated download for the two-page executive brief on clinical communication
// intelligence (Walia & Miller Doc 7, section 5; built 2026-10-20). Same setup
// as lib/nursing-turnover-brief.ts: HubSpot holds the form, the PDF, and the
// post-submit redirect to the thank-you page. Unlike the nursing brief, no
// follow-up email is configured, so no page promises one.

import { HUBSPOT_MEETINGS_URL, HUBSPOT_PORTAL_ID } from "@/lib/hubspot"

export const CCI_BRIEF_PATH = "/resources/cci-executive-brief"
export const CCI_BRIEF_URL = `https://clinicalsim.ai${CCI_BRIEF_PATH}`
export const CCI_BRIEF_THANK_YOU_PATH = `${CCI_BRIEF_PATH}/thank-you`
export const CCI_BRIEF_THANK_YOU_URL = `https://clinicalsim.ai${CCI_BRIEF_THANK_YOU_PATH}`

/**
 * The form "CCI executive brief download", cloned from the nursing brief's form
 * on 2026-10-20 so the fields, consent text, and contact settings match. Its
 * redirect points at CCI_BRIEF_THANK_YOU_URL.
 */
export const CCI_BRIEF_FORM = {
  scriptSrc: `https://js-na2.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`,
  region: "na2",
  formId: "3551aab8-8582-4163-b7fe-f92eb874ee88",
  portalId: HUBSPOT_PORTAL_ID,
} as const

/** HubSpot File Manager, Lead magnets folder, "Public - noindex". */
export const CCI_BRIEF_PDF_URL =
  "https://247619565.fs1.hubspotusercontent-na2.net/hubfs/247619565/Lead%20magnets/cci-executive-brief-v1-2026-10-20.pdf"

/** The meetings link, tagged so a booking from this page credits the brief. */
export const CCI_BRIEF_MEETINGS_URL = `${HUBSPOT_MEETINGS_URL}?utm_source=website&utm_medium=landing-page&utm_campaign=cci-executive-brief`
