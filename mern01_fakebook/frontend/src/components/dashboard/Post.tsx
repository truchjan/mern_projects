import { formatDate } from "@/utils/dateFormatter"
import { useContext, useEffect, useState } from "react"
import { AiFillDelete, AiOutlineLike, AiFillLike } from "react-icons/ai"
import { BiSolidPencil } from "react-icons/bi"
import { FaRegComment } from "react-icons/fa"
import { PostModel } from "@/model/postModel"
import { PostService } from "@/service/postService"
import PostForm from "@/components/dashboard/PostForm"
import { UserModel } from "@/model/userModel"
import { Link } from "react-router-dom"
import { PATH_USERS } from "@/components/MainRouter"
import { AuthContext } from "@/context/AuthContext"

interface PostProps {
  buttons: boolean,
  post: PostModel,
  posts?: PostModel[],
  setPosts?: React.Dispatch<React.SetStateAction<PostModel[]>>,
  user?: UserModel
}

const Post = (props: PostProps) => {

  const authContext = useContext(AuthContext)

  const [update, setUpdate] = useState(false)
  const [likedByLoggedUser, setLikedByLoggedUser] = useState(false)
  const [likesCount, setLikesCount] = useState(props.post.likesCount)
  const [commentCount, setCommentCount] = useState(props.post.commentCount)

  const createdAt = formatDate(props.post.createdAt)
  const updatedAt = formatDate(props.post.updatedAt)
  const updated = createdAt !== updatedAt ? `, updated on ${updatedAt}` : ''

  useEffect(() => {
    props.post.likes.forEach(item => console.log(item))
    props.post.likes.forEach(item => {
      const userId = item._id || item
      userId === authContext?.loggedUser?._id && setLikedByLoggedUser(true)
    })
  }, [])

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

  function addLike() {
    PostService.addLike(authContext?.loggedUser?._id!, props.post._id!).then(() => {
      setLikedByLoggedUser(true)
      setLikesCount(prev => prev + 1)
    })
  }

  function removeLike() {
    PostService.removeLike(authContext?.loggedUser?._id!, props.post._id!).then(() => {
      setLikedByLoggedUser(false)
      setLikesCount(prev => prev - 1)
    })
  }

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg mt-6 w-full max-w-xl shadow-[0_0_10px_0_rgb(0,0,0,0.3)]">
      
      <div className="flex justify-between items-center px-4 py-1">
        <div className="flex items-center">

          <Link to={`${PATH_USERS}/${props.post.user?._id || props.user?._id}`} className="mr-1 mt-1">
            <img className="w-6 rounded-full cursor-pointer" src={props.post.user?.imageURL || props.user?.imageURL} alt="profile pic" />
          </Link>
          <Link to={`${PATH_USERS}/${props.post.user?._id || props.user?._id}`} className="text-black no-underline">
            <p className="m-1 cursor-pointer">{props.post.user?.name || props.user?.name}</p>
          </Link>
          <div className="px-2 py-1 text-xs text-gray-500">
            {`posted on ${createdAt}${updated}`}
          </div>

        </div>

        {props.buttons && <div>
          <BiSolidPencil className="text-sky-600 cursor-pointer hover:bg-black rounded-md p-0.5"
            onClick={handleUpdateClick} />
          <AiFillDelete className="text-rose-600 cursor-pointer hover:bg-black rounded-md p-0.5"
            onClick={() => deletePost(props.post._id!)} />
        </div>}

      </div>

      <div className="px-4 py-2 bg-white">
        {update ? <PostForm create={false}
            posts={props.posts!} setPosts={props.setPosts!}
            postToUpdate={props.post} finishUpdate={finishUpdate} /> : props.post.text}
      </div>

      <div className="flex justify-center bg-white">
        <hr className="w-full h-0.5 m-0 mx-4 border-0 bg-gray-50"/>
      </div>

      <div className="flex justify-between bg-white text-sm">
        <p className="mx-4 my-1">{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</p>
        <p className="mx-4 my-1">{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</p>
      </div>

      <div className="grid grid-cols-2">
        <p className="w-full text-center m-1 text-xl cursor-pointer hover:text-indigo-300"
            onClick={likedByLoggedUser ? removeLike : addLike}>
          {likedByLoggedUser ? <AiFillLike/> : <AiOutlineLike/>}
        </p>
        <p className="w-full text-center m-1 text-xl cursor-pointer hover:text-indigo-300"
            onClick={() => console.log('add comment')}>
          <FaRegComment/>
        </p>
      </div>

    </div>
  )
}

export default Post