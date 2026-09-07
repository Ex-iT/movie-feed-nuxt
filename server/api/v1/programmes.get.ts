import { FIFTEEN_MIN_SEC } from '~~/app/config'
import getProgrammes from '@/utils/api/getProgrammes'

export default defineCachedEventHandler(async () => {
  return await getProgrammes()
}, {
  maxAge: FIFTEEN_MIN_SEC,
  swr: true,
  staleMaxAge: FIFTEEN_MIN_SEC,
})
