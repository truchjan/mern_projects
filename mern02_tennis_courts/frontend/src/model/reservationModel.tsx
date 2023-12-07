import { UserModel } from "@/model/userModel"
import { CourtModel } from "@/model/courtModel"

export interface ReservationModel {
  _id?: string,
  from: Date,
  to: Date,
  user: UserModel,
  court: CourtModel,
  createdAt: Date,
  updatedAt: Date
}