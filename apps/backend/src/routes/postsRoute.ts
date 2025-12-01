import { Hono } from "hono";
import { db } from "../db";
import { posts, users } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { CreatePostParam, createPostSchema, UpdatePostParam, updatePostSchema } from "../schemas/postsSchema";
import { BadRequestError, NotFoundError } from "../errors";
import { zValidatorWrapper } from "../validators";

export const postsRoute = new Hono();

// 投稿一覧取得
postsRoute.get("/", async (c) => {
  const allPosts = await db
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
    .leftJoin(users, eq(posts.userId, users.id))
    .orderBy(desc(posts.createdAt));
  return c.json({ success: true, data: allPosts });
});

// 特定の投稿取得
postsRoute.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid postId");

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
    .where(eq(posts.id, Number(id)))
    .leftJoin(users, eq(posts.userId, users.id))
    .limit(1);

  if (post.length === 0) throw new NotFoundError("Post not found");

  return c.json({ success: true, data: post[0] });
});

// 投稿作成
postsRoute.post("/", zValidatorWrapper(createPostSchema), async (c) => {
  const { userId, content, imageUrl } = c.req.valid("json") as CreatePostParam;
  const newPost = await db
    .insert(posts)
    .values({
      userId,
      content,
      imageUrl,
    })
    .returning();

  if (newPost.length === 0) throw new BadRequestError("Create Post failed");

  return c.json({ success: true, data: newPost[0] });
});

// 投稿更新
postsRoute.put("/:id", zValidatorWrapper(updatePostSchema), async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid postId");

  const { userId, content, imageUrl } = c.req.valid("json") as UpdatePostParam;
  const updatedPosts = await db
    .update(posts)
    .set({
      userId,
      content,
      imageUrl,
    })
    .where(eq(posts.id, Number(id)))
    .returning();

  if (updatedPosts.length === 0) throw new NotFoundError("Update Post failed");

  return c.json({ success: true, data: updatedPosts[0] });
});

// 投稿削除
postsRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid postId");

  const deletedPosts = await db
    .delete(posts)
    .where(eq(posts.id, Number(id)))
    .returning();

  if (deletedPosts.length === 0) throw new NotFoundError("Delete Post failed");

  return c.json({ success: true });
});
