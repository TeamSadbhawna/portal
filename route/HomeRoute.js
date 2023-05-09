const express = require("express");
const getHomePage = require('../controller/Home.js');
const home_route = express();

home_route.get("/", getHomePage);

module.exports = home_route; 
