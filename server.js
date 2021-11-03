"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weather = require("./data/weather.json");

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get("/weather", (req, res) => {
  response.send("Hello, it works!");
});

function handleGetWeather(req, res) {
  res.status(200).send(weather);
}

app.listen(PORT, () => console.log(`"I am a server on port: ${PORT}"`));
