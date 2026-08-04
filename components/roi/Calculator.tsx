"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { Check, Link2 } from "lucide-react"

import { BandA } from "@/components/roi/BandA"
import { BandCPanel } from "@/components/roi/BandCPanel"
import { BreakEven } from "@/components/roi/BreakEven"
import { ExtendedYear } from "@/components/roi/ExtendedYear"
import { FundingNote } from "@/components/roi/FundingNote"
import { Headline } from "@/components/roi/Headline"
import { MethodologyDrawer } from "@/components/roi/MethodologyDrawer"
import { QuickInputs } from "@/components/roi/QuickInputs"
import { RefinePanel } from "@/components/roi/RefinePanel"
import { SPECIALTIES } from "@/lib/roi/constants"
import {
  DEFAULT_TRAINEES,
  PRIVACY_LINE,
  defaultFundingSource,
  defaultInputs,
  listPrice,
} from "@/lib/roi/defaults"
import { calculate } from "@/lib/roi/model"
import { decodeInputs, encodeInputs } from "@/lib/roi/urlState"
import type { Inputs, Lens, SpecialtyId } from "@/lib/roi/types"

// The query string is external state, so it is read through
// useSyncExternalStore rather than an effect. The server snapshot is empty
// because there is no location to ask about during prerender, which keeps this
// route statically rendered: a Suspense-wrapped useSearchParams would push the
// whole panel, Band C copy included, out of the prerendered HTML.
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange)
  return () => window.removeEventListener("popstate", onChange)
}

const getSearchSnapshot = () => window.location.search
const getSearchServerSnapshot = () => ""

export function Calculator() {
  const search = useSyncExternalStore(
    subscribeToUrl,
    getSearchSnapshot,
    getSearchServerSnapshot
  )
  const [inputs, setInputs] = useState<Inputs>(() => defaultInputs("pd"))
  const [copied, setCopied] = useState(false)

  // Apply a share link during render as derived state, not in an effect. A
  // pre-filled link from a program director is the whole point of the share
  // mechanic, so this has to land on the first paint the reader sees.
  const [appliedSearch, setAppliedSearch] = useState<string | null>(null)
  if (appliedSearch !== search) {
    setAppliedSearch(search)
    if (search) setInputs(decodeInputs(search))
  }

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const result = useMemo(() => calculate(inputs), [inputs])

  const patch = (changes: Partial<Inputs>) =>
    setInputs((current) => ({ ...current, ...changes }))

  /**
   * Switching lens re-prefills the size and the price, because a 50-resident
   * program and a 400-resident institution are not the same question. Anything
   * the user has already refined stays put.
   */
  const changeLens = (lens: Lens) => {
    setInputs((current) => {
      if (current.lens === lens) return current
      const trainees = DEFAULT_TRAINEES[lens]
      return {
        ...current,
        lens,
        trainees,
        contractPrice: listPrice(trainees),
        fundingSource:
          lens === "dio" ? defaultFundingSource(current.specialty) : null,
      }
    })
  }

  const changeSpecialty = (specialty: SpecialtyId) => {
    setInputs((current) => ({
      ...current,
      specialty,
      // The hourly value is specialty-derived, so an override from the previous
      // specialty would silently survive and misprice the new one.
      facultyHourlyOverride: null,
      fundingSource:
        current.lens === "dio" ? defaultFundingSource(specialty) : null,
    }))
  }

  const changeTrainees = (raw: number) => {
    const trainees = Math.max(0, Math.min(5000, Math.round(raw || 0)))
    setInputs((current) => ({
      ...current,
      trainees,
      // Keep the price on list unless the user has typed their own quote.
      contractPrice:
        current.contractPrice === listPrice(current.trainees)
          ? listPrice(trainees)
          : current.contractPrice,
    }))
  }

  const copyLink = async () => {
    if (typeof window === "undefined") return
    const url = `${window.location.origin}${window.location.pathname}?${encodeInputs(inputs)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // Clipboard permission denied, or an insecure context. Put the link in
      // the address bar instead so it can still be copied by hand.
      window.history.replaceState(null, "", url)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm font-light leading-relaxed text-cs-dark-gray">
        {PRIVACY_LINE}
      </p>

      <QuickInputs
        inputs={inputs}
        onChange={patch}
        onLensChange={changeLens}
        onSpecialtyChange={changeSpecialty}
        onTraineesChange={changeTrainees}
      />

      <RefinePanel inputs={inputs} onChange={patch} />

      <div
        id="roi-results"
        role="tabpanel"
        aria-labelledby={`roi-lens-${inputs.lens}`}
        className="space-y-6"
      >
        <BreakEven result={result} onSwitchToDio={() => changeLens("dio")} />
        <Headline result={result} />
        <BandA result={result} />
        <ExtendedYear result={result} />
        <FundingNote result={result} />
        <BandCPanel
          panel={result.bandC}
          specialtyProse={
            SPECIALTIES.find((s) => s.id === inputs.specialty)?.prose ??
            "your specialty"
          }
        />
        <MethodologyDrawer result={result} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-cs-dark-blue px-5 py-2.5 text-sm font-medium text-cs-dark-blue transition-colors hover:bg-cs-dark-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-dark-blue focus-visible:ring-offset-2"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? "Link copied" : "Copy link to these numbers"}
        </button>
        <p className="text-sm font-light text-cs-dark-gray">
          The link carries your inputs in plain text, so whoever you send it to
          can read what is in it before they click.
        </p>
      </div>
    </div>
  )
}
