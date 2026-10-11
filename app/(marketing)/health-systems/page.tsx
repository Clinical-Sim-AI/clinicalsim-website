import type { Metadata } from "next"
import { MarketOverview } from "@/components/market-overview"
import { healthSystemsOverview } from "@/lib/market-overviews"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"

export const metadata: Metadata = {
  title: "Communication practice for health systems",
  description: healthSystemsOverview.metaDescription,
  openGraph: {
    title: "Communication practice for health systems | ClinicalSim.ai",
    description: healthSystemsOverview.metaDescription,
    url: "https://clinicalsim.ai/health-systems",
  },
  twitter: {
    title: "Communication practice for health systems | ClinicalSim.ai",
    description: healthSystemsOverview.metaDescription,
  },
  alternates: { canonical: "https://clinicalsim.ai/health-systems" },
}

export default function HealthSystemsPage() {
  return <MarketOverview content={healthSystemsOverview} dateModified={PAGE_DATE_MODIFIED.healthSystems} />
}
