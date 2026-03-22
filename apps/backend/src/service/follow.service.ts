import { Follow, FollowDTO } from "../domain/follow";
import { NotFoundError } from "../lib/errors";
import { FollowRepository } from "../repository/follow.repository.interface";

export class FollowService {
  constructor(private followRepository: FollowRepository) {}

  async getFollowByFollowerId(followerId: number): Promise<Follow[]> {
    const follow = await this.followRepository.findByFollowerId(followerId);
    if (!follow) throw new NotFoundError("Follow not found");
    return follow;
  }

  async getFollowByFollowingId(followingId: number): Promise<Follow[]> {
    const follow = await this.followRepository.findByFollowingId(followingId);
    if (!follow) throw new NotFoundError("Follow not found");
    return follow;
  }

  async toggleRelation({ followerId, followingId }: FollowDTO): Promise<{ followed: boolean }> {
    const existing = await this.followRepository.findRelation({ followerId, followingId });

    if (existing) {
      await this.followRepository.delete(existing.id);
      return { followed: false }; // 状態返すと便利
    }

    await this.followRepository.create({ followerId, followingId });
    return { followed: true };
  }
}
