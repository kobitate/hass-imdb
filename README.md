# Home Assistant IMDB Shortcut
Home Assistant companion web server to open a media player entity’s content on IMDB using DuckDuckGo's `\` shortcut to visit the first result.

This works by grabbing the current content from a Home Assistant `media_player` entity and searching for the exact episode (or just the movie) on DuckDuckGo. The query used is `\[TV Show] season [X] episode [Y] [episode name] site:imdb.com`. For example: `\The Americans (2013) season 3 episode 3 Open House`.

## Setup instructions

1. Clone repository locally.
3. Duplicate `.env.example` and rename it to `.env`. Update the values (see table below)
4. Run the server by running `node index.js` from the terminal
5. Play a movie or TV show on the device you specified in your environment file, then visit `http://localhost:3000` (or the IP address of your machine)

| Variable Name | Usage                                                                                                                                       | Example                       |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| PORT          | The port that NodeJS will use to listen for requests                                                                                        | `3000`                        |
| HASS_HOST     | The URL you use to open Home Assistant                                                                                                      | `http://homeassistant.local`  |
| HASS_TOKEN    | Access token from your Home Assistant account. See [Home Assistant docs](https://www.home-assistant.io/docs/authentication/) for more info  | `[a whole bunch of nonsense]` |
| HASS_ENTITY   | The Home Assistant entity ID of your media device                                                                                           | `media_player.emby_shield_tv` |