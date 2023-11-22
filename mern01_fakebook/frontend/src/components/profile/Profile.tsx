import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_ROOT } from "@/components/MainRouter"
import { UserService } from "@/service/userService"
import { PostModel } from "@/model/postModel"
import PostList from "@/components/dashboard/PostList"

const Profile = () => {

  const params = useParams()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState<UserModel | null>()
  const [posts, setPosts] = useState<PostModel[] | undefined>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      UserService.userDetail(params.userId!).then(item => {
        setUser(item)
        setLoading(false)
      })
      UserService.getUserPosts(params.userId!).then(item => setPosts(item))
    }
  }, [authContext?.authenticated, params.userId])

  return (
    <div>
      {!loading && 
      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <img className="w-48 h-48 object-cover rounded-xl" src={user?.imageURL} alt="profile picture" referrerPolicy="no-referrer" />
        <p>{user?.about}</p>
        <PostList posts={posts} setPosts={setPosts} />
      </div>}
    </div>
  )
}

export default Profile