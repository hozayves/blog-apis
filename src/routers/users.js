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

module.exports = router;
