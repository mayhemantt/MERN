const express = require("express");
const router = express.Router();

const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
} = require("../controllers/Products");
const { authCheck, adminCheck } = require("../middleware/auth");
router.get("/products/total", productsCount);
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll); // product/20
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
module.exports = router;
