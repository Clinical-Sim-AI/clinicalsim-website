import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  source?: string
  variant?: "accent" | "navy" | "blue" | "light-blue"
  size?: "default" | "large"
}

const variantStyles = {
  accent: "text-cs-electric",
  navy: "text-cs-navy",
  blue: "text-cs-dark-blue",
  "light-blue": "text-cs-light-blue",
}

export function StatHighlight({
  value,
  label,
  source,
  variant = "blue",
  size = "default",
  className,
  ...props
}: StatHighlightProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-6",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "font-bold mb-3 tracking-tight",
          size === "large" ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl lg:text-5xl",
          variantStyles[variant]
        )}
      >
        {value}
      </div>

      <p className="text-base md:text-lg text-cs-dark-blue font-normal leading-relaxed max-w-xs">
        {label}
      </p>

      {source && (
        <p className="text-sm text-cs-dark-gray font-light mt-2 italic">
          {source}
        </p>
      )}
    </div>
  )
}
