"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { sendGAEvent } from "@next/third-parties/google"
import { cn } from "@/lib/utils"
import {
  HUBSPOT_FORMS,
  buildHubSpotPayload,
  hubSpotSubmitUrl,
  readHubSpotUtk,
  toHubSpotFields,
  toHubSpotContactFields,
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
  /** Optional content under the message, such as links to read while the visitor waits. */
  successDetail?: ReactNode
}

// Submits a branded form to the HubSpot Forms API instead of using HubSpot's
// embed, which would replace the site's styling with HubSpot markup. The
// field markup stays in the page; input names must be HubSpot property names.
export function HubSpotForm({ form, children, className, booleanFields = [], successMessage, successDetail }: HubSpotFormProps) {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const element = event.currentTarget
    setStatus("pending")

    try {
      const formGuid = HUBSPOT_FORMS[form]
      if (!formGuid) throw new Error(`No HubSpot form GUID configured for "${form}"`)

      const fields = (form === "contact" ? toHubSpotContactFields : toHubSpotFields)(
        new FormData(element).entries(), booleanFields,
      )
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
        {successDetail}
      </div>
    )
  }

  return (
    // data-hs-do-not-collect stops the HubSpot tracking script's collected
    // forms feature from submitting this form a second time. method="post"
    // keeps a submit that lands before hydration from putting the visitor's
    // email and message in the URL (and so in GA4 and server logs).
    // The spacing class goes on the fieldset, not the form: the fields are the
    // fieldset's children, so a space-y-* on the form never reached them.
    <form method="post" onSubmit={handleSubmit} data-hs-do-not-collect="true" aria-busy={status === "pending"}>
      <fieldset disabled={status === "pending"} className={cn("m-0 min-w-0 border-0 p-0", className)}>
        {children}
      </fieldset>
      <p role="alert" aria-live="assertive" className="mt-4 text-sm text-white empty:mt-0">
        {status === "error" &&
          "Something went wrong sending your message. Please try again in a moment."}
      </p>
    </form>
  )
}
