import { Link, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { PATH_DASHBOARD, PATH_USERS } from "@/components/MainRouter"
import AppDropdown from "./AppDropdown"

const AppNavbar = () => {

  const authContext = useContext(AuthContext)

  return (
    <div>
      <div className={"fixed w-full top-0 bg-gradient-to-r from-indigo-200 to-purple-300 h-16 flex items-center justify-between"}>

        <div className="rotate-6">
          <Link to={PATH_DASHBOARD} className="mx-3 my-4 text-xl no-underline text-black hover:bg-black hover:text-white p-2 rounded-lg">Fakebook</Link>
        </div>

        <div className="flex items-center">
          <Link to={`${PATH_USERS}/${authContext?.loggedUser?._id}`}>
            <img className="w-8 h-8 object-cover rounded-full hover:bg-black p-1" src={authContext?.loggedUser?.imageURL} alt="profile picture" referrerPolicy="no-referrer" />
          </Link>

          <AppDropdown />
        </div>

      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  )
}

export default AppNavbar
