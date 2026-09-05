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
  maxAge: 3600,
  swr: true,
  staleMaxAge: 7200,
})
