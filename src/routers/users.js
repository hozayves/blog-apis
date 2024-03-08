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

module.exports = router;
