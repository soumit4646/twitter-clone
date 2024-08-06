import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import {
  createPost,
  deletePost,
  commentOnPost,
  likeUnlikePost,
  getAllPosts,
  getAllLikedPosts,
  getAllFollowingPosts,
  getUserPosts,
} from "../controllers/post.js";

const router = express.Router();

router.get("/all", protectedRoute, getAllPosts);
router.get("/following", protectedRoute, getAllFollowingPosts);
router.get("/likes/:id", protectedRoute, getAllLikedPosts);
router.get("/user/:username", protectedRoute, getUserPosts);
router.post("/create", protectedRoute, createPost);
router.delete("/delete/:id", protectedRoute, deletePost);
router.post("/comment/:id", protectedRoute, commentOnPost);
router.post("/like/:id", protectedRoute, likeUnlikePost);

export default router;
