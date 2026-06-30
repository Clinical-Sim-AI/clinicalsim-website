/**
 * The 1–5 milestone placement rail, shared between the full-width hero and the
 * compact thread card. Segments fill up to the placed level (navy), the placed
 * level is highlighted (electric); the hero variant adds a position marker and
 * per-level tick labels drawn from the verbatim anchors.
 */
import type { MilestoneAnchor } from "@/components/feedback/build-report";

type Props = {
  level: number;
  anchors: MilestoneAnchor[];
  variant?: "hero" | "compact";
};

export function MilestoneTrack({ level, anchors, variant = "hero" }: Props) {
  const ordered = [...anchors].sort((a, b) => a.value - b.value);
  // Exact match for integer levels; fall back to the nearest anchor so a
  // fractional level (e.g. 3.5) still highlights/fills a segment instead of
  // rendering a blank track.
  const placedIndex = (() => {
    const exact = ordered.findIndex((a) => a.value === level);
    if (exact !== -1) return exact;
    let nearest = -1;
    let best = Infinity;
    ordered.forEach((a, i) => {
      const d = Math.abs(a.value - level);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    return nearest;
  })();
  const n = ordered.length;
  const markerLeft = n > 0 ? ((placedIndex + 0.5) / n) * 100 : 0;

  const segClass = (i: number) => {
    if (i === placedIndex) return "bg-cs-electric";
    if (placedIndex >= 0 && i < placedIndex) return "bg-cs-navy";
    return "bg-cs-cloud-deep";
  };

  if (variant === "compact") {
    return (
      <div className="flex gap-1" role="img" aria-label={`Level ${level} of ${n}`}>
        {ordered.map((a, i) => (
          <i key={a.value} className={`h-[7px] flex-1 rounded-[4px] ${segClass(i)}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative" role="img" aria-label={`Level ${level} of ${n}`}>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {ordered.map((a, i) => (
          <i key={a.value} className={`h-3 rounded-md ${segClass(i)}`} />
        ))}
      </div>
      {placedIndex >= 0 && (
        <div
          className="absolute -top-[9px] h-0 w-0 -translate-x-1/2 border-l-[8px] border-r-[8px] border-t-[11px] border-l-transparent border-r-transparent border-t-cs-dark-blue"
          style={{ left: `${markerLeft}%` }}
          aria-hidden="true"
        />
      )}
      <div
        className="mt-2.5 grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {ordered.map((a, i) => {
          const tone =
            i === placedIndex
              ? "text-cs-dark-blue"
              : i < placedIndex
                ? "text-cs-navy"
                : "text-cs-dark-gray";
          return (
            <div key={a.value} className="text-center">
              <div className={`text-[11px] font-bold ${tone}`}>{a.value}</div>
              <div
                className={`mt-0.5 line-clamp-2 text-[10px] font-medium leading-tight ${tone}`}
              >
                {a.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
