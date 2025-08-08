// src/pages/BlogList.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Alert,
  Button,
} from "@mui/material";
import { useBlogs } from "../context/BlogContext";
import { blogListStyles } from "../styles/blogListStyle";

function BlogList() {
  const { blogs, loading, error, fetchAllBlogs } = useBlogs();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`);
  };

  if (loading) {
    return (
      <Box sx={blogListStyles.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={blogListStyles.container}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={blogListStyles.container}>
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        sx={blogListStyles.title}
      >
        Our Latest Blogs
      </Typography>
      {blogs.length === 0 && !loading && (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={blogListStyles.noBlogsText}
        >
          No blogs found.
        </Typography>
      )}
      <Box sx={blogListStyles.blogListBox}>
        {blogs.map((blog) => (
          <Card key={blog._id} sx={blogListStyles.blogCard}>
            <CardMedia
              component="img"
              height="200"
              image={`http://localhost:5000${blog.image}`}
              alt={blog.title}
              sx={blogListStyles.cardMedia}
            />
            <CardContent sx={blogListStyles.cardContent}>
              <Typography gutterBottom variant="h5" component="div">
                {blog.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {blog.description}
              </Typography>
            </CardContent>

            <Box sx={blogListStyles.cardButtonBox}>
              <Button
                variant="contained"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(blog.id);
                }}
              >
                View Blog
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default BlogList;
