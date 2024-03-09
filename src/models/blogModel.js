const Joi = require("joi");
const mongoose = require("mongoose");
const { User } = require("../models/user");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      lowercase: true,
      trim: true,
    },
    story: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      lowercase: true,
      trim: true,
      maxlength: 20,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);

function validateBlog(blog) {
  const schema = Joi.object({
    title: Joi.string().required().max(255),
    story: Joi.string().required().max(10240),
    tags: Joi.string().required().max(20),
    image: Joi.required(),
  });
  return schema.validate(blog);
}

module.exports = {
  BlogModel,
  validateBlog,
  blogSchema,
};
