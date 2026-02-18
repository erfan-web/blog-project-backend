import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  data: T,
  message?: string,
  status = 200,
) => {
  res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = <T>(res: Response, error: T, status = 500) => {
  res.status(status).json({
    success: false,
    error,
  });
};
