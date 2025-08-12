// src/api/authApi.js
import axios from "./axios";

export const login = async (formData) => {
  try {
    // CRITICAL: Log the data here to verify what is being sent.
    console.log("Sending login request with data:", formData);
    
    // Explicitly pass the formData object as the request body.
    const response = await axios.post("/admin/login", formData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axios.get("/admin/refresh");
    return response.data;
  } catch (error) {
    console.error(
      "Refresh token error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post("/admin/logout");
    return true;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post("/admin/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error.response?.data || error.message);
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post("/admin/reset-password", { token, newPassword });
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error.response?.data || error.message);
    throw error;
  }
};
