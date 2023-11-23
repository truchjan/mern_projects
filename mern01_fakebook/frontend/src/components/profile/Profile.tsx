import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_ROOT } from "@/components/MainRouter"
import { UserService } from "@/service/userService"
import { PostModel } from "@/model/postModel"
import PostList from "@/components/dashboard/PostList"
import FriendList from "@/components/profile/FriendList"
import { FaUserPlus } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { FriendRequestStatusEnum } from "@/components/profile/enum/FriendRequestStatusEnum"

const Profile = () => {

  const params = useParams()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState<UserModel | null>()
  const [posts, setPosts] = useState<PostModel[] | undefined>([])
  const [loading, setLoading] = useState(true)
  const [friendRequestStatus, setFriendRequestStatus] = useState<FriendRequestStatusEnum>(FriendRequestStatusEnum.None)

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      UserService.userDetail(params.userId!).then(item => {
        setUser(item)
        setLoading(false)
      })
      UserService.getUserPosts(params.userId!).then(item => setPosts(item))
    }
  }, [authContext?.authenticated, params.userId])

  useEffect(() => {
    setFriendRequestStatus(FriendRequestStatusEnum.None)
    user?.friendRequests.forEach(item => item.user._id === authContext?.loggedUser?._id && setFriendRequestStatus(FriendRequestStatusEnum.Sent))
    user?.requestedFriends.forEach(item => item._id === authContext?.loggedUser?._id && setFriendRequestStatus(FriendRequestStatusEnum.Recieved))
    user?.friends.forEach(item => item._id === authContext?.loggedUser?._id && setFriendRequestStatus(FriendRequestStatusEnum.Friends))
  }, [user])

  function sendFriendRequest() {
    UserService.sendFriendRequest(authContext?.loggedUser?._id!, user?._id!).then(() => setFriendRequestStatus(FriendRequestStatusEnum.Sent))
  }

  function cancelFriendRequest() {
    UserService.cancelFriendRequest(authContext?.loggedUser?._id!, user?._id!).then(() => setFriendRequestStatus(FriendRequestStatusEnum.None))
  }

  function acceptFriendRequest() {
    UserService.acceptFriendRequest(authContext?.loggedUser?._id!, user?._id!).then(() => {
      setUser(prev => ({...prev!, friends: [...prev?.friends!, authContext?.loggedUser!]}))
      setFriendRequestStatus(FriendRequestStatusEnum.Friends)
    })
  }

  function rejectFriendRequest() {
    UserService.rejectFriendRequest(authContext?.loggedUser?._id!, user?._id!).then(() => setFriendRequestStatus(FriendRequestStatusEnum.None))
  }

  function removeFriend() {
    UserService.removeFriend(authContext?.loggedUser?._id!, user?._id!).then(() => {
      const newFriends = user?.friends.filter(item => item._id !== authContext?.loggedUser?._id)
      setUser(prev => ({...prev!, friends: newFriends!}))
      setFriendRequestStatus(FriendRequestStatusEnum.None)
    })
  }

  const friendRequestElement = () => {
    if(friendRequestStatus === FriendRequestStatusEnum.None) {
      return (
        <button className="w-10 h-10 p-2 text-xl border-none rounded-full cursor-pointer bg-indigo-300 hover:bg-black hover:text-white"
            onClick={sendFriendRequest}>
          <FaUserPlus />
        </button>
      )
    } else if(friendRequestStatus === FriendRequestStatusEnum.Friends) {
      return (
        <div className="flex flex-col items-end">
          <div className="flex items-center text-indigo-400">
            <p className="m-0 mr-2">Friends</p>
            <FaCheck />
          </div>
          <p className="m-0 mt-1 p-1 text-rose-600 cursor-pointer hover:text-white hover:bg-black rounded-lg" onClick={removeFriend}>Remove</p>
        </div>
      )
    } else if(friendRequestStatus === FriendRequestStatusEnum.Sent) {
      return (
        <div className="flex flex-col items-end">
          <p className="m-0 text-indigo-400">Friend request sent</p>
          <p className="m-0 mt-1 p-1 text-rose-600 cursor-pointer hover:text-white hover:bg-black rounded-lg" onClick={cancelFriendRequest}>Cancel</p>
        </div>
      )
    }
    else if(friendRequestStatus === FriendRequestStatusEnum.Recieved) {
      return (
        <div className="flex flex-col items-end">
          <p className="m-0 text-indigo-400">Friend request recieved</p>
          <div className="flex">
            <p className="m-0 mt-1 p-1 text-lime-600 cursor-pointer hover:text-white hover:bg-black rounded-lg" onClick={acceptFriendRequest}>Accept</p>
            <p className="m-0 mt-1 p-1 text-rose-600 cursor-pointer hover:text-white hover:bg-black rounded-lg" onClick={rejectFriendRequest}>Reject</p>
          </div>
        </div>
      )
    }
  }

  // sm:tailwind-class happens only on screens of sm(640px) and wider, same goes for md:, lg: etc
  return (
    <div className="flex justify-center">
      {!loading && 
      <div className="grid sm:grid-cols-4">
        <div className="sm:col-span-3 flex ml-8 my-4">
          <img className="w-32 h-32 object-cover rounded-full" src={user?.imageURL} alt="profile picture" referrerPolicy="no-referrer" />
          <div className="ml-4">
            <h2 className="mt-4 mb-1">{user?.name}</h2>
            <p className="mt-0 text-gray-500">{user?.email}</p>
            <h4 className="my-0">About Me</h4>
            <p className="mt-1 max-w-2xl">{user?.about}</p>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <div className="mr-4 lg:mr-10 mb-4">
            {user?._id !== authContext?.loggedUser?._id && friendRequestElement()}
          </div>
        </div>
        
        <div className="mx-2 mb-4">
          <FriendList user={user!} />
        </div>
        
        <div className="sm:col-span-3 mx-2">
          <PostList posts={posts} setPosts={setPosts} />
        </div>

      </div>}
    </div>
  )
}

export default Profile