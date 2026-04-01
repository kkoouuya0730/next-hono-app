export type Comment = {
  id: number;
  userId: number;
  postId: number;
  content: string;
};

export type CommentDTO = {
  userId: number;
  postId: number;
  content: string;
};
