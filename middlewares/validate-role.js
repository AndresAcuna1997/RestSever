const { response, request } = require("express");
const User = require("../models/user");

const isAdmin = (req = request, res = response, next) => {
  try {
    if (!req.userVerified) {
      console.log(error);
      return res.status(500).json({ msg: "No user with a verified token" });
    }

    const { role, name } = req.userVerified;

    if (role !== "ADMIN_ROLE") {
      return res
        .status(401)
        .json({ msg: `The user ${name} is unauthorized to do this action ` });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token invalid" });
  }

  next();
};

const hasRole = (...roles) => {
  // Middleware that receives "custom" arguments from the Routes file
  return (req = request, res = response, next) => {
    const user = req.userVerified;

    if (!req.userVerified) {
      console.log(error);
      return res.status(500).json({ msg: "No user with a verified token" });
    }

    if (!roles.includes(user.role)) {
      return res.status(401).json({ msg: "This user is not authorized to do this action" });
    }

    next();
  };
};

module.exports = { isAdmin, hasRole };
