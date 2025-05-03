const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
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
}



module.exports = { createUser };