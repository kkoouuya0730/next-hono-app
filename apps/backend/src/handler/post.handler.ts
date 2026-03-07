import type { Context } from "hono";
import { PostService } from "../service/post.service";
import { CreatePostParam, UpdatePostParam } from "../schemas/post.schema";
import { PostMapper } from "../mappers/post.mapper";

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
    const user = c.get("user");
    const body = (await c.req.json()) as CreatePostParam;
    const createDto = PostMapper.toCreateDTO(Number(user.userId), body);
    const newPost = await this.postService.createPost(createDto);
    return c.json({ success: true, data: newPost });
  }

  async updatePost(c: Context) {
    const id = Number(c.req.param("id"));
    const body = (await c.req.json()) as UpdatePostParam;
    const updateDto = PostMapper.toUpdateDTO(id, body);
    const updatedPost = await this.postService.updatePost(updateDto);
    return c.json({ success: true, data: updatedPost });
  }

  async deletePost(c: Context) {
    const id = Number(c.req.param("id"));
    const result = await this.postService.deletePost(id);
    return c.json({ success: result });
  }
}
