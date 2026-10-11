"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getActiveHeaderItem,
  HEADER_ACTION,
  HEADER_LINKS,
  PLATFORM_SIGN_IN,
} from "@/lib/site-navigation"

const DESKTOP_QUERY = "(min-width: 1024px)"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [previousPathname, setPreviousPathname] = useState(pathname)
  const headerRef = useRef<HTMLElement>(null)
  const mobileNavigationRef = useRef<HTMLElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const activeHeaderItem = getActiveHeaderItem(pathname)

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname)
    setMobileMenuOpen(false)
  }

  const closeNavigation = () => setMobileMenuOpen(false)

  useEffect(() => {
    if (!mobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    mobileNavigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)
    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) setMobileMenuOpen(false)
    }
    query.addEventListener("change", handleViewportChange)
    return () => query.removeEventListener("change", handleViewportChange)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    function handleClickOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setMobileMenuOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
        mobileMenuButtonRef.current?.focus()
      }
      if (event.key !== "Tab") return
      const first = mobileMenuButtonRef.current
      const links = mobileNavigationRef.current?.querySelectorAll<HTMLAnchorElement>("a")
      const last = links?.[links.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener("pointerdown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header
      ref={headerRef}
      className="relative z-50 flex items-center justify-between gap-6 border-b border-cs-gray/60 bg-white px-4 py-4 md:px-8 md:py-6 xl:px-12"
    >
      <Link href="/" className="flex shrink-0 items-center" aria-label="ClinicalSim home" onClick={closeNavigation}>
        <Image
          src="/brand/ClinicalSim_Logo_Lockup_Transparent.svg?v=3"
          alt="ClinicalSim"
          width={4410}
          height={680}
          priority
          unoptimized
          className="h-8 w-auto xl:h-9"
        />
      </Link>

      <button
        ref={mobileMenuButtonRef}
        className="-mr-2 rounded-md p-2 text-cs-dark-blue transition-colors hover:bg-cs-cloud focus-visible:outline focus-visible:outline-2 focus-visible:outline-cs-dark-blue lg:hidden"
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <nav aria-label="Primary navigation" className="hidden items-center gap-4 whitespace-nowrap text-sm lg:flex xl:gap-6">
        {HEADER_LINKS.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            className={`border-b-2 py-2 font-medium text-cs-dark-blue/85 transition-colors hover:text-cs-dark-blue ${
              activeHeaderItem === link.id ? "border-cs-dark-blue" : "border-transparent"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <a href={PLATFORM_SIGN_IN.href} className="py-2 text-cs-dark-blue/70 transition-colors hover:text-cs-dark-blue">
          {PLATFORM_SIGN_IN.label}
        </a>
        <Button asChild>
          <Link href={HEADER_ACTION.href} aria-current={pathname === HEADER_ACTION.href ? "page" : undefined}>
            {HEADER_ACTION.label}
          </Link>
        </Button>
      </nav>

      {mobileMenuOpen && (
        <nav
          ref={mobileNavigationRef}
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-73px)] overflow-y-auto border-b border-cs-gray/60 bg-white px-4 pb-5 pt-2 shadow-lg md:max-h-[calc(100dvh-89px)] md:px-8 lg:hidden"
        >
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`block rounded-md px-3 py-3 font-medium text-cs-dark-blue transition-colors hover:bg-cs-cloud ${
                activeHeaderItem === link.id ? "bg-cs-cloud" : ""
              }`}
              onClick={closeNavigation}
            >
              {link.label}
            </Link>
          ))}
          <a href={PLATFORM_SIGN_IN.href} className="mt-2 block border-t border-cs-gray/50 px-3 py-3 text-cs-dark-blue/70" onClick={closeNavigation}>
            {PLATFORM_SIGN_IN.label}
          </a>
          <Button asChild className="mt-2 w-full">
            <Link href={HEADER_ACTION.href} aria-current={pathname === HEADER_ACTION.href ? "page" : undefined} onClick={closeNavigation}>
              {HEADER_ACTION.label}
            </Link>
          </Button>
        </nav>
      )}
    </header>
  )
}
