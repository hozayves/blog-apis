const cloudinary = require("../utils/cloudinary");
const path = require("path");
const { BlogModel, validateBlog } = require("../models/blogModel");
const _ = require("lodash");

// Update a blog
const updateBlog = async (req, res) => {
  let blog = await BlogModel.findOne({
    blogger: req.auth._id,
    _id: req.params.id,
  });
  if (!blog) return res.status(404).json({ message: "Blog not found!" });

  blog = await BlogModel.findOneAndUpdate(
    {
      blogger: req.auth._id,
      _id: req.params.id,
    },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({ ok: true, blog });
};
// Function to get a blog based on Id
const getBlog = async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog)
    return res.status(404).json({ ok: false, message: "No blog found!" });

  res.status(200).json({ ok: true, blog });
};
// Function to get all blog
const getAllBlog = async (req, res) => {
  const blogs = await BlogModel.find();

  if (!blogs) {
    return res
      .status(404)
      .json({ ok: false, message: "No blog found! Try again later" });
  }
  res.status(200).json({ ok: true, blogs });
};
// Function to delete a blog/story
const deleteBlog = async (req, res) => {
  const blog = await BlogModel.findOne({
    _id: req.params.id,
    blogger: req.auth._id,
  });
  if (!blog)
    return res.status(400).json({ ok: false, message: "Blog does not exist!" });
  // Blog's file path
  const publicId = blog.image.split("/").pop().split(".")[0];
  cloudinary.uploader.destroy(publicId, async (error, result) => {
    if (error) {
      console.log(error);
      res
        .status(400)
        .json({ ok: false, message: "Error deleting profile image" });
    }
    await blog.deleteOne(); // drop in the mongodb
    res.status(200).json({ ok: true, message: "Blog deleted." });
  });
};

// Function to create a new blog/story
const createNewBlog = async (req, res) => {
  const { error } = validateBlog(req.body); // Validate with Joi endpoint req data us
  if (error)
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });

  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    if (error) {
      console.log(error);
      res
        .status(400)
        .json({ ok: false, message: "Error uploading profile image" });
    }
    let blog = new BlogModel({
      title: req.body.title,
      story: req.body.story,
      tags: req.body.tags.split(" "),
      image: result.url,
      blogger: req.auth._id,
    });
    await blog.save();

    if (!blog)
      return res
        .status(404)
        .json({ ok: false, message: "Blog does not created!" });
    res.status(200).json({ ok: true, blog });
  });
};

module.exports = {
  createNewBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  updateBlog,
};
