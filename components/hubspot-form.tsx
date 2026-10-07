"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { sendGAEvent } from "@next/third-parties/google"
import {
  HUBSPOT_FORMS,
  buildHubSpotPayload,
  hubSpotSubmitUrl,
  readHubSpotUtk,
  toHubSpotFields,
  type HubSpotFormKey,
} from "@/lib/hubspot"

type Status = "idle" | "pending" | "success" | "error"

interface HubSpotFormProps {
  form: HubSpotFormKey
  children: ReactNode
  className?: string
  // Checkbox names to send as "true" / "false" (see toHubSpotFields).
  booleanFields?: string[]
  successMessage: string
}

// Submits a branded form to the HubSpot Forms API instead of using HubSpot's
// embed, which would replace the site's styling with HubSpot markup. The
// field markup stays in the page; input names must be HubSpot property names.
export function HubSpotForm({ form, children, className, booleanFields = [], successMessage }: HubSpotFormProps) {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const element = event.currentTarget
    setStatus("pending")

    try {
      const formGuid = HUBSPOT_FORMS[form]
      if (!formGuid) throw new Error(`No HubSpot form GUID configured for "${form}"`)

      const fields = toHubSpotFields(new FormData(element).entries(), booleanFields)
      const payload = buildHubSpotPayload(fields, {
        hutk: readHubSpotUtk(document.cookie),
        pageUri: window.location.href,
        pageName: document.title,
      })

      const response = await fetch(hubSpotSubmitUrl(formGuid), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`HubSpot responded ${response.status}: ${await response.text()}`)

      element.reset()
      setStatus("success")
      sendGAEvent("event", "generate_lead", { method: `hubspot_${form}_form` })
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl border border-cs-electric/40 bg-white/10 p-6 text-white">
        <p className="text-lg font-medium text-cs-electric mb-2">Thank you.</p>
        <p className="font-light text-cs-cloud">{successMessage}</p>
      </div>
    )
  }

  return (
    // data-hs-do-not-collect stops the HubSpot tracking script's collected
    // forms feature from submitting this form a second time. method="post"
    // keeps a submit that lands before hydration from putting the visitor's
    // email and message in the URL (and so in GA4 and server logs).
    <form method="post" onSubmit={handleSubmit} className={className} data-hs-do-not-collect="true" aria-busy={status === "pending"}>
      <fieldset disabled={status === "pending"} className="contents">
        {children}
      </fieldset>
      <p role="alert" aria-live="assertive" className="text-sm text-white">
        {status === "error" &&
          "Something went wrong sending your message. Please try again in a moment."}
      </p>
    </form>
  )
}
