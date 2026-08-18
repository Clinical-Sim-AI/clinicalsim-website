import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Formats a bare ISO day ("2026-08-18") as "August 18, 2026". Bare ISO dates
 * parse as UTC midnight, so formatting without an explicit zone shifts them a
 * day west of UTC; these helpers pin the zone to UTC.
 */
export function formatIsoDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/** Formats a bare ISO day as "August 2026". Same UTC pinning as formatIsoDay. */
export function formatIsoMonth(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  })
}
