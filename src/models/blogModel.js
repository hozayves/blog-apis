const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    story: { type: String, required: true },
    tags: { type: [String], default: [] },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = {
  BlogModel,
};
