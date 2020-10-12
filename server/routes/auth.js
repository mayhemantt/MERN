const express = require("express");
const router = express.Router();

const { createOrUpdateUser } = require("../controllers/Auth");
const { authCheck } = require("../middleware/auth");

router.post("/create-update-user", authCheck, createOrUpdateUser);

module.exports = router;
