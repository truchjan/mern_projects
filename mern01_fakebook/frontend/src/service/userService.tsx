import { PostModel } from "@/model/postModel"
import { UserModel } from "@/model/userModel"
import { getAccessToken } from "@/utils/accessTokenStorage"

export namespace UserService {

  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/users' : 'https://fakebook-api-fj7i.onrender.com/api/users'

  export async function userList(): Promise<UserModel[]> {
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

  export async function getUserPosts(id: string): Promise<PostModel[]> {
    try {
      const response = await fetch(`${api}/${id}/posts`, {
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

  export async function sendFriendRequest(senderId: string, recieverId: string): Promise<UserModel | null> {
    try {
      const response = await fetch(`${api}/sendfriendrequest/${senderId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        body: JSON.stringify({user: recieverId})}
      )

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function cancelFriendRequest(senderId: string, recieverId: string): Promise<UserModel | null> {
    try {
      const response = await fetch(`${api}/cancelfriendrequest/${senderId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        body: JSON.stringify({user: recieverId})}
      )

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function acceptFriendRequest(senderId: string, recieverId: string): Promise<UserModel | null> {
    try {
      const response = await fetch(`${api}/acceptfriendrequest/${senderId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        body: JSON.stringify({user: recieverId})}
      )

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function rejectFriendRequest(senderId: string, recieverId: string): Promise<UserModel | null> {
    try {
      const response = await fetch(`${api}/rejectfriendrequest/${senderId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        body: JSON.stringify({user: recieverId})}
      )

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function removeFriend(senderId: string, recieverId: string): Promise<UserModel | null> {
    try {
      const response = await fetch(`${api}/removefriend/${senderId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        body: JSON.stringify({user: recieverId})}
      )

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }
}