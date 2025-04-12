const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./utilities/connectDB");
const authRouter = require("./routes/auth.route");

const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRouter);

connectDB();

app.listen(PORT, (err) => {
  if (err) {
    console.log("Oops!, error connecting");
  } else {
    console.log("We are live");
  }
});
