import type { MovieDetails } from '~~/shared/types/Common'
import { DETAIL_URI } from '../../config'

export default async function getDetails(id: string): Promise<MovieDetails> {
  const url = `${DETAIL_URI}/${id}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Unable to fetch details for ${id}.`)
  }

  const { data: json } = await response.json()

  if (!json) {
    throw new Error(`Unable to fetch details for ${id}.`)
  }

  const details = json
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

  return {
    ...details,
    generic: { id: 0, title: '', ...(details.generic ?? {}) },
    metadata: details.metadata ?? {},
  }
}
