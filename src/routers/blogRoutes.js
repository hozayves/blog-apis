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
const validObjectId = require("../middleware/validObjectId");

// Create a new blog
router.post("/", upload.single("image"), [auth, authorizeAd], createNewBlog);
// Get all blogs
router.get("/", getAllBlog);
// Get blog based on Id
router.get("/:id", validObjectId, getBlog);
// Delete a blog based on id
router.delete("/:id", [validObjectId, auth, authorizeAd], deleteBlog);
// Update a blog based on Id
router.put("/:id", [validObjectId, auth, authorizeAd], updateBlog);

module.exports = router;
