const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const cart = require("../models/cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  //
  // console.log(req.body);
  // return "";
  const { couponApplied } = req.body;
  const user = await User.findOne({ email: req.user.email }).exec();

  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderdBy: user._id,
  }).exec();
  // const customer = await stripe.customers.create({
  //   name: user.name,
  //   address: user.address,
  // });
  // console.log("After Discount", totalAfterDiscount);
  // return "";
  let finalAmount = 0;
  if (couponApplied && totalAfterDiscount) {
    finalAmount = Math.round(totalAfterDiscount * 100);
  } else {
    finalAmount = Math.round(cartTotal * 100);
  }
  const paymentIntent = await stripe.paymentIntents.create({
    description: "Software development services",
    amount: finalAmount,
    currency: "INR",
  });
  console.log(finalAmount);

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
