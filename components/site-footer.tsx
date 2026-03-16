import Link from "next/link"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-light text-slate-800">
                ClinicalSim<span className="text-blue-600">.ai</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Clinical simulation purpose-built for communication remediation in medical education — medical school, residency, and fellowship. Built by simulation directors and communication researchers.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Navigate</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/solutions/remediation" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">
                Communication Remediation
              </Link>
              <Link href="/audiences" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">
                Who We Serve
              </Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">
                About
              </Link>
              <Link href="/insights" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">
                Insights
              </Link>
              <Link href="/research" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">
                Research
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Get Started</h3>
            <p className="text-sm text-gray-600 font-light">
              Piloting with medical schools, residency programs, and fellowships nationwide.
            </p>
            <Link href="/contact">
              <Button variant="warm-filled" size="lg">
                Request a Pilot
              </Button>
            </Link>
            <p className="text-sm text-gray-500 font-light mt-2">
              Or{" "}
              <Link href="https://form.typeform.com/to/Zve4CKk2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-warm transition-colors">
                join the waitlist
              </Link>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500 font-light">
            &copy; {new Date().getFullYear()} ClinicalSim.ai. All rights reserved.
          </p>
          <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 font-light transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
