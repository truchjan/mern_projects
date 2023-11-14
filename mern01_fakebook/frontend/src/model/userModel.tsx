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
  friendRequests: UserModel[],
  createdAt: Date,
  updatedAt: Date
}