import { ReservationModel } from "@/model/reservationModel"
import { getDay, getMonth, getYear, getTime } from "@/utils/dateFormatter"
import { FaPen } from "react-icons/fa"
import { IoMdCloseCircle } from "react-icons/io"
import { ReservationService } from "@/service/reservationService"
import { toast } from "react-toastify"

// TODO - reservations a setReservations se bude hodit pro updatování a deletování rezervací - pak budu moct promítnout změnu
interface ReservationProps {
  reservation: ReservationModel,
  reservations?: ReservationModel[] | undefined,
  setReservations?: React.Dispatch<React.SetStateAction<ReservationModel[] | undefined>>
}

const Reservation = (props: ReservationProps) => {

  function deleteReservation(reservationId: string) {
    ReservationService.deleteReservation(reservationId).then(() => {
      props.setReservations!(props.reservations!.filter(item => item._id !== reservationId))
      toast.warning("Reservation deleted")
    })
  }

  return (
    <div className="flex justify-between w-full max-w-2xl mb-4 rounded-sm border border-solid">
      <div className="flex">
        <div className="flex flex-col items-center mx-6 my-4">
          <p className="text-3xl my-0">{getDay(props.reservation.from)}</p>
          <p className="my-0">{getMonth(props.reservation.from)}</p>
          <p className="text-xs my-0">{getYear(props.reservation.from)}</p>
        </div>
        
        <div className="flex flex-col items-start mx-6 my-4">
          <p className="text-lg my-0">{`${getTime(props.reservation.from)} - ${getTime(props.reservation.to)}`}</p>
          <p className="mt-2">{`Court No.${props.reservation.court.number}`}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mr-4">
        <FaPen className="text-sky-600 cursor-pointer hover:text-lime-300 p-2"
          onClick={() => console.log('Update reservation')} />
        <IoMdCloseCircle className="text-rose-600 text-xl cursor-pointer hover:text-lime-300 p-2"
          onClick={() => deleteReservation(props.reservation._id!)} />
      </div>

      
    </div>
  )
}

export default Reservation