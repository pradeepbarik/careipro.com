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
export const getAge = (dob: string | null) => {
    if (!dob) return null;
    const birth = moment(dob);
    if (!birth.isValid()) return null;
    const now = moment();
    const years = now.diff(birth, 'years');
    birth.add(years, 'years');
    const months = now.diff(birth, 'months');
    birth.add(months, 'months');
    const days = now.diff(birth, 'days');
    if (years >= 1) {
        return months > 0 ? `${years} Yrs ${months} Mons` : `${years} Yrs`;
    }
    if (months >= 1) {
        return days > 0 ? `${months} Mons ${days} Days` : `${months} Mons`;
    }
    return `${days} Days`;
}
export default moment;