"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getActiveHeaderItem,
  HEADER_ACTION,
  HEADER_MENUS,
  PLATFORM_SIGN_IN,
  PLATFORM_SIGN_UP,
  routeIsActive,
  type HeaderMenuId,
  type HeaderNavigationMenu,
} from "@/lib/site-navigation"

const DESKTOP_QUERY = "(min-width: 1024px)"
const HOVER_QUERY = "(hover: hover) and (pointer: fine)"
const FOCUSABLE = "a[href], button"

function subscribeToHover(onChange: () => void) {
  const query = window.matchMedia(HOVER_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const getHoverSnapshot = () => window.matchMedia(HOVER_QUERY).matches
const getHoverServerSnapshot = () => false

function menuPanelId(id: HeaderMenuId, surface: "desktop" | "mobile") {
  return `${surface}-menu-${id}`
}

function MenuGroups({
  menu,
  pathname,
  surface,
  onNavigate,
}: {
  menu: HeaderNavigationMenu
  pathname: string
  surface: "desktop" | "mobile"
  onNavigate: () => void
}) {
  const desktop = surface === "desktop"
  const columns = desktop
    ? menu.groups.length >= 3
      ? "grid-cols-3"
      : menu.groups.length === 2
        ? "grid-cols-2"
        : "grid-cols-1"
    : "grid-cols-1"

  return (
    <div className={`grid gap-x-2 gap-y-3 ${columns}`}>
      {menu.groups.map((group, index) => (
        <div
          key={group.label ?? index}
          className={desktop && index > 0 ? "border-l border-cs-gray/40 pl-2" : undefined}
        >
          {group.label && (
            <p className="px-3 pb-1 pt-1 text-xs font-medium text-cs-dark-gray">{group.label}</p>
          )}
          <ul>
            {group.items.map((item) => {
              const current = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-cs-cloud/70 hover:text-cs-dark-blue ${
                      routeIsActive(pathname, item.href)
                        ? "bg-cs-cloud/70 font-medium text-cs-dark-blue"
                        : "text-cs-dark-blue/80"
                    }`}
                    onClick={onNavigate}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<HeaderMenuId | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<HeaderMenuId | null>(null)
  const [previousPathname, setPreviousPathname] = useState(pathname)
  const headerRef = useRef<HTMLElement>(null)
  const mobileNavigationRef = useRef<HTMLElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const desktopTriggerRefs = useRef<Partial<Record<HeaderMenuId, HTMLButtonElement | null>>>({})
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const canHover = useSyncExternalStore(subscribeToHover, getHoverSnapshot, getHoverServerSnapshot)
  const activeHeaderItem = getActiveHeaderItem(pathname)

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname)
    setActiveMenu(null)
    setMobileMenuOpen(false)
    setMobileSection(null)
  }

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
  }

  const closeNavigation = () => {
    clearHoverTimeout()
    setActiveMenu(null)
    setMobileMenuOpen(false)
  }

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
      setActiveMenu(null)
      if (event.matches) setMobileMenuOpen(false)
    }
    query.addEventListener("change", handleViewportChange)
    return () => query.removeEventListener("change", handleViewportChange)
  }, [])

  useEffect(() => () => clearHoverTimeout(), [])

  // Desktop menus: close on an outside pointer, and on Escape hand focus back
  // to the button that opened the menu.
  useEffect(() => {
    if (!activeMenu) return

    function handleClickOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setActiveMenu(null)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || !activeMenu) return
      setActiveMenu(null)
      desktopTriggerRefs.current[activeMenu]?.focus()
    }

    document.addEventListener("pointerdown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeMenu])

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
      const focusable = mobileNavigationRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      const last = focusable?.[focusable.length - 1]
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
      className="relative z-50 flex items-center justify-between gap-4 border-b border-cs-gray/60 bg-white px-4 py-4 md:px-8 md:py-6 xl:px-12"
    >
      <Link href="/" className="flex shrink-0 items-center" aria-label="ClinicalSim home" onClick={closeNavigation}>
        <Image
          src="/brand/ClinicalSim_Logo_Lockup_Transparent.svg?v=3"
          alt="ClinicalSim"
          width={4410}
          height={680}
          priority
          unoptimized
          className="h-8 w-auto lg:h-7 xl:h-9"
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

      <nav aria-label="Primary navigation" className="hidden items-center gap-2 whitespace-nowrap text-sm lg:flex xl:gap-5">
        {HEADER_MENUS.map((menu, index) => {
          const open = activeMenu === menu.id
          const active = activeHeaderItem === menu.id
          // Wide three-column menus anchor to the header; the rest open under
          // their label, and the last one aligns right so it stays on screen.
          const wide = menu.groups.length >= 3
          const alignEnd = index === HEADER_MENUS.length - 1
          const labelClass = `border-b-2 py-2 font-medium text-cs-dark-blue/85 transition-colors hover:text-cs-dark-blue ${
            active ? "border-cs-dark-blue" : "border-transparent"
          }`

          return (
            <div
              key={menu.id}
              className={`flex items-center ${wide ? "static" : "relative"}`}
              onMouseEnter={
                canHover
                  ? () => {
                      clearHoverTimeout()
                      setActiveMenu(menu.id)
                    }
                  : undefined
              }
              onMouseLeave={
                canHover
                  ? () => {
                      clearHoverTimeout()
                      hoverTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150)
                    }
                  : undefined
              }
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setActiveMenu((current) => (current === menu.id ? null : current))
                }
              }}
            >
              {menu.href ? (
                <Link
                  href={menu.href}
                  aria-current={pathname === menu.href ? "page" : undefined}
                  className={labelClass}
                  onClick={closeNavigation}
                >
                  {menu.label}
                </Link>
              ) : null}
              <button
                ref={(node) => {
                  desktopTriggerRefs.current[menu.id] = node
                }}
                type="button"
                aria-expanded={open}
                aria-controls={menuPanelId(menu.id, "desktop")}
                aria-label={menu.href ? `${menu.label} menu` : undefined}
                className={
                  menu.href
                    ? "ml-0.5 rounded-sm p-1 text-cs-dark-blue/70 transition-colors hover:text-cs-dark-blue"
                    : `flex items-center gap-1 ${labelClass}`
                }
                onClick={() => {
                  clearHoverTimeout()
                  setActiveMenu((current) => (current === menu.id ? null : menu.id))
                }}
              >
                {!menu.href && menu.label}
                <ChevronDown
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && (
                <div
                  id={menuPanelId(menu.id, "desktop")}
                  className={`absolute top-full z-50 ${
                    wide
                      ? "left-1/2 w-[min(820px,calc(100vw-2rem))] -translate-x-1/2"
                      : `${alignEnd ? "right-0" : "left-0"} w-max min-w-64 pt-2`
                  }`}
                >
                  <div className="dropdown-enter whitespace-normal rounded-xl border border-cs-gray/40 bg-white p-3 shadow-lg">
                    <MenuGroups menu={menu} pathname={pathname} surface="desktop" onNavigate={closeNavigation} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
        <a href={PLATFORM_SIGN_IN.href} className="py-2 pl-1 text-cs-dark-blue/70 transition-colors hover:text-cs-dark-blue">
          {PLATFORM_SIGN_IN.label}
        </a>
        <Button asChild variant="secondary" className="px-3 xl:px-4">
          <a href={PLATFORM_SIGN_UP.href}>{PLATFORM_SIGN_UP.label}</a>
        </Button>
        <Button asChild className="px-3 xl:px-4">
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
          {HEADER_MENUS.map((menu) => {
            const expanded = mobileSection === menu.id
            const active = activeHeaderItem === menu.id
            const toggle = () => setMobileSection((current) => (current === menu.id ? null : menu.id))

            return (
              <div key={menu.id} className="border-b border-cs-gray/30 last:border-b-0">
                <div className={`flex items-center rounded-md ${active ? "bg-cs-cloud" : ""}`}>
                  {menu.href ? (
                    <>
                      <Link
                        href={menu.href}
                        aria-current={pathname === menu.href ? "page" : undefined}
                        className="flex-1 rounded-md px-3 py-3 font-medium text-cs-dark-blue transition-colors hover:bg-cs-cloud"
                        onClick={closeNavigation}
                      >
                        {menu.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={menuPanelId(menu.id, "mobile")}
                        aria-label={`${expanded ? "Hide" : "Show"} ${menu.label} pages`}
                        className="rounded-md p-3 text-cs-dark-blue transition-colors hover:bg-cs-cloud"
                        onClick={toggle}
                      >
                        <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={menuPanelId(menu.id, "mobile")}
                      className="flex flex-1 items-center justify-between rounded-md px-3 py-3 text-left font-medium text-cs-dark-blue transition-colors hover:bg-cs-cloud"
                      onClick={toggle}
                    >
                      {menu.label}
                      <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {expanded && (
                  <div id={menuPanelId(menu.id, "mobile")} className="pb-3 pl-2">
                    <MenuGroups menu={menu} pathname={pathname} surface="mobile" onNavigate={closeNavigation} />
                  </div>
                )}
              </div>
            )
          })}
          <a href={PLATFORM_SIGN_IN.href} className="mt-2 block border-t border-cs-gray/50 px-3 py-3 text-cs-dark-blue/70" onClick={closeNavigation}>
            {PLATFORM_SIGN_IN.label}
          </a>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <Button asChild variant="secondary" className="w-full">
              <a href={PLATFORM_SIGN_UP.href} onClick={closeNavigation}>
                {PLATFORM_SIGN_UP.label}
              </a>
            </Button>
            <Button asChild className="w-full">
              <Link href={HEADER_ACTION.href} aria-current={pathname === HEADER_ACTION.href ? "page" : undefined} onClick={closeNavigation}>
                {HEADER_ACTION.label}
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
