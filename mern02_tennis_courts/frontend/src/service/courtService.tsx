import { CourtModel } from "@/model/courtModel"
import { ReservationModel } from "@/model/reservationModel"
import { getAccessToken } from "@/utils/accessTokenStorage"

// TODO fix render.com api
export namespace CourtService {

  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/courts' : 'https://...j7i.onrender.com/api/courts'

  export async function courtList(): Promise<CourtModel[]> {
    try {
      const response = await fetch(`${api}`, {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include'
      })

      if(response.status === 403) return []

      return response.json()
    } catch(error) {
      return []
    }
  }

  export async function getCourtReservationsDay(id: string, day: Date): Promise<ReservationModel[]> {
    try {
      const response = await fetch(`${api}/${id}/reservations/${day}`, {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include'
      })

      if(response.status === 403) return []

      return response.json()
    } catch(error) {
      return []
    }
  }
}