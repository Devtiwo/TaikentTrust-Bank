const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const validateTransaction = require("../middlewares/validateTransaction");
const { createUser, getAllUsers, deleteUser, updateUserBalance, getAdminProfile, resetUserPassword } = require("../controllers/adminUserController");

router.post("/register", createUser);
router.get("/allUsers", verifyToken, getAllUsers);
router.delete("/deleteUser/:id", verifyToken, deleteUser);
router.patch("/updateBalance/:id", verifyToken, validateTransaction, updateUserBalance);
router.patch("/resetPassword/:id", verifyToken, resetUserPassword);
router.get("/me", verifyToken, getAdminProfile);

module.exports = router;