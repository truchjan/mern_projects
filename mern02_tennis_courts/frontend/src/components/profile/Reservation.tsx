import { ReservationModel } from "@/model/reservationModel"
import { getDate, getTime } from "@/utils/dateFormatter"

// TODO - reservations a setReservations se bude hodit pro updatování a deletování rezervací - pak budu moct promítnout změnu
interface ReservationProps {
  reservation: ReservationModel,
  reservations?: ReservationModel[] | undefined,
  setReservations?: React.Dispatch<React.SetStateAction<ReservationModel[] | undefined>>
}

const Reservation = (props: ReservationProps) => {
  return (
    <div className="flex flex-col w-full max-w-2xl mb-4 rounded-sm shadow-[0_0_10px_0_rgb(0,0,0,0.3)]">
      <p>{getDate(props.reservation.from)}</p>
      <p>{`${getTime(props.reservation.from)}-${getTime(props.reservation.to)}`}</p>
    </div>
  )
}

export default Reservation