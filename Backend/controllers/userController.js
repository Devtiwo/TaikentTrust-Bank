const transactionModel = require("../models/transactionmodel");
const userModel = require("../models/user.model");

const getDashboard = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
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

const transfer =async (req, res) => {
  try {
    const { type, amount, desc, date, name, address, bankName, acctNum, iban, country, routing, swift, note } = req.body;
    const transferAmount = Number(amount);
    if (!transferAmount || transferAmount <= 0) {
      return res.status(400).json({ status: false, message: "Invalid amount" });
    }
    const user = await userModel.findById(req.user.id);
    if(!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    if (user.balance < transferAmount) {
      return res.status(400).json({ status: false, message: "Insufficient balance" });
    }
    user.balance -= transferAmount;
    const newTransaction = ({ type: "transfer", transferType: type, amount: transferAmount, desc, date: new Date(), name, address, bankName, acctNum, iban, country, routing, swift, note });
    user.transactions.unshift(newTransaction);
    await user.save();
    return res.status(200).json({ status: true, message: "Transfer successful", newBalance: user.balance, transaction: newTransaction });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "server error! pls try again." });
  }
}

module.exports = { getDashboard, changePassword, transfer };