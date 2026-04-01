import { Hono } from "hono";
import { createCommentSchema, updateCommentSchema } from "../schemas/comment.schema";
import { zValidatorWrapper } from "../lib/validator/zValidatorWrapper";
import { commentHandler } from "../container/comment.container";

export const commentsRoute = new Hono();

// 特定の投稿に対するコメント投稿
commentsRoute.post("/", zValidatorWrapper(createCommentSchema), async (c) => commentHandler.createComment(c));

// 特定の投稿に対するコメント一覧
commentsRoute.get("/", async (c) => commentHandler.getCommentByPostId(c));

// コメント更新
commentsRoute.put("/:id", zValidatorWrapper(updateCommentSchema), async (c) => commentHandler.updateComment(c));

// コメント削除
commentsRoute.delete("/:id", async (c) => commentHandler.deleteComment(c));
