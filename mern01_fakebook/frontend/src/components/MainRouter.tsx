import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "@/components/ErrorPage"
import AppNavbar from "@/components/AppNavbar"
import Login from "@/components/auth/Login"
import ResetPassword from "@/components/auth/ResetPassword"
import Dashboard from "@/components/dashboard/Dashboard"
import Profile from "@/components/profile/Profile"
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm"

export const PATH_ROOT = '/'
export const PATH_RESET_PASSWORD = '/reset'
export const PATH_DASHBOARD = '/dashboard'
export const PATH_USERS = '/users'

const MainRouter = () => {
  const router = createBrowserRouter([
    {
      element: <AppNavbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: PATH_DASHBOARD,
          element: <Dashboard />
        },
        {
          path: `${PATH_USERS}/:userId`,
          element: <Profile />
        },
        {
          path: `${PATH_USERS}/:userId/update`,
          element: <ProfileUpdateForm />
        }         
      ]
    },
    {
      path: PATH_ROOT,
      element: <Login />,
      errorElement: <ErrorPage />
    },
    {
      path: PATH_RESET_PASSWORD,
      element: <ResetPassword />,
      errorElement: <ErrorPage />
    }
  ])

  return <RouterProvider router={router} />
}

export default MainRouter