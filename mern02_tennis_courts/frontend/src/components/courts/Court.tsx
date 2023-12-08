import { AuthContext } from "@/context/AuthContext";
import { CourtModel } from "@/model/courtModel";
import { ReservationModel } from "@/model/reservationModel";
import { CourtService } from "@/service/courtService";
import { getHour } from "@/utils/dateFormatter";
import { useContext, useEffect, useState } from "react";

interface CourtProps {
  court: CourtModel,
  date: Date
}

const Court = (props: CourtProps) => {

  const authContext = useContext(AuthContext)

  const [courtReservationsDay, setCourtReservationsDay] = useState<ReservationModel[]>()

  useEffect(() => {
    CourtService.getCourtReservationsDay(props.court._id!, props.date).then(item => setCourtReservationsDay(item))
  }, [])

  const tdStyle = "px-2 py-4"

  const tdAditionalStyle = (hour: string) => {
    let color = "bg-sky-600"
    courtReservationsDay?.forEach(item => {
      if(getHour(item.from) === hour) {
        color = "bg-rose-600"
        if(authContext?.loggedUser?._id === item.user._id) color = "bg-green-600"
      }
    })
    return color  
  }

  return (
    <tr>
      <td className={tdStyle}>{`Court No.${props.court.number}`}</td>
      <td className={`${tdStyle} ${tdAditionalStyle("07")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("08")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("09")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("10")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("11")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("12")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("13")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("14")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("15")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("16")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("17")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("18")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("19")}`}></td>
      <td className={`${tdStyle} ${tdAditionalStyle("20")}`}></td>
    </tr>
  )
}

export default Court