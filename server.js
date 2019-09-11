const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const api = require('./server/routes/api');

const bodyParser = require("body-parser");
const port = 4802;

const app = express();

app.use("/", api);

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Running server on port ${port}`));
