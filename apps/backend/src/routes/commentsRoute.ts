import { Hono } from "hono";
import { comments as CommentsTable, users as UserTable } from "../db/schema";
import { db } from "../db";
import {
  CreateCommentParam,
  createCommentSchema,
  UpdateCommentParam,
  updateCommentSchema,
} from "../schemas/commentsSchema";
import { desc, eq } from "drizzle-orm";
import { BadRequestError, NotFoundError } from "../errors";
import { zValidatorWrapper } from "../validators";

export const commentsRoute = new Hono();

// 特定の投稿に対するコメント投稿
commentsRoute.post("/", zValidatorWrapper(createCommentSchema), async (c) => {
  const { userId, postId, content } = c.req.valid("json") as CreateCommentParam;
  const comments = await db.insert(CommentsTable).values({ userId, postId, content }).returning();

  return c.json({ success: true, data: comments[0] });
});

// 特定の投稿に対するコメント一覧
commentsRoute.get("/", async (c) => {
  const postId = Number(c.req.param("postId"));
  if (Number.isNaN(postId)) throw new BadRequestError("Invalid postId");

  const comments = await db
    .select({
      id: CommentsTable.id,
      postId: CommentsTable.postId,
      createdAt: CommentsTable.createdAt,
      user: {
        id: UserTable.id,
        username: UserTable.username,
        avatarUrl: UserTable.avatarUrl,
      },
      content: CommentsTable.content,
    })
    .from(CommentsTable)
    .leftJoin(UserTable, eq(CommentsTable.userId, UserTable.id))
    .where(eq(CommentsTable.postId, postId))
    .orderBy(desc(CommentsTable.createdAt));

  if (comments.length === 0) throw new NotFoundError("Comments not found");

  return c.json({ success: true, data: comments });
});

// コメント更新
commentsRoute.put("/:id", zValidatorWrapper(updateCommentSchema), async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid commentId");

  const { content } = c.req.valid("json") as UpdateCommentParam;
  const updatedComment = await db
    .update(CommentsTable)
    .set({ content })
    .where(eq(CommentsTable.id, Number(id)))
    .returning();

  if (updatedComment.length === 0) throw new NotFoundError("Comment not found");

  return c.json({ success: true, data: updatedComment[0] });
});

// コメント削除
commentsRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  if (Number.isNaN(id)) throw new BadRequestError("Invalid commentId");

  const deletedComment = await db
    .delete(CommentsTable)
    .where(eq(CommentsTable.id, Number(id)))
    .returning();

  if (deletedComment.length === 0) throw new NotFoundError("Comment not found");

  return c.json({ success: true });
});
