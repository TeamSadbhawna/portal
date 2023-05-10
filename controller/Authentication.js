const User = require("../model/User.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getLoginPage = async (req, res) => {
    res.render("login");
};

const loginUser = async (req, res) => {
    const username = req.body.email;
    const password = req.body.password;

    User.findOne({
        email: username
    }, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, result) {
                    if (result === true) {
                        res.render("donateform")
                    }
                });
            }
        }
    })
};

const getSignUpPage = async (req, res) => {
    res.render("signup");
};

const signUpUser = async (req, res) => {
    if (req.body.cnfpassword != "" && req.body.password != "" && req.body.fullname != "") {
        bcrypt.hash(req.body.cnfpassword, saltRounds, function (err, hash) {
            const newUser = new User({
                name: req.body.fullname,
                email: req.body.email,
                password: hash
            });

            newUser.save((err) => {
                if (err) {
                    res.render("failure");
                } else {
                    res.render("donateform");
                }
            });
        });
    }
    else {
        res.render("failure");
    }
};

const forgotPassword = async (req, res) => {
    res.render("forgotpwd");
};

module.exports = {
    getLoginPage,
    loginUser,
    getSignUpPage,
    signUpUser,
    forgotPassword
}
