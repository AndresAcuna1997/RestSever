const { Router } = require("express");
const { check } = require("express-validator");
const {
  loadFile,
  uptadeImage,
  getImage,
  uptadeImageCloudinary,
} = require("../controllers/uploads.controller");
const { validCategories } = require("../helpers");
const { validateFile } = require("../middlewares");

const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post("/", validateFile, loadFile);

router.get(
  "/:collection/:id",
  [
    check("id", "The ID must be a valid MongoID").isMongoId(),
    check("collection").custom((c) =>
      validCategories(c, ["users", "products"])
    ),
    validateFields,
  ],
  getImage
);

router.put(
  "/:collection/:id",
  [
    check("id", "The ID must be a valid MongoID").isMongoId(),
    check("collection").custom((c) =>
      validCategories(c, ["users", "products"])
    ),
    validateFile,
    validateFields,
  ],
  // uptadeImage
  uptadeImageCloudinary
);

module.exports = router;
