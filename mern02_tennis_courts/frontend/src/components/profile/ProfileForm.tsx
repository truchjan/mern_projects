import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { UserService } from "@/service/userService"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { PATH_COURTS, PATH_ROOT, PATH_USERS } from "@/components/MainRouter"

const ProfileForm = () => {

  const navigate = useNavigate()
  const params = useParams()
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState<UserModel | null>()

  const {register, handleSubmit, formState: {errors}, setValue} = useForm({
    defaultValues: {
      name: ""
    }
  })

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.loggedUser?._id !== params.userId) navigate(PATH_COURTS)
    if(authContext?.authenticated) {
      UserService.userDetail(params.userId!).then(item => {
        setValue("name", item?.name!)
        setUser(item)
      })
    }
  }, [authContext?.authenticated])

  const onSubmit = (data: any) => {
    UserService.updateUser(data, user?._id!).then(item => {
      navigate(`${PATH_USERS}/${item?._id}`)
      authContext?.setLoggedUser(item)
    })
  }

  return (
    <div className="flex flex-col items-center mx-4">
      <h1>Update profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col w-full max-w-xl items-left bg-white"}>

        <p className="mt-6 my-1">Name</p>
        <input className={"p-2 w-11/12 font-montserrat rounded-sm border-solid border-lime-300 border-2"}
          placeholder="Name"
          {...register("name", {required: "This field is required"})}
        />
        {errors.name && <p className="text-rose-600 text-sm mt-1">{errors.name.message}</p>}

        <button type="submit" className={"mt-8 mb-4 w-20 h-8 border-none rounded-sm bg-gray-200 cursor-pointer font-montserrat font-bold hover:bg-lime-300"}>
          Update
        </button>

      </form>
    </div>
  )
}

export default ProfileForm