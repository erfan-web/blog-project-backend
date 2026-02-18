import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyToken, getMe);

export default router;
