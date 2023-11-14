import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"

// remove user must be done manualy from mongodb as well as firebase->Authentication->Users
const Login = () => {

  const authContext = useContext(AuthContext)

  return (
    <div>
      {authContext?.authenticated
        ? <button onClick={() => authContext.logout()}>{authContext.loggedUserId}</button>
        : <button onClick={() => authContext?.loginWithGoogle()}>login</button>}
    </div>
  )
}

export default Login