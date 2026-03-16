import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JsonLd } from "@/components/json-ld"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ClinicalSim.ai",
            url: "https://clinicalsim.ai",
            logo: "https://clinicalsim.ai/logo.svg",
            description:
              "Clinical simulation platform purpose-built for communication remediation and training across medical education — medical school, residency, and fellowship. Built by simulation directors and communication researchers.",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ClinicalSim.ai",
            url: "https://clinicalsim.ai",
            description:
              "Practice the conversations that matter most. AI clinical simulation purpose-built for communication remediation in graduate medical education, mapped to ACGME ICS Milestones 2.0.",
          },
        ]}
      />
      <SiteHeader />
      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        <div className="relative">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
