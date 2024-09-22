const Blog = require("../models/blogModel");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create({ ...req.body });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog" });
  }
};

const getBlogByid = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);

    if (blog) {
      res.status(200).json(blog); // Fixed typo from 'car' to 'blog'
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId }, // Fixed typo from 'blogrId' to 'blogId'
      { ...req.body },
      { new: true }
    );
    if (updatedBlog) {
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating blog" });
  }
};

const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findOneAndDelete({ _id: blogId }); // Added 'await' here

    if (blog) {
      res.status(200).json({ message: "Blog deleted successfully" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByid,
  updateBlog,
  deleteBlog,
};
