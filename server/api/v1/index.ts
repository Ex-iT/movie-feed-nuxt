import { CACHING_DEFAULT } from '@/config'

export default defineEventHandler((event) => {
  setResponseStatus(event, 418)
  setHeader(event, 'Cache-Control', CACHING_DEFAULT)

  return {
    ok: false,
    error: 'Fight The Future',
  }
})
