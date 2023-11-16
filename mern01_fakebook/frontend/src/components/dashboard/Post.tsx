import { formatDate } from "@/utils/dateFormatter"
import { useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import { BiSolidPencil } from "react-icons/bi"
import { PostModel } from "@/model/postModel"
import { PostService } from "@/service/postService"
import PostForm from "@/components/dashboard/PostForm"
import { UserModel } from "@/model/userModel"

interface PostProps {
  buttons: boolean,
  post: PostModel,
  posts?: PostModel[],
  setPosts?: React.Dispatch<React.SetStateAction<PostModel[]>>,
  user?: UserModel
}

const Post = (props: PostProps) => {

  const [update, setUpdate] = useState(false)

  const createdAt = formatDate(props.post.createdAt)
  const updatedAt = formatDate(props.post.updatedAt)
  const updated = createdAt !== updatedAt ? `, updated: ${updatedAt}` : ''

  function handleUpdateClick() {
    setUpdate(prev => prev ? false : true)
  }

  function finishUpdate() {
    setUpdate(false)
  }

  function deletePost(postId: string) {
    PostService.deletePost(postId).then(() => {
      props.setPosts!(props.posts!.filter(item => item._id !== postId))
    })
  }

  return (
    <div className="flex flex-col bg-teal-200 rounded-lg m-3 w-full max-w-xl shadow-[0_0_5px_2px_rgb(0,0,0,0.3)]">
      <div className="flex justify-between px-2 py-1">
        <div className="flex">
          {props.post.user?.name || props.user?.name}
        </div>
        {props.buttons && <div>
          <BiSolidPencil className="text-sky-600 cursor-pointer" onClick={handleUpdateClick} />
          <AiFillDelete className="text-rose-600 cursor-pointer" onClick={() => deletePost(props.post._id!)} />
        </div>}
      </div>
      <div className="px-2 py-2 bg-gray-200">
        {update ? <PostForm create={false}
            posts={props.posts!} setPosts={props.setPosts!}
            postToUpdate={props.post} finishUpdate={finishUpdate} /> : props.post.text}
      </div>
      <div className="px-2 py-1 text-xs">
        {`${createdAt} ${updated}`}
      </div>
    </div>
  )
}

export default Post