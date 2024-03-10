const express = require("express");
const authentication = require("../controllers/authentication");
const router = express.Router();

router.post("/", authentication);

module.exports = router;
