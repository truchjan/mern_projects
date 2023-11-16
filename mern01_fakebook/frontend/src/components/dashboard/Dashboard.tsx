import { PostModel } from "@/model/postModel"
import { useState } from "react"
import PostList from "@/components/dashboard/PostList"
import PostForm from "@/components/dashboard/PostForm"

const Dashboard = () => {

  const [posts, setPosts] = useState<PostModel[]>([])

  return (
    <div className="flex flex-col items-center my-4">
      <PostForm create={true} posts={posts} setPosts={setPosts} />
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default Dashboard