/**
 * Layout-only paragraph chunking for verbatim product text.
 *
 * The example pages render generated feedback, briefing text, and transcripts
 * that must stay word-for-word. Long single paragraphs read badly and trip
 * readability audits, so these helpers only insert paragraph breaks at sentence
 * boundaries. They never add, drop, or reorder a character of the source text
 * (apart from the whitespace at the break itself).
 *
 * The sentence detector is deliberately conservative. It only breaks after
 * ". ", "? ", or "! " when the next character is an uppercase letter, and it
 * never breaks inside straight or curly double quotes, parentheses, square
 * brackets, inline code, or markdown emphasis, after an ellipsis, or after a
 * common or dotted abbreviation ("U.S.", "M.D.", "a.m."). A missed break
 * leaves a paragraph long; a wrong break would split a quote, so misses win.
 */

const ABBREVIATIONS = new Set([
  "e.g",
  "i.e",
  "vs",
  "etc",
  "dr",
  "mr",
  "mrs",
  "ms",
  "st",
  "no",
  "al",
  "approx",
  "fig",
  "prof",
  "jr",
  "sr",
  "inc",
  "mt",
  "pt",
])

/** Strip leading quote or bracket characters so "'Dr" still reads as "dr". */
const LEADING_PUNCT = /^[\s"'\u2018\u201c(\[]+/

/** Split one prose paragraph into sentences, preserving the original text. */
export function splitSentences(text: string): string[] {
  const sentences: string[] = []
  let start = 0
  let inQuote = false
  let inCode = false
  let parenDepth = 0
  let bracketDepth = 0
  let emphasis = 0

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === "`") inCode = !inCode
    else if (inCode) continue
    else if (ch === '"') inQuote = !inQuote
    else if (ch === "\u201c") inQuote = true
    else if (ch === "\u201d") inQuote = false
    else if (ch === "(") parenDepth++
    else if (ch === ")") parenDepth = Math.max(0, parenDepth - 1)
    else if (ch === "[") bracketDepth++
    else if (ch === "]") bracketDepth = Math.max(0, bracketDepth - 1)
    else if (ch === "*" || ch === "_") {
      // Count runs of emphasis markers as one toggle ("**" opens bold once).
      let run = 1
      while (text[i + run] === ch) run++
      emphasis = emphasis === 0 ? 1 : 0
      i += run - 1
      continue
    }

    if (ch !== "." && ch !== "?" && ch !== "!") continue
    if (inQuote || parenDepth > 0 || bracketDepth > 0 || emphasis > 0) continue
    if (text[i + 1] !== " ") continue
    const next = text[i + 2]
    if (!next || !/[A-Z]/.test(next)) continue
    if (ch === "." && text[i - 1] === ".") continue // ellipsis
    if (ch === ".") {
      const word = (text.slice(start, i).split(/\s+/).pop() ?? "")
        .toLowerCase()
        .replace(LEADING_PUNCT, "")
      if (ABBREVIATIONS.has(word) || /^([a-z]\.)*[a-z]$/.test(word)) continue
    }

    sentences.push(text.slice(start, i + 1))
    start = i + 2
  }

  const tail = text.slice(start)
  if (tail.trim()) sentences.push(tail)
  return sentences
}

/**
 * Group a prose paragraph into chunks of at most `maxSentences` sentences.
 * Returns the original text in a single-element array when no split is needed.
 */
export function chunkParagraph(text: string, maxSentences = 3): string[] {
  const sentences = splitSentences(text)
  if (sentences.length <= maxSentences) return [text]
  const chunks: string[] = []
  for (let i = 0; i < sentences.length; i += maxSentences) {
    chunks.push(sentences.slice(i, i + maxSentences).join(" "))
  }
  return chunks
}

const LIST_ITEM = /^(\s*)([-*+]|\d+\.)(\s+)(.*)$/

/**
 * Insert markdown paragraph breaks into long prose paragraphs and long list
 * items. Headings, tables, blockquotes, code fences, and multi-line blocks are
 * left untouched. A long list item becomes a loose item whose extra paragraphs
 * are indented under the marker, so it still renders as one bullet.
 */
export function chunkMarkdownParagraphs(markdown: string, maxSentences = 3): string {
  // Leave any document with fenced or indented code untouched.
  if (/```|~~~|^( {4}|\t)\S/m.test(markdown)) return markdown

  return markdown
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split("\n")
      const out: string[] = []
      for (const line of lines) {
        const item = LIST_ITEM.exec(line)
        if (item) {
          const [, indent, marker, gap, body] = item
          const chunks = chunkParagraph(body, maxSentences)
          if (chunks.length === 1) {
            out.push(line)
            continue
          }
          const pad = " ".repeat(indent.length + marker.length + gap.length)
          out.push(
            `${indent}${marker}${gap}${chunks[0]}`,
            ...chunks.slice(1).flatMap((c) => ["", `${pad}${c}`]),
          )
          continue
        }
        if (lines.length === 1 && !/^\s*(#|\||>|<)/.test(line)) {
          out.push(chunkParagraph(line, maxSentences).join("\n\n"))
          continue
        }
        out.push(line)
      }
      return out.join("\n")
    })
    .join("\n\n")
}
