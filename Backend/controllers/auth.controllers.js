const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).send({ status: false, message: "username and password required!" });
    }
    const user = await userModel.findOne({ username });
    if(!user) {
      return res.status(400).send({ status: false, message: "User not found! contact support"});
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(400).send({ status: false, message: "Invalid login credentials"});
    }
    const token = jwt.sign(username, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.status(200).send({ status: true, message: "Login successful", token, user: { role: user.roles }});
  } catch (err) {
    res.status(500).send({ status: false, message: "An error occurred! check your internet connection" });
  }
};

const forgotPassword = async (req, res) => {
  const { email} = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).send({ status: false, message: "User not found!"});
    }
    const resetToken = jwt.sign(email, process.JWT_SECRET, {expiresIn: "1h"});
    user.resetToken = resetToken;
    user.tokenExpires = Date.now() + 3600000;
    await user.save();
    const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
  } catch (err) {

  }
}

module.exports = { login, forgotPassword };