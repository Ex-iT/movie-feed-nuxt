import { CACHING_DEFAULT } from '@/config'
import getDetails from '@/utils/api/getDetails'

export default defineCachedEventHandler(async (event) => {
  const { mainId } = getRouterParams(event)

  if (!mainId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing programme id' })
  }

  const details = await getDetails(mainId)

  if (details && (details as Record<string, unknown>).ok === false) {
    throw createError({ statusCode: 404, statusMessage: 'Details not found' })
  }

  setHeader(event, 'Cache-Control', CACHING_DEFAULT)
  return details
}, {
  maxAge: 3600,
  swr: true,
  staleMaxAge: 7200,
})
