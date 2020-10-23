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

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(`${deletedProduct.title} deleted `);
  } catch (err) {
    return res.status(400).send("Product Delete Failed");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  } catch (err) {
    return res.status(400).json(err);
  }
};
