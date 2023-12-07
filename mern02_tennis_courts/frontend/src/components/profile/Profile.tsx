import { AuthContext } from "@/context/AuthContext"
import { UserModel } from "@/model/userModel"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_ROOT } from "@/components/MainRouter"
import { UserService } from "@/service/userService"
import { ReservationModel } from "@/model/reservationModel"
import LoadingOval from "@/components/LoadingOval"
import Reservation from "@/components/profile/Reservation"

const Profile = () => {

  const params = useParams()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState<UserModel | null>()
  const [reservations, setReservations] = useState<ReservationModel[] | undefined>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
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
      <div className="flex flex-col items-center w-full">
        <p>{user?.name}</p>
        <p className="text-lg">Reservations</p>
        {reservationElements}
      </div> : <LoadingOval />}
    </div>
  )
  
}

export default Profile