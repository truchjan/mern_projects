import { getAccessToken } from "@/utils/accessTokenStorage"
import { CourtService } from "@/service/courtService"

// TODO fix onrender site
export namespace ReservationService {

  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/reservations' : 'https://....onrender.com/api/reservations'

  export async function createReservation(userId: string, courtNumber: number, from: Date, to: Date): Promise<Response> {

    let courtId = ""
    await CourtService.courtDetailByNumber(courtNumber).then(item => courtId = item?._id!)

    const data = {from: from, to: to, user: userId, court: courtId}

    const response = await fetch(`${api}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      credentials: 'include',
      body: JSON.stringify(data)}
    )

    return response
  }

  // export async function updateReservation(reservation: ReservationModel, reservationId: string): Promise<ReservationModel | null> {
  //   try {
  //     const response = await fetch(`${api}/${reservationId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${getAccessToken()}`
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify(reservation)}
  //     )

  //     if(response.status === 403) return null

  //     return response.json()
  //   } catch(error) {
  //     return null
  //   }
  // }

  // export async function deleteReservation(reservationId: string) {
  //   try {
  //     await fetch(`${api}/${reservationId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${getAccessToken()}`
  //       },
  //       credentials: 'include'
  //     })

  //   } catch(error) {
  //     return
  //   }
  // }
}