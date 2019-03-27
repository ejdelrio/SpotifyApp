"use strict";

class CommonConstants {
  static get spotifyApiEndpoint() {
    return "https://api.spotify.com"
  }

  static get spotifyGetPlaylistByIdEndpoint() {
    return "https://api.spotify.com/v1/playlists/{playlist_id}/tracks";
  }
}

module.exports = CommonConstants;