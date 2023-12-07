import { AuthContext } from "@/context/AuthContext"
import { CourtModel } from "@/model/courtModel"
import { CourtService } from "@/service/courtService"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PATH_ROOT } from "@/components/MainRouter"
import Court from "@/components/courts/Court"
import LoadingOval from "@/components/LoadingOval"
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { getDateFromDatePickerValue } from "@/utils/dateFormatter"

type DatePickerValuePiece = Date | null
type DatePickerValue = DatePickerValuePiece | [DatePickerValuePiece, DatePickerValuePiece]

const CourtList = () => {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [courts, setCourts] = useState<CourtModel[] | undefined>([])
  const [loading, setLoading] = useState(true)
  const [datePickerValue, setDatePickerValue] = useState<DatePickerValue>(new Date())

  useEffect(() => {
    setLoading(true)
    if(localStorage.getItem('loggedIn') === 'false') navigate(PATH_ROOT)
    if(authContext?.authenticated) {
      CourtService.courtList().then(item => {
        setCourts(item)
        setLoading(false)
      })
    }
  }, [authContext?.authenticated, datePickerValue])

  const courtElements = courts?.map(item => <Court key={item._id} court={item} date={new Date(getDateFromDatePickerValue(datePickerValue))} />)
  
  const thStyle = "p-2"

  return (
    <div className="flex flex-col items-center w-full overflow-x-auto">
      <div className="flex justify-around w-full">
        <DatePicker onChange={setDatePickerValue} value={datePickerValue} clearIcon={null} />
        <button className="px-4 border-none rounded-sm bg-gray-200 cursor-pointer font-montserrat font-bold hover:bg-lime-300"
          onClick={() => console.log('make a reservation')}>Make a Reservation</button>
      </div>
      {!loading ?
      <table className="table-auto">
        <thead>
          <tr>
            <th className={thStyle}>Court</th>
            <th className={thStyle}>7:00</th>
            <th className={thStyle}>8:00</th>
            <th className={thStyle}>9:00</th>
            <th className={thStyle}>10:00</th>
            <th className={thStyle}>11:00</th>
            <th className={thStyle}>12:00</th>
            <th className={thStyle}>13:00</th>
            <th className={thStyle}>14:00</th>
            <th className={thStyle}>15:00</th>
            <th className={thStyle}>16:00</th>
            <th className={thStyle}>17:00</th>
            <th className={thStyle}>18:00</th>
            <th className={thStyle}>19:00</th>
            <th className={thStyle}>20:00</th>
          </tr>
        </thead>
        <tbody>
          {courtElements}
        </tbody>
      </table> : <LoadingOval />}
    </div>
  )
}

export default CourtList