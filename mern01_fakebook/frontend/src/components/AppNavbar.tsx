import { Link, Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { PATH_DASHBOARD, PATH_USERS } from "@/components/MainRouter"

const AppNavbar = () => {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const linkStyle = "mx-3 my-4 text-lg no-underline text-blue-500 hover:text-blue-800"

  return (
    <div>
      <div className={"bg-gray-200 h-12 flex items-center justify-between"}>
        <div>
          <Link to={`${PATH_USERS}/${authContext?.loggedUserId}`} className={linkStyle}>My profile</Link>
          <Link to={PATH_DASHBOARD} className={linkStyle}>Dashboard</Link>
        </div>
        <button onClick={() => { 
          authContext?.logout().then(() => navigate('/'))            
          }} className="mx-2 w-16 h-8 border rounded-md bg-blue-500 cursor-pointer">Logout</button>
      </div>
      <Outlet />
      <div className={"bg-gray-200 h-12 flex items-center justify-end"}>
        <p className="mx-4 text-sm">by <a href="https://github.com/truchjan" target="_blank" className="no-underline text-blue-500 hover:text-blue-800">@truchjan</a></p>
      </div>
    </div>
  )
}

export default AppNavbar
