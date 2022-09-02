const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const isAdmin = require("../middlewares/validate-role");
const validateFiles = require("../middlewares/validate-files");

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...isAdmin,
  ...validateFiles,
};
