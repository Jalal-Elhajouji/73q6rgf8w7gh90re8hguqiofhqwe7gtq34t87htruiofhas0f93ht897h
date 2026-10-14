/** Formats minor units as `$1,234.56`, wrapping negatives in parentheses. */
export function formatAmount(minorUnits: number): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(minorUnits) / 100)
  return minorUnits < 0 ? `(${formatted})` : formatted
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00`))
}
