import type { Programme, Programmes } from '~~/shared/types/Common'
import { Days } from '~~/shared/types/Common'
import getMovies from '~/utils/api/getMovies'
import getEpoch from '~/utils/getEpoch'

export default async function getProgrammes(): Promise<Programmes> {
  const epoch = getEpoch()

  const [todayResult, tomorrowResult] = await Promise.allSettled([
    getMovies(Days.today) as Promise<Programme[]>,
    getMovies(Days.tomorrow) as Promise<Programme[]>,
  ])

  const today = todayResult.status === 'fulfilled' ? todayResult.value : []
  const tomorrow = tomorrowResult.status === 'fulfilled' ? tomorrowResult.value : []
  const failed = [todayResult, tomorrowResult].some(r => r.status === 'rejected')

  return {
    createdAt: epoch,
    today,
    tomorrow,
    log: failed
      ? { message: 'Unable to fetch programmes data', success: false }
      : { message: '', success: true },
  }
}
