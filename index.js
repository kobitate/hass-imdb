require('dotenv').config()

const axios = require('axios')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const {
  HASS_TOKEN,
  HASS_ENTITY,
  HASS_HOST
} = process.env

const hassConfig = {
  headers: {
    Authorization: `Bearer ${HASS_TOKEN}`,
    'Content-Type': 'application/json'
  }
}

app.get('/', (req, res) => {
  const hassUrl = `${HASS_HOST}/api/states/${HASS_ENTITY}`

  axios.get(hassUrl, hassConfig).then(hassRes => {
    const { attributes } = hassRes.data

    const type = attributes.media_content_type || 'nothing'
    let query

    switch (type) {
      case 'nothing': {
        res.send(`Nothing playing on ${attributes.friendly_name}`)
        break
      }
      case 'tvshow': {
        const show = attributes.media_series_title.replaceAll(' ', '+')
        const season = attributes.media_season || 1
        const episode = attributes.media_episode || 1
        const episodeTitle = attributes.media_title.replaceAll(' ', '+')
        query = `${show}+season+${season}+episode+${episode}+${episodeTitle}+site%3Aimdb.com`
        break
      }
      case 'movie': {
        query = `${attributes.media_title.replaceAll(' ', '+')}+site%3Aimdb.com`
        break
      }
      case 'music': {
        const artist = attributes.media_artist
        const track = attributes.media_title
        query = encodeURIComponent(`${artist} ${track} site:genius.com`)
        break
      }
      default:
        res.send(`Incompatible media type ${type}, please play a TV Show or Movie`)
    }

    if (query !== undefined) {
      const url = `https://html.duckduckgo.com/html?q=\\${query}`
      res.redirect(url)
    }
  }).catch(e => {
    console.error(e)
    // res.send(e)
  })
})

app.listen(port, () => {
  console.log('hass-imdb is listening...')
})
