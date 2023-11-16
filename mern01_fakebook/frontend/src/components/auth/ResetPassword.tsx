import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { PATH_ROOT } from "@/components/MainRouter"
import { useForm } from "react-hook-form"

const ResetPassword = () => {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = (data: any) => {
    authContext?.sendPasswordReset(data.email).then(() => navigate(PATH_ROOT)).catch(err => console.log(err))
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-200 to-purple-300">
      <div className="flex flex-col p-4 items-center shadow-[0_0_10px_3px_rgb(0,0,0,0.3)] rounded-xl max-w-sm w-1/2">

        <h2>Forgot password?</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">

          <p className="mx-2 my-0">Email</p>
          <input type="email" className="border border-black rounded-xl m-2 p-2 bg-indigo-100"
              {...register("email", {required: "This field is required"})}
          />
          {errors.email && <p className="mx-2 my-0 text-rose-600 text-sm">{errors.email.message}</p>}

          <button type="submit" className="mb-2 mt-4 mx-2 h-8 border rounded-xl bg-transparent cursor-pointer hover:bg-black hover:text-white font-montserrat font-bold">
            {'Send'}
          </button>
        </form>
        <p className="mt-4 mb-0 cursor-pointer hover:underline text-xs" onClick={() => navigate(PATH_ROOT)}>Return to login</p>
      </div>
      
    </div>
  )
}

export default ResetPassword