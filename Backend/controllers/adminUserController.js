const userModel = require("../models/user.model");
const generateAcctNum = require("../utilities/generateAcctNum");


const createUser = async (req, res) => {
    const { fname, lname, email, username, password } = req.body;
    try {
        if (!fname || !lname || !email || !username || !password) {
        return res.status(400).json({ status: false, message: "All fields are required!" });
        }
        const user = await userModel.findOne({ email });
        if (user) {
        return res.status(400).json({ status: false, message: "User already exists!" });
        }
        const accountNumber = await generateAcctNum();
        const newUser = new userModel({ fname, lname, email, accountNumber, username, password });
        await newUser.save();
        res.status(201).json({ status: true, message: "User created successfully!" });
    } catch (err) {
        res.status(500).json({ status: false, message: "An error occurred! check your internet connection" });
    }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find().select("-password");
    if (!user) {
      return res.status(401).json({ status: false, message: "Users not found" });
    }
    return res.status(200).json({ status: true, user });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error! Please try again." });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToDelete = await userModel.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    if (userToDelete.roles === "admin") {
      return res.status(403).json({ status: false, message: "Admin account can't be deleted!" });
    }
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ status: true, message: "User deleted successfully!", userId: userToDelete._id });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error! Please try again." });
  }
};

const updateUserBalance = async (req, res) => {
  const { id } = req.params;
  const { type, amount, desc, date } = req.body;

  try {
    const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
      } 
      const numericAmount = Number(amount);
      if (type === "withdrawal" && user.balance < numericAmount) {
        return res.status(400).json({ status: false, message: "Insufficient funds" });
      }
      user.balance += type === "deposit" ? numericAmount : -numericAmount;
      const newTransaction = { type, amount: numericAmount, desc, date: date ? new Date(date) : new Date() };
      user.transactions.unshift(newTransaction);
      user.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      await user.save();
      return res.status(200).json({ status: true, message: "User balance updated successfully!", balance: user.balance, transactions: user.transactions });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error! Please try again." });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user || user.roles !== "admin") {
      return res.status(401).json({ status: false, message: "Unauthorized access!" });
    }
    res.status(200).json({ status: true, user: { fname: user.fname } });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error!" });
  }
}


const resetUserPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    // check if password is not empty or password is less than 10 characters
    if (!newPassword || newPassword.length < 10) {
      return res.status(400).json({ status: false, message: "Password must be at least 10 characters long" });
    }
    // prevent resubmission of the same old password
    const isSamePassword = await user.validatePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({ status: false, message: "New password cannot be the same as the current password" });
    }
    // update password and save
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ status: true, message: "User password reset successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error! Please try again." });
  }
}

module.exports = { createUser, getAllUsers, deleteUser, updateUserBalance, getAdminProfile, resetUserPassword }; 