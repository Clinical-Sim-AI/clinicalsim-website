import { insightOgAlt, insightOgImage } from "@/lib/insight-og-image"

const SLUG = "building-rapport-clinical-encounter"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = insightOgAlt(SLUG)

export default function Image() {
  return insightOgImage(SLUG)
}
