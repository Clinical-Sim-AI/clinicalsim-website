import type { Metadata } from "next"
import { RemediationPageLayout } from "@/components/remediation-page-layout"
import { remediationPageData } from "@/lib/remediation"

export const metadata: Metadata = {
  title: "Communication Remediation for Medical Education Programs",
  description:
    "AI clinical simulation for communication remediation in GME, with practice mapped to ACGME Milestones 2.0 and CCC-ready documentation. In a CERA survey of 267 family medicine program directors, 93% reported resident remediation and 50% wanted an accessible toolkit.",
  openGraph: {
    title: "Communication Remediation | ClinicalSim.ai",
    description:
      "AI clinical simulation for communication remediation, with structured practice mapped to ACGME Milestones 2.0 and CCC-ready documentation.",
    url: "https://clinicalsim.ai/solutions/remediation",
  },
  twitter: {
    title: "Communication Remediation | ClinicalSim.ai",
    description:
      "The remediation toolkit program directors have been asking for. Structured practice mapped to ACGME milestones with CCC-ready documentation.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/solutions/remediation",
  },
}

export default function RemediationPage() {
  return <RemediationPageLayout data={remediationPageData} />
}
