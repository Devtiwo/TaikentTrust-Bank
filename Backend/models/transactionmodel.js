const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["deposit", "withdrawal"], required: true },
  amount: { type: Number, required: true },
  desc: { type: String },
  date: { type: Date, required: true },
}, { _id: false });

module.exports = transactionSchema;