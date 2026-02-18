import z from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is so long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is so long"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(2000, "Content is so long"),
  imageUrl: z.string("Invalid image URL").optional(),
});
