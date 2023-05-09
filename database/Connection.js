const mongoose = require("mongoose");

const databaseConnection = async () => {
    return await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = databaseConnection;