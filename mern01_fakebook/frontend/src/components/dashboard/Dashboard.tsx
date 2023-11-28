import { PostModel } from "@/model/postModel"
import { useContext, useEffect, useState } from "react"
import PostList from "@/components/dashboard/PostList"
import PostForm from "@/components/dashboard/PostForm"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext"
import { PATH_ROOT } from "@/components/MainRouter"
import { PostService } from "@/service/postService"
import UserFilter from "@/components/dashboard/UserFilter"
import LoadingOval from "@/components/LoadingOval"

const Dashboard = () => {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [posts, setPosts] = useState<PostModel[] | undefined>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      PostService.postList().then(item => {
        setPosts(item)
        setLoading(false)
      })
    }
  }, [authContext?.authenticated, posts])

  return (
    <div className="flex justify-center m-4">
      {!loading ?
      <div className="grid sm:grid-cols-4 w-5/6 max-w-6xl">
        <div className="flex flex-col items-center">
          <img className="w-28 h-28 object-cover rounded-full" src={authContext?.loggedUser?.imageURL} alt="profile picture" referrerPolicy="no-referrer" />
          <h2 className="my-3">{authContext?.loggedUser?.name}</h2>
        </div>

        <div className="sm:col-span-3">
          <PostForm create={true} posts={posts} setPosts={setPosts} />
        </div>

        <div className="mr-4">
          <UserFilter />
        </div>

        <div className="sm:col-span-3">
          <PostList posts={posts} setPosts={setPosts} />
        </div>
      </div> : <LoadingOval />}
    </div>
  )
}

export default Dashboard