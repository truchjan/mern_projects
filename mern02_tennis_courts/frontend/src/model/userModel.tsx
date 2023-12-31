import { ReservationModel } from "@/model/reservationModel"

export interface UserModel {
  _id?: string,
  name: string,
  email: string,
  imageURL: string,
  userId: string,
  emailVerified: boolean,
  authTime: string,
  createdAt: Date,
  updatedAt: Date,
  reservations: ReservationModel[]
}