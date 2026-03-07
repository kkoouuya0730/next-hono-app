import { createDb } from "../db";
import { posts } from "../db/schema";
import { CreatePostDTO, Post, UpdatePostDTO } from "../domain/post";
import { desc, eq } from "drizzle-orm";

export class PostRepository {
  async findAll(): Promise<Post[]> {
    const db = createDb();
    const result = await db
      .select({
        id: posts.id,
        content: posts.content,
        imageUrl: posts.imageUrl,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        userId: posts.userId,
      })
      .from(posts)
      .orderBy(desc(posts.createdAt));
    return result;
  }

  async findById(id: number): Promise<Post | null> {
    const db = createDb();
    const result = await db
      .select({
        id: posts.id,
        content: posts.content,
        imageUrl: posts.imageUrl,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        userId: posts.userId,
      })
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async create({ userId, content, imageUrl }: CreatePostDTO): Promise<Post> {
    const db = createDb();
    const result = await db
      .insert(posts)
      .values({
        userId,
        content,
        imageUrl,
      })
      .returning();
    return result[0];
  }

  async update({ postId, content, imageUrl }: UpdatePostDTO): Promise<Post | null> {
    const db = createDb();
    const result = await db
      .update(posts)
      .set({
        content,
        imageUrl,
      })
      .where(eq(posts.id, postId))
      .returning();
    return result[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const db = createDb();
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();
    return result.length > 0;
  }
}
