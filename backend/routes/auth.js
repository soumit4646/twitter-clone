import express from "express";
import { login, logout, signup, getUser } from "../controllers/auth.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/user", protectedRoute, getUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
