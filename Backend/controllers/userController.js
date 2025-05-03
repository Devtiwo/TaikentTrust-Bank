const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const getDashboard = async (req, res) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: false, message: "invalid Token"})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ username: decoded.username })
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found"})
    }
    return res.status(200).json({ status: true, message: "user found", user: {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      accountNumber: user.accountNumber,
    }});
  } catch (err) {
    res.status(500).json({ status: false, message: "An error occurred! check your internet connection" });
  }
};

const changePassword = async (req, res) => {
  const { currentpass, newpass, confirmpass } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ username: result.username });
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    };
    if (newpass !== confirmpass) {
      return res.status(400).json({ status: false, message: "passwords do not match" });
    };
    if (currentpass === newpass) {
      return res.status(400).json({ status: false, message: "use a new password" });
    }
    const isMatch = await user.validatePassword(currentpass);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "current password is incorrect" });
    }
    user.password = newpass;
    await user.save();
    return res.status(200).json({ status: true, message: "password changed successfully" });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ status: false, message: "session expired! pls sign in" });
    }
    return res.status(500).json({ status: false, message: "server error! pls try again." });
  }
};

module.exports = { getDashboard, changePassword };