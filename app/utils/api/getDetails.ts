import { DETAIL_URI } from '../../config'

export default async function getDetails(id: string, signal?: AbortSignal) {
  try {
    const url = `${DETAIL_URI}/${id}`
    const response = await fetch(url, { signal })

    if (!response.ok) {
      throw new Error(`Unable to fetch details for ${id}.`)
    }

    const { data: json } = await response.json()

    if (json) {
      const details = json
      delete details.linear
      delete details.linearMore
      delete details.streaming
      delete details.streamingMore
      delete details.tags
      delete details.seasons
      delete details.viewMore
      delete details.news

      if (details.metadata?.guidance) {
        details.metadata.guidance = Object.keys(details.metadata.guidance).map(
          key => ({ ...details.metadata.guidance[key] }),
        )
      }

      return details
    }

    throw new Error(`Unable to fetch details for ${id}.`)
  }
  catch {
    throw new Error(`Unable to fetch details for ${id}.`)
  }
}
