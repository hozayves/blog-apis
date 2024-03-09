const express = require("express");
const router = express.Router();
const {
  sendComment,
  deleteComment,
  editComment,
  getAllComment,
  getCommentByBlog,
} = require("../controllers/comments");

router.post("/", sendComment);
router.delete("/:id", deleteComment);
router.put("/:id", editComment);
router.get("/", getAllComment);
router.get("/:id", getCommentByBlog);

module.exports = router;
