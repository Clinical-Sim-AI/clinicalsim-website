import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JsonLd } from "@/components/json-ld"
import {
  CATEGORY_DEFINITION,
  CATEGORY_LINE,
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
              url: "https://clinicalsim.ai/logo.svg",
              width: "512",
              height: "512",
            },
            // Company-level category statement, then the plain-language
            // definition, then who uses it. An answer engine reads this node
            // before it reads any page, so it carries the same sentence the
            // homepage, /about, /faq, and /llms.txt carry.
            description: `${CATEGORY_LINE} ${CATEGORY_DEFINITION} ${POSITIONING_AUDIENCE}`,
            foundingDate: "2024",
            knowsAbout: [
              "Medical communication training",
              "Clinical simulation",
              "ACGME Milestones 2.0",
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
      <SiteHeader />
      <main className="relative">
        <div className="relative">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
