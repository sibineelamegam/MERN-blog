import Blog from "../../models/blog.js";

// @desc    Get a single blog post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOne({ id }); 
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};
