import Image from "next/image"
import { cn } from "@/lib/utils"

const iconRegistry = {
  "align-bottom": "6450612",
  "avatar-female": "6450630",
  "avatar-image-circle": "6450645",
  "avatar-male": "6450631",
  "badge-check": "6451118",
  "bandaid": "6451225",
  "bell-on": "6450474",
  "book-opened": "6450771",
  "book-reading": "6450779",
  "capsule": "6451243",
  "chart-pie-quarter": "6450939",
  "chart-pipe-decrease": "6450904",
  "chat-alt-checkmark": "6450859",
  "chat-dots": "6450856",
  "chat-exclamation": "6450832",
  "chat-square-heart": "6451084",
  "checkmark": "6450496",
  "currency-dollar": "6450902",
  "friendship": "6451292",
  "genetics": "6450597",
  "git-compare": "6450922",
  "group": "6451284",
  "hat-graduation": "6450798",
  "heart": "6451075",
  "hospital": "6450647",
  "injection": "6451216",
  "list-unordered": "6450559",
  "med-kit": "6450632",
  "medal-star": "6451109",
  "microscope": "6450781",
  "parentheses-curly": "6450935",
  "people-connected": "6451267",
  "people": "6451286",
  "phone-handle": "6450853",
  "plus": "6450457",
  "ribbon-check": "6451128",
  "ribbon": "6451117",
  "share": "6450501",
  "sound-wave": "6450453",
  "sound-wave-logo": "6450435",
  "square-video": "6451000",
  "stack": "6451311",
  "star-raising": "6451134",
  "student": "6450784",
  "taxi": "6450969",
  "thumb-down": "6450482",
  "thumb-up": "6450477",
  "tree-structure-bottom": "6451315",
  "view-grid-small": "6451184",
} as const

export type BrandIconName = keyof typeof iconRegistry

export type BrandIconColor = "dark" | "white"

export interface BrandIconProps {
  name: BrandIconName
  color?: BrandIconColor
  size?: number
  className?: string
  alt?: string
}

export function BrandIcon({
  name,
  color = "dark",
  size = 24,
  className,
  alt = "",
}: BrandIconProps) {
  const id = iconRegistry[name]
  // Always render the dark master and recolor with a CSS filter when white
  // is requested. This avoids gaps when the FFFFFF variant wasn't shipped.
  const src = `/brand/icons/noun-${name}-${id}-07172F.png`
  const filter = color === "white" ? "brightness(0) invert(1)" : undefined
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("inline-block", className)}
      style={filter ? { filter } : undefined}
      unoptimized
    />
  )
}
