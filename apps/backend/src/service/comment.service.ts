import { Comment, CommentDTO } from "../domain/comment";
import { NotFoundError } from "../lib/errors";
import { CommentRepository } from "../repository/comment.repository.interface";

export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async getCommentByPostId(postId: number): Promise<Comment[]> {
    const comment = await this.commentRepository.findById(postId);
    if (!comment) throw new NotFoundError("Follow not found");
    return comment;
  }

  async createComment({ userId, postId, content }: CommentDTO): Promise<Comment> {
    const comment = await this.commentRepository.create({ userId, postId, content });
    return comment;
  }

  async updateComment(id: number, content: string): Promise<Comment> {
    const comment = await this.commentRepository.update(id, content);
    return comment;
  }

  async deleteComment(id: number): Promise<Comment> {
    const comment = await this.commentRepository.delete(id);
    return comment;
  }
}
