import { useOutsideAlerter } from "@/hooks/useOutsideAlerter"
import { useContext, useRef, useState } from "react"
import { IoIosSettings } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { PATH_ROOT, PATH_USERS } from "@/components/MainRouter"
import { AuthContext } from "@/context/AuthContext"

const AppDropdown = () => {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  
  const [open, setOpen] = useState(false)

  const ref = useRef(null)
  useOutsideAlerter(ref, () => setOpen(false))
  
  return (
    <div className="mr-4 relative" ref={ref}>
        <div className="overflow-hidden cursor-pointer text-2xl flex justify-center hover:text-white hover:bg-black rounded-full p-2" onClick={() => setOpen(prev => !prev)}>
          <IoIosSettings />
        </div>

        {open &&
          <div className="absolute top-9 right-0 bg-white w-44 max-w-lg p-2 rounded-md shadow-[0_0_10px_0_rgb(0,0,0,0.3)]">

            <Link to={`${PATH_USERS}/${authContext?.loggedUser?._id}`} className="no-underline m-0" onClick={() => setOpen(false)}>
            <p className="my-0 mx-1 p-2 cursor-pointer text-black rounded-lg hover:bg-black hover:text-white">My Profile</p>
            </Link>

            <div className="flex justify-center bg-white">
              <hr className="w-full h-0.5 m-0 mx-2 border-0 bg-gray-200"/>
            </div>

            <Link to={`${PATH_USERS}/${authContext?.loggedUser?._id}/update`} className="no-underline m-0" onClick={() => setOpen(false)}>
              <p className="my-0 mx-1 p-2 cursor-pointer text-black rounded-lg hover:bg-black hover:text-white">Update Profile</p>
            </Link>

            <div className="flex justify-center bg-white">
              <hr className="w-full h-0.5 m-0 mx-2 border-0 bg-gray-200"/>
            </div>

            <Link to={`${PATH_USERS}/${authContext?.loggedUser?._id}/changepassword`} className="no-underline m-0" onClick={() => setOpen(false)}>
              <p className="my-0 mx-1 p-2 cursor-pointer text-black rounded-lg hover:bg-black hover:text-white">Change Password</p>
            </Link>

            <div className="flex justify-center bg-white">
              <hr className="w-full h-0.5 m-0 mx-2 border-0 bg-gray-200"/>
            </div>

            <div onClick={() => authContext?.logout().then(() => navigate(PATH_ROOT))}
                className="my-0 mx-1 p-2 text-left font-montserrat rounded-lg border-none bg-transparent cursor-pointer hover:bg-black hover:text-white">
              Logout
            </div>

          </div>
        }
    </div>
  )
}

export default AppDropdown