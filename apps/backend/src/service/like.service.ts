import { Like, LikeDTO } from "../domain/like";
import { NotFoundError } from "../lib/errors";
import { LikeRepository } from "../repository/like.repository.interface";

export class LikeService {
  constructor(private likeRepository: LikeRepository) {}

  async getLikeByPostId({ postId, userId }: LikeDTO): Promise<Like> {
    const like = await this.likeRepository.find({ postId, userId });
    if (!like) throw new NotFoundError("Like not found");
    return like;
  }

  async createLike({ postId, userId }: LikeDTO): Promise<Like> {
    return await this.likeRepository.create({ userId, postId });
  }

  async deleteLike({ postId, userId }: LikeDTO): Promise<boolean> {
    const result = await this.likeRepository.delete({ postId, userId });
    if (!result) throw new NotFoundError("Delete Like failed");
    return result;
  }

  async countLike(postId: number): Promise<number> {
    return await this.likeRepository.count(postId);
  }
}
