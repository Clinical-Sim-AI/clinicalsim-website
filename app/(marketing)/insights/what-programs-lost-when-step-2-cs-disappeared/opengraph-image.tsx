import { insightOgAlt, insightOgImage } from "@/lib/insight-og-image"

const SLUG = "what-programs-lost-when-step-2-cs-disappeared"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = insightOgAlt(SLUG)

export default function Image() {
  return insightOgImage(SLUG)
}
