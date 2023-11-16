import { AuthContext } from "@/context/AuthContext"
import { PostModel } from "@/model/postModel"
import { useContext, useEffect, useState } from "react"
import { useNavigate/*, useParams*/ } from "react-router-dom"
import { PATH_ROOT } from "@/components/MainRouter"
import { PostService } from "@/service/postService"

const Dashboard = () => {

  // const params = useParams()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [posts, setPosts] = useState<PostModel[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      PostService.postList().then(item => {
        setPosts(item)
        setLoading(false)
      })
    }
  }, [authContext?.authenticated])

  const postElements = posts?.map(item => <p key={item._id}>{item.text}</p>)

  return (
    <div>
      {!loading && postElements}
    </div>
  )
}

export default Dashboard