// src/pages/CreateBlog.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as blogApi from '../api/blogApi'; 
import Swal from 'sweetalert2'; // For success/error notifications

function CreateBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    image: null, // To store the selected file object (File object)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle changes for text input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle change for file input
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0] || null, // Get the first selected file
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create FormData object to send both text and file data
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('description', formData.description);
      dataToSend.append('content', formData.content);
      dataToSend.append('author', formData.author);
      if (formData.image) {
        dataToSend.append('image', formData.image); // Append the File object if selected
      }

      await blogApi.createBlog(dataToSend);
      setSuccess('Blog created successfully!');
      Swal.fire({
        icon: 'success',
        title: 'Blog Created!',
        text: 'Your new blog post has been published.',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/blogs'); // Redirect to blog management page
      });
    } catch (err) {
      console.error('Failed to create blog:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create blog.';
      setError(errorMessage);
      Swal.fire('Error!', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3,mt:4 }}>
      <Typography variant="h6" gutterBottom component="h1">
        Create New Blog Post
      </Typography>

      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <form onSubmit={handleSubmit} autoComplete="on">
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
              Blog Image (Optional)
            </Typography>
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif" // Specify accepted file types
              onChange={handleFileChange}
              style={{ display: 'block', paddingBottom: '16px' }}
            />
            {formData.image && (
              <Typography variant="body2" color="text.secondary">
                Selected file: {formData.image.name}
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
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Blog'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate('/blogs')}
            disabled={loading}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default CreateBlog;
