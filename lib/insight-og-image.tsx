import { ImageResponse } from "next/og"
import { getPostBySlug } from "@/lib/posts"
import {
  WAVE_VIEWBOX_HEIGHT,
  WAVE_VIEWBOX_WIDTH,
  waveBars,
} from "@/lib/waveform"

/**
 * Shared factory for the per-article OG cards.
 *
 * Every insight used to inherit the site-wide card from app/opengraph-image.tsx,
 * so fourteen different articles shared one image in Slack, LinkedIn and
 * iMessage previews. Each post now gets its own, seeded from its slug.
 *
 * satori (which powers next/og) renders a small subset of CSS and cannot run
 * our component tree, so the bars are laid out here from the shared geometry in
 * lib/waveform.ts. They are plain divs rather than the SVG data URI, because
 * next/og rasterizes through resvg's wasm build, which silently drops an
 * <image> whose href is itself an SVG.
 */

/** The wave strip along the bottom of the card, in card pixels. */
const WAVE_WIDTH = 1200
const WAVE_HEIGHT = 200

/**
 * Card dimensions. Next only reads `size` / `contentType` / `runtime` off a
 * route segment, so each opengraph-image.tsx declares its own; this copy exists
 * only to size the ImageResponse below.
 */
const size = { width: 1200, height: 630 }

/** Long editorial headlines need to step down a size or they overflow the card. */
function titleFontSize(title: string): number {
  if (title.length > 90) return 48
  if (title.length > 60) return 56
  return 66
}

export function insightOgAlt(slug: string): string {
  const post = getPostBySlug(slug)
  return post ? `${post.title} | ClinicalSim` : "ClinicalSim Insights"
}

export function insightOgImage(slug: string): ImageResponse {
  const post = getPostBySlug(slug)
  const title = post?.title ?? "ClinicalSim Insights"
  const bars = waveBars({ seed: slug, align: "center" })
  const scaleX = WAVE_WIDTH / WAVE_VIEWBOX_WIDTH
  const scaleY = WAVE_HEIGHT / WAVE_VIEWBOX_HEIGHT

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#061729",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: WAVE_WIDTH,
            height: WAVE_HEIGHT,
            display: "flex",
            opacity: 0.22,
          }}
        >
          {bars.map((bar, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: bar.x * scaleX,
                top: bar.y * scaleY,
                width: bar.width * scaleX,
                height: bar.height * scaleY,
                borderRadius: bar.radius * scaleX,
                background: bar.color,
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          ClinicalSim
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            marginTop: 32,
          }}
        >
          <div
            style={{
              fontSize: titleFontSize(title),
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 400,
            color: "#79f0b8",
          }}
        >
          Insights
        </div>
      </div>
    ),
    { ...size }
  )
}
