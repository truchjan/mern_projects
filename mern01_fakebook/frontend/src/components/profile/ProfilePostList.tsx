import { useState, useEffect, useContext } from "react"
import { PostModel } from "@/model/postModel"
import Post from "@/components/dashboard/Post"
import { UserModel } from "@/model/userModel"
import { AuthContext } from "@/context/AuthContext"

interface ProfilePostListProps {
  posts: PostModel[],
  setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>,
  user?: UserModel
}

const ProfilePostList = (props: ProfilePostListProps) => {

  const authContext = useContext(AuthContext)

  const [loading, setLoading] = useState(true)
  const [buttons, setButtons] = useState(true)

  useEffect(() => {
    if(props.posts.length > 0) setLoading(false)

    if(props.user?._id !== authContext?.loggedUser?._id) {
      setButtons(false)
    } else {
      setButtons(true)
    }
  }, [props.posts])

  return (
    <div className="flex flex-col items-center w-full">
      {!loading && props.posts.map((post: PostModel) => <Post key={post._id} buttons={buttons} post={post} posts={props.posts} setPosts={props.setPosts} />)}
    </div>
  )
}

export default ProfilePostList