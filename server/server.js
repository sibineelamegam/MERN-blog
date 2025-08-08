import express from "express";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";

dotenv.config(); // load env variables into process.env

const app = express(); // create Express app
const PORT = process.env.PORT || 5000; // use env port or fallback

connectDB(); // connect to MongoDB

const __filename = fileURLToPath(import.meta.url); // full path of the current file
const __dirname = path.dirname(__filename); //  directory name of the current file

// === Global Middleware ===
app.use(cors(corsOptions)); // allow frontend domains to access server
app.use(express.json()); // parse incoming JSON in requests
app.use(cookieParser()); // enable parsing of cookies

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// === Routes ===
app.use("/api/admin", userRoutes);
app.use("/api", blogRoutes);

// === Health Check ===
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is up and running" });
});

// === 404 Handler ===
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// === Start the Server ===
app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
