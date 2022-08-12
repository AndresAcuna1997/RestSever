const Role = require("../models/role");
const User = require("../models/user");

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

module.exports = { isValidRole, emailExist, userExist };
