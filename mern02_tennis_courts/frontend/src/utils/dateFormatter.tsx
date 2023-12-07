import Moment from 'moment'

Moment.locale('en')

export const getDay = (date: Date) => {
  return Moment(date).format('DD')
}

export const getMonth = (date: Date) => {
  return Moment(date).format('MMM')
}

export const getYear = (date: Date) => {
  return Moment(date).format('YYYY')
}

export const getTime = (date: Date) => {
  return Moment(date).format('HH:mm')
}

export const getHour = (date: Date) => {
  return Moment(date).format('HH')
}

export const getDateFromDatePickerValue = (date: any) => {
  return Moment(date).format('YYYY-MM-DD')
}

// TODO move to BE - extremely unefective
export const areDatesOnTheSameDay = (date1: Date, date2: Date) => {
  return Moment(date1).isSame(date2, 'day')
}