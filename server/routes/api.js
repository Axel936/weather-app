const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const City = require("../models/City");
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const apiKey = "9cca67fd82e912155e5aa60767fe314e";

// 
router.get("/city/:cityName", function(req, res) {
  let cityName = req.params.cityName;
  request(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`,
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

// fetch all from database   RETRIEVE >> [{},{},{}]
router.get("/cities", async function(req, res) {
  let cities =  await City.find({})

  res.send(cities);
});

//creates a new city document

router.post("/city", async (req, res) => {
  let cityDocument = new City(req.body);
  let inDB = await City.findOne({name: cityDocument.name})
  if (!inDB) {
    await cityDocument.save()
    console.log(cityDocument.name, "Has been saved to DB")
    res.end();
  } else {
    console.log(cityDocument.name, "Will not be saved to the database, it already exitst")
    res.end()
  }


});

// deletes a city given its name from DB
router.delete( '/city/:name', async ( req, res ) => {

  let city = req.params.name
  console.log(city)
  let inDB = await City.findOne({name: city})
  if (inDB) {
    await inDB.remove()
    console.log(`${city}  has been removed`)
    res.end()
  } else {
    console.log("Not found")
    res.end()
  }
  
})


module.exports = router;
