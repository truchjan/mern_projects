import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_COURTS, PATH_ROOT, PATH_USERS } from "@/components/MainRouter"
import { UserService } from "@/service/userService"
import { ReservationModel } from "@/model/reservationModel"
import LoadingOval from "@/components/LoadingOval"
import Reservation from "@/components/profile/Reservation"
import { FaPen } from "react-icons/fa"

const Profile = () => {

  const params = useParams()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState<UserModel | null>()
  const [reservations, setReservations] = useState<ReservationModel[] | undefined>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.loggedUser?._id !== params.userId) navigate(PATH_COURTS)
    if(authContext?.authenticated) {
      UserService.userDetail(params.userId!).then(item => {
        setUser(item)
        setLoading(false)
      })
      UserService.getUserReservations(params.userId!).then(item => setReservations(item))
    }
  }, [authContext?.authenticated])

  const reservationElements = reservations?.map(item => <Reservation key={item._id} reservation={item} reservations={reservations} setReservations={setReservations} />)

  return (
    <div>
      {!loading ?
      <div className="flex flex-col items-center mx-4">
        <div className="flex items-center">
          <p className="mr-2">{user?.name}</p>
          <FaPen className="text-sky-600 text-xs cursor-pointer hover:text-lime-300 mb-2"
            onClick={() => navigate(`${PATH_USERS}/${authContext?.loggedUser?._id}/update`)} />
        </div>
        <p className="text-xl">Reservations</p>
        {user?.reservations?.length === 0 ? 'Have not made a reservation yet' : reservationElements}
      </div> : <LoadingOval />}
    </div>
  )
  
}

export default Profile