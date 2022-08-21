const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const isAdmin = require("../middlewares/validate-role");

module.exports = { ...validateFields, ...validateJWT, ...isAdmin };
