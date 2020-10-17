const express = require("express");
const router = express.Router();

const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/SubCategory");
const { authCheck, adminCheck } = require("../middleware/auth");

router.post("/subCategory", authCheck, adminCheck, create);
router.get("/subCategory/:slug", read);
router.delete("/subCategory/:slug", authCheck, adminCheck, remove);
router.put("/subCategory/:slug", authCheck, adminCheck, update);
router.get("/subCategory", list);

module.exports = router;
