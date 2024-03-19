const { BlogModel } = require("../models/blogModel");
const {
  validateComment,
  Comment,
  validateCommentUpdate,
} = require("../models/comment");
const _ = require("lodash");

// Function to send a comment
const sendComment = async (req, res) => {
  const { error } = validateComment(req.body);
  if (error)
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });

  let comment = new Comment({
    comment: req.body.comment,
    user: req.auth._id,
    blog: req.params.blog,
  });
  await comment.save();

  res.status(200).json({ ok: true, comment });
};
// Function to delete a comment
const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id).select("_id");
  if (!comment)
    return res
      .status(400)
      .json({ ok: false, message: "No comment found with ID" });

  const deletedComment = await Comment.deleteOne({ _id: comment._id }).select(
    "comment"
  );
  res.status(200).json({ ok: true, message: "Deleted successfuly" });
};
// Function to edit a comment
const editComment = async (req, res) => {
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
};

// Function to get comment based on Blog
const getCommentByBlog = async (req, res) => {
  const comments = await Comment.find({ blog: req.params.id })
    .populate("user", "name image profile")
    .sort({ createdAt: -1 });
  if (!comments)
    return res.status(400).json({ ok: false, message: "No comment Found!" });

  res.status(200).json({ ok: true, comments });
};
// Export controller functions
module.exports = {
  sendComment,
  deleteComment,
  editComment,
  getCommentByBlog,
};
