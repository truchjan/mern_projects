import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_ROOT } from "@/components/MainRouter"
import { UserService } from "@/service/userService"
import { PostModel } from "@/model/postModel"
import PostList from "@/components/dashboard/PostList"
import FriendList from "@/components/profile/FriendList"

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

  // sm:tailwind-class happens only on screens of sm(640px) and wider, same goes for md:, lg: etc
  return (
    <div className="flex justify-center">
      {!loading && 
      <div className="grid sm:grid-cols-4">
        <div className="sm:col-span-4 flex ml-8 my-4">
          <img className="w-32 h-32 object-cover rounded-full" src={user?.imageURL} alt="profile picture" referrerPolicy="no-referrer" />
          <div className="ml-4">
            <h2 className="mt-4 mb-1">{user?.name}</h2>
            <p className="mt-0 text-gray-500">{user?.email}</p>
            <h4 className="my-0">About Me</h4>
            <p className="mt-1 max-w-2xl">{user?.about}</p>
          </div>
        </div>
        
        <div className="mx-2 mb-4">
          <FriendList user={user!} />
        </div>
        
        <div className="sm:col-span-3 mx-2">
          <PostList posts={posts} setPosts={setPosts} />
        </div>

      </div>}
    </div>
  )
}

export default Profile