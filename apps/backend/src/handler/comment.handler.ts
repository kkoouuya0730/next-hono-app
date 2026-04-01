import type { Context } from "hono";
import { CommentService } from "../service/comment.service";
import { CreateCommentParam, UpdateCommentParam } from "../schemas/comment.schema";

export class CommentHandler {
  constructor(private commentService: CommentService) {}

  async getCommentByPostId(c: Context) {
    const postId = Number(c.req.param("postId"));
    const result = await this.commentService.getCommentByPostId(Number(postId));
    return c.json({ success: true, data: result });
  }

  async createComment(c: Context) {
    const user = c.get("user");
    const body = (await c.req.json()) as CreateCommentParam;
    const result = await this.commentService.createComment({
      userId: Number(user.userId),
      postId: body.postId,
      content: body.content,
    });
    return c.json({ success: true, data: result });
  }

  async updateComment(c: Context) {
    const commentId = Number(c.req.param("id"));
    const body = (await c.req.json()) as UpdateCommentParam;
    const result = await this.commentService.updateComment(commentId, body.content);
    return c.json({ success: true, data: result });
  }

  async deleteComment(c: Context) {
    const commentId = Number(c.req.param("id"));
    await this.commentService.deleteComment(commentId);
    return c.json({ success: true });
  }
}
