import { useEffect, useState } from "react"
import { PostModel } from "@/model/postModel"
import Post from "@/components/dashboard/Post"

interface PostListProps {
  posts: PostModel[] | undefined,
  setPosts: React.Dispatch<React.SetStateAction<PostModel[] | undefined>>
}

const PostList = (props: PostListProps) => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(props.posts!.length > 0) setLoading(false)
  }, [props.posts])

  return (
    <div className="flex flex-col w-full">
      {!loading && props.posts!.map((post: PostModel) => <Post key={post._id} post={post} posts={props.posts} setPosts={props.setPosts} />)}
    </div>
  )
}

export default PostList