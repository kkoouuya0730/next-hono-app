import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import { posts, users } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { createPostSchema, updatePostSchema } from "../schemas/postsSchema";

export const postsRoute = new Hono();

postsRoute.get("/", async (c) => {
  try {
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
    return c.json(allPosts);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

postsRoute.get("/:id", async (c) => {
  const id = c.req.param("id");

  try {
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

    if (post.length === 0) return c.json({ message: "Post not found" }, 404);

    return c.json(post[0]);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

postsRoute.post(
  "/",
  zValidator("json", createPostSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.issues }, 400);
    }
  }),
  async (c) => {
    try {
      const { userId, content, imageUrl } = c.req.valid("json");
      const newPost = await db
        .insert(posts)
        .values({
          userId,
          content,
          imageUrl,
        })
        .returning();

      if (newPost.length === 0) return c.json({ message: "Post not found" }, 404);

      return c.json({ post: newPost[0] });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to create post" }, 500);
    }
  }
);

postsRoute.put(
  "/:id",
  zValidator("json", updatePostSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.issues }, 400);
    }
  }),
  async (c) => {
    const id = c.req.param("id");

    try {
      const { userId, content, imageUrl } = c.req.valid("json");
      const updatedPosts = await db
        .update(posts)
        .set({
          userId,
          content,
          imageUrl,
        })
        .where(eq(posts.id, Number(id)))
        .returning();

      if (updatedPosts.length === 0) return c.json({ message: "Post not found" }, 404);

      return c.json({ post: updatedPosts[0] });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to update post" }, 500);
    }
  }
);

postsRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const deletedPosts = await db
      .delete(posts)
      .where(eq(posts.id, Number(id)))
      .returning();

    if (deletedPosts.length === 0) return c.json({ message: "Post not found" }, 404);

    return c.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete post" }, 500);
  }
});
