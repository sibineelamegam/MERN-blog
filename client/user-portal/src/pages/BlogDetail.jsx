import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useBlogs } from "../context/BlogContext";
import { blogDetailStyles } from "../styles/blogDetailStyle";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedBlog, loading, error, fetchBlogById } = useBlogs();

  useEffect(() => {
    if (id) {
      fetchBlogById(id);
    }
  }, [id, fetchBlogById]);

  if (loading) {
    return (
      <Box sx={blogDetailStyles.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={blogDetailStyles.messageBox}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Blogs
        </Button>
      </Box>
    );
  }

  if (!selectedBlog) {
    return (
      <Box sx={blogDetailStyles.messageBox}>
        <Typography variant="h6" color="text.secondary">
          Blog post not found.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Blogs
        </Button>
      </Box>
    );
  }

  return (
    <Container sx={blogDetailStyles.container}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={blogDetailStyles.backButtonTop}
      >
        Back to Blogs
      </Button>
      <Card>
        <CardMedia
          component="img"
          image={`http://localhost:5000${selectedBlog.image}`}
          alt={selectedBlog.title}
          sx={blogDetailStyles.cardMedia}
        />
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            {selectedBlog.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            By: {selectedBlog.author} | Published on:{" "}
            {new Date(selectedBlog.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedBlog.description}
          </Typography>
          <Box sx={blogDetailStyles.contentBox}>
            <Typography
              variant="body1"
              component="div"
              sx={blogDetailStyles.contentTypography}
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default BlogDetail;
