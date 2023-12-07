import { useEffect, useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { PATH_COURTS, PATH_RESET_PASSWORD } from "@/components/MainRouter"
import { useForm } from "react-hook-form"
import { BsGoogle } from "react-icons/bs"
import LoadingOval from "@/components/LoadingOval"

// remove user must be done manualy from mongodb as well as firebase->Authentication->Users
const Login = () => {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState<string>()
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(authContext?.authenticated) {
      navigate(PATH_COURTS)
    }
  }, [authContext?.authenticated])

  const {register, handleSubmit, formState: {errors}, getValues} = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: ""
    }
  })

  const onSubmit = (data: any) => {
    setLoading(true)
    if(isSignup) {
      if(getValues("password") === getValues("repeatPassword")) {
        authContext?.registerWithEmailAndPassword(data.email, data.password).then().catch(err => {
          if(err.toString().startsWith('FirebaseError: Firebase: Error (auth/email-already-in-use)')) setError('Email already in use')
          if(err.toString().startsWith('FirebaseError: Firebase: Password should be at least 6 characters')) setError('Password should be at least 6 characters')
          setLoading(false)
        })
      } else {
        setError('Passwords do not match')
        setLoading(false)
      }
      
    } else {
      authContext?.loginWithEmailAndPassword(data.email, data.password).then().catch(() => {
        setError('Invalid login credentials')
        setLoading(false)
      })
    }
  }

  function loginWithGoogle() {
    setLoading(true)
    authContext?.loginWithGoogle()
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!loading ? 
      <div className="flex flex-col p-4 items-center shadow-[0_0_10px_3px_rgb(0,0,0,0.3)] rounded-sm max-w-lg w-1/2">

        <h1 className="mb-4">Tennis Courts</h1>
        <h3 className="mb-0">{isSignup ? 'Sign up' : 'Log in'}</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">

          <p className="mx-2 my-0">Email</p>
          <input type="email" className="border border-black rounded-sm m-2 p-2 font-montserrat"
            {...register("email", {required: "This field is required"})}
          />
          {errors.email && <p className="mx-2 my-0 text-rose-600 text-sm">{errors.email.message}</p>}

          <p className="mx-2 mt-4 mb-0">Password</p>
          <input type="password" className="border border-black rounded-sm m-2 p-2 font-montserrat"
            {...register("password", {required: "This field is required"})}
          />
          {errors.password && <p className="mx-2 my-0 text-rose-600 text-sm">{errors.password.message}</p>}

          {isSignup && 
            <div className="ml-2 mr-6">
              <p className="mt-4 mb-0">Repeat Password</p>
              <input type="password" className="border border-black rounded-sm mt-2 p-2 font-montserrat w-full"
                {...register("repeatPassword", {required: "This field is required"})}
              />
              {errors.repeatPassword && <p className="mx-2 my-0 text-rose-600 text-sm">{errors.repeatPassword.message}</p>}
            </div>
          }

          <button type="submit" className="mb-2 mt-4 mx-2 px-4 h-8 border rounded-sm bg-transparent cursor-pointer hover:bg-lime-300 font-montserrat font-bold">
            {isSignup ? 'Sign up' : 'Log in'}
          </button>
          {error && <p className="mx-2 my-0 text-rose-600 text-sm">{error}</p>}
        </form>

        <p className="mt-1 mb-0 cursor-pointer hover:underline text-xs" onClick={() => navigate(PATH_RESET_PASSWORD)}>Forgot password?</p>

        <div className="mt-2 flex items-center justify-around w-full">

          <button className="w-2/5 h-8 border rounded-sm bg-transparent cursor-pointer hover:bg-lime-300 font-montserrat font-bold"
            onClick={() => setIsSignup(prev => !prev)}>
              {isSignup ? 'Log in' : 'Sign up with Email'}
          </button>

          <button className="w-2/5 h-8 border rounded-sm bg-transparent cursor-pointer hover:bg-lime-300 font-montserrat font-bold"
            onClick={() => loginWithGoogle()}>
              <div className="flex justify-center items-center">
                <BsGoogle />
                <p className="m-0 ml-2">Login with Google</p>
              </div>
          </button>          
        </div>
      </div> : <LoadingOval />}
      
    </div>
  )
}

export default Login