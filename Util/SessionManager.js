"use strict";

require("dotenv").config();
const request = require("request");
const spotifyAddress = "https://accounts.spotify.com/api/token";

class SessionManager {
  constructor() {
    this.clientId = process.env.SPOTIFY_ID;
    this.clientSecret = process.env.SPOTIFY_SECRET;
    this.refreshToken = process.env.REFRESH_TOKEN;
    this.accessToken = null;
    this.lastTokenRefresh = null;
  }

  get AccessToken() {
    return this.accessToken;
  }

  set AccessToken(token) {
    this.accessToken = token;
  }

  get RefereshRequestBody() {
    return {
      url: spotifyAddress,
      headers: { 'Authorization': 'Basic ' + this.Base64EncodedSecret },
      form: {
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken
      },
      json: true
    };
  }

  get Base64EncodedSecret() {
    return new Buffer(this.clientId + ':' + this.clientSecret).toString('base64')
  }

  RefreshCallback(resolve, reject, instance) {
    return function (error, response, body) {
      if (!error && response.statusCode === 200) {
        return resolve(body.access_token);
      }

      if (error) {
        return reject(error);
      }

      return reject(new Error());
    };
  }

  AttachToken(token) {
    this.accessToken = token;
  }

  RefreshAcessToken(token) {
    if (token) {
      return token;
    }

    return new Promise((resolve, reject) => {
      request.post(this.RefereshRequestBody, this.RefreshCallback(resolve, reject, this))
    });
  }

  WaitForRefreshComplete() {

  }

  CheckForValidityOfToken() {

  }

  PreValidateSpotifyApiCall() {
    // Program CheckForValidityOfToken to check if the token is valid, if it is, return the existing token, else return null.
    // If it returns null RefreshAcessToken will fetch a new token
    return this.CheckForValidityOfToken()
      .then(this.RefreshAcessToken);
  }
}

var sessionInstance = new SessionManager();

module.exports = sessionInstance;