import z from "zod";

export const createCommentSchema = z.object({
  userId: z.int(),
  postId: z.int(),
  content: z.string().min(1, "コメント内容を入力してください"),
});

export const updateCommentSchema = createCommentSchema.pick({ content: true });

export type CreateCommentParam = z.infer<typeof createCommentSchema>;
export type UpdateCommentParam = z.infer<typeof updateCommentSchema>;
