const { BlogModel } = require("../models/blogModel");

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!blog) return res.status(404).json({ message: "Blog not found!" });

    res.status(200).json({ ok: true, message: "Updated", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a blog
const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id, req.body);

    if (!blog) {
      return res.status(404).json({ ok: false, message: "No blog found!" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all blog
const getAllBlog = async (req, res) => {
  try {
    const blogs = await BlogModel.find({});

    if (!blogs) {
      return res
        .status(404)
        .json({ ok: false, message: "No blog found! Try again later" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndDelete(id, req.body);

    if (!blog)
      return res.status(404).json({ ok: false, message: "No blog found!" });

    res.status(200).json({ ok: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog
const createNewBlog = async (req, res) => {
  try {
    const blog = await BlogModel.create(req.body);

    if (!blog) {
      return res
        .status(404)
        .json({ ok: false, message: "Blog does not create!" });
    }
    res.status(200).json({ ok: true, message: "Created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  updateBlog,
};
