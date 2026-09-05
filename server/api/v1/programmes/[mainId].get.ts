import { HOUR_SEC, TWO_HOUR_SEC } from '~~/app/config'
import getDetails from '@/utils/api/getDetails'

export default defineCachedEventHandler(async (event) => {
  const { mainId } = getRouterParams(event)

  if (!mainId || !/^\d+$/.test(mainId)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid programme id' })
  }

  try {
    return await getDetails(mainId)
  }
  catch {
    throw createError({ statusCode: 404, statusMessage: 'Details not found' })
  }
}, {
  maxAge: HOUR_SEC,
  swr: true,
  staleMaxAge: TWO_HOUR_SEC,
})
