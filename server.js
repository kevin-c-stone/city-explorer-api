require("dotenv").config();
const cors = require("cors");
const express = require("express");
const weather = require("./data/weather.json");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

let sendHello = (req, res) => {
  console.log("test");
};

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

let createDescription = (element) => {
  let des = `"Low of ${element.low_temp}, high of ${element.high_temp} with ${element.weather.description}"`;
  return des;
};
let searchWeather = (req, res) => {
  let searchReference = req.query;

  console.log("Search Ref", searchReference);

  let cityResponse = weather.find(
    (element) =>
      element.city_name.toLowerCase() ===
        searchReference.city_name.toLowerCase() &&
      Math.floor(element.lat) == Math.floor(searchReference.lat) &&
      Math.floor(element.lon) == Math.floor(searchReference.lon)
  );

  if (cityResponse) {
    let dayForecast = [];
    cityResponse.data.map((element) => {
      let des = createDescription(element);
      let date = element.valid_date;
      dayForecast.push(new Forecast(date, des));
    });
    res.send(dayForecast);
    res.send(console.log("Element", element));
  } else {
    res.status(403).send("Forbidden");
  }
};

let errorControl = (req, res) => {
  if (req) {
    res.status(200).send("It's WORKING!");
  } else {
    res.status(500).send("NOT GOOOD");
  }
};

app.get("/hello", sendHello);
app.get("/weather", searchWeather);
app.get("/*", errorControl);
app.listen(PORT, () => console.log(`I am listening at: ${PORT}`));
