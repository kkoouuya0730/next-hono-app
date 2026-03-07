export type Post = {
  id: number;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type CreatePostDTO = {
  userId: number;
  content: string;
  imageUrl?: string;
};

export type UpdatePostDTO = {
  postId: number;
  content: string;
  imageUrl?: string;
};
