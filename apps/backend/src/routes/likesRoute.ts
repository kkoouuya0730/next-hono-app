import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import { likes as LikesTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { toggleLikesSchema } from "../schemas/likesSchema";

export const likesRoute = new Hono();

likesRoute.get("/", async (c) => {
  try {
    const postId = Number(c.req.query("postId"));
    if (!postId) return c.json({ message: "postId is required" }, 400);

    const result = await db.select().from(LikesTable).where(eq(LikesTable.postId, postId));
    return c.json(result);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch likes" }, 500);
  }
});

likesRoute.post(
  "/",
  zValidator("json", toggleLikesSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.issues }, 400);
    }
  }),
  async (c) => {
    try {
      const { userId, postId } = c.req.valid("json");

      const existing = await db
        .select()
        .from(LikesTable)
        .where(and(eq(LikesTable.postId, postId), eq(LikesTable.userId, userId)));

      if (existing.length > 0) {
        await db.delete(LikesTable).where(eq(LikesTable.id, existing[0].id));
        return c.json({ liked: false });
      }

      await db.insert(LikesTable).values({ postId, userId }).returning();
      return c.json({ liked: true });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to like post" }, 500);
    }
  }
);
