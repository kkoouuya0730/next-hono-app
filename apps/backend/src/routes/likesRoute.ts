import { Hono } from "hono";
import { createDb } from "../db";
import { likes as LikesTable, posts, users } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { ToggleLikesParam, toggleLikesSchema } from "../schemas/likesSchema";
import { BadRequestError, NotFoundError } from "../errors";
import { zValidatorWrapper } from "../validators";

export const likesRoute = new Hono();

// 特定の投稿に対するいいね一覧取得
likesRoute.get("/", async (c) => {
  const db = createDb();

  const postId = Number(c.req.query("postId"));
  if (Number.isNaN(postId)) throw new BadRequestError("Invalid postId");

  const post = await db
    .select({
      id: posts.id,
      content: posts.content,
      imageUrl: posts.imageUrl,
      createdAt: posts.createdAt,
      user: {
        id: users.id,
        username: users.username,
        avatarUrl: users.avatarUrl,
      },
    })
    .from(posts)
    .where(eq(posts.id, Number(postId)))
    .leftJoin(users, eq(posts.userId, users.id))
    .limit(1);

  if (post.length === 0) throw new NotFoundError("Post not found");

  const likes = await db.select().from(LikesTable).where(eq(LikesTable.postId, postId));

  if (likes.length === 0) throw new NotFoundError("This post has not received any likes.");

  return c.json({ success: true });
});

// いいね機能
likesRoute.post("/", zValidatorWrapper(toggleLikesSchema), async (c) => {
  const db = createDb();

  const { userId, postId } = c.req.valid("json") as ToggleLikesParam;

  const post = await db
    .select({
      id: posts.id,
      content: posts.content,
      imageUrl: posts.imageUrl,
      createdAt: posts.createdAt,
      user: {
        id: users.id,
        username: users.username,
        avatarUrl: users.avatarUrl,
      },
    })
    .from(posts)
    .where(eq(posts.id, Number(postId)))
    .leftJoin(users, eq(posts.userId, users.id))
    .limit(1);

  if (post.length === 0) throw new NotFoundError("Post not found");

  const isLiked = await db
    .select()
    .from(LikesTable)
    .where(and(eq(LikesTable.postId, postId), eq(LikesTable.userId, userId)));

  if (isLiked.length > 0) {
    await db.delete(LikesTable).where(eq(LikesTable.id, isLiked[0].id));
    return c.json({ success: true });
  }

  await db.insert(LikesTable).values({ postId, userId }).returning();
  return c.json({ success: true });
});
