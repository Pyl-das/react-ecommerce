const config = require("../config/auth.config");
const db = require("../models");
const Category = db.category;

exports.add = (req, res) => {
    const category = new Category({
      category_name: req.body.category_name,
      flag: 0
    });
  
    category.save((err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Category added successfully!" });
    });
  };