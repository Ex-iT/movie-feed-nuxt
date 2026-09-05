import { HALF_HOUR_SEC, HOUR_SEC } from '~~/app/config'
import getProgrammes from '@/utils/api/getProgrammes'

export default defineCachedEventHandler(async () => {
  return await getProgrammes()
}, {
  maxAge: HALF_HOUR_SEC,
  swr: true,
  staleMaxAge: HOUR_SEC,
})
