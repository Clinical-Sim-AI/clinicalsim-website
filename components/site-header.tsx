"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { BrandIcon } from "@/components/brand-icon"
import { Button } from "@/components/ui/button"
import {
  getActiveHeaderItem,
  HEADER_ACTION,
  HEADER_DIRECT_LINKS,
  HEADER_MENUS,
  routeIsActive,
  type HeaderLink,
  type HeaderMenu,
  type HeaderMenuAction,
  type HeaderMenuId,
  transitionHeaderMenu,
} from "@/lib/site-navigation"

const HOVER_QUERY = "(hover: hover) and (pointer: fine)"
const DESKTOP_QUERY = "(min-width: 1024px)"

function subscribeToHover(onChange: () => void) {
  const query = window.matchMedia(HOVER_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const getHoverSnapshot = () => window.matchMedia(HOVER_QUERY).matches
const getHoverServerSnapshot = () => false

function NavigationLink({
  item,
  pathname,
  className,
  onNavigate,
}: {
  item: HeaderLink
  pathname: string
  className: string
  onNavigate: () => void
}) {
  return (
    <Link
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      className={className}
      onClick={onNavigate}
    >
      {item.icon && <BrandIcon name={item.icon} size={16} className="shrink-0" />}
      <span>{item.label}</span>
    </Link>
  )
}

function DesktopMenuPanel({
  menu,
  pathname,
  onNavigate,
}: {
  menu: HeaderMenu
  pathname: string
  onNavigate: () => void
}) {
  if (menu.kind === "grouped") {
    return (
      <div className="absolute top-full left-1/2 z-50 w-[min(900px,calc(100vw-2rem))] -translate-x-1/2 pt-2">
        <div className="dropdown-enter grid max-h-[calc(100dvh-7rem)] grid-cols-2 overflow-y-auto rounded-xl border border-cs-gray/30 bg-white/95 py-3 shadow-lg backdrop-blur-sm">
          {menu.columns.map((column, columnIndex) => (
            <div
              key={column.label}
              className={columnIndex > 0 ? "border-l border-cs-gray/30 px-5" : "px-5"}
            >
              <Link
                href={column.overviewHref}
                aria-current={pathname === column.overviewHref ? "page" : undefined}
                className={`inline-block rounded-lg px-2 py-1 text-sm font-bold text-cs-dark-blue hover:underline ${
                  pathname === column.overviewHref ? "bg-cs-cloud/70" : ""
                }`}
                onClick={onNavigate}
              >
                {column.label}
              </Link>
              {column.groups.map((group) => (
                <div key={group.label} className="pt-3">
                  <p className="pb-1 text-xs font-medium uppercase tracking-[0.12em] text-cs-dark-gray">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <NavigationLink
                      key={item.href}
                      item={item}
                      pathname={pathname}
                      className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-cs-cloud/70 ${
                        routeIsActive(pathname, item.href)
                          ? "bg-cs-cloud/70 font-medium text-cs-dark-blue"
                          : "text-cs-dark-blue/85"
                      }`}
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="dropdown-enter absolute top-full left-0 z-50 w-max min-w-64 pt-2">
      <div className="rounded-xl border border-cs-gray/30 bg-white/95 py-2 shadow-lg backdrop-blur-sm">
        {menu.items.map((item) => (
          <NavigationLink
            key={item.href}
            item={item}
            pathname={pathname}
            className={`block px-4 py-2.5 text-sm transition-colors hover:bg-cs-cloud/70 ${
              routeIsActive(pathname, item.href)
                ? "bg-cs-cloud/70 font-medium text-cs-dark-blue"
                : "text-cs-dark-blue/85"
            }`}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  )
}

function MobileMenuPanel({
  menu,
  pathname,
  onNavigate,
}: {
  menu: HeaderMenu
  pathname: string
  onNavigate: () => void
}) {
  if (menu.kind === "grouped") {
    return (
      <div className="pb-3 pl-2">
        {menu.columns.map((column) => (
          <div key={column.label} className="pt-2">
            <Link
              href={column.overviewHref}
              aria-current={pathname === column.overviewHref ? "page" : undefined}
              className={`inline-block rounded-lg px-3 py-2 text-sm font-bold text-cs-dark-blue hover:underline ${
                pathname === column.overviewHref ? "bg-cs-cloud/70" : ""
              }`}
              onClick={onNavigate}
            >
              {column.label}
            </Link>
            {column.groups.map((group) => (
              <div key={group.label}>
                <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-[0.12em] text-cs-dark-gray">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <NavigationLink
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-cs-cloud/70 ${
                      routeIsActive(pathname, item.href)
                        ? "bg-cs-cloud/70 font-medium text-cs-dark-blue"
                        : "text-cs-dark-blue/70 hover:text-cs-dark-blue"
                    }`}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="pb-3 pl-2">
      {menu.items.map((item) => (
        <NavigationLink
          key={item.href}
          item={item}
          pathname={pathname}
          className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-cs-cloud/70 ${
            routeIsActive(pathname, item.href)
              ? "bg-cs-cloud/70 font-medium text-cs-dark-blue"
              : "text-cs-dark-blue/70 hover:text-cs-dark-blue"
          }`}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<HeaderMenuId | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [previousPathname, setPreviousPathname] = useState(pathname)
  const desktopNavigationRef = useRef<HTMLElement>(null)
  const mobileNavigationRef = useRef<HTMLElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const desktopTriggerRefs = useRef<
    Partial<Record<HeaderMenuId, HTMLButtonElement | null>>
  >({})
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const canHover = useSyncExternalStore(
    subscribeToHover,
    getHoverSnapshot,
    getHoverServerSnapshot
  )
  const activeHeaderItem = getActiveHeaderItem(pathname)

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname)
    setActiveMenu(null)
    setMobileMenuOpen(false)
  }

  const updateMenu = (action: HeaderMenuAction) => {
    setActiveMenu((current) => transitionHeaderMenu(current, action))
  }

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
  }

  const openMenu = (menu: HeaderMenuId) => {
    clearHoverTimeout()
    updateMenu({ type: "open", menu })
  }

  const closeMenuAfterDelay = () => {
    clearHoverTimeout()
    hoverTimeoutRef.current = setTimeout(
      () => updateMenu({ type: "dismiss", reason: "outside" }),
      150
    )
  }

  const closeNavigation = () => {
    updateMenu({ type: "dismiss", reason: "route" })
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)

    function handleViewportChange(event: MediaQueryListEvent) {
      if (!event.matches) return
      setActiveMenu(null)
      setMobileMenuOpen(false)
    }

    query.addEventListener("change", handleViewportChange)
    return () => query.removeEventListener("change", handleViewportChange)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      const target = event.target as Node
      const insideDesktopNavigation = desktopNavigationRef.current?.contains(target)
      const insideMobileNavigation = mobileNavigationRef.current?.contains(target)
      if (!insideDesktopNavigation && !insideMobileNavigation) {
        setActiveMenu((current) =>
          transitionHeaderMenu(current, { type: "dismiss", reason: "outside" })
        )
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      const desktopMenuToRestore = activeMenu
      setActiveMenu(null)
      setMobileMenuOpen(false)
      if (mobileMenuOpen) {
        mobileMenuButtonRef.current?.focus()
      } else if (desktopMenuToRestore) {
        desktopTriggerRefs.current[desktopMenuToRestore]?.focus()
      }
    }

    document.addEventListener("pointerdown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [activeMenu, mobileMenuOpen])

  return (
    <header className="relative z-50 flex items-center justify-between border-b border-cs-gray/60 bg-white/80 px-4 py-4 backdrop-blur-sm md:px-12 md:py-6">
      <Link href="/" className="flex items-center" aria-label="ClinicalSim home">
        <Image
          src="/brand/ClinicalSim_Logo_Lockup_Transparent.svg?v=3"
          alt="ClinicalSim"
          width={4410}
          height={680}
          priority
          unoptimized
          className="h-9 w-auto"
        />
      </Link>

      <button
        ref={mobileMenuButtonRef}
        className="-mr-2 p-2 text-cs-dark-blue/85 transition-colors hover:text-cs-dark-blue lg:hidden"
        onClick={() => {
          updateMenu({ type: "dismiss", reason: "outside" })
          setMobileMenuOpen((open) => !open)
        }}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <nav
        ref={desktopNavigationRef}
        aria-label="Primary navigation"
        className="hidden items-center gap-3 whitespace-nowrap text-sm lg:flex xl:gap-5 xl:text-base 2xl:gap-8"
      >
        {HEADER_MENUS.map((menu) => {
          const open = activeMenu === menu.id
          const active = activeHeaderItem === menu.id

          return (
            <div
              key={menu.id}
              className={menu.kind === "grouped" ? "static" : "relative"}
              onMouseEnter={canHover ? () => openMenu(menu.id) : undefined}
              onMouseLeave={canHover ? closeMenuAfterDelay : undefined}
            >
              <button
                ref={(node) => {
                  desktopTriggerRefs.current[menu.id] = node
                }}
                onClick={() => {
                  clearHoverTimeout()
                  updateMenu({ type: "toggle", menu: menu.id })
                }}
                aria-expanded={open}
                className={`flex items-center gap-1 pb-1 font-medium text-cs-dark-blue/85 transition-colors hover:text-cs-dark-blue ${
                  active ? "border-b-2 border-cs-dark-blue" : ""
                }`}
              >
                {menu.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open && (
                <DesktopMenuPanel
                  menu={menu}
                  pathname={pathname}
                  onNavigate={closeNavigation}
                />
              )}
            </div>
          )
        })}

        {HEADER_DIRECT_LINKS.map((link) => (
          <NavigationLink
            key={link.href}
            item={link}
            pathname={pathname}
            className={`pb-1 font-medium text-cs-dark-blue/85 transition-colors hover:text-cs-dark-blue ${
              activeHeaderItem === "help" ? "border-b-2 border-cs-dark-blue" : ""
            }`}
            onNavigate={closeNavigation}
          />
        ))}

        <Button asChild>
          <Link
            href={HEADER_ACTION.href}
            aria-current={activeHeaderItem === "contact" ? "page" : undefined}
            onClick={closeNavigation}
          >
            {HEADER_ACTION.label}
          </Link>
        </Button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 lg:hidden md:top-[89px]">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeNavigation}
            aria-hidden="true"
          />
          <nav
            ref={mobileNavigationRef}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="relative max-h-[calc(100dvh-65px)] overflow-y-auto border-b border-cs-gray/30 bg-white/95 shadow-lg backdrop-blur-sm md:max-h-[calc(100dvh-89px)]"
          >
            <div className="px-4 py-3">
              {HEADER_MENUS.map((menu) => {
                const open = activeMenu === menu.id
                const active = activeHeaderItem === menu.id

                return (
                  <div key={menu.id} className="border-b border-cs-gray/30">
                    <button
                      onClick={() => updateMenu({ type: "toggle", menu: menu.id })}
                      aria-expanded={open}
                      className={`flex w-full items-center justify-between py-3 font-medium text-cs-dark-blue/85 ${
                        active ? "text-cs-dark-blue" : ""
                      }`}
                    >
                      {menu.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <MobileMenuPanel
                        menu={menu}
                        pathname={pathname}
                        onNavigate={closeNavigation}
                      />
                    )}
                  </div>
                )
              })}

              {HEADER_DIRECT_LINKS.map((link) => (
                <NavigationLink
                  key={link.href}
                  item={link}
                  pathname={pathname}
                  className={`block border-b border-cs-gray/30 py-3 font-medium transition-colors ${
                    activeHeaderItem === "help"
                      ? "text-cs-dark-blue"
                      : "text-cs-dark-blue/85 hover:text-cs-dark-blue"
                  }`}
                  onNavigate={closeNavigation}
                />
              ))}

              <Button asChild className="mt-4 w-full">
                <Link
                  href={HEADER_ACTION.href}
                  aria-current={activeHeaderItem === "contact" ? "page" : undefined}
                  onClick={closeNavigation}
                >
                  {HEADER_ACTION.label}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
