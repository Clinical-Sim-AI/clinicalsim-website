/**
 * Reading-time derivation for insight posts.
 *
 * `Post.readingTime` is hand-maintained in lib/posts.ts and rendered on both
 * the post and the /insights hub. Every short post overstated it by two to
 * three times: a 551-word post claimed 7 minutes and a 498-word post claimed 6,
 * while the four long-form posts were honest. That is a people-first defect a
 * reader can check in ten seconds, so the registry values are now bounded
 * against the MDX by lib/reading-time.test.ts.
 */

/**
 * Adult silent reading rate for prose. 200 to 250 wpm is the usual range and
 * 225 sits in the middle of it; the test allows a minute of slack either way,
 * so the exact figure inside that range does not decide a pass.
 */
export const WORDS_PER_MINUTE = 225

/**
 * Drops every balanced `{...}` run. Handles the nesting in MDX props such as
 * `references={[{ title: "..." }]}` and swallows `{/* comments *\/}` with it.
 *
 * Written as a scanner rather than a regex on purpose: a non-greedy
 * `\{[\s\S]*?\}` stops at the first inner brace and a greedy one runs to the
 * last brace in the file, and both silently reduced whole posts to zero words.
 */
function stripBracedExpressions(source: string): string {
  let out = ""
  let depth = 0

  for (const char of source) {
    if (char === "{") {
      depth += 1
    } else if (char === "}") {
      if (depth > 0) depth -= 1
      // A closing brace becomes a space so `a{x}b` does not read as one word.
      out += " "
    } else if (depth === 0) {
      out += char
    }
  }

  return out
}

/** Drops every `<...>` run. Safe once braced props are already gone. */
function stripTags(source: string): string {
  let out = ""
  let depth = 0

  for (const char of source) {
    if (char === "<") {
      depth += 1
    } else if (char === ">") {
      if (depth > 0) depth -= 1
      out += " "
    } else if (depth === 0) {
      out += char
    }
  }

  return out
}

/**
 * Prose words in an MDX post, excluding everything a reader does not read:
 * imports and exports, JSX tags and their props, MDX expressions and comments,
 * code fences, and Markdown link targets (the visible link text stays).
 */
export function countMdxWords(source: string): number {
  const withoutCode = source.replace(/```[\s\S]*?```/g, " ")
  const withoutExpressions = stripBracedExpressions(withoutCode)
  const withoutTags = stripTags(withoutExpressions)

  const prose = withoutTags
    // Whole-line import / export statements. Their braced and angled parts are
    // already gone, so what remains is a line starting with the keyword.
    .replace(/^\s*(?:import|export)\b.*$/gm, " ")
    // Markdown link targets; keep the visible text.
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    // Emphasis, heading markers, bullets, table pipes.
    .replace(/[*_`#>|]/g, " ")

  return prose.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length
}

/** Whole minutes at WORDS_PER_MINUTE, never less than one. */
export function readingTimeMinutes(words: number): number {
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/** The registry's display format, e.g. "4 min read". */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`
}

/** The leading integer in a registry `readingTime` value, or null if malformed. */
export function parseReadingTime(value: string): number | null {
  const match = /^(\d+) min read$/.exec(value)
  return match ? Number(match[1]) : null
}
