import z from "zod";

export const createPostSchema = z.object({
  userId: z.int(),
  content: z.string(),
  imageUrl: z.string().nullable().optional(),
});
