import { ReservationModel } from "@/model/reservationModel"

export interface CourtModel {
  _id?: string,
  number: number,
  createdAt: Date,
  updatedAt: Date,
  reservations: ReservationModel[]
}