import Blog from "../../models/blog.js";

const validateBlogId = (id) => /^b\d+$/.test(id);

// @desc    Delete a blog post
// @route   DELETE /api/admin/posts/:id
// @access  Private (admin)
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  // Validate ID format before DB query
  if (!validateBlogId(id)) {
    return res.status(400).json({ message: "Invalid blog ID format" });
  }

  try {
    const deleted = await Blog.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};
