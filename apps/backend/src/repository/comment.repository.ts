import { createDb } from "../db";
import { desc, eq } from "drizzle-orm";

import { comments as CommentsTable } from "../db/schema";
import { CommentRepository } from "./comment.repository.interface";
import { Comment, CommentDTO } from "../domain/comment";

export class CommentRepositoryImpl implements CommentRepository {
  async findById(postId: number): Promise<Comment[] | null> {
    const db = createDb();
    const result = await db
      .select()
      .from(CommentsTable)
      .where(eq(CommentsTable.postId, postId))
      .orderBy(desc(CommentsTable.createdAt));
    return result;
  }

  async create({ userId, postId, content }: CommentDTO): Promise<Comment> {
    const db = createDb();
    const result = await db.insert(CommentsTable).values({ userId, postId, content }).returning();
    return result[0];
  }

  async update(id: number, content: string): Promise<Comment> {
    const db = createDb();
    const result = await db
      .update(CommentsTable)
      .set({ content })
      .where(eq(CommentsTable.id, Number(id)))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<Comment> {
    const db = createDb();
    const result = await db
      .delete(CommentsTable)
      .where(eq(CommentsTable.id, Number(id)))
      .returning();
    return result[0];
  }
}
