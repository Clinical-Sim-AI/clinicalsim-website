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
              "Clinical simulation platform purpose-built for communication remediation and training across medical education — medical school, residency, fellowship, and faculty development. Built by simulation directors and communication researchers.",
            foundingDate: "2024",
            knowsAbout: [
              "Medical communication training",
              "Clinical simulation",
              "ACGME Milestones 2.0",
              "Communication remediation",
              "Undergraduate and graduate medical education",
              "Faculty development",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ClinicalSim.ai",
            url: "https://clinicalsim.ai",
            description:
              "Practice the conversations that matter most. AI clinical simulation to practice and measure clinical communication across the medical-education continuum — medical school, residency, fellowship, and faculty development — mapped to ACGME Milestones 2.0.",
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
