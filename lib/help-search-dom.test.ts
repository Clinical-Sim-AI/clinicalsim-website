// @vitest-environment jsdom

import { createElement } from "react"
import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { HelpSearch, type HelpSearchItem } from "@/components/help-search"

const items: HelpSearchItem[] = [
  {
    href: "/help/add-a-curriculum",
    title: "Add a curriculum from a project template",
    description: "Create a project and invite your learners.",
    category: "Guide",
  },
  {
    href: "/help/resend-an-invitation",
    title: "Resend an invitation or share a join link",
    description: "Renew an expired invitation.",
    category: "Guide",
  },
  {
    href: "/help/release-notes",
    title: "Release notes",
    description: "See what changed in ClinicalSim.",
    category: "Release notes",
  },
]

afterEach(cleanup)

describe("HelpSearch", () => {
  it("filters help links by title and description", async () => {
    const user = userEvent.setup()
    render(createElement(HelpSearch, { items }))

    await user.type(screen.getByRole("searchbox", { name: "Search help" }), "expired")

    expect(screen.getByRole("link", { name: /Resend an invitation/ })).toBeTruthy()
    expect(screen.queryByRole("link", { name: /Add a curriculum/ })).toBeNull()
  })

  it("ranks a title match before a description match and clears the query", async () => {
    const user = userEvent.setup()
    render(createElement(HelpSearch, { items }))

    const searchbox = screen.getByRole("searchbox", { name: "Search help" })
    await user.type(searchbox, "project")

    const links = screen.getAllByRole("link")
    expect(links[0].textContent).toContain("Add a curriculum")

    await user.click(screen.getByRole("button", { name: "Clear search" }))
    expect(searchbox.getAttribute("value")).toBe("")
    expect(screen.queryByRole("list", { name: "Search results" })).toBeNull()
  })

  it("shows a clear empty state", async () => {
    const user = userEvent.setup()
    render(createElement(HelpSearch, { items }))

    await user.type(screen.getByRole("searchbox", { name: "Search help" }), "billing")

    expect(screen.getByText('No help pages match "billing".')).toBeTruthy()
  })
})
