import { createDb } from "../db";
import { posts, users } from "../db/schema";
import { Post } from "../domain/post";
import { desc, eq } from "drizzle-orm";
import { CreatePostParam, UpdatePostParam } from "../schemas/postsSchema";

export class PostRepository {
  async findAll(): Promise<Post[] | null> {
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
      .leftJoin(users, eq(posts.userId, users.id))
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
      .where(eq(posts.id, Number(id)))
      .leftJoin(users, eq(posts.userId, users.id))
      .limit(1);

    return result[0] ?? null;
  }

  async create({ userId, content, imageUrl }: CreatePostParam): Promise<Post> {
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

  async update({ postId, userId, content, imageUrl }: UpdatePostParam): Promise<Post> {
    const db = createDb();

    const result = await db
      .update(posts)
      .set({
        userId,
        content,
        imageUrl,
      })
      .where(eq(posts.id, Number(postId)))
      .returning();

    return result[0];
  }

  async delete(id: number): Promise<boolean> {
    const db = createDb();

    const result = await db
      .delete(posts)
      .where(eq(posts.id, Number(id)))
      .returning();

    return result.length > 0;
  }
}
