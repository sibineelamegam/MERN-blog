import express from "express";
import { createBlog } from "../controllers/blog/createBlog.js";
import { getAllBlogs } from "../controllers/blog/getAllBlogs.js";
import { getSingleBlog } from "../controllers/blog/getSingleBlog.js";
import { updateBlog } from "../controllers/blog/updateBlog.js";
import { deleteBlog } from "../controllers/blog/deleteBlog.js";
import verifyJwt from "../middleware/verifyJwt.js";
import verifyRole from "../middleware/verifyRole.js";
import upload from "../middleware/image.js";

const router = express.Router();

// Public routes
router.get("/posts", getAllBlogs);
router.get("/posts/:id", getSingleBlog);

// Admin routes
router.post("/posts", verifyJwt, verifyRole("admin"), upload, createBlog);
router.put("/posts/:id", verifyJwt, verifyRole("admin"), upload, updateBlog);
router.delete("/posts/:id", verifyJwt, verifyRole("admin"), deleteBlog);

export default router;
