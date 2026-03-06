import { Hono } from "hono";
import { CreatePostParam, createPostSchema, UpdatePostParam, updatePostSchema } from "../schemas/postsSchema";
import { BadRequestError } from "../errors";
import { zValidatorWrapper } from "../validators";
import { PostRepository } from "../repository/postRepository";
import { PostService } from "../service/postService";

export const postsRoute = new Hono();
const postRepository = new PostRepository();
const postService = new PostService(postRepository);

// 投稿一覧取得
postsRoute.get("/", async (c) => {
  const allPosts = await postService.getPosts();
  return c.json({ success: true, data: allPosts });
});

// 特定の投稿取得
postsRoute.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid postId");
  const post = await postService.getPostById(id);
  return c.json({ success: true, data: post });
});

// 投稿作成
postsRoute.post("/", zValidatorWrapper(createPostSchema), async (c) => {
  const { userId, content, imageUrl } = c.req.valid("json") as CreatePostParam;
  const newPost = await postService.createPost({ userId, content, imageUrl });
  return c.json({ success: true, data: newPost });
});

// 投稿更新
postsRoute.put("/:id", zValidatorWrapper(updatePostSchema), async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid postId");
  const { content, imageUrl } = c.req.valid("json") as UpdatePostParam;
  const updatedPost = await postService.updatePost({ postId: id, content, imageUrl });
  return c.json({ success: true, data: updatedPost });
});

// 投稿削除
postsRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid postId");
  const result = await postService.deletePost(id);
  return c.json({ success: result });
});
