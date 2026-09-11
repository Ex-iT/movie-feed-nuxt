export default function parseEpoch(value: string | number | undefined): Date | null {
  if (value === undefined || value === '') {
    return null
  }
  const ts = typeof value === 'string' ? Number.parseInt(value, 10) : value
  if (!Number.isFinite(ts)) {
    return null
  }
  const date = new Date(ts * 1000)
  return Number.isNaN(date.getTime()) ? null : date
}
