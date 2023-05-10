const express = require("express");
const { getDonationPage, getAllResources, saveResource } = require('../controller/Resource.js');
const resource_route = express();

resource_route.get("/donate", getDonationPage);
resource_route.post("/donate", saveResource);
resource_route.get("/resources", getAllResources)

module.exports = resource_route;