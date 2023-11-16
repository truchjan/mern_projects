import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_ROOT } from "@/components/MainRouter"
import { UserService } from "@/service/userService"

const Profile = () => {

  const params = useParams()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState<UserModel | null>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      UserService.userDetail(params.userId!).then(item => {
        setUser(item)
        setLoading(false)
      })
    }
  }, [authContext?.authenticated])

  return (
    <div>
      {!loading && 
      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <img className="w-16 rounded-xl" src={user?.imageURL} alt="profile picture" />
        <p>{user?.about}</p>
      </div>}
    </div>
  )
}

export default Profile