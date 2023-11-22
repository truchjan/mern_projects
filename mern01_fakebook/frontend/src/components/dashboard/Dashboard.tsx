import { PostModel } from "@/model/postModel"
import { useContext, useEffect, useState } from "react"
import PostList from "@/components/dashboard/PostList"
import PostForm from "@/components/dashboard/PostForm"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext"
import { PATH_ROOT } from "@/components/MainRouter"
import { PostService } from "@/service/postService"

const Dashboard = () => {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [posts, setPosts] = useState<PostModel[] | undefined>([])

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      PostService.postList().then(item => setPosts(item))
    }    
  }, [authContext?.authenticated, posts])

  return (
    <div className="flex flex-col items-center my-4">
      <PostForm create={true} posts={posts} setPosts={setPosts} />
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default Dashboard