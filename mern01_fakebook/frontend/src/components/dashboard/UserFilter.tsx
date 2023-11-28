import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { UserService } from "@/service/userService"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { PATH_USERS } from "@/components/MainRouter"

const UserFilter = () => {

  const authContext = useContext(AuthContext)

  const [users, setUsers] = useState<UserModel[] | undefined>()
  const [loading, setLoading] = useState(true)
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<UserModel[] | undefined>()
  
  useEffect(() => {
    if(authContext?.authenticated) {
      UserService.userList().then(item => {
        setUsers(item)
        setLoading(false)
        setFilteredUsers(item)
      })
    }
  }, [authContext?.authenticated])

  const handleInputChange = (e: any) => {
    const searchTerm = e.target.value
    setSearchItem(searchTerm)

    const filteredItems = users?.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredUsers(filteredItems);
  }

  const usersElement = filteredUsers?.map(item => {
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
    <div className="bg-gradient-to-r from-indigo-200 to-purple-300 rounded-lg w-full">

      <div className="px-2 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-t-lg">
        <h3 className="my-0 py-3 px-1">Active Users</h3>
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder='Filter users'
          className="mb-3 rounded-lg border-none p-2 font-montserrat w-5/6"
        />
      </div>

      {!loading &&
      <div className="py-3">
        {usersElement}
      </div>}

    </div>
  )
}

export default UserFilter