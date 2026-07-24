import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import { FaqAnchorHandler } from "@/components/faq-anchor-handler"
import { CopyLinkButton } from "@/components/copy-link-button"
import { releases, RELEASE_NOTES_UPDATED_ISO } from "@/lib/release-notes"

export const metadata: Metadata = {
  title: "Release Notes: What's New in ClinicalSim",
  description:
    "Plain-language release notes for ClinicalSim, newest first. What reached the live product for learners and program leads, plus the behind-the-scenes work behind each release.",
  openGraph: {
    title: "Release Notes | ClinicalSim.ai",
    description:
      "What's new in ClinicalSim, release by release: the redesigned feedback report and progress dashboard, the public case catalog, in-app support, usage metrics, and more.",
    url: "https://clinicalsim.ai/help/release-notes",
  },
  twitter: {
    title: "Release Notes | ClinicalSim.ai",
    description:
      "What's new in ClinicalSim, release by release, in plain language. Newest first.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/help/release-notes",
  },
}

const LAST_UPDATED_LABEL = "July 24, 2026"

// Bullet strings may open with a **bold** lead-in; render that segment in
// medium weight and leave the rest as plain text.
function renderReleaseBullet(text: string) {
  const match = text.match(/^\*\*(.+?)\*\*(.*)$/s)
  if (match) {
    return (
      <>
        <span className="font-medium text-cs-dark-blue">{match[1]}</span>
        {match[2]}
      </>
    )
  }
  return text
}

export default function ReleaseNotesPage() {
  return (
    <>
      <FaqAnchorHandler />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ClinicalSim.ai Release Notes",
            description:
              "Plain-language release notes for ClinicalSim, newest first, covering learner- and program-facing changes and the behind-the-scenes work behind each release.",
            url: "https://clinicalsim.ai/help/release-notes",
            dateModified: RELEASE_NOTES_UPDATED_ISO,
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
              {
                "@type": "ListItem",
                position: 3,
                name: "Release Notes",
                item: "https://clinicalsim.ai/help/release-notes",
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
            <Link href="/help" className="hover:text-cs-dark-blue/85 transition-colors">
              Help
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-dark-blue/85">Release Notes</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-6 text-cs-dark-blue">
            What&apos;s <span className="font-medium">new</span>
          </h1>

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed max-w-3xl">
            Our latest releases, newest first. Open any release to see what
            changed, and expand <span className="italic">Behind the scenes</span>{" "}
            for the technical detail.
          </p>

          <p className="mt-6 text-sm text-cs-dark-gray">
            Last updated {LAST_UPDATED_LABEL}
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* Releases */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto space-y-4">
          {releases.map((release, index) => (
            <div
              key={release.id}
              id={release.id}
              className="border border-cs-gray/50 rounded-xl overflow-hidden scroll-mt-24"
            >
              <details className="group" open={index === 0}>
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                  <h2 className="text-lg md:text-xl font-medium text-cs-dark-blue pr-4">
                    {release.dateLabel}
                  </h2>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm text-cs-dark-gray font-light hidden sm:inline">
                      {release.userFacing.length}{" "}
                      {release.userFacing.length === 1 ? "highlight" : "highlights"}
                    </span>
                    <CopyLinkButton
                      id={release.id}
                      label={`Copy link to ${release.dateLabel} release`}
                    />
                    <ChevronRight className="w-5 h-5 text-cs-gray transition-transform group-open:rotate-90" />
                  </div>
                </summary>

                <div className="px-6 pb-6 pt-1">
                  {release.note && (
                    <p className="text-sm text-cs-dark-blue/70 font-light italic mb-5">
                      {release.note}
                    </p>
                  )}

                  <ul className="space-y-3">
                    {release.userFacing.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-base text-cs-dark-blue font-light leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cs-navy"
                        />
                        <span>{renderReleaseBullet(item)}</span>
                      </li>
                    ))}
                  </ul>

                  {release.team.length > 0 && (
                    <details className="group/team mt-5 rounded-lg bg-cs-cloud/40">
                      <summary className="flex items-center gap-2 cursor-pointer px-4 py-3 text-sm font-medium text-cs-navy">
                        <ChevronRight className="w-4 h-4 text-cs-dark-gray transition-transform group-open/team:rotate-90" />
                        Behind the scenes
                        <span className="font-light text-cs-dark-gray">
                          ({release.team.length})
                        </span>
                      </summary>
                      <ul className="space-y-2.5 px-4 pb-4 pt-1">
                        {release.team.map((item, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm text-cs-dark-blue/80 font-light leading-relaxed"
                          >
                            <span
                              aria-hidden
                              className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cs-dark-gray"
                            />
                            <span>{renderReleaseBullet(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" />

      {/* CTA */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-cs-navy mb-4">
            Have a{" "}
            <span className="text-cs-dark-blue font-medium">question?</span>
          </h2>
          <p className="text-base text-cs-dark-blue/70 font-light leading-relaxed mb-8">
            Browse the help center for getting-started guides, or reach out and
            talk to our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/help">
              <Button variant="secondary" size="lg">
                Visit the help center
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg">Talk to us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
