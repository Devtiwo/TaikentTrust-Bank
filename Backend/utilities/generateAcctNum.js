const user = require("../models/user.model");

const generateAcctNum = async () => {
  let accountNumber;
  let exists = true;
  
  while (exists) {
    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    exists = await user.findOne({ accountNumber });
  }
  return accountNumber.toString();
};

module.exports = generateAcctNum;