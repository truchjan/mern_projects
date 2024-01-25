import { ReservationModel } from "@/model/reservationModel"
import { UserModel } from "@/model/userModel"
import { getAccessToken } from "@/utils/accessTokenStorage"

export namespace UserService {

  // todo fix render site name
  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/users' : 'https://tennis-courts-api.onrender.com/api/users'

  export async function userDetail(id: string): Promise<UserModel | null> {
    try {
      const response = await fetch(`${api}/${id}`, {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include'
      })

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function updateUser(user: UserModel, userId: string): Promise<UserModel | null> {
    try {
      const response = await fetch(`${api}/${userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        body: JSON.stringify(user)}
      )

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function getUserReservations(id: string): Promise<ReservationModel[]> {
    try {
      const response = await fetch(`${api}/${id}/reservations`, {
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