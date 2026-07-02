import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "diagonal-down" | "diagonal-up" | "wave" | "curve"
  color?: "cloud" | "white" | "dark-blue" | "navy"
  flip?: boolean
  /** Divider height in px. Defaults to 40. Use a smaller value to tighten transitions. */
  height?: number
}

const colorMap = {
  cloud: "#e8e7e6",
  white: "#FFFFFF",
  "dark-blue": "#061729",
  navy: "#163b61",
}

export function SectionDivider({
  variant = "diagonal-down",
  color = "white",
  flip = false,
  height = 40,
  className,
  ...props
}: SectionDividerProps) {
  const fillColor = colorMap[color]

  const renderPath = () => {
    switch (variant) {
      case "diagonal-down":
        return flip
          ? "M0,100 L100,0 L100,100 Z"
          : "M0,0 L100,100 L0,100 Z"
      case "diagonal-up":
        return flip
          ? "M0,0 L100,100 L0,100 Z"
          : "M0,100 L100,0 L100,100 Z"
      case "wave":
        return flip
          ? "M0,50 Q25,0 50,50 T100,50 L100,100 L0,100 Z"
          : "M0,50 Q25,100 50,50 T100,50 L100,0 L0,0 Z"
      case "curve":
        return flip
          ? "M0,100 Q50,0 100,100 L100,100 L0,100 Z"
          : "M0,0 Q50,100 100,0 L100,0 L0,0 Z"
      default:
        return "M0,0 L100,100 L0,100 Z"
    }
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height: `${height}px` }}
      {...props}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={renderPath()}
          fill={fillColor}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
