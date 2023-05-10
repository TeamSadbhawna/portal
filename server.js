require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path');
const databaseConnection = require("./database/Connection.js");
const home_route  = require("./route/HomeRoute.js")
const auth_route = require("./route/AuthenticationRoute.js");
const resource_route = require("./route/ResourceRoute.js");

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

databaseConnection()
  .then(() => console.log("Connected to database successfully..."))
  .catch((err) => console.log(err));

app.use('/', home_route);
app.use('/auth', auth_route);
app.use('/resource', resource_route);

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
