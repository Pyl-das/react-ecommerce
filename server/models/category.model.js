const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    category_name: String,
    flag: Number

  })
);

module.exports = Category;
