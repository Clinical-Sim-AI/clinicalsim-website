import * as React from "react"
import { cn } from "@/lib/utils"
import { CountUp } from "@/components/count-up"

export interface StatHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  source?: string
  variant?: "accent" | "navy" | "blue" | "light-blue"
  size?: "default" | "large"
  /**
   * Opt in for a dark band. The default label and source colors are dark on
   * light, and two of the four numeral variants are dark blue or navy, so a
   * stat dropped onto cs-dark-blue would be half invisible without this.
   */
  surface?: "light" | "dark"
}

const variantStyles = {
  accent: "text-cs-electric",
  navy: "text-cs-navy",
  blue: "text-cs-dark-blue",
  "light-blue": "text-cs-light-blue",
}

const darkVariantStyles = {
  accent: "text-cs-electric",
  navy: "text-cs-light-blue",
  blue: "text-white",
  "light-blue": "text-cs-light-blue",
}

export function StatHighlight({
  value,
  label,
  source,
  variant = "blue",
  size = "default",
  surface = "light",
  className,
  ...props
}: StatHighlightProps) {
  const onDark = surface === "dark"

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
          onDark ? darkVariantStyles[variant] : variantStyles[variant]
        )}
      >
        <CountUp value={value} />
      </div>

      <p
        className={cn(
          "text-base md:text-lg font-normal leading-relaxed max-w-xs",
          onDark ? "text-cs-cloud" : "text-cs-dark-blue"
        )}
      >
        {label}
      </p>

      {source && (
        <p
          className={cn(
            "text-sm font-light mt-2 italic",
            onDark ? "text-cs-cloud/70" : "text-cs-dark-gray"
          )}
        >
          {source}
        </p>
      )}
    </div>
  )
}
