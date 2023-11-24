import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { UserService } from "@/service/userService"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { PATH_ROOT, PATH_USERS } from "../MainRouter"
import { toast } from "react-toastify"

const ChangePasswordForm = () => {

  const navigate = useNavigate()
  const params = useParams()
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState<UserModel | null>()
  const [error, setError] = useState<string>()

  const {register, handleSubmit, formState: {errors}, getValues} = useForm({
    defaultValues: {
      password: "",
      repeatPassword: ""
    }
  })

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      UserService.userDetail(params.userId!).then(item => {
        setUser(item)
      })
    }
  }, [authContext?.authenticated])

  const onSubmit = (data: any) => {
    if(getValues("password") === getValues("repeatPassword")) {
      authContext?.changePassword(data.password).then(() => {
        navigate(`${PATH_USERS}/${user?._id}`)
        toast.info("Password changed")
      }).catch(err => {
        if(err.toString().startsWith('FirebaseError: Firebase: Password should be at least 6 characters')) setError('Password should be at least 6 characters')
        if(err.toString().startsWith('FirebaseError: Firebase: Error (auth/requires-recent-login)')) setError('Recent login required for security purposes, please log in and out and try again')
      })
    } else {
      setError("Passwords do not match")
    }
  }

  return (
    <div className="flex flex-col items-center mx-4">
      <h1>Change password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col w-full max-w-md items-left rounded-xl bg-white"}>

        <p className="mt-6 my-1">Password</p>
        <input type="password" className={"p-2 w-11/12 font-montserrat rounded-xl border-solid border-indigo-300 border-2"}
          placeholder="Password"
          {...register("password", {required: "This field is required"})}
        />
        {errors.password && <p className="text-rose-600 text-sm mt-1">{errors.password.message}</p>}

        <p className="mt-6 my-1">Repeat Password</p>
        <input type="password" className={"p-2 w-11/12 font-montserrat rounded-xl border-solid border-indigo-300 border-2"}
          placeholder="Repeat Password"
          {...register("repeatPassword", {required: "This field is required"})}
        />
        {errors.repeatPassword && <p className="text-rose-600 text-sm mt-1">{errors.repeatPassword.message}</p>}

        
        <button type="submit" className={"mt-8 mb-4 w-28 h-8 border-none rounded-xl bg-indigo-300 cursor-pointer font-montserrat font-bold hover:bg-black hover:text-white"}>
          Change
        </button>
        {error && <p className="mx-2 my-0 text-rose-600 text-sm">{error}</p>}

      </form>
    </div>
  )
}

export default ChangePasswordForm