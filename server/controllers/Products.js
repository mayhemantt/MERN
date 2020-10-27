const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");
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
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Product Update Error", err);
    return res.status(400).json(err);
  }
};

// WithOut Pagination
// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit);

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

// WITH PAGINATION
exports.list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; // 3

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();

  // who is updating!
  // check if already added rating to it!

  const { star } = req.body;

  let existingRating = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user is new...

  if (existingRating === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      { $push: { ratings: { star, postedBy: user._id } } },
      { new: true }
    ).exec();
    res.json(ratingAdded);
  }
  // if user has already rated!
  else {
    const ratingUpdated = await Product.updateOne(
      { ratings: { $elemMatch: existingRating } },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    return res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate("postedBy")
    .exec();

  res.json(related);
};
