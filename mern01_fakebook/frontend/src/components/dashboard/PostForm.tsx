import { useForm } from "react-hook-form"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { PostModel } from "@/model/postModel"
import { PostService } from "@/service/postService"

interface PostListProps {
  create: boolean,
  posts: PostModel[],
  setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>,
  postToUpdate?: PostModel,
  finishUpdate?: () => void
}

const PostForm = (props: PostListProps) => {

  const authContext = useContext(AuthContext)

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues: {
      text: props.create ? "" : props.postToUpdate?.text
    }
  })

  const onSubmit = (data: any) => {
    if(props.create) {
      PostService.createPost(authContext?.loggedUserId!, data).then(item => {
        props.setPosts([item!, ...props.posts])
        reset()
      })
    } else {
      PostService.updatePost(data, props.postToUpdate?._id!).then(updatedPost => {
        props.setPosts(prev => prev.map(item => item._id === props.postToUpdate?._id ? {...updatedPost!, user: props.postToUpdate?.user} : item))
        if(props.finishUpdate) props.finishUpdate()
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col w-full max-w-xl items-center"}>

      <textarea className={"border border-black rounded-md mt-2 p-2 h-16 w-11/12"}
          {...register("text", {required: "This field is required"})}
      />
      {errors.text && <p className="text-rose-500">{errors.text.message}</p>}

      <input type="submit" className={"my-2 w-16 h-8 border rounded-md bg-blue-500 cursor-pointer"} />
    </form>
  )
}

export default PostForm