import { TWeeklyConsultingTiming } from "@/lib/types/doctor";
const WeeklyConsultingTiming = ({ data }: { data: TWeeklyConsultingTiming }) => {
    return (<>
        <table className="w-full table row-bt-border">
            <thead>
                <th colSpan={1} className="text-left fs-17">Day</th>
                <th colSpan={2} className="fs-17">1st Session</th>
                <th colSpan={2} className="fs-17">2nd Session</th>
            </thead>
            <tbody>
                {data.monday==1 &&
                    <tr>
                        <td colSpan={1} className="text-left font-semibold py-2">Monday</td>
                        <td colSpan={2} className="text-center py-3">{data.monday_1st_session_start} - {data.monday_1st_session_end}</td>
                        <td colSpan={2} className="text-center py-3">{data.monday_2nd_session_start} - {data.monday_2nd_session_end}</td>
                    </tr>
                }
                {data.tuesday==1 &&
                    <tr>
                        <td colSpan={1} className="text-left font-semibold py-3">Tuesday</td>
                        <td colSpan={2} className="text-center py-3">{data.tuesday_1st_session_start} - {data.tuesday_1st_session_end}</td>
                        <td colSpan={2} className="text-center py-3">{data.tuesday_2nd_session_start} - {data.tuesday_2nd_session_end}</td>
                    </tr>
                }
                {data.wednesday==1 &&
                    <tr>
                        <td colSpan={1} className="text-left font-semibold py-3">Wednesday</td>
                        <td colSpan={2} className="text-center py-3">{data.wednesday_1st_session_start} - {data.wednesday_1st_session_end}</td>
                        <td colSpan={2} className="text-center py-3">{data.wednesday_2nd_session_start} - {data.wednesday_2nd_session_end}</td>
                    </tr>
                }
                {data.thursday==1 &&
                    <tr>
                        <td colSpan={1} className="text-left font-semibold py-3">Thursday</td>
                        <td colSpan={2} className="text-center py-3">{data.thursday_1st_session_start} - {data.thursday_1st_session_end}</td>
                        <td colSpan={2} className="text-center py-3">{data.thursday_2nd_session_start} - {data.thursday_2nd_session_end}</td>
                    </tr>
                }
                {data.friday==1 &&
                    <tr>
                        <td colSpan={1} className="text-left font-semibold  py-3">Friday</td>
                        <td colSpan={2} className="text-center py-3">{data.friday_1st_session_start} - {data.friday_1st_session_end}</td>
                        <td colSpan={2} className="text-center py-3">{data.friday_2nd_session_start} - {data.friday_2nd_session_end}</td>
                    </tr>
                }
                {data.saturday==1 &&
                    <tr>
                        <td colSpan={1} className="text-left font-semibold py-3">Saturday</td>
                        <td colSpan={2} className="text-center py-3">{data.saturday_1st_session_start} - {data.saturday_1st_session_end}</td>
                        <td colSpan={2} className="text-center py-3">{data.saturday_2nd_session_start} - {data.saturday_2nd_session_end}</td>
                    </tr>
                }
                {data.sunday==1 &&
                    <tr>
                        <td colSpan={1} className="text-left font-semibold py-3">Sunday</td>
                        <td colSpan={2} className="text-center py-3">{data.sunday_1st_session_start} - {data.sunday_1st_session_end}</td>
                        <td colSpan={2} className="text-center py-3">{data.sunday_2nd_session_start} - {data.sunday_2nd_session_end}</td>
                    </tr>
                }
            </tbody>
        </table>
    </>)
}
export default WeeklyConsultingTiming;