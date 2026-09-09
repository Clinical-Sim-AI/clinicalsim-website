"use client"

import { useId, useMemo, useState } from "react"
import Link from "next/link"
import { ChevronRight, Search, X } from "lucide-react"

export interface HelpSearchItem {
  href: string
  title: string
  description: string
  category: "Help page" | "Guide" | "Release notes"
}

interface HelpSearchProps {
  items: HelpSearchItem[]
}

function normalize(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim()
}

function getRank(item: HelpSearchItem, query: string) {
  const title = normalize(item.title)
  const description = normalize(item.description)
  const searchable = `${title} ${description}`
  const words = query.split(" ")

  if (!words.every((word) => searchable.includes(word))) return null
  if (title === query) return 0
  if (title.startsWith(query)) return 1
  if (title.includes(query)) return 2
  if (words.every((word) => title.includes(word))) return 3
  return 4
}

export function HelpSearch({ items }: HelpSearchProps) {
  const [query, setQuery] = useState("")
  const inputId = useId()
  const normalizedQuery = normalize(query)
  const results = useMemo(() => {
    if (!normalizedQuery) return []

    return items
      .map((item, index) => ({ item, index, rank: getRank(item, normalizedQuery) }))
      .filter((result): result is typeof result & { rank: number } => result.rank !== null)
      .sort((a, b) => a.rank - b.rank || a.index - b.index)
      .map(({ item }) => item)
  }, [items, normalizedQuery])

  return (
    <div className="mt-8 max-w-3xl" role="search" aria-label="Search help">
      <label htmlFor={inputId} className="block text-sm font-medium text-cs-dark-blue mb-2">
        Search help
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cs-navy"
          aria-hidden="true"
        />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search setup, invitations, roles, and more"
          autoComplete="off"
          className="h-14 w-full rounded-xl border border-cs-gray bg-white pl-12 pr-12 text-base text-cs-dark-blue shadow-sm outline-none placeholder:text-cs-dark-gray focus:border-cs-navy focus:ring-2 focus:ring-cs-light-blue/60"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-cs-dark-gray hover:bg-cs-cloud hover:text-cs-dark-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-navy"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {normalizedQuery && (
        <div
          className="mt-3 overflow-hidden rounded-xl border border-cs-gray/70 bg-white shadow-sm"
          aria-live="polite"
        >
          {results.length > 0 ? (
            <ul aria-label="Search results" className="divide-y divide-cs-gray/50">
              {results.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-start gap-4 p-4 transition-colors hover:bg-cs-cloud/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cs-navy md:px-5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-cs-dark-gray">{item.category}</p>
                      <p className="mt-1 font-medium text-cs-dark-blue">{item.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm font-light leading-relaxed text-cs-dark-blue/70">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight
                      className="mt-1 h-5 w-5 shrink-0 text-cs-dark-gray transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-4 text-sm text-cs-dark-blue/70">
              No help pages match &quot;{query.trim()}&quot;.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
