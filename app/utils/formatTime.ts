const timeCache = new Map<number, string>()

export default function formatTime(timestamp: number) {
  const cached = timeCache.get(timestamp)
  if (cached) {
    return cached
  }

  const formatted = new Date(timestamp * 1000).toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Amsterdam',
  })

  timeCache.set(timestamp, formatted)
  return formatted
}
