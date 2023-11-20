import Moment from 'moment'

export const formatDate = (date: Date) => {
  Moment.locale('en')
  const formattedDate = Moment(date).format('DD.MM.YY hh:mm a')
  return formattedDate
}