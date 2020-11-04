const express = require("express");

const router = express.Router();

const { createPaymentIntent } = require("../controllers/Stripe");
const { authCheck } = require("../middleware/auth");

router.post("/create-payment-stripe", authCheck, createPaymentIntent);

module.exports = router;
