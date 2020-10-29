const SubCategory = require("../models/subCategory");
const slugify = require("slugify");
const Product = require("../models/product");
exports.create = async (req, res) => {
  try {
    console.log("Executed");
    const { name, parent } = req.body;
    console.log(req.body);
    const subCat = await new SubCategory({
      name,
      slug: slugify(name),
      parent,
    }).save();
    res.json(subCat);
  } catch (error) {
    res.status(400).json("Duplicate name ");
  }
};

exports.list = async (req, res) => {
  try {
    const data = await SubCategory.find({}).sort({ createdAt: -1 }).exec();

    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.read = async (req, res) => {
  try {
    let subCategory = await SubCategory.findOne({
      slug: req.params.slug,
    }).exec();
    // res.json(subCategory);
    const products = await Product.find({ subs: subCategory })
      .populate("category")
      .exec();

    res.json({
      subCategory,
      products,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { name, parent } = req.body;
    await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parent },
      { new: true }
    ).exec((err, data) => {
      if (err || !data) {
        res.status(401).json(err);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.remove = async (req, res) => {
  try {
    await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec((err, data) => {
      if (err || !data) {
        return res.status(400).json("No Category Found");
      } else {
        console.log(data);
        res.json(`${data.name} Deleted Successfully`);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
