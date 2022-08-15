const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Missing JWT" });
  }

  try {
    //Validate JWT
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);

    //Find user from the uid
    const userVerified = await User.findById(uid);

    if (!userVerified) {
      return res.status(401).json({ msg: "This user does not exist" });
    }

    //Check if state of auth user is not false
    if (!userVerified.state) {
      return res.status(401).json({ msg: "This user is not authorized" });
    }

    req.userVerified = userVerified;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token invalid" });
  }
};

module.exports = { validateJWT };
