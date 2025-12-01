import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import { follows as FollowsTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { CreateFollowParam, toggleFollowSchema } from "../schemas/followsSchema";
import { BadRequestError } from "../errors";
import { zValidatorWrapper } from "../validators";

export const followsRoute = new Hono();

// 特定のユーザーのフォローリストを取得する
followsRoute.get("/", async (c) => {
  const userId = Number(c.req.query("userId"));
  if (Number.isNaN(userId)) throw new BadRequestError("Invalid userId");

  const result = await db.select().from(FollowsTable).where(eq(FollowsTable.followerId, userId));
  return c.json({ success: true, data: result });
});

// 特定のユーザーのフォロワーを取得する
followsRoute.get("/followers", async (c) => {
  const userId = Number(c.req.query("userId"));
  if (Number.isNaN(userId)) throw new BadRequestError("Invalid userId");

  const result = await db.select().from(FollowsTable).where(eq(FollowsTable.followingId, userId));
  return c.json({ success: true, data: result });
});

// フォロー/アンフォロー機能
followsRoute.post("/", zValidatorWrapper(toggleFollowSchema), async (c) => {
  const { followerId, followingId } = c.req.valid("json") as CreateFollowParam;

  const existing = await db
    .select()
    .from(FollowsTable)
    .where(and(eq(FollowsTable.followerId, followerId), eq(FollowsTable.followingId, followingId)));

  if (existing.length > 0) {
    await db.delete(FollowsTable).where(eq(FollowsTable.id, existing[0].id));
    return c.json({ success: true });
  }

  await db.insert(FollowsTable).values({ followerId, followingId }).returning();
  return c.json({ success: true });
});
