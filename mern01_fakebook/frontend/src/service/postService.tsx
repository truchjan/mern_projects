import { PostModel } from "@/model/postModel"
import { getAccessToken } from "@/utils/accessTokenStorage"

export namespace PostService {

  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/posts' : 'https://firebase-postboard-api.onrender.com/api/posts'

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

  export async function createPost(userId: string, post: PostModel): Promise<PostModel | null> {
    const data = {text: post.text, user: userId}
    try {
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

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function updatePost(post: PostModel, postId: string): Promise<PostModel | null> {
    try {
      const response = await fetch(`${api}/${postId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        body: JSON.stringify(post)}
      )

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function deletePost(postId: string) {
    try {
      await fetch(`${api}/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include'
      })

    } catch(error) {
      return
    }
  }
}