import type { Programme } from '~~/shared/types/Common'
import { SITE_URL } from '~/config'

export default function getProgrammeUrl(
  programme: Pick<Programme, 'main_id' | 'ch_id' | 'ps' | 'pe'>,
): string {
  const url = new URL(SITE_URL)
  url.searchParams.set('movie', programme.main_id)
  url.searchParams.set('ch', programme.ch_id)
  url.searchParams.set('ps', programme.ps)
  url.searchParams.set('pe', programme.pe)
  return url.toString()
}
