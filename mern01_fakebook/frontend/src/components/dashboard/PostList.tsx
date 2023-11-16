import { useEffect, useState, useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { PATH_ROOT } from "@/components/MainRouter"
import { PostModel } from "@/model/postModel"
import { PostService } from "@/service/postService"
import Post from "@/components/dashboard/Post"

interface PostListProps {
  posts: PostModel[],
  setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>
}

const PostList = (props: PostListProps) => {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      PostService.postList().then(item => props.setPosts(item))
    }    
  }, [authContext?.authenticated])

  useEffect(() => {
    if(props.posts.length > 0) setLoading(false)
  }, [props.posts])

  return (
    <div className="flex flex-col items-center w-full">
      {!loading && props.posts.map((post: PostModel) => <Post key={post._id} buttons={false} post={post} />)}
    </div>
  )
}

export default PostList