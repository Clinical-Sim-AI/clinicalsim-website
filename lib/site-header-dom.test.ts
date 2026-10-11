// @vitest-environment jsdom

import { createElement } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SiteHeader } from "@/components/site-header"

const navigation = vi.hoisted(() => ({ pathname: "/" }))
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }))

const DESKTOP_QUERY = "(min-width: 1024px)"
let desktopQueries: Set<MediaQueryList>

beforeEach(() => {
  navigation.pathname = "/"
  desktopQueries = new Set()
  window.matchMedia = vi.fn((query: string) => {
    const queryList = Object.assign(new EventTarget(), {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }) as MediaQueryList
    desktopQueries.add(queryList)
    return queryList
  })
})

afterEach(() => {
  cleanup()
  document.body.style.overflow = ""
})

const expectedLinks = ["Health systems", "Medical education", "How it works", "Evidence", "Sign in", "Talk with us"]

describe("SiteHeader interactions", () => {
  it("shows direct links without a desktop dropdown, help, or registration action", () => {
    render(createElement(SiteHeader))
    const primary = screen.getByRole("navigation", { name: "Primary navigation" })
    expect(within(primary).getAllByRole("link").map((link) => link.textContent)).toEqual(expectedLinks)
    expect(within(primary).queryByRole("button")).toBeNull()
    expect(within(primary).queryByRole("link", { name: "Help" })).toBeNull()
    expect(within(primary).queryByRole("link", { name: "Sign up" })).toBeNull()
    expect(within(primary).getByRole("link", { name: "Sign in" }).getAttribute("href")).toBe("https://platform.clinicalsim.ai/sign-in")
  })

  it("opens the same direct navigation by keyboard and restores focus on Escape", async () => {
    const user = userEvent.setup()
    render(createElement(SiteHeader))
    const trigger = screen.getByRole("button", { name: "Open menu" })
    trigger.focus()
    await user.keyboard("{Enter}")
    const mobile = screen.getByRole("navigation", { name: "Mobile navigation" })
    expect(trigger.getAttribute("aria-expanded")).toBe("true")
    expect(within(mobile).getAllByRole("link").map((link) => link.textContent)).toEqual(expectedLinks)
    expect(document.activeElement).toBe(within(mobile).getByRole("link", { name: "Health systems" }))
    expect(document.body.style.overflow).toBe("hidden")
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).toBeNull()
    expect(document.activeElement).toBe(trigger)
    expect(document.body.style.overflow).toBe("")
  })

  it("keeps keyboard focus within the open mobile navigation and its toggle", async () => {
    const user = userEvent.setup()
    render(createElement(SiteHeader))
    await user.click(screen.getByRole("button", { name: "Open menu" }))
    const mobile = screen.getByRole("navigation", { name: "Mobile navigation" })
    within(mobile).getByRole("link", { name: "Talk with us" }).focus()
    await user.tab()
    const trigger = screen.getByRole("button", { name: "Close menu" })
    expect(document.activeElement).toBe(trigger)
    await user.tab({ shift: true })
    expect(document.activeElement).toBe(within(mobile).getByRole("link", { name: "Talk with us" }))
  })

  it("closes on an outside pointer event and restores prior body scrolling", async () => {
    document.body.style.overflow = "auto"
    const user = userEvent.setup()
    render(createElement(SiteHeader))
    await user.click(screen.getByRole("button", { name: "Open menu" }))
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).toBeNull()
    expect(document.body.style.overflow).toBe("auto")
  })

  it("closes mobile navigation when the viewport reaches desktop", async () => {
    const user = userEvent.setup()
    render(createElement(SiteHeader))
    await user.click(screen.getByRole("button", { name: "Open menu" }))
    desktopQueries.forEach((query) => query.dispatchEvent(
      Object.assign(new Event("change"), { matches: true, media: DESKTOP_QUERY })
    ))
    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).toBeNull()
      expect(document.body.style.overflow).toBe("")
    })
  })

  it("closes mobile navigation after a route change", async () => {
    const user = userEvent.setup()
    const view = render(createElement(SiteHeader))
    await user.click(screen.getByRole("button", { name: "Open menu" }))
    navigation.pathname = "/health-systems"
    view.rerender(createElement(SiteHeader))
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).toBeNull()
    expect(document.body.style.overflow).toBe("")
  })

  it("closes immediately when an internal mobile link is selected", async () => {
    const user = userEvent.setup()
    render(createElement(SiteHeader))
    await user.click(screen.getByRole("button", { name: "Open menu" }))
    const mobile = screen.getByRole("navigation", { name: "Mobile navigation" })
    await user.click(within(mobile).getByRole("link", { name: "Health systems" }))
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).toBeNull()
    expect(document.body.style.overflow).toBe("")
  })

  it.each([
    ["/health-systems", "Health systems"],
    ["/medical-education", "Medical education"],
    ["/evidence", "Evidence"],
  ])("marks the %s page current", (pathname, label) => {
    navigation.pathname = pathname
    render(createElement(SiteHeader))
    const link = screen.getByRole("link", { name: label })
    expect(link.getAttribute("aria-current")).toBe("page")
    expect(link.className).toContain("border-cs-dark-blue")
  })

  it.each([
    ["/solutions/informed-consent", "Health systems"],
    ["/audiences/program-directors", "Medical education"],
    ["/insights/example-post", "Evidence"],
  ])("keeps the buyer path active on %s without claiming it's the current page", (pathname, label) => {
    navigation.pathname = pathname
    render(createElement(SiteHeader))
    const link = screen.getByRole("link", { name: label })
    expect(link.getAttribute("aria-current")).toBeNull()
    expect(link.className).toContain("border-cs-dark-blue")
    expect(screen.getAllByRole("link").filter((item) => item.getAttribute("aria-current") === "page")).toHaveLength(0)
  })
})
