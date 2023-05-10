const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your full-name"]
    },
    address: {
        type: String,
        required: [true, "Please enter your Home-Address"]
    },
    state: {
        type: String,
        required: [true, "Please enter from which state you are"]
    },
    city: {
        type: String,
        required: [true, "Please enter your City"]
    },
    district: {
        type: String,
        required: [true, "Please enter the district"]
    },
    pincode: {
        type: Number,
        required: [true, "Please enter the pin-code"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"]
    },
    contact: {
        type: Number,
        required: [true, "Please enter your phnone-no"]
    },
    description: {
        type: String,
        required: [true, "Description of the things are required"]
    },
    rating: {
        type: Number,
        required: [true, "Please enter the rating "],
        min: 1,
        max: 10
    }
});

module.exports =  mongoose.model('Resource', resourceSchema);