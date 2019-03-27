"use strict";

const Router = require("express").Router;
const GetPlaylistOperation = require("../Operations/GetPlaylistOperation");

class ServiceRouter extends Router {

}

var instance = new ServiceRouter();
instance.get("/api/:playlistId", new GetPlaylistOperation().Invoke);
instance.get("/api/bacon", (req, res) => {
  res.send("bacon");
  res.end();
})


module.exports = instance;