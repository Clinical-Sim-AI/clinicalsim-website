// @vitest-environment jsdom

import { createElement } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SiteHeader } from "@/components/site-header"

const navigation = vi.hoisted(() => ({ pathname: "/" }))

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
}))

const HOVER_QUERY = "(hover: hover) and (pointer: fine)"
const DESKTOP_QUERY = "(min-width: 1024px)"

interface QueryState {
  matches: boolean
  listeners: Set<(event: MediaQueryListEvent) => void>
}

let queryStates: Map<string, QueryState>

function getQueryState(query: string) {
  let state = queryStates.get(query)
  if (!state) {
    state = { matches: false, listeners: new Set() }
    queryStates.set(query, state)
  }
  return state
}

function setQueryMatch(query: string, matches: boolean) {
  const state = getQueryState(query)
  state.matches = matches
  const event = { matches, media: query } as MediaQueryListEvent
  state.listeners.forEach((listener) => listener(event))
}

beforeEach(() => {
  navigation.pathname = "/"
  queryStates = new Map([
    [HOVER_QUERY, { matches: false, listeners: new Set() }],
    [DESKTOP_QUERY, { matches: false, listeners: new Set() }],
  ])
  window.matchMedia = vi.fn((query: string) => {
    const state = getQueryState(query)
    return {
      get matches() {
        return state.matches
      },
      media: query,
      onchange: null,
      addEventListener: (_type: "change", listener: (event: MediaQueryListEvent) => void) =>
        state.listeners.add(listener),
      removeEventListener: (_type: "change", listener: (event: MediaQueryListEvent) => void) =>
        state.listeners.delete(listener),
      addListener: (listener: (event: MediaQueryListEvent) => void) =>
        state.listeners.add(listener),
      removeListener: (listener: (event: MediaQueryListEvent) => void) =>
        state.listeners.delete(listener),
      dispatchEvent: () => true,
    } as MediaQueryList
  })
})

afterEach(() => {
  cleanup()
  document.body.style.overflow = ""
})

describe("SiteHeader interactions", () => {
  it("uses click on a non-hover pointer and keeps one desktop menu open", async () => {
    const user = userEvent.setup()
    render(createElement(SiteHeader))
    const solutions = screen.getByRole("button", { name: "Solutions" })

    fireEvent.mouseEnter(solutions.parentElement as HTMLElement)
    expect(screen.queryByRole("link", { name: "Informed consent" })).toBeNull()

    await user.click(solutions)
    expect(solutions.getAttribute("aria-expanded")).toBe("true")
    expect(screen.getByRole("link", { name: "Informed consent" })).toBeTruthy()

    await user.click(screen.getByRole("button", { name: "Resources" }))
    expect(solutions.getAttribute("aria-expanded")).toBe("false")
    expect(screen.queryByRole("link", { name: "Informed consent" })).toBeNull()
    expect(screen.getByRole("link", { name: "Research collaboration" })).toBeTruthy()
  })

  it("opens on hover and closes after an outside pointer event", () => {
    setQueryMatch(HOVER_QUERY, true)
    render(createElement(SiteHeader))
    const solutions = screen.getByRole("button", { name: "Solutions" })

    fireEvent.mouseEnter(solutions.parentElement as HTMLElement)
    expect(screen.getByRole("link", { name: "Informed consent" })).toBeTruthy()

    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole("link", { name: "Informed consent" })).toBeNull()
    expect(solutions.getAttribute("aria-expanded")).toBe("false")
  })

  it("supports Enter and Space and restores desktop trigger focus after Escape", async () => {
    const user = userEvent.setup()
    render(createElement(SiteHeader))
    const solutions = screen.getByRole("button", { name: "Solutions" })

    solutions.focus()
    await user.keyboard("{Enter}")
    const informedConsent = screen.getByRole("link", { name: "Informed consent" })
    informedConsent.focus()
    await user.keyboard("{Escape}")

    expect(screen.queryByRole("link", { name: "Informed consent" })).toBeNull()
    expect(document.activeElement).toBe(solutions)

    await user.keyboard(" ")
    expect(screen.getByRole("link", { name: "Informed consent" })).toBeTruthy()
  })

  it("closes mobile navigation and its accordion when the viewport reaches lg", async () => {
    const user = userEvent.setup()
    render(createElement(SiteHeader))

    await user.click(screen.getByRole("button", { name: "Open menu" }))
    const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" })
    const mobileSolutions = within(mobileNavigation).getByRole("button", { name: "Solutions" })
    await user.click(mobileSolutions)
    expect(document.body.style.overflow).toBe("hidden")
    expect(mobileSolutions.getAttribute("aria-expanded")).toBe("true")

    setQueryMatch(DESKTOP_QUERY, true)

    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).toBeNull()
      expect(document.body.style.overflow).toBe("")
      expect(
        screen.getByRole("button", { name: "Solutions" }).getAttribute("aria-expanded")
      ).toBe("false")
    })
  })

  it.each([
    ["/solutions", "Use cases"],
    ["/audiences", "Audiences"],
  ])("marks the %s overview link active", async (pathname, label) => {
    navigation.pathname = pathname
    const user = userEvent.setup()
    render(createElement(SiteHeader))

    await user.click(screen.getByRole("button", { name: "Solutions" }))
    const overview = screen.getByRole("link", { name: label })
    expect(overview.getAttribute("aria-current")).toBe("page")
    expect(overview.className).toContain("bg-cs-cloud/70")
  })

  it.each([
    ["/solutions/informed-consent", "Use cases", "Informed consent"],
    ["/audiences/program-directors", "Audiences", "Program directors"],
  ])(
    "marks only the child link current on %s",
    async (pathname, overviewLabel, childLabel) => {
      navigation.pathname = pathname
      const user = userEvent.setup()
      render(createElement(SiteHeader))

      await user.click(screen.getByRole("button", { name: "Solutions" }))
      const currentLinks = screen
        .getAllByRole("link")
        .filter((link) => link.getAttribute("aria-current") === "page")

      expect(currentLinks.map((link) => link.textContent)).toEqual([childLabel])
      expect(
        screen.getByRole("link", { name: overviewLabel }).getAttribute("aria-current")
      ).toBeNull()
    }
  )

  it("keeps Insights visually active without marking it current on a post", async () => {
    navigation.pathname = "/insights/example-post"
    const user = userEvent.setup()
    render(createElement(SiteHeader))

    const resources = screen.getByRole("button", { name: "Resources" })
    await user.click(resources)
    const insights = screen.getByRole("link", { name: "Insights" })

    expect(insights.getAttribute("aria-current")).toBeNull()
    expect(insights.className).toContain("bg-cs-cloud/70")
    expect(resources.className).toContain("border-b-2")
  })

  it("keeps Help visually active without marking it current on release notes", () => {
    navigation.pathname = "/help/release-notes"
    render(createElement(SiteHeader))

    const help = screen.getByRole("link", { name: "Help" })
    expect(help.getAttribute("aria-current")).toBeNull()
    expect(help.className).toContain("border-b-2")
  })
})
