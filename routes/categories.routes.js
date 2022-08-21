const { Router } = require("express");
const { check } = require("express-validator");
const { categoryExist } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdmin } = require("../middlewares/validate-role");

const {
  createCategory,
  getCategoryById,
  deleteCategory,
  getAllCategories,
  putCategory,
} = require("../controllers/categories.controller");

const router = Router();

// {{url}}/api/categories

//Get all categories
router.get("/", getAllCategories);

//Get an specific category by ID
router.get(
  "/:id",
  [
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(categoryExist),
    validateFields,
  ],
  getCategoryById
);

//Create category - Private
router.post(
  "/",
  [validateJWT, check("name", "A name is required").isString(), validateFields],
  createCategory
);

//Update category - private
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "name is required").not().isEmpty(),
    check("id").custom(categoryExist),
    validateFields,
  ],
  putCategory
);

//Delete category - Private && ADMIN
router.delete(
  "/:id",
  [
    validateJWT,
    isAdmin,
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(categoryExist),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
