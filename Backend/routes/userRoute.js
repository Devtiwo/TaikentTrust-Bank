const express = require("express");
const router = express.Router();
const { getDashboard, changePassword } = require("../controllers/userController");

router.get("/dashboard", getDashboard);
router.post("/change-password", changePassword);

module.exports = router;