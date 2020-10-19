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
    // res.status(400).json("Failed To Create Product");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.read = async (req, res) => {
  let products = await Product.find({});
  res.json(products);
};
