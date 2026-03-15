import { createDb } from "../db";
import { Like, LikeDTO } from "../domain/like";
import { eq, and } from "drizzle-orm";
import { LikeRepository } from "./like.repository.interface";
import { likes } from "../db/schema";

export class LikeRepositoryImpl implements LikeRepository {
  async find({ postId, userId }: LikeDTO): Promise<Like | null> {
    const db = createDb();
    const result = await db
      .select()
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)))
      .limit(1);
    return result[0];
  }

  async create({ postId, userId }: LikeDTO): Promise<Like> {
    const db = createDb();
    const result = await db.insert(likes).values({ postId, userId }).returning();
    return result[0];
  }

  async delete({ postId, userId }: LikeDTO): Promise<boolean> {
    const db = createDb();
    const result = await db.delete(likes).where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
    return result.length > 0;
  }

  async count(postId: number): Promise<number> {
    const db = createDb();
    const result = await db.select().from(likes).where(eq(likes.postId, postId));
    return result.length;
  }
}
