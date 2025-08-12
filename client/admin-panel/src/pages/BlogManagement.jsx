
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as blogApi from "../api/blogApi"; 
import Swal from "sweetalert2"; 


function BlogManagement() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch blogs from the backend
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogApi.getAllBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError(err.response?.data?.message || "Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch blogs when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handler for navigating to the Create Blog page
  const handleCreateNew = () => {
    navigate("/create");
  };

  // Handler for navigating to the Edit Blog page
  const handleEdit = (blogId) => {
    navigate(`/edit/${blogId}`);
  };

  // Handler for deleting a blog post
  const handleDelete = async (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await blogApi.deleteBlog(blogId);
          Swal.fire("Deleted!", "Your blog has been deleted.", "success");
          fetchBlogs(); // Refresh the list after deletion
        } catch (err) {
          console.error("Failed to delete blog:", err);
          Swal.fire(
            "Error!",
            err.response?.data?.message || "Failed to delete blog.",
            "error"
          );
        }
      }
    });
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
        <Typography sx={{ ml: 2 }}>Loading blogs...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom component="h1">
        Blog Management
      </Typography>

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Create New Blog
        </Button>
      </Box>

      {blogs.length === 0 ? (
        <Alert severity="info">
          No blogs found. Start by creating a new one!
        </Alert>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="blog posts table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Image</TableCell>
                {/* ADDED: Table header for Image */}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow
                  key={blog.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {blog.id}
                  </TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {blog.description}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {blog.content}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {/* ADDED: Table cell for Image */}
                    {blog.image ? (
                      <img
                        src={`http://localhost:5000${blog.image}`} // Construct full image URL
                        alt={blog.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        No Image
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(blog.id)}
                      aria-label={`edit ${blog.title}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(blog.id)}
                      aria-label={`delete ${blog.title}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default BlogManagement;
