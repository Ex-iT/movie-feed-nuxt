import { Days } from '~~/shared/types/Common'
import { HALF_HOUR_SEC, SITE_URL } from '~/config'
import getMovies from '~/utils/api/getMovies'
import formatDate from '~/utils/formatDate'
import formatRssDate from '~/utils/formatRssDate'
import getEpoch from '~/utils/getEpoch'
import ucFirst from '~/utils/ucFirst'

export default defineCachedEventHandler(async () => {
  let movies: Awaited<ReturnType<typeof getMovies>>

  try {
    movies = await getMovies(Days.today)
  }
  catch {
    movies = []
  }

  const items = movies
    .map((m) => {
      const link = m.deep_link
      const date = formatDate(Number.parseInt(m.ps, 10))
      const schedule = date
        ? `${ucFirst(date)}, ${m.start} - ${m.end}`
        : `${m.start} - ${m.end}`
      const description = m.descr
        ? `${m.channel_label} · ${schedule}\n\n${m.subgenre} - ${m.descr}`
        : `${m.channel_label} · ${schedule}`

      return `    <item>
      <title>${escapeXml(m.title)}</title>
      <link>${link}</link>
      <description>${escapeXml(description)}</description>
      <pubDate>${formatRssDate(Number.parseInt(m.ps, 10))}</pubDate>
      <guid>${link}</guid>
    </item>`
    })
    .join('\n')

  const now = formatRssDate(getEpoch())

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Films vandaag op de Nederlandse Televisie</title>
    <link>${SITE_URL}</link>
    <description>Dagelijks overzicht van films op de Nederlandse televisie</description>
    <language>nl</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`
}, {
  maxAge: HALF_HOUR_SEC,
  swr: true,
  staleMaxAge: HALF_HOUR_SEC,
})

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
