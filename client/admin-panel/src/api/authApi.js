import axios from "./axios";

export const login = async (email, username, password) => {
  try {
    const response = await axios.post("/admin/login", {
      email,
      username,
      password,
    });
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
