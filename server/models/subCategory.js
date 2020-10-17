const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Category = require("./category");
const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "Too Short"],
      maxlength: [32, "Too Long"],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: Category, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subSchema);
