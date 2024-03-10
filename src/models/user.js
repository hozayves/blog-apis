const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  profile: {
    type: String,
    default: null,
  },
  region: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this.id, admin: this.admin, email: this.email },
    config.get("jwtPrivateKey"),
    { algorithm: "HS256" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().required().email(),
    gender: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = { validateUser, User };
