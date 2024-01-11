import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import DatePicker from "react-date-picker"
import { buildDate, getDateFromDatePickerValue } from "@/utils/dateFormatter"
import ReactSelect from "react-select"
import { AuthContext } from "@/context/AuthContext"
import { ReservationService } from "@/service/reservationService"
import { useNavigate } from "react-router-dom"
import { PATH_COURTS } from "@/components/MainRouter"
import { timeOptions, courtOptions } from "@/components/reservation/utils/reservationOptions"
import { toast } from "react-toastify"

type DatePickerValuePiece = Date | null
type DatePickerValue = DatePickerValuePiece | [DatePickerValuePiece, DatePickerValuePiece]

const ReservationForm = () => {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const [datePickerValue, setDatePickerValue] = useState<DatePickerValue>(new Date())  

  // TODO - až budu přídávat update, tak tady rozlišovat mezi novou a updatovanou default hodnotou
  const {handleSubmit, setValue, control} = useForm({
    defaultValues: {
      date: getDateFromDatePickerValue(datePickerValue),
      time: timeOptions[0].value,
      courtNumber: courtOptions[0].value
    }
  })

  useEffect(() => {
    setValue("date", getDateFromDatePickerValue(datePickerValue))
  }, [datePickerValue])

  // FOR UPDATE - later
  // useEffect(() => {
  //   if(props.update) {
  //     // reservationId bude nepovinný prop
  //     ReservationService.reservationDetail(props.reservationId).then(item => {
  //       setValue("name", item?.name!)
  //       setUser(item)
  //     })
  //   }
  // }, [])

  const onSubmit = (data: any) => {
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
                    options={timeOptions} defaultValue={timeOptions[0]}
                    onChange={data => setValue("time", data!.value)}
                  />
                )}
              />

              <p className="mx-4">Court</p>             
              <Controller control={control} name="courtNumber"
                render={() => (
                  <ReactSelect className={"p-2 col-span-3 font-montserrat rounded-sm border-2"}
                    options={courtOptions} defaultValue={courtOptions[0]}
                    onChange={data => setValue("courtNumber", data!.value)}
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