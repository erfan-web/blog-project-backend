import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { successResponse } from "../utils/response.js";
import { commentSchema } from "../schemas/comments.js";

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comments = await prisma.comment.findMany({});
    return successResponse(res, comments, undefined, 200);
  } catch (err) {
    next(err);
  }
};

export const getCommentsByPostId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = Number(req.params.postId);

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return successResponse(res, comments, undefined, 200);
  } catch (err) {
    next(err);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = commentSchema.safeParse(req.body);
    if (!result.success) {
      throw result.error;
    }

    const { content, postId } = result.data;
    const user = req.user!;

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId: user.id,
      },
    });

    return successResponse(res, comment, "Comment created", 201);
  } catch (err) {
    next(err);
  }
};
