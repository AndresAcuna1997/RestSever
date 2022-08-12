const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUser = async (req, res = response) => {
  // const { name, comp } = req.query; // /api/users?-> name=hello&comp=world <-
  // const users = await User.find(); Gets all the users
  // const totalEntries = await User.countDocuments(query);
  // const users = await User.find(query).skip(from).limit(limit);
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const totalEntries = new Promise((resolve, reject) => {
    const countTotal = User.countDocuments(query);

    if (countTotal) {
      resolve(countTotal);
    } else {
      reject("Could not get the total count");
    }
  });

  const usersPromise = new Promise((resolve, reject) => {
    const userData = User.find(query).skip(from).limit(limit);

    if (userData) {
      resolve(userData);
    } else {
      reject("Could not get the users");
    }
  });

  const [total, users] = await Promise.all([totalEntries, usersPromise]);

  res.json({ ok: true, data: { total, users } });
};

const putUser = async (req, res = response) => {
  //Read URL argument - Segment /api/users/->10<-
  const { id } = req.params; /* <- Name declared in the controller */

  const { _id, password, google, email, ...infoReq } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    infoReq.password = bcryptjs.hashSync(password, salt); //<- Hash password
  }

  const userDB = await User.findByIdAndUpdate(id, infoReq);

  res.json({ ok: true, userDB });
};

const postUser = async (req, res = response) => {
  //Getting the data from the Url
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt); //<- Hash password

  await user.save();

  res.status(201).json({ ok: true, user });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  // How not to do it
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({ ok: true, user });
};

const patchUser = (req, res = response) => {
  res.json({ ok: true, data: "patch Method- Controller" });
};

module.exports = { getUser, putUser, postUser, deleteUser, patchUser };
