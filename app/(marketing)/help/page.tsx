import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, FileText, PlayCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Help Center: Guides, Videos & Release Notes",
  description:
    "The ClinicalSim help center: getting-started videos, plain-language release notes, and a direct line to our team when you need a hand.",
  openGraph: {
    title: "Help Center | ClinicalSim.ai",
    description:
      "Getting-started videos, release notes, and support for ClinicalSim programs and learners.",
    url: "https://clinicalsim.ai/help",
  },
  twitter: {
    title: "Help Center | ClinicalSim.ai",
    description:
      "Getting-started videos, release notes, and support for ClinicalSim.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/help",
  },
}

export default function HelpPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ClinicalSim.ai Help Center",
            description:
              "The ClinicalSim help center: getting-started videos, release notes, and support for programs and learners.",
            url: "https://clinicalsim.ai/help",
            isPartOf: {
              "@type": "WebSite",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://clinicalsim.ai",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Help",
                item: "https://clinicalsim.ai/help",
              },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 pt-4 md:pt-6 pb-4 md:pb-6">
        <div className="absolute inset-0 bg-cs-cloud -z-10" />

        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-cs-dark-gray mb-8">
            <Link href="/" className="hover:text-cs-dark-blue/85 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-dark-blue/85">Help</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-6 text-cs-dark-blue">
            Help <span className="font-medium">center</span>
          </h1>

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed max-w-3xl">
            Everything you need to get the most out of ClinicalSim: short
            getting-started videos, a running log of what&apos;s new, and a
            direct line to our team.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Help cards */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Getting started videos (coming soon) */}
          <div className="flex flex-col rounded-2xl border border-cs-gray/50 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <PlayCircle className="w-6 h-6 text-cs-navy" />
              <h2 className="text-xl font-medium text-cs-dark-blue">
                Getting started
              </h2>
              <span className="ml-auto rounded-full bg-cs-cloud px-3 py-1 text-xs font-medium text-cs-navy">
                Coming soon
              </span>
            </div>
            <p className="text-base text-cs-dark-blue/70 font-light leading-relaxed">
              Short walkthrough videos for learners and program leads: running
              your first case, reading a feedback report, and setting up a
              project. We&apos;re recording these now.
            </p>
          </div>

          {/* Release notes */}
          <Link
            href="/help/release-notes"
            className="group flex flex-col rounded-2xl border border-cs-gray/50 p-6 md:p-8 transition-colors hover:border-cs-navy/40 hover:bg-cs-cloud/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-cs-navy" />
              <h2 className="text-xl font-medium text-cs-dark-blue">
                Release notes
              </h2>
            </div>
            <p className="text-base text-cs-dark-blue/70 font-light leading-relaxed">
              A plain-language log of what&apos;s new in ClinicalSim, newest
              first, with the details behind each release.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cs-dark-blue">
              See what&apos;s new
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          {/* Support */}
          <div className="flex flex-col rounded-2xl border border-cs-gray/50 p-6 md:p-8 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-cs-navy" />
              <h2 className="text-xl font-medium text-cs-dark-blue">
                Need a hand?
              </h2>
            </div>
            <p className="text-base text-cs-dark-blue/70 font-light leading-relaxed mb-6 max-w-2xl">
              Logged-in users can reach us anytime from the in-app support chat.
              Prefer email, or want to talk about piloting ClinicalSim at your
              program? Get in touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">Contact us</Button>
              </Link>
              <Link href="/faq">
                <Button variant="secondary" size="lg">
                  Read the FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
