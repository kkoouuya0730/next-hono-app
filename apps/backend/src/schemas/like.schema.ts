import z from "zod";

export const toggleLikesSchema = z.object({
  userId: z.int(),
  postId: z.int(),
});

export type ToggleLikesParam = z.infer<typeof toggleLikesSchema>;
