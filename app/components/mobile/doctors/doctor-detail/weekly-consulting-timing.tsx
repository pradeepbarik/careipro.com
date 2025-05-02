import { TWeeklyConsultingTiming } from "@/lib/types/doctor";
import { get_current_datetime, moment } from '@/lib/helper/date-time';
const Row = ({ day,isAvailable, isToday, first_session_start, first_session_end, second_session_start, second_session_end }: { day: string,isAvailable:boolean, isToday: boolean, first_session_start: string, first_session_end: string, second_session_start: string, second_session_end: string }) => {
    if(isAvailable===false){
        return (<></>)
    }
    return (
        <tr>
            <td colSpan={1} className={`text-left py-2 color-primary`}>{day}{isToday ? `(Today)` : ``}</td>
            <td colSpan={2} className={`text-center py-3 ${isToday?'color-primary':''}`}>
                {(first_session_start && first_session_end) ?
                    <span className="rounded-md px-2 py-2">
                        {first_session_start} - {first_session_end}
                    </span> :
                    <span className="border-2 rounded-md px-2 py-2">
                        Not available
                    </span>
                }
            </td>
            <td colSpan={2} className={`text-center py-3 ${isToday?'color-primary':''}`}>
                {(second_session_start && second_session_end) ?
                    <span className="rounded-md px-2 py-2">
                        {second_session_start} - {second_session_end}
                    </span> :
                    <span className="rounded-md px-2 py-2 color-secondary">
                        Not available
                    </span>
                }
            </td>
        </tr>
    )
}
const WeeklyConsultingTiming = ({ data }: { data: TWeeklyConsultingTiming }) => {
    const today = moment(get_current_datetime()).format("dddd");
    return (<>
        <table className="w-full table font-semibold">
            <thead>
                <tr className="bg-primary-20 rounded-md">
                    <th colSpan={1} className="text-left fs-16">Day</th>
                    <th colSpan={2} className="fs-16">1st Session</th>
                    <th colSpan={2} className="fs-16">2nd Session</th>
                </tr>
            </thead>
            <tbody>
                <Row day="Monday" isAvailable={data.monday?true:false} isToday={today === "Monday"} first_session_start={data.monday_1st_session_start} first_session_end={data.monday_1st_session_end} second_session_start={data.monday_2nd_session_start} second_session_end={data.monday_2nd_session_end} />
                <Row day="Tuesday" isAvailable={data.tuesday?true:false} isToday={today === "Tuesday"} first_session_start={data.tuesday_1st_session_start} first_session_end={data.tuesday_1st_session_end} second_session_start={data.tuesday_2nd_session_start} second_session_end={data.tuesday_2nd_session_end} />
                <Row day="Wednesday" isAvailable={data.wednesday?true:false} isToday={today === "Wednesday"} first_session_start={data.wednesday_1st_session_start} first_session_end={data.wednesday_1st_session_end} second_session_start={data.wednesday_2nd_session_start} second_session_end={data.wednesday_2nd_session_end} />
                <Row day="Thursday" isAvailable={data.thursday?true:false} isToday={today === "Thursday"} first_session_start={data.thursday_1st_session_start} first_session_end={data.thursday_1st_session_end} second_session_start={data.thursday_2nd_session_start} second_session_end={data.thursday_2nd_session_end} />
                <Row day="Friday" isAvailable={data.friday?true:false} isToday={today === "Friday"} first_session_start={data.friday_1st_session_start} first_session_end={data.friday_1st_session_end} second_session_start={data.friday_2nd_session_start} second_session_end={data.friday_2nd_session_end} />
                <Row day="Saturday" isAvailable={data.saturday?true:false} isToday={today === "Saturday"} first_session_start={data.saturday_1st_session_start} first_session_end={data.saturday_1st_session_end} second_session_start={data.saturday_2nd_session_start} second_session_end={data.saturday_2nd_session_end} />
                <Row day="Sunday" isAvailable={data.sunday?true:false} isToday={today === "Sunday"} first_session_start={data.sunday_1st_session_start} first_session_end={data.sunday_1st_session_end} second_session_start={data.sunday_2nd_session_start} second_session_end={data.sunday_2nd_session_end} />
            </tbody>
        </table>
    </>)
}
export default WeeklyConsultingTiming;