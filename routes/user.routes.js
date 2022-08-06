const { Router } = require("express");
const { check } = require("express-validator");
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
  "/:id",
  putUser
); /* <-- Name of the segment sended by the front end */

router.post(
  "/",
  [check("email", "No valid email").isEmail()],
  postUser
); /* <- Second argument are middlewares if there is a third */

router.delete("/", deleteUser);

router.patch("/", patchUser);

module.exports = router;
