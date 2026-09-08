import getProgrammes from '@/utils/api/getProgrammes'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store, max-age=0')
  return await getProgrammes()
})
