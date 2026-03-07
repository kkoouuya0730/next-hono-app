import { Hono } from "hono";
import { createPostSchema, idParamSchema, updatePostSchema } from "../schemas/postsSchema";
import { zValidatorWrapper } from "../validators";
import { PostRepository } from "../repository/postRepository";
import { PostService } from "../service/postService";
import { PostHandler } from "../handler/postHandler";

export const postsRoute = new Hono();
const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postHandler = new PostHandler(postService);

// 投稿一覧取得
postsRoute.get("/", async (c) => postHandler.getPosts(c));

// 特定の投稿取得
postsRoute.get("/:id", zValidatorWrapper(idParamSchema, "param"), async (c) => postHandler.getPost(c));

// 投稿作成
postsRoute.post("/", zValidatorWrapper(createPostSchema), async (c) => postHandler.createPost(c));

// 投稿更新
postsRoute.put("/:id", zValidatorWrapper(idParamSchema, "param"), zValidatorWrapper(updatePostSchema), async (c) =>
  postHandler.updatePost(c),
);

// 投稿削除
postsRoute.delete("/:id", async (c) => postHandler.deletePost(c));
