import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import { posts, users } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { createPostSchema } from "../schemas/postsSchema";

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
      return c.json({ post: newPost[0] });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to create post" }, 500);
    }
  }
);
