import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { UserService } from "@/service/userService"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { PATH_ROOT, PATH_USERS } from "@/components/MainRouter"

const ProfileUpdateForm = () => {

  const navigate = useNavigate()
  const params = useParams()
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState<UserModel | null>()
  const [error, setError] = useState<string>()

  const {register, handleSubmit, formState: {errors}, setValue} = useForm({
    defaultValues: {
      name: "",
      about: "",
      imageURL: ""
    }
  })

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      UserService.userDetail(params.userId!).then(item => {
        setValue("name", item?.name!)
        setValue("about", item?.about!)
        setValue("imageURL", item?.imageURL!)
        setUser(item)
      })
    }
  }, [authContext?.authenticated])

  const onSubmit = (data: any) => {
    // test image url
    fetch(data.imageURL).then(response => {
      if(response.ok) {
        UserService.updateUser(data, user?._id!).then(item => {
          navigate(`${PATH_USERS}/${item?._id}`)
          authContext?.setLoggedUser(item)
        })
      }
    }).catch(() => setError('Profile picture URL invalid'))
  }

  return (
    <div className="flex flex-col items-center mx-4">
      <h1>Update profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col w-full max-w-xl items-left rounded-xl bg-white"}>

        <div className="flex justify-center">
          <div>
            <p className="my-4">Profile picture</p>
            <img src={user?.imageURL} className="w-48 h-48 object-cover border-solid border-indigo-300 border-2 rounded-md" alt="profile picture" />
          </div>

          <div className="m-8">
            <p className="mb-1">URL</p>
            <input className={"p-2 w-11/12 font-montserrat rounded-xl border-solid border-indigo-300 border-2"}
              placeholder="Paste link to profile picture"
              {...register("imageURL", {required: "This field is required"})}
              disabled={false}
            />
            {errors.imageURL && <p className="text-rose-600 text-sm mt-1">{errors.imageURL.message}</p>}
            <p className="text-xs">NOTE: Not all URLs will be accepted for security reasons.</p>
          </div>
        </div>



        <p className="mt-6 my-1">Name</p>
        <input className={"p-2 w-11/12 font-montserrat rounded-xl border-solid border-indigo-300 border-2"}
          placeholder="Name"
          {...register("name", {required: "This field is required"})}
        />
        {errors.name && <p className="text-rose-600 text-sm mt-1">{errors.name.message}</p>}

        <p className="mt-6 my-1">About Me</p>
        <textarea className={"p-2 w-11/12 focus:outline-none resize-none h-16 font-montserrat rounded-xl border-solid border-indigo-300 border-2"}
          placeholder="About Me"
          {...register("about")}
        />
        {errors.about && <p className="text-rose-600 text-sm mt-1">{errors.about.message}</p>}

        
        <button type="submit" className={"mt-8 mb-4 w-20 h-8 border-none rounded-xl bg-indigo-300 cursor-pointer font-montserrat font-bold hover:bg-black hover:text-white"}>
          Update
        </button>
        {error && <p className="mx-2 my-0 text-rose-600 text-sm">{error}</p>}

      </form>
    </div>
  )
}

export default ProfileUpdateForm