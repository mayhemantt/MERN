const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  console.log(req.body);
  try {
    console.log("try");
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
    console.log("try end");
  } catch (err) {
    console.log(err, "catch");
    res.json("Failed To Create Product").status(400);
  }
};
