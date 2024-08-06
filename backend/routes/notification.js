import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import {
  getAllNotifications,
  deleteAllNotifications,
} from "../controllers/notification.js";

const router = express.Router();

router.get("/", protectedRoute, getAllNotifications);
router.delete("/", protectedRoute, deleteAllNotifications);

export default router;
