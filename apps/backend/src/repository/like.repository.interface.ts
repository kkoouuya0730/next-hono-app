import { Like, LikeDTO } from "../domain/like";

export interface LikeRepository {
  find({ postId, userId }: LikeDTO): Promise<Like | null>;
  create({ postId, userId }: LikeDTO): Promise<Like>;
  delete({ postId, userId }: LikeDTO): Promise<boolean>;
  count(postId: number): Promise<number>;
}
