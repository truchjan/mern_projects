import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "@/components/ErrorPage"
import AppNavbar from "@/components/AppNavbar"
import Login from "@/components/auth/Login"
import ResetPassword from "@/components/auth/ResetPassword"
import CourtList from "@/components/courts/CourtList"
import Profile from "@/components/profile/Profile"
import ProfileForm from "@/components/profile/ProfileForm"
import ReservationForm from "@/components/reservation/ReservationForm"

export const PATH_ROOT = '/'
export const PATH_RESET_PASSWORD = '/reset'
export const PATH_COURTS = '/courts'
export const PATH_USERS = '/users'
export const PATH_RESERVATION = '/reservation'

const MainRouter = () => {
  const router = createBrowserRouter([
    {
      element: <AppNavbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: PATH_COURTS,
          element: <CourtList />
        },
        {
          path: `${PATH_USERS}/:userId`,
          element: <Profile />
        },
        {
          path: `${PATH_USERS}/:userId/update`,
          element: <ProfileForm />
        },
        {
          path: PATH_RESERVATION,
          element: <ReservationForm />
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