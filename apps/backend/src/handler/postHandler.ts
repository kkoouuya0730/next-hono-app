import type { Context } from "hono";
import { PostService } from "../service/postService";
import { CreatePostParam, UpdatePostParam } from "../schemas/postsSchema";

export class PostHandler {
  constructor(private postService: PostService) {}

  async getPosts(c: Context) {
    const allPosts = await this.postService.getPosts();
    return c.json({ success: true, data: allPosts });
  }

  async getPost(c: Context) {
    const id = Number(c.req.param("id"));
    const post = await this.postService.getPostById(id);
    return c.json({ success: true, data: post });
  }

  async createPost(c: Context) {
    const body = (await c.req.json()) as CreatePostParam;
    const newPost = await this.postService.createPost(body);
    return c.json({ success: true, data: newPost });
  }

  async updatePost(c: Context) {
    const id = Number(c.req.param("id"));
    const { content, imageUrl } = (await c.req.json()) as UpdatePostParam;
    const updatedPost = await this.postService.updatePost({ postId: id, content, imageUrl });
    return c.json({ success: true, data: updatedPost });
  }

  async deletePost(c: Context) {
    const id = Number(c.req.param("id"));
    const result = await this.postService.deletePost(id);
    return c.json({ success: result });
  }
}
