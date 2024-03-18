const auth = require("../middleware/autherization");
const autherize = require("../middleware/authAdmin");
const express = require("express");
const router = express.Router();
const {
  sendComment,
  deleteComment,
  editComment,
  getCommentByBlog,
} = require("../controllers/comments");

router.post("/:blog", auth, sendComment);
router.delete("/:id", auth, deleteComment);
router.put("/:id", auth, editComment);
router.get("/:id", auth, getCommentByBlog);

module.exports = router;
