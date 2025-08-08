import Blog from "../../models/blog.js";

// @desc    Get all blog posts
// @route   GET /api/posts
// @access  Public
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find(); 
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};
