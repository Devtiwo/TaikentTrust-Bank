const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection to database successful.");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = connectDB;
