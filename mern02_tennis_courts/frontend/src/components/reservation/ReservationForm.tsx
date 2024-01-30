import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import DatePicker from "react-date-picker"
import { buildDate, getDateFromDatePickerValue, getHour } from "@/utils/dateFormatter"
import ReactSelect from "react-select"
import { AuthContext } from "@/context/AuthContext"
import { ReservationService } from "@/service/reservationService"
import { useNavigate, useParams } from "react-router-dom"
import { PATH_COURTS } from "@/components/MainRouter"
import { timeOptions, courtOptions } from "@/components/reservation/utils/reservationOptions"
import { toast } from "react-toastify"
import { ReservationModel } from "@/model/reservationModel"

type DatePickerValuePiece = Date | null
type DatePickerValue = DatePickerValuePiece | [DatePickerValuePiece, DatePickerValuePiece]

const ReservationForm = () => {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const params = useParams()

  const [reservationToUpdate, setReservationToUpdate] = useState<ReservationModel | null>()

  const [datePickerValue, setDatePickerValue] = useState<DatePickerValue>(new Date())
  const [formTime, setFormTime] = useState(timeOptions[0])
  const [formCourtNumber, setFormCourtNumber] = useState(courtOptions[0])

  const {handleSubmit, setValue, control} = useForm({
    defaultValues: {
      date: getDateFromDatePickerValue(datePickerValue),
      time: formTime?.value,
      courtNumber: formCourtNumber?.value
    }
  })

  useEffect(() => {
    setValue("date", getDateFromDatePickerValue(datePickerValue))
  }, [datePickerValue])

  useEffect(() => {
    if(authContext?.authenticated && params.reservationId) {
      ReservationService.reservationDetail(params.reservationId).then(item => {
        setReservationToUpdate(item)
      })
    }
  }, [authContext?.authenticated])

  useEffect(() => {
    if(params.reservationId) {
      const time = timeOptions.find(item => item.value === getHour(reservationToUpdate?.from!))!
      const courtNumber = courtOptions.find(item => item.value === reservationToUpdate?.court?.number!.toString())!

      setFormTime(time)
      setValue("time", time?.value)
      setFormCourtNumber(courtNumber)
      setValue("courtNumber", courtNumber?.value)

      reservationToUpdate && setDatePickerValue(new Date(reservationToUpdate?.from!))
    }
  }, [reservationToUpdate])

  const onSubmit = (data: any) => {
    if(!params.reservationId) {
      ReservationService.createReservation(authContext?.loggedUser?._id!, data.courtNumber,
        buildDate(data.date, data.time), buildDate(data.date, (Number(data.time) + 1).toString())).then(item => {
          if(item.status === 200) {
            toast.success('Reservation created')
            navigate(PATH_COURTS)
          } else {
            let errorStr = ''
            item.json().then(err => errorStr = err.message).then(() => toast.error(errorStr))
          }
      })
    } else {
      ReservationService.updateReservation(params.reservationId, data.courtNumber,
        buildDate(data.date, data.time), buildDate(data.date, (Number(data.time) + 1).toString())).then(item => {
          if(item.status === 200) {
            toast.success('Reservation updated')
            navigate(PATH_COURTS)
          } else {
            let errorStr = ''
            item.json().then(err => errorStr = err.message).then(() => toast.error(errorStr))
          }
      })
    }
  }

  return (
    <div className="left-0 w-full h-full flex justify-center items-center">
      <div className="p-4 h-1/2 max-h-xl w-3/4 max-w-xl bg-white rounded-lg">

        <div className="flex flex-col items-center mx-4">
          <h1>Create Reservation</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">


            <div className="grid grid-cols-4 gap-2">

              <p className="mx-4">Date</p>
              <Controller control={control} name="date"
                render={() => (
                  <DatePicker className={"p-2 col-span-3 font-montserrat rounded-sm border-2"}
                    onChange={setDatePickerValue} value={datePickerValue} clearIcon={null}
                  />
                )}
              />

              <p className="mx-4">Time</p>
              <Controller control={control} name="time"
                render={() => (
                  <ReactSelect className={"p-2 col-span-3 font-montserrat rounded-sm border-2"}
                    options={timeOptions} value={formTime}
                    onChange={data => {
                      setValue("time", data!.value)
                      setFormTime(data!)
                    }}
                  />
                )}
              />

              <p className="mx-4">Court</p>             
              <Controller control={control} name="courtNumber"
                render={() => (
                  <ReactSelect className={"p-2 col-span-3 font-montserrat rounded-sm border-2"}
                    options={courtOptions} value={formCourtNumber}
                    onChange={data => {
                      setValue("courtNumber", data!.value)
                      setFormCourtNumber(data!)
                    }}
                  />
                )}
              />

            </div>

            <div className="flex justify-center">
              <button type="submit" className={"mt-8 mb-4 w-20 h-8 border-none rounded-sm bg-gray-200 cursor-pointer font-montserrat font-bold hover:bg-lime-300"}>
                Create
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default ReservationForm