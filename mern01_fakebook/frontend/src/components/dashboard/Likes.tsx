import { useOutsideAlerter } from "@/hooks/useOutsideAlerter"
import { PostModel } from "@/model/postModel"
import { useRef } from "react"
import { IoIosClose } from "react-icons/io"
import { Link } from "react-router-dom"
import { PATH_USERS } from "@/components/MainRouter"

interface LikesProps {
  trigger: boolean,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  post: PostModel
}

const Likes = (props: LikesProps) => {

  const ref = useRef(null)
  useOutsideAlerter(ref, () => props.setTrigger(false))

  const likesElement = props.post.likes.map(item => {
    return (
      <div key={item._id} className="flex items-center">
        <Link to={`${PATH_USERS}/${item._id}`} className="mr-1 mt-1">
          <img className="w-6 rounded-full cursor-pointer" src={item.imageURL} alt="profile pic" referrerPolicy="no-referrer" />
        </Link>
        <Link to={`${PATH_USERS}/${item._id}`} className="text-black no-underline hover:underline">
          <p className="m-1 cursor-pointer">{item.name}</p>
        </Link>
      </div>
    )
  })

  return (props.trigger) ? (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent backdrop-blur-sm flex justify-center items-center">
      <div className="relative p-4 h-1/2 max-h-xl w-3/4 max-w-xl bg-white rounded-lg overflow-auto" ref={ref}>

        <button className="absolute top-4 right-4 flex justify-center items-center text-2xl p-0 border-0 bg-white cursor-pointer hover:bg-rose-400 rounded-md"
            onClick={() => props.setTrigger(false)}>
          <IoIosClose />
        </button>

        <h2 className="mt-2">Likes</h2>
        {likesElement}
      </div>
    </div>
  ) : ""
}

export default Likes