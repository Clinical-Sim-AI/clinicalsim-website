import { JsonLd } from "@/components/json-ld"

export interface VideoObjectSchemaProps {
  name: string
  description: string
  /** Public URL of the thumbnail image. */
  thumbnailUrl: string
  /** ISO 8601 date the video was published, e.g. "2026-06-09". */
  uploadDate: string
  /** Direct URL to the video file (contentUrl). */
  contentUrl?: string
  /** URL of the page or player where the video is embedded. */
  embedUrl?: string
  /** ISO 8601 duration, e.g. "PT2M30S". */
  duration?: string
  /** Full text transcript — strongly recommended for AI discoverability. */
  transcript?: string
}

/**
 * Emits VideoObject JSON-LD for a demo/product video. This is schema plumbing:
 * render it alongside a <DemoVideoSection> ONCE a real hosted video, thumbnail,
 * upload date, and (ideally) transcript exist. Do not populate with placeholder
 * values — a VideoObject pointing at a non-existent video is worse than none.
 *
 * Data dependency (hand to team): hosted video URL, thumbnail, upload date, and
 * a real transcript.
 */
export function VideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
  transcript,
}: VideoObjectSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name,
        description,
        thumbnailUrl,
        uploadDate,
        ...(contentUrl ? { contentUrl } : {}),
        ...(embedUrl ? { embedUrl } : {}),
        ...(duration ? { duration } : {}),
        ...(transcript ? { transcript } : {}),
        publisher: {
          "@type": "Organization",
          name: "ClinicalSim",
          url: "https://clinicalsim.ai",
          logo: {
            "@type": "ImageObject",
            url: "https://clinicalsim.ai/logo.svg",
          },
        },
      }}
    />
  )
}
