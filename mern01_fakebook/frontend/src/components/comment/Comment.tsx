import { CommentModel } from "@/model/commentModel"
import { formatDate } from "@/utils/dateFormatter"
import { Link } from "react-router-dom"
import { PATH_USERS } from "@/components/MainRouter"
import { BiSolidPencil } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { CommentService } from "@/service/commentService"
import { AuthContext } from "@/context/AuthContext"
import { useContext, useState } from "react"
import CommentForm from "@/components/comment/CommentForm"
import { PostModel } from "@/model/postModel"

interface CommentProps {
  post: PostModel,
  comment: CommentModel,
  comments?: CommentModel[],
  setComments?: React.Dispatch<React.SetStateAction<CommentModel[] | undefined>>,
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
}

const Comment = (props: CommentProps) => {
  
  const authContext = useContext(AuthContext)

  const [update, setUpdate] = useState(false)

  const createdAt = formatDate(props.comment.createdAt)
  const updatedAt = formatDate(props.comment.updatedAt)
  const updated = createdAt !== updatedAt ? `, updated on ${updatedAt}` : ''

  const buttons = authContext?.loggedUser?._id === props.comment.user._id ? true : false

  function handleUpdateClick() {
    setUpdate(prev => !prev)
  }

  function finishUpdate() {
    setUpdate(false)
  }

  function deleteComment(commentId: string) {
    CommentService.deleteComment(commentId).then(() => {
      props.setComments!(props.comments!.filter(item => item._id !== commentId))
      props.setCommentCount(prev => prev - 1)
    })
  }

  return (
    <div className="bg-white pl-6 pb-4">

      <div className="flex items-center">
        <Link to={`${PATH_USERS}/${props.comment.user?._id}`} className="mr-1 mt-1">
          <img className="w-8 h-8 object-cover rounded-full cursor-pointer" src={props.comment.user?.imageURL} alt="profile pic" referrerPolicy="no-referrer" />
        </Link>
        <Link to={`${PATH_USERS}/${props.comment.user?._id}`} className="text-black no-underline">
          <p className="m-1 cursor-pointer hover:underline">{props.comment.user?.name}</p>
        </Link>
        <div className="px-2 py-1 text-xs text-gray-500">
          {`commented on ${createdAt}${updated}`}
        </div>
      </div>

      <div className="flex justify-between bg-gray-100 mr-6 p-2 rounded-xl">
        
        <div className="px-4 py-2 w-5/6">
          {update ? <CommentForm create={false} post={props.post}
              comments={props.comments} setComments={props.setComments!}
              commentToUpdate={props.comment} finishUpdate={finishUpdate} setCommentCount={props.setCommentCount} /> : props.comment.text}
        </div>

        {buttons && <div>
          <BiSolidPencil className="text-sky-600 cursor-pointer hover:bg-black rounded-md p-0.5"
            onClick={handleUpdateClick} />
          <AiFillDelete className="text-rose-600 cursor-pointer hover:bg-black rounded-md p-0.5"
            onClick={() => deleteComment(props.comment._id!)} />
        </div>}
      </div>

      

    </div>
  )

}

export default Comment