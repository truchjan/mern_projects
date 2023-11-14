export namespace AuthService {

  // TODO - change to deployed render web service
  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth' : 'https://firebase-messageboard-api.onrender.com/auth'

  export async function validateUser(token: string) {
    const response = await fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      credentials: 'include'
    })

    return response.json()
  }
}