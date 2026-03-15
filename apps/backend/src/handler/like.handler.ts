import type { Context } from "hono";
import { LikeService } from "../service/like.service";
import { LikeMapper } from "../mappers/like.mapper";

export class LikeHandler {
  constructor(private likeService: LikeService) {}

  async getLike(c: Context) {
    const user = c.get("user");
    const postId = Number(c.req.param("postId"));
    const likeDto = LikeMapper.toDTO(user, postId);
    const result = await this.likeService.getLikeByPostId(likeDto);
    return c.json({ success: true, data: result });
  }

  async createLike(c: Context) {
    const user = c.get("user");
    const postId = Number(c.req.param("postId"));
    const likeDto = LikeMapper.toDTO(user, postId);
    const result = await this.likeService.createLike(likeDto);
    return c.json({ success: true, data: result });
  }

  async deleteLike(c: Context) {
    const user = c.get("user");
    const postId = Number(c.req.param("postId"));
    const likeDto = LikeMapper.toDTO(user, postId);
    const result = await this.likeService.deleteLike(likeDto);
    return c.json({ success: result });
  }

  async countLike(c: Context) {
    const postId = Number(c.req.param("postId"));
    const result = await this.likeService.countLike(postId);
    return c.json({ success: true, data: result });
  }
}
