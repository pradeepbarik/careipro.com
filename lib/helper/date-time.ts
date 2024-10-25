import m, { Moment } from 'moment';
export const moment = m;
export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
export const dateFormat = 'YYYY-MM-DD';
type datetime = {
  year: number;
  month: string;
  date: string;
  hour: string;
  minute: string;
  second: string;
}
export const get_current_datetime = (onlydate = false): string => {
  if (onlydate) {
    return formatDateTime(moment(),dateFormat);
  } else {
    return formatDateTime(moment(),dateTimeFormat);
  }
}
export const formatDateTime = (dateTime: Moment,format:string=dateTimeFormat): string => {
  return dateTime.format(format);
}
export default moment;