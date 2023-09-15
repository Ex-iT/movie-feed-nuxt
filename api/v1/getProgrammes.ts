import { Programmes, Programme, Days } from '../../types/sharedTypes'
import getDetails from './getDetails'
import getMovies from './getMovies'

const epoch = Math.floor(new Date().getTime() / 1000)

const getMovieData = async (): Promise<Programmes> => {
  const messages: string[] = []
  let success = true
  let today: Programme[] = []
  let tomorrow: Programme[] = []

  try {
    const [todayProg, tomorrowProg] = await Promise.all([
      getMovies(Days.today) as Promise<Programme[]>,
      getMovies(Days.tomorrow) as Promise<Programme[]>,
    ])

    // 'ok' is only in the object as the request fails and is set to false
    if ('ok' in todayProg && 'ok' in tomorrowProg) {
      success = false
      messages.push('Unable to fetch movies data.')
    }

    try {
      today = await Promise.all(
        todayProg.map(async (prog) => {
          prog.details = await getDetails(prog.main_id)
          return prog
        })
      )
    } catch (error) {
      success = false
      messages.push('Unable to fetch details for today.')
    }

    try {
      tomorrow = await Promise.all(
        tomorrowProg.map(async (prog) => {
          prog.details = await getDetails(prog.main_id)
          return prog
        })
      )
    } catch (error) {
      success = false
      messages.push('Unable to fetch details for tomorrow.')
    }
  } catch (error) {
    success = false
    messages.push('Unable to fetch programmes data')
  }

  return {
    createdAt: epoch,
    today,
    tomorrow,
    log: {
      message: messages.join(' '),
      success,
    },
  }
}

const getProgrammes = async (): Promise<Programmes> => {
  return await getMovieData()
}

export default getProgrammes
