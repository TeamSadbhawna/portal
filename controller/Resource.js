const Resource = require("../model/Resource.js");

const getDonationPage = async (req, res, next) => {
    res.render("login");
};

const getAllResources = async (req, res, next) => {
    Resource.find({}, function (err, foundItems) {
        res.render("resources", {
            newItemsList: foundItems,
        });
    });
};

const saveResource = async (req, res, next) => {
    const { fullname, address, state, city, district, pincode, email, contact, description, rating } = req.body;

    const data = new Resource({
        name: fullname,
        address: address,
        state: state,
        city: city,
        district: district,
        pincode: pincode,
        email: email,
        contact: contact,
        description: description,
        rating: rating,
    });

    data.save();
    res.redirect("/resource/resources");
};

module.exports = {
    getDonationPage,
    getAllResources,
    saveResource
}
