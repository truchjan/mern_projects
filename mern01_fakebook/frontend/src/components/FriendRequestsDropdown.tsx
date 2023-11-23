import { useOutsideAlerter } from "@/hooks/useOutsideAlerter"
import { useContext, useEffect, useRef, useState } from "react"
import { FaUserPlus } from "react-icons/fa"
import { PATH_USERS } from "@/components/MainRouter"
import { AuthContext } from "@/context/AuthContext"
import { formatDate } from "@/utils/dateFormatter"
import { UserModel } from "@/model/userModel"
import { UserService } from "@/service/userService"
import { useNavigate } from "react-router-dom"

const FriendRequestsDropdown = () => {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<UserModel | null>()

  const ref = useRef(null)
  useOutsideAlerter(ref, () => setOpen(false))

  useEffect(() => {
    if(authContext?.authenticated) {
      UserService.userDetail(authContext.loggedUser?._id!).then(item => {
        setUser(item)
      })
    }
  }, [open])

  const requestsElement = user?.friendRequests.map(item => {
    return (
      <div key={item.user._id} className="flex flex-col cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
        onClick={() => {
          navigate(`${PATH_USERS}/${item.user?._id}`)
          setOpen(false)
      }}>
        <div className="flex items-center">
          <div className="mr-1 mt-1">
            <img className="w-8 h-8 object-cover rounded-full" src={item.user.imageURL} alt="profile pic" referrerPolicy="no-referrer" />
          </div>
          <div className="text-black no-underline">
            <p className="m-1">{item.user.name}</p>
          </div>
        </div>
        <p className="m-0 mb-2 text-xs text-gray-500">{`requested on ${formatDate(item.timestamp)}`}</p>
      </div>
    )
  })
  
  return (
    <div className="relative" ref={ref}>
        <div className="overflow-hidden cursor-pointer text-2xl flex justify-center hover:text-white hover:bg-black rounded-full p-2" onClick={() => setOpen(prev => !prev)}>
          <FaUserPlus />
        </div>

        {open &&
          <div className="absolute top-9 right-0 bg-white w-60 max-w-lg p-2 rounded-md shadow-[0_0_10px_0_rgb(0,0,0,0.3)]">
            {user?.friendRequests.length! > 0 ? requestsElement : <p className="text-xs text-gray-500">No friend requests</p>}
          </div>
        }
    </div>
  )
}

export default FriendRequestsDropdown