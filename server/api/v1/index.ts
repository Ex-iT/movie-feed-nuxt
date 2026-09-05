export default defineEventHandler((event) => {
  setResponseStatus(event, 418)

  return {
    ok: false,
    error: 'Fight The Future',
  }
})
