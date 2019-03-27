"use strict";

const express = require("express");
const app = new express();
const PORT = 5000;
const ServiceRouter = require("./Router/ServiceRouter");

app.use(ServiceRouter);

app.listen(PORT, () => {
  console.log("SERVER ACTIVE ON PORT : ", PORT);
})
