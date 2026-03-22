import { FollowRepositoryImpl } from "../repository/follow.repository";
import { FollowService } from "../service/follow.service";
import { FollowHandler } from "../handler/follow.handler";

const followRepository = new FollowRepositoryImpl();
const followService = new FollowService(followRepository);
export const followHandler = new FollowHandler(followService);
