import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CATEGORY_LINE, POSITIONING_ONE_LINER } from "@/lib/positioning"
import { FOOTER_GROUPS, HEADER_ACTION } from "@/lib/site-navigation"

export function SiteFooter() {
  return (
    <footer className="border-t border-cs-gray/60 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-4 lg:max-w-xs">
            <Link href="/" className="flex items-center" aria-label="ClinicalSim home">
              <Image
                src="/brand/ClinicalSim_Logo_Lockup_Transparent.svg?v=3"
                alt="ClinicalSim"
                width={4410}
                height={680}
                className="h-8 w-auto"
                unoptimized
              />
            </Link>
            <p className="text-sm font-light leading-relaxed text-cs-dark-blue/70">
              {`${CATEGORY_LINE} ${POSITIONING_ONE_LINER}`}
            </p>
            <Button asChild>
              <Link href={HEADER_ACTION.href}>{HEADER_ACTION.label}</Link>
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 className="mb-4 text-sm font-medium text-cs-dark-blue">{group.label}</h3>
                <nav aria-label={group.label} className="flex flex-col items-start gap-3">
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm font-light text-cs-dark-blue/70 transition-colors hover:text-cs-dark-blue hover:underline">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-cs-gray/50 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm font-light text-cs-dark-blue/70">
            &copy; {new Date().getFullYear()} ClinicalSim. All rights reserved.
          </p>
          <Link href="/privacy" className="text-sm font-light text-cs-dark-blue/70 transition-colors hover:text-cs-dark-blue hover:underline">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
