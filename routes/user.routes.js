const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, hasRole } = require("../middlewares");

const {
  isValidRole,
  emailExist,
  userExist,
} = require("../helpers/db-validators");

const {
  getUser,
  putUser,
  postUser,
  deleteUser,
  patchUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUser); //No getUser(), only the reference

router.put(
  "/:id" /* <-- Name of the segment sended by the front end */,
  [
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(userExist),
    validateFields,
  ],
  putUser
);

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("password", "name is required").isLength({ min: 6 }),
    check("email").custom(emailExist),
    check("role").custom(isValidRole),
    validateFields, //Middleware that is executed if the .check catch an error
  ],
  postUser
); /* <- Second argument are middlewares if there is a third */

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(userExist),
    validateFields,
  ],
  deleteUser
);

router.patch("/", patchUser);

module.exports = router;
