const { response } = require("express");

const getUser = (req, res = response) => {
  const { name, comp } = req.query; // /api/users?-> name=hello&comp=world <-

  res.json({ ok: true, data: "Get Method - Controller", name, comp });
};

const putUser = (req, res = response) => {
  //Read URL argument - Segment /api/users/->10<-
  const { id } = req.params; /* <- Name declared in the controller */

  res.json({ ok: true, data: "put Method - Controller", id });
};

const postUser = (req, res = response) => {
  //Getting the data from the Url
  const { name, age } = req.body;

  res
    .status(201)
    .json({ ok: true, data: "post Method - Controller", name, age });
};

const deleteUser = (req, res = response) => {
  res.json({ ok: true, data: "delete Method - Controller" });
};

const patchUser = (req, res = response) => {
  res.json({ ok: true, data: "patch Method- Controller" });
};

module.exports = { getUser, putUser, postUser, deleteUser, patchUser };
