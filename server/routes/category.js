const express = require("express");
const router = express.Router();

const {
  create,
  read,
  update,
  remove,
  list,
  getSubs,
} = require("../controllers/Category");
const { authCheck, adminCheck } = require("../middleware/auth");

router.post("/category", authCheck, adminCheck, create);
router.get("/category/:slug", read);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.put("/category/:slug", authCheck, adminCheck, update);
router.get("/categories", list);
router.get("/category/subs/:_id", getSubs);
module.exports = router;
