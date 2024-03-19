const express = require("express");
const router = express.Router();
const { likeUnlike, checkLike } = require("../controllers/likeController");
const autherization = require("../middleware/autherization");

router.post("/:id", autherization, likeUnlike);
router.get("/:id", autherization, checkLike);

module.exports = router;
