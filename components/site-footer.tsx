import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CATEGORY_LINE, POSITIONING_ONE_LINER } from "@/lib/positioning"

export function SiteFooter() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-cs-gray/60 py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center" aria-label="ClinicalSim home">
              <Image
                src="/brand/ClinicalSim_Logo_Lockup_DarkBlue.svg"
                alt="ClinicalSim"
                width={612}
                height={367}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-cs-dark-blue/70 font-light leading-relaxed">
              {`${CATEGORY_LINE} ${POSITIONING_ONE_LINER}`}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-cs-dark-blue uppercase tracking-wider">Explore</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/solutions/patient-experience" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Patient experience
              </Link>
              <Link href="/solutions/debriefing" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Debriefing
              </Link>
              <Link href="/solutions" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                All use cases
              </Link>
              <Link href="/audiences" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Who we serve
              </Link>
              <Link href="/about" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                About
              </Link>
              <Link href="/insights" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Insights
              </Link>
              <Link href="/examples" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Examples
              </Link>
              <Link href="/research" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Research
              </Link>
              <Link href="/compare" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Compare
              </Link>
              <Link href="/glossary" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Glossary
              </Link>
              <Link href="/frameworks" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Frameworks
              </Link>
              <Link href="/methodology" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Methodology
              </Link>
              <Link href="/evaluation" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Evaluating ClinicalSim
              </Link>
              <Link href="/trust" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Trust &amp; Compliance
              </Link>
              <Link href="/faq" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                FAQ
              </Link>
              <Link href="/medical-educator-faq" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                FAQ for Medical Educators
              </Link>
              <Link href="/contact" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Contact
              </Link>
              <Link href="/help" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Help center
              </Link>
              <Link href="/help/release-notes" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Release notes
              </Link>
            </nav>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-cs-dark-blue uppercase tracking-wider">Get started</h3>
            <p className="text-sm text-cs-dark-blue/70 font-light">
              Start with one team, one standard, and one reporting question.
            </p>
            <Link href="/contact" className="inline-block pt-2">
              <Button size="lg">
                Talk with us
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t border-cs-gray/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-cs-dark-gray font-light">
            &copy; {new Date().getFullYear()} ClinicalSim. All rights reserved.
          </p>
          <Link href="/privacy" className="text-sm text-cs-dark-gray hover:text-cs-dark-blue font-light transition-colors">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
