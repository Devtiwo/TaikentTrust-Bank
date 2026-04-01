const express = require("express");
const router = express.Router();
const { getDashboard, changePassword, transfer } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const verifyPassword = require("../middlewares/verifyPassword");

router.get("/dashboard", verifyToken, getDashboard);
router.patch("/change-password", verifyToken, verifyPassword, changePassword);
router.post("/transfer", verifyToken, transfer);

module.exports = router;