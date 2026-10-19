// Scroll an element into view by id, honoring prefers-reduced-motion. Port of
// app/src/lib/scroll-to-id.ts.
export function scrollToId(id: string) {
  const el =
    typeof document !== "undefined" ? document.getElementById(id) : null;
  if (!el) return;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
