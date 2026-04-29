import * as React from "react"
import { LucideIcon } from "lucide-react"
import { BrandIcon, type BrandIconName } from "@/components/brand-icon"
import { cn } from "@/lib/utils"

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  brandIcon?: BrandIconName
  title: string
  description: string
  variant?: "default" | "accent" | "navy" | "light-blue"
  asymmetric?: boolean
  expandOnHover?: boolean
}

const variantStyles = {
  default: {
    iconContainer: "bg-cs-dark-blue",
    iconColor: "text-white",
    brandIconColor: "white" as const,
    border: "border-cs-gray",
  },
  accent: {
    iconContainer: "bg-cs-electric",
    iconColor: "text-cs-dark-blue",
    brandIconColor: "dark" as const,
    border: "border-cs-gray",
  },
  navy: {
    iconContainer: "bg-cs-navy",
    iconColor: "text-white",
    brandIconColor: "white" as const,
    border: "border-cs-gray",
  },
  "light-blue": {
    iconContainer: "bg-cs-light-blue",
    iconColor: "text-cs-dark-blue",
    brandIconColor: "dark" as const,
    border: "border-cs-gray",
  },
}

export function FeatureCard({
  icon: Icon,
  brandIcon,
  title,
  description,
  variant = "default",
  asymmetric = false,
  expandOnHover = false,
  className,
  ...props
}: FeatureCardProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        "relative bg-white rounded-xl p-6 md:p-8",
        "border transition-all duration-300",
        expandOnHover && "hover:shadow-lg",
        asymmetric ? "h-auto" : "h-full",
        styles.border,
        className
      )}
      {...props}
    >
      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110", styles.iconContainer)}>
        {brandIcon ? (
          <BrandIcon name={brandIcon} color={styles.brandIconColor} size={28} />
        ) : Icon ? (
          <Icon className={cn("w-7 h-7", styles.iconColor)} />
        ) : null}
      </div>

      <h3 className="text-xl md:text-2xl font-medium mb-3 text-cs-dark-blue">
        {title}
      </h3>

      <p className="text-base md:text-lg text-cs-dark-blue/80 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
