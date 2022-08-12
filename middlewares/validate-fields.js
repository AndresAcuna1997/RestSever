const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const check_errors = validationResult(req);

  if (!check_errors.isEmpty()) {
    return res.status(400).json(check_errors);
  }

  next(); //Allows to continue with next middleware
};




module.exports = { validateFields };
