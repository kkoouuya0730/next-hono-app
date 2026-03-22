import { createDb } from "../db";
import { eq, and } from "drizzle-orm";
import { follows } from "../db/schema";
import { FollowRepository } from "./follow.repository.interface";
import { Follow, FollowDTO } from "../domain/follow";

export class FollowRepositoryImpl implements FollowRepository {
  async findByFollowerId(followerId: number): Promise<Follow[] | null> {
    const db = createDb();
    const result = await db.select().from(follows).where(eq(follows.followerId, followerId));
    return result;
  }

  async findByFollowingId(followingId: number): Promise<Follow[] | null> {
    const db = createDb();
    const result = await db.select().from(follows).where(eq(follows.followingId, followingId));
    return result;
  }

  async findRelation({ followerId, followingId }: FollowDTO): Promise<Follow | null> {
    const db = createDb();
    const result = await db
      .select()
      .from(follows)
      .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));

    return result[0] ?? null;
  }

  async create({ followerId, followingId }: FollowDTO): Promise<Follow[]> {
    const db = createDb();
    const result = await db.insert(follows).values({ followerId, followingId }).returning();
    return result;
  }
  async delete(id: number): Promise<Follow[]> {
    const db = createDb();
    return db.delete(follows).where(eq(follows.id, id));
  }
}
