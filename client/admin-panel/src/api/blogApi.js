import axios from "./axios";

export const getAllBlogs = async () => {
  try {
    const response = await axios.get("/posts");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all blogs:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching blog with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};


export const createBlog = async (formData) => {
  try {
    // Axios automatically sets 'Content-Type': 'multipart/form-data' when sending FormData
    const response = await axios.post("/posts", formData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating blog:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateBlog = async (id, formData) => {

  try {
    // Axios automatically sets 'Content-Type': 'multipart/form-data' when sending FormData
    const response = await axios.put(`/posts/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating blog with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    await axios.delete(`/posts/${id}`);
    return true;
  } catch (error) {
    console.error(
      `Error deleting blog with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
