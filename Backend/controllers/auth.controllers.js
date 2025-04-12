const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.send({ status: false, message: "username and password required!" });
    }
    const user = await userModel.findOne({ username });
    if(!user) {
      return res.send({ status: false, message: "User not found! contact support"});
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.send({ status: false, message: "Invalid login credentials"});
    }
    const token = jwt.sign(username, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.send({ status: true, message: "Login successful", token, user: { role: user.roles }});
  } catch (err) {
    res.send({ status: false, message: "An error occurred! check your internet connection" });
  }
};

module.exports = {login};