const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: [true, "Please enter your Name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your mail-ID"]
    },

    password:
    {
        type: String,
        required: [true, "Please enter a password"]
    }
});

module.exports =  mongoose.model('User', userSchema);