import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"

function App() {

  const authContext = useContext(AuthContext)

  return (
    <div className="bg-rose-500">
      <button onClick={() => authContext?.loginWithGoogle()}>Login with Google</button>
      <button onClick={() => authContext?.logout()}>Logout</button>
    </div>
  )
}

export default App