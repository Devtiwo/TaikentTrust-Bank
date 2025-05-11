const userModel = require("../models/user.model");

const verifyPassword = async (req, res, next) => {
  const { currentpass, newpass, confirmpass } = req.body;

  try {
    const user = await userModel.findOne({ username: req.user.username });

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    if (newpass !== confirmpass) {
      return res.status(400).json({ status: false, message: "Passwords do not match" });
    }

    if (currentpass === newpass) {
      return res.status(400).json({ status: false, message: "new password cannot be same as old password" });
    }

    const isMatch = await user.validatePassword(currentpass);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Current password is incorrect" });
    }

    req.userDoc = user;      // renamed to avoid overwriting `req.user`
    req.newpass = newpass;
    next();
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error! Please try again." });
  }
};

module.exports = verifyPassword;
