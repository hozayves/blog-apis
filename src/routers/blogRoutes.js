const auth = require("../middleware/autherization");
const authorizeAd = require("../middleware/authAdmin");
const express = require("express");
const router = express.Router();
const {
  createNewBlog,
  getAllBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");
const { upload } = require("../middleware/imageStorage");

// Create a new blog
router.post("/", upload.single("image"), [auth, authorizeAd], createNewBlog);
// Get all blogs
router.get("/", getAllBlog);
// Get blog based on Id
router.get("/:id", getBlog);
// Delete a blog based on id
router.delete("/:id", [auth, authorizeAd], deleteBlog);
// Update a blog based on Id
router.put("/:id", [auth, authorizeAd], updateBlog);

module.exports = router;
