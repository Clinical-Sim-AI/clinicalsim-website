"use client"

import { useEffect, useState } from "react"
import { sendGAEvent } from "@next/third-parties/google"
import {
  HUBSPOT_MEETINGS_URL,
  buildMeetingsEmbedUrl,
  isMeetingBookedMessage,
  readHubSpotUtk,
} from "@/lib/hubspot"

// The HubSpot tracking script loads after hydration, so on a first visit the
// hubspotutk cookie may not exist yet when this mounts. Wait briefly for it
// before building the iframe URL, or the booking loses its traffic source.
const UTK_WAIT_MS = 3000
const UTK_POLL_MS = 250

// Embeds Ben's HubSpot scheduling page. Builds the iframe itself instead of
// loading MeetingsEmbedCode.js, which only scans the DOM once on load and
// misses containers rendered after a client-side navigation.
export function HubSpotMeetings({ title }: { title: string }) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!HUBSPOT_MEETINGS_URL) return
    const started = Date.now()
    const timer = window.setInterval(() => {
      const hutk = readHubSpotUtk(document.cookie)
      if (hutk || Date.now() - started >= UTK_WAIT_MS) {
        window.clearInterval(timer)
        setSrc(buildMeetingsEmbedUrl(HUBSPOT_MEETINGS_URL, { hutk, pageUrl: window.location.href }))
      }
    }, UTK_POLL_MS)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (!isMeetingBookedMessage(event.origin, event.data)) return
      // GA4 attributes this to the session's source (direct, organic, ...).
      sendGAEvent("event", "generate_lead", { method: "hubspot_meeting" })
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  if (!HUBSPOT_MEETINGS_URL) return null

  return (
    <div className="h-[760px] w-full overflow-hidden rounded-xl border border-cs-gray bg-white">
      {src ? (
        <iframe src={src} title={title} className="h-full w-full" />
      ) : (
        <p className="p-6 text-cs-dark-gray font-light">Loading the calendar...</p>
      )}
    </div>
  )
}
