export type Post = {
  id: number;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type CreatePostInput = {
  userId: number;
  content: string;
  imageUrl?: string | null;
};

export type UpdatePostInput = CreatePostInput & { postId: number };
