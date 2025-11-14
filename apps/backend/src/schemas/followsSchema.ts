import { z } from "zod";

export const toggleFollowSchema = z.object({
  followerId: z.number(),
  followingId: z.number(),
});
