import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"

// remove user must be done manualy from mongodb as well as firebase->Authentication->Users
const Login = () => {

  const authContext = useContext(AuthContext)

  return (
    <div>
      {authContext?.authenticated
        ? <button onClick={() => authContext.logout()}>{authContext.loggedUserId}</button>
        : <div>
            <button onClick={() => authContext?.loginWithGoogle()}>login google</button>
            <button onClick={() => authContext?.registerWithEmailAndPassword('ad@asd.cz', 'asdasd')}>register e/p</button>
          </div>}
    </div>
  )
}

export default Login