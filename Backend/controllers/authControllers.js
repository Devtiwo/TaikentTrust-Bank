const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { resetPasswordEmail } = require("../utilities/email");


const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ status: false, message: "username and password required!" });
    }
    const user = await userModel.findOne({ username });
    if(!user) {
      return res.status(400).json({ status: false, message: "User not found! contact support"});
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Invalid login credentials"});
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.status(200).json({ status: true, message: "Login successful", token, 
      user: {
        email: user.email,
        role: user.roles 
      }
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "An error occurred! check your internet connection" });
  }
};

const forgotPassword = async (req, res) => {
  const { email} = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found!"});
    }
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {expiresIn: "1h"});
    user.resetToken = resetToken;
    user.tokenExpires = Date.now() + 3600000;
    await user.save();
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await resetPasswordEmail(user, resetLink);
    return res.status(200).json({ status: true, message: "Password reset link sent."});
  } catch (err) {
    return res.status(500).json({ status: false, message: "server error! pls try again" });
  }
}

module.exports = { login, forgotPassword };