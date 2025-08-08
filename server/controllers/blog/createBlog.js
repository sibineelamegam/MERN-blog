
import Blog from "../../models/blog.js";
import fs from 'fs'; 

// @desc    Create a new blog post
// @route   POST /api/admin/posts
// @access  Private (admin only)
export const createBlog = async (req, res) => {
  // Destructure text fields from req.body
  const { title, description, content, author } = req.body;

  // --- IMAGE HANDLING START ---
  // req.file is populated by the 'upload.single('image')' Multer middleware
  // If a file was uploaded, req.file will contain its details.
  // req.file.filename is the unique name Multer gave it in the 'uploads' folder.
 const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  // --- IMAGE HANDLING END ---

  // Helper function to delete uploaded file in case of error
  const deleteUploadedFile = (filePath) => {
    // Construct the full path to the file on the server's file system
    // This assumes your backend root is the current working directory when server starts
    // We need to strip the /uploads/ prefix from imagePath to get the filename
    const filename = filePath ? filePath.split('/uploads/')[1] : null;
    const fullFilePath = filename ? `./uploads/${filename}` : null;

    if (fullFilePath && fs.existsSync(fullFilePath)) {
      fs.unlink(fullFilePath, (err) => {
        if (err) console.error("Error deleting uploaded file:", err);
      });
    }
  };

  // Validate input
  if (!title || !description || !content || !author) {
    // If a file was uploaded but other fields are missing, delete the file
    deleteUploadedFile(imagePath); // Use the imagePath derived
    return res.status(400).json({ message: "Title, description, content, and author are required" });
  }

  try {
    // Optional: Check for duplicate title
    const existing = await Blog.findOne({ title });
    if (existing) {
      // If a file was uploaded but title exists, delete the file
      deleteUploadedFile(imagePath);
      return res.status(409).json({ message: "Blog with this title already exists" });
    }

    // Create and save blog, including the imagePath
    const blog = new Blog({
      title,
      description,
      content,
      author,
      image: imagePath, // THIS IS WHERE THE IMAGE PATH IS SAVED TO MONGODB
    });
    await blog.save();

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error("Error creating blog:", err);
    // If an error occurs during DB save, delete the uploaded file
    deleteUploadedFile(imagePath);
    res.status(500).json({ message: "Failed to create blog" });
  }
};
