// src/context/BlogContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getAllBlogs, getBlogById } from '../api/blogApi';

// Create the context
const BlogContext = createContext();

// Create a custom hook to use the context
export const useBlogs = () => {
  return useContext(BlogContext);
};

// Create the provider component
export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchAllBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (err) {
      setError("Failed to fetch blogs.");
      console.error("Error fetching all blogs:", err);
    } finally {
      setLoading(false);
    }
  }, []); 

  const fetchBlogById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogById(id);
      setSelectedBlog(data);
    } catch (err) {
      setError("Failed to fetch blog post.");
      console.error("Error fetching single blog:", err);
    } finally {
      setLoading(false);
    }
  }, []); 


  const value = {
    blogs,
    selectedBlog,
    loading,
    error,
    fetchAllBlogs,
    fetchBlogById,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};
