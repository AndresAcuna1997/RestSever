const { Schema, model } = require("mongoose");

//CREATE USER MODEL

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is a required"],
  },
  email: {
    type: String,
    required: [true, "Email is a required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is a required"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: [true],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();

  return user;
};

module.exports = model("User", UserSchema);
