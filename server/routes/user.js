const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "Update user",
  });
});

module.exports = router;
