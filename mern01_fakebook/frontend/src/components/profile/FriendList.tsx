import { UserModel } from "@/model/userModel"
import { Link } from "react-router-dom"
import { PATH_USERS } from "@/components/MainRouter"

interface FriendListProps {
  user: UserModel
}

const FriendList = (props: FriendListProps) => {

  const friendsElement = props.user.friends.map(item => {
    return (
      <div className="flex items-center mx-2" key={item._id}>
        <Link to={`${PATH_USERS}/${item._id}`}>
          <img className="w-8 h-8 object-cover rounded-full cursor-pointer" src={item.imageURL} alt="profile pic" referrerPolicy="no-referrer" />
        </Link>
        <Link to={`${PATH_USERS}/${item._id}`} className="text-black no-underline">
          <p className="mx-2 my-3 cursor-pointer hover:underline">{item.name}</p>
        </Link>
      </div>
    )
  })

  return (
    <div className="bg-gradient-to-r from-indigo-200 to-purple-300 rounded-lg lg:min-w-[16rem]">
      <h3 className="my-0 py-3 px-2 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-t-lg">Friends</h3>

      <div className="py-3">
        {friendsElement}
      </div>

    </div>
  )
}

export default FriendList