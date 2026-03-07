import z from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
export type IdParam = z.infer<typeof idParamSchema>;

export const createPostSchema = z.object({
  content: z.string(),
  imageUrl: z.string().nullable().optional(),
});
export type CreatePostParam = z.infer<typeof createPostSchema>;

export const updatePostSchema = createPostSchema;
export type UpdatePostParam = z.infer<typeof updatePostSchema>;
