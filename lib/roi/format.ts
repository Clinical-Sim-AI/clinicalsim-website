/**
 * Display formatting. Pure, and deliberately separate from the model so the
 * model never has to know how wide a column is.
 */

import type { Range } from "./types"

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const usdPrecise = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "$0"
  return usd.format(Math.round(value))
}

export function formatCurrencyPrecise(value: number): string {
  if (!Number.isFinite(value)) return "$0.00"
  return usdPrecise.format(value)
}

export function formatCurrencyRange(range: Range): string {
  return `${formatCurrency(range.low)} to ${formatCurrency(range.high)}`
}

export function formatHours(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return "0"
  const rounded = value.toFixed(decimals)
  return Number(rounded).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatHoursRange(range: Range, decimals = 0): string {
  return `${formatHours(range.low, decimals)} to ${formatHours(range.high, decimals)}`
}

export function formatPercent(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return "0%"
  return `${(value * 100).toFixed(decimals)}%`
}

export function formatNumber(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return "0"
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Extended years read wrong as "0" and wrong as "0.32258". Two decimals. */
export function formatYears(value: number): string {
  if (!Number.isFinite(value)) return "0"
  return value.toFixed(2)
}
