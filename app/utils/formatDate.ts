const dateCache = new Map<number, string>()
const MAX_CACHE_SIZE = 512

export default function formatDate(value: Date | number) {
  const date = value instanceof Date ? value : new Date(value * 1000)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const key = date.getTime()
  const cached = dateCache.get(key)
  if (cached) {
    return cached
  }

  const formatted = date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Amsterdam',
  })

  if (dateCache.size >= MAX_CACHE_SIZE) {
    dateCache.clear()
  }
  dateCache.set(key, formatted)
  return formatted
}
