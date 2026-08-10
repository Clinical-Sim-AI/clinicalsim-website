import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/section-divider"
import { JsonLd } from "@/components/json-ld"
import type { FaqItem } from "@/lib/types"

export const metadata: Metadata = {
  title: "Trust and data handling",
  description:
    "ClinicalSim is intended for training and assessment. Learn how synthetic cases, learner recordings, transcripts, account data, and institutional data are handled.",
  openGraph: {
    title: "Trust and data handling | ClinicalSim.ai",
    description:
      "Synthetic cases, versioned rubrics, learner voice data, and clear product boundaries.",
    url: "https://clinicalsim.ai/trust",
  },
  twitter: {
    title: "Trust and data handling | ClinicalSim.ai",
    description:
      "What ClinicalSim does with learner recordings, transcripts, account data, and institutional data.",
  },
  alternates: {
    canonical: "https://clinicalsim.ai/trust",
  },
}

const LAST_UPDATED = "2026-08-10"

const trustFaqs: FaqItem[] = [
  {
    question: "What is ClinicalSim's intended use?",
    answer:
      "ClinicalSim is intended for clinician training and assessment. It produces no patient-facing output, makes no diagnostic or treatment recommendation, and does not create clinical documentation.",
  },
  {
    question: "Does ClinicalSim use patient records to build cases?",
    answer:
      "No. Every patient in a ClinicalSim case is synthetic and written from clinical literature rather than a patient record. The product still handles learner recordings, transcripts, account data, and institutional data, which require protection.",
  },
  {
    question: "What happens to a learner's voice recording?",
    answer:
      "Learner voice data is consent-gated and learners can request erasure. A recording exists to generate that learner's feedback.",
  },
  {
    question: "Can a program review the scoring materials after the fact?",
    answer:
      "Yes. Published cases, rubrics, and scoring prompts are versioned and locked, so a program can identify the exact materials used for a learner's report.",
  },
  {
    question:
      "Does ClinicalSim price malpractice risk or benchmark our institution against others?",
    answer:
      "No. ClinicalSim does not price malpractice risk or benchmark one institution against another. The platform produces timestamped practice records scored against expert-authored rubrics.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "FAQPage" as const,
  mainEntity: trustFaqs.map((faq) => ({
    "@type": "Question" as const,
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faq.answer,
    },
  })),
}

export default function TrustPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ClinicalSim.ai trust and data handling",
            description:
              "How ClinicalSim handles synthetic cases, learner recordings, transcripts, account data, and institutional data.",
            url: "https://clinicalsim.ai/trust",
            dateModified: LAST_UPDATED,
            publisher: {
              "@type": "Organization",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
            isPartOf: {
              "@type": "WebSite",
              name: "ClinicalSim.ai",
              url: "https://clinicalsim.ai",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://clinicalsim.ai",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Trust and data handling",
                item: "https://clinicalsim.ai/trust",
              },
            ],
          },
          faqJsonLd,
        ]}
      />

      {/* Hero */}
      <section className="relative px-6 pt-4 md:pt-6 pb-4 md:pb-6">
        <div className="absolute inset-0 bg-cs-cloud -z-10" />

        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-cs-dark-gray mb-8">
            <Link href="/" className="hover:text-cs-dark-blue/85 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cs-dark-blue/85">Trust and data handling</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight pb-3 mb-4 text-cs-dark-blue">
            Trust and <span className="font-medium">data handling</span>
          </h1>

          <p className="text-sm text-cs-dark-gray font-light mb-6">
            Last updated: August 2026
          </p>

          <p className="text-base md:text-lg text-cs-dark-blue/70 font-light leading-relaxed mb-4 max-w-3xl">
            ClinicalSim is intended for training and assessment. It does not
            diagnose patients, recommend treatment, or create clinical
            documentation. Every case uses a synthetic patient written from
            clinical literature, not a patient record.
          </p>

          <div className="rounded-xl border-l-4 border-cs-electric bg-cs-dark-blue px-6 py-5 max-w-3xl">
            <p className="text-base md:text-lg text-white font-light leading-relaxed">
              Every case uses a synthetic patient. The product still handles
              learner recordings, transcripts, account data, and institutional
              data, so those records require protection.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="diagonal-down" color="white" />

      {/* 1. Regulatory posture */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            1. Intended use
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            ClinicalSim is intended for clinician training and assessment. The
            platform produces no patient-facing output, makes no diagnostic or
            treatment recommendation, and does not create clinical
            documentation.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            What it produces is a rubric-scored record of how a clinician
            handled a simulated conversation, mapped to a published competency
            framework such as the ACGME Milestones 2.0.
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 2. Synthetic patients */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            2. Every patient is{" "}
            <span className="text-cs-dark-blue font-medium">synthetic</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Every patient in every ClinicalSim case is authored from the
            clinical literature, not adapted from a real chart. Case
            development does not require a patient record or a
            de-identification step.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            A case written from the literature can be versioned and reviewed by
            the physicians responsible for it. How cases get built is documented
            on our{" "}
            <Link
              href="/methodology"
              className="text-cs-dark-blue font-medium hover:text-cs-navy transition-colors"
            >
              methodology page
            </Link>
            .
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 3. Versioned and locked */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            3. Cases, rubrics, and scoring prompts are{" "}
            <span className="text-cs-dark-blue font-medium">versioned and locked</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            Once a case is published, its case text, its rubric, and its scoring
            prompts are versioned and locked. A program can identify the exact
            materials used for a learner&apos;s report and inspect the transcript
            evidence behind the score.
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 4. Learner voice data */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            4. Learner{" "}
            <span className="text-cs-dark-blue font-medium">voice data</span>
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            Learners speak their side of the conversation out loud, which makes
            their voice data sensitive. The platform also handles transcripts,
            account data, and institutional data. Voice collection is
            consent-gated, and learners can request erasure.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            A learner&apos;s recording exists to generate that learner&apos;s
            feedback. Our privacy policy covers visitors to this website;
            learner data inside the product is governed by the institutional
            agreement and by the practices on this page.
          </p>
        </div>
      </section>

      <SectionDivider variant="diagonal-up" color="white" />

      {/* 5. Product boundaries */}
      <section className="px-6 py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-6">
            5. Product boundaries
          </h2>

          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed mb-4">
            ClinicalSim does not price malpractice risk or benchmark one
            institution against another. It extends standardized patient
            programs and does not replace live assessment.
          </p>
          <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
            We also don&apos;t claim our scoring is more accurate or more valid
            than a faculty member&apos;s read. We don&apos;t have the validation
            data to say that, and we won&apos;t claim it until we do.
          </p>
        </div>
      </section>

      <SectionDivider variant="wave" color="white" />

      {/* 6. FAQ */}
      <section className="px-6 py-8 md:py-10 bg-cs-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-cs-navy mb-8">
            6. Questions from{" "}
            <span className="text-cs-dark-blue font-medium">
              privacy and procurement reviewers
            </span>
          </h2>

          <div className="space-y-6">
            {trustFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-cs-gray/50 rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-medium text-cs-dark-blue pr-4">
                      {faq.question}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-cs-gray flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-base text-cs-dark-blue/85 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-cs-dark-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            If your security review needs something this page doesn&apos;t cover, ask us.
          </h2>
          <p className="text-lg font-light mb-8 text-white/90">
            We&apos;ll tell you what exists and what doesn&apos;t. You can also
            read how cases get built on our methodology page, or how we handle
            website data in our privacy policy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="accent" size="xl">
                Talk with us
              </Button>
            </Link>
            <Link href="/methodology">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                Read the methodology
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
