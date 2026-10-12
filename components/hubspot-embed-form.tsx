"use client"

import Script from "next/script"

interface HubSpotEmbedFormProps {
  scriptSrc: string
  region: string
  formId: string
  portalId: string
}

// HubSpot's own form embed, used where HubSpot owns the whole flow (fields,
// redirect, follow-up emails), as on the nursing turnover brief. The branded
// /contact and /research forms post to the Forms API instead; see
// components/hubspot-form.tsx.
export function HubSpotEmbedForm({ scriptSrc, region, formId, portalId }: HubSpotEmbedFormProps) {
  return (
    <>
      <Script src={scriptSrc} strategy="afterInteractive" />
      <div
        className="hs-form-frame"
        data-region={region}
        data-form-id={formId}
        data-portal-id={portalId}
      />
    </>
  )
}
