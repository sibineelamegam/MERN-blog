
import Blog from "../../models/blog.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES Modules for file deletion
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Update a blog post
// @route   PUT /api/admin/posts/:id
// @access  Private (admin)
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  // Destructure text fields from req.body (removeImage flag removed)
  const { title, description, content, author } = req.body;

  // --- IMAGE HANDLING START ---
  // req.file is populated by the 'upload.single('image')' Multer middleware
  // If a new file was uploaded, req.file will contain its details.
  const newImagePath = req.file ? `/uploads/${req.file.filename}` : null;
  // --- IMAGE HANDLING END ---

  // Helper function to delete uploaded file from the server's filesystem
  const deleteFileFromServer = (filePath) => {
    // Ensure filePath is a full server path, not just a URL path
    const filename = filePath ? filePath.split('/uploads/')[1] : null;
    const fullServerPath = filename ? path.join(__dirname, '../../uploads', filename) : null;

    if (fullServerPath && fs.existsSync(fullServerPath)) {
      fs.unlink(fullServerPath, (err) => {
        if (err) console.error("Error deleting file from server:", err);
      });
    }
  };

  try {
    const blog = await Blog.findOne({ id });
    if (!blog) {
      // If blog not found, and a new image was uploaded for this non-existent blog, delete it.
      if (newImagePath) {
        deleteFileFromServer(newImagePath);
      }
      return res.status(404).json({ message: "Blog not found" });
    }

    // Prepare fields to update
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (content !== undefined) updates.content = content;
    if (author !== undefined) updates.author = author;

    // Handle image update logic:
    // If a NEW image was uploaded (newImagePath exists),
    // then we replace the old one.
    if (newImagePath) {
      // If there was an old image associated with the blog, delete its file from the server
      if (blog.image) {
        deleteFileFromServer(blog.image);
      }
      // Set the 'image' field in the updates object to the path of the NEWLY uploaded image
      updates.image = newImagePath;
    }
    // IMPORTANT: If newImagePath is null (no new image uploaded),
    // the 'image' field is NOT added to the 'updates' object.
    // This means the existing 'blog.image' value in the database will remain unchanged.


    // Update the blog document in MongoDB
    const updatedBlog = await Blog.findOneAndUpdate(
      { id: id },
      { $set: updates }, // Apply only the fields present in 'updates'
      { new: true, runValidators: true } // 'new: true' returns the updated document
    );

    if (!updatedBlog) {
      // This case should ideally be caught by the initial findOne, but as a safeguard
      if (newImagePath) {
        deleteFileFromServer(newImagePath); // Delete newly uploaded file if DB update fails
      }
      return res.status(404).json({ message: "Blog not found after update attempt" });
    }

    res.status(200).json({ message: "Blog updated", blog: updatedBlog });
  } catch (err) {
    console.error("Update error:", err);
    // If an error occurs during DB save, delete any newly uploaded file
    if (newImagePath) {
      deleteFileFromServer(newImagePath);
    }
    res.status(500).json({ message: "Failed to update blog" });
  }
};
