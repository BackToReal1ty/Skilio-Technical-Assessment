// import requiered dependancies
const express = require("express");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// express settings 
app.use(express.json()); //parse json input
app.use(express.urlencoded({ extended: false })); //parse application/x-www-form-urlencoded
app.options("*", cors());
app.use(cors());

// jwt encryption secret
const JWT_SECRET = require("../config.js");

// 404 
app.all("*", function(req, res) {
    res.status(404).send();
});


module.exports = app;