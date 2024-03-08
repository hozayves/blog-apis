const bcrypt = require("bcryptjs");
const _ = require("lodash");
const express = require("express");
const { validateUser, User } = require("../models/user");
const { upload } = require("../middleware/imageStorage");
const path = require("path");
const router = express.Router();
const { unlink } = require("fs").promises;

// Create new user
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ ok: false, message: "User already registered." });

  user = new User(_.pick(req.body, ["name", "email", "gender", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  res.status(200).json({
    ok: true,
    message: `${user.name} created successful.`,
    user: _.pick(user, ["name", "email", "_id"]),
  });
});
// Get a users
router.get("/", async (req, res) => {
  const user = await User.find().select("name email profile gender");
  if (!user)
    return res.status(400).json({ ok: false, message: "User does not exits" });
  if (user.length === 0)
    return res.status(200).json({ ok: true, message: "No user found yet." });

  res.status(200).json({ ok: true, user });
});
// Get a specific user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "name email gender profile"
  );
  if (!user)
    return res
      .status(400)
      .json({ ok: false, message: "A user with the given ID was not found" });

  res.status(200).json({ ok: true, user });
});
// Delete a user
router.delete("/:id", async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (!user)
    return res
      .status(404)
      .json({ ok: false, message: "A user with the given ID was not found" });

  res.status(200).json({ ok: true, message: `${user.name} Deleted!` });
});
// Update a user
router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });

  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .select("name")
      .exec();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    if (!user)
      return res
        .status(404)
        .json({ ok: false, message: "A user with the given ID was not found" });

    res.status(200).json({ ok: true, message: `${user.name} has updated` });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error." });
  }
});

// Update Profile image
router.post("/profile/:id", upload.single("profile"), async (req, res) => {
  if (!req.file)
    // Check if a file does not exist
    return res
      .status(400)
      .json({ ok: false, message: "Profile Image required." });
  // Error handling
  try {
    let user = await User.findOne({ _id: req.params.id }).select("profile");
    if (!user)
      return res
        .status(400)
        .json({ ok: false, message: "A User with a given ID was not found." });

    try {
      // using the fs.promises API, which provide promise-based file operations
      if (user.profile) {
        // Check if user is already has profile image and then delete it in directory
        const filePath = path.join(
          __dirname,
          "../../upload/image",
          user.profile
        );
        await unlink(filePath);
      }

      user.profile = req.file.filename;
      await user.save();

      res.status(200).json({ ok: true, message: "Profile Updated." });
    } catch (error) {
      res.status(400).json({ ok: false, message: error });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error." });
  }
});
// Remove a Profile
router.delete("/profile/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id).select("profile");
    if (!user)
      return res.status(400).json({ ok: false, message: "User not found" });

    try {
      if (user.profile) {
        const filePath = path.join(
          __dirname,
          "../../upload/image",
          user.profile
        );
        await unlink(filePath);
      }

      user.profile = null;
      await user.save();
      res.status(200).json({ ok: true, message: "Profile removed." });
    } catch (error) {
      res.status(400).json({ ok: false, message: error });
      console.log(error);
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
});

module.exports = router;
