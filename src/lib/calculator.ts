export function calcMonthsToGoal(
  startWealth: number,
  monthlySaving: number,
  annualRate: number,
  goal: number
): number {
  if (startWealth >= goal) return 0
  if (monthlySaving <= 0 && annualRate <= 0) return 99999

  let wealth = startWealth
  const monthlyRate = annualRate / 100 / 12
  let months = 0

  while (wealth < goal && months < 12000) {
    wealth = wealth * (1 + monthlyRate) + monthlySaving
    months++
  }

  return months >= 12000 ? 99999 : months
}

export function monthsToLabel(months: number): string {
  if (months >= 99999) return 'لن تصل بهذا الوضع'
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (years === 0) return `${remainingMonths} شهر`
  if (remainingMonths === 0) return `${years} سنة`
  return `${years} سنة و${remainingMonths} شهر`
}

export function targetDate(months: number): string {
  if (months >= 99999) return ''
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function formatNumber(n: number): string {
  return Math.round(n).toLocaleString('ar-SA')
}

export function buildChartData(
  startWealth: number,
  monthlySaving: number,
  annualRate: number,
  totalMonths: number
) {
  const monthlyRate = annualRate / 100 / 12
  const capMonths = Math.min(totalMonths + 12, 600)
  const step = Math.max(1, Math.floor(capMonths / 24))

  const labels: string[] = []
  const data: number[] = []

  let wealth = startWealth
  for (let m = 0; m <= capMonths; m += step) {
    labels.push(`${Math.floor(m / 12)}س`)
    data.push(Math.round(wealth))
    for (let i = 0; i < step; i++) {
      wealth = wealth * (1 + monthlyRate) + monthlySaving
    }
  }

  return { labels, data }
}
