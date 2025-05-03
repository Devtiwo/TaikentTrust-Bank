const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./utilities/connectDB");
const authRouter = require("./routes/authRoute");
const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute");

const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

connectDB();

app.listen(PORT, (err) => {
  if (err) {
    console.log("Oops!, error connecting");
  } else {
    console.log("We are live");
  }
});
