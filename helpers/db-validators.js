const Category = require("../models/category");
const Role = require("../models/role");
const User = require("../models/user");
const Product = require("../models/product");

const isValidRole = async (role = "") => {
  const role_exist = await Role.findOne({ role });

  if (!role_exist) {
    throw new Error(`Role: ${role} no Valid`);
  }
};

const emailExist = async (email) => {
  const email_exist = await User.findOne({ email });

  if (email_exist) {
    throw new Error(`Email: ${email} is already registered`);
  }
};

const userExist = async (id) => {
  const user_exist = await User.findById(id);

  if (!user_exist) {
    throw new Error(`ID: ${id}, does not exist`);
  }
};

const categoryExist = async (id) => {
  const category_exist = await Category.findById(id);

  if (!category_exist) {
    throw new Error(`The category with the ID: ${id}, does not exist`);
  }
};

const producExistByName = async (name) => {
  const upperName = name.toUpperCase();
  const product = await Product.findOne({ name: upperName });

  if (product) {
    throw new Error(`The product: ${name}, already exist`);
  }
};

const producExistById = async (id) => {
  const product_exist = await Product.findById(id);

  if (!product_exist) {
    throw new Error(`The product with the ID: ${id}, does not exist`);
  }
};

module.exports = {
  isValidRole,
  producExistByName,
  emailExist,
  userExist,
  categoryExist,
  producExistById,
};
