import Moment from 'moment'

export const formatDate = (date: Date) => {
  Moment.locale('en')
  const formattedDate = Moment(date).format('Do MMM YYYY, h:mm:ss a')
  return formattedDate
}