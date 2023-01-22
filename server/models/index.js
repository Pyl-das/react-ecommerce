const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.category = require("./category.model");

db.usertype = require("./usertype.model");

db.USERTYPE = ["superadmin", "admin"];

module.exports = db;