import { CreatePostDTO, Post, UpdatePostDTO } from "../domain/post";
import { NotFoundError } from "../errors";
import { PostRepository } from "../repository/postRepository";

export class PostService {
  constructor(private postRepository: PostRepository) {}

  async getPosts(): Promise<Post[]> {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundError("Post not found");
    return post;
  }

  async createPost({ userId, content, imageUrl }: CreatePostDTO): Promise<Post> {
    const newPost = await this.postRepository.create({ userId, content, imageUrl });
    return newPost;
  }

  async updatePost({ postId, content, imageUrl }: UpdatePostDTO): Promise<Post> {
    const updatedPost = await this.postRepository.update({ postId, content, imageUrl });
    if (!updatedPost) throw new NotFoundError("Post not found");
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    if (!result) throw new NotFoundError("Delete Post failed");
    return result;
  }
}
