export default function parseEpoch(value: string | undefined): Date | null {
  if (!value) {
    return null
  }
  const ts = Number.parseInt(value, 10)
  if (!Number.isFinite(ts)) {
    return null
  }
  const date = new Date(ts * 1000)
  return Number.isNaN(date.getTime()) ? null : date
}
