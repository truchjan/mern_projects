import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { UserService } from "@/service/userService"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// TODOs
// do UserServoce přidat metodu update user, umožnit updatovat pouze name, pic, about
// udělat form pro update
// nasměrovat na tento form po registeru a vložit tam prázdná pole s tím, že name je povinné
const ProfileUpdateForm = () => {

  const params = useParams()
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState<UserModel | null>()

  useEffect(() => {
    if(authContext?.authenticated) {
      UserService.userDetail(params.userId!).then(item => setUser(item))
    }
  }, [authContext?.authenticated])

  return (
    <div>
      {user?.name}
    </div>
  )
}

export default ProfileUpdateForm