import type { Metadata } from "next"
import { RemediationPageLayout } from "@/components/remediation-page-layout"
import { remediationPageData } from "@/lib/remediation"

export const metadata: Metadata = {
  title: "Communication remediation for medical education programs",
  description:
    "AI patient practice for communication remediation in GME, with rubric-scored reports and transcript evidence. In a survey of 267 family medicine program directors, 93% reported at least one resident in remediation during the prior three years.",
  openGraph: {
    title: "Communication remediation | ClinicalSim.ai",
    description:
      "Structured communication practice with rubric-scored feedback and transcript evidence for faculty and CCC review.",
    url: "https://clinicalsim.ai/solutions/remediation",
  },
  twitter: {
    title: "Communication remediation | ClinicalSim.ai",
    description:
      "Give learners structured voice-based practice between coaching sessions and bring transcript evidence to your CCC.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/solutions/remediation",
  },
}

export default function RemediationPage() {
  return <RemediationPageLayout data={remediationPageData} />
}
