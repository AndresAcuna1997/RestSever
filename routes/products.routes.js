const { Router } = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  modifyProduct,
} = require("../controllers/products.controller");
const {
  categoryExist,
  producExistByName,
  producExistById,
} = require("../helpers/db-validators");
const { validateJWT, isAdmin } = require("../middlewares");

const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("/", getAllProducts);

router.get(
  "/:id",
  [
    check("id", "No valid mongo ID").isMongoId(),
    check("id").custom(producExistById),
    validateFields,
  ],
  getProductById
);

router.post(
  "/",
  [
    validateJWT,
    isAdmin,
    check("name", "Product name is required").isString(),
    check("name").custom(producExistByName),
    check("state", "State for the product is required").isBoolean(),
    check("price", "Price for the product is required").isNumeric(),
    check("description", "A description is required").isString(),
    check("category", "No valid mongo ID").isMongoId(),
    check("category").custom(categoryExist),
    validateFields,
  ],
  createProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No valid mongo ID").isMongoId(),
    check("id").custom(producExistById),
    isAdmin,
    validateFields,
  ],
  deleteProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No valid mongo ID").isMongoId(),
    check("id").custom(producExistById),
    isAdmin,
    validateFields,
  ],
  modifyProduct
);

module.exports = router;
