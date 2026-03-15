import { LikeRepositoryImpl } from "../repository/like.repository";
import { LikeService } from "../service/like.service";
import { LikeHandler } from "../handler/like.handler";

const likeRepository = new LikeRepositoryImpl();
const likeService = new LikeService(likeRepository);
export const likeHandler = new LikeHandler(likeService);
