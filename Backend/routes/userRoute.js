const express = require("express");
const router = express.Router();
const { getDashboard, changePassword } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const verifyPassword = require("../middlewares/verifyPassword");

router.get("/dashboard", verifyToken, getDashboard);
router.patch("/change-password", verifyToken, verifyPassword, changePassword);

module.exports = router;