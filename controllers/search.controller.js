const { response, request } = require("express");
const { User, Product, Role, Category } = require("../models");
const { ObjectId } = require("mongoose").Types;

const availableCollections = ["categories", "products", "roles", "users"];

const findUser = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term);

  if (isMongoID) {
    const user = await User.findById(term);

    res.status.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.json({ results: users });
};

const findProducts = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term);

  if (isMongoID) {
    const product = await Product.findById(term);

    res.json({ results: product ? [product] : [] });
  }

  const regex = new RegExp(term, "i");

  const product = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.json({ results: product });
};

const findRoles = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term);

  if (isMongoID) {
    const role = await Role.findById(term);

    res.json({ results: role ? [role] : [] });
  }

  const regex = new RegExp(term, "i");

  const role = await Role.find({
    role: regex,
  });

  res.json({ results: role });
};

const findCategories = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term);

  if (isMongoID) {
    const category = await Category.findById(term);

    res.json({ results: category ? [category] : [] });
  }

  const regex = new RegExp(term, "i");

  const category = await Category.find({
    $and: [{ state: true }, { name: regex }],
  });

  res.json({ results: category });
};

const Search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!availableCollections.includes(collection)) {
    res.status(400).json({
      msg: `The available collections are: ${availableCollections.join(", ")}`,
    });
  }

  switch (collection) {
    case "categories":
      findCategories(term, res);
      break;

    case "products":
      findProducts(term, res);
      break;

    case "roles":
      findRoles(term, res);
      break;

    case "users":
      findUser(term, res);
      break;

    default:
      res.status(500).json({ msg: "Forgot to do this case" });
      break;
  }
};

module.exports = { Search };
