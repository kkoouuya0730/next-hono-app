import { z } from "zod";

export const toggleFollowSchema = z.object({
  followerId: z.number(),
  followingId: z.number(),
});

export type CreateFollowParam = z.infer<typeof toggleFollowSchema>;
