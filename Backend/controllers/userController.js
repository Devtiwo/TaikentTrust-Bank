const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const getDashboard = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.user.username })
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found"})
    }
    return res.status(200).json({ status: true, message: "user found", user: {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      accountNumber: user.accountNumber,
      balance: user.balance,
      transactions: user.transactions,
    }});
  } catch (err) {
    res.status(500).json({ status: false, message: "An error occurred! check your internet connection" });
  }
};

const changePassword = async (req, res) => {
  try {
    const newpass = req.newpass;
    req.userDoc.password = newpass;
    await req.userDoc.save();
    return res.status(200).json({ status: true, message: "password changed successfully" });
  } catch (err) {
    return res.status(500).json({ status: false, message: "server error! pls try again." });
  }
};

module.exports = { getDashboard, changePassword };