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

export const buildDate = (date: string, time: string) => {
  const aditionalZero = time === '7' || time === '8' || time === '9'
  return new Date(date.concat('T', aditionalZero ? '0' : '', time, ':00'))
}