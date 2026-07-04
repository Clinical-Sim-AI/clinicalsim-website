"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { BrandIcon } from "@/components/brand-icon"
import { Button } from "@/components/ui/button"
import { getAllAudiences } from "@/lib/audiences"
import { getAllSolutions } from "@/lib/solutions"

export function SiteHeader() {
  const pathname = usePathname()
  const [audiencesOpen, setAudiencesOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [whoWeAreOpen, setWhoWeAreOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAudiencesOpen, setMobileAudiencesOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileWhoWeAreOpen, setMobileWhoWeAreOpen] = useState(false)
  const audiencesDropdownRef = useRef<HTMLDivElement>(null)
  const audiencesTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const solutionsDropdownRef = useRef<HTMLDivElement>(null)
  const solutionsTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const whoWeAreDropdownRef = useRef<HTMLDivElement>(null)
  const whoWeAreTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const audiences = getAllAudiences()
  const solutions = getAllSolutions()

  const aboutItems = [
    { href: "/about", label: "About Us" },
    { href: "/methodology", label: "Methodology" },
    { href: "/faq", label: "FAQ" },
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

  // Close mobile menu on route change (derived state)
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileMenuOpen(false)
    setMobileAudiencesOpen(false)
    setMobileSolutionsOpen(false)
    setMobileWhoWeAreOpen(false)
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
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (audiencesTimeoutRef.current) clearTimeout(audiencesTimeoutRef.current)
      if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current)
      if (whoWeAreTimeoutRef.current) clearTimeout(whoWeAreTimeoutRef.current)
    }
  }, [])

  const links = [
    { href: "/examples", label: "Examples" },
    { href: "/insights", label: "Insights" },
    { href: "/research", label: "Research" },
    { href: "/contact", label: "Contact" },
  ]

  const isAudiencesActive = pathname === "/audiences" || pathname?.startsWith("/audiences/")
  const isSolutionsActive = pathname === "/solutions" || pathname?.startsWith("/solutions/")
  const isWhoWeAreActive = aboutItems.some(
    (item) => pathname === item.href || pathname?.startsWith(item.href + "/")
  )

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
        className="xl:hidden p-2 -mr-2 text-cs-dark-blue/85 hover:text-cs-dark-blue transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop navigation */}
      <nav className="hidden xl:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
        {/* Use Cases dropdown */}
        <div
          ref={solutionsDropdownRef}
          className="relative"
          onMouseEnter={openSolutions}
          onMouseLeave={closeSolutions}
        >
          <button
            onClick={() => {
              setSolutionsOpen(!solutionsOpen)
            }}
            className={`flex items-center gap-1 text-cs-dark-blue/85 hover:text-cs-dark-blue font-medium transition-colors pb-1 ${
              isSolutionsActive ? "border-b-2 border-cs-dark-blue" : ""
            }`}
          >
            Use Cases
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
          </button>

          {solutionsOpen && (
            <div className="absolute top-full left-0 pt-2 w-72 z-50">
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
          onMouseEnter={openAudiences}
          onMouseLeave={closeAudiences}
        >
          <button
            onClick={() => {
              setAudiencesOpen(!audiencesOpen)
            }}
            className={`flex items-center gap-1 text-cs-dark-blue/85 hover:text-cs-dark-blue font-medium transition-colors pb-1 ${
              isAudiencesActive ? "border-b-2 border-cs-dark-blue" : ""
            }`}
          >
            Who We Serve
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${audiencesOpen ? "rotate-180" : ""}`} />
          </button>

          {audiencesOpen && (
            <div className="absolute top-full left-0 pt-2 w-72 z-50">
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
          onMouseEnter={openWhoWeAre}
          onMouseLeave={closeWhoWeAre}
        >
          <button
            onClick={() => {
              setWhoWeAreOpen(!whoWeAreOpen)
            }}
            className={`flex items-center gap-1 text-cs-dark-blue/85 hover:text-cs-dark-blue font-medium transition-colors pb-1 ${
              isWhoWeAreActive ? "border-b-2 border-cs-dark-blue" : ""
            }`}
          >
            Who We Are
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${whoWeAreOpen ? "rotate-180" : ""}`} />
          </button>

          {whoWeAreOpen && (
            <div className="absolute top-full left-0 pt-2 w-56 z-50">
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

        <Button asChild>
          <a href="https://platform.clinicalsim.ai/sign-up">Sign Up</a>
        </Button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] md:top-[89px] z-40 xl:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="relative bg-white/95 backdrop-blur-sm border-b border-cs-gray/30 shadow-lg max-h-[calc(100dvh-65px)] md:max-h-[calc(100dvh-89px)] overflow-y-auto">
            <div className="px-4 py-3">
              {/* Use Cases accordion */}
              <div className="border-b border-cs-gray/30">
                <button
                  onClick={() => {
                    setMobileSolutionsOpen(!mobileSolutionsOpen)
                  }}
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
