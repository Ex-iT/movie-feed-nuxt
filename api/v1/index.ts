import express from 'express'
import { CACHING_DEFAULT, CACHING_SHORT } from '../../config'
import { Days } from '../../types/sharedTypes'
import getCacheables from './getCacheables'

import getDetails from './getDetails'
import getMovies from './getMovies'

const VERSION = 'v1'
const PREFIX = `/api/${VERSION}`
const app = express()

app.get('/', (_req, res) => {
  res
    .status(418)
    .setHeader('Cache-Control', CACHING_DEFAULT)
    .json({ ok: true, error: 'Fight The Future' })
})

app.get('/cache', async (req, res) => {
  if (req.method === 'GET') {
    const cacheables = await getCacheables()
    res.status(200).setHeader('Cache-Control', CACHING_SHORT).json(cacheables)
  } else {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }
})

app.get('/movies/:day', async (req, res) => {
  if (req.method === 'GET') {
    const { day } = req.params

    if (day === 'today' || day === 'tomorrow') {
      const movies = await getMovies(Days[day])
      res.status(200).setHeader('Cache-Control', CACHING_DEFAULT).json(movies)
    } else {
      res.status(400).json({ ok: false, error: 'Missing Or Bad Parameter' })
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }
})

app.get('/details/:id', async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.params

    if (id) {
      const response = await getDetails(String(id))
      res.status(200).setHeader('Cache-Control', CACHING_DEFAULT).json(response)
    } else {
      res.status(400).json({ ok: false, error: 'Missing Or Bad Parameter' })
    }
  } else {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }
})

export default {
  path: PREFIX,
  handler: app,
}
