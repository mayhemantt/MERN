const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body);
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);

    // console.log("Executed");
  } catch (error) {
    res.status(400).json("Duplicate name ");
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
    const { name } = req.body;
    await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    ).exec((err, data) => {
      if (err || !data) {
        res.status(401).json(err);
      } else {
        res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.remove = async (req, res) => {
  try {
    await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec((err, data) => {
      if (err || !data) {
        return res.status(400).json("No Category Found");
      } else {
        res.json(`${data.name} Deleted Successfully `);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
