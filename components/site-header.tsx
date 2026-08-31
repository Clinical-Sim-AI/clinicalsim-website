"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect, useSyncExternalStore } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { BrandIcon } from "@/components/brand-icon"
import { Button } from "@/components/ui/button"
import { getAllAudiences } from "@/lib/audiences"
import { getPublishedSolutions } from "@/lib/solutions"

// Hover-open is wired up only for pointers that genuinely hover. On a touch
// screen a tap fires mouseenter immediately before click, so the hover handler
// opened the menu and the click toggle shut it again in the same gesture,
// leaving the dropdowns impossible to open by tapping. That bites at the widths
// that show the full nav, which includes iPad landscape at 1366px.
//
// Read through useSyncExternalStore rather than an effect that calls setState:
// matchMedia is external state, and the server snapshot is false because there
// is no pointer to ask about during SSR. Nothing works before hydration either
// way, so starting false costs nothing.
const HOVER_QUERY = "(hover: hover) and (pointer: fine)"

function subscribeToHover(onChange: () => void) {
  const query = window.matchMedia(HOVER_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const getHoverSnapshot = () => window.matchMedia(HOVER_QUERY).matches
const getHoverServerSnapshot = () => false

export function SiteHeader() {
  const pathname = usePathname()
  const [audiencesOpen, setAudiencesOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [whoWeAreOpen, setWhoWeAreOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAudiencesOpen, setMobileAudiencesOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileWhoWeAreOpen, setMobileWhoWeAreOpen] = useState(false)
  const [mobileHelpOpen, setMobileHelpOpen] = useState(false)
  const audiencesDropdownRef = useRef<HTMLDivElement>(null)
  const audiencesTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const solutionsDropdownRef = useRef<HTMLDivElement>(null)
  const solutionsTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const whoWeAreDropdownRef = useRef<HTMLDivElement>(null)
  const whoWeAreTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const helpDropdownRef = useRef<HTMLDivElement>(null)
  const helpTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const audiences = getAllAudiences()
  // Conversation pages first: they are what a buyer is looking for, and the learner-stage program
  // pages read as a second, narrower list underneath. Relative order inside each group is the
  // registry order.
  const solutions = [...getPublishedSolutions()].sort((a, b) => {
    if (a.category === b.category) return 0
    return a.category === "conversation" ? -1 : 1
  })

  const canHover = useSyncExternalStore(subscribeToHover, getHoverSnapshot, getHoverServerSnapshot)

  const aboutItems = [
    { href: "/about", label: "About Us" },
    { href: "/methodology", label: "Methodology" },
    { href: "/faq", label: "FAQ" },
    { href: "/medical-educator-faq", label: "FAQ for Medical Educators" },
  ]

  const helpItems = [
    { href: "/help", label: "Help Center" },
    { href: "/help/release-notes", label: "Release Notes" },
  ]

  const openAudiences = () => {
    if (audiencesTimeoutRef.current) clearTimeout(audiencesTimeoutRef.current)
    setAudiencesOpen(true)
  }

  const closeAudiences = () => {
    audiencesTimeoutRef.current = setTimeout(() => setAudiencesOpen(false), 150)
  }

  const openSolutions = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current)
    setSolutionsOpen(true)
  }

  const closeSolutions = () => {
    solutionsTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), 150)
  }

  const openWhoWeAre = () => {
    if (whoWeAreTimeoutRef.current) clearTimeout(whoWeAreTimeoutRef.current)
    setWhoWeAreOpen(true)
  }

  const closeWhoWeAre = () => {
    whoWeAreTimeoutRef.current = setTimeout(() => setWhoWeAreOpen(false), 150)
  }

  const openHelp = () => {
    if (helpTimeoutRef.current) clearTimeout(helpTimeoutRef.current)
    setHelpOpen(true)
  }

  const closeHelp = () => {
    helpTimeoutRef.current = setTimeout(() => setHelpOpen(false), 150)
  }

  // Close mobile menu on route change (derived state)
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileMenuOpen(false)
    setMobileAudiencesOpen(false)
    setMobileSolutionsOpen(false)
    setMobileWhoWeAreOpen(false)
    setMobileHelpOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (audiencesDropdownRef.current && !audiencesDropdownRef.current.contains(event.target as Node)) {
        setAudiencesOpen(false)
      }
      if (solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false)
      }
      if (whoWeAreDropdownRef.current && !whoWeAreDropdownRef.current.contains(event.target as Node)) {
        setWhoWeAreOpen(false)
      }
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target as Node)) {
        setHelpOpen(false)
      }
    }
    // Escape closes any open dropdown. Focus stays on the trigger that opened
    // it, so there is nothing to restore.
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      setAudiencesOpen(false)
      setSolutionsOpen(false)
      setWhoWeAreOpen(false)
      setHelpOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
      if (audiencesTimeoutRef.current) clearTimeout(audiencesTimeoutRef.current)
      if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current)
      if (whoWeAreTimeoutRef.current) clearTimeout(whoWeAreTimeoutRef.current)
      if (helpTimeoutRef.current) clearTimeout(helpTimeoutRef.current)
    }
  }, [])

  const links = [
    { href: "/examples", label: "Examples" },
    { href: "/insights", label: "Insights" },
    { href: "/research", label: "Research" },
    { href: "/contact", label: "Contact" },
  ]

  const isAudiencesActive = pathname === "/audiences" || pathname?.startsWith("/audiences/")
  // /frameworks lives inside this dropdown rather than as a tenth top-level item, so it lights
  // the same nav trigger.
  const isSolutionsActive =
    pathname === "/solutions" ||
    pathname?.startsWith("/solutions/") ||
    pathname === "/frameworks"
  const isWhoWeAreActive = aboutItems.some(
    (item) => pathname === item.href || pathname?.startsWith(item.href + "/")
  )
  const isHelpActive = pathname === "/help" || pathname?.startsWith("/help/")

  return (
    <header className="relative z-50 flex items-center justify-between px-4 py-4 md:px-12 md:py-6 bg-white/80 backdrop-blur-sm border-b border-cs-gray/60">
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

      {/* Mobile hamburger button */}
      <button
        className="nav:hidden p-2 -mr-2 text-cs-dark-blue/85 hover:text-cs-dark-blue transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop navigation. Nine items measure ~1085px alongside the logo and
          the header's md:px-12 padding once the labels drop to 14px with a 12px
          gap, so the full bar comes in at the custom nav breakpoint (1120px in
          tailwind.config.ts) rather than waiting for xl. Below that the labels
          would collide with the logo, hence the hamburger. From xl there is
          room for 16px labels and a 20px gap, and 2xl opens the gap further.
          The 1120 threshold assumes these nine items: re-measure the bar and
          adjust the breakpoint if an item is added, removed, or renamed.

          Each dropdown trigger carries aria-expanded so screen readers announce
          open/closed state. No aria-controls: the panels are conditionally
          rendered, so the reference would dangle whenever a menu is collapsed,
          which is the default state. No role="menu" either, since these are
          lists of links rather than an application menu. */}
      <nav className="hidden nav:flex items-center gap-3 text-sm xl:gap-5 xl:text-base 2xl:gap-8 whitespace-nowrap">
        {/* Use Cases dropdown */}
        <div
          ref={solutionsDropdownRef}
          className="relative"
          onMouseEnter={canHover ? openSolutions : undefined}
          onMouseLeave={canHover ? closeSolutions : undefined}
        >
          <button
            onClick={() => {
              setSolutionsOpen(!solutionsOpen)
            }}
            aria-expanded={solutionsOpen}
            className={`flex items-center gap-1 text-cs-dark-blue/85 hover:text-cs-dark-blue font-medium transition-colors pb-1 ${
              isSolutionsActive ? "border-b-2 border-cs-dark-blue" : ""
            }`}
          >
            Use Cases
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
          </button>

          {solutionsOpen && (
            /* w-max, not a fixed width: the nav sets whitespace-nowrap, which
               cascades into these panels, so any label longer than the panel
               spills past its right edge instead of wrapping. Sizing to the
               longest item keeps the panel honest as titles get renamed. */
            <div className="dropdown-enter absolute top-full left-0 pt-2 w-max min-w-72 z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-cs-gray/30 py-2">
              {solutions.map((solution) => (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-cs-cloud/70 transition-colors"
                  onClick={() => setSolutionsOpen(false)}
                >
                  <BrandIcon name={solution.icon} size={16} className="shrink-0" />
                  <span className="text-sm text-cs-dark-blue/85">{solution.title}</span>
                </Link>
              ))}
              <div className="border-t border-cs-gray/30 mt-1 pt-1">
                {/* The ROI calculator link is withheld pending a review of the
                    page. Restore it here (and in the mobile nav below) rather
                    than as a tenth top-level item: the bar is measured at nine
                    and the nav breakpoint above assumes that count. */}
                <Link
                  href="/frameworks"
                  className="block px-4 py-2.5 text-sm text-cs-dark-blue/85 hover:bg-cs-cloud/70 transition-colors"
                  onClick={() => setSolutionsOpen(false)}
                >
                  Scored against your framework
                </Link>
                <Link
                  href="/solutions"
                  className="block px-4 py-2.5 text-sm font-medium text-cs-dark-blue hover:bg-cs-cloud/70 transition-colors"
                  onClick={() => setSolutionsOpen(false)}
                >
                  View All
                </Link>
              </div>
            </div>
            </div>
          )}
        </div>

        {/* Who We Serve dropdown */}
        <div
          ref={audiencesDropdownRef}
          className="relative"
          onMouseEnter={canHover ? openAudiences : undefined}
          onMouseLeave={canHover ? closeAudiences : undefined}
        >
          <button
            onClick={() => {
              setAudiencesOpen(!audiencesOpen)
            }}
            aria-expanded={audiencesOpen}
            className={`flex items-center gap-1 text-cs-dark-blue/85 hover:text-cs-dark-blue font-medium transition-colors pb-1 ${
              isAudiencesActive ? "border-b-2 border-cs-dark-blue" : ""
            }`}
          >
            Who We Serve
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${audiencesOpen ? "rotate-180" : ""}`} />
          </button>

          {audiencesOpen && (
            /* w-max for the same reason as the Use Cases panel above. */
            <div className="dropdown-enter absolute top-full left-0 pt-2 w-max min-w-72 z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-cs-gray/30 py-2">
              {audiences.map((audience) => (
                <Link
                  key={audience.slug}
                  href={`/audiences/${audience.slug}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-cs-cloud/70 transition-colors"
                  onClick={() => setAudiencesOpen(false)}
                >
                  <BrandIcon name={audience.icon} size={16} className="shrink-0" />
                  <span className="text-sm text-cs-dark-blue/85">{audience.title}</span>
                </Link>
              ))}
              <div className="border-t border-cs-gray/30 mt-1 pt-1">
                <Link
                  href="/audiences"
                  className="block px-4 py-2.5 text-sm font-medium text-cs-dark-blue hover:bg-cs-cloud/70 transition-colors"
                  onClick={() => setAudiencesOpen(false)}
                >
                  View All
                </Link>
              </div>
            </div>
            </div>
          )}
        </div>

        {/* Who We Are dropdown */}
        <div
          ref={whoWeAreDropdownRef}
          className="relative"
          onMouseEnter={canHover ? openWhoWeAre : undefined}
          onMouseLeave={canHover ? closeWhoWeAre : undefined}
        >
          <button
            onClick={() => {
              setWhoWeAreOpen(!whoWeAreOpen)
            }}
            aria-expanded={whoWeAreOpen}
            className={`flex items-center gap-1 text-cs-dark-blue/85 hover:text-cs-dark-blue font-medium transition-colors pb-1 ${
              isWhoWeAreActive ? "border-b-2 border-cs-dark-blue" : ""
            }`}
          >
            Who We Are
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${whoWeAreOpen ? "rotate-180" : ""}`} />
          </button>

          {whoWeAreOpen && (
            <div className="dropdown-enter absolute top-full left-0 pt-2 w-max min-w-56 z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-cs-gray/30 py-2">
              {aboutItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm text-cs-dark-blue/85 hover:bg-cs-cloud/70 transition-colors"
                  onClick={() => setWhoWeAreOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            </div>
          )}
        </div>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-cs-dark-blue/85 hover:text-cs-dark-blue font-medium transition-colors pb-1 ${
              pathname === link.href || pathname?.startsWith(link.href + "/")
                ? "border-b-2 border-cs-dark-blue"
                : ""
            }`}
          >
            {link.label}
          </Link>
        ))}

        {/* Help dropdown */}
        <div
          ref={helpDropdownRef}
          className="relative"
          onMouseEnter={canHover ? openHelp : undefined}
          onMouseLeave={canHover ? closeHelp : undefined}
        >
          <button
            onClick={() => {
              setHelpOpen(!helpOpen)
            }}
            aria-expanded={helpOpen}
            className={`flex items-center gap-1 text-cs-dark-blue/85 hover:text-cs-dark-blue font-medium transition-colors pb-1 ${
              isHelpActive ? "border-b-2 border-cs-dark-blue" : ""
            }`}
          >
            Help
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${helpOpen ? "rotate-180" : ""}`} />
          </button>

          {helpOpen && (
            /* Right-aligned: Help is the last dropdown before the Sign Up
               button, so a left-aligned 224px panel hangs past the viewport and
               gives the page a horizontal scrollbar. */
            <div className="absolute top-full right-0 pt-2 w-max min-w-56 z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-cs-gray/30 py-2">
              {helpItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm text-cs-dark-blue/85 hover:bg-cs-cloud/70 transition-colors"
                  onClick={() => setHelpOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            </div>
          )}
        </div>

        <Button asChild>
          <a href="https://platform.clinicalsim.ai/sign-up">Sign Up</a>
        </Button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] md:top-[89px] z-40 nav:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="relative bg-white/95 backdrop-blur-sm border-b border-cs-gray/30 shadow-lg max-h-[calc(100dvh-65px)] md:max-h-[calc(100dvh-89px)] overflow-y-auto">
            <div className="px-4 py-3">
              {/* Use Cases accordion */}
              <div className="border-b border-cs-gray/30">
                <button
                  onClick={() => {
                    setMobileSolutionsOpen(!mobileSolutionsOpen)
                  }}
                  aria-expanded={mobileSolutionsOpen}
                  className={`flex items-center justify-between w-full py-3 text-cs-dark-blue/85 font-medium ${
                    isSolutionsActive ? "text-cs-dark-blue" : ""
                  }`}
                >
                  Use Cases
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileSolutionsOpen && (
                  <div className="pb-3 pl-2">
                    {solutions.map((solution) => (
                      <Link
                        key={solution.slug}
                        href={`/solutions/${solution.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 text-cs-dark-blue/70 hover:text-cs-dark-blue hover:bg-cs-cloud/70 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <BrandIcon name={solution.icon} size={16} className="shrink-0" />
                        <span className="text-sm">{solution.title}</span>
                      </Link>
                    ))}
                    {/* ROI calculator link withheld; see the desktop dropdown above. */}
                    <Link
                      href="/frameworks"
                      className="block px-3 py-2.5 text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue hover:bg-cs-cloud/70 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Scored against your framework
                    </Link>
                    <Link
                      href="/solutions"
                      className="block px-3 py-2.5 text-sm font-medium text-cs-dark-blue hover:bg-cs-cloud/70 rounded-lg transition-colors mt-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All
                    </Link>
                  </div>
                )}
              </div>

              {/* Who We Serve accordion */}
              <div className="border-b border-cs-gray/30">
                <button
                  onClick={() => {
                    setMobileAudiencesOpen(!mobileAudiencesOpen)
                  }}
                  aria-expanded={mobileAudiencesOpen}
                  className={`flex items-center justify-between w-full py-3 text-cs-dark-blue/85 font-medium ${
                    isAudiencesActive ? "text-cs-dark-blue" : ""
                  }`}
                >
                  Who We Serve
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileAudiencesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileAudiencesOpen && (
                  <div className="pb-3 pl-2">
                    {audiences.map((audience) => (
                      <Link
                        key={audience.slug}
                        href={`/audiences/${audience.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 text-cs-dark-blue/70 hover:text-cs-dark-blue hover:bg-cs-cloud/70 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <BrandIcon name={audience.icon} size={16} className="shrink-0" />
                        <span className="text-sm">{audience.title}</span>
                      </Link>
                    ))}
                    <Link
                      href="/audiences"
                      className="block px-3 py-2.5 text-sm font-medium text-cs-dark-blue hover:bg-cs-cloud/70 rounded-lg transition-colors mt-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All
                    </Link>
                  </div>
                )}
              </div>

              {/* Who We Are accordion */}
              <div className="border-b border-cs-gray/30">
                <button
                  onClick={() => {
                    setMobileWhoWeAreOpen(!mobileWhoWeAreOpen)
                  }}
                  aria-expanded={mobileWhoWeAreOpen}
                  className={`flex items-center justify-between w-full py-3 text-cs-dark-blue/85 font-medium ${
                    isWhoWeAreActive ? "text-cs-dark-blue" : ""
                  }`}
                >
                  Who We Are
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileWhoWeAreOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileWhoWeAreOpen && (
                  <div className="pb-3 pl-2">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2.5 text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue hover:bg-cs-cloud/70 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Simple links */}
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 font-medium transition-colors border-b border-cs-gray/30 ${
                    pathname === link.href || pathname?.startsWith(link.href + "/")
                      ? "text-cs-dark-blue"
                      : "text-cs-dark-blue/85 hover:text-cs-dark-blue"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Help accordion */}
              <div className="border-b border-cs-gray/30">
                <button
                  onClick={() => {
                    setMobileHelpOpen(!mobileHelpOpen)
                  }}
                  aria-expanded={mobileHelpOpen}
                  className={`flex items-center justify-between w-full py-3 text-cs-dark-blue/85 font-medium ${
                    isHelpActive ? "text-cs-dark-blue" : ""
                  }`}
                >
                  Help
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileHelpOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileHelpOpen && (
                  <div className="pb-3 pl-2">
                    {helpItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2.5 text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue hover:bg-cs-cloud/70 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Button asChild className="w-full mt-4">
                <a
                  href="https://platform.clinicalsim.ai/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
