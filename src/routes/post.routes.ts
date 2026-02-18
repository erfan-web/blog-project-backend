import { Router } from "express";
import {
  getPosts,
  getPost,
  createPost,
  searchPosts,
} from "../controllers/post.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, getPosts);
router.get("/single/:id", verifyToken, getPost);
router.get("/search", verifyToken, searchPosts);
router.post("/", verifyToken, isAdmin, createPost);

export default router;
