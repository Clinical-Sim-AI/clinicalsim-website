import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center" aria-label="ClinicalSim home">
              <Image
                src="/brand/ClinicialSim_Logo_Lockup_DarkBlue.png"
                alt="ClinicalSim"
                width={783}
                height={294}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-cs-dark-blue/70 font-light leading-relaxed">
              Clinical simulation purpose-built for communication remediation in medical education — medical school, residency, and fellowship. Built by simulation directors and communication researchers.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-cs-dark-blue uppercase tracking-wider">Navigate</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/solutions/remediation" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Communication Remediation
              </Link>
              <Link href="/audiences" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Who We Serve
              </Link>
              <Link href="/about" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                About
              </Link>
              <Link href="/insights" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Insights
              </Link>
              <Link href="/research" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Research
              </Link>
              <Link href="/pricing" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="text-sm text-cs-dark-blue/70 hover:text-cs-dark-blue font-light transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-cs-dark-blue uppercase tracking-wider">Get Started</h3>
            <p className="text-sm text-cs-dark-blue/70 font-light">
              Piloting with medical schools, residency programs, and fellowships nationwide.
            </p>
            <Link href="/contact">
              <Button variant="accent" size="lg">
                Request a Pilot
              </Button>
            </Link>
            <p className="text-sm text-cs-dark-gray font-light mt-2">
              Or{" "}
              <Link href="https://form.typeform.com/to/Zve4CKk2" target="_blank" rel="noopener noreferrer" className="text-cs-dark-blue hover:text-cs-navy transition-colors underline-offset-2 hover:underline">
                join the waitlist
              </Link>
            </p>
          </div>
        </div>

        <div className="border-t border-cs-gray/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-cs-dark-gray font-light">
            &copy; {new Date().getFullYear()} ClinicalSim.ai. All rights reserved.
          </p>
          <Link href="/privacy" className="text-sm text-cs-dark-gray hover:text-cs-dark-blue font-light transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
