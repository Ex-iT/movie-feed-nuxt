import express from 'express'
import { CACHING_DEFAULT } from '../../config'
import getProgrammes from './getProgrammes'
import getStatus from './getStatus'

const VERSION = 'v1'
const PREFIX = `/api/${VERSION}`
const app = express()

// Disable 'Powered by' header
app.disable('x-powered-by')

app.get('/', (_req, res) => {
  res
    .status(418)
    .setHeader('Cache-Control', CACHING_DEFAULT)
    .json({ ok: false, error: 'Fight The Future' })
})

app.get('/programmes', async (req, res) => {
  if (req.method === 'GET') {
    const programmes = await getProgrammes()
    res.status(200).setHeader('Cache-Control', CACHING_DEFAULT).json(programmes)
  } else {
    res
      .status(405)
      .setHeader('Cache-Control', CACHING_DEFAULT)
      .json({ ok: false, error: 'Method Not Allowed' })
  }
})

app.get('/status', async (req, res) => {
  if (req.method === 'GET') {
    const status = await getStatus()
    res.status(200).json(status)
  } else {
    res
      .status(405)
      .setHeader('Cache-Control', CACHING_DEFAULT)
      .json({ ok: false, error: 'Method Not Allowed' })
  }
})

export default {
  path: PREFIX,
  handler: app,
}
