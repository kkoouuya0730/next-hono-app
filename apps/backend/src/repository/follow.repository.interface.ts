import { Follow, FollowDTO } from "../domain/follow";

export interface FollowRepository {
  findByFollowerId(followerId: number): Promise<Follow[] | null>;
  findByFollowingId(followingId: number): Promise<Follow[] | null>;
  findRelation({ followerId, followingId }: FollowDTO): Promise<Follow | null>;
  create({ followerId, followingId }: FollowDTO): Promise<Follow[]>;
  delete(id: number): Promise<Follow[]>;
}
