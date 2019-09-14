const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const City = require("../models/City");
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const apiKey = "9cca67fd82e912155e5aa60767fe314e";

// external api call
router.get("/city/:cityName", function(req, res) {
  let cityName = req.params.cityName;
  request(`http://api.weatherstack.com/current?access_key=${apiKey}& query=${cityName}`,
    function(err, response, body) {
      let weatherData = JSON.parse(body);
      // make a new City
      if (weatherData.success === false) {
        res.sendStatus(404);
      } else {
        let newCity = {
          name: weatherData.location.name,
          updatedAt: weatherData.current.observation_time,
          temperature: weatherData.current.temperature,
          condition: weatherData.current.weather_descriptions[0],
          conditionPic: weatherData.current.weather_icons[0]
        };
        res.send(newCity);
      }
    }
  );
});

// fetch all from database
router.get("/cities", async function(req, res) {
  let cities =  await City.find({})

  res.send(cities);
});

// creates and adds inserts a new city to DB

router.post("/city", async (req, res) => {
  let cityDocument = new City(req.body);

  await cityDocument.save()

  res.send("Document Saved");
});

module.exports = router;
