import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllBlogs = async () => {
  try {
    const response = await API.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await API.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single blog:", error);
    throw error;
  }
};
