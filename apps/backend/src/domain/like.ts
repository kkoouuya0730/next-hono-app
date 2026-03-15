export type Like = {
  id: number;
  postId: number;
  userId: number;
  createdAt: Date;
};

export type LikeDTO = {
  postId: number;
  userId: number;
};
