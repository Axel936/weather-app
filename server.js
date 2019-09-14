const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 4802;
const api = require('./server/routes/api');
const City = require('./server/models/City');
const mongoose = require("mongoose");


const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", api);
mongoose.connect("mongodb://localhost/weatherDB")



app.listen(port, () => console.log(`Running server on port ${port}`));
