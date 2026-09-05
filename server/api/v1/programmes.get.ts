import getProgrammes from '@/utils/api/getProgrammes'

export default defineCachedEventHandler(async () => {
  return await getProgrammes()
}, {
  maxAge: 1800,
  swr: true,
  staleMaxAge: 3600,
})
