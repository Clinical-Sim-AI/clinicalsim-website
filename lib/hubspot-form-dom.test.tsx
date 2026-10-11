// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { HubSpotForm } from "@/components/hubspot-form"
import { HUBSPOT_FORMS, hubSpotSubmitUrl } from "./hubspot"

vi.mock("@next/third-parties/google", () => ({ sendGAEvent: vi.fn() }))
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

function ShortForm() {
  return <HubSpotForm form="contact" booleanFields={["newsletter_opt_in"]} successMessage="We'll reply to your email.">
    <input name="firstname" defaultValue="Jane" />
    <input name="lastname" defaultValue="Doe" />
    <input name="email" defaultValue="jane@example.com" />
    <textarea name="message" defaultValue="Can we see a consent practice case?" />
    <input name="communication_priority" defaultValue="" />
    <button type="submit">Send your message</button>
  </HubSpotForm>
}

describe("the shortest contact submission", () => {
  it("submits the existing required properties and consent value without extra planning fields", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal("fetch", fetchMock)
    render(<ShortForm />)
    fireEvent.click(screen.getByRole("button", { name: "Send your message" }))
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("We'll reply"))
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(hubSpotSubmitUrl(HUBSPOT_FORMS.contact))
    expect(init.method).toBe("POST")
    const fields = JSON.parse(init.body).fields
    expect(fields).toEqual(expect.arrayContaining([
      { name: "firstname", value: "Jane" },
      { name: "lastname", value: "Doe" },
      { name: "email", value: "jane@example.com" },
      { name: "message", value: "Can we see a consent practice case?" },
      { name: "communication_priority", value: "Can we see a consent practice case?" },
      { name: "newsletter_opt_in", value: "false" },
    ]))
    expect(fields).not.toEqual(expect.arrayContaining([expect.objectContaining({ name: "team" })]))
  })
})
