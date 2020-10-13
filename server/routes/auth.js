const express = require("express");
const router = express.Router();

const { createOrUpdateUser, currentUser } = require("../controllers/Auth");
const { authCheck, adminCheck } = require("../middleware/auth");

router.post("/create-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
module.exports = router;
