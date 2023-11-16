import { PostModel } from "@/model/postModel"

export interface UserModel {
  _id?: string,
  name: string,
  email: string,
  imageURL: string,
  userId: string,
  emailVerified: boolean,
  authTime: string,
  about?: string,
  friends: UserModel[],
  friendRequests: {
    timestamp: Date,
    user: UserModel
  }[],
  createdAt: Date,
  updatedAt: Date,
  posts: PostModel[],
  requestedFriends: UserModel[]
}