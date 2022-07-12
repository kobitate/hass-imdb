require('dotenv').config()

const axios = require('axios')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const sourceTv = process.env.SOURCE_TV || 'imdb.com'
const sourceMovie = process.env.SOURCE_MOVIE || 'imdb.com'
const sourceMusic = process.env.SOURCE_MUSIC || 'genius.com'

const {
  HASS_TOKEN,
  HASS_ENTITIES,
  HASS_HOST
} = process.env

const hassConfig = {
  headers: {
    Authorization: `Bearer ${HASS_TOKEN}`,
    'Content-Type': 'application/json'
  }
}

const checkEntity = entity => {
  const { attributes } = entity

  console.log(`Checking ${attributes.friendly_name}.`)

  if (!attributes.media_content_type) {
    return null
  }

  const type = attributes.media_content_type
  let query

  switch (type) {
    case 'tvshow': {
      const show = attributes.media_series_title
      const season = attributes.media_season
      const episode = attributes.media_episode
      const episodeTitle = attributes.media_title
      query = `${show} season ${season} episode ${episode} ${episodeTitle} site:${sourceTv}`
      break
    }
    case 'movie': {
      query = `${attributes.media_title} site:${sourceMovie}`
      break
    }
    case 'music': {
      const artist = attributes.media_artist
      const track = attributes.media_title
      query = `${artist} ${track} site:${sourceMusic}`
      break
    }
  }

  if (query !== undefined) {
    const url = `https://html.duckduckgo.com/html?q=\\${encodeURIComponent(query)}`
    return url
  }

  return null
}

app.get('/', (req, res) => {
  const entities = HASS_ENTITIES.split(',').map(entity =>
    axios.get(`${HASS_HOST}/api/states/${entity}`, hassConfig))

  Promise.all(entities).then(entityCalls => {
    let foundMedia = false
    entityCalls.every(entityData => {
      const entity = entityData.data
      const mediaUrl = checkEntity(entity)
      if (!mediaUrl) {
        console.log('Nothing playing on device')
        return true
      } else {
        foundMedia = true
        res.redirect(mediaUrl)
        return false
      }
    })
    if (!foundMedia) {
      res.send('Nothing playing')
    }
  })
})

app.listen(port, () => {
  console.log('hass-imdb is listening...')
})
