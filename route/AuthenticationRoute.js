const express = require("express");
const {
    getLoginPage,
    loginUser,
    getSignUpPage,
    signUpUser,
    forgotPassword
} = require('../controller/Authentication.js');
const auth_route = express();

auth_route.get("/login", getLoginPage);
auth_route.post("/login", loginUser);
auth_route.get("/signup", getSignUpPage);
auth_route.post("/signup", signUpUser);
auth_route.get("/forgotpwd", forgotPassword);

module.exports = auth_route;
