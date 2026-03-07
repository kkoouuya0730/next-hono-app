import { CreatePostDTO, UpdatePostDTO } from "../domain/post";
import { CreatePostParam, UpdatePostParam } from "../schemas/postsSchema";

export class PostMapper {
  static toCreateDTO(userId: number, body: CreatePostParam): CreatePostDTO {
    return {
      userId,
      content: body.content,
      imageUrl: body.imageUrl ?? "",
    };
  }
  static toUpdateDTO(id: number, body: UpdatePostParam): UpdatePostDTO {
    return {
      postId: id,
      content: body.content,
      imageUrl: body.imageUrl ?? "",
    };
  }
}
