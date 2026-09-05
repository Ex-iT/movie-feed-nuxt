const dateCache = new Map<number, string>()

export default function formatDate(timestamp: number) {
  const cached = dateCache.get(timestamp)
  if (cached) {
    return cached
  }

  const formatted = new Date(timestamp * 1000).toLocaleDateString('nl-NL', {
    weekday: 'long',
    timeZone: 'Europe/Amsterdam',
  })

  dateCache.set(timestamp, formatted)
  return formatted
}
