import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { postSchema } from "../schemas/posts.js";

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await prisma.post.findMany({});
    return successResponse(res, posts, undefined, 200);
  } catch (err) {
    next(err);
  }
};

export const searchPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const term = req.query.term as string;
    const limit = Number(req.query.limit) || 5;
    if (!term) return errorResponse(res, "Search term is required", 400);
    const results = await prisma.post.findMany({
      where: {
        OR: [{ title: { contains: term } }, { content: { contains: term } }],
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
      take: limit,
    });
    return successResponse(res, results, undefined, 200);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    if (!id) return errorResponse(res, "Invalid post ID", 400);

    const post = await prisma.post.findUnique({
      where: { id: id },
      select: {
        title: true,
        description: true,
        content: true,
        imageUrl: true,
        createdAt: true,

        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return successResponse(res, post, undefined, 200);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = postSchema.safeParse(req.body);
    if (!result.success) {
      throw result.error;
    }
    const { imageUrl, title, content, description } = result.data;
    const user = req.user!;
    const posts = await prisma.post.create({
      data: {
        ...(imageUrl && { imageUrl }),
        title,
        description,
        content,
        authorId: user.id,
      },
    });
    return successResponse(res, posts, "Post created successfully", 200);
  } catch (err) {
    next(err);
  }
};
