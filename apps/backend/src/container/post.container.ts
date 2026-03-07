import { PostRepositoryImpl } from "../repository/postRepository";
import { PostService } from "../service/postService";
import { PostHandler } from "../handler/postHandler";

const postRepository = new PostRepositoryImpl();
const postService = new PostService(postRepository);
export const postHandler = new PostHandler(postService);
