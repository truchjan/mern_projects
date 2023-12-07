import { AuthContext } from "@/context/AuthContext";
import { CourtModel } from "@/model/courtModel";
import { areDatesOnTheSameDay, getHour } from "@/utils/dateFormatter";
import { useContext } from "react";

interface CourtProps {
  court: CourtModel,
  date: Date
}

const Court = (props: CourtProps) => {

  const authContext = useContext(AuthContext)

  const tdStyle = "px-2 py-4"

  const tdAditionalStyle = (hour: string) => {
    let color = "bg-sky-600"
    props.court.reservations.forEach(item => {
      if(areDatesOnTheSameDay(item.from, props.date) && getHour(item.from) === hour) {
        color = "bg-rose-600"
        if(authContext?.loggedUser?._id === item.user.toString()) color = "bg-green-600"
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