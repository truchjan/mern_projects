import { UserModel } from "@/model/userModel"
import { PostModel } from "@/model/postModel"

export interface CommentModel {
  _id?: string,
  text: string,
  user: UserModel,
  post: PostModel,
  createdAt: Date,
  updatedAt: Date
}