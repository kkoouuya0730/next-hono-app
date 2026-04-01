import { CommentHandler } from "../handler/comment.handler";
import { CommentRepositoryImpl } from "../repository/comment.repository";
import { CommentService } from "../service/comment.service";

const commentRepository = new CommentRepositoryImpl();
const commentService = new CommentService(commentRepository);
export const commentHandler = new CommentHandler(commentService);
