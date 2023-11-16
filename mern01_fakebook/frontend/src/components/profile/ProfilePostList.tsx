import { useState, useEffect } from "react"
import { PostModel } from "@/model/postModel"
import Post from "@/components/dashboard/Post"
import { UserModel } from "@/model/userModel"

interface ProfilePostListProps {
  posts: PostModel[],
  setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>,
  user?: UserModel
}

const ProfilePostList = (props: ProfilePostListProps) => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(props.posts.length > 0) setLoading(false)
  }, [props.posts])

  return (
    <div className="flex flex-col items-center w-full">
      {!loading && props.posts.map((post: PostModel) => <Post key={post._id} buttons={true} post={post} posts={props.posts} setPosts={props.setPosts} user={props.user} />)}
    </div>
  )
}

export default ProfilePostList