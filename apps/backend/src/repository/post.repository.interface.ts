import { CreatePostDTO, Post, UpdatePostDTO } from "../domain/post";

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findById(id: number): Promise<Post | null>;
  create({ userId, content, imageUrl }: CreatePostDTO): Promise<Post>;
  update({ postId, content, imageUrl }: UpdatePostDTO): Promise<Post | null>;
  delete(id: number): Promise<boolean>;
}
