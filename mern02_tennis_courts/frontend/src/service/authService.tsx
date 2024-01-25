export namespace AuthService {

  // TODO fix render.com api
  const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth' : 'https://tennis-courts-api.onrender.com/auth'

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