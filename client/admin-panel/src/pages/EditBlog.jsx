import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as blogApi from "../api/blogApi";
import Swal from "sweetalert2";

function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the blog ID from the URL parameters

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    imageFile: null, // Stores the new File object for upload
  });
  const [currentImageUrl, setCurrentImageUrl] = useState(null); // Stores the URL of the existing image

  const [loading, setLoading] = useState(true); // Initial loading state for fetching blog data
  const [submitting, setSubmitting] = useState(false); // Loading state for form submission
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to fetch blog data by ID
  const fetchBlog = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const blog = await blogApi.getBlogById(id);
      setFormData({
        title: blog.title || "",
        description: blog.description || "",
        content: blog.content || "",
        author: blog.author || "",
        imageFile: null, // Clear any previous file selection
      });
      if (blog.image) {
        setCurrentImageUrl(`http://localhost:5000${blog.image}`); // Set existing image URL
      } else {
        setCurrentImageUrl(null);
      }
    } catch (err) {
      console.error("Failed to fetch blog:", err);
      setError(
        err.response?.data?.message || "Failed to load blog for editing."
      );
      setLoading(false); // Stop loading even on error
      Swal.fire(
        "Error!",
        "Failed to load blog. Please try again.",
        "error"
      ).then(() => {
        navigate("/blogs"); // Redirect back to blog list on fetch error
      });
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  // Fetch blog data when component mounts or ID changes
  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  // Handle changes for text input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle change for file input (new image upload)
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageFile: e.target.files[0] || null, // Get the first selected file
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("description", formData.description);
      dataToSend.append("content", formData.content);
      dataToSend.append("author", formData.author);

      if (formData.imageFile) {
        dataToSend.append("image", formData.imageFile);
      }

      await blogApi.updateBlog(id, dataToSend);
      setSuccess("Blog updated successfully!");
      Swal.fire({
        icon: "success",
        title: "Blog Updated!",
        text: "Your blog post has been updated.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/blogs"); // Redirect to blog management page
      });
    } catch (err) {
      console.error("Failed to update blog:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to update blog.";
      setError(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading blog data...</Typography>
      </Box>
    );
  }

  if (error && !submitting) {
    // Display fetch error only if not currently submitting
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/blogs")}
        >
          Back to Blogs
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Edit Blog Post (ID: {id})
      </Typography>

      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={2}
          />
          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={6}
          />
          <TextField
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Current Blog Image:
            </Typography>
            {currentImageUrl ? ( // Simplified condition
              <Box sx={{ mb: 2 }}>
                <img
                  src={currentImageUrl}
                  alt="Current Blog"
                  style={{
                    maxWidth: "200px",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />
                {/* Removed FormControlLabel and Checkbox for "Remove Current Image" */}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                No current image.
              </Typography>
            )}

            <Typography variant="subtitle1" gutterBottom>
              Upload New Image (Optional):
            </Typography>
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif"
              onChange={handleFileChange}
              style={{ display: "block", paddingBottom: "16px" }}
              // Removed: disabled={removeCurrentImage}
            />
            {formData.imageFile && (
              <Typography variant="body2" color="text.secondary">
                New file selected: {formData.imageFile.name}
              </Typography>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
            disabled={submitting || loading}
          >
            {submitting ? <CircularProgress size={24} /> : "Update Blog"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/blogs")}
            disabled={submitting || loading}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default EditBlog;
