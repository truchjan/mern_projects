import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { createContext, useState, useEffect } from "react"
import { AuthService } from "@/service/authService"
import { setAccessToken } from "@/utils/accessTokenStorage"
import { app } from "@/config/firebaseConfig"

// IMPORTANT NOTES:
// localStorage('loggedIn') is 'false' or 'true' and keeps record if user is logged in and should try to authenticate when page is reloaded
// state authenticeted keeps record if logged user was authenticeted and accessToken exists -> can use endpoints
// localStorage is kept when page is reloaded, state is not !!

type AuthContextProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  authenticated: boolean | null,
  loggedUserId: string | null,
  loggedUserImageURL: string | null,
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  setLoggedUserId: React.Dispatch<React.SetStateAction<string>>,
  setLoggedUserImageURL: React.Dispatch<React.SetStateAction<string>>,
  loginWithGoogle: () => Promise<void>,
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>,
  registerWithEmailAndPassword: (email: string, password: string) => Promise<void>,
  sendPasswordReset: (email: string) => Promise<void>,
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {

  const [authenticated, setAuthenticated] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState('')
  const [loggedUserImageURL, setLoggedUserImageURL] = useState('')

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  // this will run on every load and reaload of any page - will try to get access token if user is logged in
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(userCredentials => {
      if(userCredentials) {
        userCredentials.getIdToken().then(token => {
          
          AuthService.validateUser(token).then(data => {
            setLoggedUserId(data.user._id)
            setLoggedUserImageURL(data.user.imageURL)
            setAccessToken(token)
            setAuthenticated(true)
            localStorage.setItem('loggedIn', 'true')
          })
        })
      } else {
        setAuthenticated(false)
        localStorage.setItem('loggedIn', 'false')
      }
    })
  }, [])

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider)
  }

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
  }

  const registerWithEmailAndPassword = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(firebaseAuth, email)
  }

  const logout = async () => {
    await signOut(firebaseAuth).then(() => {
      setAccessToken('')
      setAuthenticated(false)
      localStorage.setItem('loggedIn', 'false')
    })
  }

  return (
      <AuthContext.Provider value={{authenticated, setAuthenticated, loggedUserId, setLoggedUserId, loggedUserImageURL, setLoggedUserImageURL,
          loginWithGoogle, loginWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout}}>
        {children}
      </AuthContext.Provider>
  )
}