import { Link, Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { PATH_DASHBOARD, PATH_USERS } from "@/components/MainRouter"

const AppNavbar = () => {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  return (
    <div>
      <div className={"fixed w-full top-0 bg-gradient-to-r from-indigo-200 to-purple-300 h-16 flex items-center justify-between"}>

        <div className="rotate-6">
          <Link to={PATH_DASHBOARD} className="mx-3 my-4 text-xl no-underline text-black hover:bg-black hover:text-white p-2 rounded-lg">Fakebook</Link>
        </div>

        <div className="flex items-center">
          <Link to={`${PATH_USERS}/${authContext?.loggedUser?._id}`}>
            <img className="w-8 rounded-full hover:bg-black p-1" src={authContext?.loggedUser?.imageURL} alt="profile picture" referrerPolicy="no-referrer" />
          </Link>

          <Link to={`${PATH_USERS}/${authContext?.loggedUser?._id}/update`} className="no-underline cursor-pointer text-black text-lg rounded-lg hover:bg-black hover:text-white">
            <p className="m-1">Update</p>
          </Link>

          <button onClick={() => { 
            authContext?.logout().then(() => navigate('/'))            
            }} className="mx-2 font-montserrat text-lg rounded-lg border-none bg-transparent cursor-pointer hover:bg-black hover:text-white">Logout</button>
        </div>

      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  )
}

export default AppNavbar
