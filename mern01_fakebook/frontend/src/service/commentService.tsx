import { CommentModel } from "@/model/commentModel"
import { getAccessToken } from "@/utils/accessTokenStorage"

export namespace CommentService {

  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/comments' : 'https://fakebook-api-fj7i.onrender.com/api/comments'

  export async function createComment(userId: string, postId: string, comment: CommentModel): Promise<CommentModel | null> {
    const data = {text: comment.text, user: userId, post: postId}
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

  export async function updateComment(comment: CommentModel, commentId: string): Promise<CommentModel | null> {
    try {
      const response = await fetch(`${api}/${commentId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        body: JSON.stringify(comment)}
      )

      if(response.status === 403) return null

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function deleteComment(commentId: string) {
    try {
      await fetch(`${api}/${commentId}`, {
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