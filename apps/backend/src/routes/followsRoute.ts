import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import { follows as FollowsTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { toggleFollowSchema } from "../schemas/followsSchema";

export const followsRoute = new Hono();

followsRoute.get("/", async (c) => {
  try {
    const userId = Number(c.req.query("userId"));
    if (!userId) return c.json({ message: "userId is required" }, 400);

    const result = await db.select().from(FollowsTable).where(eq(FollowsTable.followerId, userId));
    return c.json(result);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch follows" }, 500);
  }
});

followsRoute.get("/followers", async (c) => {
  try {
    const userId = Number(c.req.query("userId"));
    if (!userId) return c.json({ message: "userId is required" }, 400);

    const result = await db.select().from(FollowsTable).where(eq(FollowsTable.followingId, userId));
    return c.json(result);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch followers" }, 500);
  }
});

followsRoute.post(
  "/",
  zValidator("json", toggleFollowSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.issues }, 400);
    }
  }),
  async (c) => {
    try {
      const { followerId, followingId } = c.req.valid("json");

      const existing = await db
        .select()
        .from(FollowsTable)
        .where(and(eq(FollowsTable.followerId, followerId), eq(FollowsTable.followingId, followingId)));

      if (existing.length > 0) {
        await db.delete(FollowsTable).where(eq(FollowsTable.id, existing[0].id));
        return c.json({ following: false });
      }

      await db.insert(FollowsTable).values({ followerId, followingId }).returning();
      return c.json({ following: true });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to follow" }, 500);
    }
  }
);
