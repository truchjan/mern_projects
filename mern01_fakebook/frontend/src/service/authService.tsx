export namespace AuthService {

  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth' : 'https://fakebook-api-fj7i.onrender.com/auth'

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