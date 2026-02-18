import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";
import { Request, Response, NextFunction, Express } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const { jwtSecret } = config;

/* ------------- Types ------------- */

interface AuthPayload {
  userId: number;
  role: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        role: string;
      };
    }
  }
}
/* ------------- End Types ------------- */

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new AppError("You must be logged in to access this resource.", 401);
    }
    const payload = jwt.verify(token, jwtSecret) as AuthPayload;
    if (!payload) {
      throw new AppError("Invalid token. Please log in again.", 401);
    }
    const { userId } = payload;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, role: true },
    });
    if (!user) {
      throw new AppError("User not found. Please login again.", 401);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user && req.user.role !== "ADMIN") {
      throw new AppError("Not authorized as an admin", 403);
    }
    next();
  } catch (err) {
    next(err)
  }
};
