import type { ProgrammesRaw } from '~~/shared/types/Common'
import slugify from '@sindresorhus/slugify'
import { Days } from '~~/shared/types/Common'
import {
  CHANNEL_LOGO_SRC,
  CHANNELS,
  DAY_STARTS_AT,
  DEEP_LINK,
  EMPTY_IMG,
  MOVIES_URI,
} from '~/config'
import formatDate from '~/utils/formatDate'
import formatHours from '~/utils/formatHours'
import formatTime from '~/utils/formatTime'
import getEpoch from '~/utils/getEpoch'
import getProgress from '~/utils/getProgress'

export default async function getMovies(day = Days.today) {
  try {
    const url = `${MOVIES_URI}/?day=${day}`
    const response = await fetch(url)
    const { data: json } = await response.json()

    if (json) {
      return filterChannels(json || [])
    }

    return { ok: false, error: `Unable to fetch data from: ${url}` }
  }
  catch (error) {
    return { ok: false, error: `Unable to fetch data. ${error}` }
  }
}

function filterChannels(channels: Array<ProgrammesRaw>) {
  const channelData = channels.filter((channel) => {
    return Object.keys(CHANNELS).includes(channel.ch_id)
  })

  return enrichData(channelData)
}

const getChannelLabel = (id: number) => CHANNELS[id] || ''

function enrichData(channelData: Array<ProgrammesRaw>) {
  const ONE_DAY = 24 * 3600
  return channelData
    .map((movie) => {
      const { ch_id, ps, pe } = movie
      const now = getEpoch()
      let start = Number.parseInt(ps, 10)
      let end = Number.parseInt(pe, 10)

      // Fix for end time before start time
      if (end < start) {
        end = end + ONE_DAY
      }

      // Adjust start time to make the next
      // day start at `NEXT_STARTS_AT` at night
      if (Number.parseInt(formatHours(start), 10) <= DAY_STARTS_AT) {
        start = start + ONE_DAY
        end = end + ONE_DAY
      }

      return {
        ...movie,
        channel_logo: getChannelLogo(ch_id),
        channel_label: getChannelLabel(Number.parseInt(ch_id, 10)),
        start: formatTime(start),
        end: formatTime(end),
        is_passed: now > end,
        progress: getProgress(now, start, end),
        deep_link: getDeepLinkUrl(movie.title),
        day: formatDate(start),
        // Overwriting the `ps` and `pe` here to
        // return the updated start and end time
        ps: String(start),
        pe: String(end),
      }
    })
    .sort((a, z) => Number.parseInt(a.ps, 10) - Number.parseInt(z.ps, 10)) // Sort with original timestamp
    .sort((a, z) => Number.parseInt(a.ch_id, 10) - Number.parseInt(z.ch_id, 10))
}

function getChannelLogo(id: string) {
  return id ? CHANNEL_LOGO_SRC.replace(/%s/g, id) : EMPTY_IMG
}

function getDeepLinkUrl(title: string) {
  return `${DEEP_LINK}/${slugify(title, {
    decamelize: false,
    customReplacements: [
      ['\'', '-'],
      ['&', ''],
    ],
  })}`
}
