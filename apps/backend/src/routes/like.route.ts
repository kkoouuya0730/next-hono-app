import { Hono } from "hono";
import { likeHandler } from "../container/like.container";

export const likesRoute = new Hono();

// いいね取得
likesRoute.get("/:postId/likes", async (c) => likeHandler.getLike(c));

// いいね数取得
likesRoute.get("/:postId/likes/count", async (c) => likeHandler.countLike(c));

// いいね機能
likesRoute.post("/:postId/likes", async (c) => likeHandler.createLike(c));

// いいね解除
likesRoute.delete("/:postId/likes", async (c) => likeHandler.deleteLike(c));
