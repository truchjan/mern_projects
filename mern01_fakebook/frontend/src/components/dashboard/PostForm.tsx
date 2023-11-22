import { useForm } from "react-hook-form"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { PostModel } from "@/model/postModel"
import { PostService } from "@/service/postService"

interface PostListProps {
  create: boolean,
  posts: PostModel[] | undefined,
  setPosts: React.Dispatch<React.SetStateAction<PostModel[] | undefined>>,
  postToUpdate?: PostModel,
  finishUpdate?: () => void
}

const PostForm = (props: PostListProps) => {

  const authContext = useContext(AuthContext)

  const {register, handleSubmit, reset} = useForm({
    defaultValues: {
      text: props.create ? "" : props.postToUpdate?.text
    }
  })

  const onSubmit = (data: any) => {
    if(props.create) {
      PostService.createPost(authContext?.loggedUser?._id!, data).then(item => {
        props.setPosts([item!, ...props.posts!])
        reset()
      })
    } else {
      PostService.updatePost(data, props.postToUpdate?._id!).then(updatedPost => {
        props.setPosts(prev => prev!.map(item => item._id === props.postToUpdate?._id ? {...updatedPost!, user: props.postToUpdate?.user} : item))
        if(props.finishUpdate) props.finishUpdate()
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col w-full max-w-2xl items-center shadow-[0_0_10px_0px_rgb(0,0,0,0.3)] rounded-xl bg-white"}>

      <textarea className={"border-none resize-none mt-2 p-2 h-16 w-11/12 focus:outline-none font-montserrat"}
        placeholder="What's on your mind?"
        {...register("text", {required: "This field is required"})}
      />

      <button type="submit" className={"my-2 w-16 h-8 border-none rounded-xl bg-indigo-300 cursor-pointer font-montserrat font-bold hover:bg-black hover:text-white"}>
        Post
      </button>
    </form>
  )
}

export default PostForm