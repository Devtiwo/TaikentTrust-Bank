const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/adminUserController");

router.post("/register", createUser);

module.exports = router;