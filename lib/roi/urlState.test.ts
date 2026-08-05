import { describe, expect, it } from "vitest"
import { decodeInputs, encodeInputs } from "@/lib/roi/urlState"
import { defaultInputs } from "@/lib/roi/defaults"
import { calculate } from "@/lib/roi/model"

describe("share link", () => {
  it("round-trips a refined input set exactly", () => {
    const original = decodeInputs(
      "?lens=pd&spec=pediatrics_general&n=12&price=7200&expected=0&cases=0&hrs=8&depth=0.5&comm=0.6&hpc=45&disp=0.55&fringe=0.28"
    )
    const query = encodeInputs(original)
    expect(decodeInputs(`?${query}`)).toEqual(original)
    expect(calculate(decodeInputs(`?${query}`))).toEqual(calculate(original))
    // Readable, not a blob.
    expect(query).toContain("lens=pd")
    expect(query).toContain("n=12")
    expect(query).not.toMatch(/^[A-Za-z0-9+/=]{60,}$/)
  })

  it("round-trips the DIO default and the untouched PD default", () => {
    for (const inputs of [defaultInputs("pd"), defaultInputs("dio", "internal_medicine_general", 400)]) {
      expect(decodeInputs(`?${encodeInputs(inputs)}`)).toEqual(inputs)
    }
    // An untouched PD default carries only the four quick fields.
    expect(encodeInputs(defaultInputs("pd"))).toBe(
      "lens=pd&spec=pediatrics_general&n=50&price=30000"
    )
  })
})
