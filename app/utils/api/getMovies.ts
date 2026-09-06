import type { ProgrammesRaw } from '~~/shared/types/Common'
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
import slugifyTitle from '~/utils/slugifyTitle'

export default async function getMovies(day = Days.today, signal?: AbortSignal) {
  const url = `${MOVIES_URI}/?day=${day}`
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Unable to fetch data from: ${url}`)
  }

  const { data: json } = await response.json()

  return filterChannels(json || [])
}

const CHANNEL_IDS = new Set(Object.keys(CHANNELS))

function filterChannels(channels: Array<ProgrammesRaw>) {
  const channelData = channels.filter(channel => CHANNEL_IDS.has(channel.ch_id))

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
    .sort((a, z) => {
      const channelDiff = Number.parseInt(a.ch_id, 10) - Number.parseInt(z.ch_id, 10)
      if (channelDiff !== 0) {
        return channelDiff
      }
      return Number.parseInt(a.ps, 10) - Number.parseInt(z.ps, 10)
    })
}

function getChannelLogo(id: string) {
  return id ? CHANNEL_LOGO_SRC.replace(/%s/g, id) : EMPTY_IMG
}

function getDeepLinkUrl(title: string) {
  return `${DEEP_LINK}/${slugifyTitle(title)}`
}
