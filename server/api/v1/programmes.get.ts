import { CACHING_DEFAULT } from '@/config'
import getProgrammes from '@/utils/api/getProgrammes'

export default defineCachedEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', CACHING_DEFAULT)

  return await getProgrammes()
}, {
  maxAge: 1800,
  swr: true,
  staleMaxAge: 3600,
})
