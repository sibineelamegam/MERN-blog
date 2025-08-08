import express from "express";
import { loginUser } from "../controllers/user/login.js";
import { handleRefreshToken } from "../controllers/user/refresh.js";
import { logoutUser } from "../controllers/user/logout.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);
router.post("/logout", logoutUser);

export default router;
