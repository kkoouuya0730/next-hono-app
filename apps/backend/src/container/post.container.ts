import { PostRepositoryImpl } from "../repository/post.repository";
import { PostService } from "../service/post.service";
import { PostHandler } from "../handler/post.handler";

const postRepository = new PostRepositoryImpl();
const postService = new PostService(postRepository);
export const postHandler = new PostHandler(postService);
