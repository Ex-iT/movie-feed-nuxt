import type { Programme, Programmes } from '~~/shared/types/Common'
import { Days } from '~~/shared/types/Common'
import getMovies from '~/utils/api/getMovies'

export default async function getProgrammes(): Promise<Programmes> {
  const epoch = Math.floor(Date.now() / 1000)

  try {
    const [today, tomorrow] = await Promise.all([
      getMovies(Days.today) as Promise<Programme[]>,
      getMovies(Days.tomorrow) as Promise<Programme[]>,
    ])

    return {
      createdAt: epoch,
      today,
      tomorrow,
      log: { message: '', success: true },
    }
  }
  catch (_error) {
    return {
      createdAt: epoch,
      today: [],
      tomorrow: [],
      log: { message: 'Unable to fetch programmes data', success: false },
    }
  }
}
