import { PostModel } from "@/model/postModel"
import { UserModel } from "@/model/userModel"
import { getAccessToken } from "@/utils/accessTokenStorage"

export namespace UserService {

  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/users' : 'https://firebase-messageboard-api.onrender.com/api/users'

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

  // TODO - update user details

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
}