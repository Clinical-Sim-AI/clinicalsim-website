/**
 * Strip non-spoken transcript markup. Port of `stripTranscriptMarkup` from
 * app/src/lib/transcript/markup.ts.
 *
 * Transcripts arrive with two kinds of non-spoken markup: ElevenLabs v3
 * audio/emotion control tags in square brackets ("[slow] Yeah.") and
 * character/speaker wrapper tags in angle brackets ("<Tyler>…</Tyler>"). Both
 * vocabularies are open-ended, so we strip any "[...]" or "<...>" segment rather
 * than match an allowlist. Ellipses and capitalization are real speech and are
 * preserved.
 */
export function stripTranscriptMarkup(message: unknown): string {
  if (typeof message !== "string") return "";
  return message
    .replace(/\[[^\]]*\]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
