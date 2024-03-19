const { BlogModel } = require("../models/blogModel");

const likeUnlike = async (req, res) => {
  let likes = await BlogModel.findById(req.params.id).select("likes");
  if (!likes)
    return res.status(400).json({ ok: false, message: "No blog found" });

  // Checking if the user has already liked the blog
  const existingLikeIndex =
    req.auth._id &&
    likes.likes.findIndex((like) => like.user.equals(req.auth._id));

  if (existingLikeIndex !== -1) {
    // If the user has already liked the blog, remove the like
    likes.likes.splice(existingLikeIndex, 1);
  } else {
    // If the user hasn't liked the item yet, add the like
    likes.likes.push({ user: req.auth._id });
  }
  await likes.save();
  res.json({ ok: true, likes });
};

const checkLike = async (req, res) => {
  // Ensure req.auth is defined and req.auth._id exists
  const userId = req.auth && req.auth._id;
  const blogLike = await BlogModel.findById(req.params.id).select("likes");
  if (!blogLike)
    return res.status(400).json({ ok: false, message: "No blog found" });

  // Check if the user has already liked the blog
  const isLiked =
    userId && blogLike.likes.some((like) => like.user.equals(req.auth._id));
  // Calculate the link count
  const likeCount = blogLike.likes.length;

  res
    .status(200)
    .json({ ok: true, likeCount, isLiked: userId ? !!isLiked : false });
};

module.exports = { likeUnlike, checkLike };
