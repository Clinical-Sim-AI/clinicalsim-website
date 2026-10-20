// Gated download for the full white paper "The impact of communication on
// hospital economics" (2026-10-20). The shorter web edition is the indexable
// insight post at ECONOMICS_POST_PATH; this is the long version. Same setup as
// lib/cci-executive-brief.ts: HubSpot holds the form, the PDF, and the redirect.

import { HUBSPOT_MEETINGS_URL, HUBSPOT_PORTAL_ID } from "@/lib/hubspot"

export const ECONOMICS_PAPER_PATH = "/resources/hospital-economics-white-paper"
export const ECONOMICS_PAPER_URL = `https://clinicalsim.ai${ECONOMICS_PAPER_PATH}`
export const ECONOMICS_PAPER_THANK_YOU_PATH = `${ECONOMICS_PAPER_PATH}/thank-you`
export const ECONOMICS_PAPER_THANK_YOU_URL = `https://clinicalsim.ai${ECONOMICS_PAPER_THANK_YOU_PATH}`

/** The web edition of the same paper. */
export const ECONOMICS_POST_PATH = "/insights/communication-and-hospital-economics"

/**
 * The form "Hospital economics white paper download", cloned from the CCI brief
 * form on 2026-10-20. Its redirect points at ECONOMICS_PAPER_THANK_YOU_URL.
 */
export const ECONOMICS_PAPER_FORM = {
  scriptSrc: `https://js-na2.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`,
  region: "na2",
  formId: "4d0465b5-c683-4c83-a578-f16fb8cfcdbb",
  portalId: HUBSPOT_PORTAL_ID,
} as const

/** HubSpot File Manager, Lead magnets folder, "Public - noindex". */
export const ECONOMICS_PAPER_PDF_URL =
  "https://247619565.fs1.hubspotusercontent-na2.net/hubfs/247619565/Lead%20magnets/hospital-economics-white-paper-v1-2026-10-20.pdf"

export const ECONOMICS_PAPER_MEETINGS_URL = `${HUBSPOT_MEETINGS_URL}?utm_source=website&utm_medium=landing-page&utm_campaign=hospital-economics-white-paper`
