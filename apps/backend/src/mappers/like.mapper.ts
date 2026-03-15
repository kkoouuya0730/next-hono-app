import { LikeDTO } from "../domain/like";
import { BadRequestError } from "../lib/errors";

export class LikeMapper {
  static toDTO(user: { userId: string; email?: string } | undefined, postId: number): LikeDTO {
    if (!user) throw new BadRequestError("user is undefined");
    const userId = Number(user.userId);
    if (!Number.isInteger(userId)) throw new BadRequestError("UserId is invalid");
    if (!Number.isInteger(postId)) throw new BadRequestError("postId is invalid");
    return {
      userId,
      postId,
    };
  }
}
