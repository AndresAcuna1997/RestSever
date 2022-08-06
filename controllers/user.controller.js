const { response } = require("express");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUser = (req, res = response) => {
  const { name, comp } = req.query; // /api/users?-> name=hello&comp=world <-

  res.json({ ok: true, data: "Get Method - Controller", name, comp });
};

const putUser = (req, res = response) => {
  //Read URL argument - Segment /api/users/->10<-
  const { id } = req.params; /* <- Name declared in the controller */

  res.json({ ok: true, data: "put Method - Controller", id });
};

const postUser = async (req, res = response) => {
  const check_errors = validationResult(req);

  if (!check_errors.isEmpty()) {
    return res.status(400).json(check_errors);
  }

  //Getting the data from the Url
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  //Verify if the email already exist
  const email_exist = await User.findOne({ email });
  if (email_exist) {
    return res.status(400).json({ msg_err: "Email already registered" });
  }

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt); //<- Hash password

  await user.save();

  res.status(201).json({ ok: true, data: "post Method - Controller", user });
};

const deleteUser = (req, res = response) => {
  res.json({ ok: true, data: "delete Method - Controller" });
};

const patchUser = (req, res = response) => {
  res.json({ ok: true, data: "patch Method- Controller" });
};

module.exports = { getUser, putUser, postUser, deleteUser, patchUser };
