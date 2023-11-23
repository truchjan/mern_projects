import { useForm } from "react-hook-form"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { CommentModel } from "@/model/commentModel"
import { CommentService } from "@/service/commentService"
import { PostModel } from "@/model/postModel"
import { toast } from "react-toastify"

interface CommentFormProps {
  create: boolean,
  post: PostModel,
  comments: CommentModel[] | undefined,
  setComments: React.Dispatch<React.SetStateAction<CommentModel[] | undefined>>,
  setCommentCount: React.Dispatch<React.SetStateAction<number>>,
  commentToUpdate?: CommentModel,
  finishUpdate?: () => void
}

const CommentForm = (props: CommentFormProps) => {

  const authContext = useContext(AuthContext)

  const {register, handleSubmit, reset} = useForm({
    defaultValues: {
      text: props.create ? "" : props.commentToUpdate?.text
    }
  })

  const onSubmit = (data: any) => {
    if(props.create) {
      CommentService.createComment(authContext?.loggedUser?._id!, props.post._id!, data).then(item => {
        props.setComments([...props.comments!, item!])
        props.setCommentCount(prev => prev + 1)
        reset()
      })
      toast.info('Comment created')
    } else {
      CommentService.updateComment(data, props.commentToUpdate?._id!).then(updatedComment => {
        props.setComments(prev => prev!.map(item => item._id === props.commentToUpdate?._id ? {...updatedComment!, user: props.commentToUpdate?.user!, post: props.post} : item))
        if(props.finishUpdate) props.finishUpdate()
      })
      toast.info('Comment updated')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col w-full max-w-3xl items-center bg-gray-100"}>

      <textarea className={"border-none resize-none mt-2 p-2 h-16 w-11/12 focus:outline-none font-montserrat bg-gray-100"}
        placeholder="Add comment"
        {...register("text", {required: "This field is required"})}
      />

      <button type="submit" className={"my-2 w-24 h-8 border-none rounded-xl bg-indigo-300 cursor-pointer font-montserrat font-bold hover:bg-black hover:text-white"}>
        Comment
      </button>
    </form>
  )
}

export default CommentForm