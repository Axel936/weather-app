const express = require("express");
const request = require("request");


const router = express.Router();

router.get("/sanity", function(req, res) {
  res.send("SUP");
});

module.exports = router;
