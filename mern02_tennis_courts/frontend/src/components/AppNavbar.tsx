import { Link, Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { PATH_COURTS, PATH_ROOT } from "@/components/MainRouter"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const AppNavbar = () => {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  return (
    <div>
      <div className={"fixed w-full top-0 bg-lime-300 h-16 flex items-center justify-end"}>

        <Link to={PATH_COURTS} className="text-lg no-underline text-black rounded-lg hover:bg-lime-500 py-3 px-2">
          Reservations
        </Link>

        <Link to={PATH_COURTS} className="text-lg no-underline text-black rounded-lg hover:bg-lime-500 py-3 px-2">
          Profile
        </Link>

        <p className="mr-4 text-lg text-black rounded-lg hover:bg-lime-500 py-3 px-2 cursor-pointer"
            onClick={() => authContext?.logout().then(() => navigate(PATH_ROOT))}>
          Logout
        </p>
      </div>

      <div className="mt-20">
        <Outlet />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default AppNavbar
