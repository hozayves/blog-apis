const { BlogModel } = require("../models/blogModel");
const {
  validateComment,
  Comment,
  validateCommentUpdate,
} = require("../models/comment");
const _ = require("lodash");

// Function to send a comment
const sendComment = async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error)
      return res
        .status(400)
        .json({ ok: false, message: error.details[0].message });

    let comment = new Comment({
      comment: req.body.comment,
      user: req.body.userId,
      blog: req.body.blogId,
    });
    await comment.save();

    res.status(200).json({ ok: true, comment });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
// Function to delete a comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).select("_id");
    if (!comment)
      return res
        .status(400)
        .json({ ok: false, message: "No comment found with ID" });

    const deletedComment = await Comment.deleteOne({ _id: comment._id }).select(
      "comment"
    );
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
// Function to edit a comment
const editComment = async (req, res) => {
  try {
    const { error } = validateCommentUpdate(req.body);
    if (error)
      return res
        .status(400)
        .json({ ok: false, message: error.details[0].message });
    let comment = await Comment.findById(req.params.id).select("comment");
    if (!comment)
      return res
        .status(400)
        .json({ ok: false, message: "No Comment found from Id provided" });
    comment.comment = req.body.comment;
    comment.edited = true;
    await comment.save();

    res.status(200).json({ ok: true, comment });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
// Function to get all comments
const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find().populate("blog");
    if (comments.length === 0)
      return res.status(400).json({ ok: false, message: "No Comment found!" });

    res.status(200).json({ ok: true, comments });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
// Function to get comment based on Blog
const getCommentByBlog = async (req, res) => {
  try {
    console.log(typeof req.params.id);
    const comments = await Comment.find({ blog: req.params.id });
    if (comments.length === 0)
      return res.status(400).json({ ok: false, message: "No comment Found!" });

    res.status(200).json({ ok: true, comments });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
// Export controller functions
module.exports = {
  sendComment,
  deleteComment,
  editComment,
  getAllComment,
  getCommentByBlog,
};
