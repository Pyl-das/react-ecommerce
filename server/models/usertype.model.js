const mongoose = require("mongoose");

const UserType = mongoose.model(
    "UserType",
    new mongoose.Schema({
        name: String,
        status: Number,
        added_on: {type: Date, default: Date.now}
    })
);

module.exports = UserType;