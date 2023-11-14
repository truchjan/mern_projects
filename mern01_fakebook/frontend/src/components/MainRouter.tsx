import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "@/components/ErrorPage"
// import AppNavbar from "@/components/AppNavbar"
// import UserMessages from "@/components/user/UserMessages"
// import MessageBoard from "@/components/message/MessageBoard"
import Login from "@/components/auth/Login"
// import ResetPassword from "@/components/auth/ResetPassword"

export const PATH_ROOT = '/'
// export const PATH_USERS = '/users'
// export const PATH_MESSAGES = '/messages'
// export const PATH_RESET_PASSWORD = '/reset'

const MainRouter = () => {
  const router = createBrowserRouter([
    // {
    //   element: <AppNavbar />,
    //   errorElement: <ErrorPage />,
    //   children: [
    //     {
    //       path: `${PATH_USERS}/:userId${PATH_MESSAGES}`,
    //       element: <UserMessages />
    //     },
    //     {
    //       path: PATH_MESSAGES,
    //       element: <MessageBoard />
    //     }
    //   ]
    // },
    {
      path: PATH_ROOT,
      element: <Login />,
      errorElement: <ErrorPage />
    },
    // {
    //   path: PATH_RESET_PASSWORD,
    //   element: <ResetPassword />,
    //   errorElement: <ErrorPage />
    // }
  ])

  return <RouterProvider router={router} />
}

export default MainRouter