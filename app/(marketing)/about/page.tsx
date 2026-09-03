import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { AuthorByline } from "@/components/author-byline"
import { JsonLd } from "@/components/json-ld"
import { Waveform } from "@/components/waveform"
import { WaveformBand } from "@/components/waveform-band"
import {
  getAllAuthors,
  getAuthorUrl,
  TEAM_SECTION_PUBLISHED,
} from "@/lib/authors"
import { ArrowRight } from "lucide-react"
import { PAGE_DATE_MODIFIED } from "@/lib/page-dates"
import {
  CATEGORY_LINE,
  MISSION_STATEMENT_BODY,
  MISSION_STATEMENT_LEAD,
  POSITIONING_LONG,
} from "@/lib/positioning"

export const metadata: Metadata = {
  title: { absolute: "About ClinicalSim.ai: communication intelligence for healthcare" },
  description: POSITIONING_LONG,
  openGraph: {
    title: "About ClinicalSim.ai",
    description: POSITIONING_LONG,
    url: "https://clinicalsim.ai/about",
  },
  twitter: {
    title: "About ClinicalSim.ai",
    description: POSITIONING_LONG,
  },
  alternates: {
    canonical: "https://clinicalsim.ai/about",
  },
}

const LAST_UPDATED = PAGE_DATE_MODIFIED.about
// Sourced from lib/authors.ts so the section and the author entity URLs that
// depend on it cannot disagree. See TEAM_SECTION_PUBLISHED there.
const SHOW_TEAM: boolean = TEAM_SECTION_PUBLISHED

export default function AboutPage() {
  const team = SHOW_TEAM ? getAllAuthors() : []

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "About ClinicalSim.ai",
            description:
              POSITIONING_LONG,
            url: "https://clinicalsim.ai/about",
            dateModified: LAST_UPDATED,
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
                name: "About",
                item: "https://clinicalsim.ai/about",
              },
            ],
          },
          ...team.map((author) => ({
            "@context": "https://schema.org" as const,
            "@type": "Person" as const,
            // Same @id the Article author schema uses, so a post byline and this
            // card resolve to one person.
            ...(getAuthorUrl(author.id)
              ? { "@id": getAuthorUrl(author.id), url: getAuthorUrl(author.id) }
              : {}),
            name: author.name,
            ...(author.credentials
              ? { honorificSuffix: author.credentials }
              : {}),
            jobTitle: author.title,
            description: author.bio,
            worksFor: {
              "@type": "Organization" as const,
              // "ClinicalSim" to match the site-wide Organization node and the
              // Article author worksFor, since the shared @id above merges this
              // Person with the article byline Person.
              name: "ClinicalSim",
              url: "https://clinicalsim.ai",
            },
            ...(author.sameAs && author.sameAs.length > 0
              ? { sameAs: author.sameAs }
              : {}),
          })),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28 bg-cs-dark-blue text-white">
        <Waveform seed="about" align="right" opacity={0.17} />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="inline-flex items-center gap-2 text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-cs-electric mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-cs-electric" aria-hidden="true" />
            About ClinicalSim
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            {CATEGORY_LINE}
          </h1>
          <p className="text-xl text-cs-cloud font-light leading-relaxed max-w-2xl">
            {POSITIONING_LONG}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-16 md:py-24 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-cs-navy mb-8">
            Our mission
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-cs-dark-blue leading-[1.25] tracking-tight text-balance mb-8">
            {MISSION_STATEMENT_LEAD}
          </p>
          <div className="max-w-3xl space-y-5 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            {MISSION_STATEMENT_BODY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="navy" className="bg-cs-cloud" />

      {/* Why we exist */}
      <section className="px-6 py-16 md:py-24 bg-cs-navy text-white">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <h2 className="text-3xl md:text-4xl font-light text-cs-electric leading-tight">
            Why we exist
          </h2>
          <blockquote className="border-l-4 border-cs-electric pl-6 md:pl-8">
            <div className="space-y-6 text-lg md:text-xl text-cs-cloud font-light leading-relaxed">
              <p>
                I have been the physician at the bedside, the patient in the bed and an advocating mom in the NICU.
              </p>
              <p>
                When I was bleeding to death after my daughter&apos;s pre-term delivery, the OB called my mother and told her, &quot;We&apos;re doing all we can, but she&apos;s really sick.&quot; My mother is not in medicine. She hung up with more questions than answers, and she still didn&apos;t know I was dying. My husband, without medical training, advocated for hours before anyone listened to him, and his persistence is the reason I am alive today. None of that was a failure of knowledge or technical skill. It was language, which is the one thing we offer in nearly every encounter and the one thing we almost never practice. That is what ClinicalSim is for and why it matters: real conversations, out loud, with feedback specific enough to change what you say the next time you walk into a room.
              </p>
              <p>
                My husband, the advocate who wasn&apos;t heard, is now the CEO of ClinicalSim. Our consulting and co-founding medical team consists of dedicated clinicians who are also program directors and educators. None of us are building this from the outside.
              </p>
            </div>
            <footer className="mt-8 border-t border-white/20 pt-6 text-cs-cloud">
              <p className="font-medium text-white">Lauren Rissman, MD</p>
              <p className="mt-1 text-sm font-medium">Chief Medical Officer</p>
              <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed">
                Board-certified in pediatrics, pediatric critical care medicine and hospice and palliative care medicine.
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      <SectionDivider
        variant="wave"
        color={SHOW_TEAM ? "cloud" : "white"}
        className="bg-cs-navy"
      />

      {SHOW_TEAM && (
        <>
          {/* Team */}
          <section className="px-6 py-16 md:py-20 bg-cs-cloud">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-4 text-center leading-tight">
                The people who built it
              </h2>
              <p className="text-lg text-cs-dark-blue/70 font-light leading-relaxed text-center max-w-3xl mx-auto mb-12">
                Physicians with experience in fellowship leadership, simulation education, and clinical communication work alongside a team that has built enterprise software.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((author) => (
                  <div
                    key={author.id}
                    id={author.id}
                    className="bg-white rounded-xl p-6 border border-cs-gray/50 scroll-mt-28"
                  >
                    <AuthorByline authorId={author.id} />
                    <p className="text-sm text-cs-dark-blue/70 font-light leading-relaxed mt-4">
                      {author.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider variant="diagonal-up" color="white" className="bg-cs-cloud" />
        </>
      )}

      {/* What ClinicalSim is */}
      <section className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight">
            What ClinicalSim is
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            <p>
              Clinicians and patient facing staff talk with AI patients by voice from any device, on cases that cover clinical conversations, patient service standards, and debriefing. Nobody books a room or sits in as an observer. The current programs and conversations live on our{" "}
              <Link href="/solutions" className="text-cs-dark-blue font-medium underline decoration-cs-dark-blue/30 hover:decoration-cs-dark-blue underline-offset-4 transition-colors">
                use cases page
              </Link>
              .
            </p>
            <p>
              Every simulation is scored against the standard named on the case, and the participant&apos;s own words sit under each score. Participants receive feedback tied to that standard. Programs can review individual reports for agreed coaching and aggregate patterns for curriculum planning under rules set before launch.
            </p>
            <p className="text-cs-dark-blue font-normal">
              ClinicalSim extends standardized patient programs. It adds repeatable practice between live encounters and another source of evidence for review. It does not replace live assessment or human judgment.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" className="bg-white" />

      {/* Built for how programs actually run */}
      <section className="px-6 py-16 md:py-20 bg-cs-cloud">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight">
            Built for how institutions actually run
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            <p>
              ClinicalSim runs in the browser, so there is nothing to install. Participants practice assigned cases and review feedback tied to the transcript. Programs can support coaching, review agreed progress records, and export reports from one dashboard under access rules set before launch.
            </p>
            <p>
              Every case uses a synthetic patient written from clinical literature rather than a patient record. The product still handles learner recordings, transcripts, account data, and institutional data, which require protection.
            </p>
          </div>
          <Link
            href="/trust"
            className="inline-flex items-center text-cs-dark-blue font-medium hover:text-cs-navy transition-colors group mt-8"
          >
            How we handle data
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="dark-blue" className="bg-cs-cloud" />

      {/* Get started */}
      <WaveformBand seed="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">
            Start with one team and one standard
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90 max-w-3xl mx-auto">
            Tell us who would practice, what standard you already use, and how the results should be reported. We will show you what one pilot cycle could look like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Talk with us
              </Button>
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center text-white/70 font-medium hover:text-cs-electric transition-colors group"
            >
              Are you a researcher? Apply to collaborate
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </WaveformBand>
    </>
  )
}
