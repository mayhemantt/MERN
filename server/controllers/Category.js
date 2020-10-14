const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);

    // console.log("Executed");
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.list = async (req, res) => {
  try {
    const data = await Category.find({}).sort({ createdAt: -1 }).exec();

    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.read = async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.update = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.remove = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json(error);
  }
};
