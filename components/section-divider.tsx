import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "diagonal-down" | "diagonal-up" | "wave" | "curve"
  color?: "cloud" | "white" | "blue" | "indigo" | "slate"
  flip?: boolean
}

const colorMap = {
  cloud: "#e8e7e6",
  white: "#FFFFFF",
  // Aliases mapped to brand neutrals (legacy keys preserved for callers)
  blue: "#e8e7e6",
  indigo: "#e8e7e6",
  slate: "#FFFFFF",
}

export function SectionDivider({
  variant = "diagonal-down",
  color = "white",
  flip = false,
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
      style={{ height: "60px" }}
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
