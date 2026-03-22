import type { Context } from "hono";
import { FollowService } from "../service/follow.service";
import { CreateFollowParam } from "../schemas/follow.schema";

export class FollowHandler {
  constructor(private followService: FollowService) {}

  async getFollow(c: Context) {
    const user = c.get("user");
    const result = await this.followService.getFollowByFollowerId(Number(user.userId));
    return c.json({ success: true, data: result });
  }

  async getFollower(c: Context) {
    const user = c.get("user");
    const result = await this.followService.getFollowByFollowingId(Number(user.userId));
    return c.json({ success: true, data: result });
  }

  async toggleRelation(c: Context) {
    const { followerId, followingId } = (await c.req.json()) as CreateFollowParam;

    const result = await this.followService.toggleRelation({ followerId, followingId });

    return c.json({
      success: true,
      data: result,
    });
  }
}
