const { Router } = require("express");
const { check } = require("express-validator");
const { Search } = require("../controllers/search.controller");

const router = Router();

router.get("/:collection/:term", Search);

module.exports = router;
