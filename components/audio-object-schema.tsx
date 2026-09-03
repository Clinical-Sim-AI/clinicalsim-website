import { JsonLd } from "@/components/json-ld"
import { ORGANIZATION_LOGO } from "@/lib/positioning"
import { stripTranscriptMarkup } from "@/lib/feedback/transcript-markup"

export interface AudioObjectSchemaProps {
  /** Human-readable name of the recording. */
  name: string
  description: string
  /** Absolute URL of the audio file. */
  contentUrl: string
  /** Page the recording is published on, absolute. */
  embedUrl: string
  /** ISO 8601 datetime the encounter was recorded. */
  uploadDate: string
  /** Length in seconds, or null when unknown. */
  durationSeconds: number | null
  /** Transcript turns, in order. Rendered to a single plain-text block. */
  transcript: Array<{ role: string; message: string }>
}

/** Seconds to an ISO 8601 duration, e.g. 411 -> "PT6M51S". */
export function toIso8601Duration(totalSeconds: number): string {
  const seconds = Math.round(totalSeconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60

  return `PT${hours ? `${hours}H` : ""}${minutes ? `${minutes}M` : ""}${
    rest || (!hours && !minutes) ? `${rest}S` : ""
  }`
}

/**
 * Flattens transcript turns into the plain-text block the `transcript` property
 * expects. Speaker labels match the page ("You" for the learner, "AI" for the
 * patient) and the same markup stripping runs, so the schema text and the
 * visible transcript say the same thing.
 */
export function transcriptToPlainText(
  turns: Array<{ role: string; message: string }>
): string {
  return turns
    .map((turn) => {
      const speaker = turn.role === "user" ? "You" : "AI"
      return `${speaker}: ${stripTranscriptMarkup(turn.message)}`
    })
    .filter((line) => !line.endsWith(": "))
    .join("\n")
}

/**
 * Emits AudioObject JSON-LD for a published example encounter.
 *
 * Be honest about the ceiling here: Google has no audio rich result, so this
 * does nothing for a Google SERP. It is for the answer engines that cite this
 * site, where an unedited clinical conversation with a full transcript is the
 * strongest first-hand asset the company publishes and nothing in the markup
 * previously said it existed. The example pages emitted only WebPage and
 * BreadcrumbList.
 *
 * Every field is derived from the snapshot in lib/examples, so a re-snapshot
 * updates the schema with it. Never hand-populate one: an AudioObject pointing
 * at a file that is not there is worse than none.
 */
export function AudioObjectSchema({
  name,
  description,
  contentUrl,
  embedUrl,
  uploadDate,
  durationSeconds,
  transcript,
}: AudioObjectSchemaProps) {
  const transcriptText = transcriptToPlainText(transcript)

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "AudioObject",
        name,
        description,
        contentUrl,
        embedUrl,
        encodingFormat: "audio/mpeg",
        uploadDate,
        inLanguage: "en",
        // Published with no sign-in and no paywall, which is the whole point of
        // the examples hub.
        isAccessibleForFree: true,
        ...(durationSeconds != null && Number.isFinite(durationSeconds)
          ? { duration: toIso8601Duration(durationSeconds) }
          : {}),
        ...(transcriptText ? { transcript: transcriptText } : {}),
        publisher: {
          "@type": "Organization",
          name: "ClinicalSim",
          url: "https://clinicalsim.ai",
          logo: {
            "@type": "ImageObject",
            ...ORGANIZATION_LOGO,
          },
        },
      }}
    />
  )
}
