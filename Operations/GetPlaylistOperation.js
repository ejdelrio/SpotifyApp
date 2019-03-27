"use strict";

// Standard libraries
//-----------------------
const superagent = require("superagent");

// Custom classes
//-----------------------
const Operation = require("./Operation");
const CommonWorkItems = require("../Util/CommonWorkItems");
const CommonConstants = require("../Util/CommonConstants");
const SessionManager = require("../Util/SessionManager");


// Private methods
function ValidateRequestParameters(req) {
  var playlistId;

  CommonWorkItems.ValidateIsNotNull(req, "req");
  playlistId = req.params.playlistId;
  console.log("Validating playlist ID : ", playlistId);
  CommonWorkItems.ValidateIsNotNullOrWhiteSpace(playlistId);
  console.log("Validation was successful");
}

function SendRequestToSpotify(req, token) {
  var playlistId = req.params.playlistId;
  var apiQueryString = `${ CommonConstants.spotifyApiEndpoint }/v1/playlists/${ playlistId }`

  console.log("Sending request to : ", apiQueryString);
  console.log("ACCESS TOKEN : ", token);
  return new Promise((resolve, reject) => {
    superagent.get(apiQueryString)
      .set({ Authorization: `Bearer ${ token }` })
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res.body);
      });
  })
}

function HandleResponse(data, res, next) {
  res.json(data);
  res.end();
  next();
}

function HandleException(err, res, next) {
  console.log(err);
  res.status = 400;
  res.json("An exception occured");
  res.end();
  next();
}

class GetPlaylistOperation extends Operation {
  constructor() {
    super();
  }

  Invoke(req, res, next) {

    try {
      ValidateRequestParameters(req);
    }
    catch (err) {
      res.status = 400;
      res.send(err.message);
      res.end();
      next();
      return;
    }

    SessionManager.RefreshAcessToken()
      .then(token => SendRequestToSpotify(req, token))
      .then(data => HandleResponse(data, res, next))
      .catch(error => HandleException(error, res, next));
  }
}

module.exports = GetPlaylistOperation;
