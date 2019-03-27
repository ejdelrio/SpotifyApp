"use strict";

const SessionManager = require("../Util/SessionManager");

class Operation {
  constructor() {
    this.middleWareStack = new Array();
  }

  PreValidateSpotifyRequest(req, res, next) {
    // this is were I'll use my session manager
  }

  Invoke(req, res, next) {
    throw new Error("Base class cannot be implemented");
  }

}

module.exports = Operation;