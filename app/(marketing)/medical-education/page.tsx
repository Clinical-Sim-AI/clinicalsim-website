import type { Metadata } from "next"
import { MarketOverview } from "@/components/market-overview"
import { medicalEducationOverview } from "@/lib/market-overviews"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"

export const metadata: Metadata = {
  title: "Communication practice for medical education",
  description: medicalEducationOverview.metaDescription,
  openGraph: {
    title: "Communication practice for medical education | ClinicalSim.ai",
    description: medicalEducationOverview.metaDescription,
    url: "https://clinicalsim.ai/medical-education",
  },
  twitter: {
    title: "Communication practice for medical education | ClinicalSim.ai",
    description: medicalEducationOverview.metaDescription,
  },
  alternates: { canonical: "https://clinicalsim.ai/medical-education" },
}

export default function MedicalEducationPage() {
  return <MarketOverview content={medicalEducationOverview} dateModified={PAGE_DATE_MODIFIED.medicalEducation} />
}
