import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JsonLd } from "@/components/json-ld"
import {
  CATEGORY_DEFINITION,
  CATEGORY_LINE,
  ORGANIZATION_LOGO,
  POSITIONING_AUDIENCE,
  POSITIONING_LONG,
} from "@/lib/positioning"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ClinicalSim",
            url: "https://clinicalsim.ai",
            logo: {
              "@type": "ImageObject",
              ...ORGANIZATION_LOGO,
            },
            // Company-level category statement, then the plain-language
            // definition, then who uses it. An answer engine reads this node
            // before it reads any page, so it carries the same sentence the
            // homepage, /about, /faq, and /llms.txt carry.
            description: `${CATEGORY_LINE} ${CATEGORY_DEFINITION} ${POSITIONING_AUDIENCE}`,
            foundingDate: "2024",
            knowsAbout: [
              "Patient experience communication",
              "Health system service standards",
              "Clinical and educational debriefing",
              "Healthcare workforce education",
              "Medical communication training",
              "Clinical simulation",
              "AAMC Foundational Competencies",
              "Communication remediation",
              "Undergraduate and graduate medical education",
              "Faculty development",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            // Stable node id so per-article `isPartOf` references resolve to
            // this WebSite rather than dangling.
            "@id": "https://clinicalsim.ai/#website",
            name: "ClinicalSim.ai",
            url: "https://clinicalsim.ai",
            description: POSITIONING_LONG,
            publisher: {
              "@type": "Organization",
              name: "ClinicalSim",
              url: "https://clinicalsim.ai",
            },
          },
        ]}
      />
      {/* First focusable element on every page, so a keyboard or screen-reader
          user can get past the header nav in one keystroke. Hidden until
          focused. The site otherwise has a single <main>, proper landmarks, and
          aria-labels throughout, and this was the one gap left in the
          accessibility tree that browser agents read.

          z-[60] rather than z-50: SiteHeader is `relative z-50` and comes later
          in DOM order, so at equal z-index it wins the stacking context and
          paints its translucent bar over exactly the top-left corner where
          this link appears. A focused control hidden behind the header is the
          one failure this element exists to prevent. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cs-dark-blue focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-cs-electric"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="relative">
        <div className="relative">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
