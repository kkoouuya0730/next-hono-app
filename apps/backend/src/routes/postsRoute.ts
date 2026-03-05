import { Hono } from "hono";
import { CreatePostParam, createPostSchema, UpdatePostParam, updatePostSchema } from "../schemas/postsSchema";
import { BadRequestError, NotFoundError } from "../errors";
import { zValidatorWrapper } from "../validators";
import { PostRepository } from "../repository/postRepository";

export const postsRoute = new Hono();
const postRepository = new PostRepository();

// 投稿一覧取得
postsRoute.get("/", async (c) => {
  const allPosts = await postRepository.findAll();
  return c.json({ success: true, data: allPosts });
});

// 特定の投稿取得
postsRoute.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid postId");
  const post = await postRepository.findById(id);
  if (!post) throw new NotFoundError("Post not found");
  return c.json({ success: true, data: post });
});

// 投稿作成
postsRoute.post("/", zValidatorWrapper(createPostSchema), async (c) => {
  const { userId, content, imageUrl } = c.req.valid("json") as CreatePostParam;
  const newPost = await postRepository.create({ userId, content, imageUrl });
  if (!newPost) throw new BadRequestError("Create Post failed");
  return c.json({ success: true, data: newPost });
});

// 投稿更新
postsRoute.put("/:id", zValidatorWrapper(updatePostSchema), async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid postId");
  const { userId, content, imageUrl } = c.req.valid("json") as UpdatePostParam;
  const updatedPost = await postRepository.update({ postId: id, userId, content, imageUrl });
  if (!updatedPost) throw new NotFoundError("Update Post failed");
  return c.json({ success: true, data: updatedPost });
});

// 投稿削除
postsRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) throw new BadRequestError("Invalid postId");
  const deletedPosts = await postRepository.delete(id);
  if (!deletedPosts) throw new NotFoundError("Delete Post failed");
  return c.json({ success: true });
});
