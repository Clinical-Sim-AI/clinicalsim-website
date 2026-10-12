// Gated download for "The conversations behind nurse turnover" (Ben's handoff,
// nursing-turnover-brief v1, 2026-10-12). HubSpot holds the form, the PDF, the
// post-submit redirect to the thank-you page, and the follow-up emails.

export const NURSING_BRIEF_PATH = "/resources/nursing-turnover-brief"
export const NURSING_BRIEF_URL = `https://clinicalsim.ai${NURSING_BRIEF_PATH}`
export const NURSING_BRIEF_THANK_YOU_PATH = `${NURSING_BRIEF_PATH}/thank-you`

/**
 * The form "Nursing turnover brief download", taken from HubSpot's embed code.
 * The portal is hosted in na2, the same region as the sitewide tracking script.
 */
export const NURSING_BRIEF_FORM = {
  scriptSrc: "https://js-na2.hsforms.net/forms/embed/247619565.js",
  region: "na2",
  formId: "687f4501-b1c7-46de-98ca-c65ac9c9f2ca",
  portalId: "247619565",
} as const

export const NURSING_BRIEF_PDF_URL =
  "https://247619565.fs1.hubspotusercontent-na2.net/hubfs/247619565/Lead%20magnets/nursing-turnover-brief-v1-2026-10-12.pdf"

/** Ben's meetings link, tagged so a booking from this page credits the campaign. */
export const NURSING_BRIEF_MEETINGS_URL =
  "https://meetings-na2.hubspot.com/benjamin-conway/book-a-demo-with-ben-conway?utm_source=website&utm_medium=landing-page&utm_campaign=nursing-turnover-brief"
