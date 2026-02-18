import { Router } from "express";
import {
  getComments,
  createComment,
  getCommentsByPostId,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, getComments);
router.get("/post/:postId", verifyToken, getCommentsByPostId);
router.post("/", verifyToken, createComment);

export default router;
