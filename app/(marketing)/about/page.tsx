import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { AuthorByline } from "@/components/author-byline"
import { JsonLd } from "@/components/json-ld"
import { getAllAuthors, getAuthorUrl } from "@/lib/authors"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About ClinicalSim.ai: AI clinical simulation for medical communication",
  description:
    "ClinicalSim gives learners voice-based practice with AI patients and gives faculty transcript evidence behind rubric-scored feedback.",
  openGraph: {
    title: "About ClinicalSim.ai",
    description:
      "Learners practice high-stakes conversations with AI patients, and faculty can inspect the transcript evidence behind each score.",
    url: "https://clinicalsim.ai/about",
  },
  twitter: {
    title: "About ClinicalSim.ai",
    description:
      "Learners practice high-stakes conversations with AI patients, and faculty can inspect the transcript evidence behind each score.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/about",
  },
}

const LAST_UPDATED = "2026-08-10"

export default function AboutPage() {
  const team = getAllAuthors()

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "About ClinicalSim.ai",
            description:
              "ClinicalSim gives learners voice-based practice with AI patients and gives faculty transcript evidence behind rubric-scored feedback.",
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
            "@id": getAuthorUrl(author.id),
            url: getAuthorUrl(author.id),
            name: author.name,
            ...(author.credentials
              ? { honorificSuffix: author.credentials }
              : {}),
            jobTitle: author.title,
            description: author.bio,
            worksFor: {
              "@type": "Organization" as const,
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
            ...(author.sameAs && author.sameAs.length > 0
              ? { sameAs: author.sameAs }
              : {}),
          })),
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 py-20 md:py-28 bg-cs-dark-blue text-white">
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="inline-flex items-center gap-2 text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-cs-electric mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-cs-electric" aria-hidden="true" />
            About ClinicalSim
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-balance mb-6 text-white">
            Practice the conversations that matter most.
          </h1>
          <p className="text-xl text-cs-cloud font-light leading-relaxed max-w-2xl">
            Learners are expected to lead high-stakes conversations before they have had enough chances to practice them. ClinicalSim gives them voice-based rehearsal with AI patients and gives faculty the evidence behind each score.
          </p>
        </div>
      </section>

      {/* Why we exist */}
      <section className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight">
            Why we exist
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            <p>
              Clinicians rehearse procedures until a supervisor is satisfied. Communication rarely gets the same treatment. A family meeting or diagnosis disclosure happens once, with a real person, and faculty cannot attend every practice encounter. ClinicalSim gives learners more chances to practice and gives programs a consistent record of what happened.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="cloud" />

      {/* What ClinicalSim is */}
      <section className="px-6 py-16 md:py-20 bg-cs-cloud">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight">
            What ClinicalSim is
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            <p>
              Learners talk through high-stakes encounters by voice with AI patients, practicing the range of conversations their training demands. They practice from any device, on their own time, as many times as they need. There&apos;s no sim center to book, no standardized patient to schedule, and no app to install. The specific scenarios, by specialty and setting, live on our{" "}
              <Link href="/solutions" className="text-cs-dark-blue font-medium underline decoration-cs-dark-blue/30 hover:decoration-cs-dark-blue underline-offset-4 transition-colors">
                use cases page
              </Link>
              .
            </p>
            <p>
              Every session produces rubric-scored feedback mapped to the competency and communication frameworks named on the case. Directors and faculty can assign cases, review reports, and follow practice over time.
            </p>
            <p className="text-cs-dark-blue font-normal">
              ClinicalSim extends standardized patient programs. It adds repeatable practice between live encounters and another source of evidence for faculty review. It does not replace live assessment or human judgment.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* Built for how programs actually run */}
      <section className="px-6 py-16 md:py-20 bg-cs-cloud">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8 leading-tight">
            Built for how programs actually run
          </h2>
          <div className="space-y-6 text-lg text-cs-dark-blue/85 font-light leading-relaxed">
            <p>
              ClinicalSim runs in the browser, so there is nothing to install. Every session generates a timestamped report tied to the frameworks named on the case and the evidence in the transcript. Directors and faculty can assign cases, review progress, and export reports from one dashboard.
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

      <SectionDivider variant="diagonal-up" color="white" />

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

      {/* Get started */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">
            Give learners practice before the conversation is real
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90 max-w-3xl mx-auto">
            Tell us which learners and conversations matter most in your program. We will show you what one pilot cycle could look like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Request a pilot
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
      </section>
    </>
  )
}
