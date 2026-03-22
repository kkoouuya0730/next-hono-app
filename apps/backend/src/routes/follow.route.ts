import { Hono } from "hono";
import { toggleFollowSchema } from "../schemas/follow.schema";
import { zValidatorWrapper } from "../lib/validator/zValidatorWrapper";
import { followHandler } from "../container/follow.container";

export const followsRoute = new Hono();

// 特定のユーザーのフォローリストを取得する
followsRoute.get("/", async (c) => followHandler.getFollow(c));

// 特定のユーザーのフォロワーを取得する
followsRoute.get("/followers", async (c) => followHandler.getFollower(c));

// フォロー/アンフォロー機能
followsRoute.post("/", zValidatorWrapper(toggleFollowSchema), async (c) => followHandler.toggleRelation(c));
