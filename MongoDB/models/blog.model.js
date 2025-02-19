const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    lowercase: true,
  },
});

const Blogs = mongoose.model("Blogs", blogSchema);
module.exports = Blogs;
