import { Comment, CommentDTO } from "../domain/comment";

export interface CommentRepository {
  findById(postId: number): Promise<Comment[] | null>;
  create({ userId, postId, content }: CommentDTO): Promise<Comment>;
  update(id: number, content: string): Promise<Comment>;
  delete(id: number): Promise<Comment>;
}
