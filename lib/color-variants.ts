/**
 * Shared treatments for the `colorVariant` field that solutions and audiences
 * both carry, so the two page layouts cannot drift apart.
 */

export type ColorVariant = "accent" | "navy" | "blue" | "light-blue"

/**
 * The icon chip in a hero. The hero band is Dark Blue, so `blue` cannot use
 * `bg-cs-dark-blue`: the chip would be the same color as the band behind it.
 * Call sites add `ring-1 ring-white/15`, since Navy on Dark Blue is legible
 * but weak without a hairline. Pills further down a page sit on white and keep
 * their own map.
 */
export const heroBadge: Record<ColorVariant, string> = {
  accent: "bg-cs-electric text-cs-dark-blue",
  navy: "bg-cs-navy text-white",
  blue: "bg-cs-navy text-white",
  "light-blue": "bg-cs-light-blue text-cs-dark-blue",
}

/** Which BrandIcon color reads on top of the chip that variant produces. */
export function heroBadgeIconColor(variant: ColorVariant): "dark" | "white" {
  return variant === "accent" || variant === "light-blue" ? "dark" : "white"
}
