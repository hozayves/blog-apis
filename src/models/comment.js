const Joi = require("joi");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const { BlogModel } = require("../models/blogModel");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
      comment: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
      replies: {
        type: Array,
        default: [],
      },
      edited: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
);

function validateComment(comment) {
  const schema = Joi.object({
    comment: Joi.string().required(),
  });
  return schema.validate(comment);
}
function validateCommentUpdate(comment) {
  const schema = Joi.object({
    comment: Joi.string().required(),
  });
  return schema.validate(comment);
}

module.exports = { validateComment, Comment, validateCommentUpdate };
