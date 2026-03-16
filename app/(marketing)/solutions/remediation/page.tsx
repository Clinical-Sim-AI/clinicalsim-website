import type { Metadata } from "next"
import { RemediationPageLayout } from "@/components/remediation-page-layout"
import { remediationPageData } from "@/lib/remediation"

export const metadata: Metadata = {
  title: "Communication Remediation for Medical Education Programs",
  description:
    "The first AI clinical simulation purpose-built for communication remediation in GME. Structured practice mapped to ACGME ICS Milestones 2.0 with CCC-ready documentation. 93% of programs face remediation — 50% of PDs want a toolkit. Built by simulation directors and communication researchers.",
  openGraph: {
    title: "Communication Remediation | ClinicalSim.ai",
    description:
      "AI clinical simulation for communication remediation — structured practice with real-time feedback, mapped to ACGME ICS Milestones 2.0, generating CCC-ready documentation.",
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
