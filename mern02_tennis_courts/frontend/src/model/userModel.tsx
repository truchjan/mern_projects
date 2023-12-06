// TODO přidat reservations: ReservationModel[]
export interface UserModel {
  _id?: string,
  name: string,
  email: string,
  imageURL: string,
  userId: string,
  emailVerified: boolean,
  authTime: string,
  createdAt: Date,
  updatedAt: Date
}