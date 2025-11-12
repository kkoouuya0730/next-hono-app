import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { comments as CommentsTable, users as UserTable } from "../db/schema";
import { db } from "../db";
import { createCommentSchema, updateCommentSchema } from "../schemas/commentsSchema";
import { desc, eq } from "drizzle-orm";

export const commentsRoute = new Hono();

commentsRoute.post(
  "/",
  zValidator("json", createCommentSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.issues }, 400);
    }
  }),
  async (c) => {
    const { userId, postId, content } = c.req.valid("json");
    const posts = await db.insert(CommentsTable).values({ userId, postId, content }).returning();

    return c.json({ post: posts[0] });
  }
);

commentsRoute.get("/", async (c) => {
  const postId = c.req.query("postId");
  if (!postId) return c.text("Invalid PostId", 400);
  try {
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
      .where(eq(CommentsTable.postId, Number(postId)))
      .orderBy(desc(CommentsTable.createdAt));

    if (comments.length === 0) {
      return c.text("Failed to Fetch comments", 404);
    }

    return c.json({ comments });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch comments" }, 500);
  }
});

commentsRoute.put(
  "/:id",
  zValidator("json", updateCommentSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.issues }, 400);
    }
  }),
  async (c) => {
    const id = c.req.param("id");
    try {
      const { content } = c.req.valid("json");
      const updatedComment = await db
        .update(CommentsTable)
        .set({ content })
        .where(eq(CommentsTable.id, Number(id)))
        .returning();
      if (updatedComment.length === 0) {
        return c.text("Failed to Update comments", 404);
      }
      return c.json(updatedComment);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to Update comments" }, 500);
    }
  }
);

commentsRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const deletedComment = await db
      .delete(CommentsTable)
      .where(eq(CommentsTable.id, Number(id)))
      .returning();
    if (deletedComment.length === 0) {
      return c.json({ message: "Failed to Delete comment" }, 404);
    }
    return c.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to Delete comment" }, 500);
  }
});
