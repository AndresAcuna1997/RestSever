const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  //Get the current user
  const user = await User.findOne({ email });

  //Validate if user exist
  if (!user) {
    return res.status(400).json({ msg: "Email: not found" });
  }

  //Validate if user status is active

  if (!user.state) {
    return res.status(400).json({ msg: "User status: false" });
  }

  //Validate password
  const validate_password = bcryptjs.compareSync(password, user.password);
  if (!validate_password) {
    return res.status(400).json({ msg: "Wrong password" });
  }

  //Create JWT
  const token = await generateJWT(user.id);

  try {
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Error log in",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      //Create user if does not exist
      const data = { name, email, picture, password: "ASDA", google: true, role:'USER_ROLE' };

      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      res.status(401).json({
        ok: false,
        msg: `The user is Unauthorized`,
      });
    }

    //Create JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error ${error}`,
    });
  }
};

module.exports = { login, googleSignIn };
