import { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.js";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { successResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const { jwtSecret, nodeEnv } = config;
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      throw result.error;
    }
    const { email, name, password } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError("User already exists", 409);
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    successResponse(res, undefined, "User registered successfully", 201);
  } catch (err) {
    console.error("Error registering user:", err);
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      throw result.error;
    }

    const { email, password } = result.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      throw new AppError("email or password invalid", 401);
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new AppError("email or password invalid", 401);
    }

    const { id, role } = existingUser;
    const token = jwt.sign({ userId: id, role }, jwtSecret, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return successResponse(res, undefined, "Logged in successfully", 200);
  } catch (err) {
    console.log("Error logining user:", err);
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return successResponse(res, undefined, "Logged out successfully", 200);
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return successResponse(res, req.user, undefined, 200);
  } catch (err) {
    next(err);
  }
};
