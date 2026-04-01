const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["deposit", "withdrawal", "transfer"], required: true },
  transferType: { type: String, enum: ["domestic", "international"] },
  amount: { type: Number, required: true },
  desc: { type: String },
  date: { type: Date, default: Date.now },
  name: { type: String },
  address: { type: String},
  bankName: { type: String },
  acctNum: { type: String },
  routing: { type: String },
  swift: { type: String },
  note: { type: String }
});

module.exports = transactionSchema;