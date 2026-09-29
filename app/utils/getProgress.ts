const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
})

export default function getProgress(now: number, start: number, end: number) {
  const progress = Number.parseFloat(
    numberFormatter.format(((now - start) / (end - start)) * 100),
  )
  if (!Number.isFinite(progress) || progress < 0 || progress >= 100) {
    return 0
  }
  return progress
}
