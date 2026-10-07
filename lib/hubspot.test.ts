import { describe, expect, it } from "vitest"
import {
  buildHubSpotPayload,
  buildMeetingsEmbedUrl,
  isMeetingBookedMessage,
  hubSpotSubmitUrl,
  readHubSpotUtk,
  splitFullName,
  toHubSpotFields,
} from "./hubspot"

describe("toHubSpotFields", () => {
  it("drops blank values and trims the rest", () => {
    const fields = toHubSpotFields([
      ["email", " a@example.com "],
      ["company", ""],
      ["team", "   "],
    ])
    expect(fields).toEqual([{ name: "email", value: "a@example.com" }])
  })

  it("sends a checked box as true and a missing one as false", () => {
    expect(toHubSpotFields([["newsletter_opt_in", "on"]], ["newsletter_opt_in"])).toEqual([
      { name: "newsletter_opt_in", value: "true" },
    ])
    expect(toHubSpotFields([["email", "a@example.com"]], ["newsletter_opt_in"])).toEqual([
      { name: "email", value: "a@example.com" },
      { name: "newsletter_opt_in", value: "false" },
    ])
  })

  it("splits fullname into firstname and lastname", () => {
    expect(toHubSpotFields([["fullname", "Jane van der Berg"]])).toEqual([
      { name: "firstname", value: "Jane" },
      { name: "lastname", value: "van der Berg" },
    ])
    expect(toHubSpotFields([["fullname", "Cher"]])).toEqual([{ name: "firstname", value: "Cher" }])
  })
})

describe("splitFullName", () => {
  it("collapses extra whitespace", () => {
    expect(splitFullName("  Ada   Lovelace ")).toEqual({ firstname: "Ada", lastname: "Lovelace" })
  })
})

describe("readHubSpotUtk", () => {
  it("finds the cookie among others", () => {
    expect(readHubSpotUtk("_ga=1; hubspotutk=abc123; other=x")).toBe("abc123")
  })

  it("returns undefined when absent or empty", () => {
    expect(readHubSpotUtk("_ga=1")).toBeUndefined()
    expect(readHubSpotUtk("hubspotutk=")).toBeUndefined()
    expect(readHubSpotUtk("")).toBeUndefined()
  })
})

describe("buildHubSpotPayload", () => {
  it("omits hutk when there is no tracking cookie", () => {
    const payload = buildHubSpotPayload([], { pageUri: "https://clinicalsim.ai/contact", pageName: "Contact" })
    expect(payload.context).toEqual({ pageUri: "https://clinicalsim.ai/contact", pageName: "Contact" })
  })
})

describe("hubSpotSubmitUrl", () => {
  it("targets the portal on the v3 integration endpoint", () => {
    expect(hubSpotSubmitUrl("guid")).toBe(
      "https://api.hsforms.com/submissions/v3/integration/submit/247619565/guid",
    )
  })
})

describe("buildMeetingsEmbedUrl", () => {
  it("adds embed, the parent page, and the visitor token", () => {
    const url = new URL(
      buildMeetingsEmbedUrl("https://meetings-na2.hubspot.com/ben", {
        hutk: "abc",
        pageUrl: "https://clinicalsim.ai/contact?utm_source=x",
      }),
    )
    expect(url.origin + url.pathname).toBe("https://meetings-na2.hubspot.com/ben")
    expect(url.searchParams.get("embed")).toBe("true")
    expect(url.searchParams.get("parentHubspotUtk")).toBe("abc")
    expect(url.searchParams.get("parentPageUrl")).toBe("https://clinicalsim.ai/contact?utm_source=x")
  })

  it("leaves out the token when the visitor has none", () => {
    const url = new URL(buildMeetingsEmbedUrl("https://meetings-na2.hubspot.com/ben", { pageUrl: "https://clinicalsim.ai/contact" }))
    expect(url.searchParams.has("parentHubspotUtk")).toBe(false)
  })
})

describe("isMeetingBookedMessage", () => {
  it("accepts a booking message from a HubSpot meetings origin", () => {
    expect(isMeetingBookedMessage("https://meetings-na2.hubspot.com", { meetingBookSucceeded: true })).toBe(true)
    expect(isMeetingBookedMessage("https://meetings.hubspot.com", { meetingBookSucceeded: true })).toBe(true)
  })

  it("ignores other origins and other messages", () => {
    expect(isMeetingBookedMessage("https://evil.example", { meetingBookSucceeded: true })).toBe(false)
    expect(isMeetingBookedMessage("https://meetings.hubspot.com.evil.example", { meetingBookSucceeded: true })).toBe(false)
    expect(isMeetingBookedMessage("https://meetings-na2.hubspot.com", { height: 700 })).toBe(false)
    expect(isMeetingBookedMessage("https://meetings-na2.hubspot.com", "ready")).toBe(false)
  })
})
