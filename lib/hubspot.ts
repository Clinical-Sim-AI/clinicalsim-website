// HubSpot Forms API settings for the branded /contact and /research forms.
// The portal ID and form GUIDs are public (they appear in any HubSpot embed),
// so they live here as constants rather than environment variables.

export const HUBSPOT_PORTAL_ID = "247619565"

// Fill these from HubSpot > Marketing > Forms > (form) > Share > Embed code.
// Each form must contain every property its page sends, or HubSpot drops it.
export const HUBSPOT_FORMS = {
  contact: "ce2bc823-8a6d-4539-ac23-6c88e0cdb6c4",
  research: "180d381a-0733-493d-a667-076c99f7397a",
} as const

export type HubSpotFormKey = keyof typeof HUBSPOT_FORMS

export interface HubSpotField {
  name: string
  value: string
}

export interface HubSpotContext {
  hutk?: string
  pageUri: string
  pageName: string
}

// A form input named `fullname` is split into HubSpot's firstname and
// lastname, because the research form asks for one name field.
export const FULL_NAME_FIELD = "fullname"

export function hubSpotSubmitUrl(formGuid: string): string {
  return `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formGuid}`
}

export function splitFullName(fullName: string): { firstname: string; lastname: string } {
  const trimmed = fullName.trim().replace(/\s+/g, " ")
  const space = trimmed.indexOf(" ")
  if (space === -1) return { firstname: trimmed, lastname: "" }
  return { firstname: trimmed.slice(0, space), lastname: trimmed.slice(space + 1) }
}

// Converts form entries to the HubSpot `fields` array. Blank values are
// dropped so an unanswered optional field never overwrites a contact
// property HubSpot already holds. Checkbox names listed in `booleanFields`
// are always sent, as "true" or "false", because an unchecked box submits
// nothing at all.
export function toHubSpotFields(
  entries: Iterable<[string, FormDataEntryValue]>,
  booleanFields: readonly string[] = [],
): HubSpotField[] {
  const fields: HubSpotField[] = []
  const present = new Set<string>()

  for (const [name, raw] of entries) {
    if (typeof raw !== "string") continue
    present.add(name)
    if (booleanFields.includes(name)) continue

    const value = raw.trim()
    if (!value) continue

    if (name === FULL_NAME_FIELD) {
      const { firstname, lastname } = splitFullName(value)
      fields.push({ name: "firstname", value: firstname })
      if (lastname) fields.push({ name: "lastname", value: lastname })
      continue
    }

    fields.push({ name, value })
  }

  for (const name of booleanFields) {
    fields.push({ name, value: present.has(name) ? "true" : "false" })
  }

  return fields
}

// Reads the `hubspotutk` visitor cookie the HubSpot tracking script sets.
// Passing it as `hutk` ties the submission to the visitor's page views.
export function readHubSpotUtk(cookieHeader: string): string | undefined {
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=")
    if (key === "hubspotutk") {
      const value = rest.join("=")
      return value || undefined
    }
  }
  return undefined
}

export function buildHubSpotPayload(fields: HubSpotField[], context: HubSpotContext) {
  const { hutk, ...rest } = context
  return {
    fields,
    context: hutk ? { hutk, ...rest } : rest,
  }
}

// Ben's HubSpot meetings scheduling page, e.g.
// "https://meetings-na2.hubspot.com/ben-conway". While this is empty the
// booking section on /contact renders nothing.
export const HUBSPOT_MEETINGS_URL = ""

// Builds the iframe URL HubSpot's own MeetingsEmbedCode.js would build. The
// parent page URL and hubspotutk tie the booking to the visitor's tracked
// session, so the contact's original source (direct, organic search,
// referral, ...) and the booking page are recorded in HubSpot.
export function buildMeetingsEmbedUrl(
  meetingsUrl: string,
  { hutk, pageUrl }: { hutk?: string; pageUrl: string },
): string {
  const url = new URL(meetingsUrl)
  url.searchParams.set("embed", "true")
  url.searchParams.set("parentPageUrl", pageUrl)
  if (hutk) url.searchParams.set("parentHubspotUtk", hutk)
  return url.toString()
}

// The meetings iframe posts { meetingBookSucceeded: true, ... } to the parent
// window when a booking completes.
export function isMeetingBookedMessage(origin: string, data: unknown): boolean {
  if (!/^https:\/\/meetings(-[a-z0-9]+)?\.hubspot\.com$/.test(origin)) return false
  return typeof data === "object" && data !== null && (data as { meetingBookSucceeded?: unknown }).meetingBookSucceeded === true
}
