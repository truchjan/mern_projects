import { Link, Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { PATH_DASHBOARD, PATH_USERS } from "@/components/MainRouter"

const AppNavbar = () => {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext)


  return (
    <div>
      <div className={"bg-gradient-to-r from-indigo-200 to-purple-300 h-16 flex items-center justify-between"}>

        <div className="rotate-6">
          <Link to={PATH_DASHBOARD} className="mx-3 my-4 text-xl no-underline text-black hover:bg-black hover:text-white p-2 rounded-lg">Fakebook</Link>
        </div>

        <div className="flex items-center">
          <Link to={`${PATH_USERS}/${authContext?.loggedUserId}`}>
            <img className="w-8 rounded-full hover:bg-black p-1" src={authContext?.loggedUserImageURL!} alt="profile picture" />
          </Link>

          <button onClick={() => { 
            authContext?.logout().then(() => navigate('/'))            
            }} className="mx-2 font-montserrat text-lg rounded-lg border-none bg-transparent cursor-pointer hover:bg-black hover:text-white">Logout</button>
        </div>

      </div>
      <Outlet />
    </div>
  )
}

export default AppNavbar
