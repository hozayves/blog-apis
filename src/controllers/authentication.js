require("dotenv").config();
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const asyncHandler = require("express-async-errors");
const { User } = require("../models/user");

const authentication = asyncHandler(async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error)
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ ok: false, message: "Invalid email or password" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ ok: false, message: "Invalid email or password" });

  const token = user.generateAuthToken();

  res.header("blog-auth-token", token).status(200).json({ ok: true, token });
});

module.exports = authentication;

// Authentication validation
function validateAuth(auth) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(auth);
}
