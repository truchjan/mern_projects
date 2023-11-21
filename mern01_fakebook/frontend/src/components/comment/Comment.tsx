import { CommentModel } from "@/model/commentModel"
import { formatDate } from "@/utils/dateFormatter"
import { Link } from "react-router-dom"
import { PATH_USERS } from "@/components/MainRouter"

interface CommentProps {
  buttons: boolean,
  comment: CommentModel,
  comments?: CommentModel[],
  setComments?: React.Dispatch<React.SetStateAction<CommentModel[]>>
}

const Comment = (props: CommentProps) => {

  const createdAt = formatDate(props.comment.createdAt)
  const updatedAt = formatDate(props.comment.updatedAt)
  const updated = createdAt !== updatedAt ? `, updated on ${updatedAt}` : ''

  return (
    <div className="bg-white pl-6 pb-4">

      <div className="flex items-center">
        <Link to={`${PATH_USERS}/${props.comment.user?._id}`} className="mr-1 mt-1">
          <img className="w-6 rounded-full cursor-pointer" src={props.comment.user?.imageURL} alt="profile pic" referrerPolicy="no-referrer" />
        </Link>
        <Link to={`${PATH_USERS}/${props.comment.user?._id}`} className="text-black no-underline">
          <p className="m-1 cursor-pointer">{props.comment.user?.name}</p>
        </Link>
        <div className="px-2 py-1 text-xs text-gray-500">
          {`commented on ${createdAt}${updated}`}
        </div>
      </div>

      <div className="bg-gray-100 mr-6 p-2 rounded-xl">
        {props.comment.text}
      </div>

    </div>
  )

}

export default Comment