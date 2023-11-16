import { UserModel } from "@/model/userModel"
import { CommentModel } from "@/model/commentModel"

export interface PostModel {
  _id?: string,
  text: string,
  user?: UserModel,
  likes: UserModel[],
  createdAt: Date,
  updatedAt: Date,
  comments: CommentModel[],
  commentCount: number
}