import { PostModel } from "@/model/postModel"
import { getAccessToken } from "@/utils/accessTokenStorage"

export namespace PostService {

  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/posts' : 'https://firebase-messageboard-api.onrender.com/api/posts'

  export async function postList(): Promise<PostModel[]> {
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
}