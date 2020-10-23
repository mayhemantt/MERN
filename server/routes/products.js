const express = require("express");
const router = express.Router();

const { create, listAll, remove, read } = require("../controllers/Products");
const { authCheck, adminCheck } = require("../middleware/auth");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll); // product/20
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
module.exports = router;
