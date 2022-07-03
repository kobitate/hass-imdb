# Home Assistant Media Lookerupper

![Built with Love](https://img.shields.io/badge/built%20with-%E2%99%A5-blue?style=for-the-badge&labelColor=e26e32&color=d05e30) ![Does Not Contain Tree Nuts](https://img.shields.io/badge/does%20not%20contain-tree%20nuts-blue?style=for-the-badge&labelColor=3ec4f0&color=3a9ad2) [![code style - standard](https://img.shields.io/badge/code%20style-standard-green?style=for-the-badge&labelColor=90c96d&color=439b5e)](https://standardjs.com/) [![Contributor Covenant](https://img.shields.io/badge/contributor%20covenant-2.1-violet?style=for-the-badge&labelColor=892aa1&color=5d0f70)](https://github.com/kobitate/hass-media-lookerupper/blob/main/CODE_OF_CONDUCT.md)  
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fkobitate%2Fhass-media-lookerupper%2Fbadge%3Fref%3Dmain&style=for-the-badge)](https://actions-badge.atrox.dev/kobitate/hass-media-lookerupper/goto?ref=main)

Home Assistant companion web server to open a media player entity’s content on IMDb using DuckDuckGo's `\` shortcut to visit the first result.

This works by grabbing the current content from a Home Assistant `media_player` entity and searching for the exact episode (or just the movie) on DuckDuckGo. For example: `\The Americans (2013) season 3 episode 3 Open House site:imdb.com`. Including the episode name increased the chances of getting the proper result for some shows. It's slightly imperfect since it relies on the first result being the right one. I also found that DuckDuckGo was friendlier than Google to my clearly automated searching as I was testing. 

Works great in combination with a home screen shortcut on your phone! I used [Hermit for Android](https://play.google.com/store/apps/details?id=com.chimbori.hermitcrab&hl=en_US&gl=US) to generate a single-site browser for easy, silo'd access so I don't end up with a million IMDb tabs. I also added a local network-wide DNS record to redirect `lookerupper.example.com` to the server for quick access.

## Setup instructions

1. Clone repository locally.
3. Duplicate `.env.example` and rename it to `.env`. Update the values (see table below)
4. Run the server by running `node index.js` from the terminal
5. Play a movie or TV show on the device you specified in your environment file, then visit `http://localhost:3000` (or the IP address of your machine)

| Variable Name | Usage                                                                                                                                       | Example                            |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| PORT          | The port that NodeJS will use to listen for requests                                                                                        | `3000` (default value)             |
| HASS_HOST     | The URL you use to open Home Assistant, including the port number if needed                                                                 | `http://homeassistant.local:8123`  |
| HASS_TOKEN    | Access token from your Home Assistant account. See [Home Assistant docs](https://www.home-assistant.io/docs/authentication/) for more info  | `[a whole bunch of nonsense]`      |
| HASS_ENTITY   | The Home Assistant entity ID of your media device                                                                                           | `media_player.emby_shield_tv`      |
| SOURCE_TV     | Website to include in your search,                                                                                                          | `imdb.com` (default value)         |
| SOURCE_MOVIE  | Website to include in your search,                                   																																			  | `imdb.com` (default value)         |
| SOURCE_MUSIC  | Website to include in your search,                                   																																		  	| `genius.com` (default value)       |
