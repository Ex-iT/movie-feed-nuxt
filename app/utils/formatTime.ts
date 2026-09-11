const timeCache = new Map<number, string>()

export default function formatTime(value: Date | number) {
  const date = value instanceof Date ? value : new Date(value * 1000)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const key = date.getTime()
  const cached = timeCache.get(key)
  if (cached) {
    return cached
  }

  const formatted = date.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Amsterdam',
  })

  timeCache.set(key, formatted)
  return formatted
}
