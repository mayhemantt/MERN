const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middleware/auth");
// controllers
const { userCart, getUserCart } = require("../controllers/user");

// router.get("/user", (req, res) => {
//   res.json({
//     data: "Update user",
//   });
// });

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart

module.exports = router;
