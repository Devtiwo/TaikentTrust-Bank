const validateTransaction = (req, res, next) => {
  const { type, amount, date} = req.body;
  
  const validTypes = ["deposit", "withdrawal"];
  const numericAmount = Number(amount);
  const transactionDate = new Date(date);
  const currentDate = new Date();


  if (!type || !validTypes.includes(type)) {
    return res.status(400).json({ status: false, message: "Invalid transaction type" });
  }

  if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ status: false, message: "Invalid transaction amount" });
  }

  if (!date || isNaN(transactionDate.getTime())) {
    return res.status(400).json({ status: false, message: "Invalid transaction date" });
  }

  if (transactionDate > currentDate) {
    return res.status(400).json({ status: false, message: "Transaction date cannot be in the future" });
  }

  next();
}

module.exports = validateTransaction;