"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Brain, ChevronDown, Menu, X } from "lucide-react"
import { getAllAudiences } from "@/lib/audiences"

export function SiteHeader() {
  const pathname = usePathname()
  const [audiencesOpen, setAudiencesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAudiencesOpen, setMobileAudiencesOpen] = useState(false)
  const audiencesDropdownRef = useRef<HTMLDivElement>(null)
  const audiencesTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const audiences = getAllAudiences()

  const openAudiences = () => {
    if (audiencesTimeoutRef.current) clearTimeout(audiencesTimeoutRef.current)
    setAudiencesOpen(true)
  }

  const closeAudiences = () => {
    audiencesTimeoutRef.current = setTimeout(() => setAudiencesOpen(false), 150)
  }

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileAudiencesOpen(false)
  }, [pathname])

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
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (audiencesTimeoutRef.current) clearTimeout(audiencesTimeoutRef.current)
    }
  }, [])

  const links = [
    { href: "/about", label: "About" },
    { href: "/insights", label: "Insights" },
    { href: "/research", label: "Research" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ]

  const isRemediationActive = pathname?.startsWith("/solutions/remediation")
  const isAudiencesActive = pathname === "/audiences" || pathname?.startsWith("/audiences/")

  return (
    <header className="relative z-50 flex items-center justify-between px-4 py-4 md:px-12 md:py-6 bg-white/80 backdrop-blur-sm border-b border-white/20">
      <Link href="/" className="flex items-center gap-2">
        <Brain className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-light text-slate-800">
          ClinicalSim<span className="text-blue-600">.ai</span>
        </span>
      </Link>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden p-2 -mr-2 text-gray-700 hover:text-gray-900 transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center gap-4 md:gap-8">
        {/* Remediation direct link */}
        <Link
          href="/solutions/remediation"
          className={`text-gray-700 hover:text-gray-900 font-medium transition-colors pb-1 ${
            isRemediationActive ? "border-b-2 border-blue-600" : ""
          }`}
        >
          Remediation
        </Link>

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
            className={`flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium transition-colors pb-1 ${
              isAudiencesActive ? "border-b-2 border-blue-600" : ""
            }`}
          >
            Who We Serve
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${audiencesOpen ? "rotate-180" : ""}`} />
          </button>

          {audiencesOpen && (
            <div className="absolute top-full left-0 pt-2 w-72 z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 py-2">
              {audiences.map((audience) => {
                const Icon = audience.icon
                return (
                  <Link
                    key={audience.slug}
                    href={`/audiences/${audience.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/70 transition-colors"
                    onClick={() => setAudiencesOpen(false)}
                  >
                    <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                    <span className="text-sm text-gray-700">{audience.title}</span>
                  </Link>
                )
              })}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <Link
                  href="/audiences"
                  className="block px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50/70 transition-colors"
                  onClick={() => setAudiencesOpen(false)}
                >
                  View All
                </Link>
              </div>
            </div>
            </div>
          )}
        </div>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-gray-700 hover:text-gray-900 font-medium transition-colors pb-1 ${
              pathname === link.href || pathname?.startsWith(link.href + "/")
                ? "border-b-2 border-blue-600"
                : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="relative bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-lg max-h-[calc(100dvh-65px)] overflow-y-auto">
            <div className="px-4 py-3">
              {/* Remediation direct link */}
              <Link
                href="/solutions/remediation"
                className={`block py-3 font-medium transition-colors border-b border-gray-100 ${
                  isRemediationActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Remediation
              </Link>

              {/* Who We Serve accordion */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => {
                    setMobileAudiencesOpen(!mobileAudiencesOpen)
                  }}
                  className={`flex items-center justify-between w-full py-3 text-gray-700 font-medium ${
                    isAudiencesActive ? "text-blue-600" : ""
                  }`}
                >
                  Who We Serve
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileAudiencesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileAudiencesOpen && (
                  <div className="pb-3 pl-2">
                    {audiences.map((audience) => {
                      const Icon = audience.icon
                      return (
                        <Link
                          key={audience.slug}
                          href={`/audiences/${audience.slug}`}
                          className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-blue-50/70 rounded-lg transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="text-sm">{audience.title}</span>
                        </Link>
                      )
                    })}
                    <Link
                      href="/audiences"
                      className="block px-3 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50/70 rounded-lg transition-colors mt-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All
                    </Link>
                  </div>
                )}
              </div>

              {/* Simple links */}
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 font-medium transition-colors border-b border-gray-100 ${
                    pathname === link.href || pathname?.startsWith(link.href + "/")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
