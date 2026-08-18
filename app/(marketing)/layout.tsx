import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JsonLd } from "@/components/json-ld"

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
            description:
              "Clinical simulation platform for practicing and measuring clinical communication, the most performed and least measured procedure in medicine. Used across medical school, residency, fellowship, communication remediation, and faculty development. Built by practicing physicians who direct fellowship programs and simulation centers.",
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
            description:
              "Practice the conversations that matter most. AI clinical simulation to practice and measure clinical communication across the medical-education continuum, covering medical school, residency, fellowship, and faculty development, with feedback mapped to the framework appropriate to each stage, including ACGME Milestones 2.0 in graduate medical education.",
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
        <div className="absolute inset-0 bg-transparent"></div>
        <div className="relative">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
