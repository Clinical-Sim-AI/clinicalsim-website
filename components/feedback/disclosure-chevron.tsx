import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The one disclosure affordance for the feedback report's collapsibles. Port of
 * app/src/components/ui/disclosure-chevron.tsx: sits on the leading edge of its
 * trigger, points right when collapsed and rotates down when open. Omit `open`
 * for a native `<details className="group">`, where CSS drives the rotation.
 */
export function DisclosureChevron({
  open,
  reserveSpace,
  className,
}: {
  open?: boolean;
  /** Render invisibly but keep the box, so mixed rows share one left edge. */
  reserveSpace?: boolean;
  className?: string;
}) {
  return (
    <ChevronRight
      aria-hidden="true"
      className={cn(
        "h-4 w-4 flex-none transition-transform",
        open === undefined ? "group-open:rotate-90" : open && "rotate-90",
        reserveSpace && "invisible",
        className,
      )}
    />
  );
}
