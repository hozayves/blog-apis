const autherization = require("../middleware/autherization");
const authAdmin = require("../middleware/authAdmin");
const _ = require("lodash");
const express = require("express");
const { upload } = require("../middleware/imageStorage");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  updateProfile,
  removeProfile,
  me,
} = require("../controllers/users");
const { User } = require("../models/user");

router.post("/", createUser); // create a user endpoint
router.get("/", [autherization, authAdmin], getUsers); // Get a users endpoint
router.get("/:id", [autherization, authAdmin], getUser); // Get a user based on user
router.delete("/:id", [autherization, authAdmin], deleteUser); // Delete a user endpoint
router.put("/", autherization, updateUser); // Update a user based on auth
router.post(
  "/profile",
  [upload.single("profile"), autherization],
  updateProfile
); // Update user profile image
router.delete("/profile/del", autherization, removeProfile); // Remove a user profile
router.post("/me", autherization, me);
module.exports = router;
