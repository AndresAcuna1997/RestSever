const { Router } = require("express");
const {
  getUser,
  putUser,
  postUser,
  deleteUser,
  patchUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUser); //No getUser(), only the reference

router.put("/:id", putUser); /* <-- Name of the segment sended by the front end */

router.post("/", postUser);

router.delete("/", deleteUser);

router.patch("/", patchUser);

module.exports = router;
