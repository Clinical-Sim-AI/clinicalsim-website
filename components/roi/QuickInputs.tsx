"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SPECIALTIES } from "@/lib/roi/constants"
import { LIST_PRICE_LABEL, listPrice } from "@/lib/roi/defaults"
import { formatCurrency, formatNumber } from "@/lib/roi/format"
import type { Inputs, Lens, SpecialtyId } from "@/lib/roi/types"

type QuickInputsProps = {
  inputs: Inputs
  onChange: (patch: Partial<Inputs>) => void
  onLensChange: (lens: Lens) => void
  onSpecialtyChange: (specialty: SpecialtyId) => void
  onTraineesChange: (trainees: number) => void
}

const selectClass =
  "h-10 w-full rounded-md border border-cs-gray bg-white px-3 text-sm font-light text-cs-dark-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-dark-blue focus-visible:ring-offset-2"

/**
 * Four fields, all prefilled, above the fold. Nobody fills fifteen fields on a
 * cold landing page, so everything else lives behind "Refine these numbers".
 */
export function QuickInputs({
  inputs,
  onChange,
  onLensChange,
  onSpecialtyChange,
  onTraineesChange,
}: QuickInputsProps) {
  const isDio = inputs.lens === "dio"

  return (
    <div className="rounded-xl border border-cs-gray/60 bg-white p-5 md:p-6">
      {/* Lens toggle. A real tablist, so a screen reader announces which view
          is showing rather than reading two unlabeled buttons. */}
      <div
        role="tablist"
        aria-label="Choose your view"
        className="mb-6 flex gap-1 rounded-xl bg-cs-cloud p-1"
      >
        {(
          [
            { id: "pd" as Lens, label: "I run a program" },
            { id: "dio" as Lens, label: "I oversee GME across programs" },
          ] satisfies { id: Lens; label: string }[]
        ).map((option) => {
          const selected = inputs.lens === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              id={`roi-lens-${option.id}`}
              aria-selected={selected}
              aria-controls="roi-results"
              onClick={() => onLensChange(option.id)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-dark-blue ${
                selected
                  ? "bg-cs-dark-blue font-medium text-white"
                  : "font-light text-cs-dark-blue/70 hover:text-cs-dark-blue"
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="roi-specialty" className="font-light">
            Specialty
          </Label>
          <select
            id="roi-specialty"
            className={`mt-1.5 ${selectClass}`}
            value={inputs.specialty}
            onChange={(event) =>
              onSpecialtyChange(event.target.value as SpecialtyId)
            }
          >
            {SPECIALTIES.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="roi-trainees" className="font-light">
            Residents and fellows
          </Label>
          <Input
            id="roi-trainees"
            type="number"
            inputMode="numeric"
            min={0}
            max={5000}
            step={1}
            className="mt-1.5 font-light"
            value={inputs.trainees}
            onChange={(event) => onTraineesChange(Number(event.target.value))}
          />
        </div>

        {isDio && (
          <div>
            <Label htmlFor="roi-programs" className="font-light">
              ACGME-accredited programs
            </Label>
            <Input
              id="roi-programs"
              type="number"
              inputMode="numeric"
              min={1}
              max={500}
              step={1}
              className="mt-1.5 font-light"
              value={inputs.programs}
              onChange={(event) =>
                onChange({ programs: Math.max(1, Number(event.target.value)) })
              }
            />
          </div>
        )}

        <div>
          <Label htmlFor="roi-price" className="font-light">
            Annual contract
          </Label>
          <Input
            id="roi-price"
            type="number"
            inputMode="numeric"
            min={0}
            step={500}
            className="mt-1.5 font-light"
            value={inputs.contractPrice}
            onChange={(event) =>
              onChange({ contractPrice: Math.max(0, Number(event.target.value)) })
            }
          />
          <p className="mt-1.5 text-xs font-light text-cs-dark-gray">
            List is {LIST_PRICE_LABEL}, so {formatCurrency(listPrice(inputs.trainees))}{" "}
            at {formatNumber(inputs.trainees)} learners. Enter the figure you
            were quoted.
          </p>
        </div>
      </div>
    </div>
  )
}
