import { DETAIL_URI } from '../../config'
import fetchData from '../../lib/fetchData'
import { MovieDetails } from '~/types/sharedTypes'

export default async function getDetails(id: string): Promise<MovieDetails> {
  const errorObject = (error: string | Object) => ({
    generic: { id: 0, title: '' },
    metadata: {},
    ok: false,
    error,
  })

  try {
    const json = await fetchData(`${DETAIL_URI}/${id}`)

    if (json.data) {
      const details = json.data
      delete details.linear
      delete details.linearMore
      delete details.streaming
      delete details.streamingMore
      delete details.tags
      delete details.seasons
      delete details.viewMore
      delete details.news

      details.ok = true
      details.error = ''

      return details
    }

    return errorObject(`Unable to fetch details for ${id}.`)
  } catch (error: any) {
    return errorObject(error)
  }
}
