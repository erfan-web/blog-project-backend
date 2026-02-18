import z from "zod";

export const commentSchema = z.object({
  content: z.string("Content is required").min(10).max(200),
  postId: z.coerce.number("Post Id is required"),
});
