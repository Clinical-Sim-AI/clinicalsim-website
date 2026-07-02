import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { CaseHeader } from "@/components/feedback/case-header"
import { MarkdownContent } from "@/components/feedback/markdown-content"
import { FeedbackReport } from "@/components/feedback/feedback-report"
import { ExampleAudioPlayer } from "@/components/feedback/example-audio-player"
import { ConversationTranscript } from "@/components/feedback/conversation-transcript"
import { getAllExamples, getExampleBySlug } from "@/lib/examples"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllExamples().map((example) => ({ slug: example.slug }))
}

/** "6m 51s" / "42s" / "1h 5m"; "" when null. Display-only. */
function formatDuration(seconds: number | null): string {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return ""
  const total = Math.round(seconds)
  if (total < 60) return `${total}s`
  const minutes = Math.floor(total / 60)
  if (total < 3600) {
    const rem = total % 60
    return rem === 0 ? `${minutes}m` : `${minutes}m ${rem}s`
  }
  const hours = Math.floor(minutes / 60)
  return `${hours}h ${minutes % 60}m`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const example = getExampleBySlug(slug)
  if (!example) return {}

  const title = `${example.title}: Example Feedback`
  const description =
    example.summary ||
    `See the exact learner feedback for the "${example.title}" simulation — assessment report, recording, and transcript.`
  const url = `https://clinicalsim.ai/examples/${example.slug}`

  return {
    title,
    description,
    openGraph: { title: `${example.title} | ClinicalSim Example`, description, url },
    twitter: { title: `${example.title} | ClinicalSim Example`, description },
    alternates: { canonical: url },
  }
}

export default async function ExampleCasePage({ params }: Props) {
  const { slug } = await params
  const example = getExampleBySlug(slug)
  if (!example) notFound()

  const duration = formatDuration(example.durationSeconds)
  const transcriptTurns = example.transcript.length

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${example.title}: Example Feedback`,
            description:
              example.summary ||
              `See the exact learner feedback for the "${example.title}" simulation — assessment report, recording, and transcript.`,
            url: `https://clinicalsim.ai/examples/${example.slug}`,
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
              { "@type": "ListItem", position: 1, name: "Home", item: "https://clinicalsim.ai" },
              { "@type": "ListItem", position: 2, name: "Examples", item: "https://clinicalsim.ai/examples" },
              {
                "@type": "ListItem",
                position: 3,
                name: example.title,
                item: `https://clinicalsim.ai/examples/${example.slug}`,
              },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 py-10 md:py-12 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/examples"
            className="inline-flex items-center gap-2 text-sm text-cs-cloud/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All examples
          </Link>
          <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-white">
            {example.title}
          </h1>
          {duration && (
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-cs-cloud/70">
              <Clock className="h-4 w-4" /> {duration} encounter
            </p>
          )}
          <p className="mt-6 max-w-2xl text-sm text-cs-cloud/70 font-light">
            This is a real, unedited encounter from the platform — the same
            read-only feedback page a learner sees after a session.
          </p>
        </div>
      </section>

      {/* Product showcase — scoped .cs-product theme so the ported app UI renders
          pixel-faithfully without disturbing the marketing site's theme. */}
      <section className="cs-product bg-cs-cloud px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-4xl space-y-8">
          <CaseHeader example={example} />

          {/* Recording — called out (light-blue panel + filled button) so it
              isn't missed; hearing the encounter is much of the value. */}
          <div className="rounded-2xl border border-cs-light-blue bg-cs-light-blue/20 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-cs-dark-blue">
                  Listen to the recording
                </p>
                <p className="text-xs text-cs-slate">
                  Hear the full{duration ? ` ${duration}` : ""} encounter
                </p>
              </div>
              <ExampleAudioPlayer src={example.audio.src} />
            </div>
          </div>

          {/* Transcript — collapsible, default closed (mirrors the app page, which
              leads with the feedback). */}
          <details className="rounded-md border border-cs-gray bg-white group">
            <summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-medium text-cs-dark-blue select-none [&::-webkit-details-marker]:hidden">
              <span className="text-cs-dark-gray transition-transform group-open:rotate-90">
                ▶
              </span>
              Transcript
              {transcriptTurns > 0 && (
                <span className="ml-2 rounded-full border border-cs-gray px-2 py-0.5 text-xs text-cs-dark-gray">
                  {transcriptTurns}
                </span>
              )}
            </summary>
            <div className="border-t border-cs-gray p-3">
              <ConversationTranscript transcript={example.transcript} />
            </div>
          </details>

          {/* Feedback */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-cs-dark-blue">
              <span className="inline-block border-b-[3px] border-cs-electric pb-1">
                Feedback
              </span>
            </h2>
            <FeedbackReport {...example.report} />
          </div>

          {/* References — the run version's evidence blob, appended after the
              feedback (mirrors the learner /history page). Display-only. */}
          {example.references && (
            <div className="space-y-4 border-t border-cs-gray pt-8">
              <h2 className="text-lg font-semibold text-cs-dark-blue">
                <span className="inline-block border-b-[3px] border-cs-electric pb-1">
                  References
                </span>
              </h2>
              <MarkdownContent className="text-sm text-cs-dark-blue [overflow-wrap:anywhere]">
                {example.references}
              </MarkdownContent>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-14 md:py-20 bg-white border-t border-cs-gray">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light text-cs-dark-blue mb-4">
            Your learners would get feedback like this
          </h2>
          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light mb-8">
            On demand, after every encounter — mapped to communication
            frameworks and the ACGME milestones your CCC already uses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Request a Pilot
              </Button>
            </Link>
            <Link href="/examples">
              <Button variant="secondary" size="lg">
                See more examples
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
