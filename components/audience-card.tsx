import * as React from "react"
import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { BrandIcon, type BrandIconName } from "@/components/brand-icon"
import { cn } from "@/lib/utils"

export interface AudienceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  brandIcon?: BrandIconName
  title: string
  subtitle: string
  bullets: string[]
  href: string
  variant?: "accent" | "navy" | "blue" | "light-blue"
}

const variantStyles = {
  accent: {
    iconBg: "bg-cs-electric",
    iconColor: "text-cs-dark-blue",
    brandIconColor: "dark" as const,
    bulletColor: "bg-cs-electric",
  },
  navy: {
    iconBg: "bg-cs-navy",
    iconColor: "text-white",
    brandIconColor: "white" as const,
    bulletColor: "bg-cs-navy",
  },
  blue: {
    iconBg: "bg-cs-dark-blue",
    iconColor: "text-white",
    brandIconColor: "white" as const,
    bulletColor: "bg-cs-dark-blue",
  },
  "light-blue": {
    iconBg: "bg-cs-light-blue",
    iconColor: "text-cs-dark-blue",
    brandIconColor: "dark" as const,
    bulletColor: "bg-cs-light-blue",
  },
}

export function AudienceCard({
  icon: Icon,
  brandIcon,
  title,
  subtitle,
  bullets,
  href,
  variant = "accent",
  className,
  ...props
}: AudienceCardProps) {
  const styles = variantStyles[variant]

  return (
    <Link href={href} className="group block">
      <div
        className={cn(
          "relative bg-white rounded-xl p-6 md:p-8",
          "border border-cs-gray transition-all duration-300 h-full",
          "hover:shadow-lg",
          className
        )}
        {...props}
      >
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", styles.iconBg)}>
          {brandIcon ? (
            <BrandIcon name={brandIcon} color={styles.brandIconColor} size={28} />
          ) : Icon ? (
            <Icon className={cn("w-7 h-7", styles.iconColor)} />
          ) : null}
        </div>

        <h3 className="text-xl md:text-2xl font-medium mb-2 text-cs-dark-blue group-hover:text-cs-navy transition-colors">
          {title}
        </h3>

        <p className="text-base text-cs-dark-gray font-light mb-4">
          {subtitle}
        </p>

        <ul className="space-y-2.5 mb-6">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <div className={cn("w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0", styles.bulletColor)} />
              <span className="text-sm text-cs-dark-blue/80 font-light leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center text-cs-dark-blue font-medium">
          Learn More
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
