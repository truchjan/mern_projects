import { CommentModel } from "@/model/commentModel"
import { PostModel } from "@/model/postModel"
import { PostService } from "@/service/postService"
import { useEffect, useState } from "react"
import Comment from "@/components/comment/Comment"
import CommentForm from "@/components/comment/CommentForm"
import LoadingOval from "@/components/LoadingOval"

interface PostProps {
  post: PostModel,
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
}

const CommentList = (props: PostProps) => {

  const [comments, setComments] = useState<CommentModel[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    PostService.getPostComments(props.post._id!).then(item => {
      setComments(item)
      setLoading(false)
    })
  }, [])

  // useEffect(() => {
  //   if(comments && comments.length > 0) setLoading(false)
  // }, [comments])

  return (
    <div>
      <CommentForm create={true} post={props.post} comments={comments} setComments={setComments} setCommentCount={props.setCommentCount} />
      <div className="pt-4 bg-white">
        {!loading ? comments && comments.map((comment: CommentModel) => {
          return <Comment key={comment._id} post={props.post} comment={comment} comments={comments} setComments={setComments} setCommentCount={props.setCommentCount} />
        }) : <LoadingOval />}
      </div>
    </div>
  )
}

export default CommentList