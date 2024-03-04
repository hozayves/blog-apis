const express = require("express");
const router = express.Router();
const {
  createNewBlog,
  getAllBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

// Create a new blog
router.post("/", createNewBlog);
// Get all blogs
router.get("/", getAllBlog);
// Get blog based on Id
router.get("/:id", getBlog);
// Delete a blog based on id
router.delete("/:id", deleteBlog);
// Update a blog based on Id
router.put("/:id", updateBlog);

module.exports = router;
