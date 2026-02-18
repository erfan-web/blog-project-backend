import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { errorResponse } from "../utils/response.js";
import { ZodError } from "zod";

const errorHandler = async (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  if (err instanceof ZodError) {
    const issues = err.issues.map((e) => ({
      path: e.path[0],
      message: e.message,
    }));
    return errorResponse(res, issues, 400);
  }
  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode);
  }
  return errorResponse(res, "something went error", 500);
};

export default errorHandler;
